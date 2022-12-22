import './style.css'
import { fetchAllCandy } from "./api"
import { ICandy } from "./interfaces"

// get ul-element from DOM
const candyListEl = document.querySelector("#candy-list")!;

// save data of products from api as an array
const temp = await fetchAllCandy();
const products: ICandy[] = temp.data;

// renders all products as cards on the DOM
const renderAllCandy = () => {
  const base_url = "https://www.bortakvall.se";

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
  const base_url = "https://www.bortakvall.se";
  let target = e.target as HTMLImageElement;

  if (target.tagName === "IMG") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === target.alt) {
        (document.querySelector("#lightbox-img") as HTMLImageElement).src = base_url + products[i].images.large;
        (document.querySelector("#lightbox-name") as HTMLParagraphElement).innerText = products[i].name;
        (document.querySelector("#lightbox-desc") as HTMLParagraphElement).innerHTML = products[i].description;
        (document.querySelector("#lightbox-price") as HTMLParagraphElement).innerText = `
          ${products[i].price.toString()}kr`;
        (document.querySelector(".lightbox") as HTMLElement).classList.remove("hide");
      }
    }
  }
});

// clicking outside of lightbox (background) closes the lightbox
document.querySelector(".lightbox")?.addEventListener("click", e => {
  let target = e.target as HTMLElement;

  if (target.className === "lightbox") {
    target.classList.add("hide");
  }
});