'use client';

import React from 'react';
import results from '../../../result.json';
import LoveLanguagesPieChart from '@/components/LoveLanguagesPieChart';
import { LoveKey, useResult } from '../context/ResultContext';

const COLORS: Record<LoveKey, string> = {
  a: '#FF6384', // Palavras de Afirmação
  b: '#36A2EB', // Tempo de Qualidade
  c: '#FFCE56', // Atos de Serviço
  d: '#4BC0C0', // Presentes
  e: '#9966FF', // Toque Físico
};

export default function ResultPage() {
  const { counts } = useResult();

  const chartData = (Object.keys(counts) as LoveKey[]).map((key) => ({
    name: results.find((r) => r.id === key)?.title || key,
    value: counts[key],
    color: COLORS[key],
  }));

  const sortedResults = [...results].sort(
    (a, b) => counts[b.id as LoveKey] - counts[a.id as LoveKey]
  );

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 p-4'>
      <main className='max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg'>
        <h1 className='text-2xl font-bold text-center'>RESULTADOS</h1>

        {/* Gráfico */}
        <LoveLanguagesPieChart data={chartData} />

        {/* Explicações */}
        <div className='flex flex-col mt-6 gap-6'>
          {sortedResults.map((item, idx) => (
            <section className='space-y-3'>
              <hr className='border-gray-700 my-6' />

              <h3 className='text-xl font-semibold text-white'>
                {item.title} ({counts[item.id as LoveKey]} resposta
                {counts[item.id as LoveKey] !== 1 ? 's' : ''})
              </h3>
              <p className='text-gray-300'>{item.description}</p>
              <p className='italic text-gray-400'>
                Dificuldade: {item.difficulty}
              </p>
              <ul className='list-disc list-inside space-y-1 text-gray-200'>
                {item.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
