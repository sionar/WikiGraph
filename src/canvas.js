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
  const node = nodes[nodeKey];
  ctx.translate(node.position.x, node.position.y);
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
  ctx.setTransform(1,0,0,1,0,0);
}

export const renderEdges = () => {
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const nodeKeys = Object.keys(nodes);
  let node, rotation;
  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    node.links.forEach((link, idx) => {
      ctx.translate(node.position.x, node.position.y);
      rotation = idx * 2 * Math.PI / node.links.length;
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineTo(0,200);
      ctx.stroke();

      ctx.font = "18px Calibri";
      ctx.strokeStyle = '#AAAAAA';
      ctx.fillStyle = '#AAAAAA';
      if (rotation >= Math.PI/2 && rotation < Math.PI * 3/2) {
        ctx.rotate(Math.PI);
        ctx.fillText(link.page, -175, -15);
      } else {
        ctx.fillText(link.page, 100, 30);
      }

      ctx.stroke();
      ctx.setTransform(1,0,0,1,0,0);
    })
  })

}

export const handleMouseScroll = (e) => {
  e.preventDefault();
  const canvas1 = document.getElementById('canvas1');
  const ctx1 = canvas1.getContext('2d');
  const canvas2 = document.getElementById('canvas2');
  const ctx2 = canvas2.getContext('2d');
  if (e.deltaY < 0) {
    ctx1.scale(1.05, 1.05);
    ctx2.scale(1.05, 1.05);
  } else {
    ctx1.scale(1/1.05, 1/1.05);
    ctx2.scale(1/1.05, 1/1.05);
  }
}