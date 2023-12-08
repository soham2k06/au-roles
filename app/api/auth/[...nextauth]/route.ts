import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import Admin from "@/models/Admin";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/utils/dbConnect";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {
        name: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials || !credentials.name || !credentials.password)
          return null;
        await dbConnect();
        const dbUser = await Admin.findOne({
          name: credentials.name,
        }).lean();
        console.log(typeof dbUser?.password);
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

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
