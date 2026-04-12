"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>)=>{
    const isValidate = LoginSchema.safeParse(values);
    if(!isValidate.success){
        return { error: "Invalid Fields!"};
    };

    return { success: " Email Sent"}
    
};