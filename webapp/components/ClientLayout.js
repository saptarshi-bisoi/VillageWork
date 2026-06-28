"use client";

import ScrollProgress from '@/components/animations/ScrollProgress';
import PageTransition from '@/components/animations/PageTransition';

export default function ClientLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}
