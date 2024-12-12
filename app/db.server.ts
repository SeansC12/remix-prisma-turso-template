import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);

// Hard-code a unique key, so we can look up the client when this module gets re-imported
const prisma = singleton("prisma", () => new PrismaClient({ adapter }));
prisma.$connect();

export { prisma };
