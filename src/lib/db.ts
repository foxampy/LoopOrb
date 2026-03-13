import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper functions for common operations
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      wallet: true,
      _count: {
        select: {
          posts: true,
          projects: true,
          data: true,
        },
      },
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserByTelegramId(telegramId: string) {
  return prisma.user.findUnique({
    where: { telegramId },
    include: { wallet: true },
  });
}

export async function createUser(data: {
  email?: string;
  name: string;
  avatar?: string;
  telegramId?: string;
  googleId?: string;
}) {
  return prisma.$transaction(async (tx) => {
    // Create user
    const user = await tx.user.create({
      data: {
        ...data,
        unityBalance: 10, // Registration bonus
      },
    });

    // Create wallet
    await tx.wallet.create({
      data: {
        userId: user.id,
        balance: 10,
      },
    });

    // Create registration transaction
    await tx.transaction.create({
      data: {
        userId: user.id,
        type: "REGISTRATION_BONUS",
        amount: 10,
        description: "Welcome bonus for joining LoopOrb",
        status: "COMPLETED",
      },
    });

    return user;
  });
}
