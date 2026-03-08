import Head from "next/head";
import React from "react";

interface SEOProps {
  image?: string;
  title?: string;
  description?: string;
}

const SEO = ({ image, title, description }: SEOProps) => {
  return (
    <Head>
      <title>한입 시네마</title>
      <meta property="og:image" content={image || "/thumbnail.png"} />
      <meta property="og:title" content={title || "한입 시네마"} />
      <meta
        property="og:description"
        content={description || "한입 시네마에 등록된 영화들을 만나보세요"}
      />
    </Head>
  );
};

export default SEO;
