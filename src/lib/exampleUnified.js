import unified from "unified"
import markdown from "remark-parse"
import remark2rehype from "remark-rehype"
import format from "rehype-format"
import html from "rehype-stringify"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import breaks from "remark-breaks"
import prims from "mdx-prism"

var processor = unified()
    .use(markdown)
    .use(breaks)
    .use(remarkMath)
    .use(remark2rehype)
    .use(prims)
    .use(format)
    .use(rehypeKatex)
    .use(html)

export default function output(input) {
    return { __html: processor.processSync(input).toString() }
}
