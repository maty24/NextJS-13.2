import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
  //el adapter nos sirve para conectar next-auth con prisma, esto va a insertar los usuarios en la base de datos que tenemos en prisma
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    //este es para que se pueda loguear con email y password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "email",
          placeholder: "usuario@google.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "******",
        },
      },
      //esta parte es cuando se loguea con email y password y se ejecuta el callback
      async authorize(credentials, req) {
        //cuando se loguea con email y password se ejecuta el callback y se ejecuta el signInEmailPassword
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        );

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],

  //esta parte es cuando se loguea con google , github o culquier otro proveedor
  session: {
    strategy: "jwt",
  },
  //el callback es para que se ejecute despues de que se loguea
  callbacks: {
    //primero se ejecuta el signIn
    async signIn({ user, account, profile, email, credentials }) {
      //console.log({ user });

      return true;
    },

    //despues se ejecuta el jwt
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });
      //al token le agregamos roles y si no existe le agregamos no-roles
      if (dbUser?.isActive === false) {
        throw Error("Usuario no está activo");
      }
      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },

    //despues se ejecuta el session
    async session({ session, token, user }) {
      //si tenemos session y un usuario
      if (session && session.user) {
        //estoy agregando los roles al session y el id
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      //retornamos el session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

//estoy exportando el handler para que pueda ser usado en el get y post
export { handler as GET, handler as POST };
