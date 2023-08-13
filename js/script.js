//스와이퍼
var Swiper = new Swiper(".mySwiper", {

	//loop:true,
	spaceBetween: 30,
	slidePreView: 1,
	centeredSlides:true,
	slideToClickSlide: true,
	autoplay:{ //자동슬라이드(false-비활성화)
		delay:3500, //시간설정
		disableOnlnteraction:false, //false-스와이프 후 자동재생
	},
	loop:true, //슬라이드 반복 여부
	loopAdditionalSlide:1,
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
  });
	  
//메뉴 버튼
$('.tablet-btn').on({click:function(){
	$('.tablet-nav').slideToggle(1000);
	$('.tablet-btn>span').to
}});




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







