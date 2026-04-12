create table public.invoices (
  id text primary key,
  title text not null,
  invoice_date date not null,
  payment_due date not null,
  status text not null default 'draft' check (status in ('draft', 'pending', 'paid')),
  client_name text not null,
  client_email text not null,
  sender_street text,
  sender_city text,
  sender_post_code text,
  sender_country text,
  client_street text,
  client_city text,
  client_post_code text,
  client_country text,
  user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.invoice_items (
  id bigint generated always as identity primary key,
  invoice_id text references public.invoices(id) on delete cascade not null,
  name text not null,
  quantity integer not null default 1,
  price numeric(12,2) not null default 0,
  total numeric(12,2) generated always as (quantity * price) stored,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;

create policy "Users can view own invoices"
  on public.invoices for select using (auth.uid() = user_id);

create policy "Users can insert own invoices"
  on public.invoices for insert with check (auth.uid() = user_id);

create policy "Users can update own invoices"
  on public.invoices for update using (auth.uid() = user_id);

create policy "Users can delete own invoices"
  on public.invoices for delete using (auth.uid() = user_id);

create policy "Users can view own invoice items"
  on public.invoice_items for select
  using (invoice_id in (select id from public.invoices where user_id = auth.uid()));

create policy "Users can insert own invoice items"
  on public.invoice_items for insert
  with check (invoice_id in (select id from public.invoices where user_id = auth.uid()));

create policy "Users can update own invoice items"
  on public.invoice_items for update
  using (invoice_id in (select id from public.invoices where user_id = auth.uid()));

create policy "Users can delete own invoice items"
  on public.invoice_items for delete
  using (invoice_id in (select id from public.invoices where user_id = auth.uid()));