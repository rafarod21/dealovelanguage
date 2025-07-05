'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import questions from '../../questions.json';
import { useResult } from './context/ResultContext';

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const counts = { a: 0, b: 0, c: 0, d: 0, e: 0 };

    Object.values(data).forEach((answer) => {
      if (answer in counts) counts[answer as keyof typeof counts]++;
    });

    setCounts(counts); // ✅ salva no contexto

    const max = Math.max(...Object.values(counts));
    const topLangs = Object.entries(counts)
      .filter(([, value]) => value === max)
      .map(([key]) => key);

    router.push('/result'); // ✅ sem counts na URL
  };

  return (
    <main className='min-h-screen bg-gray-900 text-gray-100 p-4'>
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
                      className='form-radio h-4 w-4 text-red-400 bg-gray-700 border-gray-600'
                    />
                    <span className='text-gray-200'>{label}</span>
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
          className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-red-600 transition'
        >
          Enviar respostas
        </button>
      </form>
    </main>
  );
}
