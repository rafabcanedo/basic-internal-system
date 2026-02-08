"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormTextInput } from "@/components/hook-form-text-input";
import { addCostSchema } from "@/validations/schemas";
import { CostCategory } from "@/types";
import { Loader2 } from "lucide-react";
import { HookFormSelect } from "@/components/hook-form-select";
import { ICreateCostForm } from "./types";
import { useRouter } from "next/navigation";
import { useCreateCost } from "@/hooks/mutations/use-costs-mutations";

interface CreateCostFormProps {
  contacts: { label: string; value: string }[];
}

export default function CreateCostForm({ contacts }: CreateCostFormProps) {
  const router = useRouter();
  const { mutateAsync: createCost, isPending } = useCreateCost();

  const methods = useForm<ICreateCostForm>({
    resolver: yupResolver(addCostSchema),
    mode: "onSubmit",
    defaultValues: {
      contactId: "",
      category: "" as CostCategory,
      value: "",
      percent: "",
    },
  });

  const { handleSubmit } = methods;

  const handleOnSubmit: SubmitHandler<ICreateCostForm> = async (data) => {
    try {
      await createCost({
        userId: "6186997e-fb6b-4d07-9be9-6610cf6d127c", // same example mock
        contactId: data.contactId,
        value: data.value,
        category: data.category,
      });

      router.push("/costs");
    } catch (error) {
      console.error("Error creating cost:", error);
    }
  };

  const handleCancel = () => {
    methods.reset();
    router.push("/costs");
  };

  const categoryOptions = [
    { label: "Food", value: CostCategory.FOOD },
    { label: "Payment", value: CostCategory.PAYMENT },
    { label: "Entertainment", value: CostCategory.ENTERTAINMENT },
    { label: "Travel", value: CostCategory.TRAVEL },
  ];

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
                name="contactId"
                label="Contact"
                placeholder="Select a contact"
                groupLabel="Contacts"
                options={contacts}
              />

              <HookFormSelect
                name="category"
                label="Category"
                placeholder="Select a category"
                groupLabel="Categories"
                options={categoryOptions}
              />

              <HookFormTextInput
                title="Value"
                name="value"
                label="100.50"
                type="text"
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
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
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
  );
}
