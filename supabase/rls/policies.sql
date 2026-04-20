alter table profiles enable row level security;
create policy "select own" on profiles
for select using (auth.uid() = id);
