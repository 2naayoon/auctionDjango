const cateForm = document.querySelectorAll(".category__menu > ul > li");
const productForm = document.querySelector(".product-page");
console.log(productForm);

cateForm.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("menu : ", e.target);
    const cateValue = Number(e.target.querySelector("input").value);
    console.log("cateValue : ", cateValue);
    console.log("cateValue type : ", typeof cateValue);

    const productForm = () => {
      fetch(`/category/cate/${cateValue}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          let result = "";
          data.forEach((product) => {
            result += ``;
          });
          // 영역에 result 보여주기
          productForm.innerHTML = result;
        });
    };
    productForm();
  });
});
