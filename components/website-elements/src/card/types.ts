import type { JSXChildren } from '@builder.io/qwik'


export interface CardSharedProps
{
    children?: JSXChildren
}


export interface CardOption
{
    text: string
    icon?: string
    children?: CardOption[]
    onClick?: (click: Event) => void
    onHover?: (hover: Event) => void
}


export interface CardHeaderProps
{
    monogram?: string
    header?: string
    subheader?: string
    options?: CardOption[]
}


export type CardMediaProps = CardSharedProps


export interface CardContentProps extends CardSharedProps
{
    title?: string
    subtitle?: string
}


export type CardActionsProps = CardSharedProps


export interface CardProps extends CardSharedProps, CardHeaderProps, CardContentProps
{
    /**
     * Sets the overall rendering style where:
     * - vertical: shows a normal card with header, media, content, and actions
     * - horizontal: collapses the header into a simple header-media row
     */
    mode?: 'vertical' | 'horizontal'

    /**
     * Sets the elevation level which makes the card drop a shadow and gradually less translucent
     */
    elevated?: number

    /**
     * Adds border around the card to highlight it
     */
    outlined?: boolean

    /**
     * Fills the card with the primary color instead of using the surface color
     */
    filled?: boolean

    /**
     * Allows a click listener to be attached
     */
    onClick?: (click: Event) => void

    /**
     * Allows a hover listener to be attached
     */
    onHover?: (hover: Event) => void
}
