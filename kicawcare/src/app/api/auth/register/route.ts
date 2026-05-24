import { NextResponse } from "next/server";
import { firebaseSignUpWithPassword } from "@/lib/firebase/auth";
import { createUserProfile, type UserRole } from "@/lib/firebase/profiles";
// import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // UB Email Validation
    if (!email.endsWith("ub.ac.id")) {
      return NextResponse.json({ message: "Must use a valid UB email address (@*.ub.ac.id)" }, { status: 400 });
    }

    const resolvedRole = (role as UserRole | undefined) ?? "STUDENT";

    if (resolvedRole !== "STUDENT" && resolvedRole !== "COUNSELOR") {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const firebaseResult = await firebaseSignUpWithPassword(email, password, name);

    if (!firebaseResult.data) {
      if (firebaseResult.errorCode === "EMAIL_EXISTS") {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
      }

      return NextResponse.json({ message: "Firebase registration failed" }, { status: 502 });
    }

    const profile = await createUserProfile({
      uid: firebaseResult.data.localId,
      email: firebaseResult.data.email,
      name: firebaseResult.data.displayName || name,
      role: resolvedRole,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: profile.uid,
          email: profile.email,
          name: profile.name,
          role: profile.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
