import { nodes, RADIUS, EDGE_LENGTH } from './store';
import { scale, xPan, yPan, activeEdge } from './events';


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
  ctx.font = "bold 24px Calibri";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
  ctx.fillText(nodeKey, 0, 0);
  ctx.stroke();
  ctx.setTransform(scale,0,0,scale,0,0);
}

export const renderEdges = () => {
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
  const nodeKeys = Object.keys(nodes);
  let node, rotation;
  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    node.links.forEach((link, idx) => {
      ctx.translate(node.position.x + xPan, node.position.y + yPan);
      rotation = idx * 2 * Math.PI / node.links.length;
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineWidth = 5;
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
        ctx.fillText(link.page, -175, -15);
      } else {
        ctx.fillText(link.page, 100, 30);
      }

      ctx.setTransform(scale,0,0,scale,0,0);
    })
  })

}


