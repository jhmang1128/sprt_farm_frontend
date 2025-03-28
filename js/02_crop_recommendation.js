////////////////////////////////////////////////////////////////////////////////////////////////
// Location Info
////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

  // text_box
  const text_search_address = sessionStorage.getItem('text_search_value');
  document.getElementById('text_box_01').textContent = text_search_address;


  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Soil Analysis Table
  ////////////////////////////////////////////////////////////////////////////////////////////////

  // url
  const API_BASE_URL = 'https://api.aicropmate.com';

  const url_get_address = API_BASE_URL + '/chatbot/address/';
  const url_qs_add_to_soil = API_BASE_URL + '/chatbot/add_to_soil/';
  const url_qs_add_to_crop = API_BASE_URL + '/chatbot/add_to_crop/';


  // PNU 코드 및 좌표 값 추출 ✅
  const type_parcel = 'PARCEL';
  const url_qs_address = `${url_get_address}?address=${text_search_address}&type=${type_parcel}`;



  // 작물 재배 토양 환경 정보 ✅
  const url_qs_soil = `${url_qs_add_to_soil}?address=${text_search_address}&type=${type_parcel}`;

  async function get_soil_info() {
    try {
      const res_soil = await fetch(url_qs_soil);
      const json_soil = await res_soil.json();
      
      // 토지 영양 테이블 값
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

  async function get_crop() {
    try {
      const res_crop = await fetch(url_qs_crop);
      const json_crop = await res_crop.json();

      // 추천 1
      try {
        document.getElementById('btn_crop_01').textContent = json_crop["recommendations"][0]["crop"];
        document.getElementById('p_crop_01').textContent = json_crop["recommendations"][0]["reason"];
      } catch (err) {
        document.getElementById('btn_crop_01').textContent = "";
        document.getElementById('p_crop_01').textContent = "추천된 작물이 없습니다.";
        console.log('error : crop 01 :', err);
      }

      // 추천 2
      try {
        document.getElementById('btn_crop_02').textContent = json_crop["recommendations"][1]["crop"];
        document.getElementById('p_crop_02').textContent = json_crop["recommendations"][1]["reason"];
      } catch (err) {
        document.getElementById('btn_crop_02').textContent = "";
        document.getElementById('p_crop_02').textContent = "";
        console.log('error : crop 02 :', err);
      }
      
      // 추천 3
      try {
        document.getElementById('btn_crop_03').textContent = json_crop["recommendations"][2]["crop"];
        document.getElementById('p_crop_03').textContent = json_crop["recommendations"][2]["reason"];
      } catch (err) {
        document.getElementById('btn_crop_03').textContent = "";
        document.getElementById('p_crop_03').textContent = "";
        console.log('error : crop 03 :', err);
      }

    } catch (err) {
      console.log('error', err);
    }
  }
  get_crop();
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // iframe - 농사로 페이지 로드
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const categorySelect = document.getElementById("category-select");
  const cropSelect = document.getElementById("crop-select");
  const iframe = document.getElementById("crop-info-frame");

  let categoryData = {}; // 대분류: [소분류]
  let cropLinkMap = {}; // "밭농사 - 감자": "링크"

  // ✅ 1. 두 API 호출 (드롭다운 + 링크 맵)
  Promise.all([
    fetch(API_BASE_URL + "/crawled_data/get-crop-options/").then((res) =>
      res.json()
    ),
    fetch(API_BASE_URL + "/crawled_data/get-links/").then((res) =>
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

