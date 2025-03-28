////////////////////////////////////////////////////////////////////////////////////////////////
// post main
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  loadPosts(); // 페이지 로드시 게시글 불러오기
});

// URL
const API_BASE_URL = "http://127.0.0.1:8000";


function loadPosts() {
  fetch(API_BASE_URL + "/post/")
    .then((response) => {
      if (!response.ok) throw new Error("게시글을 불러오지 못했습니다.");
      return response.json();
    })
    .then((data) => {
      renderPostTable(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("게시글 로딩 실패");
    });
}

function renderPostTable(posts) {
  const tableBody = document.querySelector(".inquiry-table > tbody");
  tableBody.innerHTML = ""; // 초기화

  posts.forEach((post, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td class="column-number">${index + 1}</td>
    <td class="column-title">
      <a href="post_detail.html?id=${post.id}">${post.title}</a>
    </td>
    <td class="column-author">${post.author ?? "익명"}</td>
    <td class="column-date">${formatDate(post.created_at)}</td>
  `;

    tableBody.appendChild(row);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR");
}

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
