import prisma from "@/lib/database";
import { RoledUser } from "@/lib/types";
import { $Enums } from "@prisma/client";

export async function getUserById(id: string): Promise<RoledUser> {
  const userOnDatabase = await prisma.user.findUnique({ where: { id } });

  if (userOnDatabase) {
    const roleIds = (
      await prisma.role.findMany({
        where: {
          userId: userOnDatabase.id as string,
        },
      })
    ).map(async (role) => ({
      storeId: role.storeId as string,
      storeName: (
        await prisma.store.findUnique({
          where: {
            id: role.storeId as string,
          },
        })
      )?.name as string,
      function: role.function as $Enums.Functions,
    }));

    const roles = await Promise.all(roleIds);

    return {
      ...userOnDatabase,
      roles,
    };
  } else {
    throw new Error("User not found");
  }
}

export async function getAllUsers(requesterId: string) {
  const allRequesterRoles = await prisma.role.findMany({
    where: {
      userId: requesterId,
    },
  });

  if (
    allRequesterRoles.find(
      (role) => role.function === $Enums.Functions.Administrator
    )
  ) {
    return await prisma.user.findMany();
  }

  const allRequesterStoresEmployes = await prisma.user.findMany({
    where: {
      roles: {
        some: {
          store: {
            roles: {
              some: {
                id: {
                  in: allRequesterRoles.map((role) => role.id),
                },
              },
            },
          },
        },
      },
    },
  });

  const roledEmployees = await Promise.all(
    allRequesterStoresEmployes.map(async (employee) => {
      return {
        ...employee,
        roles: (
          await prisma.role.findMany({
            where: {
              user: {
                id: employee.id,
              },
            },
          })
        ).map(async (role) => {
          return {
            storeId: role.storeId,
            storeName: await prisma.store.findFirst({
              where: {
                id: role.storeId as string,
              },
            }),
            function: role.function,
          };
        }),
      };
    })
  );

  return roledEmployees;
}
