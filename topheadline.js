const IMG = document.getElementById('topdisplay');
const newslink = new URL('https://newsapi.org/v2/everything?q=covid&from=2021-09-16&sortBy=publishedAt&apiKey=6736e77119e64539b94ab49bc965916d');
const q = newslink.search;

let myFunction = () => {
  const x = document.getElementById("topic").value;
  let p = q.replace('top-headlines', x);
  console.log(newslink);
  newslink.search = p;
}

(async() => {
  const response = await fetch(newslink.href)
  const data = await response.json()

  if (data.status === 'ok') {
    const article = data.articles
    data.articles.forEach(article => {
      if (article.urlToImage != null) {
        if (article.author == null){article.author = "no author found"}
        if (article.content == null){article.content = "..."}
        if (article.title.length > 40){
          IMG.innerHTML += `
          <img src="${article.urlToImage}" align="left" />
          <h1><span style="font-size:25px">${article.title}</span><br>
            :<span style="font-size:20px">${article.content}</span><br>
            by: <span style="font-size:15px">${article.author}</span>
            </h1>  
            `
        }
        else {
          IMG.innerHTML += `
          <img src="${article.urlToImage}" align="left" />
          <h1><span style="font-size:30px">${article.title}</span><br>
            :<span style="font-size:20px">${article.content}</span><br>
            by: <span style="font-size:15px">${article.author}</span>
            </h1>  
            `
        }
        
      }
      
    })
  }

  
})()
