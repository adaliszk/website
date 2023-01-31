import type { DocumentHead } from '@builder.io/qwik-city'
import { loader$ } from '@builder.io/qwik-city'
import { component$ } from '@builder.io/qwik'
import ArticleCard from 'components/ArticleCard'


interface PageData
{
    title: string
    description: string
    keywords: string[]
    items: PageData[]
    link?: string
}


export const fetchPageData = loader$<unknown, PageData>(() =>
{
    return {
        title: 'Projects',
        description: 'Projects that I am working on in my free time.',
        keywords: ['projects'],
        items: [
            {
                title: 'Valheim Server',
                description: 'Clean, fast and standalone Docker & Kubernetes helm deployments.',
                keywords: ['valheim', 'dedicated server', 'docker', 'kubernetes', 'helm'],
                link: 'https://github.com/adaliszk/valheim-server'
            }
        ]
    }
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

    return <>
        <main>
            <section className={'articleGallery'}>
                {data.items.map(item => <ArticleCard>
                    <h3 q:slot={'header'}>{item.title}</h3>
                    <a q:slot={'header'} href={item.link} target={'_blank'}>{item.link}</a>
                    <p>{item.description}</p>
                </ArticleCard>)}
            </section>
        </main>
    </>
})
