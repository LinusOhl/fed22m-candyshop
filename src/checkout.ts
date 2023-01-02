import { createOrder } from "./api";
import { IOrder } from "./interfaces";
import { IOrderItem } from "./interfaces";

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

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // template cart list
  const totalPrice = 52;
  const cartList: IOrderItem[] = [
    {
      product_id: 5216,
      qty: 3,
      item_price: 12,
      item_total: 36,
    },
    {
      product_id: 6545,
      qty: 2,
      item_price: 8,
      item_total: 16,
    },
  ];

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
    order_total: totalPrice,
    order_items: cartList
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

  window.scrollTo(0, document.body.scrollHeight);
});