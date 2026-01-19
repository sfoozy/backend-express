import { PrismaClient } from '../prisma/client/client.js';
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

import { PrismaPg } from '@prisma/adapter-pg';

const globalWithPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

let prisma: PrismaClient;
if (globalWithPrisma.prisma) {
  prisma = globalWithPrisma.prisma;
} else {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL || "",
  });
  prisma = new PrismaClient({ adapter });
}

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
}

export default prisma;
