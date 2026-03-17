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
      title: 'Утренняя проверка',
      description: 'Зайдите на платформу сегодня',
      type: 'DAILY',
      category: 'EXPLORATION',
      xpReward: 10,
      unityReward: 1,
      requirements: { action: 'login', count: 1 },
    },
    {
      title: 'Проверьте воду',
      description: 'Добавьте запись о качестве воды',
      type: 'DAILY',
      category: 'DATA_COLLECTION',
      xpReward: 50,
      unityReward: 5,
      requirements: { action: 'add_data', count: 1 },
    },
    {
      title: 'Поделитесь новостью',
      description: 'Создайте пост в ленте',
      type: 'DAILY',
      category: 'SOCIAL',
      xpReward: 30,
      unityReward: 3,
      requirements: { action: 'create_post', count: 1 },
    },
    // Weekly missions
    {
      title: 'Активная неделя',
      description: 'Создайте 5 постов за неделю',
      type: 'WEEKLY',
      category: 'SOCIAL',
      xpReward: 200,
      unityReward: 20,
      requirements: { action: 'create_post', count: 5 },
    },
    {
      title: 'Сбор данных',
      description: 'Добавьте 10 записей о воде',
      type: 'WEEKLY',
      category: 'DATA_COLLECTION',
      xpReward: 300,
      unityReward: 50,
      requirements: { action: 'add_data', count: 10 },
    },
    {
      title: 'Пригласи друзей',
      description: 'Поделитесь платформой с 3 друзьями',
      type: 'WEEKLY',
      category: 'SOCIAL',
      xpReward: 150,
      unityReward: 30,
      requirements: { action: 'referral', count: 3 },
    },
    // One-time missions
    {
      title: 'Первый вклад',
      description: 'Инвестируйте в любой проект',
      type: 'ONETIME',
      category: 'PROJECT_PARTICIPATION',
      xpReward: 500,
      unityReward: 100,
      requirements: { action: 'stake', count: 1 },
    },
    {
      title: 'Пройдите обучение',
      description: 'Изучите материалы VOD Academy',
      type: 'ONETIME',
      category: 'EDUCATION',
      xpReward: 300,
      unityReward: 50,
      requirements: { action: 'complete_course', count: 1 },
    },
    {
      title: 'Исследователь',
      description: 'Добавьте данные из 5 разных локаций',
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
