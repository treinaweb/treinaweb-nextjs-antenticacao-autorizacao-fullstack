import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as db from "@/backend/repository/user.repository";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'TreinaBlog',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Digite seu email...',
        },
        password: {
          label: 'Senha',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        try {
          if(!credentials?.email || !credentials?.password) {
            throw new Error("Credenciais não fornecidas");
          }

          const user = await db.obterUserPorEmail(credentials.email);

          if (!user?.email) {
            throw new Error('Usuário não encontrado');
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if(!passwordMatch) {
            throw new Error('Email ou senha inválido');
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email
          }

        } catch (error) {
          console.error("Auth Error :", error);
          return null;
        }
      }
    })
  ],
  theme: {
    colorScheme: 'light',
    logo: 'https://www.treinaweb.com.br/assets/images/treinaweb-logo@2x.webp'
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };