import { useRouter } from "next/router";
import React from "react";
import style from "./[id].module.css";
import movieData from "@/mock/dummy.json";
import { MovieData } from "@/types";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const movie: MovieData | undefined | null = movieData.find(
    (movie) => movie.id === Number(id),
  );

  if (!movie) {
    return <div>해당 영화를 찾을 수 없습니다.</div>;
  }

  const {
    title,
    subTitle,
    genres,
    description,
    runtime,
    company,
    releaseDate,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.information}>
        {releaseDate} / {genres.map((genre) => genre).join(", ")} / {runtime}분
      </div>
      <div className={style.information}>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

export default Page;
