/*
 * This file is the bundle entrypoint for preview and production builds.
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/node'
import qwikCityPlan from '@qwik-city-plan'
import render from './entry.ssr'

export default createQwikCity({ render, qwikCityPlan })
