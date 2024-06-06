import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipes";

// status: idle, loading, success, failed
export function useRecipesbySearch(keyword, limit = 6, page = 1) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const getRecipes = async () => {
      try {
        setStatus("loading");
        const data = await getAllRecipes({ keyword, limit, page });
        if (!ignore) {
          setData(data.data);
          setStatus("success");
        }
      } catch (error) {
        setStatus("failed");
        setError(error);
      }
    };

    getRecipes();
    return () => {
      ignore = true;
    };
  }, [keyword, limit, page]);

  return { data, status, error };
}
