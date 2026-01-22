"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ContactCategory } from "@/types";
import { HookFormTextInput } from "@/components/hook-form-text-input";
import { SelectCategory } from "../select-category";
import { addContactSchema } from "@/validations/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

interface IRegisterContact {
  name: string;
  email: string;
  phone: string;
  category: ContactCategory;
}

export const AddContact = () => {
  const [stepModal, setStepModal] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const methods = useForm<IRegisterContact>({
    resolver: yupResolver(addContactSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: ContactCategory.FRIEND,
    },
  });

  const handleContinue = async () => {
    const isValid = await methods.trigger(["name", "email"]);
    if (!isValid) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStepModal(2);
    setLoading(false);
  };

  const handleOnSubmit = async (data: IRegisterContact) => {

    console.log("📋 Dados completos:", data);
    console.log("📋 Category recebida:", data.category);
    console.log("📋 Type da category:", typeof data.category);
    console.log("📋 Valores aceitos:", Object.values(ContactCategory));
    console.log("📋 Comparação:", {
      recebida: data.category,
      aceitos: Object.values(ContactCategory),
      match: Object.values(ContactCategory).includes(data.category),
    });

    setLoading(true);

    try {
      const payload = {
        userId: "6186997e-fb6b-4d07-9be9-6610cf6d127c", // random userID for a short time
        name: data.name,
        email: data.email,
        phone: data.phone,
        category: data.category,
      };

      // In the future, we change userId for this
      //       const session = await getServerSession(); // your method auth
      // userId: session.user.id

      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          methods.setError("email", {
            type: "manual",
            message: result.error || "This email is already registered",
          });
          setStepModal(1);
          toast.error("Email already exists");
          return;
        }

        throw new Error(result.error || 'Failed to create contact');
      }

      toast.success("Contact created successfully!");
      handleFinish();

      router.refresh();

    } catch (error) {
      console.error('Error creating contact:', error);
      toast.error("Failed to create contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    methods.reset();
    setStepModal(1);
    setOpenModal(false);
  };

  const handleCancel = () => {
    methods.reset();
    setStepModal(1);
    setOpenModal(false);
  };

  const handleBack = () => {
    setStepModal(1);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Contact</Button>
      </DialogTrigger>

      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleOnSubmit, (errors) => console.log("Erro de validação:", errors))}>
            {stepModal === 1 && (
              <>
                <DialogHeader>
                  <DialogTitle>Add Contact</DialogTitle>
                  <DialogDescription>
                    Fill in the form to add a contact
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                  <HookFormTextInput
                    title="Name"
                    name="name"
                    label="John Jason"
                    type="text"
                  />
                  <HookFormTextInput
                    title="Email"
                    name="email"
                    label="john@email.com"
                    type="email"
                  />

                  <div className="flex flex-row gap-2">
                    <Button
                      className="w-1/2"
                      variant="outline"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-1/2"
                      type="button"
                      onClick={handleContinue}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {stepModal === 2 && (
              <>
                <DialogHeader>
                  <DialogTitle>Add Contact</DialogTitle>
                  <DialogDescription>
                    Complete the contact information
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                  <HookFormTextInput
                    title="Phone"
                    name="phone"
                    label="+55 11 997117911"
                    type="text"
                  />
                  <SelectCategory
                    value={methods.watch("category")}
                    onValueChange={(value: ContactCategory) =>
                      methods.setValue("category", value, { shouldValidate: true })
                    }
                  />

                  <div className="flex flex-row gap-2">
                    <Button
                      className="w-1/3"
                      variant="outline"
                      type="button"
                      onClick={handleBack}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button
                      className="w-2/3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Contact"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}