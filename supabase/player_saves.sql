create table if not exists public.player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null default '',
  save_data jsonb not null default '{}'::jsonb,
  save_version integer not null default 1,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_player_save_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists player_saves_set_updated_at on public.player_saves;
create trigger player_saves_set_updated_at
before insert or update on public.player_saves
for each row execute function public.touch_player_save_updated_at();

alter table public.player_saves enable row level security;

drop policy if exists "Players can read their own save" on public.player_saves;
create policy "Players can read their own save"
on public.player_saves for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Players can create their own save" on public.player_saves;
create policy "Players can create their own save"
on public.player_saves for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Players can update their own save" on public.player_saves;
create policy "Players can update their own save"
on public.player_saves for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Players can delete their own save" on public.player_saves;
create policy "Players can delete their own save"
on public.player_saves for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on table public.player_saves to authenticated;
