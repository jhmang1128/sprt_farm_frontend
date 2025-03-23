document.addEventListener("DOMContentLoaded", function (e) {
  // Form submission handling
  const inquiryForm = document.querySelector(".inquiry-form");

  inquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    // 토큰 가져오기
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href = "login.html";
      return;
    }

    fetch("http://127.0.0.1:8000/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // 인증 헤더
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("서버 오류 또는 권한 없음");
        return response.json();
      })
      .then((data) => {
        alert("문의글이 성공적으로 등록되었습니다.");
        window.location.href = "post_main.html"; // 성공 시 목록으로 이동
      })
      .catch((error) => {
        console.error("글 등록 실패:", error);
        alert("글 작성에 실패했습니다. 다시 시도해주세요.");
      });
  });
  // Cancel button handling
  const cancelButton = document.querySelector(".cancel-button");

  cancelButton.addEventListener("click", function () {
    if (confirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?")) {
      // In a real application, this would navigate back to the inquiry list page
      alert("문의 목록 페이지로 이동합니다.");
      window.history.back();
    }
  });

  // Navigation button handling
  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // For demo purposes, just show an alert with the button name
      const buttonText = this.textContent.trim();
      alert(`${buttonText} 페이지로 이동합니다.`);

      // In a real application, this would navigate to the respective page
    });
  });

  // Navigation link handling
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // For demo purposes, just show an alert
      alert("문의 목록 페이지로 이동합니다.");

      // In a real application, this would navigate to the inquiry list page
    });
  });

  // Auto-resize textarea
  const textarea = document.getElementById("content");

  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});
