// noinspection JSUnusedGlobalSymbols

import type { Meta } from 'storybook-framework-qwik'
import type { BadgeProps } from './badge.element'

import { Badge, BadgeContainer } from './badge.element'
import { FlexRow } from 'storytools'


export default {
    title: 'Badge',
    argTypes: { text: { type: 'string' } },
} as Meta<BadgeProps>


export const Showcase = {
    decorators: [FlexRow({ gap: 20 })],
    render: (args: BadgeProps) => <>
        <div>
            <Badge {...args} />
        </div>

        <BadgeContainer>
            <Badge q:slot={'badge'} text={'1'} {...args} />
            <span>Text</span>
        </BadgeContainer>

        <BadgeContainer>
            <Badge q:slot={'badge'} text={'999+'} {...args} />
            <span>Text</span>
        </BadgeContainer>
    </>,
}
