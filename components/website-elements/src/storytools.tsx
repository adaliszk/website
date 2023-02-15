import { Decorator } from 'storybook-framework-qwik'
import { BadgeProps } from './badge/badge.element'

export const RelativeBox: Decorator<BadgeProps> = (story) => <div style={{ position: 'relative' }}>{story()}</div>
export const FlexRow: Decorator<BadgeProps> = (story) => <div style={'display: flex;'}>{story()}</div>
