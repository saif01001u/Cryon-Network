import { PublicKey, SystemProgram, TransactionInstruction, Connection } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('DbXQctgDjcERBX9PitvBUsY18gAvNLKnfHwiU4DfvDF5');

export function getIdentityPDA(walletKey: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("identity"), walletKey.toBuffer()],
    PROGRAM_ID
  )[0];
}

export function serializeString(str: string): Buffer {
  const bytes = Buffer.from(str, 'utf-8');
  const len = Buffer.alloc(4);
  len.writeUInt32LE(bytes.length, 0);
  return Buffer.concat([len, bytes]);
}

export function buildRegisterIx(pda: PublicKey, wallet: PublicKey, name: string, bio: string): TransactionInstruction {
  const discriminator = Buffer.from([234, 231, 214, 150, 10, 161, 226, 140]);
  const data = Buffer.concat([
    discriminator, 
    serializeString(name), 
    serializeString(bio), 
    serializeString(wallet.toBase58())
  ]);
  
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: pda, isSigner: false, isWritable: true },
      { pubkey: wallet, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });
}

export function buildUpdateIx(pda: PublicKey, wallet: PublicKey, name: string, bio: string): TransactionInstruction {
  const discriminator = Buffer.from([9, 191, 240, 186, 166, 63, 136, 53]);
  const data = Buffer.concat([
    discriminator, 
    serializeString(name), 
    serializeString(bio), 
    serializeString(wallet.toBase58())
  ]);
  
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: pda, isSigner: false, isWritable: true },
      { pubkey: wallet, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });
}

export function buildCloseIx(pda: PublicKey, wallet: PublicKey): TransactionInstruction {
  const discriminator = Buffer.from([164, 234, 247, 52, 137, 130, 132, 167]);
  
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: pda, isSigner: false, isWritable: true },
      { pubkey: wallet, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: discriminator,
  });
}

export interface IdentityData {
  name: string;
  bio: string;
  wallet: string;
}

export function parseIdentityData(buffer: Buffer): IdentityData | null {
  try {
    let offset = 8; // skip discriminator
    
    // read name
    const nameLen = buffer.readUInt32LE(offset);
    offset += 4;
    const name = buffer.subarray(offset, offset + nameLen).toString('utf-8');
    offset += nameLen;
    
    // read bio
    const bioLen = buffer.readUInt32LE(offset);
    offset += 4;
    const bio = buffer.subarray(offset, offset + bioLen).toString('utf-8');
    offset += bioLen;
    
    // read wallet
    const walletLen = buffer.readUInt32LE(offset);
    offset += 4;
    const wallet = buffer.subarray(offset, offset + walletLen).toString('utf-8');
    
    return { name, bio, wallet };
  } catch (err) {
    console.error("Failed to parse identity data", err);
    return null;
  }
}
