import type { DocumentHead } from '@builder.io/qwik-city'
import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { loader$ } from '@builder.io/qwik-city'

import ProjectCard from './ProjectCard'
import projectsPageStyles from './styles.css?inline'
import { Projects } from 'data'


export const fetchPageData = loader$(() => Projects)


export const head: DocumentHead = ({ getData }) =>
{
    const data = getData(fetchPageData)

    return {
        title: data.title,
        meta: [
            { name: 'description', content: data.description },
        ],
    }
}


export default component$(() =>
{
    const data = fetchPageData.use().value
    useStylesScoped$(projectsPageStyles)

    return <main>
        <section class={'articleGallery'}>
            {data.items?.map(item => <ProjectCard>
                <h3 slot={'header'}>{item.title}</h3>
                <a slot={'header'} class={'tiny'} href={item.source} target={'_blank'}>{item.source}</a>
                <p>{item.description}</p>
            </ProjectCard>)}
        </section>
    </main>
})
