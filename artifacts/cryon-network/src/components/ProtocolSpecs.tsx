import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PROGRAM_ID } from '../lib/solana';
import { Terminal, Database, Activity, Zap } from 'lucide-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export function ProtocolSpecs() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    
    connection.getBalance(publicKey).then(lamports => {
      setBalance(lamports / LAMPORTS_PER_SOL);
    }).catch(err => console.error(err));
    
    const subId = connection.onAccountChange(publicKey, (account) => {
      setBalance(account.lamports / LAMPORTS_PER_SOL);
    });
    
    return () => {
      connection.removeAccountChangeListener(subId);
    };
  }, [connection, publicKey]);

  return (
    <div className="glass rounded-xl p-6 border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <Terminal className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-lg text-white">PROTOCOL SPECS</h3>
      </div>
      
      <div className="space-y-6 flex-1">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <Database className="w-3 h-3" /> Program ID
            </span>
            <span className="text-[10px] text-primary/70 bg-primary/10 px-2 py-0.5 rounded">VERIFIED</span>
          </div>
          <div className="font-mono text-xs bg-black/50 p-3 rounded border border-white/5 text-primary/90 break-all select-all">
            {PROGRAM_ID.toBase58()}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <Activity className="w-3 h-3" /> Network Status
            </span>
          </div>
          <div className="flex items-center gap-3 bg-black/50 p-3 rounded border border-white/5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-white font-medium">Solana Devnet</span>
            <span className="text-xs text-muted-foreground ml-auto">400ms Ping</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <Zap className="w-3 h-3" /> Connection
            </span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-white/5 flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Wallet:</span>
              <span className="text-xs text-white font-mono">
                {publicKey ? `${publicKey.toBase58().slice(0,4)}...${publicKey.toBase58().slice(-4)}` : 'DISCONNECTED'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Balance:</span>
              <span className="text-xs text-primary font-mono font-bold">
                {balance !== null ? `${balance.toFixed(4)} SOL` : '---'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">SECURED BY CRYON PROTOCOL V1</span>
      </div>
    </div>
  );
}