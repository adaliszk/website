import { Decorator } from 'storybook-framework-qwik'
import { BadgeProps } from './badge/badge.element'


export const RelativeBox: Decorator<BadgeProps> = (story) =>
    <div style={{ position: 'relative' }}>{story()}</div>


interface FlexRowDecoratorProps
{
    gap: number
}

type FlexRowDecorator = (props: FlexRowDecoratorProps) => Decorator<BadgeProps>

export const FlexRow: FlexRowDecorator = ({ gap }) => (story) =>
    <div style={`display: flex; gap: ${gap}px; justify-content: space-between;`}>
        {story()}
    </div>
