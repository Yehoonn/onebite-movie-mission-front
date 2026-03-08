import { MovieData } from "@/types";
import style from "./movie-item.module.css";
import Link from "next/link";

export default function MovieItem({
  id,
  posterImgUrl,
  useAnimation,
}: MovieData) {
  return (
    <Link
      id={useAnimation ? "animation" : ""}
      href={`/movie/${id}`}
      className={style.container}
    >
      <img src={posterImgUrl} />
    </Link>
  );
}
