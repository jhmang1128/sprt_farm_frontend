///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// header
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const url_base_django = 'http://127.0.0.1:8000/'

////////////////////////////////////////////////////////////
// nav
////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// body
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Location Info
////////////////////////////////////////////////////////////

// text_box
const text_box_01 = document.getElementById('text_box_01');
const text_search_value = sessionStorage.getItem('text_search_value');
text_box_01.textContent = text_search_value;


// url
const url_get_address = url_base_django + 'chatbot/address/';
const url_get_soil_info = url_base_django + 'chatbot/soildata/';
const url_get_recommended_crop = url_base_django + 'chatbot/recommendation/';


// PNU 코드 및 좌표 값 추출 ✅
const type_parcel = 'PARCEL'
const url_qs_address = `${url_get_address}?address=${text_search_value}&type=${type_parcel}`;


async function fetchData() {
  try {
    const response = await fetch(url_qs_address);
    const response_data = await response.json();
    
    const PNU_code = response_data["address_information"]["id"];
    const address = response_data["address_information"]["address"]["parcel"];
    // const address = response_data["address_information"]["address"]["road"];
    const x = response_data["address_information"]["point"]["x"];
    const y = response_data["address_information"]["point"]["y"];

    
    
    // 작물 재배 토양 환경 정보 ⛔
    const url_qs_soil = `${url_get_soil_info}?PNU_Code=${PNU_code}`;
    console.log(url_qs_soil);


    // "BJD_Code": "법정동코드",
    // "PNU_Code": "지번코드",
    // "Any_Year": "시료채취년도",
    // "Exam_Day": "토양검정일",
    // "Exam_Type": "경지구분코드",
    // "PNU_Nm": "대상지 지번주소",
    // "ACID": "산도",
    // "VLDPHA": "유효인산",
    // "VLDSIA": "유효규산",
    // "OM": "유기물",
    // "POSIFERT_MG": "마그네슘",
    // "POSIFERT_K": "칼륨",
    // "POSIFERT_CA": "칼슘",
    // "SELC": "전기전도도"


    // 작물 추천 ⛔
    const url_qs_rec_crop = `${url_get_recommended_crop}?PNU_Code=${PNU_code}`;
    console.log(url_qs_rec_crop);

    
    // return response_data;

    ////////////////////////////////////////////////////////////
    // Soil Analysis Table
    ////////////////////////////////////////////////////////////

  } catch (err) {
    console.log('error', err);
  }
}
fetchData();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// 김요한
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      window.location.href = "03_crop_mate.html";
    });
  }
});
  
  