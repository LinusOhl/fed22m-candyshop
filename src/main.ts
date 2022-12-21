import './style.css'
import { fetchAllCandy } from "./api"
import { ICandy } from "./interfaces"

const candyListEl = document.querySelector("#candy-list")!;

const temp = await fetchAllCandy();
const data: ICandy[] = temp.data;
console.log(data);

const renderAllCandy = () => {
  candyListEl.innerHTML = data.map(candy => `
    <li>${candy.name}</li>
  `)
  .join("");
};
renderAllCandy();