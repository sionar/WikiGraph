import { nodes } from './store';

const wiki = require('wtf_wikipedia');

export const getLinks = (name, starting) => {
  wiki.fetch(name)
  .then (doc => {
    const links = doc.links().map(link => link.json())
    nodes[name] = {};
    nodes[name].links = links.slice(0,8);
    if (starting) {
      const canvas = document.getElementById('canvas1');
      nodes[name].position = {x: canvas.width/2, y: canvas.height/2};
    }
  })
}

export const reset = () => {
  const keys = Object.keys(nodes);
  keys.forEach(key => delete nodes[key]);
}

