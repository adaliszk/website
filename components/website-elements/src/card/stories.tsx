// noinspection JSUnusedGlobalSymbols

import type { Meta } from 'storybook-framework-qwik'
import type { CardProps } from './types'

import { Card } from './Card'
import { Button } from 'button'
import { FlexRow } from 'storytools'

export default {
    title: 'Card',
    argTypes: {
        elevated: { type: 'number' },
        outlined: { type: 'boolean' },
        filled: { type: 'boolean' },
        monogram: { type: 'string' },
        header: { type: 'string' },
        subheader: { type: 'string' },
    },
} as Meta<CardProps>


export const Showcase = {
    decorators: [FlexRow({ gap: 20 })],
    render: (args: CardProps) => <>
        <Card
            monogram={'A'} header={'HeaderAttr'} subheader={'SubheaderAttr'}
            title={'TitleAttr'} subtitle={'SubtitleAttr'}
            {...args}>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>ContentSlot</p>
            <Button q:slot={'action'} theme={'filled'}>Action</Button>
        </Card>
        <Card
            monogram={'A'} header={'HeaderAttr'} subheader={'SubheaderAttr'}
            title={'TitleAttr'} subtitle={'SubtitleAttr'}
            {...args}>
            <span q:slot={'monogram'}>A</span>
            <h2 q:slot={'header'}>HeaderSlot</h2>
            <h3 q:slot={'subheader'}>SubheaderSlot</h3>
            <h2 q:slot={'title'}>TitleSlot</h2>
            <h3 q:slot={'subtitle'}>SubtitleSlot</h3>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>ContentSlot</p>
            <Button q:slot={'action'} theme={'filled'}>Action</Button>
        </Card>
        <Card {...args}>
            <span q:slot={'monogram'}>A</span>
            <h2 q:slot={'header'}>HeaderSlot</h2>
            <h3 q:slot={'subheader'}>SubheaderSlot</h3>
            <h2 q:slot={'title'}>TitleSlot</h2>
            <h3 q:slot={'subtitle'}>SubtitleSlot</h3>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>ContentSlot</p>
            <Button q:slot={'action'} theme={'filled'}>Action</Button>
        </Card>
        <Card {...args}>
            <h2 q:slot={'title'}>TitleSlot</h2>
            <h3 q:slot={'subtitle'}>SubtitleSlot</h3>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>ContentSlot</p>
            <Button q:slot={'action'} theme={'filled'}>Action</Button>
        </Card>
    </>,
}
