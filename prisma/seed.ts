import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create achievements
  const achievements = [
    {
      name: 'Первые шаги',
      description: 'Создайте свой первый пост в ленте',
      category: 'EXPLORER',
      icon: 'Footprints',
      color: 'blue',
      xpReward: 50,
      unityReward: 10,
      condition: { type: 'posts_count', value: 1 },
    },
    {
      name: 'Активный участник',
      description: 'Создайте 10 постов',
      category: 'EXPLORER',
      icon: 'MessageSquare',
      color: 'blue',
      xpReward: 200,
      unityReward: 50,
      condition: { type: 'posts_count', value: 10 },
    },
    {
      name: 'Сборщик данных',
      description: 'Добавьте 5 записей данных о воде',
      category: 'SCIENTIST',
      icon: 'Database',
      color: 'emerald',
      xpReward: 300,
      unityReward: 100,
      condition: { type: 'data_count', value: 5 },
    },
    {
      name: 'Исследователь',
      description: 'Добавьте 25 записей данных о воде',
      category: 'SCIENTIST',
      icon: 'Microscope',
      color: 'emerald',
      xpReward: 1000,
      unityReward: 500,
      condition: { type: 'data_count', value: 25 },
    },
    {
      name: 'Инвестор',
      description: 'Инвестируйте в первый проект',
      category: 'INVESTOR',
      icon: 'TrendingUp',
      color: 'purple',
      xpReward: 500,
      unityReward: 200,
      condition: { type: 'stakes_count', value: 1 },
    },
    {
      name: 'Портфельный игрок',
      description: 'Инвестируйте в 5 проектов',
      category: 'INVESTOR',
      icon: 'PieChart',
      color: 'purple',
      xpReward: 2000,
      unityReward: 1000,
      condition: { type: 'stakes_count', value: 5 },
    },
    {
      name: 'Участник проекта',
      description: 'Присоединитесь к проекту',
      category: 'ACTIVIST',
      icon: 'Users',
      color: 'orange',
      xpReward: 100,
      unityReward: 25,
      condition: { type: 'projects_count', value: 1 },
    },
    {
      name: 'Уровень 5',
      description: 'Достигните 5 уровня',
      category: 'SPECIAL',
      icon: 'Star',
      color: 'yellow',
      xpReward: 500,
      unityReward: 100,
      condition: { type: 'level', value: 5 },
    },
    {
      name: 'Уровень 10',
      description: 'Достигните 10 уровня',
      category: 'SPECIAL',
      icon: 'Award',
      color: 'yellow',
      xpReward: 2000,
      unityReward: 500,
      condition: { type: 'level', value: 10 },
    },
    {
      name: 'Уровень 20',
      description: 'Достигните 20 уровня - статус Реки',
      category: 'SPECIAL',
      icon: 'Crown',
      color: 'yellow',
      xpReward: 10000,
      unityReward: 2500,
      condition: { type: 'level', value: 20 },
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {},
      create: achievement,
    });
  }
  console.log(`Created ${achievements.length} achievements`);

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

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
