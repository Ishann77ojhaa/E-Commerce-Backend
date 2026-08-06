const Product = require("../../../Model/ProductModel");
const User = require("../../../Model/UserModel");

//Add To Cart
exports.addToCart = async (req, res) => {
  try {
    const userid = req.user.id;
    const { productid } = req.params;
    if (!productid) {
      return res.status(400).json({
        message: "Please Provide ProductId",
      });
    }
    const productexists = await Product.findById(productid);
    if (!productexists) {
      return res.status(200).json({
        message: "Product Doesn't Exists",
      });
    }

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    //check if that productid already exists or not
    const existingCartItem = user.Cart.find((item) =>
      item.product.equals(productid),
    );

    if (existingCartItem) {
      if (existingCartItem.quantity >= productexists.Product_StockQTY) {
        return res.status(400).json({
          message: "Maximum stock reached.",
        });
      }

      existingCartItem.quantity += 1;
    } else {
      user.Cart.push({
        product: productid,
        quantity: 1,
      });
    }

    await user.save();
    const updateUser = await User.findById(userid).populate("Cart.product");
    res.status(200).json({
      message: "Product Added To Cart",
      data: updateUser.Cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Get Cart Items
exports.getMyCart = async (req, res) => {
  const userid = req.user.id;
  const userdata = await User.findById(userid).populate({
    path: "Cart.product",
    select: "-Product_Status",
  });
  res.status(200).json({
    messsage: "Cart Item Fetched SuccessFully",
    data: userdata.Cart,
  });
};

//increase controller
exports.increaseQuantity = async (req, res) => {
  const { productid } = req.params;
  const userid = req.user.id;
  const user = await User.findById(userid);
  const item = user.Cart.find((item) => item.product.toString() === productid);

  if (!item) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  const product = await Product.findById(productid);

  if (item.quantity >= product.Product_StockQTY) {
    return res.status(400).json({
      message: "Maximum stock reached",
    });
  }

  item.quantity++;

  await user.save();

  const updatedUser = await User.findById(userid).populate("Cart.product");

  res.status(200).json({
    data: updatedUser.Cart,
  });
};

//decrease controller
exports.decreaseQuantity = async (req, res) => {
  const { productid } = req.params;
  const userid = req.user.id;

  const user = await User.findById(userid);

  const item = user.Cart.find((item) => item.product.toString() === productid);

  if (!item) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    user.Cart = user.Cart.filter(
      (cartItem) => cartItem.product.toString() !== productid,
    );
  }

  await user.save();

  const updatedUser = await User.findById(userid).populate("Cart.product");

  res.status(200).json({
    data: updatedUser.Cart,
  });
};

//Delete Items From Cart
exports.deleteitemfromcart = async (req, res) => {
  const { productid } = req.params;
  const userid = req.user.id;

  //check if product exists or not
  const product = await Product.findById(productid);
  if (!product) {
    return res.status(400).json({
      message: "No Product With that ProductId",
    });
  }

  //get user cart
  const user = await User.findById(userid);
  user.Cart = user.Cart.filter(
    (item) => item.product.toString() !== productid,
  );
  //    productids.forEach(productIdd=>{
  //    user.Cart = user.Cart.filter(pId=>pId != productidd)   // [1,2,3]==> 2 ==> filter ==>[1,3] ==> user.cart =[1,3]
  //     })
  await user.save();
  const updatedUser = await User.findById(userid).populate({
    path: "Cart.product",
    select: "-Product_Status",
});

  res.status(200).json({
    message: "Items Removed From cart",
    data: updatedUser.Cart,
  });
};
