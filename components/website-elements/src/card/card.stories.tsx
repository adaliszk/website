// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from 'storybook-framework-qwik'
import type { CardProps } from './card.element'

import { Card } from './card.element'

export default {
    title: 'Card',
    argTypes: {
        elevated: { type: 'number' },
        outlined: { type: 'boolean' },
    },
} as Meta<CardProps>

type Story = StoryObj<CardProps>

export const Showcase: Story = {
    decorators: [FlexRow],
    render: (args) => <>
        <Card {...args}>
            <h2 q:slot={'title'}>Title</h2>
            <h3 q:slot={'subtitle'}>Subtitle</h3>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>Content</p>
            <button q:slot={'action'}>Outlined</button>
            <button q:slot={'action'}>Filled</button>
        </Card>
        <Card {...args}>
            <h2 q:slot={'title'}>Title</h2>
            <h3 q:slot={'subtitle'}>Subtitle</h3>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>Content</p>
            <button q:slot={'action'}>Outlined</button>
            <button q:slot={'action'}>Filled</button>
        </Card>
        <Card {...args}>
            <h2 q:slot={'title'}>Title</h2>
            <h3 q:slot={'subtitle'}>Subtitle</h3>
            <img q:slot={'media'} src={'/media-360x188px.png'} alt={'media'}/>
            <p>Content</p>
            <button q:slot={'action'}>Outlined</button>
            <button q:slot={'action'}>Filled</button>
        </Card>
    </>,
}
