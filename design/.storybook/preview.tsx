import { definePreview } from "@adaliszk/qwik-storybook";
import "../src/global.css";

import AutoDocsPage from "./preview-docs.mdx";

const { decorators, parameters } = definePreview();
parameters.docs.page = AutoDocsPage;

export { decorators, parameters };
