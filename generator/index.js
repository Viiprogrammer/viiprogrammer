const data = require('./data.json')
const fs = require('fs')

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

let content = `### Hi there <img src="${[data.github.rawUrl, data.github.username, data.github.username].join('/')}/main/wave.gif" height="30px" width="30px">\n`
content += `![GitHub metrics](https://metrics.lecoq.io/${data.github.username})\n\n`

content += `| <a href="https://github.com/${data.github.username}/github-readme-stats">`
content += `<img align="center" src="https://github-readme-stats.vercel.app/api?username=${data.github.username}&theme=dark&show_icons=true&include_all_commits=true&hide_border=true" alt="Github stats" />`
content += `</a> | `
content += `<a href="https://github.com/${data.github.username}/github-readme-stats">`
content += `<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github.username}&layout=compact&hide_border=true&theme=dark" />`
content += '</a> |\n'
content += '| ------------- | ------------- |\n\n'

content += '## 🔧 Technologies & Tools\n' +
  data.technologiesAndTools.map(badge => createBadge(badge.prefix, badge.title, badge.params))
    .join('\n')
  + `\n\n## Skills\n` +
    data.skills.map(badge => createBadge(badge.prefix, badge.title, badge.params))
      .join('\n')
  + `\n\n## Contact\n` +
  data.contact.map(badge => createBadge(badge.prefix, badge.title, badge.params))
    .join('\n')


fs.writeFileSync('../../README.md', content)
