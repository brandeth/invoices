export type DemoInvoice = {
  id: string;
  title: string;
  invoiceDate: string;
  paymentDue: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  amount: string;
  status: "paid" | "pending" | "draft";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
  to: string;
};

export type InvoiceFormData = {
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
  lineItems: Array<{ name: string; quantity: string; price: string }>;
};

const STORAGE_KEY = "demo-invoices";

const SEED_INVOICES: DemoInvoice[] = [
  {
    id: "RT3080",
    title: "Brand Guidelines",
    invoiceDate: "18 Aug 2021",
    paymentDue: "19 Aug 2021",
    dueDate: "19 Aug 2021",
    clientName: "Jensen Huang",
    clientEmail: "jensenh@example.com",
    amount: "$1,800.90",
    status: "paid",
    senderAddress: {
      street: "71 Tottenham Court Road",
      city: "London",
      postCode: "W1T 4QW",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "33 Hartfield Road",
      city: "London",
      postCode: "SW19 3RQ",
      country: "United Kingdom",
    },
    items: [
      { name: "Brand Audit", quantity: 1, price: "$900.00", total: "$900.00" },
      {
        name: "Guideline Document",
        quantity: 1,
        price: "$900.90",
        total: "$900.90",
      },
    ],
    to: "/demo/invoices/RT3080",
  },
  {
    id: "XM9141",
    title: "Graphic Design",
    invoiceDate: "21 Aug 2021",
    paymentDue: "20 Sep 2021",
    dueDate: "20 Sep 2021",
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    amount: "$556.00",
    status: "pending",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Banner Design",
        quantity: 1,
        price: "$156.00",
        total: "$156.00",
      },
      { name: "Email Design", quantity: 2, price: "$200.00", total: "$400.00" },
    ],
    to: "/demo/invoices/XM9141",
  },
  {
    id: "RG0314",
    title: "Website Redesign",
    invoiceDate: "28 Aug 2021",
    paymentDue: "01 Sep 2021",
    dueDate: "01 Sep 2021",
    clientName: "John Morrison",
    clientEmail: "john.morrison@example.com",
    amount: "$14,002.33",
    status: "draft",
    senderAddress: {
      street: "10 Broad Street",
      city: "Birmingham",
      postCode: "B1 2HF",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "28 Canal Street",
      city: "Leeds",
      postCode: "LS1 5PS",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Discovery Workshop",
        quantity: 2,
        price: "$1,250.00",
        total: "$2,500.00",
      },
      {
        name: "UI Design",
        quantity: 3,
        price: "$2,500.00",
        total: "$7,500.00",
      },
      {
        name: "Frontend Build",
        quantity: 1,
        price: "$4,002.33",
        total: "$4,002.33",
      },
    ],
    to: "/demo/invoices/RG0314",
  },
  {
    id: "RT2080",
    title: "Landing Page Copy",
    invoiceDate: "08 Sep 2021",
    paymentDue: "12 Sep 2021",
    dueDate: "12 Sep 2021",
    clientName: "Samantha Lee",
    clientEmail: "samantha.lee@example.com",
    amount: "$1,024.00",
    status: "paid",
    senderAddress: {
      street: "84 King Street",
      city: "Manchester",
      postCode: "M2 4WQ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "9 Park Lane",
      city: "Manchester",
      postCode: "M3 1HZ",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Homepage Copy",
        quantity: 2,
        price: "$312.00",
        total: "$624.00",
      },
      { name: "CTA Variants", quantity: 5, price: "$80.00", total: "$400.00" },
    ],
    to: "/demo/invoices/RT2080",
  },
  {
    id: "AA1449",
    title: "Mobile App Screens",
    invoiceDate: "10 Sep 2021",
    paymentDue: "14 Sep 2021",
    dueDate: "14 Sep 2021",
    clientName: "Oliver Grant",
    clientEmail: "oliver.grant@example.com",
    amount: "$3,110.44",
    status: "pending",
    senderAddress: {
      street: "5 Queen Square",
      city: "Bristol",
      postCode: "BS1 4NT",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "42 Victoria Street",
      city: "Bath",
      postCode: "BA1 1BP",
      country: "United Kingdom",
    },
    items: [
      { name: "Wireframes", quantity: 4, price: "$250.00", total: "$1,000.00" },
      {
        name: "High-Fidelity Screens",
        quantity: 7,
        price: "$300.00",
        total: "$2,100.00",
      },
      {
        name: "Prototype Review",
        quantity: 1,
        price: "$10.44",
        total: "$10.44",
      },
    ],
    to: "/demo/invoices/AA1449",
  },
  {
    id: "TY9141",
    title: "Illustration Set",
    invoiceDate: "15 Sep 2021",
    paymentDue: "18 Sep 2021",
    dueDate: "18 Sep 2021",
    clientName: "Emily Carter",
    clientEmail: "emily.carter@example.com",
    amount: "$670.12",
    status: "draft",
    senderAddress: {
      street: "22 Rose Lane",
      city: "Liverpool",
      postCode: "L1 9BX",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "14 Bold Street",
      city: "Liverpool",
      postCode: "L2 1DS",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Character Sketches",
        quantity: 2,
        price: "$150.00",
        total: "$300.00",
      },
      {
        name: "Scene Illustration",
        quantity: 1,
        price: "$370.12",
        total: "$370.12",
      },
    ],
    to: "/demo/invoices/TY9141",
  },
  {
    id: "FV2353",
    title: "Marketing Assets",
    invoiceDate: "20 Sep 2021",
    paymentDue: "24 Sep 2021",
    dueDate: "24 Sep 2021",
    clientName: "Janet Weiss",
    clientEmail: "janet.weiss@example.com",
    amount: "$2,350.00",
    status: "paid",
    senderAddress: {
      street: "43 George Street",
      city: "Edinburgh",
      postCode: "EH2 2HT",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "58 Princes Street",
      city: "Edinburgh",
      postCode: "EH2 2DG",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Social Templates",
        quantity: 5,
        price: "$250.00",
        total: "$1,250.00",
      },
      {
        name: "Print Assets",
        quantity: 2,
        price: "$550.00",
        total: "$1,100.00",
      },
    ],
    to: "/demo/invoices/FV2353",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDisplayDateTimestamp(value: string): number {
  const match = /^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/.exec(value.trim());

  if (!match) {
    return 0;
  }

  const [, day, monthLabel, year] = match;
  const monthIndex = MONTHS.indexOf(monthLabel);

  if (monthIndex === -1) {
    return 0;
  }

  return Date.UTC(Number(year), monthIndex, Number(day));
}

function sortInvoicesByDateDesc(invoices: DemoInvoice[]): DemoInvoice[] {
  return [...invoices].sort(
    (left, right) =>
      getDisplayDateTimestamp(right.invoiceDate) -
      getDisplayDateTimestamp(left.invoiceDate),
  );
}

function generateId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l1 = letters[Math.floor(Math.random() * 26)];
  const l2 = letters[Math.floor(Math.random() * 26)];
  const digits = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `${l1}${l2}${digits}`;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function parsePaymentTermsDays(terms?: string): number {
  if (!terms) return 30;
  const match = terms.match(/^net-(\d+)$/);
  return match ? parseInt(match[1], 10) : 30;
}

function formatCurrency(value: number): string {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$${formatted}`;
}

function parseCurrencyToNumber(value: string): number {
  return parseFloat(value.replace(/[$,]/g, "")) || 0;
}

function buildInvoiceFromForm(
  form: InvoiceFormData,
  id: string,
  status: "draft" | "pending",
): DemoInvoice {
  const invoiceDate = form.invoiceDate
    ? new Date(form.invoiceDate + "T00:00:00")
    : new Date();
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + parsePaymentTermsDays(form.paymentTerms));

  const items = form.lineItems.map((item) => {
    const qty = parseInt(item.quantity, 10) || 0;
    const price = parseCurrencyToNumber(item.price);
    const total = qty * price;
    return {
      name: item.name,
      quantity: qty,
      price: formatCurrency(price),
      total: formatCurrency(total),
    };
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + parseCurrencyToNumber(item.total),
    0,
  );

  return {
    id,
    title: form.projectDescription,
    invoiceDate: formatDate(invoiceDate),
    paymentDue: formatDate(dueDate),
    dueDate: formatDate(dueDate),
    clientName: form.billToClientName,
    clientEmail: form.billToClientEmail,
    amount: formatCurrency(totalAmount),
    status,
    senderAddress: {
      street: form.billFromStreetAddress,
      city: form.billFromCity,
      postCode: form.billFromPostCode,
      country: form.billFromCountry,
    },
    clientAddress: {
      street: form.billToStreetAddress,
      city: form.billToCity,
      postCode: form.billToPostCode,
      country: form.billToCountry,
    },
    items,
    to: `/demo/invoices/${id}`,
  };
}

function cloneDemoInvoice(invoice: DemoInvoice): DemoInvoice {
  return {
    ...invoice,
    senderAddress: { ...invoice.senderAddress },
    clientAddress: { ...invoice.clientAddress },
    items: invoice.items.map((item) => ({ ...item })),
  };
}

function cloneSeedInvoices(): DemoInvoice[] {
  return sortInvoicesByDateDesc(SEED_INVOICES.map(cloneDemoInvoice));
}

function readStoredInvoices(): DemoInvoice[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as unknown;

    return Array.isArray(parsed) ? (parsed as DemoInvoice[]) : null;
  } catch {
    return null;
  }
}

function persist(data: DemoInvoice[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useDemoInvoices() {
  const invoices = useState<DemoInvoice[]>("demo-invoices", cloneSeedInvoices);
  const isStorageHydrated = useState<boolean>(
    "demo-invoices-storage-hydrated",
    () => false,
  );

  onMounted(() => {
    if (isStorageHydrated.value) {
      return;
    }

    const storedInvoices = readStoredInvoices();

    if (storedInvoices) {
      invoices.value = sortInvoicesByDateDesc(storedInvoices);
      persist(invoices.value);
    } else {
      invoices.value = cloneSeedInvoices();
      persist(invoices.value);
    }

    isStorageHydrated.value = true;
  });

  function getById(id: string): DemoInvoice | undefined {
    return invoices.value.find((inv) => inv.id === id);
  }

  function addInvoice(
    form: InvoiceFormData,
    status: "draft" | "pending",
  ): void {
    const id = generateId();
    const invoice = buildInvoiceFromForm(form, id, status);
    invoices.value = sortInvoicesByDateDesc([...invoices.value, invoice]);
    persist(invoices.value);
  }

  function updateInvoice(id: string, form: InvoiceFormData): void {
    const index = invoices.value.findIndex((inv) => inv.id === id);
    if (index === -1) return;
    const existing = invoices.value[index];
    const updated = buildInvoiceFromForm(form, id, existing.status);
    const nextInvoices = [...invoices.value];
    nextInvoices[index] = updated;
    invoices.value = sortInvoicesByDateDesc(nextInvoices);
    persist(invoices.value);
  }

  function deleteInvoice(id: string): void {
    invoices.value = invoices.value.filter((inv) => inv.id !== id);
    persist(invoices.value);
  }

  function updateStatus(id: string, status: DemoInvoice["status"]): void {
    const invoiceIndex = invoices.value.findIndex((inv) => inv.id === id);

    if (invoiceIndex === -1) {
      return;
    }

    invoices.value = invoices.value.map((invoice) =>
      invoice.id === id ? { ...invoice, status } : invoice,
    );
    persist(invoices.value);
  }

  return {
    invoices,
    isStorageHydrated,
    getById,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    updateStatus,
  };
}
