// document.addEventListener("DOMContentLoaded", function () {
//   const loginBtn = document.querySelector(".login-btn");
//   const signupBtn = document.querySelector(".signup-btn");
//   const profileBtn = document.querySelector(".profile-btn");
//   const logoutBtn = document.querySelector(".logout-btn");

//   // ✅ 로그인 여부 확인 (토큰 존재 여부)
//   const token = localStorage.getItem("token");
//   console.log(token);
//   console.log(loginBtn, signupBtn, profileBtn, logoutBtn);
//   if (loginBtn && signupBtn && profileBtn && logoutBtn) {
//     if (token) {
//       // ✅ 로그인 상태
//       loginBtn.style.display = "none";
//       signupBtn.style.display = "none";
//       profileBtn.style.display = "inline-block";
//       logoutBtn.style.display = "inline-block";
//     } else {
//       // ✅ 로그아웃 상태
//       loginBtn.style.display = "inline-block";
//       signupBtn.style.display = "inline-block";
//       profileBtn.style.display = "none";
//       logoutBtn.style.display = "none";
//     }
//     // ✅ 로그아웃 기능 추가
//     const logoutBtn = document.querySelector(".logout-btn");

//     if (logoutBtn) {
//       logoutBtn.addEventListener("click", function (e) {
//         e.preventDefault(); // 기본 링크 이동 방지
//         localStorage.removeItem("token"); // ✅ 토큰 삭제
//         alert("로그아웃되었습니다.");
//         window.location.href = "index.html"; // ✅ 로그아웃 후 메인 페이지로 이동
//       });
//     }
//   } else {
//     console.error("로그인/로그아웃 관련 요소를 찾을 수 없습니다.");
//   }
// });
// // Table row hover effect
// const tableRows = document.querySelectorAll(".inquiry-table tbody tr");

// tableRows.forEach((row) => {
//   row.addEventListener("mouseenter", function () {
//     this.style.backgroundColor = "#f9f9f9";
//   });

//   row.addEventListener("mouseleave", function () {
//     this.style.backgroundColor = "";
//   });

//   row.addEventListener("click", function (e) {
//     // If the click is not on the link itself, find the link and navigate to it
//     if (e.target.tagName !== "A") {
//       const link = this.querySelector(".column-title a");
//       if (link) {
//         e.preventDefault();
//         showPostDetails(link.textContent);
//       }
//     }
//   });
// });

// // Pagination handling
// const pageNumbers = document.querySelectorAll(".page-number");

// pageNumbers.forEach((page) => {
//   page.addEventListener("click", function (e) {
//     e.preventDefault();

//     // Remove active class from all page numbers
//     pageNumbers.forEach((p) => p.classList.remove("active"));

//     // Add active class to clicked page number
//     this.classList.add("active");

//     // For demo purposes, just show an alert with the page number
//     const pageNum = this.textContent.trim();
//     console.log(`페이지 ${pageNum}로 이동합니다.`);

//     // In a real application, this would load the data for the selected page
//     simulatePageChange(pageNum);
//   });
// });

// // Navigation buttons handling
// const prevButton = document.querySelector(".page-nav.prev");
// const nextButton = document.querySelector(".page-nav.next");

// prevButton.addEventListener("click", function (e) {
//   e.preventDefault();

//   // Find the currently active page
//   const activePage = document.querySelector(".page-number.active");
//   const activeIndex = Array.from(pageNumbers).indexOf(activePage);

//   // If not on the first page, go to the previous page
//   if (activeIndex > 0) {
//     pageNumbers[activeIndex - 1].click();
//   }
// });

// nextButton.addEventListener("click", function (e) {
//   e.preventDefault();

//   // Find the currently active page
//   const activePage = document.querySelector(".page-number.active");
//   const activeIndex = Array.from(pageNumbers).indexOf(activePage);

//   // If not on the last page, go to the next page
//   if (activeIndex < pageNumbers.length - 1) {
//     pageNumbers[activeIndex + 1].click();
//   }
// });

// // Write button handling
// const writeButton = document.querySelector(".write-button");

// writeButton.addEventListener("click", function (e) {
//   e.preventDefault();

//   // For demo purposes, just show an alert
//   alert("새 글 작성 페이지로 이동합니다.");

//   // In a real application, this would navigate to the write page
// });

// // Navigation button handling
// const navButtons = document.querySelectorAll(".nav-button");

// navButtons.forEach((button) => {
//   button.addEventListener("click", function (e) {
//     e.preventDefault();

//     // For demo purposes, just show an alert with the button name
//     const buttonText = this.textContent.trim();
//     alert(`${buttonText} 페이지로 이동합니다.`);

//     // In a real application, this would navigate to the respective page
//   });
// });

// // Function to simulate changing page data
// function simulatePageChange(pageNum) {
//   // In a real application, this would fetch data from a server
//   // For demo purposes, we'll just update the table with mock data

//   const tableBody = document.querySelector(".inquiry-table tbody");

//   // Clear existing rows
//   tableBody.innerHTML = "";

//   // Generate mock data for the selected page
//   const startNum = (pageNum - 1) * 6 + 1;

//   const mockTitles = [
//     "농사 시작하는 방법 알려주세요",
//     "토양 분석 결과 해석 부탁드립니다",
//     "유기농 재배 방법 질문입니다",
//     "농약 사용 시기에 대해 문의드립니다",
//     "작물 병해충 관련 질문입니다",
//     "농기계 추천 부탁드립니다",
//   ];

//   const mockAuthors = ["김XX", "이XX", "박XX", "최XX", "정XX", "강XX"];

//   // Create new rows
//   for (let i = 0; i < 6; i++) {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//         <td class="column-number">${startNum + i}</td>
//         <td class="column-title"><a href="#">${
//           mockTitles[i % mockTitles.length]
//         }</a></td>
//         <td class="column-author">${mockAuthors[i % mockAuthors.length]}</td>
//         <td class="column-date">2025.03.${15 + parseInt(pageNum)}</td>
//       `;

//     tableBody.appendChild(row);

//     // Add event listeners to the new row
//     row.addEventListener("mouseenter", function () {
//       this.style.backgroundColor = "#f9f9f9";
//     });

//     row.addEventListener("mouseleave", function () {
//       this.style.backgroundColor = "";
//     });

//     row.addEventListener("click", function (e) {
//       if (e.target.tagName !== "A") {
//         const link = this.querySelector(".column-title a");
//         if (link) {
//           e.preventDefault();
//           showPostDetails(link.textContent);
//         }
//       }
//     });
//   }
// }

// // Function to show post details
// function showPostDetails(title) {
//   // For demo purposes, just show an alert with the post title
//   alert(`"${title}" 글을 조회합니다.`);

//   // In a real application, this would navigate to the post detail page
// }

document.addEventListener("DOMContentLoaded", function () {
  // ✅ 로그인 여부 확인 후 버튼 표시 조정
  const profileBtn = document.querySelector(".mypage-btn");
  const logoutBtn = document.querySelector(".logout-btn");

  const token = localStorage.getItem("token");

  if (profileBtn && logoutBtn) {
    if (token) {
      profileBtn.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
    } else {
      profileBtn.style.display = "none";
      logoutBtn.style.display = "none";
    }
  }

  // ✅ 로그아웃 버튼 동작 설정
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault(); // 기본 링크 이동 방지
      localStorage.removeItem("token"); // ✅ 토큰 삭제
      alert("로그아웃되었습니다.");
      window.location.href = "index.html"; // ✅ 로그아웃 후 메인 페이지로 이동
    });
  }

  // ✅ 게시판 행 클릭 시 상세 페이지 이동
  const tableRows = document.querySelectorAll(".inquiry-table tbody tr");

  tableRows.forEach((row) => {
    row.addEventListener("click", function (e) {
      if (e.target.tagName !== "A") {
        const link = this.querySelector(".column-title a");
        if (link) {
          e.preventDefault();
          showPostDetails(link.textContent);
        }
      }
    });
  });

  // ✅ 글쓰기 버튼 클릭 이벤트
  const writeButton = document.querySelector(".write-button");
  if (writeButton) {
    writeButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (!token) {
        alert("로그인이 필요합니다!");
        window.location.href = "login.html";
      } else {
        window.location.href = "post_edit.html";
      }
    });
  }
});
