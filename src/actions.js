import { toggleInput, showErrors } from './index';
import { nodes, edges, NODE_DISTANCE, resetStore } from './store';
import { setActiveNodeKey } from './events';

const wiki = require('wtf_wikipedia');

export const createNode = (name, prevNode, angle) => {
  wiki.fetch(name)
  .then (doc => {
    if (doc === null) {
      showErrors();
      return;
    }
    const paragraphs = doc.paragraphs();
    let text = paragraphs[0].text();
    if (text.length === 0 || paragraphs[1])
      text = paragraphs[1].text(); 
    const links = doc.links().map(link => link.json());
    const nodeLinks = [];
    for (let i = 0; i < links.length; i++) {
      if (nodeLinks.length >= 8)
        break;
      if (links[i].type === 'internal')
        nodeLinks.push(links[i]);
    }
    nodes[name] = {};
    nodes[name].color = randomColor();
    nodes[name].links = nodeLinks;
    nodes[name].text = text;
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
    renderInfo(name, nodes[name].text);

  })
}

export const deleteEdgeFromNode = (node, page) => {
  let idx = null;
  for (let i = 0; i < node.links.length; i++) {
    if (node.links[i].page === page)
      idx = i;
  }
  if (idx !== null) {
    node.links = node.links.slice(0, idx).concat(node.links.slice(idx+1, node.links.length));
  }
}

export const reset = () => {
  resetStore();
  setActiveNodeKey(null);
  renderInfo('', '');
}

const randomColor = () => {
  const chars = "0123456789abcdef"
  let output = "#";
  for (let i = 0; i < 6; i++) {
    output += chars[Math.floor(Math.random() * chars.length)];
  }
  return output;
}

export const renderInfo = (key, text) => {
  const infoTitle = document.getElementById('info-title');
  const infoText = document.getElementById('info-text');
  infoTitle.innerHTML = key;
  infoText.innerHTML = text;
}