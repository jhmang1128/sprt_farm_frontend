///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// header - nav
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// 로그인
////////////////////////////////////////////////////////////

// ✅ 로그인 상태 확인 및 버튼 변경 기능 추가
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ index.js 로딩됨");

  // 버튼/입력창 선택
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const profileBtn = document.querySelector(".profile-btn");
  const logoutBtn = document.querySelector(".logout-btn");


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// body
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// search box
////////////////////////////////////////////////////////////

  // serach bar - button action ✅
  document.getElementById('search_button_01').addEventListener('click', function () {
    console.log(document.getElementById('input_text_search'));
    const text_search_value = document.getElementById('input_text_search').value;
    

    if (text_search_value) {
      sessionStorage.setItem('text_search_value', text_search_value);
      window.location.href = '02_crop_recommendation.html';
    }
    else {
      console.log('error : 값이 없습니다.'); // error 처리 따로 필요할듯
    }
  });


  const fetchButton = document.querySelector(".search-button");
  const addressInput = document.querySelector(".search-input");

  const token = localStorage.getItem("token");

  // ✅ 로그인 상태면 버튼 전환
  if (token) {
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  }

  // ✅ 로그아웃 버튼 클릭
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      window.location.href = "index.html";
    });
  }

  // ✅ 검색 버튼 클릭 이벤트
  if (fetchButton && addressInput) {
    console.log("✅ 검색 버튼 이벤트 등록됨");

    fetchButton.addEventListener("click", function () {
      const address = addressInput.value.trim();
      if (!address) {
        alert("주소를 입력하세요.");
        return;
      }

      console.log("📡 주소 검색 시작:", address);

      // 1. 주소 정보 요청
      fetch(
        `http://localhost:8000/chatbot/address/?address=${encodeURIComponent(
          address
        )}&type=PARCEL`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.address_information) {
            alert("주소 정보를 불러올 수 없습니다.");
            return;
          }

          const pnu = data.address_information.id;
          console.log("📦 받은 PNU 코드:", pnu);

          // 2. 추천 작물 요청
          return fetch(
            `http://localhost:8000/chatbot/recommendation/?address_information[id]=${pnu}`
          );
        })
        .then((res) => res.json())
        .then((data) => {
          if (!data.recommendations || data.recommendations.length === 0) {
            alert("추천 작물을 찾을 수 없습니다.");
            return;
          }

          console.log("🌱 추천 결과:", data.recommendations);

          // 3. 결과 저장 후 이동
          localStorage.setItem(
            "recommendations",
            JSON.stringify(data.recommendations)
          );
          window.location.href = "2번째.html";
        })
        .catch((err) => {
          console.error("❌ 서버 에러:", err);
          alert("서버 오류가 발생했습니다.");
        });
    });
  } else {
    console.warn("❌ 버튼 또는 입력창을 찾을 수 없습니다.");
  }
});
