import SearchableLayout from "@/components/searchable-layout";
import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";
import { MovieData } from "@/types";
import SEO from "@/components/SEO";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3600,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [randomMovies, setRandomMovies] = useState<MovieData[]>(recoMovies);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newMovies = await fetchRandomMovies();
      setRandomMovies(newMovies);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO />
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div>
            {randomMovies.map((movie) => (
              <MovieItem useAnimation key={movie.id} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div>
            {allMovies.map((movie) => (
              <MovieItem useAnimation key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};
