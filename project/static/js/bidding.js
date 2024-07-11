// 날짜 포맷 변경
const format_Date = (data) => {
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

// bidding 내역 get
const getBiddingList = () => {
  fetch(`/biddings/${pno}/all`)
    .then((response) => response.json())
    .then((data) => {
      console.log("bid : ", data);

      // 입찰 내역이 없을 시 출력
      if (data.length <= 0) {
        biddingList.innerText = "입찰 기록이 없습니다.";

        // 현재 경매가 => 가격 3자리씩 끊어서 comma 넣기
        document.querySelector(".currPrice").innerText = startPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
        // 입찰 기록 없으면 바로 종료
        return;
      }

      let result = "";
      let bidCnt = 0;
      data.forEach((bidding, index) => {
        // 입찰가 format
        bidPrice = `${bidding.biddingPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        result += `<tr>`;

        if (index == 0) {
          if (user == `${bidding.mnickName}`) {
            result += `<th scope="row" style="text-decoration: underline; color: #e53637;">${bidding.mnickName}</th>`;
            result += `<th style="text-decoration: underline; color: #e53637;">` + bidPrice + `원</th>`;
            result += `<th style="text-decoration: underline; color: #e53637;">` + format_Date(`${bidding.biddingTime}`) + `</th>`;
            // result += `<td class="px-4 py-3" style="text-align: center; text-decoration: underline; color: #e53637;">${bidding.mnickName}</td>`;
            // result += `<td class="px-4 py-3" style="text-decoration: underline; color: #e53637;">` + bidPrice + `원</td>`;
            // result += `<td class="px-4 py-3" style="text-decoration: underline; color: #e53637;">` + format_Date(`${bidding.biddingTime}`) + `</td>`;
          } else {
            result += `<td scope="row" style="text-decoration: underline;">${bidding.mnickName}</td>`;
            result += `<td style="text-decoration: underline;">` + bidPrice + `원</td>`;
            result += `<td style="text-decoration: underline;">` + format_Date(`${bidding.biddingTime}`) + `</td>`;
            // result += `<td class="px-4 py-3" style="text-decoration: underline;">${bidding.mnickName}</td>`;
            // result += `<td class="px-4 py-3" style="text-decoration: underline;">` + bidPrice + `원</td>`;
            // result += `<td class="px-4 py-3" style="text-decoration: underline;">` + format_Date(`${bidding.biddingTime}`) + `</td>`;
          }
        } else {
          result += `<td scope="row">${bidding.mnickName}</td>`;
          result += `<td>` + bidPrice + `원</td>`;
          result += `<td>` + format_Date(`${bidding.biddingTime}`) + `</td>`;
          // result += `<td class="px-4 py-3">${bidding.mnickName}</td>`;
          // result += `<td class="px-4 py-3" name="bidPrice" id="bidPrice">` + bidPrice + `원</td>`;
          // result += `<td class="px-4 py-3">` + format_Date(`${bidding.biddingTime}`) + `</td>`;
        }
        result += `</tr>`;
        bidCnt += 1;
      });

      // 현재 경매가 업데이트
      if (data[0].biddingPrice != null) {
        document.querySelector(".currPrice").innerText = data[0].biddingPrice.toLocaleString("ko-KR") + "원";
        document.querySelector(".currPrice").value = data[0].biddingPrice;

        document.querySelector(".biddingCnt").innerText = bidCnt + "회";
      }
      biddingList.innerHTML = result;
      // console.log("biddingCnt : ", biddingCnt);
      document.querySelector(".biddingCnt").innerText = bidCnt + "회";
    });
};

getBiddingList();

// bidding 등록 post
const biddingForm = document.querySelector(".biddingForm");
if (user != "anonymousUser") {
  biddingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("경매 등록");
    console.log("pno mid >> ", pno, mid);

    // biddingPrice, mid, mNickname
    const biddingPrice = biddingForm.querySelector("#biddingPrice");
    // const mid = biddingForm.querySelector("#mid");
    const mNickName = biddingForm.querySelector("#mNickName");
    const currPrice = document.querySelector(".currPrice");

    // 입찰 마감되었을 때 입찰 안되게 해야함
    const bidding_date = document.querySelector(".date_now");
    if (bidding_date.classList.contains("finish_sale")) {
      Swal.fire({
        icon: "warning",
        title: "경매가 마감되었습니다.",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    // 처음 입찰 기록 없을 때 입찰 기록 설정
    if (currPrice.value == undefined) {
      currPrice.value = startPrice;
    }
    if (biddingPrice.value == undefined) {
      biddingPrice.value = startPrice;
    }

    // console.log("currPrice value : ", currPrice.value);
    // console.log("biddingPrice : ", biddingPrice.value);
    // console.log("currPrice type : ", typeof currPrice.value);
    // console.log("biddingPrice type : ", typeof biddingPrice.value);

    if (Number(biddingPrice.value) <= Number(currPrice.value)) {
      Swal.fire({
        icon: "error",
        text: "입찰 금액이 현재 경매가보다 낮습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      const body = {
        pno: pno,
        biddingPrice: biddingPrice.value,
        mid: mid,
        mNickName: mNickName.value,
      };

      if (biddingPrice)
        // 입찰 등록
        fetch(`/biddings/${pno}`, {
          headers: {
            "content-type": "application/json",
            "X-CSRF-TOKEN": csrfValue,
          },
          body: JSON.stringify(body),
          method: "post",
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);

            biddingPrice.value = "";

            getBiddingList();
            if (data) {
              Swal.fire({
                icon: "success",
                title: "입찰 등록이 완료되었습니다.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
    }
  });
}
