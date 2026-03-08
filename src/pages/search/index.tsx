import React from "react";
import SearchableLayout from "@/components/searchable-layout";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const query = router.query.q as string;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 3fr))",
        gap: "16px",
      }}
    >
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)
      ) : query ? (
        <div style={{ color: "white", marginTop: "60px" }}>
          검색 결과가 없습니다.
        </div>
      ) : null}
    </div>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};
