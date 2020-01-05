#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const jsdom = require("jsdom")

const exportPath = process.argv[2]

const filesToParse = []
for (let i = 1; ; i += 1) {
  const name = path.join(exportPath, `messages${i === 1 ? '' : i}.html`)
  if (!fs.existsSync(name)) { break }
  filesToParse.push(name);
}

async function parseHTMLFile(filename) {
  const data = await fs.promises.readFile(filename)

  const dom = new jsdom.JSDOM(data)
  Array.from(dom.window.document.querySelectorAll('.message .text a')).map(el => {
    const { href } = el
    if (href) {
      console.log(href)
    }
  })
}

filesToParse.reduce(async (previousPromise, filename) => {
  await previousPromise
  return parseHTMLFile(filename)
}, Promise.resolve())
// parseHTMLFile(path.join(exportPath, 'messages.html'))
  .catch(err => { console.error(err) })
