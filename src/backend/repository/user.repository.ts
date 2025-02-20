"use server"
import { PrismaClient } from "@prisma/client"
import { Post } from "../model/post";
import { User } from "../model/user";

const db = new PrismaClient();

export async function obterUserPorEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true
      }
    })

    if(!user) {
      return null;
    }

    return user as User;
  } catch (error) {
    console.error('Database error', error);
    return null;
  }
}