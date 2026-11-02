CREATE TABLE public.app_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_app text NOT NULL CHECK (from_app IN ('customer','partner','lawma')),
  to_app text NOT NULL CHECK (to_app IN ('customer','partner','lawma')),
  type text NOT NULL,
  customer_id text,
  ref text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.app_messages TO service_role;
ALTER TABLE public.app_messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX app_messages_to_created_idx ON public.app_messages (to_app, created_at);
CREATE INDEX app_messages_customer_idx ON public.app_messages (customer_id, created_at);