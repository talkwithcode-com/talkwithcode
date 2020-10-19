var unified = require("unified")
var markdown = require("remark-parse")
var remark2rehype = require("remark-rehype")
var doc = require("rehype-document")
var format = require("rehype-format")
var html = require("rehype-stringify")
var report = require("vfile-reporter")
const remarkMath = require("remark-math")
const rehypeKatex = require("rehype-katex")

var processor = unified()
    .use(markdown)
    .use(remarkMath)
    .use(remark2rehype)
    .use(format)
    .use(rehypeKatex)
    .use(html)

module.exports = function output(input) {
    return { __html: processor.processSync(input).toString() }
}
