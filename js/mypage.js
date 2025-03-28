////////////////////////////////////////////////////////////////////////////////////////////////
// my page
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  
  // URL
  const API_BASE_URL = 'https://api.aicropmate.com';
  
  // objects
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
});
