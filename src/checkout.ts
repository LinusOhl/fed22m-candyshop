import { createOrder } from "./api";
import { IOrder } from "./interfaces";

// form DOM-elements
const orderForm = document.querySelector("#new-order-form")!;

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
});