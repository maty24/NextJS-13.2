import { TabBar } from "@/components";
import { cookies } from "next/dist/client/components/headers";

export const meta = {
    title: "Cookies",
    description: "Cookies",
}

export default function CookiesPage() {
    //esto es para leer la cookie
    const cookieStore = cookies();

    //esto es para obtener el valor de la cookie
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';//le pongo un valor por defecto en caso de que no exista la cookie y el ? es para que no de error si no existe la cookie




    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div className="flex flex-col">
                <span className="text-3xl">Tabs</span>
                <TabBar currentTab={ +cookieTab } />
            </div>

        </div>
    );
}