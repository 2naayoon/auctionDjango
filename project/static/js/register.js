// 이미지 등록 취소
document.querySelector(".upload_image_preview").addEventListener("click", (e) => {
  e.preventDefault();

  const currentLi = e.target.closest("li");

  const filePath = e.target.closest("a").dataset.file;
  console.log("filePath", filePath);

  const formData = new FormData();
  formData.append("filePath", filePath);

  fetch("/upload/remove", {
    method: "post",
    headers: {
      "X-CSRF-TOKEN": csrfValue,
    },
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      if (data) {
        console.log(data);
        currentLi.remove();
      }
    });
});
