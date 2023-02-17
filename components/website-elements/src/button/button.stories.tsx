// noinspection JSUnusedGlobalSymbols

import type { Meta } from 'storybook-framework-qwik'
import type { ButtonProps } from './button.element'

import { Button } from './button.element'
import { FlexRow } from 'storytools'


export default {
    title: 'Button',
    argTypes: {},
} as Meta<ButtonProps>


export const Showcase = {
    decorators: [FlexRow({ gap: 20 })],
    render: (args: ButtonProps) => <>
        <Button theme={'elevated'} {...args}>Elevated</Button>
        <Button theme={'filled'} {...args}>Filled</Button>
        <Button theme={'tonal'} {...args}>Tonal</Button>
        <Button theme={'outlined'} {...args}>Outlined</Button>
        <Button {...args}>Text</Button>
        <Button disabled={true} {...args}>Disabled</Button>
    </>,
}
