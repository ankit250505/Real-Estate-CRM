import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await http.get("/clients");
      return response.data.data;
    }
  });
}

export function useClient(id?: string) {
  return useQuery({
    queryKey: ["client", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await http.get(`/clients/${id}`);
      return response.data.data;
    }
  });
}
