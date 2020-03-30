import { nodes } from './store';

const RADIUS = 50;

export const renderNodes = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const nodeKeys = Object.keys(nodes);
  nodeKeys.forEach(nodeKey => drawNode(nodeKey));
}

const drawNode = nodeKey => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const node = nodes[nodeKey];
  ctx.beginPath();
  ctx.fillStyle = '#B8D9FF';
  ctx.arc(node.position.x, node.position.y, RADIUS, 0, 2*Math.PI);
  ctx.fill();
  ctx.font = "bold 24px Calibri";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
  ctx.fillText(nodeKey, node.position.x, node.position.y);
  ctx.stroke();
}

export const renderEdges = () => {
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');


}

export const handleMouseScroll = (e) => {
  e.preventDefault();
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  e.deltaY < 0 ? ctx.scale(1.05, 1.05) : ctx.scale(1/1.05, 1/1.05);
}