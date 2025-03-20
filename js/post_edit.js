document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const inquiryForm = document.querySelector(".inquiry-form");

  inquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    // Validate form
    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    // For demo purposes, just show the entered data
    console.log("문의글 작성:", {
      title,
      content,
    });

    // Simulate submission success
    alert("문의글이 성공적으로 등록되었습니다.");

    // Redirect to inquiry list page
    // In a real application, this would navigate to the inquiry list page
    setTimeout(() => {
      alert("문의 목록 페이지로 이동합니다.");
    }, 500);
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
