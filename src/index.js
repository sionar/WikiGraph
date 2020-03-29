import { nodes } from './store';
import { getLinks, reset } from './actions';


document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const resetButton = document.getElementById('reset-button');
  startButton.addEventListener('click', handleClickStart)
  resetButton.addEventListener('click', handleClickReset)
  window.nodes = nodes;
})

const handleClickStart = (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('start-input').value;
  if (inputValue) {
    getLinks(inputValue)
  }
}

const handleClickReset = (e) => {
  e.preventDefault();
  reset();
}

