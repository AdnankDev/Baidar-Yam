"use client"
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useTransition } from "react";

import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register} from "@/actions/register";
export const RegisterForm = ()=>{
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });


    const handleSubmit = (values: z.infer<typeof RegisterSchema>)=>{
       setError("");
       setSuccess("");

       startTransition(()=>{
        register(values)
        .then((data)=>{
            setError(data.error);
            setSuccess(data.success);
        })
       })
       
    };
    return(
        <CardWrapper
            headerLabel="Create an Account"
            backButtonHref="/auth/login"
            backButtonLabel="Already have an account?"
            showSocial>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

                    {/* Name */}
                    <Controller 
                        control={form.control}
                        name="name"
                        render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input 
                                    {...field}
                                    placeholder="Name"
                                    type="name"/>
                                    disabled={isPending}
                                    <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}>

                    </Controller>
                    {/* Email Field */}
                    <Controller
                        control={form.control}
                        name="email"
                        render={({field, fieldState})=>(
                          <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input 
                                disabled={isPending}
                                {...field}
                                placeholder="johendoe@gmail.com"
                                type="email"
                                data-invalid={fieldState.invalid}/>
                                <FieldError>{fieldState.error?.message}</FieldError>
                          </Field>
                        )}>
                     </Controller>

                        {/* Password */}
                     <Controller
                        control={form.control}
                        name="password"
                        render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input 
                                    disabled={isPending}
                                    {...field}
                                    placeholder="Password"
                                    type="password"
                                    data-invalid={fieldState.invalid}/>
                                    <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}>
                     </Controller>
                    <FormError messege={error}/>
                    <FormSuccess messege={success}/>
                     <Button className="w-full" disabled={isPending}>Create Account</Button>
                </form>

        </CardWrapper>
    );
};