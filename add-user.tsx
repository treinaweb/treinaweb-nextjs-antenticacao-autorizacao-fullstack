import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  try {
    const user = await db.user.create({
      data: {
        name: 'Wesley',
        email: 'admin@admin.com',
        password: '123123123',
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