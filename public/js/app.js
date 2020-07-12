console.log('js is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mess_1 = document.querySelector('#weed');
const mess_2 = document.querySelector('#weed1');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    mess_1.textContent = 'loading...';
    mess_2.textContent = '';
    const location = search.value;
    const url = location !== '' ? `http://localhost:3000/weather?address=${location}`: `http://localhost:3000/weather`;

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mess_1.textContent = data.error;
            }else{
                mess_1.textContent = JSON.stringify(data);
            }
            
        });
    });
});

