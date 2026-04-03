"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CostService } from "@/services/cost.service";
import { toast } from "sonner";
import type { Cost } from "@/types";
import { ApiError } from "@/lib/errors/api.error";

type CreateCostInput = Omit<
  Cost,
  "id" | "userName" | "contactName" | "percent"
>;

export function useCreateCost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCostInput) => CostService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["costs"] });
      toast.success("Cost created successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateCost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: Partial<CreateCostInput> }) =>
      CostService.update(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["costs"] });
      toast.success("Cost updated successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteCost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CostService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["costs"] });
      toast.success("Cost deleted successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}
