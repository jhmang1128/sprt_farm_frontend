document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".inquiry-form");
  const cancelButton = document.querySelector(".cancel-button");
  const token = localStorage.getItem("token");
  const postId = new URLSearchParams(window.location.search).get("id");

  // ✨ 수정 모드: 기존 글 데이터 불러오기
  if (postId) {
    fetch(`http://127.0.0.1:8000/post/${postId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("글을 불러올 수 없습니다.");
        return res.json();
      })
      .then((data) => {
        document.getElementById("title").value = data.title;
        document.getElementById("content").value = data.content;
      })
      .catch((err) => {
        console.error("글 불러오기 실패:", err);
        alert("글을 불러오는 중 문제가 발생했습니다.");
      });
  }

  // ✨ 제출 버튼 (글 등록 또는 수정)
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!token) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href = "login.html";
      return;
    }

    const method = postId ? "PUT" : "POST";
    const url = postId
      ? `http://127.0.0.1:8000/post/${postId}/edit/`
      : `http://127.0.0.1:8000/post/`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("서버 오류 또는 권한 없음");
        return res.json();
      })
      .then((data) => {
        alert(postId ? "글이 수정되었습니다." : "문의글이 등록되었습니다.");
        window.location.href = "post_main.html";
      })
      .catch((err) => {
        console.error("글 저장 실패:", err);
        alert("글 저장에 실패했습니다.");
      });
  });

  // ✨ 취소 버튼
  cancelButton.addEventListener("click", function () {
    if (confirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?")) {
      window.location.href = "post_main.html";
    }
  });

  // ✨ textarea 자동 높이 조절
  const textarea = document.getElementById("content");
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});
