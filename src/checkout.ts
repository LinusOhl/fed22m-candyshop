import { createOrder } from "./api";
import { ICandy, IOrder } from "./interfaces";
import { IOrderItem } from "./interfaces";
import {renderCartForCheckOut, getTotal} from "./cart";

// form DOM-elements
const orderForm = document.querySelector("#new-order-form")!;
const customerFName = document.querySelector("#fname") as HTMLInputElement;
const customerLName = document.querySelector("#lname") as HTMLInputElement;
const customerAddress = document.querySelector("#address") as HTMLInputElement;
const customerPostcode = document.querySelector("#postcode") as HTMLInputElement;
const customerCity = document.querySelector("#city") as HTMLInputElement;
const customerEmail = document.querySelector("#email") as HTMLInputElement;
const customerPhone = document.querySelector("#phone") as HTMLInputElement;

// sets the input-fields value to the stored info in localstorage
customerFName.value = localStorage.getItem("customerFName")!;
customerLName.value = localStorage.getItem("customerLName")!;
customerAddress.value = localStorage.getItem("customerAddress")!;
customerPostcode.value = localStorage.getItem("customerPostcode")!;
customerCity.value = localStorage.getItem("customerCity")!;
customerEmail.value = localStorage.getItem("customerEmail")!;
customerPhone.value = localStorage.getItem("customerPhone")!;

let orderTotalPrice = 0;
let orderList: IOrderItem[] = [];

// get cartList from localstorage
const cartList: ICandy[] = JSON.parse(localStorage.getItem("cartList")!);

// converts cartList: ICandy[] to orderList: IOrderItem[]
const cartListToOrder = () => {
  for (let i = 0; i < cartList.length; i++) {
    const found = orderList.find(item => item.product_id === cartList[i].id)

    if (!found) {
      const temp: IOrderItem = {
        product_id: cartList[i].id,
        qty: 1,
        item_price: cartList[i].price,
        item_total: cartList[i].price,
      }

      orderList.push(temp);
    } else {
      found.qty++;
      found.item_total = found.qty * found.item_price;
    }
  }

  // calculate the total price of the whole order
  for (let i = 0; i < orderList.length; i++) {
    orderTotalPrice += orderList[i].item_total;
  }

  console.log(orderList, orderTotalPrice);
};

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  cartListToOrder();

  // saves customer info in localstorage
  localStorage.setItem("customerFName", customerFName.value);
  localStorage.setItem("customerLName", customerLName.value);
  localStorage.setItem("customerAddress", customerAddress.value);
  localStorage.setItem("customerPostcode", customerPostcode.value);
  localStorage.setItem("customerCity", customerCity.value);
  localStorage.setItem("customerEmail", customerEmail.value);
  localStorage.setItem("customerPhone", customerPhone.value);

  const newOrder: IOrder = {
    customer_first_name: customerFName.value,
    customer_last_name: customerLName.value,
    customer_address: customerAddress.value,
    customer_postcode: customerPostcode.value,
    customer_city: customerCity.value,
    customer_email: customerEmail.value,
    customer_phone: customerPhone.value,
    order_total: orderTotalPrice,
    order_items: orderList
  };

  const orderDetails = await createOrder(newOrder);
  console.log(orderDetails.status);

  // success / fail HTML-window
  const orderConfirmContainer = document.querySelector("#orderConfirmation-container") as HTMLElement;
  const orderConfirmText = document.querySelector("#orderConfirmation-text") as HTMLParagraphElement;

  if (orderDetails.status === "success") {
    orderConfirmContainer.classList.add("orderSuccess-container");
    orderConfirmText.innerText = `
      Thank you for your order! Your order-number is: ${orderDetails.data.id}.
    `;
  } else {
    orderConfirmContainer.classList.add("orderFail-container");
    orderConfirmText.innerText = `
      Something went wrong with the order, please try again or contact support.
    `;
  }

  // removes the stored cartList from localstorage
  localStorage.removeItem("cartList");

  // scrolls to bottom of the page
  window.scrollTo(0, document.body.scrollHeight);
});

renderCartForCheckOut();