document.addEventListener("DOMContentLoaded", function () {
  // Edit button functionality
  const editButton = document.querySelector(".edit-button");

  editButton.addEventListener("click", function () {
    // In a real application, this would open an edit form
    // For demo purposes, we'll just toggle between view and edit modes
    toggleEditMode();
  });

  // Delete account button functionality
  const deleteButton = document.querySelector(".delete-button");

  deleteButton.addEventListener("click", function () {
    if (
      confirm(
        "정말로 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      alert("회원탈퇴가 완료되었습니다.");
      // In a real application, this would send a request to delete the account
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
});

// Function to toggle between view and edit modes
function toggleEditMode() {
  const infoValues = document.querySelectorAll(".info-value");
  const editButton = document.querySelector(".edit-button");

  // Check if we're already in edit mode
  const isEditMode = editButton.textContent === "저장";

  if (isEditMode) {
    // Save the edited values and switch back to view mode
    infoValues.forEach((value) => {
      const input = value.querySelector("input");
      if (input) {
        value.textContent = input.value;
      }
    });

    editButton.textContent = "편집수정";
    alert("정보가 성공적으로 저장되었습니다.");
  } else {
    // Switch to edit mode
    infoValues.forEach((value) => {
      const currentValue = value.textContent;
      value.innerHTML = `<input type="text" class="edit-input" value="${currentValue}">`;
    });

    editButton.textContent = "저장";
  }
}
