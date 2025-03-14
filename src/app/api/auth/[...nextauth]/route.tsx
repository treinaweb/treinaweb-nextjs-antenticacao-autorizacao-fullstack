import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as db from "@/backend/repository/user.repository";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import { redirect } from "next/dist/server/api-utils";

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      role: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
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
            email: user.email,
            role: user.role
          }

        } catch (error) {
          console.error("Auth Error :", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt: async ({token, user}) => {
      const customUser = user as any;
      
      if(user) {
        return {
          ...token,
          role: customUser.role
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if(!token.role) {
        const customUser = await db.obterUserPorEmail(token.email as string);

        return  {
          ...session,
          user: {
            name: token.name,
            email: token.email,
            role: customUser?.role,
          }
        }
      }

      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role
        }
      }
    }
  },
  theme: {
    colorScheme: 'light',
    logo: 'https://www.treinaweb.com.br/assets/images/treinaweb-logo@2x.webp'
  }
  
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };