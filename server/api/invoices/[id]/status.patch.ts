import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

const allowedInvoiceStatuses = ["draft", "pending", "paid"] as const;

type InvoiceStatus = (typeof allowedInvoiceStatuses)[number];

type UpdateInvoiceStatusBody = {
  status?: InvoiceStatus;
};

function isInvoiceStatus(value: unknown): value is InvoiceStatus {
  return (
    typeof value === "string" &&
    allowedInvoiceStatuses.includes(value as InvoiceStatus)
  );
}

function canTransitionInvoiceStatus(
  currentStatus: InvoiceStatus,
  nextStatus: InvoiceStatus,
) {
  return (
    currentStatus === nextStatus ||
    (currentStatus === "pending" && nextStatus === "paid") ||
    (currentStatus === "paid" && nextStatus === "pending")
  );
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required",
    });
  }

  const invoiceId = getRouterParam(event, "id");
  const body = await readBody<UpdateInvoiceStatusBody>(event);
  const status = body?.status;

  if (!invoiceId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invoice id is required",
    });
  }

  if (!isInvoiceStatus(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid invoice status",
    });
  }

  const client = await serverSupabaseClient(event);
  const { data: currentInvoice, error: currentInvoiceError } = await client
    .from("invoices")
    .select("id, status")
    .eq("id", invoiceId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (currentInvoiceError) {
    throw createError({
      statusCode: 500,
      statusMessage: currentInvoiceError.message,
    });
  }

  if (!currentInvoice) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invoice not found",
    });
  }

  if (!isInvoiceStatus(currentInvoice.status)) {
    throw createError({
      statusCode: 500,
      statusMessage: "Invoice has an unsupported status",
    });
  }

  if (currentInvoice.status === status) {
    return {
      id: currentInvoice.id,
      status: currentInvoice.status,
    };
  }

  if (!canTransitionInvoiceStatus(currentInvoice.status, status)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid invoice status transition from ${currentInvoice.status} to ${status}. Only pending and paid can be toggled.`,
    });
  }

  const { data, error } = await client
    .from("invoices")
    .update({ status })
    .eq("id", invoiceId)
    .eq("user_id", user.id)
    .select("id, status")
    .maybeSingle();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invoice not found",
    });
  }

  return {
    id: data.id,
    status: data.status,
  };
});
