// 찜목록 활성화 비활성화
const wishBtn = document.querySelector(".follow_btn");
const wishForm = document.querySelector(".wishForm");
const btn = wishBtn.querySelector(".fa-heart");

const showWish = () => {
  console.log("mid: ", mid);
  console.log("pno: ", pno);

  console.log("load classList : ", btn.classList);

  fetch(`/wish/${pno}/${mid}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const wishNo = document.querySelector("#wishNo");
        wishNo.value = data.wno;

        if (data) {
          console.log("true");
          if (btn.classList.contains("fa-regular")) {
            btn.classList.remove("fa-regular");
            btn.classList.add("fa-solid");
          }
        } else {
          console.log("false");
          if (btn.classList.contains("fa-solid")) {
            btn.classList.remove("fa-solid");
            btn.classList.add("fa-regular");
          }
        }
      } else {
        console.log("no data : ", data);
        return;
      }

      console.log("load after classList : ", btn.classList);
    });
};

showWish();

// 찜하기 클릭 시 버튼 변경
// if ((user != "anonymousUser") & (user == user2)) {
if (user != "anonymousUser") {
  wishBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (btn.classList.contains("fa-heart")) {
      console.log("classList : ", btn.classList);
      if (btn.classList.contains("fa-regular")) {
        const body = {
          pno: pno,
          mid: mid,
        };

        fetch(`/wish/add/${pno}`, {
          headers: {
            "content-type": "application/json",
            "X-CSRF-TOKEN": csrfValue,
          },
          body: JSON.stringify(body),
          method: "post",
        })
          .then((response) => response.text())
          .then((data) => {
            btn.classList.remove("fa-regular");
            btn.classList.add("fa-solid");

            console.log("after1 classList : ", btn.classList);
            Swal.fire({
              icon: "success",
              title: "찜 목록에 등록되었습니다",
              showConfirmButton: false,
              timer: 1000,
            });

            const wishNo = document.querySelector("#wishNo");
            wishNo.value = data;
          });
      } else if (btn.classList.contains("fa-solid")) {
        const body = {
          pno: pno,
          mid: mid,
        };

        fetch(`/wish/remove/${pno}`, {
          headers: {
            "content-type": "application/json",
            "X-CSRF-TOKEN": csrfValue,
          },
          body: JSON.stringify(body),
          method: "post",
        })
          .then((response) => response.text())
          .then((data) => {
            btn.classList.remove("fa-solid");
            btn.classList.add("fa-regular");

            console.log("after2 classList : ", btn.classList);
            Swal.fire({
              icon: "success",
              title: "찜 목록에 해제되었습니다",
              showConfirmButton: false,
              timer: 1000,
            });

            const wishNo = document.querySelector("#wishNo");
            wishNo.value = "";
          });
      }
    }

    showWish();
  });
}
