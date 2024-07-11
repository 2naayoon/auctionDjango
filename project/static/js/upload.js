const upload_div = document.querySelector(".upload_image"); // upload div
const upload_image = document.querySelector(".upload_product_image"); // file upload button
const imagePreview = document.querySelector(".image_preview ul"); // 이미지 파일 미리보기 ul

// div 클릭 시 파일 등록
// upload_div.addEventListener("click", () => {
//   upload_image.click();
// });

function checkExtension(fileName) {
  // 정규식 사용
  const regex = /(.*?).(png|gif|jpg)$/;

  // txt=>false, 이미지=>true
  console.log(regex.test(fileName));
  return regex.test(fileName);
}

function showUploadImages(arr) {
  console.log("이미지 보여주기 ", arr);

  let tags = "";

  arr.forEach((obj, idx) => {
    tags += `<li data-name="${obj.fileName}" data-path="${obj.folderPath}" data-uuid="${obj.uuid}">`;
    tags += `<div class="img_title">`;
    tags += `<a href=""><img src="/upload/display?fileName=${obj.imageURL}" class="block"></a>`;
    tags += `<div><span class="text-sm d-inline-block mx-1">${obj.fileName}</span>`;
    tags += `<a href="#" class="" data-file="${obj.imageURL}">`;
    tags += `<i class="fa-solid fa-xmark"></i></a></div>`;
    tags += `</div></li>`;
  });
  // imagePreview.insertAdjacentHTML("beforeend", tags);
  document.querySelector(".upload_image_preview div ul").insertAdjacentHTML("beforeend", tags);
}

upload_image.addEventListener("change", (e) => {
  // checkExtension() 호출
  // 이미지 파일이라면 FormData() 객체 생성 후
  // append

  const files = e.target.files;

  const formData = new FormData();

  for (let index = 0; index < files.length; index++) {
    if (checkExtension(files[index].name)) {
      formData.append("folderType", "product"); // 제품 업로드용
      formData.append("uploadFiles", files[index]);
    }
  }

  for (const value of formData.values()) {
    console.log("value : " + value);
  }

  fetch("/upload/uploadAjax", {
    method: "post",
    headers: {
      "X-CSRF-TOKEN": csrfValue,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      showUploadImages(data);
    });
});

// register, modify 둘 다 사용
// uploadResult ul li 태그 요소 가져오기
document.querySelector("#register_form").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;
  console.log(form);

  // 이미지 삽입 확인
  // const image = document.querySelector(".upload_product_image");
  // console.log("image: " + image.value);
  // if (image.value == null) {
  //   // alert
  //   Swal.fire({
  //     icon: "warning",
  //     title: "이미지를 삽입해주세요.",
  //     showConfirmButton: false,
  //     timer: 1000,
  //   });
  //   return;
  // }

  // 제목 입력 확인
  const title = document.querySelector("#title");
  if (title.value == "") {
    // alert
    Swal.fire({
      icon: "warning",
      title: "제목을 입력해주세요.",
      showConfirmButton: false,
      timer: 1000,
    });
    title.focus();
    return;
  }

  const cate = document.querySelector("#category");
  if (cate.value == "") {
    // alert
    Swal.fire({
      icon: "warning",
      title: "카테고리를 선택해주세요.",
      showConfirmButton: false,
      timer: 1000,
    });
    cate.focus();
    return;
  }

  // const content = document.querySelector("#content");
  // if (content.value == "") {
  //   // alert
  //   Swal.fire({
  //     icon: "warning",
  //     title: "제품 설명을 입력해주세요.",
  //     showConfirmButton: false,
  //     timer: 1000,
  //   });
  //   content.focus();
  //   return;
  // }

  const startPrice = document.querySelector("#startPrice");
  if (startPrice.value == "") {
    // alert
    Swal.fire({
      icon: "warning",
      title: "경매 시작 금액을 입력해주세요.",
      showConfirmButton: false,
      timer: 1000,
    });
    startPrice.focus();
    return;
  }

  console.log("price = ", startPrice.value);

  const biddingDate = document.querySelector("#biddingDate");
  console.log(typeof biddingDate.value);
  console.log(biddingDate.value);
  if (biddingDate.value == "") {
    // alert
    Swal.fire({
      icon: "warning",
      title: "경매 기간을 입력해주세요.",
      showConfirmButton: false,
      timer: 1000,
    });
    return;
  }

  //첨부파일 정보 수집
  const attachInfos = imagePreview.querySelectorAll("li");
  console.log(attachInfos);

  //수집된 정보를  폼 태그 자식으로 붙여넣기
  let result = "";
  attachInfos.forEach((obj, idx) => {
    // ProductImageDto 객체 하나로 변경
    result += `<input type='hidden' value='${obj.dataset.path}' name='productImageDtos[${idx}].path'>`;
    result += `<input type='hidden' value='${obj.dataset.uuid}' name='productImageDtos[${idx}].uuid'>`;
    result += `<input type='hidden' value='${obj.dataset.name}' name='productImageDtos[${idx}].imgName'>`;
  });
  form.insertAdjacentHTML("beforeend", result);

  console.log(form.innerHTML);

  form.submit();
});

// 이미지 갯수 확인 후 10개 이상이면 에러 출력
// upload_image.addEventListener("change", (e) => {
//   const uploadFiles = [];
//   const files = e.currentTarget.files;
//   const docFrag = new DocumentFragment();

//   // 이미지 개수가 10개 초과일 시 => Java로 옮길 생각
//   if ([...files].length >= 11) {
//     alert("이미지는 최대 10개까지 업로드가 가능합니다.");
//     return;
//   }

//   // 이미지가 아닌 파일 업로드 시 예외처리
//   [...files].forEach((file) => {
//     if (!file.type.match("image/.*")) {
//       alert("이미지만 업로드 가능합니다.");
//       return;
//     }

//     if ([...files].length < 11) {
//       uploadFiles.push(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const preview = createElement(e, file);
//         imagePreview.appendChild(preview);
//       };
//       reader.readAsDataURL(file);
//     }
//   });
// });
