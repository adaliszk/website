import { component$, Slot } from '@builder.io/qwik'
import SiteHeader from '../components/SiteHeader'

export default component$(() =>
{
    return <>
        <section id={'siteHeader'}>
            <SiteHeader/>
        </section>
        <section id={'siteContainer'}>
            <Slot/>
        </section>
    </>
})
