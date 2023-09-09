// 회원가입부분 체크

function signUpCheck(){

let userID = document.getElementById("userID") .value 
let email = document.getElementById("email").value
let name = document.getElementById("name").value
let userPWD = document.getElementById("userPWD").value
let userPWDCHK = document.getElementById("userPWDCHK").value
let check = true;



// 아이디 입력확인
if(userID===""){
  document.getElementById("userIDError").innerHTML="아이디가 올바르지 않습니다." //아이디가 하나도 입력이 안됐을시
  check = false
}else{
  document.getElementById("userIDError").innerHTML=""
}

// 이메일확인
if(email.includes('@')){
  let emailId = email.split('@')[0]
  let emailServer = email.split('@')[1]
  if(emailId === "" || emailServer === ""){
    document.getElementById("emailError").innerHTML="이메일이 올바르지 않습니다."//이메일 입력 기본형식 
    check = false
  }
  else{
    document.getElementById("emailError").innerHTML=""
  }
}else{
  document.getElementById("emailError").innerHTML="이메일이 올바르지 않습니다."
  check = false
}


// 이름확인
if(name===""){
  document.getElementById("nameError").innerHTML="이름을 적어주십시오"
  check = false
}else{
  document.getElementById("nameError").innerHTML=""
}


// 비밀번호 확인
if(userPWD !== userPWDCHK){
  document.getElementById("PWDError").innerHTML=""
  document.getElementById("PWDCHKError").innerHTML="비밀번호가 동일하지 않습니다."
  check = false
}else{
  document.getElementById("PWDError").innerHTML=""
  document.getElementById("PWDCHKError").innerHTML=""
}

if(userPWD===""){
  document.getElementById("PWDError").innerHTML="비밀번호를 입력해주세요."
  check = false
}else{
  //document.getElementById("passwordError").innerHTML=""
}
if(userPWDCHK===""){
  document.getElementById("PWDCHKError").innerHTML="비밀번호를 다시 입력해주세요."
  check = false
}else{
  //document.getElementById("passwordCheckError").innerHTML=""
}



if(check){
  document.getElementById("userIDError").innerHTML=""
  document.getElementById("emailError").innerHTML=""
  document.getElementById("nameError").innerHTML=""
  document.getElementById("PWDError").innerHTML=""
  document.getElementById("PWDCHKError").innerHTML=""
  
  
  //비동기 처리이벤트
  setTimeout(function() {
    alert("반갑습니다. 회원가입이 완료되었습니다.")
},location.href = 'index.html');
}
}



//휴대폰 인증
function changePhone1(){
  const phone1 = document.getElementById("phone1").value // 010
  if(phone1.length === 3){
      document.getElementById("phone2").focus();
  }
}
function changePhone2(){
  const phone2 = document.getElementById("phone2").value // 010
  if(phone2.length === 4){
      document.getElementById("phone3").focus();
  }
}
function changePhone3(){
  const phone3 = document.getElementById("phone3").value // 010
  if(phone3.length === 4){
    document.getElementById("sendMessage").focus();
    document.getElementById("sendMessage").setAttribute("style","background-color:#ffcc01;")
    document.getElementById("sendMessage").disabled = false;
  }
}

// 문자인증+타이머 부분
function initButton(){
document.getElementById("sendMessage").disabled = true;
document.getElementById("completion").disabled = true;
document.getElementById("certificationNumber").innerHTML = "000000";
document.getElementById("timeLimit").innerHTML = "03:00";
document.getElementById("sendMessage").setAttribute("style","background-color:none;")
document.getElementById("completion").setAttribute("style","background-color:none;")
}

let processID = -1;

const getToken = () => {



// 인증확인 버튼 활성화
document.getElementById("completion").setAttribute("style","background-color:#ffcc01;")
document.getElementById("completion").disabled = false;

if (processID != -1) clearInterval(processID);
const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
document.getElementById("certificationNumber").innerText = token;
let time = 180;
processID = setInterval(function () {
  if (time < 0 || document.getElementById("sendMessage").disabled) {
    clearInterval(processID);
    initButton();
    return;
  }
  let mm = String(Math.floor(time / 60)).padStart(2, "0");
  let ss = String(time % 60).padStart(2, "0");
  let result = mm + ":" + ss;
  document.getElementById("timeLimit").innerText = result;
  time--;
}, 50);
};

function checkCompletion(){
alert("문자 인증이 완료되었습니다.")
initButton();
document.getElementById("completion").innerHTML="인증완료"
document.getElementById("signupbtn").disabled = false;
}



//주소 검색
function sample6_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
           
          
          } else {
              document.getElementById("sample6_extraAddress").value = '';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
      }
  }).open();
}



//메뉴 팝업창 열기 닫기
$(function(){
	$(".gnb_item>ul>li>a>img").click(function(){
		$("#modal").fadeIn();
	});

	$("#popup_menu .closeBtn>img").click(function(){
		$("#modal").fadeOut();
	});
});


//모바일 메뉴 팝업창
$(function () {
	$(".m_modal").hide();
	$(".m_header>.mobile-item>img").click(function () {
		$(".m_modal").fadeToggle(300);
	});
	// 왼쪽메뉴 드롭다운
	$(".m_popup_menu ul.small_menu").hide();
	$(".m_popup_menu ul.big_menu").click(function () {
		$("ul", this).slideToggle(300);
	});
	$('.m_modal>.m_popup_menu>img').on('click', function () {
		$('.m_modal').fadeOut();
	});

});