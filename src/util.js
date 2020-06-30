import { handleStartClick } from './index';

export const getRandomTitle = () => {
  const domain = 'http://en.wikipedia.org/w/api.php?';
  const headerParams = '&origin=*&format=json&formatversion=2';
  const searchParams = "&action=query&list=random&rnnamespace=0&rnlimit=1";
  const url = domain + headerParams + searchParams;
  const input = document.getElementById('start-input');
  let title;
  fetch(url, {method: 'GET', mode: 'cors'})
    .then(res => res.json())
    .then(res => {
      title = res.query.random[0].title;
      input.value = title;
      handleStartClick(null)
    })

}