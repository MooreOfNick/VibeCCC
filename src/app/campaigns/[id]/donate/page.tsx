import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });
  if (!campaign) notFound();
  return campaign;
}

export default async function DonatePage({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id);

  return (
    <main className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Donate to {campaign.title}</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <form className="space-y-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
            >
              Submit Donation
            </button>
            <div>
              <label className="block mb-1 font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded px-3 py-2"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700" htmlFor="yellowCardAmount">
                Amount per Yellow Card
              </label>
              <input
                id="yellowCardAmount"
                type="number"
                step="0.01"
                className="w-full border rounded px-3 py-2"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700" htmlFor="redCardAmount">
                Amount per Red Card
              </label>
              <input
                id="redCardAmount"
                type="number"
                step="0.01"
                className="w-full border rounded px-3 py-2"
                placeholder="0.00"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 