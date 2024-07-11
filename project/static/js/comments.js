// 날짜 포맷 변경
const formatDate = (data) => {
  const date = new Date(data);
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0")
  );
};

const cNickname = document.querySelector("#nickname");

// 댓글 목록 가져오기
const commentLoaded = () => {
  fetch(`/comments/${pno}/all`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data : ", data);

      document.querySelector(".commentCnt").innerHTML = data.length;

      let result = "";
      data.forEach((comment) => {
        result += `<div class="product_review_item comment_row" data-cno="${comment.commentNo}">`;
        // // result += `<img src="/img/anime/review-1.jpg" alt="" />`;
        result += `<div class="product_review_item_text">`;
        result += `<h6>${comment.nickname} - <span>${formatDate(comment.createdDate)}</span></h6>`;
        result += `<p>${comment.text}</p>`;

        // 본인 확인되면 바꿔야함
        // if (cNickname == null) {
        //   cNickname.value = "";
        // }
        // 여기까지
        console.log("user : ", user);

        // cNickname 부분 수정
        if (user == `${comment.nickname}`) {
          result += `<div>`;
          // result += `<button class="recomment btn btn-outline-light btn-sm">답글</button>`;
          result += `<button class="del_btn btn btn-outline-light btn-sm">삭제</button>`;
          result += `</div>`;
        }

        result += `</div></div>`;
      });

      commentList.innerHTML = result;
    });
};

commentLoaded();

// 댓글 등록 이벤트
const commentForm = document.querySelector(".comment-form");
if ((user != "anonymousUser") & (user == user2)) {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = commentForm.querySelector("#text");
    const mid = commentForm.querySelector("#mid");
    const nickname = commentForm.querySelector("#nickname");
    const email = commentForm.querySelector("#email");
    const commentNo = commentForm.querySelector("#commentNo"); // 수정일 경우

    const body = {
      pno: pno,
      text: text.value,
      nickname: nickname.value,
      email: email.value,
      mid: mid.value,
      commentNo: commentNo.value,
    };

    console.log("text : ", text);
    console.log("text value : ", text.value);

    // 댓글 등록
    if (!commentNo.value) {
      if (text.value == "") {
        // alert
        Swal.fire({
          icon: "warning",
          title: "댓글 내용을 입력해주세요.",
          showConfirmButton: false,
          timer: 1000,
        });
        text.focus();
        return;
      }

      fetch(`/comments/${pno}`, {
        headers: {
          "content-type": "application/json",
          "X-CSRF-TOKEN": csrfValue,
        },
        body: JSON.stringify(body),
        method: "post",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("comment >> " + data);

          text.value = ""; // 작성한 댓글 내용 지우기

          if (data) console.log("댓글 등록 완료");
          commentLoaded();
        });
    }
  });
}

// 댓글 삭제
commentList.addEventListener("click", (e) => {
  // 부모요소가 이벤트를 감지하는 형태로 작성 => 실제 이벤트 대상 요소가 무엇인지 찾아야 함
  console.log("이벤트 대상 ", e.target);

  const target = e.target;
  // 리뷰 댓글 번호 가져오기
  const commentNo = target.closest(".comment_row").dataset.cno;
  // 컨트롤러에서 작성자와 로그인 유저가 같은지 다시 한번 비교하기 위해
  const email = commentForm.querySelector("#email");

  if (target.classList.contains("del_btn")) {
    // if (!confirm("댓글을 정말로 삭제하시겠습니까?")) return;
    Swal.fire({
      title: "댓글 삭제",
      text: "댓글을 정말로 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        const form = new FormData();
        form.append("email", email.value);

        fetch(`/comments/${pno}/${commentNo}`, {
          method: "delete",
          headers: {
            "X-CSRF-TOKEN": csrfValue,
          },
          body: form,
        })
          .then((response) => response.text())
          .then((data) => {
            // alert
            Swal.fire({
              icon: "success",
              title: "댓글이 삭제되었습니다.",
              showConfirmButton: false,
              timer: 1000,
            });

            commentLoaded();
          });
      }
    });

    // const form = new FormData();
    // form.append("email", email.value);

    // fetch(`/comments/${pno}/${commentNo}`, {
    //   method: "delete",
    //   headers: {
    //     "X-CSRF-TOKEN": csrfValue,
    //   },
    //   body: form,
    // })
    //   .then((response) => response.text())
    //   .then((data) => {
    //     // alert
    //     Swal.fire({
    //       icon: "success",
    //       title: "댓글이 삭제되었습니다.",
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });

    //     commentLoaded();
    //   });
  }
});
