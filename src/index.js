let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  allToy()

  const form = document.querySelector(".add-toy-form")
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let nameOfToy = e.target.elements['name'].value
    let imageOfToy = e.target.elements['image'].value
    let toyObj = {name: nameOfToy, "image": imageOfToy, "likes": 0}
    newToy(toyObj)
    form.reset()
  })

  setTimeout(()=>{
    const btns = document.getElementsByClassName("like-btn")
    Array.from(btns).forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.id
        let likesNum = parseInt(e.target.previousSibling.innerText.replace(' likes', ''))
        likesNum += 1
        updateToy(id, likesNum)
      })
  })},1000)
})

function allToy(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => {
    Array.from(toyData).forEach(toy=>createToy(toy))
  })
}

function createToy(toy){
  const toyCollection = document.querySelector('#toy-collection') 
  const newToy = document.createElement('div')
  newToy.classList.add('card')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  h2.innerText = toy.name
  img.src = toy.image
  img.classList.add('toy-avatar')
  p.innerText = `${toy.likes} likes`
  btn.className="like-btn"
  btn.innerText="Like"
  btn.id=toy.id
  newToy.append(h2,img,p,btn)
  toyCollection.appendChild(newToy)
}

function newToy(toyObj){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toyData => createToy(toyData))
}

function updateToy(id, likes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: likes})
  })
  .then(res => res.json())
  .then(data => {
    const btn = document.getElementById(`${id}`)
    btn.previousSibling.innerText = `${data.likes} likes`
  })
}  

