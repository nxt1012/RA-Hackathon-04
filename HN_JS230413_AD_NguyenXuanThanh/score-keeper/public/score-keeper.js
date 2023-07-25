let userManager = document.getElementById("userManager");
let formData = "";
let baseURL = "http://localhost:3000/users";

// [onload] GET all users information to display into a form
fetch(`${baseURL}`)
.then((res) => res.json())
.then((data) => {
    console.log(data);
        for(let i = 0; i < data.length; i++) {
        formData += `<div class="mb-3">
    <input type="text" class="form-control" id="player_${i}" name="player_${i}" aria-describedby="playerInput" value="${data[i].name}" required>
  </div>`
    }
    formData += `<button type="submit" class="btn btn-primary">Create Game</button>`
    userManager.innerHTML = formData;
})
.catch((err) => console.log(err))

userManager.addEventListener("submit", (e) => {
    e.preventDefault();
    // Gửi dữ liệu người dùng mới lên server để cập nhật
    // Sử dụng PUT để cập nhật nguyên cục dữ liệu
    // Set dữ liệu điểm về []
    // # Sau đó sẽ xử lý cập nhật điểm từ users.json sang rounds.json trên server
    // Tạo dữ liệu gửi lên server
    let updatedUserInfo = [];
    for( let i = 0; i < 4; i++){
        updatedUserInfo.push({
            "id": i+1,
            "name": document.getElementById(`player_${i}`).value,
            "columnScores": []
        })
    }

    console.log(updatedUserInfo);
    fetch(`${baseURL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserInfo)
    })

    // Chuyển sang trang round/id
    location.assign("http://localhost:3000/round/1")
})