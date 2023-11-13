const cartWarp = document.querySelector(".cart-warp");
const addProductButtons = document.querySelectorAll("#add_product");


let customer_id = "";
let quantity = 1;
let product_list = [];
let product_list_bill = [];

for (const button of addProductButtons) {
  button.addEventListener("click", () => {
    let productId = button.querySelector("#product_id").textContent;
    let productPrice = button.querySelector("#retail_price").textContent;
    let productName = button.querySelector("#product_name").textContent;

    const index = product_list.findIndex((p) => p.product_id === productId);
    const index_bill = product_list_bill.findIndex(
      (p) => p.product_id === productId
    );
    if (index == -1) {
      // Nếu sản phẩm chưa tồn tại, thêm nó vào mảng
      product_list.push({
        product_name: productName,
        product_id: productId,
        quantity: quantity,
        retail_price: productPrice,
      });
      product_list_bill.push({
        product_name: productName,
        product_id: productId,
        quantity: quantity,
        retail_price: productPrice,
      });

      let n = product_list.length;
      let m = product_list_bill.length;

      // Tạo thẻ chứa giá trị product_name
      const productNameElement = document.createElement("h4");
      productNameElement.textContent = productName;

      // Tạo thẻ chứa giá trị retail_price
      const productPriceElement = document.createElement("span");
      productPriceElement.textContent = productPrice;

      //Create tag i
      const productTrashElement = document.createElement("i");
      const iconCaretDown = document.createElement("i");
      const iconCaretUp = document.createElement("i");

      //Create span quality
      const qualityIconElement = document.createElement("span");

      qualityIconElement.setAttribute("id", `${productId}`);
      qualityIconElement.innerText = quantity;

      const newCartItem = document.createElement("div");
      const newSetPrice = document.createElement("div");
      const newSetName = document.createElement("div");
      const newSetitem = document.createElement("div");
      const newLine = document.createElement("div");

      newLine.classList.add("line");
      cartWarp.append(newCartItem, newLine);

      newCartItem.classList.add("cart-item");
      newCartItem.append(newSetName, newSetitem, newSetPrice);

      newSetName.classList.add("set-name");
      newSetName.append(productNameElement);

      newSetitem.classList.add("set-item");
      newSetitem.append(iconCaretDown, qualityIconElement, iconCaretUp);

      iconCaretDown.classList.add("fa-solid", "fa-square-caret-down");
      iconCaretDown.addEventListener("click", () => {
        // console.log("down new");
        const new_product_index = product_list.findIndex(
          (p) => p.product_id === productId
        );
        const p_id = product_list[new_product_index].product_id;
        const p_id_bill =
          product_list_bill[new_product_index].product_id + "_bill";

        const span_quantity = document.getElementById(p_id);
        const td_quantity = document.getElementById(p_id_bill);

        let count = product_list[new_product_index].quantity - 1;
        let countBill = product_list_bill[new_product_index].quantity - 1;

        if (count <= 0) {
          cartWarp.removeChild(newCartItem);
          tbody.removeChild(newCartItemTr);
          product_list.splice(new_product_index, 1);
          product_list_bill.splice(new_product_index, 1);
        }

        product_list[new_product_index] = {
          ...product_list[new_product_index],
          quantity: count,
        };
        product_list_bill[new_product_index] = {
          ...product_list_bill[new_product_index],
          quantity: countBill,
        };

        span_quantity.innerHTML = product_list[new_product_index].quantity;
        td_quantity.innerHTML = product_list_bill[new_product_index].quantity;
      });

      iconCaretUp.classList.add("fa-solid", "fa-square-caret-up");
      iconCaretUp.addEventListener("click", () => {
        const new_product_index = product_list.findIndex(
          (p) => p.product_id === productId
        );
        const p_id = product_list[new_product_index].product_id;
        const p_id_bill =
          product_list_bill[new_product_index].product_id + "_bill";

        const span_quantity = document.getElementById(p_id);
        const td_quantity = document.getElementById(p_id_bill);

        let count = product_list[new_product_index].quantity + 1;
        let countBill = product_list_bill[new_product_index].quantity + 1;

        product_list[new_product_index] = {
          ...product_list[new_product_index],
          quantity: count,
        };
        product_list_bill[new_product_index] = {
          ...product_list_bill[new_product_index],
          quantity: countBill,
        };

        span_quantity.innerHTML = product_list[new_product_index].quantity;
        td_quantity.innerHTML = product_list_bill[new_product_index].quantity;
      });

      //==========Bang trong model thanh toan==========

      //Query table
      const tbody = document.querySelector("tbody");

      //tao hang
      const newCartItemTr = document.createElement("tr");
      tbody.append(newCartItemTr);

      //tao cot ten
      const productNameTd = document.createElement("td");
      newCartItemTr.append(productNameTd);
      productNameTd.textContent = productName;

      //tao cot Quantity
      const productQuantity = document.createElement("td");

      newCartItemTr.append(productQuantity);
      // productQuantity.textContent = "1";
      productQuantity.setAttribute("id", `${productId}_bill`);
      productQuantity.innerText = quantity;

      //tao cot Price
      const productPriceTd = document.createElement("td");
      newCartItemTr.append(productPriceTd);
      productPriceTd.textContent = productPrice;

      //tao cot Total
      const productTotal = document.createElement("td");
      productTotal.setAttribute("id", `Total_${productId}_bill`);
      newCartItemTr.append(productTotal);
      productTotal.innerText = productPrice;

      //========================= Sot rac=========================
      newSetPrice.classList.add("set-price");
      newSetPrice.append(productPriceElement, productTrashElement);
      productTrashElement.classList.add(
        "fa-regular",
        "fa-trash-can",
        "icon-trash"
      );

      // sot rac new
      productTrashElement.addEventListener("click", () => {
        const new_product_index = product_list.findIndex(
          (p) => p.product_id === productId
        );
        console.log("sot rac new");

        cartWarp.removeChild(newCartItem);
        tbody.removeChild(newCartItemTr);

        product_list.splice(new_product_index, 1);
        product_list_bill.splice(new_product_index, 1);
      });
    } else {
      let productQuality = document.getElementById(
        `${product_list[index].product_id}`
      );
      let count = product_list[index].quantity + 1;

      product_list[index] = { ...product_list[index], quantity: count };
      productQuality.innerHTML = count;

      //========== Thay doi gia tri quantity trong model===========
      let productQualityBill = document.getElementById(
        `${product_list_bill[index_bill].product_id}_bill`
      );

      let countBill = product_list_bill[index_bill].quantity + 1;
      product_list_bill[index_bill] = {
        ...product_list_bill[index_bill],
        quantity: countBill,
      };
      productQualityBill.innerText = countBill;

      let productTotalBill = document.getElementById(
        `Total_${product_list_bill[index_bill].product_id}_bill`
      );

      let retailPrice =
        parseInt(product_list_bill[index_bill].retail_price) *
        parseInt(countBill);
      // product_list_bill[index_bill] = { ...product_list_bill[index_bill], quantity: countBill };
      productTotalBill.innerText = retailPrice;
      console.log(calculateTotalRetailPrice(product_list));
    }
    const total_money = product_list.reduce((sum, p) => sum + parseInt(p.quantity) * parseInt(p.retail_price), 0)
    console.log(total_money)
    document.getElementById('cart-payment-total').innerHTML = total_money; 
  });

  
}


function calculateTotalRetailPrice(products) {
  let totalRetailPrice = 0;
  for (const product of products) {
    totalRetailPrice +=
      parseInt(product.retail_price) * parseInt(product.quantity);
  }
  return totalRetailPrice;
}


//===========Voucher=============

const voucher = document.getElementById('voucher');

voucher.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const voucherValue = document.getElementById('voucher_value').value;
  const voucherSpan = document.getElementById('span_voucher');
  console.log(voucherValue);
  try {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:4000",
      // 
    });
    const response = await axiosInstance
      .post("/payments/get-discount-by-voucher", {
        // Dữ liệu cần gửi
        code: voucherValue,
      })
      Swal.fire({
        icon: "success",
        title: "success",
        text: `Voucher ${response.data.message} $`,
      });
      voucherSpan.innerHTML = response.data.message + ' $';
      
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }
})

//=====================search  Customer===========

// const customer = document.querySelector('.form-FindCustomer');
// customer.addEventListener('submit', searchCustomer)
async function searchCustomer(event) {
  const customer = document.getElementById('form-FindCustomer').value;
  if (event.key === "Enter") {

    console.log(customer)
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:4000",
        // 
      });
      const response = await axiosInstance
        .post("/search/customer-searching", {
          // Dữ liệu cần gửi
          text: customer,
        })
        console.log(response)
        // Swal.fire({
        //   icon: "success",
        //   title: "success",
        //   text: `Voucher ${response.data.message} $`,
        // });
        // voucherSpan.innerHTML = response.data.message + ' $';
        
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  }
  
}