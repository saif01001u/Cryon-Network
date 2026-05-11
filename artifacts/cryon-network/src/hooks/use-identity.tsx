import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import toast from 'react-hot-toast';
import {
  getIdentityPDA,
  parseIdentityData,
  IdentityData,
  buildRegisterIx,
  buildUpdateIx,
  buildCloseIx
} from '../lib/solana';

export function useIdentity() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [identity, setIdentity] = useState<IdentityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchIdentity = useCallback(async () => {
    if (!publicKey) {
      setIdentity(null);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    try {
      const pda = getIdentityPDA(publicKey);
      const accountInfo = await connection.getAccountInfo(pda, 'finalized');

      if (accountInfo && accountInfo.data) {
        const parsed = parseIdentityData(accountInfo.data);
        setIdentity(parsed);
      } else {
        setIdentity(null);
      }
    } catch (err) {
      console.error("Error fetching identity:", err);
      setIdentity(null);
    } finally {
      setIsFetching(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    fetchIdentity();
  }, [fetchIdentity]);

  const registerIdentity = async (name: string, bio: string) => {
    if (!publicKey) return toast.error("Wallet not connected");
    setIsLoading(true);
    const toastId = toast.loading("Encrypting Identity...");

    try {
      const pda = getIdentityPDA(publicKey);

      const existingAccount = await connection.getAccountInfo(pda, 'finalized');
      const accountExists = !!(existingAccount && existingAccount.data?.length > 0);

      const ix = accountExists
        ? buildUpdateIx(pda, publicKey, name, bio)
        : buildRegisterIx(pda, publicKey, name, bio);

      const transaction = new Transaction().add(ix);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      toast.loading("Broadcasting to Solana...", { id: toastId });

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: true,
      });

      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'finalized'
      );

      const label = accountExists ? "Identity Updated!" : "Identity Registered!";

      toast.success(
        <div>
          {label}
          <div className="mt-2 text-xs">
            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              View on Explorer
            </a>
          </div>
        </div>,
        { id: toastId, duration: 5000 }
      );

      await fetchIdentity();
    } catch (error: any) {
      console.log('Blockchain Error:', error);
      console.error(error);
      toast.error(`Error: ${error.message || "Transaction failed"}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const updateIdentity = async (name: string, bio: string) => {
    if (!publicKey) return toast.error("Wallet not connected");
    setIsLoading(true);
    const toastId = toast.loading("Encrypting Identity Update...");

    try {
      const pda = getIdentityPDA(publicKey);
      const ix = buildUpdateIx(pda, publicKey, name, bio);

      const transaction = new Transaction().add(ix);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      toast.loading("Broadcasting to Solana...", { id: toastId });

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: true,
      });

      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'finalized'
      );

      toast.success(
        <div>
          Identity Updated!
          <div className="mt-2 text-xs">
            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              View on Explorer
            </a>
          </div>
        </div>,
        { id: toastId, duration: 5000 }
      );

      await fetchIdentity();
    } catch (error: any) {
      console.log('Blockchain Error:', error);
      console.error(error);
      toast.error(`Error: ${error.message || "Failed to update identity"}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteIdentity = async () => {
    if (!publicKey) return toast.error("Wallet not connected");
    setIsLoading(true);
    const toastId = toast.loading("Processing Deletion...");

    try {
      const pda = getIdentityPDA(publicKey);
      const ix = buildCloseIx(pda, publicKey);

      const transaction = new Transaction().add(ix);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      toast.loading("Broadcasting to Solana...", { id: toastId });

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: true,
      });

      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'finalized'
      );

      toast.success(
        <div>
          Identity Deleted!
          <div className="mt-2 text-xs">
            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              View on Explorer
            </a>
          </div>
        </div>,
        { id: toastId, duration: 5000 }
      );

      setIdentity(null);
    } catch (error: any) {
      console.log('Blockchain Error:', error);
      console.error(error);
      toast.error(`Error: ${error.message || "Failed to delete identity"}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    identity,
    isFetching,
    isLoading,
    registerIdentity,
    updateIdentity,
    deleteIdentity,
    refresh: fetchIdentity
  };
}
