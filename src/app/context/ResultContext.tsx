'use client';

import React, { createContext, useContext, useState } from 'react';

export type LoveKey = 'a' | 'b' | 'c' | 'd' | 'e';

type Counts = Record<LoveKey, number>;

type ResultContextType = {
  counts: Counts;
  setCounts: (value: Counts) => void;
};

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [counts, setCounts] = useState<Counts>({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  });

  return (
    <ResultContext.Provider value={{ counts, setCounts }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) throw new Error('useResult must be used within ResultProvider');
  return context;
};
