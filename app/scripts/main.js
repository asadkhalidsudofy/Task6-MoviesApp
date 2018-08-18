// global variables
var editCardIndex = 0
var form1Enabled = false
var form2Enabled = false
var movieDetailsEnabled = false
var fullView = true
var halfView = false
var movies = retrieveMovies()
var counter

// global functions
function hideAllForms () {
  // console.log(document.getElementById('addCardForm'))
  document.getElementById('addCardForm').style.display = 'none'
  document.getElementById('editCardForm').style.display = 'none'
}

function halfToFull () {
  document.getElementById('mainLeft').style.flexBasis = '100%'
  document.getElementById('mainLeftCards').style.flexBasis = '87%'
  var arr1 = document.getElementsByClassName('mainLeftCardsCard')

  for (let i = 0; i < arr1.length; i++) {
    arr1[i].style.flexBasis = '210px'
  }

  halfView = false
  fullView = true

  for (let i = 0; i < arr1.length; i++) {
    arr1[i].style.marginBottom = '0px'
  }

  var marginLargeCard = arr1.length - arr1.length % 6
  // if (arr1.length % 5 === 0) {
  for (let i = 0; i < marginLargeCard - 1; i++) {
    arr1[i].style.marginBottom = '20px'
  }
// }
}

function fullToHalf () {
  document.getElementById('mainLeft').style.flexBasis = '50%'
  var arr1 = document.getElementsByClassName('mainLeftCardsCard')

  for (let i = 0; i < arr1.length; i++) {
    arr1[i].style.flexBasis = '190px'
  }

  fullView = false
  halfView = true

  for (let i = 0; i < arr1.length; i++) {
    arr1[i].style.marginBottom = '0px'
  }

  var margin = arr1.length - arr1.length % 4
  // if (arr1.length % 3 === 0) {
  for (let i = 0; i < margin - 1; i++) {
    arr1[i].style.marginBottom = '20px'
  }
// }
}

// function smallCard () {
//   var arr1 = document.getElementsByClassName('mainLeftCardsCard')
//   for (let i = 0; i < arr1.length; i++) {
//     arr1[i].style.height = '219px'
//   }

//   var arr2 = document.getElementsByClassName('mainLeftCardsCard')
//   for (let j = 0; j < arr2.length; j++) {
//     arr2[j].firstChild.firstChild.style.height = '150px'
//   }
// }

function largeCard () {
  var arr2 = document.getElementsByClassName('mainLeftCardsCard')
  for (let j = 0; j < arr2.length; j++) {
    arr2[j].firstChild.firstChild.style.height = '302px'
  }
}

function showForm (id) {
  document.getElementById('mainRight').style.display = 'block'
  // document.getElementById(id).style.display = 'block'

  if (id === 'addCardForm') {
    form1Enabled = true
  }
  else if (id === 'editCardForm') {
    form2Enabled = true
  }
}

function hideForm (id) {
  document.getElementById('mainRight').style.display = 'none'
  // document.getElementById(id).style.display = 'none'

  // console.log(id)
  if (id === 'addCardForm') {
    form1Enabled = false
  }
  else if (id === 'editCardForm') {
    form2Enabled = false
  }
}

function showMovieDetails () {
  document.getElementById('mainRight').style.display = 'block'
  // document.getElementById('showMovieDetails').style.display = 'block'
  movieDetailsEnabled = true
}

function hideMovieDetails () {
  // document.getElementById('mainRight').style.display = 'none'
  document.getElementById('showMovieDetails').remove()
  movieDetailsEnabled = false
}

function saveMovies (item) {
  localStorage.setItem('movieArray', JSON.stringify(item))
}

function retrieveMovies () {
  var movieRetrieve = JSON.parse(localStorage.getItem('movieArray'))
  return movieRetrieve
}

// local storage defining an dretrieval
if (movies === null) {
  counter = 0
  movies = []
} else {
  counter = movies.length

  for (let index = 0; index < counter; index++) {
    var mainCard = document.createElement('div')
    mainCard.setAttribute('class', 'mainLeftCardsCard')
    mainCard.setAttribute('id', 'mainLeftCardsCard' + index)

    // sub div1
    var div1 = document.createElement('div')
    var div1Image = document.createElement('img')
    div1Image.setAttribute('src', movies[index].image)
    div1.appendChild(div1Image)

    // sub div2
    var div2 = document.createElement('div')
    div2.innerHTML = movies[index].title

    // sub div3
    var div3 = document.createElement('div')
    div3.innerHTML = movies[index].rating

    // sub div4
    var div4 = document.createElement('div')
    div4.innerHTML = movies[index].year

    // sub div5
    var div5 = document.createElement('div')
    var div5Button1 = document.createElement('button')
    div5Button1.setAttribute('onclick', 'showCardDetails(' + index + ')')
    div5Button1.innerHTML = 'Details'
    var div5Button2 = document.createElement('button')
    div5Button2.setAttribute('onclick', 'showEditCardOption(' + index + ')')
    div5Button2.innerHTML = 'Edit'
    var div5Button3 = document.createElement('button')
    div5Button3.setAttribute('onclick', 'deleteCard(' + index + ')')
    div5Button3.innerHTML = 'Delete'
    div5.appendChild(div5Button1)
    div5.appendChild(div5Button2)
    div5.appendChild(div5Button3)

    // add to card
    mainCard.appendChild(div1)
    mainCard.appendChild(div2)
    mainCard.appendChild(div3)
    mainCard.appendChild(div4)
    mainCard.appendChild(div5)

    // add to super card
    document.getElementById('mainLeftCards').appendChild(mainCard)

    largeCard()
  }
}

// specific functions
function showAddCardOption () {
  // console.log('movieDetailsEnabled', movieDetailsEnabled)
  document.getElementById('addCardForm').style.display = 'block'
  document.getElementById('editCardForm').style.display = 'none'

  if (fullView) {
    fullToHalf()
  }

  if (movieDetailsEnabled) {
    hideMovieDetails()
  }

  if (form2Enabled) {
    hideForm('editCardForm')
  }

  showForm('addCardForm')
}

function showEditCardOption (index) {
  document.getElementById('mainRight').style.display = 'block'
  document.getElementById('addCardForm').style.display = 'none'
  document.getElementById('editCardForm').style.display = 'block'

  editCardIndex = 0
  editCardIndex = index

  if (fullView) {
    fullToHalf()
  }

  if (movieDetailsEnabled) {
    hideMovieDetails()
  }


  var movies = retrieveMovies()

  document.getElementById('InputTitle1').value = movies[index].title
  document.getElementById('InputDescription1').value = movies[index].description
  // document.getElementById('InputRating1').value = movies[index].rating
  document.getElementById('InputYear1').value = movies[index].year
  document.getElementById('InputTrailer1').value = movies[index].trailer
  // document.getElementById('InputDownload1').value = movies[index].download
  // document.getElementById('InputImage1').value = movies[index].image

  showForm('editCardForm')
}

// on submit of 'Add' buttom
function addCard () {
  document.getElementById('addCardForm').style.display = 'block'
  movies.push(
    {
      title: document.getElementById('InputTitle').value,

      description: document.getElementById('InputDescription').value,

      rating: 'Rating: <a href="javascript:void(0)">' + (function (val) {
          if (/^([0-9](\.\d)?)$|^([1][0])$/.test(val)) {
            return val
          }else {
            alert('You have entered wrong rating')
          }
        }(document.getElementById('InputRating').value)) + '/10' + '</a>',

      year: document.getElementById('InputYear').value,

      trailer: document.getElementById('InputTrailer').value,

      download: 'Downlaod Link: <a href="javascript:void(0)">' + document.getElementById('InputDownload').value + '</a>',

      image: 'images/' + document.getElementById('InputImage').value
    }
  )

  saveMovies(movies)

  // main div
  var mainCard = document.createElement('div')
  mainCard.setAttribute('class', 'mainLeftCardsCard')
  mainCard.setAttribute('id', 'mainLeftCardsCard' + counter)

  // sub div1
  var div1 = document.createElement('div')
  var div1Image = document.createElement('img')
  div1Image.setAttribute('src', movies[counter].image)
  div1.appendChild(div1Image)

  // sub div2
  var div2 = document.createElement('div')
  div2.innerHTML = movies[counter].title

  // sub div3
  var div3 = document.createElement('div')
  div3.innerHTML = movies[counter].rating

  // sub div4
  var div4 = document.createElement('div')
  div4.innerHTML = movies[counter].year

  // sub div5
  var div5 = document.createElement('div')
  var div5Button1 = document.createElement('button')
  div5Button1.setAttribute('onclick', 'showCardDetails(' + counter + ')')
  div5Button1.innerHTML = 'Details'
  var div5Button2 = document.createElement('button')
  div5Button2.setAttribute('onclick', 'showEditCardOption(' + counter + ')')
  div5Button2.innerHTML = 'Edit'
  var div5Button3 = document.createElement('button')
  div5Button3.setAttribute('onclick', 'deleteCard(' + counter + ')')
  div5Button3.innerHTML = 'Delete'
  div5.appendChild(div5Button1)
  div5.appendChild(div5Button2)
  div5.appendChild(div5Button3)

  // add to card
  mainCard.appendChild(div1)
  mainCard.appendChild(div2)
  mainCard.appendChild(div3)
  mainCard.appendChild(div4)
  mainCard.appendChild(div5)

  // add to super card
  document.getElementById('mainLeftCards').appendChild(mainCard)

  // one card added
  counter++

  // make screen full back again
  halfToFull()
  hideForm('addCardForm')

  if (counter !== 0) {
    largeCard()
  }
}

// single card options
// on click details button
function showCardDetails (index) {
  // var movies = retrieveMovies()
  hideAllForms()

  if (movieDetailsEnabled) {
    hideMovieDetails()
  }

  movieDetailsEnabled = true

  document.getElementById('mainRight').style.display = 'block'

  // main div
  var mainCard = document.createElement('div')
  mainCard.setAttribute('class', 'showMovieDetails')
  mainCard.setAttribute('id', 'showMovieDetails')

  // sub div1
  var div1 = document.createElement('div')
  var div1Image = document.createElement('img')
  div1Image.setAttribute('src', movies[index].image)
  div1.appendChild(div1Image)

  // sub div2
  var div2 = document.createElement('div')
  // console.log(movies[index].title)
  div2.innerHTML = movies[index].title

  // sub div3
  var div3 = document.createElement('div')
  div3.innerHTML = movies[index].description

  // sub div4
  var div4 = document.createElement('div')
  div4.innerHTML = movies[index].rating

  // sub div5
  var div5 = document.createElement('div')
  div5.innerHTML = movies[index].year

  // sub div6
  var div6 = document.createElement('div')
  div6.innerHTML = movies[index].trailer

  // sub div7
  var div7 = document.createElement('div')
  div7.innerHTML = movies[index].download

  // add to card
  mainCard.appendChild(div1)
  mainCard.appendChild(div2)
  mainCard.appendChild(div3)
  mainCard.appendChild(div4)
  mainCard.appendChild(div5)
  mainCard.appendChild(div6)
  mainCard.appendChild(div7)

  // add to super card
  document.getElementById('mainRight').appendChild(mainCard)

  if (fullView) {
    fullToHalf()
  }
}

function editCard () {
  movies[editCardIndex] =
    {
      title: document.getElementById('InputTitle1').value,

      description: document.getElementById('InputDescription1').value,

      rating: 'Rating: <a href="javascript:void(0)">' + (function (val) {
          if (/^([0-9](\.\d)?)$|^([1][0])$/.test(val)) {
            return val
          } else {
            alert('You have entered wrong rating')
          }
        }(document.getElementById('InputRating1').value)) + '/10' + '</a>',

      year: document.getElementById('InputYear1').value,

      trailer: document.getElementById('InputTrailer1').value,

      download: 'Downlaod Link: <a href="javascript:void(0)">' + document.getElementById('InputDownload1').value + '</a>',

      image: 'images/' + document.getElementById('InputImage1').value
  }

  saveMovies(movies)

  var editedCard = document.getElementById('mainLeftCardsCard' + editCardIndex).children

  editedCard[0].firstChild.setAttribute('src', movies[editCardIndex].image)
  editedCard[1].innerHTML = movies[editCardIndex].title
  editedCard[2].innerHTML = movies[editCardIndex].rating
  editedCard[3].innerHTML = movies[editCardIndex].year

  halfToFull()

  hideForm('editCardForm')

  if (counter !== 0) {
    largeCard()
  }
}

function deleteCard (index) {
  movies.splice(index, 1)
  localStorage.removeItem('movieArray')
  saveMovies(movies)

  document.getElementById('mainLeftCardsCard' + index).style.display = 'none'
  counter--
}

function deleteAllCards () {
  document.getElementById('mainLeftCards').innerHTML = ''
  movies = []
  counter = 0

  document.getElementById('mainRight').style.display = 'none'
  halfToFull()
  hideMovieDetails()
  hideAllForms()

  localStorage.clear()
}
