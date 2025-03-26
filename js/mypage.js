document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const profileBtn = document.querySelector(".profile-btn");
  const logoutBtn = document.querySelector(".logout-btn");
  const fetchButton = document.querySelector(".search-button");
  const addressInput = document.querySelector(".search-input");

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

  // ✅ 주소 검색 기능
  if (fetchButton && addressInput) {
    fetchButton.addEventListener("click", function () {
      const address = addressInput.value.trim();
      if (!address) {
        alert("주소를 입력하세요.");
        return;
      }

      // ✅ 1. 주소 정보 요청 (DRF API)
      fetch(
        `http://localhost:8000/chatbot/address/?address=${encodeURIComponent(
          address
        )}&type=PARCEL`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.address_information) {
            alert("주소 정보를 불러올 수 없습니다.");
            return;
          }

          const pnu = data.address_information.id;

          // ✅ 2. 추천 작물 요청 (DRF API)
          return fetch(
            `http://localhost:8000/chatbot/recommendation/?address_information[id]=${pnu}`
          );
        })
        .then((res) => res.json())
        .then((data) => {
          if (!data.recommendations) {
            alert("추천 작물을 찾을 수 없습니다.");
            return;
          }

          // ✅ 3. 결과 저장 후 페이지 이동
          localStorage.setItem(
            "recommendations",
            JSON.stringify(data.recommendations)
          );
          window.location.href = "2번째.html";
        })
        .catch((err) => {
          console.error("❌ 에러 발생:", err);
          alert("서버 오류가 발생했습니다.");
        });
    });
  }
});
