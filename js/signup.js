////////////////////////////////////////////////////////////////////////////////////////////////
// sign up
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  
  // URL
  const API_BASE_URL = "http://127.0.0.1:8000";


  // object
  const signupForm = document.querySelector(".signup-form");

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const birthdate = document.getElementById("birthdate").value;
    const region = document.getElementById("region").value;
    const crops = document.getElementById("crops").value;
    const equipment = document.getElementById("equipment").value;

    if (!username || !email || !password || !birthdate || !region) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: name, // ✅ 이름 따로 저장
          profile: {
            birthdate,
            region,
            crops,
            equipment,
          },
        }),
      });

      const data = await response.json();
      console.log("응답데이터:", data);
      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인해주세요.");
        window.location.href = "login.html";
      } else {
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  });
});
