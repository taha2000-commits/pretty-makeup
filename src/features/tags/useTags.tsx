import { useQuery,  } from "@tanstack/react-query";
import { getTags } from "../../services/supabase/tags/getTags";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};
