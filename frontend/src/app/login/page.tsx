import {Button, TextField} from "@mui/material";
import Link from "next/link";
import Image from 'next/image'

const Login = () => {
    return (
        <section className="Login flex w-full h-full">
            <div className="absolute flex flex-col top-4 left-4">
                <Image src="/icon/DoKokpitu.svg" className='text-primary' alt="Logo" width={64} height={64} />
                <p className='text-sm font-semibold text-primary font-roboto'>DoKokpitu</p>
            </div>
            <div className="basis-5/12 h-full flex items-center justify-center">
                <div className="flex w-[400px] flex-col gap-12">
                    <div className="flex items-center text-sm gap-2">
                        <p className='text-black'>Nowy w <span className='font-bold'>DoKokpitu?</span></p>
                        <Link href="/logbook">
                            <span className='font-bold text-primary'>Zarejestruj się</span>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-8">
                        <TextField id="outlined-basic" label="E-mail" variant="outlined" />
                        <TextField id="outlined-basic" label="Hasło" variant="outlined" />
                    </div>
                    <div className='flex justify-end'>
                        <Link href="/dashboard">
                            <Button variant="contained">Zaloguj</Button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link href="/logbook">
                            <span className='font-bold text-primary'>Zapomniałeś hasła?</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="basis-7/12 bg-[url('/images/login.jpg')] bg-cover h-full bg-gray-200 rounded-tl-lg rounded-bl-lg">

            </div>
        </section>
    )
};

export default Login;