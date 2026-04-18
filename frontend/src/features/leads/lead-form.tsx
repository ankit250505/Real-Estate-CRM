import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { useCreateLead } from "./api";

const leadSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(2),
  preferredLocation: z.string().optional(),
  propertyType: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "LOST"]).default("NEW")
});

type LeadValues = z.infer<typeof leadSchema>;

export function LeadForm() {
  const mutation = useCreateLead();
  const { register, handleSubmit, reset } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { status: "NEW", source: "Manual" }
  });

  return (
    <Card>
      <h2 className="text-lg font-semibold text-ink">Create Lead</h2>
      <form
        className="mt-4 grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          reset();
        })}
      >
        <Input placeholder="Full name" {...register("fullName")} />
        <Input placeholder="Phone" {...register("phone")} />
        <Input placeholder="Email" {...register("email")} />
        <Input placeholder="Lead source" {...register("source")} />
        <Input placeholder="Preferred location" {...register("preferredLocation")} />
        <Input placeholder="Property type" {...register("propertyType")} />
        <Select {...register("status")}>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="CLOSED">Closed</option>
          <option value="LOST">Lost</option>
        </Select>
        <Input placeholder="Notes" {...register("notes")} />
        <div className="md:col-span-2">
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending ? "Saving..." : "Save Lead"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
