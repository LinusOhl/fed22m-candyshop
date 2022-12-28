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

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

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

  const newOrder: IOrder = {
    customer_first_name: customerFName.value,
    customer_last_name: customerLName.value,
    customer_address: customerAddress.value,
    customer_postcode: customerPostcode.value,
    customer_city: customerCity.value,
    customer_email: customerEmail.value,
    order_total: totalPrice,
    order_items: cartList
  };

  console.log(newOrder);

  await createOrder(newOrder);
});