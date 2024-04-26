import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "@auth/core/adapters";
import { AdapterUser } from "@auth/core/adapters";

export default function CustomPrismaAdapter(
  prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): Adapter {
  const p = prisma as PrismaClient;

  return {
    ...PrismaAdapter(prisma),
    createUser(data: AdapterUser) {
      // custom code here
      //   const user = p.user.findUnique({ where: { email: data.email } });
      return p.user.create({ data });
    },
  };
}
