////////////////////////////////////////////////////////////////////////////////////////////////
// login
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  
  // URL
  const API_BASE_URL = 'https://api.aicropmate.com';
  
  // Form submission handling
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // Django 서버로 로그인 요청 보내기
      const response = await fetch(`${API_BASE_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`서버 응답 오류! 상태 코드: ${response.status}`);
      }

      alert("로그인 성공!");
      localStorage.setItem("token", data.token); // 로그인 토큰 저장
      window.location.href = "index.html"; // 로그인 후 메인 페이지로 이동
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("서버와의 연결에 실패했습니다.");
    }
  });
});
// console;
