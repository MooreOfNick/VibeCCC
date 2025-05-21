import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  if (!campaign) notFound();
  return campaign;
}

export default async function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id);

  return (
    <main className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{campaign.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Who is Benefiting</h2>
            <div className="bg-gray-200 h-32 flex items-center justify-center mb-4">
              <span className="text-gray-500">Benefiting Organization Logo Placeholder</span>
            </div>
            <p className="text-gray-600">Example Non-Profit: Charity Organization</p>
            <p className="text-gray-600">Location: Saint Paul, MN</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Who Has Donated</h2>
            <ul className="list-disc pl-5">
              <li className="text-gray-600">User 1: $10 per yellow card, $20 per red card</li>
              <li className="text-gray-600">User 2: $5 per yellow card, $15 per red card</li>
              <li className="text-gray-600">User 3: $8 per yellow card, $25 per red card</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Donate to Campaign</h2>
          <Link href={`/campaigns/${campaign.id}/donate`} className="block w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition text-center">
            Donate
          </Link>
        </div>
        <p className="text-gray-600 mt-4">Match Date: {new Date(campaign.matchDate).toLocaleDateString()}</p>
        <p className="text-gray-600">Team: {campaign.teamName}</p>
        <p className="text-gray-600">Opponent: {campaign.opponentName}</p>
      </div>
    </main>
  );
} 