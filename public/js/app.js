// console.log("This is a JS file");

 const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const location = search.value
    const link1 = 'http://localhost:3000/weather?address=' + location;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';
    fetch(link1).then((response)=>{   
    response.json().then((data) =>{
        // console.log(error);
            if(data.error){
                messageOne.textContent = data.error;
             }
             else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData;
            }            
        })
    })  
}) 