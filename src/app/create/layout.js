'use client';

import { useRouter } from 'next/navigation';
import { useAccountEffect } from 'wagmi';

export default function CreateLayout({ children }) {
  const router = useRouter();

  useAccountEffect({
    onDisconnect() {
      router.push(`/`);
    },
  });
  return (
    <div className={`py-10 h-screen overflow-auto flex justify-center`}>
      {children}
    </div>
  );
}
