import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  //estoy obteniendo la sesion del servidor
  const session = await getServerSession(authOptions);

  //si no hay sesion, redirigir a la pagina de login
  if (!session) {
    redirect('/api/auth/signin');
  }


  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
        </div>
      </WidgetItem>
    </div>
  );
}