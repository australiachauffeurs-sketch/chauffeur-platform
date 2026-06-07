-- 013_vehicles.sql — vehicles table for fleet management
create table if not exists public.vehicles (
  id               uuid primary key default gen_random_uuid(),
  make             text not null,
  model            text not null,
  year             int  not null default extract(year from now())::int,
  plate            text not null unique,
  color            text,
  category         text not null default 'sedan',
  capacity         int  not null default 3,
  status           text not null default 'available',  -- available | on_trip | offline | maintenance
  driver_id        uuid references public.drivers(id) on delete set null,
  notes            text,
  photo_url        text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists vehicles_updated_at on public.vehicles;
create trigger vehicles_updated_at
  before update on public.vehicles
  for each row execute procedure public.set_updated_at();

alter table public.vehicles enable row level security;
create policy "Service role full access" on public.vehicles
  using (true) with check (true);
