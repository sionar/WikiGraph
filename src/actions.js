import { nodes } from './store';
const wtf = require('wtf_wikipedia');

export const getLinks = name => {
  wtf.fetch(name)
  .then (doc => {
    const links = doc.links().map(link => link.json())
    nodes[name] = links.slice(0,12);
  })
}

export const reset = () => {
  const keys = Object.keys(nodes);
  keys.forEach(key => delete nodes[key]);
}

