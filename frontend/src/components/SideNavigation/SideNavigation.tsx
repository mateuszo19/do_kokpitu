import Image from "next/image";
import {Button} from "@mui/material";
import {CiGrid41, CiLogout, CiSettings, CiViewList} from "react-icons/ci";
import Link from "next/link";

const SideNavigation = () => {
    return (
        <div className="flex flex-col bg-white justify-between w-[240px] px-8 py-12 border shadow-2xl">
            <div className='flex flex-col gap-8'>
                <Image src="/icon/DoKokpitu.svg" className='text-primary m-auto' alt="Logo" width={100} height={100} />
                <Link href="/dashboard/logbook">
                    <Button
                        startIcon={<CiViewList />}
                        variant="text">LogBook</Button>
                </Link>
                <Link href="/dashboard">
                    <Button
                        startIcon={<CiGrid41 />}
                        variant="text">Kursy</Button>
                </Link>
            </div>
            <div className='flex flex-col gap-8'>
                <Button
                    startIcon={<CiLogout />}
                    variant="text">Wyloguj</Button>
                <Button
                    startIcon={<CiSettings />}
                    variant="contained">Ustawienia</Button>
            </div>
        </div>
    )
};

export default SideNavigation;