"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { HookFormTextInput } from "@/components/hook-form-text-input"
import { addCostSchema } from "@/validations/schemas"
import { CostCategory } from "@/types"
import { Loader2 } from "lucide-react"
import { HookFormSelect } from "@/components/hook-form-select"
import { ICreateCostForm } from "./types"
import { useRouter } from "next/navigation"

const mockContacts = [
    { label: "John Doe", value: "john" },
    { label: "Jane Doe", value: "jane" },
    { label: "Alice", value: "alice" },
]

const mockCategories = [
    { label: "Food", value: "food" },
    { label: "Payment", value: "payment" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Travel", value: "travel" },
]

export default function CreateCostForm() {
    const router = useRouter()

    const methods = useForm<ICreateCostForm>({
        resolver: yupResolver(addCostSchema),
        mode: "onSubmit",
        defaultValues: {
            contact: "",
            category: "" as CostCategory,
            value: "",
            percent: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const handleOnSubmit: SubmitHandler<ICreateCostForm> = (data) => {
        const payload = {
            ...data,
            value: Number(data.value),
            percent: Number(data.percent),
        }

        console.log("form raw:", data)
        console.log("payload to backend:", payload)
    }

    const handleCancel = () => {
        methods.reset()
        router.push("/costs")
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Card className="w-[600px]">
                        <CardHeader>
                            <CardTitle className="text-center">Create Cost</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <HookFormSelect
                                name="contact"
                                label="Contact"
                                placeholder="Select a contact"
                                groupLabel="Contacts"
                                options={mockContacts}
                            />

                            <HookFormSelect
                                name="category"
                                label="Category"
                                placeholder="Select a category"
                                groupLabel="Categories"
                                options={mockCategories}
                            />

                            <HookFormTextInput
                                title="Value"
                                name="value"
                                label="100"
                                type="number"
                            />

                            <HookFormTextInput
                                title="Percent"
                                name="percent"
                                label="10"
                                type="number"
                            />
                        </CardContent>
                        <CardFooter className="flex flex-row justify-end">
                            <Button
                                type="button"
                                className="w-1/2"
                                variant="ghost"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-1/2 transition-all duration-150 ease-in-out"
                                variant="outline"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    "Add Cost"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </FormProvider>
        </div>
    )
}