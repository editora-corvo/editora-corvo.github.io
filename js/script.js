'use strict';

//VARAIBLES
var obj;
var device_screen_size = "";
var arrBgImage = [];
var timer;
var index = 0;
var color;
var wh = 1300;
var hh = 768;
var current_url = window.location.href;
var firstLoad = true;

//ANIMATIONS
function cssInit(delay, speed) {
    delay += 'ms';
    speed += 'ms';
    return {
        'transition-duration': speed,
        'animation-duration': speed,
        'transition-timing-function': 'ease',
        'transition-delay': delay
    };
}
var animaTimeout = [];
var animaTimeout_2 = [];
var default_anima = "fade-in";
function initAnima(obj) {
    (function ($) {
        var da = $(obj).attr("data-anima");
        var an = $(obj).find(".anima,*[data-anima]");
        var t = $(obj).attr("data-time");
        var ta = $(obj).attr("data-target");
        var tm = $(obj).attr("data-timeline");
        var tmt = $(obj).attr("data-timeline-time");
        var tr = $(obj).attr("data-trigger");
        var len = $(an).length;
        if (da === "default") da = default_anima;
        if (isEmpty(tmt)) tmt = 500;
        if (isEmpty(an)) an = obj;
        $(an).each(function (i) {
            if (!isEmpty($(this).attr("data-anima")) && i === 0) { an = obj; return false; }
        });
        if (!isEmpty(ta)) an = $(ta);
        if (isEmpty(t)) t = 500;
        var time = 0, p = 1;
        if (!isEmpty(tm) && tm === "desc") { time = (len - 1) * tmt; p = -1 };
        var cont = null;
        $(an).each(function (index) {
            var time_now = time;
            if (index === len - 1 && tm === "desc") time_now = 0;
            if (!$(this).hasClass("anima") && an != obj && isEmpty(ta)) {
                cont = this;
            } else {
                if (cont != null && !$.contains(cont, this) || cont === null) {
                    var tobj = this;
                    var pos = $(this).css("position");
                    if (pos != 'absolute' && pos != 'fixed') $(this).css("position", "relative");
                    var aid = Math.random(5) + "";
                    $(tobj).attr("aid", aid);
                    if (animaTimeout.length > 30) {
                        animaTimeout.shift();
                        animaTimeout_2.shift();
                    }
                    animaTimeout.push([aid, setTimeout(function () {
                        $(tobj).css(cssInit(0, 0));
                        var da_ = da;
                        if (!isEmpty($(tobj).attr('class')) && $(tobj).attr('class').indexOf("anima-") != -1) {
                            var arr_a = $(tobj).attr('class').split(" ");
                            for (var i = 0; i < arr_a.length; i++) {
                                if (arr_a[i].indexOf("anima-") != -1) da_ = arr_a[i].replace("anima-", "");
                            }
                        }
                        if (wh < 768 && (isEmpty(tr) || tr === "scroll" || tr === "load")) da_ = "fade-in";
                        animaTimeout_2.push([aid, setTimeout(function () { $(tobj).css(cssInit(0, t)).addClass(da_); $(tobj).css('opacity', '') }, 100)]);
                    }, time_now)]);
                    if (!isEmpty(tm)) time += tmt * p;
                }
            }
        });
    }(jQuery));
}
function outAnima(obj) {
    (function ($) {
        var da = $(obj).attr("data-anima");
        var an = $(obj).find(".anima,*[data-anima]");
        var t = $(obj).attr("data-time");
        var o = $(obj).attr("data-anima-out");
        var ta = $(obj).attr("data-target");
        if (da == "default") da = default_anima;
        if (isEmpty(an)) an = obj;
        if (!isEmpty(ta)) an = $(ta);
        if (isEmpty(t)) t = 500;
        if (isEmpty(o)) o = "back";
        if ((o == "back") || (o == "hide")) {
            var cont = null;
            $(an).each(function () {
                var aid = $(this).attr("aid");
                if (!isEmpty(aid)) {
                    for (var i = 0; i < animaTimeout.length; i++) {
                        if (animaTimeout[i][0] == aid) {
                            clearTimeout(animaTimeout[i][1]);
                        }
                    }
                    for (var i = 0; i < animaTimeout_2.length; i++) {
                        if (animaTimeout_2[i][0] == aid) {
                            clearTimeout(animaTimeout_2[i][1]);
                        }
                    }
                }
                if (!$(this).hasClass("anima") && an != obj) {
                    cont = this;
                } else {
                    if (cont != null && !$.contains(cont, this) || cont == null) {
                        var pos = $(this).css("position");
                        if (pos != 'absolute' && pos != 'fixed') $(this).css("position", "relative");
                        var da_ = da;
                        try {
                            if ($(this).attr('class').indexOf("anima-") != -1) {
                                var arr_a = $(this).attr('class').split(" ");
                                for (var i = 0; i < arr_a.length; i++) {
                                    if (arr_a[i].indexOf("anima-") != -1) da_ = arr_a[i].replace("anima-", "");
                                }
                            }
                        } catch (e) { }
                        $(this).css(cssInit(0, t)).removeClass(da_);
                        var op = parseFloat($(this).css("opacity"));
                        if (op > 0 && op < 1) $(this).css("opacity", 1);
                    }
                }
            });
            if (o == "hide") {
                $(an).css(cssInit(0, t)).css("opacity", 0);
                setTimeout(function () { $(an).css("opacity", 0); }, 400);
            }
        }
    }(jQuery));
}
function setImgPos(n) {
    var t = parseInt($(n).find(".maso img").css("height"), 10),
    i = parseInt($(n).find(".maso").css("height"), 10);
    i < t && $(n).find(".maso img").css("margin-top", "-" + (t - i) / 2 + "px");
}

//OTHERS
window.onload = function () { function a(a, b) { var c = /^(?:file):/, d = new XMLHttpRequest, e = 0; d.onreadystatechange = function () { 4 == d.readyState && (e = d.status), c.test(location.href) && d.responseText && (e = 200), 4 == d.readyState && 200 == e && (a.outerHTML = d.responseText) }; try { d.open("GET", b, !0), d.send() } catch (f) { } } var b, c = document.getElementsByTagName("*"); for (b in c) c[b].hasAttribute && c[b].hasAttribute("data-include") && a(c[b], c[b].getAttribute("data-include")) };

//FUNCTIONS
function openWindow(link, width, height) {
    if (typeof width === 'undefined') width = 550;
    if (typeof height === 'undefined') height = 350;
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    window.open(link, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' + width + ',height=' + height + ', top=' + top + ', left=' + left);
    return false;
}
function changeBG() {
    var objTmp = jQuery(".overlay");
    objTmp.removeClass("fadeOut"); objTmp.css("background-color", color); objTmp.addClass("fadeIn");
    setTimeout(function () {
        if (arrBgImage.length === index) index = 0;
        jQuery("html").css("background-image", "url(" + arrBgImage[index] + ")");
        objTmp.removeClass("fadeIn"); objTmp.addClass("fadeOut");
    }, 1000);
    index = index + 1;
}
function onePageScroll(t) {
    if (!isEmpty(t)) {
        jQuery(t).find('a[href ^= "#"]').on('click', function (e) {
            e.preventDefault();
            var target = this.hash,
            jtarget = jQuery(target);
            if (jtarget.length > 0) {
                if (target.indexOf('collapse') === -1) {
                    try {
                        jQuery('html, body').stop().animate({
                            'scrollTop': (jtarget.offset().top - 150)
                        }, 900, 'swing', function () {
                            window.location.hash = target;
                        });
                    } catch (e) { }
                }
            } else {
                if (target != "#" && target.length > 2 && jQuery(this).closest("header").length) document.location = window.location.protocol + "//" + window.location.host;
            }
        });
    }
}
function getOptionsString(txt, mainArray) {
    var optionsArr = txt.split(",");
    for (var i = 0; i < optionsArr.length; i++) {
        mainArray[optionsArr[i].split(":")[0]] = correctValue(optionsArr[i].split(":")[1]);
    }
    return mainArray;
}
function isEmpty(obj) { if (typeof (obj) !== "undefined" && obj !== null && (obj.length > 0 || typeof (obj) == 'number' || typeof (obj.length) == "undefined") && obj !== "undefined") return false; else return true; }
function correctValue(n) { return typeof n == "number" ? parseFloat(n) : n == "true" ? !0 : n == "false" ? !1 : n }
function isScrollView(t) {
    var tp = jQuery(window).height() * 0.5 + jQuery(window).scrollTop();
    var e = jQuery(t).offset().top;
    if ((e < (tp + 300) || ((jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height())))) return true;
    else return false;
}

//MAIN BLOCK
(function ($) {
    var arrFA = [];

    //FUNCTIONS
    $.fn.toggleClick = function (n) { var t = arguments, r = n.guid || $.guid++, i = 0, u = function (r) { var u = ($._data(this, "lastToggle" + n.guid) || 0) % i; return $._data(this, "lastToggle" + n.guid, u + 1), r.preventDefault(), t[u].apply(this, arguments) || !1 }; for (u.guid = r; i < t.length;) t[i++].guid = r; return this.click(u) };
    $.fn.showAnima = function (a, b) {
        var t = this;
        if (a === "default") a = default_anima;
        $(t).removeClass(a);
        if (!isEmpty(b) && b === "complete") { $(t).attr("data-anima", a).attr("data-trigger", "manual"); initAnima(t); }
        else setTimeout(function () { $(t).css(cssInit(0, 300)).addClass(a); $(t).css('opacity', '') }, 100);
    };
    $.fn.titleFullScreen = function (h) {
        if (!isEmpty(this)) {
            var o = $(this).find(".overlaybox");
            $(this).sizeFullScreen(h);
            if (!($("header").css("position") === "absolute") && !($("header").css("position") === "fixed")) {
                $(this).css("height", $(this).height() - $("header").height() + "px");
            }
            if (!isEmpty(o)) $(o).css("margin-top", "-" + $(o).height() / 2 - 10 + "px");
        }
    }
    $.fn.sizeFullScreen = function (h) {
        if (!isEmpty(this)) {
            var h = $(window).outerHeight() - parseInt($(this).css("margin-top").replace("px", ""), 10) - parseInt($(this).css("margin-bottom").replace("px", ""), 10) - ((isEmpty(h)) ? 0 : parseInt(h, 10));
            if (h > $(this).height()) $(this).css("height", h + "px");
        }
    }
    $.fn.setMiddleBox = function (target) {
        if (isEmpty(target)) target = ".box-middle";
        var t = $(this).find(target);
        var a = parseInt($(this).outerHeight(), 10);
        var b = parseInt($(t).outerHeight(true), 10);
        if (b < a) $(t).css("margin-top", (a - b) / 2 + "px");
    }
    $.fn.scrollTo = function () {
        if (!isEmpty(this)) {
            $('html, body').animate({
                scrollTop: $(this).offset().top - 50
            }, 1000);
        }
    }
    $.fn.expandItem = function () {
        var t = this;
        $(t).css("display", "block").css("height", "");
        var h = $(t).height();
        $(t).css("height", 0).css("opacity", 1);
        $(t).animate({
            height: h
        }, 300, function () { $(t).css("height", "") });
    }
    $.fn.collapseItem = function () {
        var t = this;
        $(t).animate({
            height: 0
        }, 300, function () { $(t).css("display", "none") });
    }
    $.fn.setVideoBgSize = function (hh, wh) {
        var obj = this;
        var cH = hh;
        var cW = wh;
        if ($(this).hasClass("section-bg-video") || $(this).hasClass("header-video")) {
            obj = $(this).find("video");
            cH = $(this).height();
            cW = $(this).width();
        }
        if (wh > 992 && $(this).find("iframe").length) $(this).find(".videobox").css("height", "130%");
        var vidH = $(obj).height();
        var vidW = $(obj).width();

        var proportion = cH / vidH;
        var newWidth = vidW * proportion;
        if (newWidth / vidW > 1 && ($(window).width() < newWidth && vidH < $(this).height() || $(window).width() < 769)) {
            $(obj).css("width", Math.ceil(newWidth) + "px");
            $(obj).css("margin-left", "-" + Math.floor(((newWidth - cW) / 2)) + "px");
        }
        
    }
    $.fn.getHeight = function () {
        if (!isEmpty(this)) return $(this)[0].clientHeight;
        else return 0;
    }
    $.fn.executeFunction = function (functionName,myfunction) {
        var timer;
        if ($(this).length > 0) {
            if (typeof window["jQuery"]["fn"][functionName] === "function" || typeof window[functionName] === "function") {
                myfunction();
            } else {
                timer = setInterval(function () {
                    if (typeof window["jQuery"]["fn"][functionName] === "function" || typeof window[functionName] === "function") {
                        myfunction();
                        clearInterval(timer);
                    }
                }, 300);
            }
        }
    }

    //THIRD PARTS PLUGINS
    //imagesloaded.min.js
    $.fn.renderLoadedImgs = function () {
        if ($.isFunction($.fn.imagesLoaded)) {
            var isIsotope = false;
            var $isotope;
            var imgLoad = imagesLoaded($(this));
            if ($(this).hasClass("maso-box")) { isIsotope = true; $isotope = this; }
            imgLoad.on('progress', function (instance, image) {
                var result = image.isLoaded ? 'loaded' : 'broken';
                var target = "a"
                if ($(image.img).closest("ul.slides").length) target = ".slides li";
                if ($(image.img).closest(".img-box").length) target = ".img-box";
                if ($(image.img).closest(".img-box.thumbnail span img").length) target = "span";
                if ($(image.img).closest("figure").length) target = "figure";
                var cont = $(image.img).closest(target);
                var imgHeight = image.img.clientHeight;
                var colHeight = cont.get(0).clientHeight;
                var imgWidth = image.img.clientWidth;
                var colWidth = cont.get(0).clientWidth;

                if (result == "loaded") {
                    if (isIsotope) {
                        $isotope.isotope('layout');
                        var mi = $(image.img).closest('.maso-item');
                        $(mi).css("visibility", "visible");
                        $(mi).find("> *").animate({ "opacity": 1 }, 300);
                    }
                    if (imgHeight > colHeight) {
                        $(image.img).css("margin-top", "-" + Math.floor(((imgHeight - colHeight) / 2)) + "px");
                    } else {
                        var proportion = colHeight / imgHeight;
                        var newWidth = imgWidth * proportion;
                        if (newWidth / imgWidth > 1) {
                            $(image.img).css("max-width", Math.ceil(newWidth) + "px").css("width", Math.ceil(newWidth) + "px");
                            $(image.img).css("margin-left", "-" + Math.floor(((newWidth - colWidth) / 2)) + "px");
                        }
                    }
                }
            });
        }
    }

    //isotope.min.js
    $.fn.initPagination = function () {
        var opt = $(this).attr("data-options");
        var a = $(this).attr("data-pagination-anima");
        var p = parseInt($(this).attr("data-page-items"), 10);
        var c = $(this).closest(".maso-list");
        var t = $(c).find(".maso-box");
        var items = t.isotope('getItemElements');
        var n = $(items).length;
        var type = "";
        if ($(this).hasClass('load-more-maso')) type = 'load-more';
        if ($(this).hasClass('pagination-maso')) type = 'pagination';

        for (var i = p; i < n; i++) {
            t.isotope('remove', items[i]);
        }
        t.isotope('layout');

        if (type == 'pagination') {
            var optionsArr;
            var options = {
                totalPages: Math.ceil(n / p),
                visiblePages: 7,
                first: "<i class='fa fa-angle-double-left'></i> <span>First</span>",
                last: "<span>Last</span> <i class='fa fa-angle-double-right'></i>",
                next: "<span>Next</span> <i class='fa fa-angle-right'></i>",
                prev: " <i class='fa fa-angle-left'></i> <span>Previous</span>",
                onPageClick: function (event, page) {
                    t.isotope('remove', t.isotope('getItemElements'));
                    for (var i = (p * (page - 1)) ; i < (p * (page)) ; i++) {
                        t.isotope('insert', items[i]);
                    }
                    t.isotope('layout');
                    if (!isEmpty(opt) && opt.indexOf("scrollTop:true") != -1) $(c).scrollTo();
                }
            }
            if (!isEmpty(opt)) {
                optionsArr = opt.split(",");
                options = getOptionsString(opt, options);
            }
            $(this).twbsPagination(options);
        }
        if (type == 'load-more') {
            var tl = this;
            $(tl).click(function (index) {
                loadMoreMaso(this);
            });
            if (!isEmpty(opt) && opt.indexOf("lazyLoad:true") != -1) {
                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                        if (firstLoad) setTimeout(function () { loadMoreMaso(tl) }, 800);
                        else loadMoreMaso(tl);
                    }
                });
            }
        }

        function loadMoreMaso(obj) {
            var page = $(obj).attr("data-current-page");
            if (isEmpty(page)) page = 1;
            page++;
            $(obj).attr("data-current-page", page);
            var s = p * (page - 1);
            var e = p * (page);
            for (var i = s ; i < (p * (page)) ; i++) {
                t.isotope('insert', items[i]);
            }
            t.isotope('layout');
            if ($.isFunction($.fn.renderLoadedImgs)) {
                $(t).renderLoadedImgs();
            }
            if (e >= n) $(obj).hide(300);
        }
    }
    $.fn.initIsotope = function () {
        var m = $(this).find('.maso-box');
        var optionsString = $(this).attr("data-options");
        var optionsArr;
        var options = {
            itemSelector: '.maso-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.maso-item',
            },
            getSortData: {
                number: function (e) {
                    return parseInt(jQuery(e).attr('data-sort'), 10);
                }
            },
            sortBy: 'number'
        }
        if (!isEmpty(optionsString)) {
            optionsArr = optionsString.split(",");
            options = getOptionsString(optionsString, options);
        }
        $(m).isotope(options);
        if ($.isFunction($.fn.renderLoadedImgs)) {
            var items = m.isotope('getItemElements');
            $(m).renderLoadedImgs();
        }
        $(this).find(".pagination-maso,.load-more-maso").initPagination();
    };

    //isotope.min.js
    $.fn.showPopupBanner = function () {
        var t = this;
        var a = $(t).attr("data-popup-anima");
        if (!isEmpty(a)) {
            $(t).css("opacity", 0);
            $(t).showAnima(a);
        }
        $(t).css("display", "block");

    };

    //jquery.magnific-popup.min.js
    $.fn.initMagnificPopup = function () {
        var obj = this;
        var optionsString = $(obj).attr("data-options");
        var trigger = $(obj).attr("data-trigger");
        if (isEmpty(trigger)) trigger = "";
        var a = $(obj).attr("data-lightbox-anima");
        var href = $(obj).attr("href");
        if (isEmpty(href)) href = ""
        var optionsArr;
        var options = {
            type: 'iframe'
        }

        if (!isEmpty(optionsString)) {
            optionsArr = optionsString.split(",");
            options = getOptionsString(optionsString, options);
        }
        if (isEmpty(options['mainClass'])) options['mainClass'] = "";
        if (trigger == "load" || trigger == "scroll") {
            var l = $(obj).attr("data-link");
            var c = $(obj).attr("data-click");
            if (isEmpty(l)) { href = "#" + $(this).attr("id"); options['mainClass'] += ' custom-lightbox'; }
            else href = l;

            if (!isEmpty(c)) {
                $("body").on("click", ".lightbox-on-load", function () {
                    if ($(obj).attr("data-click-target") == "_blank") window.open(c);
                    else document.location = c;
                });
            }
        }

        if ($(obj).hasClass("grid-box") || $(obj).hasClass("maso-box")) {
            options["type"] = "image";
            options["delegate"] = "a.img-box,.advs-box a:not(.img-box)";
            options["gallery"] = { enabled: 1 };
        }
        if ((href.indexOf(".jpg") != -1) || (href.indexOf(".png") != -1)) options['type'] = 'image';
        if (href.indexOf("#") == 0) {
            options['type'] = 'inline';
            options['mainClass'] += ' box-inline';
            options['closeBtnInside'] = 0;
        }
        options["callbacks"] = {
            "open": function () {
                var mfp_cnt = $('.mfp-content');
                if (!isEmpty(a)) {
                    $(mfp_cnt).showAnima(a);
                    $(mfp_cnt).css("opacity", 0);
                } else {
                    if ((!isEmpty(optionsString)) && optionsString.indexOf("anima:") != -1) {
                        $(mfp_cnt).showAnima(options['anima']);
                        $(mfp_cnt).css("opacity", 0);
                    }
                }
                if (href.indexOf("#") == 0) {
                    $(href).css("display", "block");
                }
                if ($.isFunction($.fn.initFlexSlider)) {
                    var i = 0;
                    $(mfp_cnt).find(".flexslider").each(function () {
                        $(this).initFlexSlider();
                        i++;
                    });
                    if (i) $(window).trigger('resize').trigger('scroll');
                }
                if ($.isFunction($.fn.googleMap)) $(mfp_cnt).find(".google-map").googleMap();
            },
            change: function (item) {
                var h = this.content;
                $('.mfp-container').removeClass("active");
                setTimeout(function () { $('.mfp-container').addClass("active"); }, 500);
                if ($.isFunction($.fn.initFlexSlider)) {
                    setTimeout(function () {
                        var i = 0;
                        $(h).find(".flexslider").each(function () {
                            $(this).initFlexSlider();
                            i++;
                        });
                        if (i) $(window).trigger('resize').trigger('scroll');
                    }, 100);
                }
                if ($.isFunction($.fn.googleMap)) setTimeout(function () { $(h).find(".google-map").googleMap(); }, 200);
            }
        };
        if (trigger != "load" && trigger != "scroll") $(obj).magnificPopup(options);
        else {
            if (href.indexOf("#") == 0) $(href).css("display", "block");
            options['items'] = { 'src': href }
            options['mainClass'] += ' lightbox-on-load';
            $.magnificPopup.open(options);
        }
    };

    //jquery.slimscroll.min.js
    $.fn.initSlimScroll = function () {
        function getHeightFullscreen(t, wh) {
            var vh = $(t).attr("data-height");
            var lh = $(t).attr("data-height-remove");
            if (isEmpty(vh) || vh == "auto") {
                var h = wh - $(t)[0].getBoundingClientRect().top - $("footer").outerHeight(), ch = $(t).outerHeight();
                if (!isEmpty(lh)) h = wh - lh;
                vh = (ch < h) ? ch + 30 : h - 30;
            }
            if (vh == "fullscreen") {
                var h = wh;
                if (!isEmpty(lh) && ((wh - lh) > 150)) h = wh - lh;
                else h = wh - 100;
                vh = h;
            }
            return vh;
        }
        if (!$(this).hasClass("scroll-mobile-disabled") || device_screen_size != "device-xs") {
            var optionsString = $(this).attr("data-options");
            var optionsArr;
            var options = {
                height: 0,
                size: '4px'
            }
            if (!isEmpty(optionsString)) {
                optionsArr = optionsString.split(",");
                options = getOptionsString(optionsString, options);
            }
            if (device_screen_size == "device-xs") options['alwaysVisible'] = true;

            var wh = $(window).height();
            var vh = getHeightFullscreen(this, wh);
            var lh = $(this).attr("data-height-remove");
            if (isEmpty(lh)) lh = 0;
            vh += "";

            if ((vh.indexOf("#") != -1) || (vh.indexOf(".") != -1)) vh = "" + ($(this).closest(vh).height() - lh);

            options['height'] = vh + "px";
            $(this).slimScroll(options);

            if ($.isFunction($.fn.googleMap)) {
                $(this).find(".google-map").each(function (index) {
                    $(this).googleMap();
                });
            }
            if (!options['alwaysVisible']) $(".slimScrollBar").hide();
        }
    }

    //jquery.flexslider-min.js
    $.fn.restartFlexSlider = function () {
        var t = this;
        setTimeout(function () { $(t).removeData('flexslider'); $(t).find('li.clone').remove(); $(t).find('.flex-control-nav').remove(); $(t).initFlexSlider(); }, 100);
    }
    $.fn.initFlexSlider = function () {
        function animaSlider(obj) {
            var anima_li = $(obj).find(".flex-active-slide");
            var anima = $(anima_li).attr("data-slider-anima");
            if (!isEmpty(anima)) {
                $(anima_li).attr("data-anima", anima);
                initAnima(anima_li);
            }
        }
        var obj = this;
        var itemWidth = 250;
        var optionsString = $(obj).attr("data-options");
        var optionsArr;
        var options = {
            animation: "slide",
            slideshowSpeed: 6000,
            controlNav: ($(obj).hasClass("thumb")) ? "thumbnails" : true,
            start: function () {
                if (!$(obj).hasClass("advanced-slider") && $.fn.renderLoadedImgs) $(obj).find(".slides").renderLoadedImgs();
                if ($(obj).hasClass("carousel")) {
                    $(obj).find(".slides > li").css("width", itemWidth + "px");
                }
                if ($(obj).hasClass("thumb") || $(obj).hasClass("nav-middle")) $(obj).find(".flex-prev,.flex-next").css("top", $(obj).find(".slides > li img")[0].clientHeight / 2 + "px");
                $(obj).find(".background-page video,.section-bg-video").each(function () {
                    $(this).setVideoBgSize($(window).height(), $(window).width());
                });
                $(obj).find(".pos-slider.pos-center").each(function () {
                    $(this).css("margin-left", "-" + $(this).width() / 2 + "px");
                });
                $(obj).find(".pos-slider.pos-middle").each(function () {
                    $(this).css("margin-top", "-" + $(this).height() / 2 + "px");
                });
                animaSlider(obj);
            },
            after: function () {
                animaSlider(obj);
            }
        }
        if (!isEmpty(optionsString)) {
            optionsArr = optionsString.split(",");
            options = getOptionsString(optionsString, options);
            if (optionsString.indexOf("controlNav:false") != -1) $(this).addClass("no-navs");
        }

        if ($(obj).hasClass("carousel")) {
            var slides = $(obj).find(".slides > li");
            var minWidth = 110;
            if (wh < 993) {
                minWidth = 180;
            }
            var itemMargin = 5;
            var numItems = 3;
            var ow = $(obj).outerWidth();
            if (!isEmpty(optionsString)) {
                for (var i = 0; i < optionsArr.length; i++) {
                    var val = optionsArr[i].split(":");
                    if (val[0] == "minWidth") minWidth = val[1];
                    if (val[0] == "itemWidth") itemWidth = val[1];
                    if (val[0] == "itemMargin") itemMargin = val[1];
                    if (val[0] == "numItems") numItems = parseInt(val[1]);
                }
            }
            itemWidth = ow / numItems;
            if (itemWidth < minWidth) {
                numItems = 1;
                if (ow / 2 > minWidth) numItems = 2;
                if (ow / 3 > minWidth) numItems = 3;
                itemWidth = ow / numItems;
            }
            if (numItems == 1) itemMargin = 0;
            itemWidth = itemWidth + itemMargin / numItems;
            itemWidth = itemWidth.toFixed(1);
            minWidth = itemWidth;

            options["itemWidth"] = itemWidth;
            options["itemMargin"] = itemMargin;
            var m = Math.ceil(slides.length / numItems);
            options["move"] = (m > numItems) ? numItems : m;
            if (slides.length < numItems) options["move"] = 0;
            options["numItems"] = numItems;
            if (itemMargin > 0) {
                $(slides).css("padding-right", itemMargin + "px");
            }
        }
        $("*[data-slider-anima] .anima").each(function () {
            $(this).css("opacity", 0);
        });
        $(obj).flexslider(options);
    }

    //DOCUMENT READY
    $(document).ready(function () {
        //DEVICE SIZE
        wh = $(window).width();
        hh = $(window).height();
        if (wh < 993) device_screen_size = "device-xs";
        if (wh > 992 && wh < 1200) device_screen_size = "device-m";
        if (wh > 1200) device_screen_size = "device-l";
        $("body").addClass(device_screen_size);

        //VIDEO BG
        $(".background-page video,.section-bg-video,.header-video").each(function () {
            $(this).setVideoBgSize(hh, wh);
        });
        if (wh < 992 && $(".section-bg-video,.header-video").length) {
            setInterval(function () {
                $(".background-page video,.section-bg-video").each(function () {
                    $(this).setVideoBgSize();
                });
            }, 600);
        }

        //SOCIAL
        $("body").on("click", "[data-social]", function () {
            var a = $(this).attr("data-social");
            var link = $(this).attr("data-social-url");
            var purl = link;
            if (isEmpty(link)) purl = window.location.href;

            var url = 'https://www.facebook.com/sharer/sharer.php?u=' + purl;
            if (a == 'share-twitter') {
                url = 'https://twitter.com/intent/tweet?text=' + $('meta[name=description]').attr("content");
                if (!isEmpty(link)) url = 'https://twitter.com/intent/tweet?url=' + link;
            }
            if (a == 'share-google') url = 'https://plus.google.com/share?url=' + purl;
            if (a == 'share-linkedin') url = 'https://www.linkedin.com/shareArticle?url=' + purl;
            openWindow(url);
        });

        //MENU - MOBILE
        $(".navbar-toggle").toggleClick(function () {
            $(this).closest('.navbar').find('.navbar-collapse').expandItem();
        }, function () {
            $(this).closest('.navbar').find('.navbar-collapse').collapseItem();
            $(".subline-bar ul").hide();
        });

        //MENU - FIXED TOP
        setTimeout(function () {
            if (isEmpty($("header").attr("data-menu-eight"))) $("header.fixed-top").css("height", $("header > div").height() + "px");
            else $("header").css("height", $("header").attr("data-menu-eight") + "px");
        }, 150);

        //COMPONENT - FIXED AREA
        $(".fixed-area").each(function (i) {
            $(this).css("width", $(this).width() + "px");
            var top = $(this).attr("data-topscroll");
            if (isEmpty(top)) top = $("header div").outerHeight(true);
            arrFA[i] = [$(this).offset().top, $(this).offset().left, top];
            $(this).closest(".section-item").css("z-index", "4").css("overflow", "visible");
        });

        //ANIMATIONS
        $('*[data-anima]').each(function () {
            var tr = $(this).attr("data-trigger");
            if (isEmpty(tr) || tr == "scroll" || tr == "load") {
                var an = $(this).find(".anima,*[data-anima]");
                if (isEmpty(an)) an = this;
                var cont = null;
                var x = 0;
                $(an).each(function () {
                    if (!$(this).hasClass("anima") && an != this) {
                        cont = this;
                    } else {
                        if (cont != null && !$.contains(cont, this) || cont == null) {
                            $(this).css("opacity", 0);
                            x++;
                        }
                    }
                });
                if (x == 0) $(this).css("opacity", 0);
            }
            if (!isEmpty(tr) && tr == "load") initAnima(this);
        });

        $("body").on("click", '*[data-anima]*[data-trigger="click"]', function () {
            outAnima(this);
            initAnima(this);
        });
        $('*[data-anima]*[data-trigger="hover"]').mouseenter(function () {
            initAnima(this);
        }).mouseleave(function () {
            $(this).stop(true, false);
            outAnima(this);
        });

        //MENU
        $("body").on("click", ".nav > li", function () {
            var n = $(this).closest('.nav');
            $(n).find("li").removeClass("active").removeClass("current-active");
            $(this).addClass("active current-active");
        });

        //MENU ANIMATIONS
        if (device_screen_size != "device-xs") {
            $("[data-menu-anima]").each(function () {
                var a = $(this).closest("[data-menu-anima]").attr("data-menu-anima");
                $(this).find("ul:not(.side-menu):first-child li").hover(function () {
                    $(this).find(" > ul, > .mega-menu").css("opacity", 0).css("transition-duration", "0ms").showAnima(a);
                });
                $(this).find(".side-menu li").hover(function () {
                    $(this).find(".panel").css("opacity", 0).css("transition-duration", "0ms").showAnima(a);
                });
                if ($(this).hasClass("side-menu-lateral")) {
                    $(this).find(".side-menu li").hover(function () {
                        $(this).find("ul").css("opacity", 0).css("transition-duration", "0ms").showAnima(a);
                    });
                }
            });
            $(".nav > li").hover(function (e) {
                $(this).closest(".nav").find("li").removeClass("open");
            });
        }

        //MENU - SIDE
        function hide_mobile_menu(t) {
            var a = $(t).attr("data-menu-anima");
            if (isEmpty(a)) a = "fade-in";
            $(".hamburger-menu,.side-menu-fixed").css("visibility", "hidden").css("opacity", "0").removeClass(a);
            $(t).removeClass("active");
            $("body").css("overflow", "");
        }
        function show_mobile_menu(t) {
            var a = $(t).attr("data-menu-anima");
            if (isEmpty(a)) a = "fade-in";
            $(".hamburger-menu,.side-menu-fixed").css("visibility", "visible").showAnima(a);
            $(t).addClass("active");
            if (device_screen_size == "device-xs") $("body").css("overflow", "hidden");
        }
        if (device_screen_size == "device-xs") {
            $(".side-menu li > ul.collapse").each(function () {
                $(this).css("height", "0px");
            });

            $("body").on("click", ".side-menu > li.panel-item", function (e) {
                if ($(e.target).closest(".collapse").length == 0) $(this).toggleClass("active");
            });

            $("body").on("click", ".side-menu > li", function () {
                var t = this;
                $(".side-menu > li").each(function () {
                    if (t !== this) {
                        $(this).removeClass("active");
                        $(this).find(".collapse").removeClass("in").removeClass("open");
                        $(this).find("> ul.collapse").css("height", "0px");
                    }
                });
                hide_mobile_menu($(".hamburger-button"));
            });
        }
        if ($(".side-menu-fixed").length) {
            var mh = $(window).height() - ($('.side-menu-fixed .top-area').outerHeight(true) + $('.side-menu-fixed .bottom-area').outerHeight(true));
            $('.side-menu-fixed .sidebar').css('height', mh + "px");
            $(".side-menu-fixed .scroll-content").attr("data-height", mh);

            if ($.isFunction($.fn.slimScroll)) {
                $("body").on("click", ".side-menu li", function () {
                    $(".side-menu-fixed .scroll-content").slimScroll();
                });
            }
        }
        $("body").on("click", ".side-menu .panel-item", function () {
            $(this).find(".panel").toggleClass("open");
        });
        $("body").on("click", ".side-menu .panel-item li", function () {
            $(this).closest(".panel").toggleClass("open");
        });
        $(".side-menu").each(function () {
            if ($.isFunction($.fn.metisMenu)) $(this).metisMenu();
        });
        $(".one-page-menu,.navbar-nav.inner,.side-menu").each(function () {
            onePageScroll(this);
        });
        if ($('.side-menu .panel-item').length) {
            var width = $(".side-menu-fixed").css("width");
            $('.side-menu .panel-item .panel').css("left", width);
        }

        //HAMBURGER BUTTON
        $(".hamburger-button").toggleClick(function () {
            show_mobile_menu(this);
        }, function () {
            if ($(this).hasClass("active")) hide_mobile_menu(this);
            else show_mobile_menu(this);
        });

        //OTHERS
        $('a[href="#"]').on('click', function (e) {
            e.preventDefault();
        });

        $("body").on("click", ".img-box .caption", function () {
            $(this).closest(".img-box").find("a.img-box").click();
        });

        $(".grid-list[class^='row-'], .grid-list[class*=' row-'],.maso-list[class^='row-'], .maso-list[class*=' row-']").each(function () {
            var css = $.grep(this.className.split(" "), function (v, i) {
                return v.indexOf('row') === 0;
            }).join();
            $(this).find(".grid-item > *,.grid-item .flexslider li > *").addClass(css);
        });

        $(".header-slider,.header-video,.header-title").setMiddleBox(".container > div");
        $(".full-screen-title .container > div").css("margin-top", "");

        $(".full-screen-size").each(function () {
            var h = $(this).attr("data-sub-height");
            $(this).sizeFullScreen((isEmpty(h) ? null : h));
        });
        $(".full-screen-title").each(function () {
            var h = $(this).attr("data-sub-height");
            $(this).titleFullScreen((isEmpty(h) ? null : h));
        });
        $(".box-middle-container").each(function () {
            $(this).setMiddleBox();
        });
        $(".social-group-button").toggleClick(function () {
            $(this).find(".social-group").css("display", "block");
            $(this).find(".social-group i").showAnima("fade-left");
        }, function () {
            $(this).find(".social-group").css("display", "none");
            $(this).find(".social-group i").css("opacity", "0");
        });
        if (device_screen_size != "device-xs") {
            $(".section-two-blocks .content").each(function () {
                var t = this;
                setTimeout(function () {
                    var tmp = $(t).closest(".section-two-blocks");
                    if (isEmpty($(tmp).attr("data-parallax"))) $(tmp).css("height", $(t).outerHeight());
                    $(tmp).renderLoadedImgs();
                }, 300);
            });
        }

        //WORDPRESS
        if ($("#wpadminbar").length) {
            if ($("header").hasClass("fixed-top")) $("header > .navbar").css("margin-top", "32px");
            if ($("header").hasClass("side-menu-header")) $("header .side-menu-fixed,header .navbar-fixed-top").css("margin-top", "32px");
        }
        $("header a").each(function () {
            if ($(this).attr("href") == current_url) {
                if ($(this).closest(".dropdown-menu").length) $(this).closest(".dropdown").addClass("active");
                else $(this).closest("li").addClass("active");
            }
        });

        //BACKGROUND VIDEO YT
        $("*[data-video-youtube]").each(function () {
            var id = $(this).attr("data-video-youtube");
            if (id.indexOf("http:") != -1 || id.indexOf("www.you") != -1 || id.indexOf("youtu.be") != -1) {
                if (id.indexOf("?v=") != -1) id = id.substring(id.indexOf("v=") + 2);
                if (id.indexOf("youtu.be") != -1) id = id.substring(id.lastIndexOf("/") + 1);
            }
            var vq = $(this).attr("data-video-quality");
            var pars = "";
            if (!isEmpty(vq)) {
                if (vq == "hc-hd") pars += "&amp;vq=hd1080";
            }
            $(this).html('<iframe frameborder="0" allowfullscreen="0" src="https://www.youtube.com/embed/' + id + '?playlist=' + id + '&amp;vq=hd1080&amp;loop=1&amp;start=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0&amp;wmode=transparent&amp;iv_load_policy=3&amp;modestbranding=1&amp;rel=0&amp;enablejsapi=1&amp;volume=0' + pars + '"></iframe>');
        });
        if ($(".background-page iframe").length) {
            $(".background-page iframe").css("height", $(window).height() + 300 + "px").css("width", $(window).width() + 300 + "px").css("margin-left", "-150px");
        }

        //MENU - SEARCH C
        $(".btn-search").toggleClick(function () {
            $(this).closest(".search-box-menu").find(".search-box").css("opacity", 0).css("display", "block").showAnima("fade-bottom");
        },
         function () {
             $(this).closest(".search-box-menu").find(".search-box").css("display", "none");
         });

        //MENU - SUBLINE
        function showSublineMenu(item) {
            var p = $(item).closest("header");
            var t = $(p).find(".subline-bar ul:eq(" + $(item).index() + ")");
            $(p).find(".subline-bar ul").css("display", "none");
            $(t).css("opacity", "0").css("display", "block").animate({ "opacity": 1 }, 300);
        }
        $(".subline-menu > li").mouseover(function () {
            showSublineMenu(this);
        });
        $(".subline-bar").on("mouseleave", function () {
            $(this).find("ul").css("display", "none");
        });
        if ($("header").hasClass("fixed-top")) $(".subline-bar").css("margin-top", $("header").height() + "px");

        //MENU - MINI TOP - SEARCH
        $(".navbar-mini .form-control").focusin(function () {
            $(this).toggleClass("focus");
        });
        $(".navbar-mini .form-control").focusout(function () {
            $(this).toggleClass("focus");
        });

        //SCROLL METHODS
        setTimeout(function () { $(window).scroll(); }, 50);
        $("body").on("click", ".scroll-top", function () {
            $("html, body").stop().animate({ scrollTop: 0 }, '500', 'swing');
        });
        $("body").on("click", ".scroll-to", function () {
            var t = $(this).attr("data-scroll-to");
            if (isEmpty(t)) t = $(this).attr("href");
            try {
                $(t).scrollTo();
            } catch (e) { }
        });

        //LOADER
        $('#preloader').fadeOut(300);

        //PAGE SCROLL
        var cnt_title = $(".header-slider .container,.header-video .container,.header-title .container,.header-animation .container");
        var parallax_title = $(".header-parallax");
        var fixed_area = $(".fixed-area");
        var data_anima = $("*[data-anima]");
        var old_scroll = 0;
        $(window).scroll(function () {
            var po = window.pageYOffset;
            $(cnt_title).css("margin-top", po / 2).css("opacity", (100 / po < 1) ? (100 / po) : 1);

            var scroll = $(window).scrollTop();
            var go = true;
            var dh = $(document).height();

            if ($(parallax_title).length) {
                if (po > $(window).outerHeight()) $(parallax_title).css("visibility", "hidden");
                else $(parallax_title).css("visibility", "visible");
                $(parallax_title).find(".layer-parallax").css("margin-top", -1 * po / 2);
            }

            //COMPONENT - FIXED AREA
            $(fixed_area).each(function (i) {
                if (arrFA.length && scroll > arrFA[i][0]) {
                    $(this).css("top", arrFA[i][2] + "px").css("left", arrFA[i][1] + "px").css("position", "fixed").addClass("active");
                } else $(this).css("top", "").css("position", "").css("left", "").removeClass("active");

                var _bottom = $(this).attr("data-bottom");
                if (!isEmpty(_bottom)) {
                    if (scroll + hh > dh - _bottom) {
                        if (old_scroll < scroll) {
                            $(this).animate({
                                "margin-top": "-" + _bottom
                            }, 200);
                        }
                    } else {
                        if (old_scroll > scroll) {
                            $(this).clearQueue();
                            $(this).css("margin-top", "")
                        }
                    }
                }
            });

            //ON SCROLL FUNCTIONS
            if (scroll > 100 && go) {
                go = false;
                $(".scroll-hide").addClass('hidden');
                $(".scroll-change").addClass("scroll-css");
                $(".scroll-show").addClass('showed');
                $(".menu-transparent").removeClass("bg-transparent");
                if (device_screen_size == "device-xs") $(".scroll-show-mobile").removeClass('hidden');

                if (scroll + hh > (dh - hh)) {
                    $(".footer-parallax").css("opacity", 1);
                } else $(".footer-parallax").css("opacity", 0);
            }
            if (scroll < 100) {
                go = true;
                $(".scroll-hide").removeClass("hidden");
                if (!$(".fp-enabled").length) $(".scroll-change").removeClass("scroll-css");
                $(".scroll-show").removeClass('showed');
                $(".menu-transparent").addClass("bg-transparent");
            }

            //SCROLL INTO VIEWPORT
            $(data_anima).each(function () {
                var tr = $(this).attr("data-trigger");
                if (isEmpty(tr) || tr == "scroll") {
                    if (isScrollView(this)) {
                        if (!isEmpty($(this).attr("data-anima"))) initAnima(this);
                        $(this).attr("data-anima", "");
                    }
                }
            });
            old_scroll = scroll;
        });
    });
}(jQuery));

//THIRD PARTS PLUGINS
(function ($) {
    $(document).ready(function () {
        //imagesloaded.min.js
        $(".img-box").executeFunction("imagesLoaded", function () {
            $(".img-box").each(function () {
                $(this).renderLoadedImgs();
            });
        });
        
        //isotope.min.js
        $(".maso-list").executeFunction("isotope", function () {
            setTimeout(function () { firstLoad = false }, 1000);
            $('.maso-list').each(function () {
                if ($(this).attr("data-trigger") != "manual") $(this).initIsotope();
            });
        });
        $(".maso-filters a").click(function () {
            var f = $(this).attr('data-filter');
            var t = $(this).closest(".maso-list");
            if (!isEmpty(f)) $(t).find('.maso-box').isotope({ filter: "." + $(this).attr('data-filter') });
            var lm = $(t).find('.load-more-maso');
            if (lm.length) {
                setTimeout(function () {
                    var i = 0;
                    $(t).find('.maso-box .maso-item').each(function () {
                        if ($(this).attr("style").indexOf("display: none") == -1) i++;
                    });
                    if (i < parseInt($(lm).attr("data-page-items")), 10) $(t).find('.load-more-maso').click();
                }, 450);
            }
            if ($(t).find('.maso-box .maso-item').length < 3) $(t).find('.load-more-maso').click();
        })
        $(".maso-order").click(function () {
            var t = $(this).closest(".maso-list").find('.maso-box');
            var sort = $(this).attr("data-sort");
            if (sort == "asc") {
                t.isotope({ sortAscending: false });
                $(this).attr("data-sort", "desc");
                $(this).html("<i class='fa fa-arrow-up'></i>");
            } else {
                t.isotope({ sortAscending: true });
                $(this).attr("data-sort", "asc");
                $(this).html("data-sort");
                $(this).html("<i class='fa fa-arrow-down'></i>");
            }
        });
        $(".maso-item .advs-box").each(function () {
            $(this).css("visibility", "visible").css("opacity", "1");
            $(this).find("> *").animate({ "opacity": 1 }, 300);
        });

        //jquery.bootgrid.min.js
        $(".bootgrid-table").executeFunction("bootgrid", function () {
            $(".bootgrid-table").each(function () {
                var optionsString = $(this).attr("data-options");
                var optionsArr;
                var options = {
                    caseSensitive: false,
                    formatters: {
                        "image": function (column, row) {
                            var val = row[column.id];
                            var img, thumb;
                            if (val.split(",").length > 1) {
                                img = val.split(",")[0];
                                thumb = val.split(",")[1];
                            } else img = thumb = val;
                            return '<a class="lightbox" href="' + img + '"><img src="' + thumb + '"></a>';
                        },
                        "button": function (column, row) {
                            var val = row[column.id];
                            return '<a href="' + val.split(",")[1] + '" class="btn btn-default btn-xs">' + val.split(",")[0] + '</a>';
                        },
                        "link": function (column, row) {
                            var val = row[column.id];
                            return '<a href="' + val.split(",")[1] + '" class="link">' + val.split(",")[0] + '</a>';
                        },
                        "link-icon": function (column, row) {
                            var val = row[column.id];
                            return '<a target="_blank" href="' + val.split(",")[1] + '" class="link"><i class="fa ' + val.split(",")[0] + '"></i></a>';
                        }
                    }
                }
                if (!isEmpty(optionsString)) {
                    optionsArr = optionsString.split(",");
                    options = getOptionsString(optionsString, options);
                }
                $(this).bootgrid(options).on("loaded.rs.jquery.bootgrid", function (e) {
                    if ($.isFunction($.fn.magnificPopup)) {
                        $(this).find('a.lightbox').magnificPopup({
                            type: 'image'
                        });
                    }
                });
            });
        });

        //jquery.flipster.min.js
        $(".coverflow-slider").executeFunction("flipster", function () {
            $(".coverflow-slider").each(function () {
                if ($(this).attr("data-trigger") != "manual") {
                    var w = $(this).attr("data-width");
                    var options = {};
                    var opt = $(this).attr("data-options");
                    if (!isEmpty(opt)) {
                        options = getOptionsString(opt, options);
                    }
                    if (!isEmpty(w)) $(this).find("ul > li").css("width", w + "%");
                    $(this).flipster(options);
                }
            });
        });
        $(".coverflow-slider .coverflow-lightbox").click(function (e) {
            var p = $(this).closest(".flip-item");
            if ($(p).hasClass("flip-current")) {
                $.magnificPopup.open({
                    items: {
                        src: $(this).attr("href")
                    },
                    type: ($(this).hasClass("mfp-iframe")) ? 'iframe' : 'image'
                });
                e.preventDefault();
            }
        });

        //jquery.magnific-popup.min.js
        $(".grid-list.gallery .grid-box,.maso-list.gallery .maso-box, .lightbox,.box-lightbox,.popup-banner,.popup-trigger,.lightbox-trigger").executeFunction("magnificPopup", function () {
            $('.grid-list.gallery .grid-box,.maso-list.gallery .maso-box, .lightbox').each(function () {
                $(this).initMagnificPopup();
            });
            $('*[data-trigger="load"].box-lightbox').each(function () {
                var e = $(this).attr("data-expire");
                if (!isEmpty(e) && e > 0) {
                    var id = $(this).attr("id");
                    if (isEmpty(Cookies.get(id))) {
                        $(this).initMagnificPopup();
                        Cookies.set(id, 'expiration-cookie', { expire: e });
                    }
                } else $(this).initMagnificPopup();
            });
            $('*[data-trigger="load"].popup-banner').each(function () {
                var e = $(this).attr("data-expire");
                if (!isEmpty(e) && e > 0) {
                    var id = $(this).attr("id");
                    if (isEmpty(Cookies.get(id))) {
                        $(this).showPopupBanner();
                        Cookies.set(id, 'expiration-cookie', { expire: e });
                    }
                } else $(this).showPopupBanner();
            });
            $('.popup-trigger').each(function () {
                $(this).click(function () {
                    $($(this).attr("href")).showPopupBanner();
                });
            });
            $('.popup-banner [data-click]').each(function () {
                var t = this;
                var c = $(t).attr("data-click");
                if (!isEmpty(c)) {
                    $("body").on("click", $(t).attr("data-click-trigger"), function () {
                        if ($(t).attr("data-click-target") == "_blank") window.open(c);
                        else document.location = c;
                    });
                }
            });
            $(window).scroll(function (event) {
                $('*[data-trigger="scroll"].popup-trigger').each(function () {
                    if (isScrollView(this)) {
                        var t = $(this).attr("href");
                        var a = $(t).attr("data-popup-anima");
                        if (!isEmpty(a)) {
                            $(t).css("opacity", 0);
                            $(t).showAnima(a);
                        }
                        $(t).css("display", "block");
                        $(this).removeClass("popup-trigger");
                    }
                });
                $('*[data-trigger="scroll"].lightbox-trigger').each(function () {
                    if (isScrollView(this)) {
                        $($(this).attr("href")).initMagnificPopup();
                        $(this).attr("data-trigger", "null");
                    }
                });
            });
        });
        $('.popup-close').click(function () {
            $(this).closest(".popup-banner").hide();
        });

        //jquery.slimscroll.min.js
        $(".scroll-content").executeFunction("slimScroll", function () {
            $(".scroll-content").each(function () {
                $(this).initSlimScroll();
                if (device_screen_size == "device-xs") $(".slimScrollBar").css("height", "50px");
            });
            $(".scroll-content").bind("mousewheel DOMMouseScroll", function (n) { n.preventDefault() });
        });

        //jquery.spritely.min.js
        $(".section-bg-animation,.header-animation").executeFunction("pan", function () {
            $(".header-animation .overlay.center").each(function () {
                $(this).css("margin-left", "-" + $(this).width() / 2 + "px");
            });
            var overlay = $(".section-bg-animation,.header-animation").find("img.overlay");
            $('#anima-layer-a').pan({ fps: 30, speed: 0.7, dir: 'left', depth: 30 });
            $('#anima-layer-b').pan({ fps: 30, speed: 1.2, dir: 'left', depth: 70 });
            $(window).scroll(function () {
                var po = window.pageYOffset;
                $(overlay).css("opacity", (100 / po < 1) ? (100 / po) : 1);
            });
        });

        //parallax.min.js
        $("[data-parallax]").executeFunction("parallax", function () {
            $('[data-parallax]:not(.header-title)').parallax({});
            $('[data-parallax].header-title').parallax({ bleed: 100 });
            $(".section-bg-image,.section-bg-animation,[data-parallax].header-title").each(function () {
                var ken = "";
                if ($(this).hasClass("ken-burn")) ken = "ken-burn";
                if ($(this).hasClass("ken-burn-out")) ken = "ken-burn-out";
                if ($(this).hasClass("ken-burn-center")) ken = "ken-burn-center";
                if (ken.length > 0) { setTimeout(function () { $(".parallax-mirror").addClass(ken); }, 100) }
            });
            var timerVar;
            var times = 0;
            var isFP = $("html").hasClass("fp-enabled");
            timerVar = self.setInterval(function () {
                if (times > 30) {
                    clearInterval(timerVar);
                } else {
                    if (!isFP) $(window).trigger('resize').trigger('scroll');
                }
                times = times + 1;
            }, 100);
            if ($(".section-bg-animation,.header-animation").length) {
                var c = $(".section-bg-animation,.header-animation");
                var lays = $(c).find(".anima-layer");
                $(window).scroll(function () {
                    var po = window.pageYOffset - (c.offset().top - c.getHeight() / 4);
                    $(lays).css("margin-top", po / 1.5);
                });
            }
            if ($("[data-parallax]").length) {
                setInterval(function () {
                    $(window).trigger('resize').trigger('scroll');
                }, 400);
            }
        });

        //jquery.flexslider-min.js
        $(".flexslider").executeFunction("flexslider", function () {
            $('.flexslider.slider,.flexslider.carousel').each(function () {
                if ($(this).attr("data-trigger") != "manual") $(this).initFlexSlider();
            });
            $('.list-full-screen li').css("height", $('.list-full-screen ').height() - 10);
        });
    });
}(jQuery));

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-75816862-9', 'auto');
ga('send', 'pageview');
