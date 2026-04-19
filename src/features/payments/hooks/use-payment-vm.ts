"use client";

import { useQuery } from "@tanstack/react-query";

import { getPaymentStatus } from "@/features/payments/services/payment-api";

export function usePaymentVM(paymentId: string) {
  const query = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPaymentStatus(paymentId),
    enabled: Boolean(paymentId),
  });

  return {
    status: query.data?.status ?? "pending",
    isLoading: query.isLoading,
    hasError: query.isError,
  };
}

