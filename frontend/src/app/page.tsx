"use client"

import Link from "next/link";
import {Button} from "@mui/material";

export default function Home() {


  return (
    <div className="bg-background">
        <Link href="/logbook">
            <button className='text-black'>goto</button>
        </Link>
        <Button variant="contained">Contained</Button>
    </div>
  );
}
