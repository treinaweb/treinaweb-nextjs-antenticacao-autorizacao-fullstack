import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if( credentials && 
            credentials.email === 'admin@admin.com' && 
            credentials.password === 'admin') {

          return {
            id: "1",
            name: "admin",
            email: "admin@admin.com"
          };
        }
        return null;
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