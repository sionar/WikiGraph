import { modifyPan, modifyScale } from './events'; 

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
    distance = dist(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);
  }

}

const handleTouchMove = e => {
  const deltaX = e.changedTouches[0].clientX - touchX1;
  const deltaY = e.changedTouches[0].clientY - touchY1;
  touchX1 = e.changedTouches[0].clientX;
  touchY1 = e.changedTouches[0].clientY;
  modifyPan(deltaX, deltaY);

  if (e.touches.length >= 2) {
    const newDist = dist(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);
    if (distance - newDist < 0)
      modifyScale(1/1.05);
    else
      modifyScale(1.05);
    distance = newDist;
  }
}

const dist = (x1, y1, x2, y2) => {
  return Math.sqrt((Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)));
}