const toggleButtons = document.querySelectorAll("input[id='toggle-button']");

for (const toggleButton of toggleButtons) {
  toggleButton.addEventListener("change", function () {
    let accessToken = localStorage.getItem("accessToken");
    console.log(this.checked);
    if (this.checked) {
      //Lock user
      // Nếu toggle được bật, thực hiện hành động khi bật.
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to UnLock this employee?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Unlock it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "UnLock !",
            text: "Your employee has been UnLock.",
            icon: "success",
          });
          try {
            const axiosInstance = axios.create({
              baseURL: URL,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            axiosInstance.post("/managers/unlock-account", {
              user_id: toggleButton.className,
            });
            // console.log("fetching unlock");
            // console.log(this.checked);
          } catch (error) {
            alert(error.respons);
            console.log(error);
          }
          this.checked = true;
        } else {
          this.checked = false;
        }
      });

    } else {

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to Lock this employee?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Lock it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Lock !",
            text: "Your employee has been locked.",
            icon: "success",
          });
          try {
            const axiosInstance = axios.create({
              baseURL: URL,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            axiosInstance.post("/managers/lock-account", {
              user_id: toggleButton.className,
            });
          } catch (error) {
            alert(error.respons);
            console.log(error);
          }
          this.checked = false;
        } else {
          this.checked = true;
        }
      });
    }
  });
}
