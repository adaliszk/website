import { definePreview } from "@adaliszk/qwik-storybook"
import { qwikCityDecorator } from "storybook-framework-qwik/qwik-city-decorator"
import "../src/global.css"

import AutoDocsPage from "./preview-docs.mdx"

const { decorators, parameters } = definePreview({
    decorators: [qwikCityDecorator]
});

parameters.docs.page = AutoDocsPage;

export { decorators, parameters };
