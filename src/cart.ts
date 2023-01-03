    import { ICandy } from "./interfaces"
    
   const cartModal = document.querySelector("#cartModal")
   const base_url = "https://www.bortakvall.se";
   const cartListEl = document.querySelector("#cart-list")!;
   const cartItems: ICandy[] = [];
   
   
  

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

    export const show = () => {
      cartModal?.classList.remove("display-none")
      renderCart()
    }

   export const hide = () => {
      cartModal?.classList.add("display-none")
    }

  const renderCart = () => {
    const candyQuantityMap = new Map();
    cartItems.forEach(candy => {
      if(candyQuantityMap.has(candy.id)){
        let quantity = candyQuantityMap.get(candy.id) ;
        quantity ++
        candyQuantityMap.set(candy.id, quantity);
      } else {
        candyQuantityMap.set(candy.id, 1);
      }
    });
    let set = new Set(cartItems);
    let cartItemsTemp = Array.from(set);
    cartListEl.innerHTML = cartItemsTemp.map(candy => `
    <li class="cart-item">
    <img class="cart-item-img" src="${base_url + candy.images.thumbnail}" alt="${candy.name}">
    <div class="cart-item-info">
      <div>${candy.name}</div>
      <div>${candy.price}kr</div>
      <div id="minus" data-candy-id="${candy.id}" >-</div>
      <div>${candyQuantityMap.get(candy.id)}</div>
      <div id="plus" data-candy-id="${candy.id}" >+</div>
      </div>
    </li>
  `)
  .join("");
  const decreaseBtn = Array.from(document.querySelectorAll("#minus"))
  decreaseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => { 
      const candyId = Number((e.target as HTMLButtonElement).dataset.candyId)
      const extractedCandy  = cartItems.find((candy: ICandy) => {
        return candy.id === candyId
      }) 
      removeCandy(extractedCandy!)
      renderCart()
    console.log("decreaseBtn")
    });
  });
  const increaseBtn = Array.from(document.querySelectorAll("#plus"))
  increaseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => { 
      const candyId = Number((e.target as HTMLButtonElement).dataset.candyId)
      const extractedCandy  = cartItems.find((candy: ICandy) => {
        return candy.id === candyId
      }) 
      addCandy(extractedCandy!)
      renderCart()
    console.log("increaseBtn")
    });
  });
}