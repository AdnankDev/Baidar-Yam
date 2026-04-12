"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const fontPopin = Poppins({
    subsets: ["latin"],
    weight: "400"
})

interface BackButtonProps {
    href: string
    label: string
}
export const BackButton = ({href, label}: BackButtonProps)=>{
    return(
        <Button variant={"link"} 
                className={cn("font-normal w-full font-big", fontPopin.className)}
                size={"sm"}
                asChild
                >
           <Link href={href}>
           {label}
           </Link>
        </Button>
    )
}

