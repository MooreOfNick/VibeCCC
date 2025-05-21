import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getFeaturedCampaigns() {
  return await prisma.campaign.findMany({
    take: 3,
    orderBy: { matchDate: 'asc' },
  });
}

export default async function HomePage() {
  const campaigns = await getFeaturedCampaigns();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Join the Club that Gets Good Results from Bad Behavior</h1>
          <p className="text-xl mb-8">Create or join charity card clubs for causes you care about. Make a difference in your community today.</p>
          <div className="space-x-4">
            <Link href="/campaigns/new" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Start a Campaign
            </Link>
            <Link href="/campaigns" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
              Browse Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <div key={c.id} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                    Placeholder Image
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">{c.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">{c.teamName}</span> vs <span className="font-medium">{c.opponentName}</span>
                  </p>
                  <p className="text-gray-500 mb-2">
                    Match Date: {new Date(c.matchDate).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2 text-xs">
                      ${c.yellowCardAmount.toString()} / Yellow Card
                    </span>
                    <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      ${c.redCardAmount.toString()} / Red Card
                    </span>
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{c.description}</p>
                </div>
                <Link
                  href={`/campaigns/${c.id}`}
                  className="mt-4 inline-block text-purple-600 hover:text-purple-800 font-medium"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}