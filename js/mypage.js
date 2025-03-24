document.addEventListener("DOMContentLoaded", function () {
  // Edit button functionality
  const editButton = document.querySelector(".edit-button");

  editButton.addEventListener("click", function () {
    // In a real application, this would open an edit form
    // For demo purposes, we'll just toggle between view and edit modes
    toggleEditMode();
  });

  // Delete account button functionality

  // Navigation button handling
  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.trim() === "로그아웃") {
        e.preventDefault();
        alert("로그아웃 되었습니다.");
        // In a real application, this would log the user out
      }
    });
  });

  // Navigation link handling
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const linkText = this.textContent.trim();
      alert(`${linkText} 페이지로 이동합니다.`);
      // In a real application, this would navigate to the respective page
    });
  });
});

// Function to toggle between view and edit modes
function toggleEditMode() {
  const infoValues = document.querySelectorAll(".info-value");
  const editButton = document.querySelector(".edit-button");

  const isEditMode = editButton.textContent === "저장";

  if (isEditMode) {
    // ✅ 수정 저장 모드 → API 요청 보내기
    const updatedData = {};

    infoValues.forEach((value) => {
      const input = value.querySelector("input");
      if (input) {
        const field = input.dataset.field;
        updatedData[field] = input.value;
        value.textContent = input.value; // UI 업데이트
      }
    });

    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/users/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("수정 실패");
        return res.json();
      })
      .then((data) => {
        alert("정보가 성공적으로 저장되었습니다.");
        editButton.textContent = "수정";
      })
      .catch((err) => {
        alert("저장에 실패했습니다.");
        console.error(err);
      });
  } else {
    // ✅ 편집 모드 전환
    infoValues.forEach((value) => {
      const currentValue = value.textContent;
      const field = value.dataset.field; // HTML에 data-field 있어야 함
      value.innerHTML = `<input type="text" class="edit-input" value="${currentValue}" data-field="${field}">`;
    });

    editButton.textContent = "저장";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const deleteButton = document.querySelector(".delete-button");

  deleteButton.addEventListener("click", async function () {
    const confirmDelete = confirm("정말로 회원탈퇴를 진행하시겠습니까?");

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("로그인이 필요합니다.");

    try {
      const response = await fetch("http://127.0.0.1:8000/users/delete/", {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        alert("회원탈퇴가 완료되었습니다.");
        localStorage.removeItem("token");
        window.location.href = "index.html"; // 홈으로 이동
      } else {
        const errorData = await response.json();
        alert("회원탈퇴 실패: " + (errorData.message || "서버 오류"));
      }
    } catch (err) {
      console.error("회원탈퇴 오류:", err);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  });
});
document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch("http://127.0.0.1:8000/users/profile/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.json();
    console.log("유저 데이터:", data); // ✅ 확인용

    // 화면에 데이터 넣기
    document.querySelectorAll(".info-value").forEach((element) => {
      const field = element.dataset.field;
      if (data[field]) {
        element.textContent = data[field]; // ✅ 첫 화면에 표시
      }
    });
  } catch (err) {
    console.error("유저 정보 불러오기 오류:", err);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (token) {
    document.querySelector(".login-btn")?.style.display = "none";
    document.querySelector(".signup-btn")?.style.display = "none";
    document.querySelector(".profile-btn")?.style.display = "inline-block";
    document.querySelector(".logout-btn")?.style.display = "inline-block";
  }
});
