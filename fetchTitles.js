#!/usr/bin/env node

const jsdom = require("jsdom")
const csv = require("csv-string")

async function fetchURL(url) {
  if (!url) { return }

  let title
  try {
    const virtualConsole = new jsdom.VirtualConsole()
    const dom = await jsdom.JSDOM.fromURL(url, { virtualConsole })
    title = dom.window.document.title
  } catch (ex) {}

  process.stdout.write(csv.stringify(title ? [url, title] : [url]))
}

let previousPromise = Promise.resolve()
process.stdin.pipe(require('split')()).on('data', url => {
  previousPromise = previousPromise.then(() => fetchURL(url))
})
