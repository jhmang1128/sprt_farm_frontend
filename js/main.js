// Simple JavaScript for dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  // You could add JavaScript here for interactive elements
  // For example, to handle the calendar date selection
  const dates = document.querySelectorAll(".date");
  dates.forEach((date) => {
    date.addEventListener("click", function () {
      dates.forEach((d) => (d.style.backgroundColor = ""));
      this.style.backgroundColor = "#e5e7eb";
    });
  });
  //backend 연결하는 코드가 들어가면 됨됨 (fetch and axios)
});
