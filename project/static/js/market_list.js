const actionForm = document.querySelector("#actionForm");

// 검색어 입력 시 검색어 세팅
document.querySelector(".btn_search").addEventListener("click", () => {
  console.log("버튼 클릭");
  const keyword = document.querySelector("#keyword");

  if (keyword.value == "") {
    Swal.fire({
      icon: "warning",
      text: "검색어를 입력해주세요.",
      showConfirmButton: false,
      timer: 1500,
    });
    keyword.focus();
    return;
  }

  actionForm.querySelector("#form_keyword").value = keyword.value;
  actionForm.submit();
});
