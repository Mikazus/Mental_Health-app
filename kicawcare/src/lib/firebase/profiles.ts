import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";

export type UserRole = "STUDENT" | "COUNSELOR" | "ADMIN";

export type UserProfile = {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
};

type FirestoreUserProfile = {
  email: string;
  name: string;
  role: UserRole;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const USERS_COLLECTION = "users";

function normalizeRole(role: unknown): UserRole {
  if (role === "ADMIN" || role === "COUNSELOR" || role === "STUDENT") return role;
  return "STUDENT";
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getAdminDb().collection(USERS_COLLECTION).doc(uid).get();

  if (!snapshot.exists) return null;

  const data = snapshot.data() as FirestoreUserProfile | undefined;

  if (!data) return null;

  return {
    uid,
    email: data.email,
    name: data.name,
    role: normalizeRole(data.role),
  };
}

export async function createUserProfile(input: {
  uid: string;
  email: string;
  name: string;
  role?: UserRole;
}): Promise<UserProfile> {
  const profile: UserProfile = {
    uid: input.uid,
    email: input.email,
    name: input.name,
    role: normalizeRole(input.role),
  };

  const timestamp = FieldValue.serverTimestamp();

  await getAdminDb()
    .collection(USERS_COLLECTION)
    .doc(profile.uid)
    .set({
      email: profile.email,
      name: profile.name,
      role: profile.role,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

  return profile;
}

export async function getOrCreateUserProfile(input: {
  uid: string;
  email: string;
  name: string;
  role?: UserRole;
}): Promise<UserProfile> {
  const existing = await getUserProfile(input.uid);

  if (existing) return existing;

  return createUserProfile(input);
}
