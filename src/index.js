import { nodes } from './store';
import { createNode, reset } from './actions';
import { renderNodes, renderEdges} from './canvas';
import { handleMouseScroll, handleMouseDown, handleMouseUp, handleMouseMove, 
         handleClickNode, handleClickEdge, handleResize } from './events';

         
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', handleStartClick)
  
  const infoButton = document.getElementById('info-button');
  infoButton.addEventListener('click', handleInfoClick)

  const canvas1 = document.getElementById('canvas1');
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;  
  
  const canvas2 = document.getElementById('canvas2');
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  const canvasContainer = canvas2.parentElement;
  window.canvasContainer = canvasContainer;

  canvasContainer.addEventListener('wheel', handleMouseScroll);
  canvasContainer.addEventListener('mousedown', handleMouseDown);
  canvasContainer.addEventListener('mouseup', handleMouseUp);
  canvasContainer.addEventListener('mousemove', handleMouseMove);
  canvasContainer.addEventListener('mousedown', handleClickNode);
  canvasContainer.addEventListener('mousedown', handleClickEdge);
  window.addEventListener('resize', handleResize);

  setInterval(renderNodes, 17);
  setInterval(renderEdges, 17);

})


const handleStartClick = e => {
  e.preventDefault();
  const button = e.target;
  const input = document.getElementById('start-input');
  if (button.innerText === 'Start') {
    if (input.value) {
      button.innerText = 'Reset';
      createNode(input.value, null);
      input.disabled = true;
    }
  } 
  else {
      button.innerText = 'Start';
      input.disabled = false;
      reset();
    }
}

const handleInfoClick = e => {
  e.preventDefault();
  const button = e.target;
  const infoBox = document.getElementById('info-box');
  if (button.innerText === 'Show Info') {
    button.innerText = 'Hide Info';
    infoBox.style.display = 'flex';
  } else {
    button.innerText = 'Show Info'
    infoBox.style.display = 'none';
  }
}