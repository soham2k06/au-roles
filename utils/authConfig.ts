import CredentialProvider from "next-auth/providers/credentials";

import { NextAuthOptions } from "next-auth";
import dbConnect from "./dbConnect";
import mongoose from "mongoose";
import { AdminProps } from "./types";

import Admin from "@/models/Admin";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {
        name: {},
        password: {},
      },

      async authorize(credentials): Promise<any> {
        if (!credentials || !credentials.name || !credentials.password)
          return null;
        await dbConnect();
        // const Admin = mongoose.model("Admin");
        const dbUser: AdminProps | null = await Admin.findOne({
          name: credentials.name,
        }).lean();
        if (dbUser && dbUser.password === credentials.password) return dbUser;
        else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
