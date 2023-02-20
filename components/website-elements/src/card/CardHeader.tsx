import { Slot, useStylesScoped$, useStyles$ } from '@builder.io/qwik'
import { CardHeaderProps } from './Card.types'


/**
 * Header area of the Card Component
 */
export function CardHeader (props?: CardHeaderProps)
{
    // language=css
    useStyles$(`
        :root {
            --card-header-y-spacing: calc((var(--card-box-spacing) - var(--card-text-spacing)));
            --card-header-x-spacing: var(--card-box-spacing);
            
            --card-header-size: var(--theme-typo-large);
            --card-subheader-size: var(--theme-typo-medium);
        }
    `)

    // language=css
    useStylesScoped$(`
        .card-header {
            overflow: hidden;
        }
        
        .card-header:not(:empty) {
            display: grid;
            grid-template-areas:
                "monogram header    options"
                "monogram subheader options";
            grid-template-columns: auto 10fr auto;
            grid-template-rows: 1fr 1fr;

            padding: 0 var(--card-header-x-spacing);
        }

        .monogram {
            grid-area: monogram;
        }

        h2.header, .header > :global(*), h3.subheader, .subheader > :global(*) {            
            padding: 0;
        }

        h2.header, .header > :global(*) {
            font-size: var(--card-header-size);
            margin: var(--card-header-y-spacing) 0 calc(var(--card-text-spacing) / 2) 0;
        }
        
        h3.subheader, .subheader > :global(*) {
            font-size: var(--card-subheader-size);
            margin: calc(var(--card-text-spacing) / 2) 0 var(--card-header-y-spacing) 0;
        }

        .header {
            grid-area: header;
        }

        .subheader {
            grid-area: subheader;
        }

        .options {
            grid-area: options;
        }
    `)

    return (
        <header class={'card-header'}>
            {props?.header
                ? <h2 class={'header'}>{props.header}</h2>
                : <span class={'header'}><Slot name={'header'}/></span>
            }
            {props?.subheader
                ? <h3 className={'subheader'}>{props.subheader}</h3>
                : <span className={'subheader'}><Slot name={'subheader'}/></span>
            }
        </header>
    )
}
