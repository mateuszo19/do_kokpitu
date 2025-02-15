import { ReactNode } from "react";
import {Button} from "@mui/material";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen w-screen">
            <div className="flex flex-col justify-between w-[300px] px-8 py-12 border">
                <div className='flex flex-col gap-8'>
                    <Image src="/icon/DoKokpitu.svg" className='text-primary m-auto' alt="Logo" width={100} height={100} />
                    <Button variant="outlined">LogBook</Button>
                    <Button variant="outlined">Kursy</Button>
                </div>
                <div className='flex flex-col gap-8'>
                    <Button variant="text">Wyloguj</Button>
                    <Button variant="contained">Ustawienia</Button>
                </div>
            </div>

            <main className="flex-1 bg-background p-6">{children}</main>
        </div>
    );
}