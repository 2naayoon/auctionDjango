// 날짜 포맷 변경
const format_Date = (data) => {
  const date = new Date(data);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":00"
  );
};

const format_Date2 = (data, num) => {
  const date = new Date(data);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":00"
  );
};

// 경매 마감일 보여주기
// function showEndBidDate() {
//   let today = new Date();
//   const startDates = document.querySelectorAll("#startDate");
//   const bidDates = document.querySelectorAll("#bidDate");
//   const bid_end_date = document.querySelectorAll(".bid_end_date");

//   console.log(bidDates);
//   bidDates.forEach((dates) => {
//     const bidDate = dates.value;
//     console.log("bidDates: ", bidDate);
//   });

//   startDates.forEach((dates, index) => {
//     bid_date = format_Date(dates.value, bidDates[index]);
//     today = format_Date(today);
//     console.log("startDates : ", today);

//     // const date1 = new Date(today);
//     // const date2 = new Date(bid_date);

//     console.log(typeof date1);
//     console.log(typeof date2);

//     // if (date1 > date2) {
//     //   bid_end_date[index].innerText = "마감되었습니다.";
//     // } else {
//     //     bid_end_date[index].innerText = bid_date;
//     // }
//     bid_end_date[index].innerText = bid_date;
//   });
// }

// showEndBidDate();

// 테스트용 코드
function showEndTime() {
  /* sale_date도 date로 입력해서 날짜만 비교 */
  // 현재 시간과 제품 등록 시간 가져오기
  const startDates = document.querySelectorAll("#startDate");
  const bidDate = document.querySelectorAll("#bidDate");
  const bid_end_date = document.querySelectorAll(".bid_end_date");

  today = new Date();

  // 각 제품별 등록시간 + 경매기간 해서 마감 기간 입력
  startDates.forEach((dates, index) => {
    let bidEndDate = new Date(dates.value);

    // (제품 등록시간 + 응찰 기간) 후 각 시간을 ms 단위로 가져오기
    let t_day = today.getTime();
    let be_date = bidEndDate.getTime() + parseInt(bidDate[index].value) * 1000 * 60 * 60 * 24;
    // console.log("t_day : ", t_day);
    // console.log("be_date : ", be_date);

    // 경매 종료 일자 표시
    let endBidding = new Date(bidEndDate);
    endBidding.setDate(endBidding.getDate() + parseInt(bidDate[index].value));

    const end_year = endBidding.getFullYear();
    const end_month = endBidding.getMonth() + 1;
    const end_day = endBidding.getDate();
    const end_hour = endBidding.getHours();
    const end_min = endBidding.getMinutes();
    const end_date = end_year + "년 " + end_month + "월 " + end_day + "일 " + end_hour + "시 " + end_min + "분 ";

    if (t_day > be_date) {
      bid_end_date[index].innerText = "경매 마감";
    } else {
      bid_end_date[index].innerText = end_date;
    }
  });
}

showEndTime();
