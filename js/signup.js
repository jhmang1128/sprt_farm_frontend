// const API_BASE_URL = "127.0.0.1:8000";
// let currentUser = null;
// let authToken = null;

// // API 요청에 공통으로 사용할 헤더를 생성하는 함수
// function getHeaders() {
//   const headers = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   };
//   if (authToken) {
//     headers["Authorization"] = `Token ${authToken}`;
//   }
//   return headers;
// }
// document.addEventListener("DOMContentLoaded", function () {
//   // Form submission handling

//   const signupForm = document.querySelector(".signup-form");

//   signupForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Get form values
//     const username = document.getElementById("id").value;
//     // const birthdate = document.getElementById("birthdate").value;
//     // const region = document.getElementById("region").value;
//     // const phone = document.getElementById("phone").value;
//     const email = document.getElementById("email").value;
//     // const equipment = document.getElementById("equipment").value;
//     const password = document.getElementById("password").value;

//     // For demo purposes, just show the entered data
//     // console.log("회원가입 정보:", {
//     //   name,
//     //   birthdate,
//     //   region,
//     //   phone,
//     //   email,
//     //   equipment,
//     // });
//     try {
//       const response = fetch(`${API_BASE_URL}/register/`, {
//         method: "POST",
//         headers: getHeaders(),
//         body: JSON.stringify({ username, email, password }),
//         credentials: "include",
//       });

//       if (response.ok) {
//         alert("회원가입이 완료되었습니다. 로그인해주세요.");
//       } else {
//         const data = response.json();
//         alert(data.message || "회원가입에 실패했습니다.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("회원가입 중 오류가 발생했습니다.");
//     }

//     // Reset form
//     signupForm.reset();
//   });

//   // Navigation button handling
//   const navButtons = document.querySelectorAll(".nav-button");

//   navButtons.forEach((button) => {
//     button.addEventListener("click", function (e) {
//       e.preventDefault();

//       // Remove active class from all buttons
//       navButtons.forEach((btn) => btn.classList.remove("signup-active"));

//       // Add active class to clicked button
//       this.classList.add("signup-active");

//       // For demo purposes, just show an alert with the button name
//       const buttonText = this.textContent.trim();

//       if (buttonText === "로그인") {
//         alert("로그인 페이지로 이동합니다.");
//       }
//     });
//   });

//   // Format birthdate input
//   const birthdateInput = document.getElementById("birthdate");

//   birthdateInput.addEventListener("input", function () {
//     // Remove non-numeric characters
//     this.value = this.value.replace(/\D/g, "");

//     // Limit to 8 digits
//     if (this.value.length > 8) {
//       this.value = this.value.slice(0, 8);
//     }
//   });

//   // Format phone input
//   const phoneInput = document.getElementById("phone");

//   phoneInput.addEventListener("input", function () {
//     // Remove non-numeric characters
//     this.value = this.value.replace(/\D/g, "");

//     // Limit to 11 digits
//     if (this.value.length > 11) {
//       this.value = this.value.slice(0, 11);
//     }
//   });
// });

const API_BASE_URL = "http://127.0.0.1:8000"; // Django 서버 주소

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.querySelector(".signup-form");

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 입력값 가져오기
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 서버로 요청 보내기
    try {
      const response = await fetch(`${API_BASE_URL}/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      const data = await response.json(); // 응답 데이터 처리
      console.log(data);
      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인해주세요.");
        window.location.href = "./index2.html"; // 로그인 페이지로 이동
      } else {
        console.log(data);
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }

    // 입력값 초기화
    signupForm.reset();
  });
});
