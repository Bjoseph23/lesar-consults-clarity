-- 1) Remove legacy admins table
DROP TABLE IF EXISTS public.admins;

-- 2) Ensure profiles are auto-created for new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3) Automatically set is_admin=true for the seeded admin email when the profile row is inserted
CREATE OR REPLACE FUNCTION public.set_admin_by_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'admin@gmail.com' THEN
    NEW.is_admin := true;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_admin_by_email ON public.profiles;
CREATE TRIGGER set_admin_by_email
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.set_admin_by_email();