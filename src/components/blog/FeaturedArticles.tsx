import type { Article } from "content/types";
import { component$ } from "@builder.io/qwik";

export type FeaturedArticlesProps = {
    articles: Article[];
};

export const FeaturedArticles = component$<FeaturedArticlesProps>(
    ({ articles }) => {
        return (
            <section class="flex flex-row flex-wrap">
                <pre>{JSON.stringify(articles, null, 2)}</pre>
            </section>
        );
    },
);
