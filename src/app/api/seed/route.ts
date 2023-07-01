import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  //esto es para borrar todos los datos de la base de datos, el todo es el nombre de la tabla
  await prisma.todo.deleteMany(); // delete * from todo

  await prisma.todo.createMany({
    data: [
      { description: "Pigey", complete: true },
      { description: "Pipe pasao a caca", complete: false },
      { description: "Pipe feo" },
      { description: "Pipe caca" },
    ],
  });

  return NextResponse.json({ message: "Seed Executed" });
}
