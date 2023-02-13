const express = require('express');
const router = express.Router();
const cloudinary = require('../ultils/cloudinary');
const upload = require('../ultils/multer');
const prodModel = require('../prodModel/model');
const cartModel = require('../prodModel/cartModel');



// routes

router.get('/', async(req, res) => {
    // res.status(200).json({ product: "Welcome to all product page" });
      // steps to display all product in react frontend:
            // get all products from mongo
            // send to front end using json
            // use axios in front end to get all product and display
    let allpro = await prodModel.find().then((reply) => {
        res.json(reply);
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/details', (req, res) => {
    // res.status(200).json({body: req.body });
    // console.log(req.body);
    prodModel.findById(req.body.id).then((reply) => {
        res.json(reply);
    }).catch((err) => {
        console.log(err);
    })
    
});

router.post('/likes', async (req, res) => {
    //steps:
    // get the product with this id
    // check if a like exist: if there is no likes, likes=1 and send to db
    // if there is a like, add 1 to previous like and send to db
    console.log('like id = ', req.body.id);

    let ablog = await prodModel.findById(req.body.id);
    // console.log(ablog);
    if (ablog.prodLike == undefined) {
        // console.log('there is no likes = ', 1);
        let toUpd = { 
            prodImg_id: ablog.prodImg_id,
            prodImg_url: ablog.prodImg_url,
            prodName: ablog.prodName,
            prodIntro: ablog.prodIntro,
            prodDetails: ablog.prodDetails,
            prodPrice: ablog.prodPrice,
            prodLike: 1,
         }; // the ... is a spread operator, its work is to prevent an entire override of the object. it only updates the likes and keeps the previous data in the object
        // console.log('the object to update::: ', toUpd);

      let h= await  prodModel.findByIdAndUpdate(ablog._id, toUpd).then((reply) => {
            res.json(reply.prodLike);
        }).catch((err) => {
            console.log(err); 
        })
    } else {
        // console.log('there is a like', Number(ablog.prodLike)+1);
        let newLike = Number(ablog.prodLike) + 1;
        let toUpd = { 
            prodImg_id: ablog.prodImg_id,
            prodImg_url: ablog.prodImg_url,
            prodName: ablog.prodName,
            prodIntro: ablog.prodIntro,
            prodDetails: ablog.prodDetails,
            prodPrice: ablog.prodPrice,
            prodLike: newLike,
            
         }; // the ... is a spread operator, its work is to prevent an entire override of the object. it only updates the likes and keeps the previous data in the object
        
      let h= await  prodModel.findByIdAndUpdate(ablog._id, toUpd).then((reply) => {
            res.json(reply.prodLike);
        }).catch((err) => {
            console.log(err);
        })
        
    }
})

router.post('/addcart', async (req, res) => {
    //steps to add to cart:
      // get old product from db
    // extract contents to meet cartModel requirement
    //create a cart model or send to db using cartModel
    // update the old product

    let oldpro = await prodModel.findById(req.body.id);

    if (oldpro.prodCart == undefined) {
        let toDb = { 
                prodImg_id: oldpro.prodImg_id,
                prodImg_url: oldpro.prodImg_url,
                prodName: oldpro.prodName,
                prodIntro: oldpro.prodIntro,
                prodPrice: oldpro.prodPrice,            
                parent_id: oldpro._id,
        }
        let cart = new cartModel(toDb);
        let carts = await cart.save();
    
        let toUpd = { 
                prodImg_id: oldpro.prodImg_id,
                prodImg_url: oldpro.prodImg_url,
                prodName: oldpro.prodName,
                prodIntro: oldpro.prodIntro,
                prodDetails: oldpro.prodDetails,
                prodPrice: oldpro.prodPrice,
                 prodLike: oldpro.prodLike,
                prodCart: "Added",
            }
            
            prodModel.findByIdAndUpdate(req.body.id, toUpd).then((reply) => {
                res.json(reply);
            }).catch((err) => {
                console.log(err);
            });
            
        }
        
        
    });
    
    router.get('/cart', (req, res) => {
        cartModel.find().then((reply) => {
            res.json(reply);
        }).catch((err) => {
            console.log(err);
        })
    });
    
    router.post('/removecart', async(req, res) => {
        let rem = await cartModel.findByIdAndDelete(req.body.id);
        console.log('parent id ', rem.parent_id);
        if (rem.parent_id !== undefined) {
            let oldpro = await prodModel.findById(rem.parent_id);
            let toUpd = { 
                prodImg_id: oldpro.prodImg_id,
                prodImg_url: oldpro.prodImg_url,
                prodName: oldpro.prodName,
                prodIntro: oldpro.prodIntro,
                prodDetails: oldpro.prodDetails,
                prodPrice: oldpro.prodPrice,
                prodLike: oldpro.prodLike,
        }
        let proUpd = prodModel.findByIdAndUpdate(rem.parent_id, toUpd).then((reply) => {
            console.log(reply);
            res.json(reply);
        }).catch((err) => {
            console.log(err);
        });
        
    }
})



// adding multer as a middle to manage image upload using: upload.single('prodImg')
router.post('/product',upload.single('prodImg'), async(req, res) => {
    // create a product
    // check if body has a file: works if multer is used as a middleware
    if (req.file) {
        // console.log('This post has a file');

        //steps to create a product

         // step 1 : upload img to cloudinary and extract url and id
        let result = await cloudinary.uploader.upload(req.file.path, { folder: "E-commerce-cohort4" });
        let prodImg_url = result.secure_url;
        let prodImg_id = result.public_id;
        // step 2: add url to meet prodModel required
        let toDb = {
            prodImg_id: prodImg_id,
            prodImg_url: prodImg_url,
            prodName: req.body.prodName,
            prodIntro: req.body.prodIntro,
            prodDetails: req.body.prodDetails,
            prodPrice: req.body.prodPrice
         }
        // steop 3: upload to db
        let toMongo = new prodModel(toDb);
        toMongo.save().then((reply) => {
            // console.log('response from mongo',reply);
            //redirecting to home
            res.redirect('http://localhost:3000/');
        }).catch((err) => {
            console.log(err)
        })

        // redirect to home
    }
    else {
        console.log('this post does not have a file');
    }
    // console.log(req.body, req.file);
    // res.status(200).json({ product: "Product created", body: `${req.body}` });
    
});

router.get('*', (req, res) => {
    res.status(404).json({ Error: "Sorry, this product does not Exist!" });
}); 

module.exports = router;