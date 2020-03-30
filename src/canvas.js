import { nodes, edges, RADIUS, EDGE_LENGTH } from './store';
import { scale, xPan, yPan, activeEdge, activeNodeKey } from './events';


export const renderNodes = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
  const nodeKeys = Object.keys(nodes);
  nodeKeys.forEach(nodeKey => drawNode(nodeKey));
}

const drawNode = nodeKey => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  const node = nodes[nodeKey];
  ctx.translate(node.position.x + xPan, node.position.y + yPan);
  ctx.beginPath();
  ctx.fillStyle = '#B8D9FF';
  ctx.arc(0, 0, RADIUS, 0, 2*Math.PI);
  ctx.fill();
  ctx.font = "bold 18px Calibri";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
  ctx.fillText(nodeKey, 0, 0);
  ctx.stroke();
  ctx.setTransform(scale,0,0,scale,0,0);
}

export const renderEdges = () => {
  if (activeNodeKey === null) {
    return;
  }
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
  let node, rotation;
  node = nodes[activeNodeKey];
  node.links.forEach((link, idx) => {
    ctx.translate(node.position.x + xPan, node.position.y + yPan);
    rotation = idx * 2 * Math.PI / node.links.length;
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineWidth = 5;
    ctx.textAlign = "center";
    if (activeEdge && link.page === activeEdge.page) {
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#000000";
    }
    else {
      ctx.strokeStyle = "#CCCCCC";
      ctx.fillStyle = '#AAAAAA';
    }
    ctx.lineTo(EDGE_LENGTH, 0);
    ctx.stroke();
    ctx.font = "18px Calibri";
    if (rotation >= Math.PI/2 && rotation < Math.PI * 3/2) {
      ctx.rotate(Math.PI);
      ctx.fillText(link.page, -150, -15);
    } else {
      ctx.fillText(link.page, 150, 30);
    }

    ctx.setTransform(scale,0,0,scale,0,0);
  })
  edges.forEach(edge => {
    ctx.beginPath();
    ctx.moveTo(nodes[edge.node1].position.x + xPan, nodes[edge.node1].position.y + yPan);
    ctx.lineWidth = 5;
    if (activeEdge && link.page === activeEdge.page) {
      ctx.strokeStyle = "#000000";
    }
    ctx.lineTo(nodes[edge.node2].position.x + xPan, nodes[edge.node2].position.y + yPan);
    ctx.stroke();
  })
}


