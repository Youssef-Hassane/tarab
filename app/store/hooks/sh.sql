alter table public."profiles" enable row level security;

-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public."profiles" (id, first_name, last_name, username, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'email'
  );
  return new;
end;
$$;

-- trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- loop in the users and give it profile 
INSERT INTO public."profiles" (id, first_name, last_name, username, email)
SELECT
  id,
  raw_user_meta_data ->> 'first_name' AS first_name,
  raw_user_meta_data ->> 'last_name' AS last_name,
  raw_user_meta_data ->> 'username' AS username,
  raw_user_meta_data ->> 'email' AS email
FROM auth.users
WHERE id NOT IN (SELECT id::uuid FROM public."profiles");

