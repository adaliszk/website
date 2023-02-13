import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik'
import projectCardStyles from './ProjectCard.css?inline'


export interface ProjectCardProps {
    title: string
    description?: string
}

export const ProjectCard = component$((props: ProjectCardProps) =>
{
    useStylesScoped$(projectCardStyles)

    return <article>
        <header>
            <h2>{props.title}</h2>
        </header>
        <Slot />
    </article>
})
