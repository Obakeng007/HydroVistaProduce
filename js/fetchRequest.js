//fetch API
fetch('https://api.restful-api.dev/objects').then(response=>{
  console.log('Resolved', response);
  return response.json();
}).then(data=>{
  console.log(data);
}).catch(err=>{
  console.log('Data not found')
})


//Async and Await
const getTodos = async () => {
  const response = await fetch('https://api.restful-api.dev/objects');
  const info = await response.json();
  return info;
}

getTodos()
  .then(data=> console.log(data))
