import React from 'react';
import { Shield, Fingerprint, Network } from 'lucide-react';

export function AboutDocs() {
  return (
    <section className="py-20 border-t border-white/10 bg-background/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-4 text-neon">Decentralized Sovereignty</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your identity shouldn't be leased from corporations. Cryon Network leverages the speed and security of Solana to give you permanent, cryptographically-secured ownership over your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 glass rounded-xl border-primary/20 hover:border-primary/50 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-white">Zero Trust Architecture</h3>
            <p className="text-sm text-muted-foreground">
              No middlemen, no central servers. Your identity is written directly to a Program Derived Address (PDA) on the Solana blockchain, controlled exclusively by your private keys.
            </p>
          </div>

          <div className="p-6 glass rounded-xl border-primary/20 hover:border-primary/50 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
              <Fingerprint className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-white">Cryptographic Proof</h3>
            <p className="text-sm text-muted-foreground">
              Verify your identity across any Solana dApp without relying on third-party OAuth providers. Your signature is the only proof required.
            </p>
          </div>

          <div className="p-6 glass rounded-xl border-primary/20 hover:border-primary/50 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
              <Network className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-white">Composable Layer</h3>
            <p className="text-sm text-muted-foreground">
              Built as a foundational primitive. Other protocols can read your Cryon PDA to provide tailored experiences, airdrops, and gated access based on your on-chain reputation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}