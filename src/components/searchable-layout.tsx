import { useRouter } from "next/router";
import React, { useEffect } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const q = router.query.q;

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    setSearch((q as string) || "");
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          placeholder="검색어를 입력하세요 ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
        ></input>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
