"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useForm, FormProvider } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { HookFormTextInput } from "@/components/hook-form-text-input"
import Link from "next/link"

interface IRegisterAccount {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const schema = yup.object().shape({
  name: yup
   .string()
   .min(6, 'Password must be at least 6 characters long.')
   .required('Name is required.'),
  email: yup
   .string()
   .email('Please enter a valid email.')
   .required('Email is required.'),
  password: yup
   .string()
   .min(6, 'Password must be at least 6 characters long.')
   .required('Password is required.'),
  phone: yup
   .string()
   .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Phone is invalid.")
   .required('Phone is required.'),
})

export default function SignUpForm() {
  const methods = useForm<IRegisterAccount>({
    resolver: yupResolver(schema),
  })

  const handleRegisterAccount = (data: IRegisterAccount) => {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(handleRegisterAccount)}>
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <HookFormTextInput title="Name" name="name" label="Jhon Jason" type="text" />
        <HookFormTextInput title="Email" name="email" label="jhon@email.com" type="text" />
        <HookFormTextInput title="Password" name="password" label="Password" type="password" />
        <HookFormTextInput title="Phone" name="phone" label="+55 11 997117911" type="text" />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="w-full">Register</Button>
      </CardFooter>

      <div className="flex flex-row justify-center text-center mt-6">
          <span className="text-zinc-500 font-poppins text-sm">
            Already have an account?
            <Link href="/signin">
              <span className="text-blue-500 hover:underline focus:outline-none ml-1">
                Sign in
              </span>
            </Link>
          </span>
        </div>
    </Card>
    </form>
    </FormProvider>
    </div>
  )
}