import CredentialProvider from "next-auth/providers/credentials";
import Admin from "@/models/Admin";
import { NextAuthOptions } from "next-auth";
import dbConnect from "./dbConnect";

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
