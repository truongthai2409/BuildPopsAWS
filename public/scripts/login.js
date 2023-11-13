const form = document.querySelector(".form");
const URL = "http://localhost:4000";
const API = "http://localhost:3000";
let accessToken = "";
let refreshToken = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Tạo đối tượng dữ liệu
  const data = {
    username: document.querySelector("input[name='username']").value,
    password: document.querySelector("input[name='password']").value,
  };

  // Thực hiện yêu cầu POST đến API
  try {
    const response = await axios.post(
      `${URL}/users/login`,
      data
    );

    // Xử lý phản hồi
    if (response.status === 200) {
      
      // console.log(response.data.tokens)
      const accessToken = response.data.tokens.access_token;
      const refreshToken = response.data.tokens.refresh_token;
      const avatar = response.data.avatar
      
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
       
      const axiosInstance = axios.create({
        baseURL: API,
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
 
      // Thực hiện yêu cầu POST đến server http://localhost:3000
      await axiosInstance.post("/dashboards", {
        // Dữ liệu cần gửi
        accessToken: accessToken, 
        refreshToken: refreshToken,
        avatar: avatar
      });
      // Chuyển đến trang thành công
      window.location.href = "/dashboards";
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }
});






// window.alert = function (message) {
//   const alert = document.createElement("div");
//   const alertButton = document.createElement("button");
//   alertButton.innerText = "OK";
//   alert.classList.add("alert");
//   alert.setAttribute(
//     "style",
//     `
//     background-image: linear-gradient(to right bottom, rgba(253, 214, 205, 0.986), rgb(193, 135, 171));
//     width: 250px;
//     height: 70px;
//     position: absolute;
//     z-index: 5;
//     top: 100px;
//     left: 50%;
//     transform: translateX(-50%);
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 10px 5px #00000044;
//     display: flex;
//     font-size: 15px;
//     justify-content: space-between;
//     flex-direction: column;
//     align-items: center;
//   `
//   );
//   alertButton.setAttribute(
//     "style",
//     `
//     width: 50px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//   `
//   );
//   alert.innerHTML = `<span>${message}</span>`;
//   alert.appendChild(alertButton);
//   alertButton.addEventListener("click", (e) => {
//     alert.remove();
//   });
//   document.body.appendChild(alert);
// };
