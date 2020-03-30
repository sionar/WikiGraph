export let scale = 1;
export let xPan = 0;
export let yPan = 0;

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

export const handleMouseMove = (e) => {
  xPan += e.movementX;
  yPan += e.movementY;
}

export const handleMouseDown = (e) => {
  e.preventDefault();
  document.addEventListener('mousemove', handleMouseMove);
}

export const handleMouseUp = e => {
  e.preventDefault();
  document.removeEventListener('mousemove', handleMouseMove);
}