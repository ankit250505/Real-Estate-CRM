import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const response = await http.get("/dashboard/summary");
      return response.data.data;
    }
  });
}
