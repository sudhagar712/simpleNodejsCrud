const Product = require("../models/productModel")



exports.createProduct = async(req,res) => {
    try {
        const imagePath = req.files?.map(file => file.path) || []
        const product = new Product({
            ...req.body,
            images:imagePath
        })

        const savedProducts = await product.save()
        res.status(201).json({message: "Product created successfully", product:savedProducts})
        
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

//allproducts
exports.getAllProducts = async(req,res) => {
    try{
        const products = await Product.find()
         if(!products) {
            return res.status(404).json({message:"products not found"})
         }
         res.status(200).json({message: "gets all producted ", count: products.length , products})


    }catch(error){
          res.status(500).json({message:"internal server error"})
    }
}

//singleproducts
exports.getSingleProduct = async(req,res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json({message: "singleproduct success", product})

    }catch(error){
        res.status(404).json({message:"Product not found"})
    }
}

//update products
exports.updateProduct = async (req, res) => {
    try {
      const imagePaths = req.files?.map(file => file.path) || [];
      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          ...(imagePaths.length && { images: imagePaths }),
        },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };





exports.deleteProduct = async(req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);

        res.json({message:"product deleted successfully"})

    }catch(error){
        res.status(500).json({message:"internal server error"})
    }
}