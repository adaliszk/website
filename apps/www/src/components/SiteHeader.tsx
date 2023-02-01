import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link, useDocumentHead, useLocation } from '@builder.io/qwik-city'
import siteHeaderStyles from './SiteHeader.css?inline'

export const quickMenu = [
    {href: '/projects/', title: 'My Projects'},
    {href: '/about-me/', title: 'About me'}
]

export default component$(() =>
{
    const {scopeId} = useStylesScoped$(siteHeaderStyles)
    const { title, meta } = useDocumentHead()
    const { pathname } = useLocation()

    const description = meta.find(i => i.name === 'description') ?? {content: ''}

    return <>
        <header>
            <h1 id={'siteTitle'}>{title}</h1>
            <p id={'siteDescription'}>{description.content}</p>
            <nav id={'siteQuickMenu'}>
                {quickMenu.map(link => <Link href={link.href} class={[scopeId, link.href == pathname ? 'active' : '']}>
                    {link.title}
                </Link>)}
            </nav>
        </header>
    </>
})
