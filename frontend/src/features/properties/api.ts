import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await http.get("/properties");
      return response.data.data;
    }
  });
}

export function useProperty(id?: string) {
  return useQuery({
    queryKey: ["property", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await http.get(`/properties/${id}`);
      return response.data.data;
    }
  });
}
