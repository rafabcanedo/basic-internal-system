"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { HookFormTextInput } from "@/components/hook-form-text-input"
import { toast } from "sonner"

interface IProfileForm {
  name: string
  email: string;
  password: string;
  phone: string;
}

interface IUserAddress extends IProfileForm {
  street: string;
  neighborhood: string;
  zip: string;
}

type ProfileFormValues = Partial<IUserAddress>;

export const ProfileForm = () => {

  const defaultValues: ProfileFormValues = {
    name: "John Jason",
    email: "john@example.com",
    password: "",
    phone: "+55 11 997117911",
    street: "John Jason Street",
    neighborhood: "Downtown",
    zip: "374970",
  }

  const methods = useForm<ProfileFormValues>({
    defaultValues,
    mode: "onChange",
  })

  const { handleSubmit, formState, reset, getValues } = methods
  const { isSubmitting } = formState

  const handleChangeDetailsAccount: SubmitHandler<ProfileFormValues> = (data) => {
    console.log("Values to save:", data);

    reset({ ...getValues(), password: "" }, { keepDirty: false, keepTouched: false })

    toast.success("Profile changed recorded.");
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleChangeDetailsAccount)}>
          <Card className="w-[800px]">
            <CardHeader>
              <CardTitle className="text-center">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-zinc-600">
              <HookFormTextInput title="Name" name="name" label="Jhon Jason" type="text" />
              <HookFormTextInput title="Email" name="email" label="jhon@email.com" type="text" />
              <HookFormTextInput title="Password" name="password" label="Password" type="password" />
              <HookFormTextInput title="Phone" name="phone" label="+55 11 997117911" type="text" />

              <HookFormTextInput title="Street" name="street" label="Jhon Jason Street" type="text" />
              <HookFormTextInput title="Neighborhood" name="neighborhood" label="Downtown" type="text" />
              <HookFormTextInput title="Zip" name="zip" label="374970" type="text" />
            </CardContent>
            <CardFooter className="flex flex-col justify-end">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}