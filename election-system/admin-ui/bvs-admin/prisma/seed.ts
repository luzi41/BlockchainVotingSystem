import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = "admin123"; // Klartext, nur für Seed
  const passwordHash = await bcrypt.hash(password, 10);

  // Prüfen, ob der Admin schon existiert
  const existing = await prisma.users.findUnique({
    where: { username: "admin" },
  });

  if (!existing) {
    await prisma.users.create({
      data: {
        username: "admin",
        email: "admin@example.com",
        password_hash: passwordHash,
        role: "SUPERADMIN",
      },
    });

    console.log("✅ Admin-User erstellt: admin / admin123");
  } else {
    console.log("ℹ️ Admin-User existiert bereits.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
