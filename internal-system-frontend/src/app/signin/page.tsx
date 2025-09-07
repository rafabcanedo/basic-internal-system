"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, FormProvider } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { HookFormTextInput } from "@/components/hook-form-text-input"

interface IForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
   .string()
   .email('Please enter a valid email.')
   .required('Email is required.'),
  password: yup
   .string()
   .min(6, 'Password must be at least 6 characters long.')
   .required('Password is required.')
})

export default function SignInForm() {
  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: IForm) => {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
       <HookFormTextInput name="email" label="Email" type="text" />
       <HookFormTextInput name="password" label="Password" type="password" />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="w-full" type="submit">
         Login
        </Button>
      </CardFooter>
      <div className="flex flex-row justify-center text-center mt-6">
          <span className="text-sm">
            Don't have an account?
            <Link
              href="/signup"
              className="hover:underline focus:outline-none ml-1"
            >
              Sign up
            </Link>
          </span>
        </div>
    </Card>
    </form>
    </FormProvider>
    </div>
  )
}