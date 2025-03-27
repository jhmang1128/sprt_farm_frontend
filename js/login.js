const API_BASE_URL = "http://127.0.0.1:8000"; // Django 서버 주소

document.addEventListener("DOMContentLoaded", function () {
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
console;
// // Navigation button handling
// const navButtons = document.querySelectorAll(".nav-button");

// navButtons.forEach((button) => {
//   button.addEventListener("click", function (e) {
//     e.preventDefault();

//     // Remove active class from all buttons
//     navButtons.forEach((btn) => btn.classList.remove("login-active"));

//     // Add active class to clicked button
//     this.classList.add("login-active");

//     // For demo purposes, just show an alert with the button name
//     const buttonText = this.textContent.trim();

//     if (buttonText === "회원가입") {
//       alert("회원가입 페이지로 이동합니다.");
//     }
//   });
// });

// // Form link handling
// const formLinks = document.querySelectorAll(".form-link");

// formLinks.forEach((link) => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();

//     // For demo purposes, just show an alert with the link name
//     const linkText = this.textContent.trim();
//     alert(`${linkText} 페이지로 이동합니다.`);
//   });
// });

// async function fetchUserProfile() {
//   const token = localStorage.getItem("token"); // 저장된 토큰 가져오기

//   if (!token) {
//     alert("로그인이 필요합니다.");
//     window.location.href = "login.html";
//     return;
//   }

//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/profile/", {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${token}`, // 헤더에 토큰 추가
//       },
//     });

//     if (!response.ok) {
//       throw new Error("인증 실패!");
//     }

//     const data = await response.json();
//     console.log("사용자 정보:", data);
//   } catch (error) {
//     console.error(error);
//     alert("사용자 정보를 가져올 수 없습니다.");
//   }
// }
