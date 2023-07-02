
'use client';
import { useSession } from 'next-auth/react';
import React from 'react';




export default function ProfilePage() {
    //tenemos la informacion de la sesion
    const { data: session } = useSession();
    return (
        <div>
            <h1>Hello Page Profile</h1>
            <hr />


            <div className='flex flex-col'>
                <span>{session?.user?.name ?? 'No Name'}</span>
                <span>{session?.user?.email ?? 'No Email'}</span>
                <span>{session?.user?.image ?? 'No Image'}</span>
            </div>
        </div>
    );
}