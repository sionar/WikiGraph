import { nodes, RADIUS, EDGE_LENGTH, SCREEN_Y_OFFSET } from './store';
import { createNode, deleteEdgeFromNode, renderInfo } from './actions';

export let scale = 1;
export let xPan = 0;
export let yPan = 0;
export let activeNodeKey = null;
export let activeEdge = null;

export const handleMouseScroll = e => {
  e.preventDefault();
  const canvas1 = document.getElementById('canvas1');
  const ctx1 = canvas1.getContext('2d');
  const canvas2 = document.getElementById('canvas2');
  const ctx2 = canvas2.getContext('2d');
  const oldScale = scale;
  if (e.deltaY < 0)
    scale *= 1.05;
  else 
    scale /= 1.05;
  ctx1.setTransform(scale, 0, 0, scale, 0, 0);
  ctx2.setTransform(scale, 0, 0, scale, 0, 0);
}

export const handleMouseDrag = e => {
  e.preventDefault();
  const x = (e.offsetX) / scale - xPan;
  const y = (e.offsetY + SCREEN_Y_OFFSET) / scale - yPan;  
  const nodeKeys = Object.keys(nodes);
  let node, distSq, foundNode = false;

  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (distSq < RADIUS*RADIUS ) {
      foundNode = true;
      node.position.x = node.position.x + e.movementX / scale;
      node.position.y = node.position.y + e.movementY / scale;
    }
  })
  if (!foundNode) {
    xPan += e.movementX;
    yPan += e.movementY;
  }
}

export const handleMouseDown = e => {
  e.preventDefault();
  document.addEventListener('mousemove', handleMouseDrag);
}

export const handleMouseUp = e => {
  e.preventDefault();
  document.removeEventListener('mousemove', handleMouseDrag);
}

export const handleMouseMove = e => {
  if (!nodes[activeNodeKey] || nodes[activeNodeKey].links.length === 0)
    return;

  const x = (e.offsetX) / scale - xPan;
  const y = (e.offsetY + SCREEN_Y_OFFSET) / scale - yPan;
  const nodeKeys = Object.keys(nodes);
  let node, distSq, angle, idx;
  node = nodes[activeNodeKey];
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
    activeEdge = {page: node.links[idx].page, nodeKey: activeNodeKey};
  } else {
    activeEdge = null;
  };
}

export const handleClickNode = e => {
  const nodeKeys = Object.keys(nodes);
  const x = (e.offsetX) / scale - xPan;
  const y = (e.offsetY + SCREEN_Y_OFFSET) / scale - yPan;
  let node, distSq;

  activeNodeKey = null;
  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (distSq < RADIUS*RADIUS) {
      activeNodeKey = nodeKey;
      renderInfo(nodeKey, node.text);
    }
  })
}

export const handleClickEdge = () => {
  if (activeEdge) {
    const node = nodes[activeEdge.nodeKey];
    let angle;
    for (let i = 0; i < node.links.length; i++) {
      if (node.links[i].page === activeEdge.page) {
        angle = 2 * Math.PI * i / node.links.length;  
      }
    }
    createNode(activeEdge.page, activeEdge.nodeKey, angle);
    deleteEdgeFromNode(node, activeEdge.page);
    activeNodeKey = activeEdge.page;
  }
}

export const setActiveNodeKey = key => {
  activeNodeKey = key;
}

export const handleResize = e => {
  e.preventDefault();
  const canvas1 = document.getElementById('canvas1');
  const ctx1 = canvas1.getContext('2d');
  const canvas2 = document.getElementById('canvas2');
  const ctx2 = canvas2.getContext('2d');
 
  const width = /Mobi/.test(navigator.userAgent) ? screen.width : window.innerWidth;
  const height = /Mobi/.test(navigator.userAgent) ? screen.height : window.innerHeight;

  canvas1.width = width;
  canvas1.height = height;
  canvas2.width = width;
  canvas2.height = height;
  ctx1.setTransform(scale, 0, 0, scale, 0, 0);
  ctx2.setTransform(scale, 0, 0, scale, 0, 0);
}

export const modifyPan = (x,y) => {
  xPan += x;
  yPan += y;
}

export const modifyScale = (val) => {
  scale *= val;
}