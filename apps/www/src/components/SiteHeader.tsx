import { component$, useStyles$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import siteHeaderStyles from './SiteHeader.css?inline'

export default component$(() =>
{
    useStyles$(siteHeaderStyles)

    return <>
        <header>
            <h1>AdaLiszk</h1>
            <nav>
                <Link href={'/'}>Projects</Link>
                <Link href={'/about-me'}>Who?</Link>
            </nav>
        </header>
    </>
})
