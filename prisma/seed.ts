import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const prisma = new PrismaClient();
const execAsync = promisify(exec);

async function main() {
  console.log('🌱 Start seeding...');

  // Run achievements seed
  console.log('\n🏆 Seeding achievements...');
  await execAsync('npx tsx prisma/seeds/achievements.seed.ts');

  // Create missions
  const missions = [
    // Daily missions
    {
      title: 'Morning Check',
      description: 'Log into the platform today',
      type: 'DAILY',
      category: 'EXPLORATION',
      xpReward: 10,
      unityReward: 1,
      requirements: { action: 'login', count: 1 },
    },
    {
      title: 'Check the Water',
      description: 'Add a water quality record',
      type: 'DAILY',
      category: 'DATA_COLLECTION',
      xpReward: 50,
      unityReward: 5,
      requirements: { action: 'add_data', count: 1 },
    },
    {
      title: 'Share News',
      description: 'Create a post in the feed',
      type: 'DAILY',
      category: 'SOCIAL',
      xpReward: 30,
      unityReward: 3,
      requirements: { action: 'create_post', count: 1 },
    },
    // Weekly missions
    {
      title: 'Active Week',
      description: 'Create 5 posts in a week',
      type: 'WEEKLY',
      category: 'SOCIAL',
      xpReward: 200,
      unityReward: 20,
      requirements: { action: 'create_post', count: 5 },
    },
    {
      title: 'Data Collection',
      description: 'Add 10 water records',
      type: 'WEEKLY',
      category: 'DATA_COLLECTION',
      xpReward: 300,
      unityReward: 50,
      requirements: { action: 'add_data', count: 10 },
    },
    {
      title: 'Invite Friends',
      description: 'Share the platform with 3 friends',
      type: 'WEEKLY',
      category: 'SOCIAL',
      xpReward: 150,
      unityReward: 30,
      requirements: { action: 'referral', count: 3 },
    },
    // One-time missions
    {
      title: 'First Investment',
      description: 'Invest in any project',
      type: 'ONETIME',
      category: 'PROJECT_PARTICIPATION',
      xpReward: 500,
      unityReward: 100,
      requirements: { action: 'stake', count: 1 },
    },
    {
      title: 'Complete Training',
      description: 'Study VOD Academy materials',
      type: 'ONETIME',
      category: 'EDUCATION',
      xpReward: 300,
      unityReward: 50,
      requirements: { action: 'complete_course', count: 1 },
    },
    {
      title: 'Explorer',
      description: 'Add data from 5 different locations',
      type: 'ONETIME',
      category: 'EXPLORATION',
      xpReward: 400,
      unityReward: 75,
      requirements: { action: 'add_data_locations', count: 5 },
    },
  ];

  for (const mission of missions) {
    await prisma.mission.create({
      data: mission,
    });
  }
  console.log(`Created ${missions.length} missions`);

  console.log('✅ Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
