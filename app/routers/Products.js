const express = require("express");
const router = express.Router();
const productsRouter = require("../controllers/ProductsController");
// const salesRouter = require('../controllers/SalesController');

router.get("/products", productsRouter.index);

router.get(
  "/products/:id",
  // (req, res) => {
  //   const productId = req.params.id;
  //   async (req, res, next) => {
  //     try {
  //       // Thực hiện cuộc gọi API bằng Axios ở đây.
  //       const apiResponse = await axios.get(
  //         `${process.env.API}/products/product-detail/${productId}`,
  //         {
  //           headers: {
  //             Authorization: `${accessToken}`,
  //           },
  //         }
  //       );
  //       req.data = apiResponse.data;
  //       //   console.log(typeof(apiResponse.data))
  //       return next();
  //     } catch (error) {
  //       // Xử lý lỗi nếu có.
  //       res.redirect("/");
  //     }
  //   };
  // },
  productsRouter.detail
);
//////send data

module.exports = router;
