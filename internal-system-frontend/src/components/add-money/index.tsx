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
import { InitialHelper } from "@/components/initial-helper"
import { BanknoteArrowUp, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import QRCode from "react-qr-code";
import { toast } from "sonner";

export const AddMoney = () => {
  const [stepModal, setStepModal] = useState(1);
  const [amount, setAmount] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const pixCode = `00020126580014br.gov.bcb.pix0136${amount}52040000530398654${amount.padStart(
    10,
    "0"
  )}5802BR5925Your Name Here6009SAO PAULO`;

  const handleContinue = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStepModal(2);
    setLoading(false);
  };

  const handleFinish = () => {
    console.log("Pagamento confirmed:", amount);

    setStepModal(1);
    setAmount("");
    setOpenModal(false);
  };

  const handleCancel = () => {
    setStepModal(1);
    setAmount("");
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <InitialHelper
          name="Add money"
          icon={BanknoteArrowUp}
        />
      </DialogTrigger>

      <DialogContent>
        {stepModal === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Add Money</DialogTitle>
              <DialogDescription>
                How much would you like to add to your wallet?
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="$ 0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded-md px-3 py-2 text-lg"
                min="0"
                step="0.01"
              />

              <div className="flex flex-row gap-2">
                <Button
                  className="w-1/2"
                  variant="ghost"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2 transition-all duration-150 ease-in-out"
                  variant="outline"
                  onClick={handleContinue}
                  disabled={loading || !amount || parseFloat(amount) <= 0}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
              <DialogTitle>Scan your QR Code</DialogTitle>
              <DialogDescription>
                Use seu app de pagamento para escanear o código abaixo e
                finalizar a transação de $ {amount}.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-4 py-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCode value={pixCode} size={200} />
              </div>

              <div className="w-full">
                <p className="text-xs text-zinc-500 mb-1">
                  Or copy the QR code:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixCode}
                    readOnly
                    className="flex-1 border rounded-md px-3 py-2 text-xs bg-zinc-50"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(pixCode);
                      toast.success("PIX code copied to clipboard!");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={handleFinish}
              >
                Finish
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}