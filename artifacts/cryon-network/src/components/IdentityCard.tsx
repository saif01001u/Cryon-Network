import React from 'react';
import { IdentityData } from '../lib/solana';
import { Fingerprint, Cpu, Code } from 'lucide-react';

interface IdentityCardProps {
  identity: IdentityData;
}

export function IdentityCard({ identity }: IdentityCardProps) {
  const truncatedWallet = `${identity.wallet.slice(0, 6)}...${identity.wallet.slice(-6)}`;

  return (
    <div className="relative group w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl overflow-hidden glass p-[1px] glow-cyan">
      {/* Outer border gradient animation could go here */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 z-0"></div>
      
      <div className="relative h-full w-full bg-card rounded-2xl p-6 flex flex-col justify-between z-10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Fingerprint className="w-24 h-24 text-primary" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
        <div className="absolute top-0 right-10 w-20 h-px bg-primary shadow-[0_0_10px_#00e5ff]"></div>
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> Sovereign Identity
            </h4>
            <h2 className="font-display text-2xl font-bold text-white text-neon truncate max-w-[200px]">
              {identity.name}
            </h2>
          </div>
          <div className="bg-primary/10 border border-primary/30 px-2 py-1 rounded text-[10px] font-mono text-primary flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            ACTIVE
          </div>
        </div>
        
        {/* Bio */}
        <div className="mt-4 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            "{identity.bio}"
          </p>
        </div>
        
        {/* Footer / Wallet */}
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
              Public Key
            </span>
            <div className="font-mono text-sm text-white/90 bg-black/40 px-2 py-1 rounded border border-white/5 flex items-center gap-2">
              <Code className="w-3 h-3 text-primary/50" />
              {truncatedWallet}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-primary/50 font-mono tracking-widest uppercase">
              NETWORK // DEVNET
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}