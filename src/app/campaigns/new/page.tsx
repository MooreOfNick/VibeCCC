'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const campaignSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  matchDate: z.string().min(1, 'Match date is required'),
  teamName: z.string().min(1, 'Team name is required'),
  opponentName: z.string().min(1, 'Opponent name is required'),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function NewCampaignPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(campaignSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }

      router.push('/campaigns');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Start a Campaign</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md">
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full border rounded px-3 py-2"
              placeholder="Campaign Title"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full border rounded px-3 py-2"
              placeholder="Campaign Description"
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="matchDate">
              Match Date
            </label>
            <input
              id="matchDate"
              type="datetime-local"
              {...register('matchDate')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.matchDate && <p className="text-red-600 text-sm mt-1">{errors.matchDate.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="teamName">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              {...register('teamName')}
              className="w-full border rounded px-3 py-2"
              placeholder="Team Name"
            />
            {errors.teamName && <p className="text-red-600 text-sm mt-1">{errors.teamName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="opponentName">
              Opponent Name
            </label>
            <input
              id="opponentName"
              type="text"
              {...register('opponentName')}
              className="w-full border rounded px-3 py-2"
              placeholder="Opponent Name"
            />
            {errors.opponentName && <p className="text-red-600 text-sm mt-1">{errors.opponentName.message}</p>}
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </main>
  );
} 