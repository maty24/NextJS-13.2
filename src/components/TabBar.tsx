'use client'

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
  const router = useRouter();
  const [select, setselect] = useState(currentTab);
  const onTabSelected = (tab: number) => {
    setselect(tab);
    //esto es para guardar la seleccion en una cookie 
    setCookie('selectedTab', tab.toString() );
    //me tiene que refrescar la pagina para que se actualice el valor de la cookie ya que las cookies se leen en el servidor y no en el cliente  
    router.refresh();
  }
  return (
    <div className={`
        grid w-full space-x-2 rounded-xl bg-gray-200 p-2
        grid-cols-4
      `}>
      {
        tabOptions.map(e => (
          <div key={e}>
            <input checked={select === e} onChange={() => { }} type="radio" id="1" className="peer hidden" />
            <label onClick={() => onTabSelected(e)} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {e}
            </label>
          </div>
        ))
      }
    </div>
  )
}

