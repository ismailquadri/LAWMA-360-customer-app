CREATE TABLE public.customer_accounts (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id text NOT NULL UNIQUE DEFAULT ('CUS-' || gen_random_uuid()::text),
  state jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.customer_accounts TO authenticated;
GRANT ALL ON public.customer_accounts TO service_role;
ALTER TABLE public.customer_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own account read" ON public.customer_accounts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own account insert" ON public.customer_accounts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own account update" ON public.customer_accounts FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION public.protect_customer_id() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.customer_id := OLD.customer_id; RETURN NEW; END $$;
CREATE TRIGGER customer_accounts_keep_id BEFORE UPDATE ON public.customer_accounts FOR EACH ROW EXECUTE FUNCTION public.protect_customer_id();