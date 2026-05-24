import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { firebaseSignInWithPassword } from "@/lib/firebase/auth";
import { getOrCreateUserProfile } from "@/lib/firebase/profiles";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const firebaseResult = await firebaseSignInWithPassword(email, password);

        if (!firebaseResult.data) {
          return null;
        }

        const displayName = firebaseResult.data.displayName?.trim();
        const fallbackName = email.split("@")[0] || "User";
        const name = displayName || fallbackName;

        const profile = await getOrCreateUserProfile({
          uid: firebaseResult.data.localId,
          email,
          name,
          role: "STUDENT",
        });

        return {
          id: profile.uid,
          email: profile.email,
          name: profile.name,
          role: profile.role,
        };
      },
    }),
  ],
});
