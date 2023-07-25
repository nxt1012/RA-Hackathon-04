let tableHead = document.getElementById("tableHead");
let tableScore = document.getElementById("tableScore");
let tableBody = document.getElementById("tableBody");

let tableHeadData = `<th scope="col">#</th>`;
let totalScore = 0;
let tableScoreData = "";
let tableBodyData = "";
let userURL = "http://localhost:3000/users";
let roundURL = "http://localhost:3000/rounds";

// [onload] GET all users information to display into a form
fetch(`${userURL}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      tableHeadData += `<th scope="col">${data[i].name}</th>`;
    }
    tableHead.innerHTML = tableHeadData;
  })
  .catch((err) => console.log(err));

// calculate total score
fetch(`${userURL}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let userScore = data[i].columnScores.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      tableScoreData += `<th scope="col">${userScore}</th>`;
      totalScore += userScore;
    }
    tableScoreData =
      `<th scope="col">Sum of scores (${totalScore})</th>` + tableScoreData;
    tableScore.innerHTML = tableScoreData;
  })
  .catch((err) => console.log(err));

// fetch round scores
function fetchRoundData() {
    tableBodyData = "";
  fetch(`${roundURL}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        tableBodyData += `<tr><td> Round ${i+1}</td>`;
        for (let j = 0; j < data[i].rowScores.length; j++){
            tableBodyData += `<td><input type="number" value="${data[i].rowScores[j]}"></td>`
            console.log(data[i].rowScores)
        }
        tableBodyData += `</tr>`;
      }
      tableBody.innerHTML = tableBodyData;
    })
    .catch((err) => console.log(err));
}
fetchRoundData();

function addRound() {
    tableBody.innerHTML = "";
      // tạo round mới trên server và fetch lại dữ liệu
      // lấy số round từ server
      let roundNumber = 0;
      fetch(`${roundURL}`)
    .then((res) => res.json())
    .then((data) => {
      roundNumber = data.length + 1
      
    })
    .catch((err) => console.log(err));
      let newRound =     {
        // làm sao để lấy số round id mới ở đây (data.length)
        "id": roundNumber,
        "rowScores": [0, 0, 0, 0]
    }
    console.log(newRound);
        // tạo round mới trên server
      fetch(`${roundURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRound)
      })
      .then((res) => res.json())
      .then((data) => {
        fetchRoundData();
      })
      .catch((err) => console.log(err));
}
// TODO: viết hàm onchange để cập nhật điểm lên users.json và fetch lại
