const menu = require('../../models/menu')

function homeController() {
    
    return {
        async index (req,res) {
            
            const menuData = await menu.find()
            res.render('home', {pizzas: menuData})
        }
    }

}

module.exports = homeController