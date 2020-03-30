import { nodes } from './store';
import { getLinks, reset } from './actions';
import { renderNodes, renderEdges, handleMouseScroll } from './canvas';


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
  canvas2.parentElement.addEventListener('wheel', handleMouseScroll)
  setInterval(renderNodes, 17);
  setInterval(renderEdges, 17);
  window.nodes = nodes;
})

const handleClickStart = (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('start-input').value;
  if (inputValue) {
    getLinks(inputValue, true)
  }
}

const handleClickReset = (e) => {
  e.preventDefault();
  reset();
}

