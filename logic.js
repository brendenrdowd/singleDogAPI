function parseBreed(breed){
    console.log('parsing')
    let newBreed = ""
    for(let i = 0; i<breed.length;i++){
        console.log(breed[i])
        if(breed[i] === ' '){
            newBreed += '-'
        }
        else{
            newBreed += breed[i]
        }
    }
    console.log(newBreed)
    return newBreed;
}

function getDog(breed) {
    const url = `https://dog.ceo/api/breed/${parseBreed(breed)}/images/random`
    console.log(url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log('ok')
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    const res = responseJson.message
    $('#results-list').empty();
    $('#results-list').append(
        `<li>
            <img src="${res}" alt="random dog image">
        </li>`
    )
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const breed = $('#js-breed').val();
        getDog(breed)
    })
}

$(watchForm)
