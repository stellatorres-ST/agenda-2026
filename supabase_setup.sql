-- Ejecutar esto en Supabase > SQL Editor

create table eventos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete cascade,
  user_email text,
  fecha date not null,
  evento text not null,
  categoria text not null,
  notas text
);

-- Seguridad: cada usuario ve todos los eventos pero solo edita los suyos
alter table eventos enable row level security;

create policy "Todos pueden ver eventos"
  on eventos for select
  using (auth.role() = 'authenticated');

create policy "Solo el dueño puede insertar"
  on eventos for insert
  with check (auth.uid() = user_id);

create policy "Solo el dueño puede actualizar"
  on eventos for update
  using (auth.uid() = user_id);

create policy "Solo el dueño puede eliminar"
  on eventos for delete
  using (auth.uid() = user_id);
