import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Campaign } from '@prisma/client';

async function getCampaigns() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { matchDate: 'asc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return campaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
}

export default async function BrowseCampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <main className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Browse Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white p-6 rounded shadow-md">
              <div className="bg-gray-200 h-32 flex items-center justify-center mb-4">
                <span className="text-gray-500">Campaign Logo Placeholder</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              <p className="text-gray-600">Match Date: {new Date(campaign.matchDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Team: {campaign.teamName}</p>
              <p className="text-gray-600">Opponent: {campaign.opponentName}</p>
              <Link href={`/campaigns/${campaign.id}`} className="text-purple-600 hover:text-purple-800">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 