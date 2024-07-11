// 이미지 x 버튼 클릭시
// 이미지 li만 제거
document.querySelector(".upload_image_preview").addEventListener("click", (e) => {
  e.preventDefault();

  // li 태그 가져오기
  const currentLi = e.target.closest("li");

  // confirm
  Swal.fire({
    title: "이미지 삭제",
    text: "이미지를 삭제하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }).then((result) => {
    if (result.isConfirmed) {
      currentLi.remove();
    } else {
      return;
    }
  });
});
