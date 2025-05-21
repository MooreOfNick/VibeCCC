const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create a dummy user if it doesn't exist
  const dummyUser = await prisma.user.upsert({
    where: { email: 'dummy@example.com' },
    update: {},
    create: {
      email: 'dummy@example.com',
      name: 'Dummy User',
    },
  });

  // Sample campaigns
  const campaigns = [
    {
      title: 'Support Local Youth Soccer',
      description: 'Help our youth team raise funds for equipment and travel expenses.',
      yellowCardAmount: 5,
      redCardAmount: 10,
      yellowCards: 0,
      redCards: 0,
      matchDate: new Date('2023-06-15T14:00:00Z'),
      teamName: 'Local Youth FC',
      opponentName: 'City Rivals',
      status: 'active',
      userId: dummyUser.id,
    },
    {
      title: 'Community Soccer Tournament',
      description: 'Annual community tournament to promote local soccer.',
      yellowCardAmount: 3,
      redCardAmount: 7,
      yellowCards: 0,
      redCards: 0,
      matchDate: new Date('2023-07-20T15:30:00Z'),
      teamName: 'Community United',
      opponentName: 'Neighborhood Stars',
      status: 'active',
      userId: dummyUser.id,
    },
    {
      title: 'School Soccer Fundraiser',
      description: 'Raising funds for school soccer programs and facilities.',
      yellowCardAmount: 4,
      redCardAmount: 8,
      yellowCards: 0,
      redCards: 0,
      matchDate: new Date('2023-08-10T16:00:00Z'),
      teamName: 'School Eagles',
      opponentName: 'District Dragons',
      status: 'active',
      userId: dummyUser.id,
    },
    {
      title: 'Charity Match for Local Cause',
      description: 'A friendly match to raise awareness and funds for a local charity.',
      yellowCardAmount: 6,
      redCardAmount: 12,
      yellowCards: 0,
      redCards: 0,
      matchDate: new Date('2023-09-05T17:00:00Z'),
      teamName: 'Charity All-Stars',
      opponentName: 'Community Heroes',
      status: 'active',
      userId: dummyUser.id,
    },
    {
      title: 'Weekend Soccer League',
      description: 'Weekly matches to promote community engagement and fitness.',
      yellowCardAmount: 2,
      redCardAmount: 5,
      yellowCards: 0,
      redCards: 0,
      matchDate: new Date('2023-10-15T14:30:00Z'),
      teamName: 'Weekend Warriors',
      opponentName: 'Leisure League',
      status: 'active',
      userId: dummyUser.id,
    },
    {
      title: 'Corporate Soccer Challenge',
      description: 'Annual corporate soccer challenge to foster team building and charity.',
      yellowCardAmount: 7,
      redCardAmount: 15,
      yellowCards: 0,
      redCards: 0,
      matchDate: new Date('2023-11-20T18:00:00Z'),
      teamName: 'Corporate Giants',
      opponentName: 'Business United',
      status: 'active',
      userId: dummyUser.id,
    },
  ];

  for (const campaign of campaigns) {
    await prisma.campaign.create({
      data: campaign,
    });
  }

  console.log('Database seeded with sample campaigns.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 