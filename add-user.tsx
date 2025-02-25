import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash("123123123", 10);

    const user = await db.user.create({
      data: {
        name: 'Wesleu',
        email: 'wesleygado@gmail.com',
        password: hashedPassword,
        role: 'admin',
        active: true
      }
    });

    console.log('Usuário criado: ', user);
  } catch (error) {
    console.log('Erro ao criar usuário: ', error)
  } finally {
    await db.$disconnect();
  }
}

main();