import { verifyPassword } from "@/lib/crypto";
import prisma from "@/lib/database";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const usernameOnDatabase = await prisma.user.findUnique({
    where: {
      username: body?.username,
    },
  });

  if (usernameOnDatabase) {
    const verification = await verifyPassword(
      body?.password,
      usernameOnDatabase.password
    );

    const stores = (
      await prisma.role.findMany({
        where: {
          userId: usernameOnDatabase.id,
        },
      })
    ).map(async (role) => {
      const store = await prisma.store.findUnique({
        where: {
          id: role.storeId as string,
        },
      });

      return {
        storeId: store?.id as string,
        storeName: store?.name as string,
        function: role.function,
      };
    });

    const roles = await Promise.all(stores);

    const { password, ...data } = usernameOnDatabase;

    if (verification) {
      const token = jwt.sign({ ...data, roles }, process.env.JWT_SECRET || "", {
        expiresIn: "1d",
      });

      const cookie = serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      const response = NextResponse.json({
        status: 200,
        message: "Login successful",
      });

      response.headers.set("Set-Cookie", cookie);

      return response;
    } else {
      return NextResponse.json({
        status: 401,
        error: "invalid login credentials, incorrect password",
      });
    }
  } else {
    return NextResponse.json({
      status: 401,
      error: "invalid login credentials, username not found",
    });
  }
}
