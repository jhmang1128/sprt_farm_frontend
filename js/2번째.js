document.addEventListener("DOMContentLoaded", function () {
  // Initialize the application
  initApp();
});

function initApp() {
  // Set up event listeners
  setupCropButtons();
  setupClosePanel();

  // Add hover effects to table cells
  addTableHoverEffects();

  // Add navigation button functionality
  setupNavButtons();

  // Create overlay for modal
  createOverlay();

  // Add animation to the curves
  animateCurves();
}

function setupCropButtons() {
  const cropButtons = document.querySelectorAll(".crop-btn");

  cropButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cropType = this.getAttribute("data-crop");
      showCropInfo(cropType);

      // Remove active class from all buttons
      cropButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");
    });
  });
}

function setupClosePanel() {
  const closeButton = document.getElementById("closePanel");
  closeButton.addEventListener("click", hideCropInfo);
}

function addTableHoverEffects() {
  const tableCells = document.querySelectorAll(".soil-table td");

  tableCells.forEach((cell) => {
    cell.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f9f0";
    });

    cell.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });
}

function setupNavButtons() {
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // For demo purposes, just show an alert with the button name
      const buttonText = this.textContent.trim();
      alert(`${buttonText} 버튼이 클릭되었습니다.`);
    });
  });
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  overlay.addEventListener("click", hideCropInfo);
}

function showCropInfo(cropType) {
  const panel = document.getElementById("cropInfoPanel");
  const overlay = document.querySelector(".overlay");
  const cropTitle = document.getElementById("cropTitle");
  const cropImage = document.getElementById("cropImage");
  const cropDescription = document.getElementById("cropDescription");
  const nutrientChart = document.getElementById("nutrientChart");
  const seasonChart = document.getElementById("seasonChart");

  // Set crop information based on type
  const cropInfo = getCropInfo(cropType);

  cropTitle.textContent = cropInfo.name;
  cropImage.style.backgroundImage = `url(${cropInfo.image})`;
  cropDescription.textContent = cropInfo.description;

  // Create nutrient chart
  createNutrientChart(nutrientChart, cropInfo.nutrients);

  // Create season chart
  createSeasonChart(seasonChart, cropInfo.seasons);

  // Show panel and overlay
  panel.style.display = "block";
  overlay.style.display = "block";

  // Add animation
  panel.style.animation = "fadeIn 0.3s ease";
}

function hideCropInfo() {
  const panel = document.getElementById("cropInfoPanel");
  const overlay = document.querySelector(".overlay");

  panel.style.animation = "fadeOut 0.3s ease";

  setTimeout(() => {
    panel.style.display = "none";
    overlay.style.display = "none";
  }, 300);
}

function getCropInfo(cropType) {
  // Mock data for different crops
  const cropData = {
    potato: {
      name: "감자 (Potato)",
      image:
        "https://via.placeholder.com/600x300/f0f0f0/333333?text=감자+(Potato)",
      description:
        "감자는 서늘한 기후에서 잘 자라는 작물로, 토양의 산도(pH)가 5.0~6.5 정도일 때 가장 잘 자랍니다. 질소, 인, 칼륨이 균형 있게 필요하며, 특히 칼륨이 많이 필요합니다. 감자는 봄과 가을에 심을 수 있으며, 심은 후 약 3~4개월 후에 수확할 수 있습니다.",
      nutrients: {
        N: 60,
        P: 70,
        K: 90,
        Ca: 40,
        Mg: 50,
        Fe: 30,
        Mn: 60,
        Zn: 80,
      },
      seasons: {
        planting: [3, 4, 5, 9, 10],
        harvesting: [6, 7, 8, 12],
      },
    },
    ginger: {
      name: "생강 (Ginger)",
      image:
        "https://via.placeholder.com/600x300/f0f0f0/333333?text=생강+(Ginger)",
      description:
        "생강은 따뜻한 기후에서 잘 자라는 작물로, 토양의 산도(pH)가 5.5~6.5 정도일 때 가장 잘 자랍니다. 유기물이 풍부한 토양을 좋아하며, 배수가 잘 되는 토양이 좋습니다. 생강은 봄에 심어 가을에 수확하는 것이 일반적입니다.",
      nutrients: {
        N: 70,
        P: 60,
        K: 80,
        Ca: 50,
        Mg: 70,
        Fe: 40,
        Mn: 50,
        Zn: 60,
      },
      seasons: {
        planting: [3, 4, 5],
        harvesting: [10, 11],
      },
    },
    garlic: {
      name: "마늘 (Garlic)",
      image:
        "https://via.placeholder.com/600x300/f0f0f0/333333?text=마늘+(Garlic)",
      description:
        "마늘은 서늘한 기후에서 잘 자라는 작물로, 토양의 산도(pH)가 6.0~7.0 정도일 때 가장 잘 자랍니다. 유기물이 풍부한 토양을 좋아하며, 배수가 잘 되는 토양이 좋습니다. 마늘은 가을에 심어 이듬해 봄이나 초여름에 수확하는 것이 일반적입니다.",
      nutrients: {
        N: 50,
        P: 80,
        K: 70,
        Ca: 60,
        Mg: 40,
        Fe: 50,
        Mn: 40,
        Zn: 50,
      },
      seasons: {
        planting: [9, 10, 11],
        harvesting: [5, 6, 7],
      },
    },
  };

  return cropData[cropType];
}

function createNutrientChart(container, nutrients) {
  // Clear previous content
  container.innerHTML = "";

  // Create a bar chart for nutrients
  const chartHtml = `
      <div class="nutrient-bars">
        ${Object.entries(nutrients)
          .map(
            ([nutrient, value]) => `
          <div class="nutrient-bar-container">
            <div class="nutrient-label">${nutrient}</div>
            <div class="nutrient-bar-wrapper">
              <div class="nutrient-bar" style="width: ${value}%"></div>
            </div>
            <div class="nutrient-value">${value}%</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

  container.innerHTML = chartHtml;

  // Add styles for the chart
  const style = document.createElement("style");
  style.textContent = `
      .nutrient-bars {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .nutrient-bar-container {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .nutrient-label {
        width: 30px;
        font-weight: bold;
        text-align: center;
      }
      
      .nutrient-bar-wrapper {
        flex: 1;
        height: 15px;
        background-color: #f0f0f0;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .nutrient-bar {
        height: 100%;
        background-color: #0a6e1f;
        border-radius: 10px;
        transition: width 1s ease;
      }
      
      .nutrient-value {
        width: 40px;
        text-align: right;
      }
    `;

  document.head.appendChild(style);
}

function createSeasonChart(container, seasons) {
  // Clear previous content
  container.innerHTML = "";

  // Create a month chart for planting and harvesting seasons
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const chartHtml = `
      <div class="season-chart-container">
        <div class="season-labels">
          <div class="season-label">파종</div>
          <div class="season-label">수확</div>
        </div>
        <div class="season-months">
          ${months
            .map(
              (month, index) => `
            <div class="season-month">
              <div class="month-label">${month}</div>
              <div class="month-indicators">
                <div class="planting-indicator ${
                  seasons.planting.includes(index + 1) ? "active" : ""
                }"></div>
                <div class="harvesting-indicator ${
                  seasons.harvesting.includes(index + 1) ? "active" : ""
                }"></div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

  container.innerHTML = chartHtml;

  // Add styles for the chart
  const style = document.createElement("style");
  style.textContent = `
      .season-chart-container {
        display: flex;
        margin-top: 10px;
      }
      
      .season-labels {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-right: 10px;
      }
      
      .season-label {
        height: 20px;
        display: flex;
        align-items: center;
        font-size: 12px;
      }
      
      .season-months {
        display: flex;
        flex: 1;
        overflow-x: auto;
      }
      
      .season-month {
        min-width: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .month-label {
        font-size: 12px;
        margin-bottom: 5px;
      }
      
      .month-indicators {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .planting-indicator, .harvesting-indicator {
        width: 30px;
        height: 20px;
        background-color: #f0f0f0;
        border-radius: 3px;
      }
      
      .planting-indicator.active {
        background-color: #4CAF50;
      }
      
      .harvesting-indicator.active {
        background-color: #FFC107;
      }
    `;

  document.head.appendChild(style);
}

function animateCurves() {
  // Add subtle animation to the curves
  const curves = document.querySelectorAll(
    ".curve-top, .curve-bottom, .red-curve"
  );

  curves.forEach((curve) => {
    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
        @keyframes floatCurve {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `;
    document.head.appendChild(style);

    // Apply animation
    curve.style.animation = "floatCurve 8s ease-in-out infinite";
  });
}

// Add keyframe animations
const animationStyle = document.createElement("style");
animationStyle.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, -40%); }
      to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: translate(-50%, -50%); }
      to { opacity: 0; transform: translate(-50%, -60%); }
    }
  `;
document.head.appendChild(animationStyle);

// Highlight specific nutrients in the table based on crop selection
function highlightNutrients(cropType) {
  // Reset all highlights
  const tableCells = document.querySelectorAll(".soil-table td");
  tableCells.forEach((cell) => cell.classList.remove("highlight"));

  // Highlight specific nutrients based on crop type
  const highlightMap = {
    potato: [2, 6, 7], // K, Mn, Zn
    ginger: [0, 4, 5], // N, Mg, Fe
    garlic: [1, 3, 7], // P, Ca, Zn
  };

  if (highlightMap[cropType]) {
    const rowCells = document.querySelectorAll(
      ".soil-table tbody tr:first-child td"
    );
    highlightMap[cropType].forEach((index) => {
      if (rowCells[index]) {
        rowCells[index].classList.add("highlight");
      }
    });
  }
}

// Add event listener to highlight nutrients when crop buttons are clicked
document.querySelectorAll(".crop-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const cropType = this.getAttribute("data-crop");
    highlightNutrients(cropType);
  });
});
