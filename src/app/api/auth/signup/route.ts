import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  console.log("HDSJFLSDJFKLDSJFK");
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    try {
      const user = await createUser(email, password, name);

      const response = NextResponse.json(
        { message: "User created successfully", user },
        { status: 201 }
      );

      return response;
    } catch (error: any) {
      if (error.message === "User already exists") {
        return NextResponse.json(
          { message: "This email is already registered, simply login." },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
