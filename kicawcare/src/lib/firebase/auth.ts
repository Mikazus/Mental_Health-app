type FirebaseAuthPayload = {
  localId: string;
  email: string;
  displayName?: string;
  idToken: string;
};

type FirebaseAuthResult = {
  data: FirebaseAuthPayload | null;
  errorCode?: string;
};

const FIREBASE_AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1";

async function firebaseAuthRequest(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<FirebaseAuthResult> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    return { data: null, errorCode: "MISSING_API_KEY" };
  }

  const response = await fetch(`${FIREBASE_AUTH_BASE_URL}/${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, returnSecureToken: true }),
  });

  const json = (await response.json()) as FirebaseAuthPayload & {
    error?: { message?: string };
  };

  if (!response.ok) {
    return { data: null, errorCode: json.error?.message || "UNKNOWN" };
  }

  return { data: json };
}

export function firebaseSignInWithPassword(
  email: string,
  password: string
): Promise<FirebaseAuthResult> {
  return firebaseAuthRequest("accounts:signInWithPassword", { email, password });
}

export function firebaseSignUpWithPassword(
  email: string,
  password: string,
  displayName?: string
): Promise<FirebaseAuthResult> {
  return firebaseAuthRequest("accounts:signUp", {
    email,
    password,
    ...(displayName ? { displayName } : {}),
  });
}
