import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import bcrypt from "bcrypt";
import z from "zod";
import type { Awaitable, NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const credentialsSchema = z
          .object({
            email: z.string().trim().email({ message: "Invalid Email" }),
            password: z.string().trim(),
          })
          .passthrough();

        try {
          credentialsSchema.parse(credentials);
        } catch (error) {
          return null;
        }

        const { email, password } = credentials;

        await InitializeDatabase();

        const user = await AppDataSource.getRepository("User").findOne({
          where: { email },
          relations: ["additionalInformation"],
        });

        if (!user || !user.isSignedIn) {
          return null;
        }

        if (!(await bcrypt.compare(password, user.password))) return null;

        return {
          id: user.id,
          email: user.email,
          accountType: user.accountType,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        await InitializeDatabase();

        const user = await AppDataSource.getRepository("User").findOne({
          where: { email: profile.email },
          relations: ["additionalInformation"],
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            accountType: user.accountType,
          } as Awaitable<User>;
        }
        return {
          id: profile.id,
          email: profile.email,
          accountType: "Student",
        } as Awaitable<User>;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      async profile(profile) {
        await InitializeDatabase();

        const user = await AppDataSource.getRepository("User").findOne({
          where: { email: profile.email },
          relations: ["additionalInformation"],
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            accountType: user.accountType,
          } as Awaitable<User>;
        }

        return {
          id: profile.id,
          email: profile.email,
          accountType: "Student",
        } as Awaitable<User>;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/auth/login",
    signOut: "/dashboard/my-profile",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.accountType = user.accountType;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.accountType = token.accountType;
      session.user.email = token.email;

      return session;
    },
  },
};
