import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a dummy user if not exists
  let user = await prisma.user.findFirst({ where: { email: 'demo@chairitycardclub.com' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Demo User',
        email: 'demo@chairitycardclub.com',
      },
    });
  }

  // Sample campaigns
  const campaigns = [
    {
      title: 'Yellow for Hope',
      description: 'Support our team! Donate for every yellow card we get this season.',
      yellowCardAmount: 5.0,
      redCardAmount: 15.0,
      matchDate: new Date('2024-06-01T15:00:00Z'),
      teamName: 'River City FC',
      opponentName: 'Lakeside United',
      userId: user.id,
    },
    {
      title: 'Red Card Relief',
      description: 'Every red card means a big donation to local charities!',
      yellowCardAmount: 2.0,
      redCardAmount: 20.0,
      matchDate: new Date('2024-06-05T18:30:00Z'),
      teamName: 'Metro Stars',
      opponentName: 'Downtown Rovers',
      userId: user.id,
    },
    {
      title: 'Cards for Kids',
      description: "Help us raise money for children's hospitals with every card this match.",
      yellowCardAmount: 10.0,
      redCardAmount: 25.0,
      matchDate: new Date('2024-06-10T20:00:00Z'),
      teamName: 'Sunset FC',
      opponentName: 'Mountain Eagles',
      userId: user.id,
    },
    {
      title: 'Fair Play Fundraiser',
      description: 'Even when we get cards, we give back! Join our charity drive.',
      yellowCardAmount: 3.0,
      redCardAmount: 12.0,
      matchDate: new Date('2024-06-12T17:00:00Z'),
      teamName: 'Harbor City',
      opponentName: 'Forest Rangers',
      userId: user.id,
    },
    {
      title: 'Support with Every Card',
      description: 'Your pledge for every yellow and red card helps our community.',
      yellowCardAmount: 7.5,
      redCardAmount: 18.0,
      matchDate: new Date('2024-06-15T19:00:00Z'),
      teamName: 'Valley United',
      opponentName: 'Coastal Kings',
      userId: user.id,
    },
    {
      title: 'Cards for a Cause',
      description: 'Turn every card into a donation for a good cause!',
      yellowCardAmount: 4.0,
      redCardAmount: 14.0,
      matchDate: new Date('2024-06-20T16:00:00Z'),
      teamName: 'City Wanderers',
      opponentName: 'Hilltop FC',
      userId: user.id,
    },
  ];

  for (const campaign of campaigns) {
    await prisma.campaign.create({ data: campaign });
  }

  console.log('Seeded 6 sample campaigns.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 