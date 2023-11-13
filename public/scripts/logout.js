let logout = document.querySelector("#logout");
const URL = "http://localhost:4000";

logout.addEventListener("click", async (e) => {
  // e.preventDefault();
  let refreshToken = localStorage.getItem("refreshToken");
  let accessToken = localStorage.getItem("accessToken");

  try {
    const axiosInstance = await axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    axiosInstance
      .post("/users/logout", {
        // Dữ liệu cần gửi
        refresh_token: refreshToken,
      })
      .then(function (response) {
        console.log(response.data.message);
      });
    window.location.href = "/logout";
  } catch (e) {
    console.log(e);
  }
});
