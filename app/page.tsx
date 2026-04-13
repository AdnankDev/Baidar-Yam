import { Big_Shoulders, Poppins } from "next/font/google"; // Use Display for titles
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import SignIn from "@/components/signin";

const fontPoppin = Poppins({
  subsets: ["latin"],
  weight: "600",
})
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big", 
});

export default function Home() {
  return (
   
    <main className={`${bigShoulders.variable} flex h-full flex-col items-center justify-center bg-sky-300`}>
        <div className="space-y-6 text-center">
         
          <h1 className="text-6xl font-big text-slate-700 font-semibold ">
            Auth
          </h1>
          <p className={cn("text-slate-600 text-2xl",
                        fontPoppin.className)}>A simple authentication service.
          </p>
          <div>
            <LoginButton mode="redirect">
              <Button variant={"secondary"} size={"lg"} className={cn("px-6 py-2.6 cursor-pointer", fontPoppin.className)}>Sign In</Button>
            </LoginButton>
            <SignIn/>
          </div>
        </div>
    </main>
  );
}
