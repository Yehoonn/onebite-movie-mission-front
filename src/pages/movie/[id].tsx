import React from "react";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movies";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();

  const paths = movies.map((movie) => ({
    params: { id: String(movie.id) },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

const Page = ({ movie }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <SEO />
        <h3 style={{ color: "white" }}>영화 데이터 불러오는 중...</h3>
      </>
    );
  }

  if (!movie || movie === null) {
    return (
      <>
        <SEO />
        <h3 style={{ color: "white" }}>해당 영화를 찾을 수 없습니다.</h3>
      </>
    );
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
    <>
      <SEO image={posterImgUrl} title={title} description={description}></SEO>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.information}>
          {releaseDate} / {genres.map((genre) => genre).join(", ")} / {runtime}
          분
        </div>
        <div className={style.information}>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
};

export default Page;
