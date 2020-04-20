import { createNode, reset } from './actions';
import { renderNodes, renderEdges} from './canvas';
import { handleMouseScroll, handleMouseDown, handleMouseUp, handleMouseMove, 
         handleClickNode, handleClickEdge, handleResize } from './events';
import { loadMobileEventListeners } from './mobile';
         
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const infoButton = document.getElementById('info-button');
  const startInput = document.getElementById('start-input');
  const canvas1 = document.getElementById('canvas1');
  const canvas2 = document.getElementById('canvas2');
  const canvasBox = document.getElementById('canvas-box');
  
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;  
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  
  startButton.addEventListener('click', handleStartClick);
  infoButton.addEventListener('click', handleInfoClick);
  startInput.addEventListener('input', handleInputClearErrors);
  canvasBox.addEventListener('wheel', handleMouseScroll);
  canvasBox.addEventListener('mousedown', handleMouseDown);
  canvasBox.addEventListener('mouseup', handleMouseUp);
  canvasBox.addEventListener('mousemove', handleMouseMove);
  canvasBox.addEventListener('mousedown', handleClickNode);
  canvasBox.addEventListener('mousedown', handleClickEdge);
  window.addEventListener('resize', handleResize);

  loadMobileEventListeners();

  setInterval(renderNodes, 17);
  setInterval(renderEdges, 17);
})


const handleStartClick = e => {
  e.preventDefault();
  const button = e.target;
  const input = document.getElementById('start-input');
  if (button.innerText === 'Start') {
    if (input.value) {
      createNode(input.value, null);
      toggleInput();
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
    infoBox.className = "";
    infoBox.classList.add('info-show');
  } else {
    button.innerText = 'Show Info';
    infoBox.classList.add('info-slide-out');
    setTimeout(() => {
      infoBox.className = ""; 
      infoBox.classList.add('info-hide')}, 300);
  }
}

export const handleInputClearErrors = () => {
  console.log('hi')
  const input = document.getElementById('start-input');
  input.style.border = "1px solid #5c51ad";
  const error = document.getElementById('start-input-error');
  error.style.display = "none";
}

export const toggleInput = () => {
  const button = document.getElementById('start-button');
  button.innerText = 'Reset';
  const input = document.getElementById('start-input');
  input.disabled = true;
}

export const showErrors = () => {
  const button = document.getElementById('start-button');
  button.innerText = 'Start';
  const input = document.getElementById('start-input');
  input.disabled = false;
  input.style.border = "1px solid #FF3333";
  const error = document.getElementById('start-input-error');
  error.style.display = "block";
}