import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { http } from "../../api/http";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";

const propertySchema = z.object({
  title: z.string().min(2),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL"]),
  purpose: z.enum(["SALE", "RENT"]),
  price: z.coerce.number().positive(),
  location: z.string().min(2),
  address: z.string().min(5)
});

type PropertyValues = z.infer<typeof propertySchema>;

export function PropertyForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: PropertyValues) => {
      const response = await http.post("/properties", { ...values, amenities: [] });
      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["properties"] })
  });
  const { register, handleSubmit, reset } = useForm<PropertyValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: { type: "RESIDENTIAL", purpose: "SALE" }
  });

  return (
    <Card>
      <h2 className="text-lg font-semibold text-ink">Create Property</h2>
      <form
        className="mt-4 grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          reset();
        })}
      >
        <Input placeholder="Title" {...register("title")} />
        <Input placeholder="Price" type="number" {...register("price")} />
        <Input placeholder="Location" {...register("location")} />
        <Input placeholder="Address" {...register("address")} />
        <Select {...register("type")}>
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
        </Select>
        <Select {...register("purpose")}>
          <option value="SALE">Sale</option>
          <option value="RENT">Rent</option>
        </Select>
        <div className="md:col-span-2">
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending ? "Saving..." : "Save Property"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
