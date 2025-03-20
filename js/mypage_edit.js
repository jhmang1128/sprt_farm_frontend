document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const editForm = document.querySelector(".edit-form");

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const region = document.getElementById("region").value;
    const crops = document.getElementById("crops").value;
    const equipment = document.getElementById("equipment").value;

    // Validate form
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!birthdate) {
      alert("생년월일을 입력해주세요.");
      return;
    }

    if (!region) {
      alert("지역을 입력해주세요.");
      return;
    }

    // For demo purposes, just show the entered data
    console.log("회원정보 수정:", {
      name,
      email,
      birthdate,
      region,
      crops,
      equipment,
    });

    // Simulate save success
    alert("회원정보가 성공적으로 저장되었습니다.");
  });

  // Cancel button handling
  const cancelButton = document.querySelector(".cancel-button");

  cancelButton.addEventListener("click", function () {
    if (confirm("변경사항을 취소하시겠습니까?")) {
      // In a real application, this would navigate back or reset the form
      alert("변경사항이 취소되었습니다.");
      window.history.back();
    }
  });

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

  // Format birthdate input
  const birthdateInput = document.getElementById("birthdate");

  birthdateInput.addEventListener("focus", function () {
    if (this.value === "") {
      this.type = "date";
    }
  });

  birthdateInput.addEventListener("blur", function () {
    if (this.value === "") {
      this.type = "text";
    }
  });
});
