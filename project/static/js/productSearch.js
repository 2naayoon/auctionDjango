document.querySelector("#productSearchForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.querySelector("#search_type");
  const keyword = document.querySelector("#keyword");

  if (keyword.value == "") {
    // alert
    Swal.fire({
      icon: "warning",
      title: "검색어를 확인해 주세요",
      showConfirmButton: false,
      timer: 1000,
    });
    keyword.focus();
    return;
  }

  e.target.submit();
});
