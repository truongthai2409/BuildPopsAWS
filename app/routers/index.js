const newRouter = require("./Site.js");
const newLogin = require("./Login.js");
const newRegister = require("./Register.js");
const newForgot = require("./Forgot.js");
const newDashboards = require("./Dashboards.js");
const newProducts = require("./Products.js");
const newContacts = require("./Contacts.js");
const newSales = require("./Sales.js");
const newProfile = require("./Profile.js");
const newSetting = require("./Setting.js");
const newCustomers = require("./Customers.js");
const newPayment = require("./Payment.js");
const newResetpass = require("./Resetpass.js");

const axios = require("axios");

const middleware = require("../middlewares/getProduct.js");

function route(app) {
  let accessToken = "";
  let avatar = [];

  // app.use()
  app.post("/dashboards", function (req, res, next) {
    accessToken = req.headers.authorization;
    avatar = {
      persion: req.body.avatar,
    };
    next();
  });

  app.get(
    "/dashboards",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    newDashboards
  );

  app.use("/logout", function (req, res, next) {
    accessToken = null;
    res.redirect("/");
  });

  app.get(
    "/profile",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    async (req, res, next) => {
      try {
        const axiosInstance = await axios.create({
          baseURL: "http://localhost:4000",
          headers: {
            Authorization: accessToken,
          },
        });
        axiosInstance.post("/users/my-profile").then(function (response) {
          // console.log(response.data)
          req.data = response.data;
          return next();
        });
      } catch (error) {
        console.log(error);
      }
    },
    newProfile
  );

  app.get(
    "/sales",
    async (req, res, next) => {
      try {
        const apiResponse = await axios.get(
          "http://localhost:4000/products/product-list",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        // console.log(apiResponse);
        const data = [...apiResponse.data];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        // Xử lý lỗi nếu có.
        res.redirect("/");
      }
    },
    newSales
  );

  app.get(
    "/contacts",
    async (req, res, next) => {
      try {
        const apiResponse = await axios.get(
          "http://localhost:4000/managers/staff-list",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        // req.data = ;
        const data = [...apiResponse.data.staffList];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        const data = error.response.data;

        if (error.response.status == 403) {
          req.data = data;
          res.render("../public/views/pages/error", { data });
        } else {
          res.redirect("/dashboards");
        }
      }
    },
    newContacts
  );
  app.get(
    "/contacts/create-staffs",
    // function (req, res, next) {
    //   req.data = avatar.persion;
    //   !accessToken ? res.redirect("/") : next();
    // },
    newContacts
  );

  app.get(
    "/contacts/staffs/:id",
    function (req, res, next) {
      req.data = avatar.persion;
      !accessToken ? res.redirect("/") : next();
    },
    async (req, res, next) => {
      const staffsId = req.params.id;
      staffsId.toString();

      try {
        // Thực hiện cuộc gọi API bằng Axios ở đây.
        const apiResponse = await axios.get(
          `http://localhost:4000/managers/staff-info/${staffsId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        let data = apiResponse.data;
        let dataUser = data.user;

        // let dataNew = [...dataUser];
        let newObject = Object.assign(dataUser, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        console.log(error);
      }
    },
    newContacts
  );
  
  app.get(
    "/products",
    async (req, res, next) => {
      try {
        // Thực hiện cuộc gọi API bằng Axios ở đây.
        const apiResponse = await axios.get(
          "http://localhost:4000/products/product-list",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        const data = [...apiResponse.data];
        const newObject = Object.assign(data, avatar);
        req.data = newObject;
        return next();
      } catch (error) {
        // Xử lý lỗi nếu có.
        res.redirect("/");
      }
    },
    newProducts
  );

  app.get("/products/:id", newProducts);

  app.get("/customers", newCustomers);

  app.get("/forgot", newForgot);

  app.get("/setting", newSetting);

  app.get("/register", newRegister);

  app.get("/payments/success", newPayment);

  app.get("/payments/error", newPayment);

  app.get("/resetpass", newResetpass);

  app.get(
    "/email-verifications/:verify_email",
    async (req, res, next) => {
      const verifyEmail = req.params.verify_email;
      console.log(verifyEmail);
      return next();
      // staffsId.toString()

      // try {
      //   // Thực hiện cuộc gọi API bằng Axios ở đây.
      //   const data = { verify_token: verifyEmail };
      //   await axios.post(
      //     `http://localhost:4000/staffs/check-verify-token/${verifyEmail}`,
      //     data
      //   );
      //   // let data = apiResponse.data
      //   // let dataUser = data.user

      //   // let dataNew = [...dataUser];
      //   // let newObject = Object.assign(dataUser, avatar);
      //   // req.data = newObject;
      //   return next();
      // } catch (error) {
      //   console.log(error);
      // }
    },
    // verifyEmail
    newResetpass
  );

  // app.get("/login", newLogin);

  app.use("/", newRouter);
}

module.exports = route;
