import { IData } from "./interfaces";
import { IOrder } from "./interfaces";

// fetch candy from api
export const fetchAllCandy = async () => {
  const response = await fetch("https://www.bortakvall.se/api/products");

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return await response.json() as IData;
}

// post candy to api
export const createOrder = async (newOrder: IOrder) => {
  const response = await fetch("https://www.bortakvall.se/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder)
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return (await response.json());
};