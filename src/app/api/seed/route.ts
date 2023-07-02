import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  //esto es para borrar todos los datos de la base de datos, el todo es el nombre de la tabla
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user

  const user = await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin','client','super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' },
        ]
      }
    }
  });


  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', complete: true },
  //     { description: 'Piedra del poder' },
  //     { description: 'Piedra del tiempo' },
  //     { description: 'Piedra del espacio' },
  //     { description: 'Piedra del realidad' },
  //   ]
  // })
 
  


  return NextResponse.json({ message: "Seed Executed" });
}
