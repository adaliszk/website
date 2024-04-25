/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-global/client" />

import "@adaliszk/std/prelude";

declare module "*.astro" {
    const content: string;
    export default content;
}
