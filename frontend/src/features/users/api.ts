import { useQuery } from "@tanstack/react-query";
import { http } from "../../api/http";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await http.get("/users");
      return response.data.data;
    }
  });
}
