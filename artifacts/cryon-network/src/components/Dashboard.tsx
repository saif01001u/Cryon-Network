import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useIdentity } from '../hooks/use-identity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash2, Edit3, UserPlus, Eye, ShieldCheck, Share2 } from 'lucide-react';
import { IdentityCard } from './IdentityCard';

export function Dashboard() {
  const { connected } = useWallet();
  const { identity, isFetching, isLoading, registerIdentity, updateIdentity, deleteIdentity } = useIdentity();
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Populate form if identity exists
  useEffect(() => {
    if (identity && !name && !bio) {
      setName(identity.name);
      setBio(identity.bio);
    }
  }, [identity, name, bio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !bio.trim()) return;
    
    if (identity) {
      await updateIdentity(name, bio);
    } else {
      await registerIdentity(name, bio);
    }
  };

  if (!connected) {
    return (
      <div className="glass rounded-xl p-12 text-center border-white/10 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">Connect Wallet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Authenticate with your Solana wallet to access or register your sovereign identity.
        </p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="glass rounded-xl p-12 flex items-center justify-center min-h-[400px] border-white/10">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-primary font-mono text-sm uppercase tracking-widest animate-pulse">Decrypting State...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl border-white/10 overflow-hidden shadow-2xl">
      <Tabs defaultValue={identity ? "manage" : "register"} className="w-full">
        <div className="border-b border-white/10 bg-black/40 px-4 pt-4">
          <TabsList className="bg-transparent h-auto p-0 gap-6">
            <TabsTrigger 
              value="register" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary pb-3 text-muted-foreground uppercase tracking-widest text-xs font-display transition-all"
            >
              {identity ? 'Update Info' : 'Register'}
            </TabsTrigger>
            <TabsTrigger 
              value="manage" 
              disabled={!identity}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary pb-3 text-muted-foreground uppercase tracking-widest text-xs font-display transition-all disabled:opacity-30"
            >
              Identity Card
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              disabled={!identity}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary pb-3 text-muted-foreground uppercase tracking-widest text-xs font-display transition-all disabled:opacity-30"
            >
              Privacy Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          {/* REGISTER / UPDATE TAB */}
          <TabsContent value="register" className="mt-0 outline-none">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary/80 uppercase tracking-widest text-xs font-mono">Handle / Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Satoshi" 
                  className="bg-black/50 border-primary/20 focus-visible:ring-primary focus-visible:border-primary text-white font-mono h-12"
                  maxLength={32}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-primary/80 uppercase tracking-widest text-xs font-mono">Biography / Status</Label>
                <Textarea 
                  id="bio" 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Cypherpunk builder..." 
                  className="bg-black/50 border-primary/20 focus-visible:ring-primary focus-visible:border-primary text-white font-mono min-h-[120px] resize-none"
                  maxLength={256}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || !name.trim() || !bio.trim()}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold tracking-wider rounded-md glow-cyan transition-all uppercase"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    {identity ? <Edit3 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {identity ? 'Update Identity' : 'Register Identity'}
                  </span>
                )}
              </Button>
            </form>
          </TabsContent>

          {/* MANAGE TAB */}
          <TabsContent value="manage" className="mt-0 outline-none space-y-8">
            {identity && (
              <>
                <div className="flex justify-center">
                  <IdentityCard identity={identity} />
                </div>
                
                <div className="pt-8 border-t border-white/10 flex justify-end">
                  <Button 
                    variant="destructive" 
                    onClick={deleteIdentity}
                    disabled={isLoading}
                    className="bg-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                    Burn Identity
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* PRIVACY TAB (UI Only) */}
          <TabsContent value="privacy" className="mt-0 outline-none max-w-lg mx-auto">
            <div className="space-y-6">
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-white"><Eye className="w-4 h-4 text-primary" /> Public Visibility</Label>
                  <p className="text-xs text-muted-foreground">Allow dApps to query your PDA to display your handle</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-white"><Share2 className="w-4 h-4 text-primary" /> Data Interoperability</Label>
                  <p className="text-xs text-muted-foreground">Enable cross-program invocations for your identity data</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-8 text-sm text-primary/80">
                <span className="font-bold uppercase tracking-wider font-display">Note:</span> These settings are local preferences for UI clients. The underlying PDA on Solana remains public due to the nature of the ledger.
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}