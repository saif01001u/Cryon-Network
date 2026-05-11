import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-primary/20 border border-primary flex items-center justify-center glow-cyan">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              CRYON
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-primary/80 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Solana Devnet: Operational
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
