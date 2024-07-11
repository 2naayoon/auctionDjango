// document.querySelector(".link").addEventListener("click", (e) => {
//   // e.preventDefault();

//   // const btn = document.querySelector(".fa-regular");
//   // console.log(btn);
//   // btn.addEventListener("click", (e) => {
//   //   if (btn.classList.contains("fa-heart")) {
//   //     if (btn.classList.contains("fa-regular")) {
//   //       btn.classList.remove("fa-regular");
//   //       btn.classList.add("fa-solid");
//   //     } else {
//   //       btn.classList.remove("fa-solid");
//   //       btn.classList.add("fa-regular");
//   //     }
//   //   }
//   // });

//   // window.location.href = "https://www.naver.com";
//   // heartbtn = e.target;
//   // console.log(heartbtn);
//   // console.log(heartbtn.querySelector(".fa-heart"));
//   window.location.href = "anime-details";
// });
const heartdiv = document.querySelector(".wish");

heartdiv.addEventListener("click", (e) => {
  // const heartbtn = heartbtn.querySelector(".fa-heart");

  const heartbtn = document.querySelector("i.fa-heart");
  console.log(heartbtn);
  if (heartbtn.classList.contains("fa-regular")) {
    heartbtn.classList.remove("fa-regular");
    heartbtn.classList.add("fa-solid");
  } else if (heartbtn.classList.contains("fa-solid")) {
    heartbtn.classList.remove("fa-solid");
    heartbtn.classList.add("fa-regular");
  }
});
