import type { Metadata } from 'next';
import { ResultProvider } from './context/ResultContext';

import './globals.css';

export const metadata: Metadata = {
  title: 'Linaguagem do Amor - DÉA',
  description: 'Formulário de Linguagem do Amor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <ResultProvider>
        <body>{children}</body>
      </ResultProvider>
    </html>
  );
}
