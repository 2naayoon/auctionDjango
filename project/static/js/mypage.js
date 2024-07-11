// 찜 목록 갯수 가져오기
const wishCnt = document.querySelector(".wishCnt");
fetch(`/mypage/wish/${mid}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("result : ", data);

    wishCnt.innerText = data;
  });

// 댓글 작성 갯수 가져오기
