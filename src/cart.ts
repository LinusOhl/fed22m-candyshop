    import { ICandy } from "./interfaces"
    
   const cartModal = document.querySelector("#cartModal")
   const base_url = "https://www.bortakvall.se";
   const cartListEl = document.querySelector("#cart-list")!;
  
  let cartItems: ICandy[] = localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")!) : [];
  /* if (localStorage.getItem("cartList")) {
    cartItems = JSON.parse(localStorage.getItem("cartList"))
  } else {
    cartItems = []
  } */

   const checkoutCartlistEl = document.querySelector("#checkout-cartlist")!;
   
   
  

export const addCandy = (item: ICandy) => {
  cartItems.push(item);
  // save cartList to localstorage
  localStorage.setItem("cartList", JSON.stringify(cartItems));
    }

    const removeCandy = (item: ICandy) => {
      const index = cartItems.indexOf(item);
      if (index >= 0) {
        cartItems.splice(index, 1);
      }   
      // save cartList to localstorage
      localStorage.setItem("cartList", JSON.stringify(cartItems));
    }

    let removeAllCandySort= (item: ICandy) => {
      let index = cartItems.indexOf(item);
      while (index !== -1) {
      cartItems.splice(index, 1);
      index = cartItems.indexOf(item);
      }
      localStorage.setItem("cartList", JSON.stringify(cartItems));
    }  
   
    export const getTotal = () => {
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
    if (candyQuantityMap.has(candy.id)) {
      let quantity = candyQuantityMap.get(candy.id);
      quantity++
      candyQuantityMap.set(candy.id, quantity);
    } else {
      candyQuantityMap.set(candy.id, 1);
    }
  });

  const totalCostElement = document.querySelector("#total-cost")
  totalCostElement!.innerHTML = "Total cost : " + getTotal() + " kr"
    
  // remove duplicates in an array of objects
  let uniqueCartItems = cartItems.filter((v,i,a) => a.findIndex(v2 =>(v2.id === v.id)) === i)

    cartListEl.innerHTML = uniqueCartItems.map(candy => `
    <li class="cart-item">
    <i class="fa-regular fa-trash-can trash-icon" id="trash-icon" data-candy-id="${candy.id}"></i>
    <img class="cart-item-img" src="${base_url + candy.images.thumbnail}" alt="${candy.name}">
    <div class="cart-item-info">
      <div>${candy.name}</div>
      <div class="item-price">${candy.price}kr</div>
      <div class= "add-remove-wrapper">
        <div class="remove" id="minus" data-candy-id="${candy.id}" >-</div>
        <div class="add-remove">${candyQuantityMap.get(candy.id)}</div>
        <div class="add" id="plus" data-candy-id="${candy.id}" >+</div>
      </div>
      </div>
      <div id="total-cost-per-item" data-candy-id="${candy.id}">cost</div>
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
    const costPerItem = Array.from(document.querySelectorAll("#total-cost-per-item"))
    costPerItem.forEach((cost) => {
      const candyId = Number((cost as HTMLElement).dataset.candyId)
      const extractedCandy = cartItems.find((candy: ICandy) => {
        return candy.id === candyId
      }) 
      let quantity = candyQuantityMap.get(candyId) ;
      let num = extractedCandy!.price*quantity
      cost.innerHTML=num.toString()+" kr"
    });
    const totalCostElement = document.querySelector("#total-cost")
    totalCostElement!.innerHTML = "Total cost : " + getTotal() + " kr"

    const trashIcon = Array.from(document.querySelectorAll("#trash-icon"))
    trashIcon.forEach((btn) => {
      btn.addEventListener("click", (e) => { 
        const candyId = Number((e.target as HTMLButtonElement).dataset.candyId)
        const extractedCandy  = cartItems.find((candy: ICandy) => {
          return candy.id === candyId
        }) 
        removeAllCandySort(extractedCandy!)
        renderCart()
      });
    });
  });
}
export const renderCartForCheckOut = () => { 
  cartItems = JSON.parse(localStorage.getItem("cartList")!);
  const candyQuantityMap = new Map();
  const candyMap = new Map();
  cartItems.forEach(candy => {
    if(candyQuantityMap.has(candy.id)){
      let quantity = candyQuantityMap.get(candy.id) ;
      quantity ++
      candyQuantityMap.set(candy.id, quantity);
    } else {
      candyQuantityMap.set(candy.id, 1);
    }
    candyMap.set(candy.id, candy);
  });
  let cartItemsTemp = Array.from( candyMap.values () );
  const totalCostElement = document.querySelector("#total-cost-checkout")
  totalCostElement!.innerHTML = "Total cost : " + getTotal() + " kr"
  checkoutCartlistEl.innerHTML = cartItemsTemp.map(candy => `
  <li class="cart-item">
  <i class="fa-regular fa-trash-can trash-icon" id="trash-icon" data-candy-id="${candy.id}"></i>
  <img class="cart-item-img" src="${base_url + candy.images.thumbnail}" alt="${candy.name}">
  <div class="cart-item-info">
    <div>${candy.name}</div>
    <div class="item-price">${candy.price}kr</div>
    <div class= "add-remove-wrapper">
      <div class="remove" id="minus" data-candy-id="${candy.id}" >-</div>
      <div class="add-remove">${candyQuantityMap.get(candy.id)}</div>
      <div class="add" id="plus" data-candy-id="${candy.id}" >+</div>
    </div>
    </div>
    <div id="total-cost-per-item" data-candy-id="${candy.id}">cost</div>
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
    renderCartForCheckOut()
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
    renderCartForCheckOut()
  console.log("increaseBtn")
  });
  const costPerItem = Array.from(document.querySelectorAll("#total-cost-per-item"))
  costPerItem.forEach((cost) => {
    const candyId = Number((cost as HTMLElement).dataset.candyId)
    const extractedCandy = cartItems.find((candy: ICandy) => {
      return candy.id === candyId
    }) 
    let quantity = candyQuantityMap.get(candyId) ;
    let num = extractedCandy!.price*quantity
    cost.innerHTML=num.toString()+" kr"
  });

  const trashIcon = Array.from(document.querySelectorAll("#trash-icon"))
  trashIcon.forEach((btn) => {
    btn.addEventListener("click", (e) => { 
      const candyId = Number((e.target as HTMLButtonElement).dataset.candyId)
      const extractedCandy  = cartItems.find((candy: ICandy) => {
        return candy.id === candyId
      }) 
      removeAllCandySort(extractedCandy!)
      renderCartForCheckOut()
    });
  });
});
}
