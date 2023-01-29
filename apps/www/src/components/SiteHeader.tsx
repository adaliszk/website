import { component$ } from '@builder.io/qwik'
import { useLocation, Link } from '@builder.io/qwik-city'

export default component$(() =>
{
    const loc = useLocation()

    return <>
        <header>
            <h1>AdaLiszk</h1>
            <nav>
                <Link href={'/'}>Home</Link>
            </nav>
        </header>
    </>
})
