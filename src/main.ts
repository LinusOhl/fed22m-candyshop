import './style.css'
import { fetchAllCandy } from "./api"
import { ICandy } from "./interfaces"

// get ul-element from DOM
const candyListEl = document.querySelector("#candy-list")!;

// base url to the api
const base_url = "https://www.bortakvall.se";

// save data of products from api as an array
const temp = await fetchAllCandy();
const products: ICandy[] = temp.data;

// renders all products as cards on the DOM
const renderAllCandy = () => {
  candyListEl.innerHTML = products.map(candy => `
    <li class="candy-card">
      <img src="${base_url + candy.images.thumbnail}" alt="${candy.name}">
      <p class="candy-name" id="candy-name">${candy.name}</p>
      <p class="candy-price" id="candy-price">${candy.price}kr</p>
      <button class="btn-addToCart" id="btn-addToCart">Add to cart</button>
    </li>
  `)
  .join("");
};
renderAllCandy();

// clicking on img of candy opens a lightbox with more info of clicked candy
candyListEl.addEventListener("click", e => {
  let target = e.target as HTMLImageElement;

  if (target.tagName === "IMG") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === target.alt) {
        // sets lightbox-img to clicked candy's img-src
        (document.querySelector("#lightbox-img") as HTMLImageElement).src = base_url + products[i].images.large;

        // sets lightbox-name to clicked candy's name
        (document.querySelector("#lightbox-name") as HTMLParagraphElement).innerText = products[i].name;

        // sets lightbox-description (innerHTML) to clicked candy's description
        (document.querySelector("#lightbox-desc") as HTMLParagraphElement).innerHTML = products[i].description;

        // sets lightbox-price to clicked candy's price
        (document.querySelector("#lightbox-price") as HTMLParagraphElement).innerText = `
          ${products[i].price.toString()}kr`;

        // unhides the lightbox element
        (document.querySelector(".lightbox") as HTMLElement).classList.remove("hide");
      }
    }
  }
});

// clicking outside of lightbox (background) closes the lightbox
document.querySelector(".lightbox")?.addEventListener("click", e => {
  let target = e.target as HTMLElement;

  // hides the lightbox, adds css-class "hide"
  if (target.className === "lightbox") {
    target.classList.add("hide");
  }
});