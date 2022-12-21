import { IData } from "./interfaces"

export const fetchAllCandy = async () => {
  const response = await fetch("https://www.bortakvall.se/api/products");

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return await response.json() as IData;
}