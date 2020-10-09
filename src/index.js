let addToy = false;

let URL = 'http://localhost:3000/toys';

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
  getToys();
  form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    toy = {}
    toy.name = event.target[0].value
    toy.image = event.target[1].value
    toy.likes = 0
    fetch(URL, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(toy)})
    .then(resp => resp.json())
    .then(addToy(toy))
  })
});

const getToys = () => {
  fetch(URL)
  .then(resp => resp.json())
  .then(data => data.forEach(toy => {
    addCard(toy);
  }))
}

const addCard = (toy) => {
  let container = document.querySelector("#toy-collection")
  let card = document.createElement("div")
  card.className = "card"
  let name = document.createElement("h2")
  name.innerText = toy.name
  let image = document.createElement("img")
  image.src = toy.image 
  let totalLikes = document.createElement("p")
  totalLikes.innerText = toy.likes
  let likeButton = document.createElement("button")
  likeButton.innerText = "Like"
  card.append(name, image, totalLikes, likeButton)
  likeButton.addEventListener('click', () => {
    fetch(URL + "/" + toy.id, {method: 'PATCH', headers: { 'Content-Type': 'application/json' },body: JSON.stringify({likes: toy.likes + 1})})
    .then(resp => resp.json())
    .then(updatedToy => () => {
      toy.totalLikes.innerText = updatedToy.likes
    })
  })
  container.appendChild(card)
}

