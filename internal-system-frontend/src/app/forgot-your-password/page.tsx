"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});

export default function ForgotYourPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({ email }, { abortEarly: false });

      console.log("Password reset triggered for:", email);

      toast.success("Password reset link sent to your email.");
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        toast.error(err.errors[0]);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md px-12 py-16 mx-auto">
        <div className="flex flex-col items-center justify-center gap-1 mb-4">
          <span className="text-zinc-900 font-poppins text-lg">
            Forgot your Password?
          </span>
          <span className="text-zinc-500 font-poppins text-base">
            Please enter your email for the code
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <div>
            <label htmlFor="" className="text-zinc-900 font-opens">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-72 focus:outline focus:outline-primary"
            />
          </div>

          <div className="mt-4">
            <Button size="sm" type="submit">
              Reset my passoword
            </Button>
          </div>
        </form>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => router.back()}
            className="bg-transparent font-poppins text-xs h-8 px-4 hover:bg-tambo-primary-hover/60 rounded-sm cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}