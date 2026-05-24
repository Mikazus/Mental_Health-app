import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type FirebaseAdminConfig = {
  projectId: string | undefined;
  clientEmail: string | undefined;
  privateKey: string | undefined;
};

let adminApp: App | null = null;

function getFirebaseAdminConfig(): FirebaseAdminConfig {
  return {
    projectId: process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
}

export function getFirebaseAdminApp(): App {
  if (adminApp) return adminApp;

  const { projectId, clientEmail, privateKey } = getFirebaseAdminConfig();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID (or NEXT_PUBLIC_FIREBASE_PROJECT_ID), FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY."
    );
  }

  adminApp = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

  return adminApp;
}

export function getAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}
