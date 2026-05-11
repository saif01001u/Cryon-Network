import React from 'react';
import { Header } from '@/components/layout/Header';
import { Starfield } from '@/components/layout/Starfield';
import { Dashboard } from '@/components/Dashboard';
import { ProtocolSpecs } from '@/components/ProtocolSpecs';
import { AboutDocs } from '@/components/AboutDocs';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Starfield />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase glow-cyan">
              Protocol v1.0 // Active
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
              YOUR IDENTITY.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 text-neon">YOUR OWNERSHIP.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
              The premier sovereign identity protocol on Solana. 
              Register your immutable presence. Command your digital footprint.
            </p>
          </div>
        </section>

        {/* Dashboard & Specs Layout */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Dashboard />
              </div>
              <div className="lg:col-span-1">
                <ProtocolSpecs />
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <AboutDocs />
      </main>

      <footer className="border-t border-white/10 py-8 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Cryon Network. No Middlemen.
          </p>
        </div>
      </footer>
    </div>
  );
}