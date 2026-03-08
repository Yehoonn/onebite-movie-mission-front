import { API_BASE_URL } from "@/constants/constants";
import { MovieData } from "@/types";

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `${API_BASE_URL}/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
