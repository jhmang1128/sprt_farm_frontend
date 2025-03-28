////////////////////////////////////////////////////////////////////////////////////////////////
// post detail
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  
  // URL
  const API_BASE_URL = 'https://api.aicropmate.com';

  //objects
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  
  if (!postId) {
    alert("글 ID가 없습니다!");
    return;
  }

  fetch(`${API_BASE_URL}/post/${postId}/`)
    .then((res) => res.json())
    .then((post) => {
      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-author").textContent = `작성자: ${
        post.author ?? "익명"
      }`;
      document.getElementById("post-date").textContent = `작성일: ${formatDate(
        post.created_at
      )}`;
      document.getElementById("post-content").textContent = post.content;

      // ✨ 작성자 본인이면 수정 버튼 보여주기
      getUserInfo().then((user) => {
        if (user.username === post.author) {
          const editBtn = document.getElementById("edit-button");
          editBtn.href = `post_edit.html?id=${postId}`;
          document.getElementById("edit-controls").style.display = "block";
        }
      });
    });

  // ✨ 댓글 등록
  document.getElementById("comment-submit").addEventListener("click", () => {
    const content = document.getElementById("comment-content").value.trim();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!content) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    fetch(`${API_BASE_URL}/post/${postId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("댓글 등록 실패");
        return res.json();
      })
      .then(() => {
        alert("댓글이 작성되었습니다.");
        location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 작성 실패");
      });
  });

  // ✨ 댓글 목록 불러오기
  loadComments();

  function loadComments() {
    fetch(`${API_BASE_URL}/post/${postId}/`)
      .then((res) => res.json())
      .then((post) => {
        const list = document.getElementById("comment-list");
        list.innerHTML = "";
        if (post.comments) {
          post.comments.forEach((c) => {
            const li = document.createElement("li");
            li.textContent = `${c.author}: ${c.content}`;
            list.appendChild(li);
          });
        }
      });
  }

  // ✨ 로그인된 사용자 정보 가져오기
  function getUserInfo() {
    return fetch(`${API_BASE_URL}/users/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .catch(() => ({}));
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR");
  }
});
