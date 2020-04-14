
// Client Side Javascript

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('#errorMsg')
const sucessMsg = document.querySelector('#sucessMsg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorMsg.textContent = ''
    sucessMsg.textContent = 'Loading...'
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                errorMsg.textContent = data.error 
                sucessMsg.textContent = ''               
            }
            else
            {                
                sucessMsg.textContent = data.address + ': ' + data.forecast.temperature + '   ' + data.forecast.summary
            }
            
        })
    })
})