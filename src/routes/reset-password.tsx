import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Brand, Btn, Field, Phone } from "@/components/app";
import { supabase } from "@/integrations/supabase/client";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/reset-password")({
  head: () => meta("Reset password", "Choose a new password for your SmartWaste360 account."),
  component: Reset,
});

function Reset() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  return (
    <Phone nav={false}>
      <Brand />
      <h1 className="mt-8 text-2xl font-bold">Choose a new password</h1>
      <form className="mt-6 space-y-4" onSubmit={async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({ password: pw });
        if (error) setErr(error.message); else navigate({ to: "/" });
      }}>
        <Field label="New password" type="password" placeholder="At least 8 characters" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Btn type="submit" tone="ember">Save password</Btn>
      </form>
    </Phone>
  );
}
