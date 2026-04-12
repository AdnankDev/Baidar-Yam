"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useTransition } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";


import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const LoginForm = ()=>{
    const [error , setError] = useState<string | undefined>("");
    const [success, setSuccess ] = useState<string | undefined>("");
    const [isPending , startTransition ] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });


    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
      startTransition(()=>{
        login(values)
        .then((data)=>{
            setError(data.error);
            setSuccess(data.success);
        })
      })
    };

    return(
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {/* Email Field */}
                    <Controller
                        control={form.control}
                        name="email"
                        render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="john.does@example.com"
                                    type="email"
                                    data-invalid={fieldState.invalid}/>
                                
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}>

                    </Controller>

                    {/* Password Field */}
                    <Controller 
                        control={form.control}
                        name="password"
                        render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input 
                                    disabled={isPending}
                                    {...field}
                                    placeholder="*********"
                                    type="password"
                                    data-invalid={fieldState.invalid}
                                    />
                                
                                <FieldError>{ fieldState.error?.message }</FieldError>
                            </Field>
                        )}>

                    </Controller>
                </div>
                <FormError messege={error}/>
                <FormSuccess messege={success}/>
                <Button  
                    disabled={isPending}
                    type="submit"
                    className="w-full cursor-pointer">
                        Login
                </Button>
           </form>
        </CardWrapper>
    )
}