import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

//este metodo lo usamos para obtener el usuario de la sesion
export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  //me retorna el usuario de la sesion
  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  //si el email o el password no existen no hacemos nada
  if (!email || !password) return null;

  //buscamos el usuario por email
  const user = await prisma.user.findUnique({ where: { email } });

  //si no existe el usuario lo creamos
  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  //si el existe el usuario y la contraseña no es correcta retornamos null
  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      //la contraseña la encriptamos
      password: bcrypt.hashSync(password),
      //el username es el email sin el @
      name: email.split("@")[0],
    },
  });

  return user;
};
