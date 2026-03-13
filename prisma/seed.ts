import { PrismaClient, ProjectType, ProjectCategory, ProjectStatus, ObjectType, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clean existing data (optional - for dev only)
  // Note: In production, comment out these lines
  await prisma.transaction.deleteMany();
  await prisma.stake.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.projectObject.deleteMany();
  await prisma.waterData.deleteMany();
  await prisma.waterObject.deleteMany();
  await prisma.project.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.user.deleteMany();

  // Create system/admin user first
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@looporb.io",
      password: adminPassword,
      name: "System Admin",
      handle: "@admin",
      role: UserRole.ADMIN,
      isAdmin: true,
      unityBalance: 10000,
    },
  });

  console.log(`Created admin user: ${admin.id}`);

  // Create demo objects
  const objects = [
    {
      name: "Аральское море",
      nameLocal: "Orol dengizi",
      type: ObjectType.LAKE,
      country: "Узбекистан",
      region: "Каракалпакстан",
      coordinates: JSON.stringify({ lat: 45.0, lng: 60.0 }),
      description: "Бывшее крупное солёное озеро в Центральной Азии, переживающее экологическую катастрофу",
      status: "CRITICAL",
      creatorId: admin.id,
    },
    {
      name: "Насосная станция №2",
      type: ObjectType.PUMPING_STATION,
      country: "Узбекистан",
      region: "Джизак",
      coordinates: JSON.stringify({ lat: 40.12, lng: 67.83 }),
      description: "Современная насосная станция водоснабжения",
      status: "ACTIVE",
      creatorId: admin.id,
    },
    {
      name: "Река Амударья",
      nameLocal: "Amudaryo",
      type: ObjectType.RIVER,
      country: "Узбекистан",
      region: "Каракалпакстан",
      coordinates: JSON.stringify({ lat: 44.0, lng: 58.0 }),
      description: "Крупнейшая река Средней Азии",
      status: "MONITORING",
      creatorId: admin.id,
    },
  ];

  for (const obj of objects) {
    await prisma.waterObject.create({
      data: obj as any,
    });
  }

  console.log(`Created ${objects.length} water objects`);

  // Create demo projects
  const projects = [
    {
      name: "Восстановление Аральского моря",
      slug: "aral-sea-restoration",
      shortDescription: "Комплексная программа по восстановлению экосистемы Аральского моря",
      description: "Долгосрочный проект направленный на восстановление водного баланса и экосистемы региона Аральского моря. Включает мероприятия по снижению водопотребления, модернизацию ирригационных систем и посадку солеустойчивых растений.",
      type: ProjectType.RESTORATION,
      category: ProjectCategory.CONSERVATION,
      status: ProjectStatus.ACTIVE,
      country: "Узбекистан",
      region: "Каракалпакстан",
      coordinates: JSON.stringify({ lat: 45.0, lng: 60.0 }),
      targetAmount: 500000,
      raisedAmount: 125000,
      minStake: 100,
      expectedApy: 15,
      esgScore: 95,
      sdgGoals: [6, 13, 15],
      coverImage: "/images/projects/aral-sea.jpg",
      creatorId: admin.id,
    },
    {
      name: "Модернизация станций Джизака",
      slug: "jizak-stations-modernization",
      shortDescription: "Модернизация водоподъемных сооружений в Джизакской области",
      description: "Проект по реконструкции и модернизации насосных станций в Джизакской области с целью повышения энергоэффективности и снижения потерь воды.",
      type: ProjectType.INFRASTRUCTURE,
      category: ProjectCategory.WATER_TREATMENT,
      status: ProjectStatus.FUNDING,
      country: "Узбекистан",
      region: "Джизак",
      coordinates: JSON.stringify({ lat: 40.12, lng: 67.83 }),
      targetAmount: 200000,
      raisedAmount: 45000,
      minStake: 50,
      expectedApy: 18,
      esgScore: 88,
      sdgGoals: [6, 9, 11],
      coverImage: "/images/projects/pumping-station.jpg",
      creatorId: admin.id,
    },
    {
      name: "Мониторинг Амударьи",
      slug: "amudarya-monitoring",
      shortDescription: "Система мониторинга качества воды реки Амударья",
      description: "Развертывание сети IoT-сенсоров для круглосуточного мониторинга качества воды реки Амударья с передачей данных в реальном времени.",
      type: ProjectType.MONITORING,
      category: ProjectCategory.CONSERVATION,
      status: ProjectStatus.ACTIVE,
      country: "Узбекистан",
      region: "Каракалпакстан",
      coordinates: JSON.stringify({ lat: 44.0, lng: 58.0 }),
      targetAmount: 150000,
      raisedAmount: 78000,
      minStake: 25,
      expectedApy: 12,
      esgScore: 92,
      sdgGoals: [6, 13],
      coverImage: "/images/projects/river-monitoring.jpg",
      creatorId: admin.id,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project as any,
    });
  }

  console.log(`Created ${projects.length} projects`);

  // Create achievements
  const achievements = [
    {
      name: "Первооткрыватель",
      description: "Добавьте свой первый водный объект",
      category: "EXPLORER",
      icon: "droplet",
      color: "#0ea5e9",
      xpReward: 100,
      unityReward: 5,
      condition: JSON.stringify({ type: "objects_count", value: 1 }),
    },
    {
      name: "Исследователь",
      description: "Добавьте 10 водных объектов",
      category: "EXPLORER",
      icon: "map",
      color: "#22d3ee",
      xpReward: 500,
      unityReward: 25,
      condition: JSON.stringify({ type: "objects_count", value: 10 }),
    },
    {
      name: "Сборщик данных",
      description: "Добавьте первые данные о качестве воды",
      category: "SCIENTIST",
      icon: "flask",
      color: "#10b981",
      xpReward: 50,
      unityReward: 3,
      condition: JSON.stringify({ type: "data_count", value: 1 }),
    },
    {
      name: "Инвестор",
      description: "Вложите UNITY в первый проект",
      category: "INVESTOR",
      icon: "trending-up",
      color: "#f59e0b",
      xpReward: 200,
      unityReward: 10,
      condition: JSON.stringify({ type: "stake_count", value: 1 }),
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement as any,
    });
  }

  console.log(`Created ${achievements.length} achievements`);

  // Create missions
  const missions = [
    {
      title: "Добавьте объект",
      description: "Добавьте новый водный объект на карту",
      type: "DAILY",
      category: "DATA_COLLECTION",
      requirements: JSON.stringify({ action: "add_object", count: 1 }),
      xpReward: 50,
      unityReward: 2,
      isActive: true,
    },
    {
      title: "Соберите данные",
      description: "Добавьте данные о качестве воды",
      type: "DAILY",
      category: "DATA_COLLECTION",
      requirements: JSON.stringify({ action: "add_data", count: 1 }),
      xpReward: 30,
      unityReward: 1,
      isActive: true,
    },
    {
      title: "Пригласите друга",
      description: "Пригласите нового участника в экосистему",
      type: "WEEKLY",
      category: "SOCIAL",
      requirements: JSON.stringify({ action: "invite_user", count: 1 }),
      xpReward: 100,
      unityReward: 5,
      isActive: true,
    },
  ];

  for (const mission of missions) {
    await prisma.mission.create({
      data: mission as any,
    });
  }

  console.log(`Created ${missions.length} missions`);

  // Create wallet for admin
  await prisma.wallet.create({
    data: {
      userId: admin.id,
      balance: 10000,
      totalEarned: 10000,
      totalStaked: 0,
    },
  });

  console.log("Created admin wallet");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
