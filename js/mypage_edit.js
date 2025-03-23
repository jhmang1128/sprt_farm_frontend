// ✅ 회원정보 수정 API 연결
const API_BASE_URL = "http://127.0.0.1:8000"; // Django 서버 주소

document.addEventListener("DOMContentLoaded", function () {
  const editForm = document.querySelector(".edit-form");

  editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 입력값 가져오기
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const region = document.getElementById("region").value;
    const crops = document.getElementById("crops").value;
    const equipment = document.getElementById("equipment").value;

    // 입력값 검증
    if (!name || !email || !birthdate || !region) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // 이메일 유효성 검사
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // 저장된 토큰 사용
      const response = await fetch(`${API_BASE_URL}/users/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          username: name, // username을 name으로 대체 (원하는 필드에 맞게 수정 가능)
          email,
          profile: {
            birthdate,
            region,
            crops,
            equipment,
          },
        }),
      });

      const data = await response.json();

      console.log("응답 데이터:", data);

      if (response.ok) {
        alert("회원정보가 성공적으로 저장되었습니다.");
        window.location.href = "./mypage.html"; // 마이페이지로 이동
      } else {
        alert(data.message || "회원정보 수정에 실패했습니다.");
        console.error(data);
      }
    } catch (error) {
      console.error("에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  });
});
