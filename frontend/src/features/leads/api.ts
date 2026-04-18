import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const response = await http.get("/leads");
      return response.data;
    }
  });
}

export function useLead(id?: string) {
  return useQuery({
    queryKey: ["lead", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await http.get(`/leads/${id}`);
      return response.data.data;
    }
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await http.post("/leads", payload);
      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] })
  });
}
