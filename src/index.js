import { nodes } from './store'
const wtf = require('wtf_wikipedia');

document.addEventListener('DOMContentLoaded', () => {
  
})

function getLinks(name, nodes) {
  wtf.fetch(name)
  .then (doc => {
    const links = doc.links().map(link => link.json())
    nodes[name] = links.slice(0,12);
  })
}

function reset(nodes) {
  const keys = Object.keys(nodes);
  keys.forEach(key => delete nodes[key]);
}

