document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const autoLogin = document.getElementById("auto-login").checked;

    // Validate form
    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // For demo purposes, just show the entered data
    console.log("로그인 시도:", {
      username,
      password: "********", // Don't log actual password
      autoLogin,
    });

    // Simulate login success
    alert("로그인 성공!");
  });

  // Navigation button handling
  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      navButtons.forEach((btn) => btn.classList.remove("login-active"));

      // Add active class to clicked button
      this.classList.add("login-active");

      // For demo purposes, just show an alert with the button name
      const buttonText = this.textContent.trim();

      if (buttonText === "회원가입") {
        alert("회원가입 페이지로 이동합니다.");
      }
    });
  });

  // Form link handling
  const formLinks = document.querySelectorAll(".form-link");

  formLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // For demo purposes, just show an alert with the link name
      const linkText = this.textContent.trim();
      alert(`${linkText} 페이지로 이동합니다.`);
    });
  });
});
