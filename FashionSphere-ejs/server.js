const port = 3010;
const express = require('express');
const methodOverride= require("method-override");
const path = require('path');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));
app.use(methodOverride('_method'));
////////////////////////////////////////////////
const Product = require('./Modèles/Product');
const User = require('./Modèles/User');
const Admin = require('./Modèles/Admin');

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const mongoose = require('mongoose');
const connectionMongo = async () => {

    try {
        const connect = await mongoose.connect('mongodb+srv://sami:system@cluster0.o5g6w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`Connection Mongo : ${connect.connection.host}`);
    }

    catch (error) {
       console.log('error: '+error.message)
    }
}
connectionMongo();

const routecart = require("./Routes/Carts");
const routeuser = require("./Routes/Users");
const routeadmin = require("./Routes/Admins");
const routeproduct = require("./Routes/Products");

app.use("/cart",routecart)
app.use("/Users",routeuser)
app.use("/Admins",routeadmin)
app.use("/Products",routeproduct)



//routes
app.get("/Home", async (req, res) => {
    if (req.session.userId) {
        const user = await User.findById(req.session.userId);
        res.render("Home", { user });
    }
});
app.get("/Admin_space", (req, res) => {
    res.render("Admin_space");
});
app.get("/mens", async (req, res) => {
    const products = await Product.find();
    res.render('mens',{products});
});
app.get("/womens", async (req, res) => {
    const products = await Product.find();
    res.render('womens',{products});
});
app.get("/accessories", async (req, res) => {
    const products = await Product.find();
    res.render('accessories',{products});
});
app.get("/detailsProduit/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('detailsProduit',{product});
});


//user
app.get("/add_user", (req, res) => {
    res.render("add_user");
});
app.get("/edit_user/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render("edit_user", { user });
});
app.get("/delete_user/:id", (req, res) => {
    const userId = req.params.id;
    res.render("delete_user", { userId });
});
//admin
app.get("/add_admin", (req, res) => {
    res.render("add_admin");
});
app.get("/edit_admin/:id", async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    res.render("edit_admin", { admin });
});
app.get("/delete_admin/:id", (req, res) => {
    const adminId = req.params.id;
    res.render("delete_admin", { adminId });
});
//produit
app.get("/add_product", (req, res) => {
    res.render("add_product");
});
app.get("/edit_product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("edit_product", { product });
});
app.get("/details_product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("details_product", { product });
});
app.get("/delete_product/:id", (req, res) => {
    const productId = req.params.id;
    res.render("delete_product", { productId });
});

//login
app.get("/login", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.render("login", { errorMessage: '' });
    });
});
app.post("/login", async (req, res) => {
    try {
        const { Username,Password } = req.body;

        const user = await User.findOne({ Username });

        if (!user || user.Password != Password) {
            return res.status(401).render('login', { errorMessage: 'Invalid username or password' });
        }

        req.session.userId = user._id;// Stocke l'identifiant
        res.redirect('/Home');
    } catch (error) {
        res.render('login', { errorMessage: error.message });
    }
});
//register
app.get("/register", (req, res) => {
    res.render("register", { errorMessage: '' });
});
app.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.redirect('/login');
    } catch (error) {
        res.render('register', { errorMessage: error.message });
    }
});
//loginadmin
app.get("/loginadmin", (req, res) => {
    res.render("loginadmin", { errorMessage: '' });
});
app.post("/loginadmin", async (req, res) => {
    try {
        const { Username,Password } = req.body;

        const admin = await Admin.findOne({ Username });

        if (!admin || admin.Password != Password) {
            return res.status(401).render('loginadmin', { errorMessage: 'Invalid username or password' });
        }

        res.redirect('/Admin_space');
    } catch (error) {
        res.render('loginadmin', { errorMessage: error.message });
    }
});


//paiement
app.get("/paiement", (req, res) => {
    res.render("paiement", { Message: '' });
});
app.post("/paiement", async (req, res) => {
    try {
        res.render('paiement', { Message: 'Paiement réussi ! Merci pour votre achat.' });

        res.redirect('/paiement');
    } catch (error) {
        res.render('paiement', { Message: error.message });
    }
});



app.listen(port, ()=>{
    console.log(`Node is running oc http://localhost:${port}`)
})


/*const products = [
    { Categorie: "men", Titre: "Sweate", Description: "Sweat à capuche en jersey doux", Prix: 98, Taille: "M", Stock: 60, Photo: "men1.png" },
    { Categorie: "men", Titre: "Sweat", Description: "Sweat à capuche Steady State", Prix: 128, Taille: "L", Stock: 100, Photo: "men2.png" },
    { Categorie: "men", Titre: "Sweat", Description: "Sweat à capuche en coton à double tricot texturé", Prix: 148, Taille: "X", Stock: 50, Photo: "men3.png" },
    { Categorie: "men", Titre: "Sweat", Description: "Sweat à capuche en jersey", Prix: 88, Taille: "S", Stock: 60, Photo: "men4.png" },
    { Categorie: "men", Titre: "Veste", Description: "Veste Wunder Puff 600 en duvet Iridescent", Prix: 348, Taille: "M", Stock: 20, Photo: "men5.png" },
    { Categorie: "men", Titre: "Veste", Description: "Gilet Wunder Puff 600 en duvet", Prix: 248, Taille: "L", Stock: 100, Photo: "men6.png" },
    { Categorie: "men", Titre: "Veste", Description: "Veste coupe-vent Sojourn", Prix: 148, Taille: "M", Stock: 60, Photo: "men7.png" },
    { Categorie: "men", Titre: "Veste", Description: "Veste compressible Warp Light", Prix: 146, Taille: "L", Stock: 70, Photo: "men8.png" },
    { Categorie: "men", Titre: "Pantalon", Description: "Pantalon slim ABC 32\"L Sergé de coton extensible", Prix: 80, Taille: "L", Stock: 40, Photo: "men9.png" },
    { Categorie: "men", Titre: "Pantalon", Description: "Pantalon coupe classique ABC 32\"L Sergé de coton extensible", Prix: 148, Taille: "M", Stock: 90, Photo: "men10.png" },
    { Categorie: "men", Titre: "Pantalon", Description: "Pantalon coupe classique en velours côtelé Régulier", Prix: 166, Taille: "L", Stock: 80, Photo: "men11.png" },
    { Categorie: "men", Titre: "Pantalon", Description: "Jogger ABC Régulier", Prix: 138, Taille: "M", Stock: 30, Photo: "men12.png" },
    { Categorie: "women", Titre: "Robe", Description: "Robe Align™ de Lululemon", Prix: 148, Taille: "M", Stock: 80, Photo: "women1.png" },
    { Categorie: "women", Titre: "Robe", Description: "Robe débardeur côtelée coupe slim en tissu Softstretch", Prix: 128, Taille: "L", Stock: 40, Photo: "women2.png" },
    { Categorie: "women", Titre: "Robe", Description: "Robe mi-longue côtelée entièrement alignée", Prix: 128, Taille: "X", Stock: 50, Photo: "women3.png" },
    { Categorie: "women", Titre: "Robe", Description: "Robe longue à bretelles spaghetti ultra-douce en Nulu™", Prix: 98, Taille: "S", Stock: 60, Photo: "women4.png" },
    { Categorie: "women", Titre: "Veste", Description: "Veste en duvet StretchSeal™ Sleek Street 600", Prix: 448, Taille: "M", Stock: 60, Photo: "women5.png" },
    { Categorie: "women", Titre: "Veste", Description: "Veste Varsity surdimensionnée Scuba Peluche", Prix: 168, Taille: "L", Stock: 100, Photo: "women6.png" },
    { Categorie: "women", Titre: "Veste", Description: "Veste Another Mile", Prix: 248, Taille: "M", Stock: 60, Photo: "women7.png" },
    { Categorie: "women", Titre: "Veste", Description: "Veste à capuche Define Nul", Prix: 146, Taille: "L", Stock: 70, Photo: "women8.png" },
    { Categorie: "women", Titre: "T-shirt", Description: "T-shirt à manches longues Hold Tight", Prix: 68, Taille: "L", Stock: 80, Photo: "women9.png" },
    { Categorie: "women", Titre: "T-shirt", Description: "T-shirt à manches longues Hold", Prix: 78, Taille: "M", Stock: 90, Photo: "women10.png" },
    { Categorie: "women", Titre: "T-shirt", Description: "Chemise à manches longues Rulur", Prix: 88, Taille: "L", Stock: 100, Photo: "women11.png" },
    { Categorie: "women", Titre: "T-shirt", Description: "Pull court demi-zippé Rulu", Prix: 98, Taille: "M", Stock: 30, Photo: "women12.png" },
    { Categorie: "Accessoires", Titre: "Sac", Description: "Sac bandoulière pour appareil photo avec poignée s...", Prix: 98, Taille: "S", Stock: 90, Photo: "acc1.png" },
    { Categorie: "Accessoires", Titre: "Sac", Description: "Sac bandoulière avec pochette nano", Prix: 128, Taille: "L", Stock: 20, Photo: "acc2.png" },
    { Categorie: "Accessoires", Titre: "Sac", Description: "Sac à dos seau avec cordon de serrage", Prix: 245, Taille: "S", Stock: 50, Photo: "acc3.png" },
    { Categorie: "Accessoires", Titre: "Sac", Description: "Sac fourre-tout matelassé à grille Polaire en peluche", Prix: 98, Taille: "XL", Stock: 60, Photo: "acc4.png" },
    { Categorie: "Accessoires", Titre: "Bonnet", Description: "Bonnet à pompon en tricot torsadé pour femme", Prix: 98, Taille: "M", Stock: 60, Photo: "acc5.png" },
    { Categorie: "Accessoires", Titre: "Bonnet", Description: "Disney et Lululemon Bonnet Révélation Chaud", Prix: 58, Taille: "XL", Stock: 50, Photo: "acc6.png" },
    { Categorie: "Accessoires", Titre: "Casquette", Description: "Disney et Lululemon Casquette de baseball classique", Prix: 248, Taille: "L", Stock: 60, Photo: "acc7.png" },
    { Categorie: "Accessoires", Titre: "Casquette", Description: "Casquette de baseball classique unisexe Mot-symbole", Prix: 48, Taille: "L", Stock: 70, Photo: "acc8.png" },
    { Categorie: "Accessoires", Titre: "Sac à dos", Description: "Sac à dos pour nouveau parent", Prix: 148, Taille: "L", Stock: 70, Photo: "acc9.png" },
    { Categorie: "Accessoires", Titre: "Sac à dos", Description: "Nouveau sac à dos Crew Logo", Prix: 124, Taille: "M", Stock: 90, Photo: "acc10.png" },
    { Categorie: "Accessoires", Titre: "Sac à dos", Description: "Sac à dos triple zip", Prix: 138, Taille: "L", Stock: 20, Photo: "acc11.png" },
    { Categorie: "Accessoires", Titre: "Sac à dos", Description: "Sac à dos à double fermeture éclair", Prix: 98, Taille: "X", Stock: 30, Photo: "acc12.png" },
];
Product.insertMany(products)
  .then(() => {
    console.log("Produits ajoutés avec succès !");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Erreur lors de l'ajout des produits :", error);
  });*/