function cartController() {
    
    return {
        cart (req,res) {

            res.render('customer/cart')
        },
        update(req,res){

             //=====dummy structure=============// 
            // let cart = {
            //     items:{
            //         pizzaId: {items: pizzaobject, qty:0},
            //         pizzaId: {items: pizzaobject, qty:0},
            //         pizzaId: {items: pizzaobject, qty:0},
            //     },
            //     totalQty:0,
            //     totalprice:0
            // }
            // for the first time creating cart and adding basic structure
            if(!req.session.cart){
                req.session.cart = {
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
            }

            let cart = req.session.cart
            
            //check if item does not exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item:req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice += req.body.price

            }else{
                cart.items[req.body._id].qty  += 1
                cart.totalQty += 1
                cart.totalPrice += req.body.price

            }
            
            return res.send({totalQty: req.session.cart.totalQty})
        }
    }

}

module.exports = cartController