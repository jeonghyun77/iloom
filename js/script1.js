//로그인 
function create_id() {
	var id = document.querySelector('#userID');
	var pw = document.querySelector('#userPWD');

	if(!id.value) {
		alert("아이디를 입력해주세요.")
		id.focus();
		return
	}
	if(!pw.value){
		alert('비밀번호를 입력해주세요.')
		pw.focus();
		return
	}
	else{
		location.href = 'index.html';
	}
}

//더보기 버튼
$(function(){
	$('.button-m').slice(0,1).show();
	$('.more-bnt').click(function(e){
		e.preventDeafault();
		$
	})
});







//팝업창jquery

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