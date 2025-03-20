document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const signupForm = document.querySelector(".signup-form");

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;
    const region = document.getElementById("region").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const equipment = document.getElementById("equipment").value;

    // Validate form
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!birthdate) {
      alert("생년월일을 입력해주세요.");
      return;
    } else if (!/^\d{8}$/.test(birthdate)) {
      alert("생년월일은 8자리 숫자로 입력해주세요. (YYYYMMDD)");
      return;
    }

    if (!region) {
      alert("지역을 입력해주세요.");
      return;
    }

    if (!phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    } else if (!/^01[0-9]\d{7,8}$/.test(phone)) {
      alert("유효한 휴대폰 번호를 입력해주세요.");
      return;
    }

    if (!email) {
      alert("이메일 주소를 입력해주세요.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!equipment) {
      alert("보유 장비 유형을 입력해주세요.");
      return;
    }

    // For demo purposes, just show the entered data
    console.log("회원가입 정보:", {
      name,
      birthdate,
      region,
      phone,
      email,
      equipment,
    });

    // Simulate registration success
    alert("회원가입이 완료되었습니다!");

    // Reset form
    signupForm.reset();
  });

  // Navigation button handling
  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      navButtons.forEach((btn) => btn.classList.remove("signup-active"));

      // Add active class to clicked button
      this.classList.add("signup-active");

      // For demo purposes, just show an alert with the button name
      const buttonText = this.textContent.trim();

      if (buttonText === "로그인") {
        alert("로그인 페이지로 이동합니다.");
      }
    });
  });

  // Format birthdate input
  const birthdateInput = document.getElementById("birthdate");

  birthdateInput.addEventListener("input", function () {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, "");

    // Limit to 8 digits
    if (this.value.length > 8) {
      this.value = this.value.slice(0, 8);
    }
  });

  // Format phone input
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function () {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, "");

    // Limit to 11 digits
    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }
  });
});
