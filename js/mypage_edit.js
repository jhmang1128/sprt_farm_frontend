////////////////////////////////////////////////////////////////////////////////////////////////
// my page - edit
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", async function () {
  
  // URL
  const API_BASE_URL = 'https://api.aicropmate.com';


  const token = localStorage.getItem("token");
  if (!token) return alert("로그인이 필요합니다.");

  try {
    // 1. 유저 정보 불러오기
    const response = await fetch(`${API_BASE_URL}/users/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.json();

    // 2. 값 채워넣기
    document.getElementById("name").value = data.first_name || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("birthdate").value = data.birthdate || "";
    document.getElementById("region").value = data.region || "";
    document.getElementById("crops").value = data.crops || "";
    document.getElementById("equipment").value = data.equipment || "";
  } catch (err) {
    console.error("유저 정보 조회 실패:", err);
    alert("정보를 불러오는데 실패했습니다.");
  }

  // user update - 유저 정보 수정 (Trigger - Button)
  const form = document.querySelector(".edit-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const first_name = document.getElementById("name").value.trim(); // ✅ 핵심
    const email = document.getElementById("email").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const region = document.getElementById("region").value;
    const crops = document.getElementById("crops").value;
    const equipment = document.getElementById("equipment").value;

    if (!first_name || !email || !birthdate || !region) {
      return alert("필수 항목을 모두 입력해주세요.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          first_name,
          email,
          profile: {
            birthdate,
            region,
            crops,
            equipment,
          },
        }),
      });

      if (response.ok) {
        alert("회원 정보가 성공적으로 수정되었습니다.");
        window.location.href = "mypage.html";
      } else {
        const error = await response.json();
        console.error("수정 실패:", error);
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("에러 발생:", err);
      alert("서버 오류가 발생했습니다.");
    }
  });
});
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault(); // a 태그의 기본 이동 막기
    localStorage.removeItem("token"); // 토큰 삭제
    alert("로그아웃 되었습니다.");
    window.location.href = "index.html"; // 홈으로 이동하거나 새로고침
  });
}
