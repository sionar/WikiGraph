import { nodes, edges } from './store'

document.addEventListener('DOMContentLoaded', () => {
  getPageLinks('Boston');
})


function getPageLinks(name, payload = [], cont = '') {
  const headerParams = '&origin=*&format=json&formatversion=2';
  const prop = '&prop=links&plnamespace=0&pllimit=500';
  const plcontinue = cont ? `&plcontinue=${cont}` : '';
  const domain = 'http://en.wikipedia.org/w/api.php?action=query';
  const searchParams = `&titles=${name}`;
  const url = `${domain}${headerParams}${searchParams}${prop}${plcontinue}`;
  fetch(url, {method: 'GET', mode: 'cors'})
    .then(res => res.json())
    .then(res => {
      payload = payload.concat(res.query.pages[0].links);      
      if (res.continue)
        getPageLinks(name, payload, res.continue.plcontinue);
      else {
        const index = Math.floor(payload.length/50);
        getLinkData(payload, index);
      }
    })    
}

function getLinkData(data, index, output = []) {
  if (index === -1) {
    return addFilteredEdges(output);
  }
  const headerParams = '&origin=*&format=json&formatversion=2';
  const prop = '&prop=linkshere|pageviews&lhlimit=500';
  const domain = 'http://en.wikipedia.org/w/api.php?action=query';
  const titleQuery = [];
  const links = data.slice(index*50, index*50 + 50);
  links.forEach(link => titleQuery.push(link.title))
  const titleQueryStr = titleQuery.join('|');
  const searchParams = `&titles=${titleQueryStr}`
  const url = `${domain}${headerParams}${searchParams}${prop}`;
  fetch(url, { method: 'GET', mode: 'cors',} )
    .then(res => res.json())
    .then(res => {
      output = output.concat(res.query.pages);
      getLinkData(data, index-1, output )
    })
  }

function addFilteredEdges(data) {
  let candidates = {}

  if (data.length <= 8) {
    for (let i = 0; i < data.length; i++) {
      candidates[data[i].pageid] = data[i];
    }
    edges = Object.assign(edges, candidates);
    return
  }

  if (data.length < 50) {
    const shuffled = shuffle(data);
    for (let i = 0; i < 8; i++) {
      candidates[shuffled[i].pageid] = shuffled[i];
    }
    edges = Object.assign(edges, candidates);
    return
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].pageviews && data[i].linkshere)
      candidates[data[i].pageid] = data[i];
  }
  if (Object.keys(candidates).length < 50)
    edges = Object.assign(edges, candidates);  
}