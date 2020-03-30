import { nodes, edges, NODE_DISTANCE, resetStore } from './store';
import { setActiveNodeKey } from './events';

const wiki = require('wtf_wikipedia');

export const createNode = (name, prevNode, angle) => {
  wiki.fetch(name)
  .then (doc => {
    const links = doc.links().map(link => link.json())
    nodes[name] = {};
    nodes[name].color = randomColor();
    nodes[name].links = links.slice(0,8);
    const canvas = document.getElementById('canvas1');
    if (!prevNode) {
      nodes[name].position = {x: canvas.width/2, y: canvas.height/2};
    } else {
      const xPos = nodes[prevNode].position.x + NODE_DISTANCE * Math.cos(angle); 
      const yPos = nodes[prevNode].position.y + NODE_DISTANCE * Math.sin(angle); 
      nodes[name].position = {x: xPos, y: yPos};
      edges.push({node1: prevNode, node2: name});
    }
    setActiveNodeKey(name);
  })
}

export const reset = () => {
  resetStore();
  setActiveNodeKey(null);
}

const randomColor = () => {
  const chars = "0123456789abcdef"
  let output = "#";
  for (let i = 0; i < 6; i++) {
    output += chars[Math.floor(Math.random() * chars.length)];
  }
  return output;
}
