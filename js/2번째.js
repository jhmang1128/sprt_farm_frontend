document.addEventListener("DOMContentLoaded", function () {
  // 👉 추천 작물 불러오기
  const recommendations = JSON.parse(localStorage.getItem("recommendations"));
  const recommendationContainer = document.getElementById(
    "recommendationResults"
  );

  if (!recommendations || recommendations.length === 0) {
    recommendationContainer.innerHTML = "<p>추천 작물이 없습니다.</p>";
  } else {
    recommendations.forEach((item) => {
      const card = document.createElement("div");
      card.className = "crop-card";
      card.innerHTML = `
        <h3>✅ ${item.crop}</h3>
        <p><strong>추천 이유:</strong> ${item.reason}</p>
        ${
          item.crop_info
            ? `<pre><code>${JSON.stringify(
                item.crop_info,
                null,
                2
              )}</code></pre>`
            : ""
        }
      `;
      recommendationContainer.appendChild(card);
    });
  }

  // 👉 토양 정보 불러오기
  const soilData = JSON.parse(localStorage.getItem("soil_data"));
  const soilContainer = document.getElementById("soil-data-box");

  if (!soilData || Object.keys(soilData).length === 0) {
    soilContainer.innerHTML = "<p>토양 정보가 없습니다.</p>";
  } else {
    let html = "<table class='soil-table'><tbody>";
    for (const [key, value] of Object.entries(soilData)) {
      html += `<tr><th>${key}</th><td>${value}</td></tr>`;
    }
    html += "</tbody></table>";
    soilContainer.innerHTML = html;
  }

  // 👉 3번째 페이지로 이동 (선택된 작물도 함께 넘김)
  const goToAnalysisBtn = document.getElementById("go-to-analysis");
  if (goToAnalysisBtn) {
    goToAnalysisBtn.addEventListener("click", function () {
      const selectedCrop = recommendations?.[0]?.crop || "감자"; // 첫 번째 작물 선택
      localStorage.setItem("selected_crop", selectedCrop); // crop 이름 저장
      window.location.href = "3번째.html";
    });
  }
});
