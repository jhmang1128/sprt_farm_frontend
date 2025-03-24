document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const profileBtn = document.querySelector(".profile-btn");
  const logoutBtn = document.querySelector(".logout-btn");

  const token = localStorage.getItem("token");

  // ✅ 로그인 상태일 경우 버튼 전환
  if (token) {
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  }

  // ✅ 로그아웃 버튼 기능
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault(); // a 태그의 기본 이동 막기
      localStorage.removeItem("token"); // 토큰 삭제
      alert("로그아웃 되었습니다.");
      window.location.href = "index.html"; // 홈으로 이동하거나 새로고침
    });
  }

  // ✅ 주소 검색 기능 (있는 경우만)
  const addressInput = document.getElementById("address-input");
  const resultDiv = document.getElementById("result");
  const fetchButton = document.getElementById("fetch-button");

  if (fetchButton) {
    fetchButton.addEventListener("click", function () {
      const address = addressInput.value;
      if (!address) {
        alert("주소를 입력하세요.");
        return;
      }

      fetch(`/api/soil_recommendation?address=${encodeURIComponent(address)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">오류: ${data.error}</p>`;
          } else {
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
  }
});
