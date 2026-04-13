"use server";
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from "bcrypt";
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';


export const register = async (values: z.infer<typeof RegisterSchema>)=>{
    const isValidate = RegisterSchema.safeParse(values);
    
    if(!isValidate.success){
        return {error: "Invalid Input"};
    };

    const { email , password , name } = isValidate.data;
    const hashPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {error: "Email already exist"};
    }

    await db.user.create({
        data: {
            name,
            email,
            passwrod: hashPassword,
        }
    });

    // TODO: Send verifcation token email
    return {success: "User Created!"};
};