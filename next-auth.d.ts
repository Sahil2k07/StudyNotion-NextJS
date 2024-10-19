import NextAuth, { DefaultSession, User } from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accountType: "Admin" | "Instructor" | "Student";
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    accountType: "Admin" | "Instructor" | "Student";
    email: string;
  }
}
