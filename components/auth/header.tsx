import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const fontPoppin  = Poppins({
    subsets: ["latin"],
    weight: "600"
})

interface HeaderProps {
    label : string
}

export const Header = ({label}: HeaderProps)=>{
    return(
        <div className="w-full flex flex-col spac-y-4 items-center justify-center">
            <h1 className={cn("text-7xl text-slate-700", fontPoppin.className)}>
                Auth
            </h1>
            <p className={cn("text-2xl text-slate-400", fontPoppin.className)}>
                {label}
            </p>
        </div>
    )
}