import type { AstroIntegration } from "astro";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import pageInsight from "astro-page-insight";
import tailwind from "@astrojs/tailwind";
import global from "astro-global";
import chalk from "chalk";
import { format } from "date-fns";

/**
 * Preset Integrations for building Astro sites using Qwik, Tailwind, and Sentry
 */
export function withPreset(extraIntegrations: AstroIntegration[] = []) {
    return [
        global(),
        tailwind(),
        mdx(),
        ...extraIntegrations,
        pageInsight(),
        sitemap(),
        compressor(),
    ];
}

// biome-ignore lint/suspicious/noExplicitAny: This reflects how the Console object is typed in Node.js
export type ConsoleFn = (message: string, ...data: any[]) => void;
const logger = (
    fn: ConsoleFn,
    context: string,
    message: string,
    // biome-ignore lint/suspicious/noExplicitAny: We want to allow any types for metadata
    ...metadata: any[]
) => {
    const prefix = chalk.blue(`[${context}]`);
    const time = chalk.gray(format(new Date(), "HH:mm:ss"));
    if (!metadata) return fn(`${time} ${prefix} ${chalk.white(message)}`);
    fn(`${time} ${prefix} ${chalk.reset(message)}`, ...metadata);
};

export type ConsoleLogger = (
    context: string,
    message: string,
    // biome-ignore lint/suspicious/noExplicitAny: We want to allow any types for metadata
    ...metadata: any
) => void;
export type ConsoleLevel = "info" | "warn" | "error" | "debug";

/**
 * Simple logging utility mimicking the Astro Dev Output
 */
export const log: Record<ConsoleLevel, ConsoleLogger> = {
    info: (context, message, ...metadata) =>
        logger(console.log, context, message, ...metadata),
    warn: (context, message, ...metadata) =>
        logger(console.warn, context, message, ...metadata),
    error: (context, message, ...metadata) =>
        logger(console.error, context, message, ...metadata),
    debug: (context, message, ...metadata) =>
        logger(console.debug, context, message, ...metadata),
};
