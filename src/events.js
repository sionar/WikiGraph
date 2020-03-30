import { nodes, RADIUS, EDGE_LENGTH, SCREEN_OFFSET } from './store';
import { createNode } from './actions';

export let scale = 1;
export let xPan = 0;
export let yPan = 0;
export let activeNodeKey = null;
export let activeEdge = null;

export const handleMouseScroll = (e) => {
  e.preventDefault();
  const canvas1 = document.getElementById('canvas1');
  const ctx1 = canvas1.getContext('2d');
  const canvas2 = document.getElementById('canvas2');
  const ctx2 = canvas2.getContext('2d');
  if (e.deltaY < 0)
    scale *= 1.05;
  else 
    scale /= 1.05;
  ctx1.setTransform(scale, 0, 0, scale, 0, 0);
  ctx2.setTransform(scale, 0, 0, scale, 0, 0);
}

export const handleMouseDrag = (e) => {
  xPan += e.movementX;
  yPan += e.movementY;
}

export const handleMouseDown = (e) => {
  e.preventDefault();
  document.addEventListener('mousemove', handleMouseDrag);
}

export const handleMouseUp = e => {
  e.preventDefault();
  document.removeEventListener('mousemove', handleMouseDrag);
}

export const handleMouseMove = e => {
  const x = (e.offsetX) / scale - xPan;
  const y = (e.offsetY + SCREEN_OFFSET) / scale - yPan;
  const nodeKeys = Object.keys(nodes);
  let node, distSq, angle, idx;
  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (RADIUS*RADIUS < distSq && distSq < EDGE_LENGTH * EDGE_LENGTH) {
      angle = Math.atan((y - node.position.y)/(x - node.position.x));
      if (x - node.position.x < 0 && y - node.position.y > 0)
        angle = Math.PI + angle;
      else if ( x - node.position.x < 0 && y - node.position.y < 0)
        angle = Math.PI + angle;
      else if ( x- node.position.x > 0 && y - node.position.y < 0)
        angle = 2 * Math.PI + angle;
      idx = Math.floor(angle/ (2 * Math.PI / node.links.length));
      activeNodeKey = nodeKey;
      activeEdge = node.links[idx];
    } else {
      activeNodeKey = null;
      activeEdge = null;
    }
  });
}

export const handleClickEdge = () => {
  if (activeEdge) {
    const node = nodes[activeNodeKey];
    let angle;
    for (let i = 0; i < node.links.length; i++) {
      if (node.links[i].page === activeEdge.page) {
        angle = 2 * Math.PI * i / node.links.length;  
      }
    }
    createNode(activeEdge.page, activeNodeKey, angle);
  }
}