// API
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=egg')
  .then(response => response.json())
  .then(data =>{
    const meals = data.meals
    const thumbNail = meals.map(item => item.strMealThumb)
    const recipeName = meals.map(item => item.strMeal)
    const strInstruction = meals.map(item => item.strInstructions)
    const strYoutube = meals.map(item => item.strYoutube)
    const recipeCategory = meals.map(item => item.strCategory)

    for(let i = 0; i < thumbNail.length; i++){
        changeImage(i, thumbNail[i])
        changeText(i, recipeName[i])
        addText(i, strInstruction[i])
        addLink(i, strYoutube[i])
        modalImage(i, thumbNail[i])
        modalName(i, recipeName[i])
        addCategory(i, recipeCategory[i])
      }
  })

  function changeImage(indexNum, arrayNum) {
    const imageElement = document.getElementsByClassName('item_img')[indexNum]
    if (imageElement){
      imageElement.src = arrayNum
    }
  }
  function modalImage(indexNum, arrayNum) {
    const imageElement = document.getElementsByClassName('modal_img')[indexNum]
    if (imageElement){
      imageElement.src = arrayNum
    }
  }
  function changeText(i, recipe_name){
    const textElement = document.getElementsByClassName('recipe_name')[i]
    if(textElement){
      textElement.textContent = recipe_name
    }
  }
  function modalName(i, modal_name){
    const textElement = document.getElementsByClassName('modal_name')[i]
    if(textElement){
      textElement.textContent = modal_name
    }
  }
  function addText(i, recipe_info){
    const textElement = document.getElementsByClassName('recipe_info')[i]
    if(textElement){
      textElement.textContent = recipe_info
    }
  }
  function addCategory(i, recipe_category){
    const textElement = document.getElementsByClassName('recipe_category')[i]
    if(textElement){
      textElement.textContent = recipe_category
    }
  }
  function addLink(indexNum, arrayNum) {
    const imageElement = document.getElementsByClassName('open_video')[indexNum]
    if (imageElement){
      imageElement.href = arrayNum
    }
  }

// Modal
const getRecipes = document.querySelectorAll('.get_recipe')
const modal = document.querySelector('.modal_container')
const modalClose = document.querySelector('.modal_close .material-symbols-outlined')
const copyImage = document.querySelector('.modal_img')
const copyName = document.querySelector('.modal_name')
const recipeCategory = document.querySelector('.recipe_category')
const recipeInfo = document.querySelector('.recipe_info')
const openVideo = document.querySelector('.open_video')

function popupModal() {
    const itemIndex = parseInt(this.dataset.index)
    modal.classList.remove('hide')
    modal.classList.add('show')
    document.body.style.overflow = 'hidden'
    showResult.style.overflow = 'hidden'

    copyImage.src = document.getElementsByClassName('item_img')[itemIndex].src
    copyName.innerHTML = document.getElementsByClassName('recipe_name')[itemIndex].innerHTML
    recipeCategory.innerHTML = document.getElementsByClassName('recipe_category')[itemIndex].innerHTML
    recipeInfo.innerHTML = document.getElementsByClassName('recipe_info')[itemIndex].innerHTML
    openVideo.innerHTML = document.getElementsByClassName('open_video')[itemIndex].href
}
function closeModal(){
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
    showResult.style.overflow = ''
}
getRecipes.forEach(button => {
    button.addEventListener('click', popupModal)
})
modalClose.addEventListener('click', closeModal)



// 검색
function filter(){
    const value = document.getElementById('value').value.toUpperCase()
    const item = document.getElementsByClassName('item')
  
    for(i = 0; i < item.length; i++){
      recipe_name = item[i].getElementsByClassName('recipe_name')
      if(recipe_name[0].innerHTML.toUpperCase().indexOf(value) > -1){
        item[i].style.display = 'block'
      }else{
        item[i].style.display = 'none'
      }
    }
    console.log(value)
}

// 다크모드
const darkOn = document.querySelector('.dark_on')
const darkOff = document.querySelector('.dark_off')
const navBar = document.querySelector('.nav_bar')
const items = document.querySelectorAll('.item')

function changeDarkMode(){
    darkOn.classList.add('hide')
    darkOff.classList.remove('hide'); darkOff.classList.add('show')
    document.body.classList.add('dark')
    navBar.classList.add('dark')
    for(let item of items){
        item.classList.add('dark')
    }
}
function changeLightMode(){
    darkOn.classList.remove('hide'); darkOn.classList.add('show')
    darkOff.classList.remove('show'); darkOff.classList.add('hide')
    document.body.classList.remove('dark')
    navBar.classList.remove('dark')
    for(let item of items){
        item.classList.remove('dark')
    }
}

darkOn.addEventListener('click', changeDarkMode)
darkOff.addEventListener('click', changeLightMode)

// // 무한 스크롤
const showResult = document.querySelector('.show_result')

function pageHeight(){
    const container = document.querySelector('.top_container')
    const containerHeight = container.clientHeight
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight

    if((scrollTop > containerHeight - windowHeight) < 100){
        showResult.innerHTML += infinite(5)
    }
}

function infinite(num){
	let itemList = ''
	for(let i = 0; i < num; i++){
    itemList += `
    <div class="item"> <img src="" onerror="this.src='https://via.placeholder.com/280x300'" alt="" class="item_img"> <div class="recipe_name"></div> <button class="get_recipe">Get Recipe</button></div>
    <div class="item"> <img src="" onerror="this.src='https://via.placeholder.com/280x300'" alt="" class="item_img"> <div class="recipe_name"></div> <button class="get_recipe">Get Recipe</button></div>
    <div class="item"> <img src="" onerror="this.src='https://via.placeholder.com/280x300'" alt="" class="item_img"> <div class="recipe_name"></div> <button class="get_recipe">Get Recipe</button></div>
    `
  }
  return itemList
}
window.addEventListener('scroll', pageHeight)


// 새로고침 시 스크롤 맨 위로
window.onload = function(){
    setTimeout(function(){
      scrollTo(0, 0)
    }, 100)
  }