const getTodos = (resource) => {

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      //Get data from the API
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject('Failed to get data');
      }
    })
    request.open('GET', resource)
    request.send();


  })
}

getTodos('https://jsonplaceholder.typicode.com/todos/').then(data=>{
  console.log(data);
  return getTodos('https://api.restful-api.dev/objects').then(data=>{
    console.log('Promise 2 kept ', data)
  })
}).catch(err=>{
  console.log(err);
})



  //Create a request object







