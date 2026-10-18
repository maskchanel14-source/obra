-- Obra Market preview catalog schema.
-- Apply once in the Supabase SQL editor or with `supabase db push`.
-- Public clients can read the catalog; service-role syncs write inventory and SEO records.
-- The orders table is intentionally not open to anon inserts. Do not enable checkout
-- until a server-side payment webhook and fulfillment flow have been implemented.

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  tagline text,
  description text,
  accent text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  category_slug text references public.categories(slug),
  price numeric(10,2) not null,
  formats text[] default '{}',
  file_size text,
  tags text[] default '{}',
  features jsonb default '[]',
  includes jsonb default '[]',
  faqs jsonb default '[]',
  accent text,
  license_tiers text[] default '{personal,extended}',
  mock text default 'copy',
  seo_title text,
  seo_description text,
  keywords text[] default '{}',
  created_at timestamptz default now()
);

create index if not exists idx_products_category on public.products(category_slug);
create index if not exists idx_products_tags on public.products using gin(tags);

create table if not exists public.access_logs (
  id bigint generated always as identity primary key,
  product_slug text references public.products(slug),
  page_path text not null,
  landed_at timestamptz default now()
);

create index if not exists idx_access_logs_slug on public.access_logs(product_slug);
create index if not exists idx_access_logs_landed on public.access_logs(landed_at desc);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  product_slug text references public.products(slug),
  license_tier text default 'personal',
  amount numeric(10,2) not null,
  currency text default 'USD',
  customer_email text,
  checkout_ref text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.seo_keywords (
  id bigint generated always as identity primary key,
  page_path text not null,
  keyword text not null,
  intent text default 'transactional',
  position int default 0,
  unique(page_path, keyword)
);

create table if not exists public.sync_status (
  id bigint generated always as identity primary key,
  job text not null,
  records int default 0,
  ran_at timestamptz default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.access_logs enable row level security;
alter table public.orders enable row level security;
alter table public.seo_keywords enable row level security;
alter table public.sync_status enable row level security;

create policy "catalog is publicly readable"
  on public.products for select using (true);
create policy "categories are publicly readable"
  on public.categories for select using (true);
create policy "seo keywords readable"
  on public.seo_keywords for select using (true);
-- Only consented clients submit anonymous route and optional product-slug values.
-- No visitor ID, IP, user-agent, email, or referrer is stored in this table.
create policy "consented page-path inserts"
  on public.access_logs for insert
  with check (
    length(page_path) between 1 and 255
    and left(page_path, 1) = '/'
    and (product_slug is null or exists (
      select 1 from public.products p where p.slug = access_logs.product_slug
    ))
  );
-- RLS is enabled without anon policies on orders and sync_status; service role only.
