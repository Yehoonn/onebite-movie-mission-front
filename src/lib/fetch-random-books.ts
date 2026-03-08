import { API_BASE_URL } from "@/constants/constants";
import { MovieData } from "@/types";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = `${API_BASE_URL}/movie/random`;

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
