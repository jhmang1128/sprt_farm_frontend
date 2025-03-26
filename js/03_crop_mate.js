// ✅ 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  highlightDeficientNutrients();
  addCalendarHoverEffects();
  // setupNavButtons();
  // setupCategoryDropdown(); // 대분류-소분류 드롭다운
  // setupCropDataFetcher(); // 작물 정보 불러오기

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

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const cropSelect = document.getElementById("crop-select");
  const iframe = document.getElementById("crop-info-frame");

  let categoryData = {}; // 대분류: [소분류]
  let cropLinkMap = {}; // "밭농사 - 감자": "링크"

  // ✅ 1. 두 API 호출 (드롭다운 + 링크 맵)
  Promise.all([
    fetch("http://localhost:8000/crawled_data/get-crop-options/").then((res) =>
      res.json()
    ),
    fetch("http://localhost:8000/crawled_data/get-links/").then((res) =>
      res.json()
    ),
  ]).then(([categoryRes, linkRes]) => {
    categoryData = categoryRes;
    cropLinkMap = linkRes;

    // 대분류 드롭다운 채우기
    for (let category in categoryData) {
      const opt = new Option(category, category);
      categorySelect.appendChild(opt);
    }
  });

  // ✅ 2. 대분류 선택 시 소분류 채우기
  categorySelect.addEventListener("change", () => {
    const selected = categorySelect.value;
    cropSelect.innerHTML = "";
    cropSelect.disabled = false;

    if (!selected || !categoryData[selected]) {
      cropSelect.disabled = true;
      cropSelect.innerHTML = `<option value="">-- 대분류 먼저 선택 --</option>`;
      return;
    }

    categoryData[selected].forEach((crop) => {
      const value = `${selected} - ${crop}`; // ex: 밭농사 - 감자
      const opt = new Option(crop, value);
      cropSelect.appendChild(opt);
    });
  });

  // ✅ 3. 선택 후 버튼 클릭 시 iframe에 링크 띄우기
  document.getElementById("loadCropData").addEventListener("click", () => {
    const selectedCrop = cropSelect.value;
    if (!selectedCrop) return alert("작물을 선택해주세요!");

    const url = cropLinkMap[selectedCrop];
    if (url) {
      iframe.src = url;
    } else {
      alert("해당 작물의 링크 정보가 없습니다.");
    }
  });
});
