// ✅ 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  highlightDeficientNutrients();
  addCalendarHoverEffects();
  setupNavButtons();
  setupCategoryDropdown(); // 대분류-소분류 드롭다운
  setupCropDataFetcher(); // 작물 정보 불러오기

  // ✅ 기본 크롤링 데이터 로딩 (예: 벼 - 기계이앙재배)
  const cntns_no = "210004";
  fetchCrawledContent(cntns_no);
});

// ✅ 1. 부족한 영양소 하이라이트
function highlightDeficientNutrients() {
  const highlightedCells = document.querySelectorAll(".highlight");
  highlightedCells.forEach((cell) => {
    cell.style.transition = "background-color 0.3s ease";
    let isPulsing = false;
    setInterval(() => {
      cell.style.backgroundColor = isPulsing ? "" : "rgba(255, 0, 0, 0.1)";
      isPulsing = !isPulsing;
    }, 1000);
  });
}

// ✅ 2. 캘린더 셀 hover 효과
function addCalendarHoverEffects() {
  const cells = document.querySelectorAll(".calendar-cell");
  cells.forEach((cell) => {
    cell.addEventListener(
      "mouseenter",
      () => (cell.style.backgroundColor = "#f0f9f0")
    );
    cell.addEventListener(
      "mouseleave",
      () => (cell.style.backgroundColor = "")
    );
  });
}

// ✅ 3. 상단 네비 버튼 클릭 알림
function setupNavButtons() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      alert(`${this.textContent.trim()} 버튼이 클릭되었습니다.`);
    });
  });
}

// // ✅ 4. 작물 선택 드롭다운 (샘플용)
// function setupCropSelection() {
//   const mainContent = document.querySelector(".main-content");
//   const selector = document.createElement("div");
//   selector.className = "crop-selector";
//   selector.innerHTML = `
//     <label for="crop-select">작물 선택:</label>
//     <select id="crop-select">
//       <option value="potato">감자</option>
//       <option value="garlic">마늘</option>
//       <option value="ginger">생강</option>
//       <option value="cabbage">배추</option>
//     </select>
//   `;
//   Object.assign(selector.style, {
//     position: "absolute",
//     top: "10px",
//     left: "20px",
//     padding: "8px",
//     backgroundColor: "white",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     zIndex: "10",
//   });
//   mainContent.appendChild(selector);
// }

// ✅ 5. 작물 성장 시뮬레이션 버튼
setTimeout(() => {
  const btn = document.createElement("button");
  btn.textContent = "작물 성장 시뮬레이션";
  Object.assign(btn.style, {
    position: "absolute",
    top: "10px",
    right: "20px",
    padding: "8px 16px",
    backgroundColor: "#0a6e1f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: "10",
  });
  btn.addEventListener("click", simulateCropGrowth);
  document.querySelector(".main-content").appendChild(btn);
}, 1000);

// ✅ 6. 작물 성장 시뮬레이션 로직
function simulateCropGrowth() {
  document
    .querySelectorAll(".calendar-cell .progress-bar")
    .forEach((bar) => bar.remove());

  const growthPeriods = [
    { month: 3, duration: 3 }, // 3~5월
    { month: 9, duration: 3 }, // 9~11월
  ];

  growthPeriods.forEach(({ month, duration }) => {
    for (let i = 0; i < duration; i++) {
      const index = month + i - 1;
      document
        .querySelectorAll(`.calendar-cell:nth-child(${index + 1})`)
        .forEach((cell) => {
          const bar = document.createElement("div");
          bar.className = "progress-bar";
          bar.style.width = `${((i + 1) / duration) * 100}%`;
          cell.appendChild(bar);
        });
    }
  });
}

// ✅ 7. 대분류 → 소분류 드롭다운
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const cropSelect = document.getElementById("crop-select");

  fetch("http://localhost:8000/crawled_data/get-crop-options/")
    .then((res) => res.json())
    .then((categoryData) => {
      // 대분류 옵션 채우기
      for (let category in categoryData) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      }

      // 대분류 선택 시 소분류 업데이트
      categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        cropSelect.innerHTML = "";

        if (!selectedCategory || !categoryData[selectedCategory]) {
          cropSelect.disabled = true;
          cropSelect.innerHTML = `<option value="">선택할 수 없습니다</option>`;
          return;
        }

        cropSelect.disabled = false;
        categoryData[selectedCategory].forEach((crop) => {
          const opt = document.createElement("option");
          opt.value = `${selectedCategory} - ${crop}`;
          opt.textContent = crop;
          cropSelect.appendChild(opt);
        });
      });
    })
    .catch((err) => {
      console.error("드롭다운 불러오기 실패:", err);
    });
});
// ✅ 8. 작물 정보 요청 fetch
function setupCropDataFetcher() {
  const cropSelect = document.getElementById("crop-select");
  const button = document.getElementById("loadCropData");

  button.addEventListener("click", () => {
    const cropName = cropSelect.value;
    if (!cropName) return alert("작물을 선택해주세요!");

    fetch("http://localhost:8000/crawled_data/get-crop/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crop_name: cropName }),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("crawled-container").innerHTML =
          data.html || `<p>${data.error}</p>`;
      })
      .catch((err) => {
        console.error(err);
        document.getElementById("crawled-container").innerHTML =
          "<p>서버 오류</p>";
      });
  });
}

// ✅ 9. 번호로 크롤링된 HTML 불러오기 (선택적)
function fetchCrawledContent(cntns_no) {
  fetch("http://localhost:8000/crawl/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cntns_no }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.message) {
        fetch("/static/crawled_content.html")
          .then((res) => res.text())
          .then((html) => {
            document.getElementById("crawled-container").innerHTML = html;
          });
      } else {
        console.error("크롤링 실패:", result.error);
      }
    })
    .catch((err) => {
      console.error("요청 실패:", err);
    });
}
