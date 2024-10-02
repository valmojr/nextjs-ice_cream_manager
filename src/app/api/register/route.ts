import { hashPassword } from "@/lib/crypto";
import prisma from "@/lib/database";
import { randomUUID } from "crypto";

type ImputedUser = {
  username: string;
  email: string;
  displayname: string;
  password: string;
  confirmPassword: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { confirmPassword, ...data }: ImputedUser = body;

    const newUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
        password: await hashPassword(data.password),
      },
    });

    if (newUser.id) {
      return Response.json({
        status: 201,
        user: newUser,
      });
    } else {
      return Response.json({
        status: 400,
        error: "Failed to register the User",
      });
    }
  } catch (error) {
    return Response.json({
      status: 400,
      error: "Bad Request - " + error,
    });
  }
}
