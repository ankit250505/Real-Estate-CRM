import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await http.get("/notifications");
      return response.data.data;
    }
  });
}
