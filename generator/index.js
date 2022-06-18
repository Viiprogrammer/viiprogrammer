const data = require('./data.json')
const fs = require('fs')
const ejs = require('ejs')

function createBadge (prefix, title, qs) {
  title = title.replace(/\s/, '_')
  const url = qs.url
  delete qs.url
  qs.style ??= 'flat'
  qs.logoColor ??= 'white'
  const params = new URLSearchParams(qs)
  const res =  `![](${data.shieldIOUrl}${[prefix, title].join('-')}-informational${'?' + params.toString()})`
  return url ? `<a href="${url}">${res}</a>` : res
}

// I tried to pass createBadge into context option, but it's doesn't work
data.createBadge = createBadge

const template = fs.readFileSync('./template.ejs', { encoding: 'utf-8' })
const str = ejs.render(template, data )

fs.writeFileSync('../README.md', str)
