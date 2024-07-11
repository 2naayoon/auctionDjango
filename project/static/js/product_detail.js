// 탭별 활성화 표시 및 해당 내용 출력
const items_nav = document.querySelectorAll(".items_nav li");
const items = document.querySelectorAll(".item_nav_sub");

const details = document.querySelectorAll(".item_detail");
const content = document.querySelectorAll(".item_detail_content");
const bidding = document.querySelector(".item-bidding-record");
const review = document.querySelector(".item_review");
const commentRegister = document.querySelector(".item_review_register");

items_nav.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    e.preventDefault();

    //탭 활성화
    items_nav.forEach((e) => {
      e.classList.remove("active");
    });
    nav.classList.add("active");

    // 해당 내용 출력
    items.forEach((item) => {
      item.style.display = "none";
      if (nav.classList.contains("detail")) {
        details.forEach((detail) => {
          detail.style.display = "block";
        });
      } else if (nav.classList.contains("bidding")) {
        bidding.style.display = "block";
      } else if (nav.classList.contains("review")) {
        review.style.display = "block";
        commentRegister.style.display = "block";
      }
    });
  });
});

// 이미지 누르는대로 메인 이미지 변경
// 원본 이미지 div
const imgMain = document.querySelector(".product_detail_img");

// 서브 이미지 div
const imgSub = document.querySelectorAll(".product_details_pic_sub");

imgSub.forEach((img) => {
  img.addEventListener("click", (e) => {
    const imgImg = e.currentTarget;
    console.log("imgImg", imgImg);

    const file = imgImg.getAttribute("data-file");
    console.log("file", file);

    // 이미지 경로 변경
    imgMain.innerHTML = `<img class="product_details_pic set-bg" src="/upload/display?fileName=${file}">`;
  });
});

// 현재 시간 표시
function getTime() {
  /* sale_date도 date로 입력해서 날짜만 비교 */
  // 현재 시간과 제품 등록 시간 가져오기
  new_tody = new Date();
  bid_end_date = new Date(sale_date);

  // (제품 등록시간 + 응찰 기간) 후 각 시간을 ms 단위로 가져오기
  nt = new_tody.getTime();
  bed = bid_end_date.getTime() + parseInt(biddingDate) * 1000 * 60 * 60 * 24;

  // 경매 종료 일자 표시
  let endBidding = new Date(sale_date);
  endBidding.setDate(endBidding.getDate() + parseInt(biddingDate));

  end_year = endBidding.getFullYear();
  end_month = endBidding.getMonth() + 1;
  end_day = endBidding.getDate();
  end_hour = endBidding.getHours();
  end_min = endBidding.getMinutes();
  end_date = end_year + "년 " + end_month + "월 " + end_day + "일 " + end_hour + "시 " + end_min + "분 ";
  document.querySelector(".end_date").innerText = end_date;

  // 응찰 기간이 현재 시간보다 클 경우 일, 시, 분, 초 저장
  if (nt < bed) {
    sec = parseInt(bed - nt) / 1000;
    days = parseInt(sec / 60 / 60 / 24);
    sec = sec - days * 60 * 60 * 24;
    hour = parseInt(sec / 60 / 60);
    sec = sec - hour * 60 * 60;
    min = parseInt(sec / 60);
    sec = parseInt(sec - min * 60);

    // if (hour < 10) {
    //   hour = "0" + hour;
    // }
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    date = days + "일 " + hour + "시간 " + min + "분 " + sec + "초";
  } else {
    date = "마감 되었습니다.";
    document.querySelector(".date_now").classList.add("finish_sale");
  }
  /* 남은 시간 코드 끝 */

  document.querySelector(".date_now").innerText = date;

  setTimeout(getTime, 1000);
}

getTime();

// 삭제 버튼
const deleteForm = document.querySelector("#deleteForm");
if ((user != "anonymousUser") & (user == user2)) {
  document.querySelector(".btn-danger").addEventListener("click", () => {
    // !confirm("정말 삭제하시겠습니까?")
    Swal.fire({
      title: "게시글 삭제",
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteForm.submit();
      } else {
        return;
      }
    });
  });
}
