-- 014_pricing_config.sql — persistent pricing config per vehicle category
create table if not exists public.pricing_config (
  vehicle_category   text primary key,
  base_rate_per_km   numeric(10,2) not null default 2.80,
  minimum_fare       numeric(10,2) not null default 65.00,
  airport_surcharge  numeric(10,2) not null default 15.00,
  after_hours_mult   numeric(4,2)  not null default 1.25,
  booking_fee        numeric(10,2) not null default 5.00,
  updated_at         timestamptz   not null default now()
);

-- Seed defaults
insert into public.pricing_config (vehicle_category, base_rate_per_km, minimum_fare, airport_surcharge, after_hours_mult, booking_fee)
values
  ('sedan',        2.80, 65,  15, 1.25, 5),
  ('suv',          3.50, 85,  20, 1.25, 5),
  ('luxury',       5.50, 130, 30, 1.30, 10),
  ('van',          4.00, 100, 25, 1.20, 5),
  ('stretch_limo', 8.00, 200, 50, 1.35, 15),
  ('minibus',      5.00, 150, 35, 1.25, 10)
on conflict (vehicle_category) do nothing;

alter table public.pricing_config enable row level security;
create policy "Service role full access" on public.pricing_config
  using (true) with check (true);
