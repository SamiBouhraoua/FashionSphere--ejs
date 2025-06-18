const Cart = require('../Modèles/Cart');
const Product = require('../Modèles/Product');

exports.add = async (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity, 10);
    try {
        let cart = await Cart.findOne({ UserId: req.session.userId });

        if (!cart) {
            cart = new Cart({ UserId: req.session.userId, Items: [], TotalPrice: 0 });
        }

        const product = await Product.findById(productId);

        const existingItemIndex = cart.Items.findIndex(item => item.ProductId.toString() === productId);
        if (existingItemIndex > -1) {
            cart.Items[existingItemIndex].Quantity += quantity;
        } else {
            cart.Items.push({ ProductId: productId, Quantity: quantity });
        }

        cart.TotalPrice += product.Prix * quantity;

        await cart.save();
        res.redirect('/cart');
    } catch (error) {
        res.status(404).render('Error', { message: error.message });
    }
};

exports.readcart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ UserId: req.session.userId }).populate('Items.ProductId');

        if (!cart || cart.Items.length === 0) {
            return res.render('cart', { cart: null, message: 'Votre panier est vide.' });
        }

        res.render('cart', { cart });
    } catch (error) {
        res.status(404).render('Error', { message: error.message });
    }
};

exports.deleteitem = async (req, res) => {
    try {
        const userId = req.session.userId;
        const itemId = req.params.id;
        const cart = await Cart.findOne({ UserId: userId });//la cart
        const itemToDelete = cart.Items.find(item => item._id.toString() === itemId);//produit a supprimer

        //ajuster le prix
        const product = await Product.findById(itemToDelete.ProductId);
        if (product) {
            cart.TotalPrice -= product.Prix * itemToDelete.Quantity;
        }

        cart.Items = cart.Items.filter(item => item._id.toString() !== itemId);// Supprimer le produit

        await cart.save();
        res.redirect('/cart');
    } catch (error) {
        res.status(404).render('Error', { message: error.message });
    }
};
