import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Nome" type="text" required />
        <Input placeholder="Email" type="email" required />
        <Input placeholder="Senha" type="password" required />
        <Input placeholder="Telefone" type="tel" />
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
    </div>
  )
}