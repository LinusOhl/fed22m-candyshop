    import { ICandy } from "./interfaces"
    

    
   let cartItems: ICandy[] = [];
  

    export const addCandy = (item: ICandy) => {
      cartItems.push(item);
    }

    const removeCandy = (item: ICandy) => {
      const index = cartItems.indexOf(item);
      if (index >= 0) {
        cartItems.splice(index, 1);
      }
    }

    const getTotal = () => {
      let total = 0;
      for (const item of cartItems) {
        total += item.price;
      }
      return total;
    }

    const show = () => {

    }

    const hide = () => {

    }