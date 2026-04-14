import { serverSupabaseClient } from "#supabase/server";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("invoices")
    .select("*, invoice_items(*)")
    .order("invoice_date", { ascending: false });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return (data ?? []).map((invoice) => {
    const items = (invoice.invoice_items ?? []).map(
      (item: {
        name: string;
        quantity: number;
        price: number;
        total: number;
      }) => ({
        name: item.name,
        quantity: item.quantity,
        price: formatCurrency(Number(item.price)),
        total: formatCurrency(Number(item.total)),
      }),
    );

    const totalAmount = (invoice.invoice_items ?? []).reduce(
      (sum: number, item: { total: number }) => sum + Number(item.total),
      0,
    );

    const paymentDue = formatDate(invoice.payment_due);

    return {
      id: invoice.id,
      title: invoice.title,
      invoiceDate: formatDate(invoice.invoice_date),
      paymentDue,
      dueDate: paymentDue,
      clientName: invoice.client_name,
      clientEmail: invoice.client_email,
      amount: formatCurrency(totalAmount),
      status: invoice.status,
      senderAddress: {
        street: invoice.sender_street ?? "",
        city: invoice.sender_city ?? "",
        postCode: invoice.sender_post_code ?? "",
        country: invoice.sender_country ?? "",
      },
      clientAddress: {
        street: invoice.client_street ?? "",
        city: invoice.client_city ?? "",
        postCode: invoice.client_post_code ?? "",
        country: invoice.client_country ?? "",
      },
      items,
      to: `/invoices/${invoice.id}`,
    };
  });
});
