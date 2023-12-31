import axios from "axios";
import Noty from "noty";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  // axios to add in cart
  axios.post("/update-cart", pizza).then((res) => {
    console.log(res);
    cartCounter.innerText = res.data.totalQty;
    new Noty({
      type: "success",
      timeout: 1000,
      text: "Item added to cart",
      progressBar: false,
    //   layout:'centerRight'
    }).show();
  }).catch(err => {
    new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
    }).show()

  })
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
