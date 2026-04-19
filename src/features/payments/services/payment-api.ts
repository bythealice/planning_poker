import { apiClient } from "@/core/api";

export async function getPaymentStatus(id: string) {
  const { data } = await apiClient.get<{ status: "pending" | "paid" | "failed" }>(
    `/payments/${id}`,
  );

  return data;
}

