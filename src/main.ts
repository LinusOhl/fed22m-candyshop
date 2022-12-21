import './style.css'
import { fetchAllCandy } from "./api"
import { ICandy } from "./interfaces"

const candyListEl = document.querySelector("#candy-list")!;

const temp = await fetchAllCandy();
const data: ICandy[] = temp.data;
console.log(data);

const renderAllCandy = () => {
  const base_url = "https://www.bortakvall.se";

  candyListEl.innerHTML = data.map(candy => `
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