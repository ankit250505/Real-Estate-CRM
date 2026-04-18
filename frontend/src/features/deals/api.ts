import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useDeals() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const response = await http.get("/deals");
      return response.data.data;
    }
  });
}
