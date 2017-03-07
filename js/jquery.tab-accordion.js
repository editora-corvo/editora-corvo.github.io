/* metismenu - v2.0.2 https://github.com/onokumus/metisMenu - Under MIT License  */
!function (a) { "use strict"; function b() { var a = document.createElement("mm"), b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }; for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] }; return !1 } function c(b) { return this.each(function () { var c = a(this), d = c.data("mm"), f = a.extend({}, e.DEFAULTS, c.data(), "object" == typeof b && b); d || c.data("mm", d = new e(this, f)), "string" == typeof b && d[b]() }) } a.fn.emulateTransitionEnd = function (b) { var c = !1, e = this; a(this).one("mmTransitionEnd", function () { c = !0 }); var f = function () { c || a(e).trigger(d.end) }; return setTimeout(f, b), this }; var d = b(); d && (a.event.special.mmTransitionEnd = { bindType: d.end, delegateType: d.end, handle: function (b) { return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0 } }); var e = function (b, c) { this.$element = a(b), this.options = a.extend({}, e.DEFAULTS, c), this.transitioning = null, this.init() }; e.TRANSITION_DURATION = 350, e.DEFAULTS = { toggle: !0, doubleTapToGo: !1, activeClass: "active" }, e.prototype.init = function () { var b = this, c = this.options.activeClass; this.$element.find("li." + c).has("ul").children("ul").addClass("collapse in"), this.$element.find("li").not("." + c).has("ul").children("ul").addClass("collapse"), this.options.doubleTapToGo && this.$element.find("li." + c).has("ul").children("a").addClass("doubleTapToGo"), this.$element.find("li").has("ul").children("a").on("click.metisMenu", function (d) { var e = a(this), f = e.parent("li"), g = f.children("ul"); return d.preventDefault(), f.hasClass(c) ? b.hide(g) : b.show(g), b.options.doubleTapToGo && b.doubleTapToGo(e) && "#" !== e.attr("href") && "" !== e.attr("href") ? (d.stopPropagation(), void (document.location = e.attr("href"))) : void 0 }) }, e.prototype.doubleTapToGo = function (a) { var b = this.$element; return a.hasClass("doubleTapToGo") ? (a.removeClass("doubleTapToGo"), !0) : a.parent().children("ul").length ? (b.find(".doubleTapToGo").removeClass("doubleTapToGo"), a.addClass("doubleTapToGo"), !1) : void 0 }, e.prototype.show = function (b) { var c = this.options.activeClass, f = a(b), g = f.parent("li"); if (!this.transitioning && !f.hasClass("in")) { g.addClass(c), this.options.toggle && this.hide(g.siblings().children("ul.in")), f.removeClass("collapse").addClass("collapsing").height(0), this.transitioning = 1; var h = function () { f.removeClass("collapsing").addClass("collapse in").height(""), this.transitioning = 0 }; return d ? void f.one("mmTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(e.TRANSITION_DURATION).height(function () { try { return f[0].scrollHeight } catch (e) { return 0 } }) : h.call(this) } }, e.prototype.hide = function (b) { var c = this.options.activeClass, f = a(b); if (!this.transitioning && f.hasClass("in")) { f.parent("li").removeClass(c), f.height(f.height())[0].offsetHeight, f.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1; var g = function () { this.transitioning = 0, f.removeClass("collapsing").addClass("collapse") }; return d ? void f.height(0).one("mmTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : g.call(this) } }; var f = a.fn.metisMenu; a.fn.metisMenu = c, a.fn.metisMenu.Constructor = e, a.fn.metisMenu.noConflict = function () { return a.fn.metisMenu = f, this } }(jQuery);

/*
* Pixor - Copyright (c) Federico Schiocchet - Pixor (www.pixor.it) - Framework Y (www.framework-y.com)
*/

(function ($) {
    $(document).ready(function () {
        $("body").on("click", ".tab-box .nav li", function (e) {
            var target = $(this).find("a").attr("href");
            if (target == "#") target = null;
            var p = $(this).closest(".tab-box");
            var anima = $(p).attr("data-tab-anima");
            $(p).find("> .panel, > .panel-box .panel").removeClass("active");
            $(p).find("> .nav li").removeClass("active");
            $(this).addClass("active");

            var t = $(p).find("> .panel:eq(" + $(this).index() + "), > .panel-box .panel:eq(" + $(this).index() + ")");
            if (!isEmpty(target)) t = $(p).find(target);

            $(t).addClass("active");
            if (!isEmpty(anima)) {
                $(t).css("opacity", 0);
                $(t).showAnima(anima);
            }
            if ($(this).closest(".mega-menu").length) return false;
            e.preventDefault();
        });

        $("header .mega-tabs").click(function () {
            $(this).find(".nav-tabs li:first-child").addClass("active");
        });
        $(".tab-box.left,.tab-box.right").each(function () {
            var t = $(this).find(".nav");
            var p = $(this).find(".panel-box");

            if ($(p).outerHeight() < $(t).outerHeight()) $(p).find(".panel").css("height", $(t).outerHeight() + "px");
            else $(t).css("height", $(p).find(".panel").outerHeight() + "px");
        });
        $(".nav.nav-justified-v").each(function () {
            var count_m = $(this).find("li").length;
            var a = $(this).find("li a");
            $(a).css("height", $(this).outerHeight() / count_m + "px");
            $(a).css("line-height", $(a).height() + "px")
        });

        $("*[data-height].collapse-box").each(function () {
            var t = $(this).find(".panel");
            $(t).css("height", $(this).attr("data-height") + "px");
            $(t).show();
        });
    });

    $('.collapse-box .collapse-button').toggleClick(function () {
        openCollapse(this);
    }, function() {
        closeCollapse(this);
    });
    function closeCollapse(obj) {
        var t = $(obj).closest(".collapse-box");
        var tp = $(t).find(".panel");
        var h = $(t).attr("data-height");
        if (!isEmpty(h)) $(tp).removeClass("no-gradient");
        var time = $(this).attr("data-time");
        if (isEmpty(time)) time = 500;

        $(tp).animate({
            height: (isEmpty(h)) ? 0 : h
        }, parseInt(time,10), function () {
            if (isEmpty(h)) {
                $(tp).css("display", "none");
                $(tp).css("height", "");
            }
        });
    }
    function openCollapse(obj) {
        var t = $(obj).closest(".collapse-box");
        var tp = $(t).find(".panel");
        var h = $(t).attr("data-height");
        var ah = $(obj).attr("data-height");

        $(tp).css("display", "block").css("height", "");
        var final_h = $(tp).height();
        $(tp).css("height", 0);

        if (!isEmpty(ah)) final_h = ah;

        var time = $(obj).attr("data-time");
        if (isEmpty(time)) time = 500;
        if (!isEmpty(h)) {
            $(tp).css("height", h + "px");
            $(tp).addClass("no-gradient");
        }
        $(tp).animate({
            height: final_h
        }, parseInt(time, 10));
    }

    $('.accordion-list .list-group-item > a').click(function () {
        var t = $(this).closest(".accordion-list");
        var it = $(this).closest(".list-group-item");
        var dt = $(t).attr("data-type");
        var time = $(t).attr("data-time");
        var he = $(t).attr("data-height");
        var act = $(t).find(".active-panel .panel");
        $(t).find(".list-group-item").removeClass("active-panel");

        if (isEmpty(dt)) dt = "";
        $($(t).find(".panel")).each(function () {
            $(this).clearQueue();
        });
        if ($(this).hasClass("active") || $(it).find(".panel").css("display") == "block") {
            $(this).removeClass("active");

            var tb = $(it).find(".panel");
            if (isEmpty(time)) time = 500;
            $(tb).animate({
                height: 0
            }, time, function () { $(tb).css("display", "none").css("height", ""); });
        } else {
            var d = 0;
            var a = $(t).find(".list-group-item > a");
            $(a).each(function () {
                if ($(this).hasClass("active")) d = 300;
            });
            $(a).removeClass("active");
            $(this).addClass("active");
            $(it).addClass("active-panel");

            if (dt == "visible") $($(it).find(".panel")).collapse({ milliseconds: time, height: he });
            else {
                $(act).animate({
                    height: 0
                }, d, function () {
                    $(act).css("display", "none").css("height", "");
                });
                if (dt == "accordion") {
                    $(it).find(".panel").collapse({ milliseconds: time, height: he });
                } else {
                    $(act).promise().done(function () {
                        $(it).find(".panel").collapse({ milliseconds: time, height: he });
                    });
                }
            }
        }
    });
    $.fn.collapse = function (attr) {
        var time = "";
        var height = "";
        if (!isEmpty(attr)) {
            time = attr["milliseconds"];
            height = attr["height"];
        }
        if (isEmpty(time)) time = 500;
        var t = this;
        $(t).css("display", "block");
        var h = $(t).height();
        $(t).css("height", "0px");
        if (!isEmpty(height)) h = height;

        $(t).animate({
            height: h
        }, parseInt(time, 10));
    };
}(jQuery));


