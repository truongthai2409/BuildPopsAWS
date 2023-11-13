let addProducts = document.querySelector(".add-products"); //css animatio
let btnAddProducts = document.getElementById("addProducts"); //show model
let modalContentProduct = document.querySelector(".modal-content-product");
let removeAddProducts = document.getElementById("turnOffAddProduct");

//display add product
btnAddProducts.addEventListener("click", function () {
  addProducts.style.display = "block";
});

//Hidden add product
removeAddProducts.addEventListener("click", () => {
  performAnimationAndHide();
});

async function performAnimationAndHide() {
  // Sử dụng `await` để đợi kết thúc animation
  await new Promise((resolve) => {
    modalContentProduct.style.animation = "hidden-modal 0.6s ease";
    modalContentProduct.addEventListener("animationend", resolve);
  });

  // Sau khi animation hoàn thành, chạy câu lệnh `addProducts.style.display`
  addProducts.style.display = "none";
  modalContentProduct.style.animation = "appear-modal 1s ease";
}

//============================QR-Cash====================

const cash = document.querySelector(".sale-payment-body");
const QR = document.querySelector(".sale-payment img");

let isCheck = false;
function appearCash() {
  if (isCheck == true) {
    cash.style.display = "block";
    QR.style.display = "none";
    isCheck = !isCheck;
  }
}
function appearQR() {
  if (isCheck == false) {
    cash.style.display = "none";
    QR.style.display = "block";
    isCheck = !isCheck;
  }
  //===call API======
}

//==================Print Billl===============
function printBill() {
  let bill = document.getElementById("sale-detail");
  let bill1 = bill.innerHTML;
  var printWindow = window.open("", "PRINT", 'height=1000,width=1000');
  printWindow.document.write(
    "<html><head><title>Print Bill</title></head><body>"
  );
  printWindow.document.write(
    "<style>#contentToPrint{background-color:#d3d3d3;padding:20px}@media print{body{margin:0;text-align:center}#contentToPrint{background-color:#fff;padding:10px}img{display:block;width:150px;height:150px;object-fit:cover;position:relative;transform:translateX(-50%);left:50%}.text-center{display:flex;flex-direction:column}.table-detail table{line-height:1.5;width:100%;text-align:center}}</style>"
  );
  printWindow.document.write(bill1);
  printWindow.document.write("</body></html>");
  printWindow.document.close();

  //   window.print(bill1);
  //   let myDivDisplay = bill.style.display;
  printWindow.print();
  return true;
}
