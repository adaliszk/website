import type { DocumentHead } from '@builder.io/qwik-city'
import { loader$ } from '@builder.io/qwik-city'
import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Projects, ProjectsPage } from 'data'
import { ArticleCard } from 'components'
import projectsPageStyles from './styles.css?inline'

export const fetchPageData = loader$<unknown, ProjectsPage>(() =>
{
    return Projects
})


export const head: DocumentHead = ({getData}) =>
{
    const data = getData(fetchPageData)

    return {
        title: data.title,
        meta: [
            {name: 'description', content: data.description},
        ],
    }
}


export default component$(() =>
{
    const data = fetchPageData.use().value
    useStylesScoped$(projectsPageStyles)

    return <>
        <main>
            <section class={'articleGallery'}>
                {data.items?.map((item, key) => <ArticleCard>
                    <h3 q:slot={'header'}>{item.title}</h3>
                    <a q:slot={'header'} class={'tiny'} href={item.source} target={'_blank'}>{item.source}</a>
                    <p>{item.description}</p>
                </ArticleCard>)}
            </section>
        </main>
    </>
})
