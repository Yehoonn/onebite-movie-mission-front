import React, { useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import { useRouter } from "next/router";
import { MovieData } from "@/types";
import fetchMovies from "@/lib/fetch-movies";
import SEO from "@/components/SEO";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieData[]>([]);

  const router = useRouter();

  const query = router.query.q as string | undefined;

  useEffect(() => {
    const movies = fetchMovies(query);

    setLoading(true);

    movies
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setSearchResults([]);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <h3 style={{ color: "white", marginTop: "60px" }}>영화 검색 중...</h3>
    );
  }

  return (
    <>
      <SEO title="한입 시네마 - 영화 검색 결과"></SEO>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 3fr))",
          gap: "16px",
        }}
      >
        {searchResults.length > 0 ? (
          searchResults.map((movie: MovieData) => (
            <MovieItem useAnimation key={movie.id} {...movie} />
          ))
        ) : query ? (
          <h3 style={{ color: "white", marginTop: "60px" }}>
            검색 결과가 없습니다.
          </h3>
        ) : null}
      </div>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};
