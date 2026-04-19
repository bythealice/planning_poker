type PaymentStatusProps = {
  status: "pending" | "paid" | "failed";
};

export function PaymentStatus({ status }: PaymentStatusProps) {
  return (
    <p className="text-sm text-muted-foreground">Status do pagamento: {status}</p>
  );
}

