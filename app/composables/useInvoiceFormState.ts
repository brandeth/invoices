export type InvoiceFormLineItemInput = {
  name: string;
  quantity: string;
  price: string;
};

export type InvoiceFormInitialValues = {
  billFromStreetAddress: string;
  billFromCity: string;
  billFromPostCode: string;
  billFromCountry: string;
  billToClientName: string;
  billToClientEmail: string;
  billToStreetAddress: string;
  billToCity: string;
  billToPostCode: string;
  billToCountry: string;
  invoiceDate?: string;
  paymentTerms?: string;
  projectDescription: string;
  lineItems: InvoiceFormLineItemInput[];
};

export function createEmptyInvoiceFormValues(): InvoiceFormInitialValues {
  return {
    billFromStreetAddress: "",
    billFromCity: "",
    billFromPostCode: "",
    billFromCountry: "",
    billToClientName: "",
    billToClientEmail: "",
    billToStreetAddress: "",
    billToCity: "",
    billToPostCode: "",
    billToCountry: "",
    invoiceDate: undefined,
    paymentTerms: undefined,
    projectDescription: "",
    lineItems: [
      {
        name: "",
        quantity: "1",
        price: "0",
      },
      {
        name: "",
        quantity: "1",
        price: "0",
      },
    ],
  };
}

function cloneInvoiceFormValues(
  values: InvoiceFormInitialValues,
): InvoiceFormInitialValues {
  return {
    ...values,
    lineItems: values.lineItems.map((item) => ({ ...item })),
  };
}

export function useInvoiceFormState() {
  const isOpen = useState<boolean>("invoice-form-open", () => false);
  const mode = useState<"create" | "edit">("invoice-form-mode", () => "create");
  const invoiceId = useState<string | null>(
    "invoice-form-invoice-id",
    () => null,
  );
  const initialValues = useState<InvoiceFormInitialValues | null>(
    "invoice-form-initial-values",
    () => null,
  );

  function resetContext() {
    mode.value = "create";
    invoiceId.value = null;
    initialValues.value = null;
  }

  function openCreate() {
    resetContext();
    isOpen.value = true;
  }

  function openEdit(id: string, values: InvoiceFormInitialValues) {
    mode.value = "edit";
    invoiceId.value = id;
    initialValues.value = cloneInvoiceFormValues(values);
    isOpen.value = true;
  }

  function clear() {
    isOpen.value = false;
    resetContext();
  }

  return {
    isOpen,
    mode,
    invoiceId,
    initialValues,
    openCreate,
    openEdit,
    clear,
    resetContext,
  };
}
