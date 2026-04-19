import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../app/auth-context";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@realestatecrm.local",
      password: "Admin@123"
    }
  });

  return (
    <Card className="w-full max-w-md bg-white/90 p-8 backdrop-blur">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Real Estate CRM</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Manage leads, listings, deals, and agent performance from one place.</p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={handleSubmit(async (values) => {
          await login(values);
          navigate("/", { replace: true });
        })}
      >
        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}