"use server";
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>)=>{
    const isValidate = RegisterSchema.safeParse(values);
    
    if(!isValidate){
        return {error: "Invalid Input"};
    };
    return {success: "Register"};
};