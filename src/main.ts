import './style.css'
import { fetchAllCandy } from "./api"
import { ICandy } from "./interfaces"

const temp = await fetchAllCandy();
const data: ICandy[] = temp.data;
console.log(data);