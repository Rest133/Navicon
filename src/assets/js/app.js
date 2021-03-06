if ($(document).ready((function () {
    $(".header__menu").click((function () {
        $(".header__burger").toggleClass("open"), $(".menu").toggleClass("open")
    })), $(".arrow-up").click((function () {
        $("html, body").animate({scrollTop: 0}, 1e3)
    })), $(".footer__point").click((function () {
        $(".footer__point").removeClass("active"), $(".adress").removeClass("active"), $(this).addClass("active"), $(".adress[data-city=" + $(this).attr("data-city") + "]").addClass("active")
    })), $(".video-btn").click((function () {
        let e = $("#" + $(this).attr("data-video"));
        e.get(0).paused ? (e.get(0).play(), $(this).html('<img src="assets/img/svg/pause.svg" alt="pause">')) : (e.get(0).pause(), $(this).html('<img src="assets/img/svg/play.svg" alt="play">'))
    }));
    let e = $(".main-page__project-wrapper").offset().top, a = $(".main-page__project-wrapper").outerHeight(),
        r = $(".header").offset().top;
    r > e && r < e + a ? ($(".header").removeClass("fixed"), $(".header").addClass("fixed-white")) : ($(".header").removeClass("fixed"), $(".header").removeClass("fixed-white")), $(document).scroll((function () {
        let e = $(".main-page__project-wrapper").offset().top, a = $(".main-page__project-wrapper").outerHeight(),
            r = $(".header").offset().top;
        r > e && r < e + a ? ($(".header").removeClass("fixed"), $(".header").addClass("fixed-white")) : ($(".header").addClass("fixed"), $(".header").removeClass("fixed-white")), 0 === $(".header").offset().top && $(".header").removeClass("fixed")
    }));
    var t = document.getElementById("typewriter");
    new Typewriter(t, {
        loop: !0,
        delay: 75,
        cursorClassName: "typewriter__cursor"
    }).pauseFor(5e3).typeString("Формирование подхода для качественного обслуживания клиентов").pauseFor(5e3).deleteAll().pauseFor(5e3).typeString("Главным фактором в поддержании качественного обслуживания клиентов является культура компании").pauseFor(5e3).deleteAll().pauseFor(5e3).typeString("Обслуживание клиентов – это процесс, действующий в рамках более крупного процесса, которым является организация").pauseFor(5e3).deleteAll().pauseFor(5e3).start(), console.log($(".swiper-slide:nth-child(5n)"))
})), $(".brand-slider").length > 0) {
    new Swiper(".brand-slider", {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {nextEl: ".brand-slider-next", prevEl: ".brand-slider-prev"},
        pagination: {el: ".brand-slider-pagination", clickable: !0},
        breakpoints: {
            320: {slidesPerView: 2, slidesPerColumn: 2, spaceBetween: 10},
            1024: {slidesPerView: 5, slidesPerColumn: 1, spaceBetween: 30}
        }
    })
}
if ($(".reach-slider").length > 0) {
    new Swiper(".reach-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {nextEl: ".reach-slider-btn-next", prevEl: ".reach-slider-btn-prev"},
        pagination: {el: ".reach-slider-pagination", clickable: !0},
        breakpoints: {
            320: {slidesPerView: "auto", freeMode: !0, spaceBetween: 20},
            1100: {slidesPerView: "auto", freeMode: !0, spaceBetween: 20}
        }
    })
}
if ($(".history__gallery").length > 0) {
    new Swiper(".history__gallery", {slidesPerView: "auto", spaceBetween: 20, freeMode: !0, loop: !0})
}