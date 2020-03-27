document.addEventListener('DOMContentLoaded', () => {
  getPage('Boston');
})


function getPage(name) {
  const headerParams = '&origin=*&format=json&formatversion=2'
  const prop = '&prop=links&plnamespace=0&pllimit=500'
  const domain = 'http://en.wikipedia.org/w/api.php?action=query'
  const searchParams = `&titles=${name}`
  const url = `${domain}${headerParams}${searchParams}${prop}`;
  console.log(url)
  fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  .then(res => res.json())
  .then(data => console.log(data))
}