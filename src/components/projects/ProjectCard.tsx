import type { TagData } from "content/types";
import { component$, Slot } from "@builder.io/qwik";

type ProjectCardTags = { tags: TagData[] };
type ProjectCardProps = {
    title: string;
    href: string;
} & Partial<ProjectCardTags>;

export const ProjectCardTags = component$<ProjectCardTags>(({ tags }) => {
    return (
        <div class={"flex flex-grow flex-row"}>
            {tags.filter(Boolean).map((tag) => (
                <span key={tag.slug} class="badge badge-outline my-2 mx-0.5">
                    {tag.name}
                </span>
            ))}
        </div>
    );
});

export const ProjectCard = component$<ProjectCardProps>(({ title, tags }) => {
    return (
        <div class={"w-1/2 p-2"}>
            <article class={"card glass shadow-lg shadow-neutral bg-base-200"}>
                <div class={"card-body"}>
                    <h3 class="card-title">{title}</h3>

                    <Slot />

                    <div class="card-actions justify-between">
                        <ProjectCardTags tags={tags ?? []} />
                    </div>
                </div>
            </article>
        </div>
    );
});
