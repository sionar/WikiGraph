import { nodes } from './store';
import { createNode, reset } from './actions';
import { renderNodes, renderEdges} from './canvas';
import { handleMouseScroll, handleMouseDown, handleMouseUp, handleMouseMove, 
         handleClickNode, handleClickEdge } from './events';

         
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const resetButton = document.getElementById('reset-button');
  
  startButton.addEventListener('click', handleClickStart)
  resetButton.addEventListener('click', handleClickReset)
  
  const canvas1 = document.getElementById('canvas1');
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;  
  
  const canvas2 = document.getElementById('canvas2');
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  const canvasContainer = canvas2.parentElement;

  canvasContainer.addEventListener('wheel', handleMouseScroll);
  canvasContainer.addEventListener('mousedown', handleMouseDown);
  canvasContainer.addEventListener('mouseup', handleMouseUp);
  canvasContainer.addEventListener('mousemove', handleMouseMove);
  canvasContainer.addEventListener('mousedown', handleClickNode);
  canvasContainer.addEventListener('mousedown', handleClickEdge);

  setInterval(renderNodes, 17);
  setInterval(renderEdges, 17);
  window.addEventListener('resize', handleResize);
  window.nodes = nodes;
})


const handleClickStart = e => {
  e.preventDefault();
  const inputValue = document.getElementById('start-input').value;
  if (inputValue) {
    createNode(inputValue, null);
  }
}

const handleClickReset = e => {
  e.preventDefault();
  reset();
}

const handleResize = e => {
  e.preventDefault();
  const canvas1 = document.getElementById('canvas1');
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;  
  
  const canvas2 = document.getElementById('canvas2');
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
}