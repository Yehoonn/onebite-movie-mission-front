import SearchableLayout from "@/components/searchable-layout";
import React from "react";
import style from "./index.module.css";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";

export default function Home() {
  const getRandomMovies = (count: number) => {
    const shuffledMovies = [...movies].sort(() => 0.5 - Math.random());
    return shuffledMovies.slice(0, count);
  };

  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          {getRandomMovies(3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div>
          {getRandomMovies(movies.length).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};
