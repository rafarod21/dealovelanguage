'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import questions from '../../questions.json';
import { useResult } from './context/ResultContext';
import Image from 'next/image';

type FormValues = {
  [key: string]: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const { setCounts } = useResult();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const counts = { a: 0, b: 0, c: 0, d: 0, e: 0 };

    setIsSubmitting(true);

    Object.values(data).forEach((answer) => {
      if (answer in counts) counts[answer as keyof typeof counts]++;
    });

    setCounts(counts); // ✅ salva no contexto

    router.push('/result'); // ✅ sem counts na URL
  };

  return (
    <main className='min-h-screen bg-gray-900 text-gray-100 p-4'>
      {/* Logo + Título com imagem de fundo semi‑opaca */}
      <div className='max-w-xl h-64 mx-auto mb-4 flex items-center justify-center relative'>
        <Image
          src='/images/logo.png'
          alt='Logo do Love Languages'
          fill
          priority
          className='object-contain opacity-20'
          style={{ objectFit: 'contain' }}
        />
        <h1 className='relative z-10 text-4xl font-bold text-center'>
          Qual é a sua Linguagem do Amor?
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, () =>
          alert('Por favor, responda todas as perguntas.')
        )}
        className='max-w-xl mx-auto space-y-6'
      >
        {questions.map((question) => (
          <div
            key={question.id}
            className='flex flex-col gap-3 bg-gray-800 p-4 rounded-lg'
          >
            <span className='font-semibold'>
              {question.id}. {question.text}
            </span>
            <div className='flex flex-col gap-2'>
              {(Object.entries(question.options) as [string, string][]).map(
                ([key, label]) => (
                  <label key={key} className='flex items-center space-x-2'>
                    <input
                      type='radio'
                      {...register(String(question.id), { required: true })}
                      value={key}
                      className='form-radio flex-none h-4 w-4 text-red-400 bg-gray-700 border-gray-600'
                    />
                    <span className='flex-1 text-gray-200'>{label}</span>
                  </label>
                )
              )}
            </div>
            {errors[String(question.id)] && (
              <span className='text-sm text-red-400'>
                Você precisa responder esta pergunta.
              </span>
            )}
          </div>
        ))}

        <button
          type='submit'
          disabled={isSubmitting}
          className={`w-full py-3 font-semibold rounded-lg transition flex items-center justify-center ${
            isSubmitting
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          {isSubmitting ? (
            // Spinner CSS-only
            <div
              className='w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin'
              aria-label='Processando'
            />
          ) : (
            'Processar respostas'
          )}
        </button>
      </form>
    </main>
  );
}
