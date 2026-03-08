export interface MovieData {
  id: number;
  title: string;
  subTitle: string;
  genres: string[];
  description: string;
  runtime: number;
  company: string;
  releaseDate: string;
  posterImgUrl: string;
  useAnimation?: boolean;
}
