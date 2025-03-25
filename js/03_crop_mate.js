document.addEventListener("DOMContentLoaded", function () {
  // Highlight deficient nutrients
  highlightDeficientNutrients();

  // Add hover effect to calendar cells
  addCalendarHoverEffects();

  // Add click handlers for navigation buttons
  setupNavButtons();

  // Add crop selection functionality
  setupCropSelection();
});

function highlightDeficientNutrients() {
  // This function would compare actual soil values with required values
  // and highlight deficiencies. For demo purposes, we're using the
  // pre-highlighted values from the HTML.

  const highlightedCells = document.querySelectorAll(".highlight");

  // Add a subtle animation to the highlighted cells
  highlightedCells.forEach((cell) => {
    cell.style.transition = "background-color 0.3s ease";

    // Pulse animation
    let isPulsing = false;
    setInterval(() => {
      if (isPulsing) {
        cell.style.backgroundColor = "";
      } else {
        cell.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      }
      isPulsing = !isPulsing;
    }, 1000);
  });
}

function addCalendarHoverEffects() {
  const calendarCells = document.querySelectorAll(".calendar-cell");

  calendarCells.forEach((cell) => {
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

function setupCropSelection() {
  // This would be used to switch between different crops
  // For demo purposes, we'll add a simple crop selector

  const mainContent = document.querySelector(".main-content");
  const cropSelector = document.createElement("div");
  cropSelector.className = "crop-selector";
  cropSelector.innerHTML = `
      <label for="crop-select">작물 선택:</label>
      <select id="crop-select">
        <option value="potato" selected>감자</option>
        <option value="garlic">마늘</option>
        <option value="ginger">생강</option>
        <option value="cabbage">배추</option>
      </select>
    `;

  // Style the selector
  cropSelector.style.position = "absolute";
  cropSelector.style.top = "10px";
  cropSelector.style.left = "20px";
  cropSelector.style.padding = "8px";
  cropSelector.style.backgroundColor = "white";
  cropSelector.style.border = "1px solid #ddd";
  cropSelector.style.borderRadius = "4px";
  cropSelector.style.zIndex = "10";

  mainContent.appendChild(cropSelector);

  // Add event listener to the select element
  const cropSelect = document.getElementById("crop-select");
  cropSelect.addEventListener("change", function () {
    const selectedCrop = this.value;
    const analysisTitle = document.querySelector(".analysis-title");

    // Update the analysis title based on the selected crop
    if (analysisTitle) {
      const cropNames = {
        potato: "감자",
        garlic: "마늘",
        ginger: "생강",
        cabbage: "배추",
      };

      analysisTitle.textContent = `${cropNames[selectedCrop]}에 필요한 속성들입니다.`;

      // This would typically update the table values as well
      // For demo purposes, we're just changing the title
    }
  });
}

// Function to simulate crop growth visualization
// This would be called when a user wants to see a growth simulation
function simulateCropGrowth() {
  const calendarCells = document.querySelectorAll(".calendar-cell");

  // Reset all cells
  calendarCells.forEach((cell) => {
    if (cell.querySelector(".progress-bar")) {
      cell.querySelector(".progress-bar").remove();
    }
  });

  // Define growth periods (for demo purposes)
  const growthPeriods = [
    { month: 3, duration: 3 }, // March-May
    { month: 9, duration: 3 }, // September-November
  ];

  growthPeriods.forEach((period) => {
    for (let i = 0; i < period.duration; i++) {
      const monthIndex = period.month + i - 1; // 0-based index
      const cellsForMonth = document.querySelectorAll(
        `.calendar-cell:nth-child(${
          monthIndex + 1 + 12 * Math.floor(monthIndex / 12)
        })`
      );

      cellsForMonth.forEach((cell) => {
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.width = `${((i + 1) / period.duration) * 100}%`;
        cell.appendChild(progressBar);
      });
    }
  });
}

// Add a button to trigger the simulation
setTimeout(() => {
  const mainContent = document.querySelector(".main-content");
  const simulateButton = document.createElement("button");
  simulateButton.textContent = "작물 성장 시뮬레이션";
  simulateButton.style.position = "absolute";
  simulateButton.style.top = "10px";
  simulateButton.style.right = "20px";
  simulateButton.style.padding = "8px 16px";
  simulateButton.style.backgroundColor = "#0a6e1f";
  simulateButton.style.color = "white";
  simulateButton.style.border = "none";
  simulateButton.style.borderRadius = "4px";
  simulateButton.style.cursor = "pointer";
  simulateButton.style.zIndex = "10";

  simulateButton.addEventListener("click", simulateCropGrowth);
  mainContent.appendChild(simulateButton);
}, 1000);
