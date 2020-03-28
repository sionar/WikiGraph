import { nodes, edges } from './store'

document.addEventListener('DOMContentLoaded', () => {
  getPageLinks('Tony');
})


function getPageLinks(name) {
  const headerParams = '&origin=*&format=json&formatversion=2'
  const prop = '&prop=links&plnamespace=0&pllimit=500'
  const domain = 'http://en.wikipedia.org/w/api.php?action=query'
  const searchParams = `&titles=${name}`
  const url = `${domain}${headerParams}${searchParams}${prop}`;
  fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  .then(res => res.json())
  .then(data => getLinkPageCounts(data)) 
}

function getLinkPageCounts(data) {
  let titleQuery, links, titleQueryStr, searchParams, url;
  const headerParams = '&origin=*&format=json&formatversion=2';
  const prop = '&prop=linkshere|pageviews';
  const domain = 'http://en.wikipedia.org/w/api.php?action=query';
  for (let i = 0; i < data.query.pages[0].links.length/50; i++) {
    titleQuery = [];
    links = data.query.pages[0].links.slice(i*50,i*50 + 50);
    links.forEach(link => titleQuery.push(link.title))
    titleQueryStr = titleQuery.join('|');
    searchParams = `&titles=${titleQueryStr}`
    url = `${domain}${headerParams}${searchParams}${prop}`;
    fetch(url, { method: 'GET', mode: 'cors',} )
      .then(res => res.json())
      .then(data => addFilteredEdges(data))
    }
  }

function addFilteredEdges(data) {
  const candidateEdges = data.query.pages;
  for (let i = 0; i < candidateEdges.length; i++) {
    if (candidateEdges[i].pageviews && candidateEdges[i].linkshere)
      edges[candidateEdges[i].pageid] = candidateEdges[i];
  }
  console.log(edges);
}