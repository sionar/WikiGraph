import { modifyPan, modifyScale } from './events';
import { xPan, yPan, scale } from './events';
import { nodes, RADIUS } from './store';

let touchX1, touchY1, touchX2, touchY2, distance;

export const loadMobileEventListeners = () => {
  const canvasBox = document.getElementById('canvas-box');

  
  canvasBox.addEventListener('touchstart', handleTouchStart);
  canvasBox.addEventListener('touchmove', handleTouchMove);
}

const handleTouchStart = e => {
  touchX1 = e.touches[0].clientX;
  touchY1 = e.touches[0].clientY;

  if (e.touches.length >= 2) {
    distance = getDist(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);
  }

}

const handleTouchMove = e => {  
  e.preventDefault();
  const x = (e.changedTouches[0].clientX) / scale - xPan;
  const y = (e.changedTouches[0].clientY) / scale - yPan;
  const deltaX = e.changedTouches[0].clientX - touchX1;
  const deltaY = e.changedTouches[0].clientY - touchY1;
  const nodeKeys = Object.keys(nodes);
  let node, distSq, foundNode = false;

  nodeKeys.forEach(nodeKey => {
    node = nodes[nodeKey];
    distSq = Math.pow((x - node.position.x),2) + Math.pow((y - node.position.y),2)
    if (distSq < RADIUS*RADIUS ) {
      foundNode = true;
      node.position.x = node.position.x + deltaX / scale;
      node.position.y = node.position.y + deltaY / scale;
    }
  })
  if (!foundNode) {
    modifyPan(deltaX, deltaY);
  }

  touchX1 = e.changedTouches[0].clientX;
  touchY1 = e.changedTouches[0].clientY;

  if (e.touches.length >= 2) {
    const newDist = dist(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);
    if (distance - newDist < 0)
      modifyScale(1/1.03);
    else
      modifyScale(1.03);
    distance = newDist;
  }
}

const getDist = (x1, y1, x2, y2) => {
  return Math.sqrt((Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)));
}