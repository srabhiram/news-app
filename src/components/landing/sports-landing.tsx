import React from "react";
import { Heading } from "../Heading";
import { NewsArticle } from "@/redux/features/news/news-slice";

export const SportsLanding = ({
  newsArticles,
}: {
  newsArticles: NewsArticle[];
}) => {
  return (
    <section className="px-3 py-4">
      {newsArticles ? (
        <Heading text={"స్పోర్ట్స్"} />
      ) : (
        ""
      )}
    </section>
  );
};
