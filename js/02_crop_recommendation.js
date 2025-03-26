///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// header
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
const text_search_address = sessionStorage.getItem('text_search_value');
document.getElementById('text_box_01').textContent = text_search_address;

////////////////////////////////////////////////////////////
// Soil Analysis Table
////////////////////////////////////////////////////////////

// url
const url_base_django = 'http://127.0.0.1:8000/';
const url_base_chatbot = 'http://127.0.0.1:8000/chatbot/';

const url_get_address = url_base_chatbot + 'address/';
const url_qs_add_to_soil = url_base_chatbot + 'add_to_soil/';
const url_qs_add_to_crop = url_base_chatbot + 'add_to_crop/';


// PNU 코드 및 좌표 값 추출 ✅
const type_parcel = 'PARCEL';
const url_qs_address = `${url_get_address}?address=${text_search_address}&type=${type_parcel}`;



// 작물 재배 토양 환경 정보 ✅
const url_qs_soil = `${url_qs_add_to_soil}?address=${text_search_address}&type=${type_parcel}`;
console.log(url_qs_soil);

async function get_soil_info() {
  try {
    const res_soil = await fetch(url_qs_soil);
    const json_soil = await res_soil.json();
    
    // 토양 영양 테이블 값
    document.getElementById('sn_01').textContent = json_soil["soil_data"]["PNU_Code"];
    document.getElementById('sn_02').textContent = json_soil["soil_data"]["Exam_Day"];
    document.getElementById('sn_03').textContent = json_soil["soil_data"]["ACID"];
    document.getElementById('sn_04').textContent = json_soil["soil_data"]["OM"];
    document.getElementById('sn_05').textContent = json_soil["soil_data"]["VLDPHA"];
    document.getElementById('sn_06').textContent = json_soil["soil_data"]["POSIFERT_K"];
    document.getElementById('sn_07').textContent = json_soil["soil_data"]["POSIFERT_CA"];
    document.getElementById('sn_08').textContent = json_soil["soil_data"]["POSIFERT_MG"];
    document.getElementById('sn_09').textContent = json_soil["soil_data"]["SELC"];
    document.getElementById('sn_10').textContent = json_soil["soil_data"]["VLDSIA"];


  } catch (err) {
    console.log('error', err);
  }
}
get_soil_info();


// 작물 추천 ✅
const url_qs_crop = `${url_qs_add_to_crop}?address=${text_search_address}&type=${type_parcel}`;
console.log(url_qs_crop);

async function get_crop() {
  try {
    const res_crop = await fetch(url_qs_crop);
    const json_crop = await res_crop.json();

    console.log(json_crop);
    console.log(json_crop["recommendations"][0]);
    console.log(json_crop["recommendations"][0]["crop"]);


    document.getElementById('btn_crop_01').innerText = json_crop["recommendations"][0]["crop"];
    document.getElementById('btn_crop_02').innerText = json_crop["recommendations"][1]["crop"];
    document.getElementById('btn_crop_03').innerText = json_crop["recommendations"][2]["crop"];


  } catch (err) {
    console.log('error', err);
  }
}
get_crop();




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
  
  