// // Simple JavaScript for dropdown functionality
// document.addEventListener("DOMContentLoaded", function () {
//   // You could add JavaScript here for interactive elements
//   // For example, to handle the calendar date selection
//   const dates = document.querySelectorAll(".date");
//   dates.forEach((date) => {
//     date.addEventListener("click", function () {
//       dates.forEach((d) => (d.style.backgroundColor = ""));
//       this.style.backgroundColor = "#e5e7eb";
//     });
//   });
//   document.addEventListener("DOMContentLoaded", function () {
//     // 주소 입력 필드와 버튼 요소 가져오기
//     const addressInput = document.getElementById("address-input");
//     const fetchButton = document.getElementById("fetch-button");
//     const resultDiv = document.getElementById("result");

//     // 버튼 클릭 시 데이터 요청
//     fetchButton.addEventListener("click", function () {
//         const address = addressInput.value;
//         if (!address) {
//             alert("주소를 입력하세요.");
//             return;
//         }

//         // Django 백엔드 API 호출
//         fetch(`/api/soil_recommendation?address=${encodeURIComponent(address)}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.error) {
//                     resultDiv.innerHTML = `<p style="color: red;">오류: ${data.error}</p>`;
//                 } else {
//                     // 추천 작물 리스트 출력
//                     resultDiv.innerHTML = "<h3>추천 작물</h3>";
//                     data.recommendations.forEach(crop => {
//                         resultDiv.innerHTML += `
//                             <div>
//                                 <h4>${crop.crop}</h4>
//                                 <p>추천 이유: ${crop.reason}</p>
//                             </div>
//                         `;
//                     });
//                 }
//             })
//             .catch(error => {
//                 resultDiv.innerHTML = `<p style="color: red;">에러 발생: ${error.message}</p>`;
//             });
//     });
// });

// });

document.addEventListener("DOMContentLoaded", function () {
  // ✅ 로그인 상태 확인 및 버튼 변경 기능 추가
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const profileBtn = document.querySelector(".profile-btn");
  const logoutBtn = document.querySelector(".logout-btn");

  // ✅ 로그인 여부 확인 (토큰 존재 여부)
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(loginBtn, signupBtn, profileBtn, logoutBtn);
  if (loginBtn && signupBtn && profileBtn && logoutBtn) {
    if (token) {
      // ✅ 로그인 상태
      loginBtn.style.display = "none";
      signupBtn.style.display = "none";
      profileBtn.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
    } else {
      // ✅ 로그아웃 상태
      loginBtn.style.display = "inline-block";
      signupBtn.style.display = "inline-block";
      profileBtn.style.display = "none";
      logoutBtn.style.display = "none";
    }

    // ✅ 로그아웃 기능 추가
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("token"); // ✅ 토큰 삭제 (로그아웃)
      alert("로그아웃되었습니다.");
      window.location.reload(); // ✅ 페이지 새로고침
    });
  } else {
    console.error("로그인/로그아웃 관련 요소를 찾을 수 없습니다.");
  }
});
// ✅ 기존 코드 유지 (주소 입력 필드 & 버튼 기능)
const addressInput = document.getElementById("address-input");
const resultDiv = document.getElementById("result");
const fetchButton = document.getElementById("fetch-button");

fetchButton.addEventListener("click", function () {
  const address = addressInput.value;
  if (!address) {
    alert("주소를 입력하세요.");
    return;
  }

  // Django 백엔드 API 호출
  fetch(`/api/soil_recommendation?address=${encodeURIComponent(address)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        resultDiv.innerHTML = `<p style="color: red;">오류: ${data.error}</p>`;
      } else {
        // 추천 작물 리스트 출력
        resultDiv.innerHTML = "<h3>추천 작물</h3>";
        data.recommendations.forEach((crop) => {
          resultDiv.innerHTML += `
                <div>
                  <h4>${crop.crop}</h4>
                  <p>추천 이유: ${crop.reason}</p>
                </div>
              `;
        });
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p style="color: red;">에러 발생: ${error.message}</p>`;
    });
});
