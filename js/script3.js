
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
    document.getElementById("sendMessage").setAttribute("style","background-color:gray;")
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
document.getElementById("completion").setAttribute("style","background-color:gray;")
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


// 가입부분 체크

function signUpCheck(){

let userID = document.getElementById("userID").value
let email = document.getElementById("email").value
let name = document.getElementById("name").value
let userPWD = document.getElementById("userPWD").value
let userPWDCHK = document.getElementById("userPWDCHK").value
let check = true;



// 아이디 확인
if(name===""){
  document.getElementById("userIDError").innerHTML="아이디가 올바르지 않습니다."
  check = false
}else{
  document.getElementById("userIDError").innerHTML=""
}

// 이메일확인
if(email.includes('@')){
  let emailId = email.split('@')[0]
  let emailServer = email.split('@')[1]
  if(emailId === "" || emailServer === ""){
    document.getElementById("emailError").innerHTML="이메일이 올바르지 않습니다."
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
  document.getElementById("nameError").innerHTML="이름이 올바르지 않습니다."
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
    alert("가입이 완료되었습니다.")
},location.href = 'main.html');
}
}


//주소 검색
function execPostCode() {
  new daum.Postcode({
      oncomplete: function(data) {
         // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

         // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
         // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
         var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
         var extraRoadAddr = ''; // 도로명 조합형 주소 변수

         // 법정동명이 있을 경우 추가한다. (법정리는 제외)
         // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
         if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
             extraRoadAddr += data.bname;
         }
         // 건물명이 있고, 공동주택일 경우 추가한다.
         if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
         }
         // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
         if(extraRoadAddr !== ''){
             extraRoadAddr = ' (' + extraRoadAddr + ')';
         }
         // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
         if(fullRoadAddr !== ''){
             fullRoadAddr += extraRoadAddr;
         }

         // 우편번호와 주소 정보를 해당 필드에 넣는다.
         console.log(data.zonecode);
         console.log(fullRoadAddr);
         
         
         $("[#addr1]").val(data.zonecode);
         $("[#addr2]").val(fullRoadAddr);
         
         /* document.getElementById('signUpUserPostNo').value = data.zonecode; //5자리 새우편번호 사용
         document.getElementById('signUpUserCompanyAddress').value = fullRoadAddr;
         document.getElementById('signUpUserCompanyAddressDetail').value = data.jibunAddress; */
     }
  }).open();
}




//팝업창

$(function(){
	$(".gnb_item>ul>li>a>img").click(function(){
		$("#modal").fadeIn();
	});

	$("#popup_menu .closeBtn>img").click(function(){
		$("#modal").fadeOut();
	});
});


//모바일 팝업창
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