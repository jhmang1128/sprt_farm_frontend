document.addEventListener("DOMContentLoaded", function () {
  // Table row hover effect
  const tableRows = document.querySelectorAll(".inquiry-table tbody tr");

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f9f9f9";
    });

    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    row.addEventListener("click", function (e) {
      // If the click is not on the link itself, find the link and navigate to it
      if (e.target.tagName !== "A") {
        const link = this.querySelector(".column-title a");
        if (link) {
          e.preventDefault();
          showPostDetails(link.textContent);
        }
      }
    });
  });

  // Pagination handling
  const pageNumbers = document.querySelectorAll(".page-number");

  pageNumbers.forEach((page) => {
    page.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all page numbers
      pageNumbers.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked page number
      this.classList.add("active");

      // For demo purposes, just show an alert with the page number
      const pageNum = this.textContent.trim();
      console.log(`페이지 ${pageNum}로 이동합니다.`);

      // In a real application, this would load the data for the selected page
      simulatePageChange(pageNum);
    });
  });

  // Navigation buttons handling
  const prevButton = document.querySelector(".page-nav.prev");
  const nextButton = document.querySelector(".page-nav.next");

  prevButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Find the currently active page
    const activePage = document.querySelector(".page-number.active");
    const activeIndex = Array.from(pageNumbers).indexOf(activePage);

    // If not on the first page, go to the previous page
    if (activeIndex > 0) {
      pageNumbers[activeIndex - 1].click();
    }
  });

  nextButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Find the currently active page
    const activePage = document.querySelector(".page-number.active");
    const activeIndex = Array.from(pageNumbers).indexOf(activePage);

    // If not on the last page, go to the next page
    if (activeIndex < pageNumbers.length - 1) {
      pageNumbers[activeIndex + 1].click();
    }
  });

  // Write button handling
  const writeButton = document.querySelector(".write-button");

  writeButton.addEventListener("click", function (e) {
    e.preventDefault();

    // For demo purposes, just show an alert
    alert("새 글 작성 페이지로 이동합니다.");

    // In a real application, this would navigate to the write page
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
});

// Function to simulate changing page data
function simulatePageChange(pageNum) {
  // In a real application, this would fetch data from a server
  // For demo purposes, we'll just update the table with mock data

  const tableBody = document.querySelector(".inquiry-table tbody");

  // Clear existing rows
  tableBody.innerHTML = "";

  // Generate mock data for the selected page
  const startNum = (pageNum - 1) * 6 + 1;

  const mockTitles = [
    "농사 시작하는 방법 알려주세요",
    "토양 분석 결과 해석 부탁드립니다",
    "유기농 재배 방법 질문입니다",
    "농약 사용 시기에 대해 문의드립니다",
    "작물 병해충 관련 질문입니다",
    "농기계 추천 부탁드립니다",
  ];

  const mockAuthors = ["김XX", "이XX", "박XX", "최XX", "정XX", "강XX"];

  // Create new rows
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="column-number">${startNum + i}</td>
        <td class="column-title"><a href="#">${
          mockTitles[i % mockTitles.length]
        }</a></td>
        <td class="column-author">${mockAuthors[i % mockAuthors.length]}</td>
        <td class="column-date">2025.03.${15 + parseInt(pageNum)}</td>
      `;

    tableBody.appendChild(row);

    // Add event listeners to the new row
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f9f9f9";
    });

    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    row.addEventListener("click", function (e) {
      if (e.target.tagName !== "A") {
        const link = this.querySelector(".column-title a");
        if (link) {
          e.preventDefault();
          showPostDetails(link.textContent);
        }
      }
    });
  }
}

// Function to show post details
function showPostDetails(title) {
  // For demo purposes, just show an alert with the post title
  alert(`"${title}" 글을 조회합니다.`);

  // In a real application, this would navigate to the post detail page
}
