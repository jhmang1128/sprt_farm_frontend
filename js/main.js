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
  document.addEventListener("DOMContentLoaded", function () {
    // 주소 입력 필드와 버튼 요소 가져오기
    const addressInput = document.getElementById("address-input");
    const fetchButton = document.getElementById("fetch-button");
    const resultDiv = document.getElementById("result");

    // 버튼 클릭 시 데이터 요청
    fetchButton.addEventListener("click", function () {
        const address = addressInput.value;
        if (!address) {
            alert("주소를 입력하세요.");
            return;
        }

        // Django 백엔드 API 호출
        fetch(`/api/soil_recommendation?address=${encodeURIComponent(address)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    resultDiv.innerHTML = `<p style="color: red;">오류: ${data.error}</p>`;
                } else {
                    // 추천 작물 리스트 출력
                    resultDiv.innerHTML = "<h3>추천 작물</h3>";
                    data.recommendations.forEach(crop => {
                        resultDiv.innerHTML += `
                            <div>
                                <h4>${crop.crop}</h4>
                                <p>추천 이유: ${crop.reason}</p>
                            </div>
                        `;
                    });
                }
            })
            .catch(error => {
                resultDiv.innerHTML = `<p style="color: red;">에러 발생: ${error.message}</p>`;
            });
    });
});

});
