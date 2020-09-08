"use strict";
!function (e) {
    for (var t, n = 0, r = ["ms", "moz", "webkit", "o"], a = 0; a < r.length && !e.requestAnimationFrame; ++a) e.requestAnimationFrame = e[r[a] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[r[a] + "CancelAnimationFrame"] || e[r[a] + "CancelRequestAnimationFrame"];
    if (e.requestAnimationFrame || (e.requestAnimationFrame = function (t, r) {
        var a = (new Date).getTime(),
            i = Math.max(0, 16 - (a - n)),
            o = e.setTimeout((function () {
                t(a + i)
            }), i);
        return n = a + i, o
    }), e.cancelAnimationFrame || (e.cancelAnimationFrame = function (e) {
        clearTimeout(e)
    }), (t = Element.prototype).matches = t.matches || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector, t.closest = t.closest || function (e) {
        return this ? this.matches(e) ? this : this.parentElement ? this.parentElement.closest(e) : null : null
    }, Array.prototype.includes || (Array.prototype.includes = function (e) {
        var t = Object(this),
            n = parseInt(t.length, 10) || 0;
        if (0 === n) return !1;
        var r, a = parseInt(arguments[1], 10) || 0;
        for (a >= 0 ? r = a : (r = n + a) < 0 && (r = 0); r < n;) {
            var i = t[r];
            if (e === i || e != e && i != i) return !0;
            r++
        }
        return !1
    }), Object.values || Object.defineProperty(Object, "values", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function (e) {
            return "string" == typeof e ? e.split("") : Array.isArray(e) ? e : "object" != typeof e ? [] : Object.keys(e).map((function (t) {
                return e[t]
            }))
        }
    }), Object.entries || (Object.entries = function (e) {
        var t = [];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push([n, e[n]]);
        return t
    }), "function" != typeof e.CustomEvent) {
        var i = function (e, t) {
            t = t || {bubbles: !1, cancelable: !1, detail: void 0};
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        };
        i.prototype = e.Event.prototype, e.CustomEvent = i
    }
    /*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
    e.svg4everybody = function () {
        function t(e, t) {
            if (t) {
                var n = document.createDocumentFragment(),
                    r = t.getAttribute("viewBox");
                e.setAttribute("viewBox", r);
                for (var a = t.cloneNode(!0); a.childNodes.length;) n.appendChild(a.firstChild);
                e.appendChild(n)
            }
        }

        function n(e) {
            e.onreadystatechange = function () {
                if (4 === e.readyState) {
                    var n = e._cachedDocument;
                    n || ((n = e._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = e.responseText, e._cachedTarget = {}), e._embeds.splice(0).map((function (r) {
                        var a = e._cachedTarget[r.id];
                        a || (a = e._cachedTarget[r.id] = n.getElementById(r.id)), t(r.svg, a)
                    }))
                }
            }, e.onreadystatechange()
        }

        return function (r) {
            var a, i = Object(r);
            a = "polyfill" in i ? i.polyfill : /\bTrident\/[5-7]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || /\bEdge\/(\d+)\.(\d+)\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bAp{2}leWebKit\/(\d+)\b/) || [])[1] < 537;
            var o = {},
                c = e.requestAnimationFrame || setTimeout,
                s = document.getElementsByTagName("use");
            a && function e() {
                for (var r = 0; r < s.length;) {
                    var u = s[r],
                        l = u.parentNode;
                    if (l && /svg/i.test(l.nodeName)) {
                        var m = u.getAttribute("xlink:href");
                        if (a && (!i.validate || i.validate(m, l, u))) {
                            l.removeChild(u);
                            var d = m.split("#"),
                                v = d.shift(),
                                f = d.join("#");
                            if (v.length) {
                                var b = o[v];
                                b || ((b = o[v] = new XMLHttpRequest).open("GET", v), b.send(), b._embeds = []), b._embeds.push({
                                    svg: l,
                                    id: f
                                }), n(b)
                            } else t(l, document.getElementById(f))
                        }
                    } else ++r
                }
                c(e, 67)
            }()
        }
    }()
}(window);
"use strict";
!function (e) {
    function n(e) {
        e.preventDefault()
    }

    var o, t, r;
    e.videoImgFallback = function (e) {
        console.warn("video load error, gif fallback used");
        var n = e.querySelector("img");
        n && e.parentNode.replaceChild(n, e)
    }, e.getCookie = function (e) {
        var n = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([$()*+./?[\\\]^{|}])/g, "\\$1") + "=([^;]*)"));
        return n ? decodeURIComponent(n[1]) : void 0
    }, e.setCookie = function (e, n, o) {
        void 0 === o && (o = {});
        var t = o.expires;
        if ("number" == typeof t && t) {
            var r = new Date;
            r.setTime(r.getTime() + 1e3 * t), t = o.expires = r
        }
        t && t.toUTCString && (o.expires = t.toUTCString());
        var i = e + "=" + (n = encodeURIComponent(n));
        for (var c in o) {
            i += "; " + c;
            var u = o[c];
            !0 !== u && (i += "=" + u)
        }
        document.cookie = i
    }, e.deleteCookie = function (e) {
        setCookie(e, "", {expires: -1})
    }, e.getJsonFromUrl = function (e) {
        var n;
        if (e) {
            var o = location.href.indexOf("?");
            if (-1 === o) return [];
            n = location.href.substr(o + 1)
        } else n = location.search.substr(1);
        var t = {};
        return n.split("&").forEach((function (e) {
            if (e) {
                var n = (e = e.split("+").join(" ")).indexOf("="),
                    o = n > -1 ? e.substr(0, n) : e,
                    r = n > -1 ? decodeURIComponent(e.substr(n + 1)) : "",
                    i = o.indexOf("[");
                if (-1 === i) t[decodeURIComponent(o)] = r;
                else {
                    var c = o.indexOf("]", i),
                        u = decodeURIComponent(o.substring(i + 1, c));
                    o = decodeURIComponent(o.substring(0, i)), t[o] || (t[o] = []), u ? t[o][u] = r : t[o].push(r)
                }
            }
        })), t
    }, e.chunkSplit = function (e, n, o) {
        return void 0 === n && (n = 3), void 0 === o && (o = " "), (e += "").split("").reverse().join("").match(new RegExp(".{0," + n + "}", "g")).join(o).split("").reverse().join("").trim()
    }, e.preventBodyScrolling = function (e) {
        void 0 === e && (e = !1), document.body[!0 === e ? "addEventListener" : "removeEventListener"]("touchmove", n, !1)
    }, e.scrollParent = (o = /(auto|scroll)/, t = function (e, n) {
        return getComputedStyle(e, null).getPropertyValue(n)
    }, r = function (e, n) {
        return o.test(function (e, n) {
            return t(e, n ? "overflow-" + n : "overflow")
        }(e, n))
    }, function (e, n) {
        if (e instanceof HTMLElement || e instanceof SVGElement) {
            for (var o = function e(n, o) {
                return null === n.parentNode ? o : e(n.parentNode, o.concat([n]))
            }(e.parentNode, []), t = 0; t < o.length; t += 1)
                if (r(o[t], n)) return o[t];
            return document.scrollingElement || document.documentElement
        }
    })
}(window);
"use strict";
!function () {
    if (window.parent === window) {
        if (/mode=/.test(location.search)) {
            var e = location.href.replace(/mode=\w+/, "").replace(/\?&/, "?").replace(/\?$/, "");
            history.replaceState(null, null, e)
        }
    } else /is_view=/.test(location.search) && window.parent.history.replaceState(null, null, location.href.replace(location.search, ""));

    function i() {
        flexbe_cli.lockPopstate || (flexbe_cli.lockPopstate = !0, /^#/.test(location.hash) ? flexbe_cli.helpers.gotoLink(location.hash) : Object.keys(flexbe_cli.modal.opened).length && flexbe_cli.events.emit("ui_modal_close"), flexbe_cli.lockPopstate = !1)
    }

    void 0 === window.flexbe_cli && (window.flexbe_cli = {}), window.spaced_cli = window.flexbe_cli, flexbe_cli._init = function () {
        function e() {
            if (!flexbe_cli.isInited)
                if ("undefined" != typeof jQuery) {
                    flexbe_cli.init(), flexbe_cli.isInited = !0;
                    var l = ["ready"];
                    l.push(flexbe_cli.run.is_touch ? "is-touch" : "is-pointer"), l.push(flexbe_cli.run.is_mobile ? "is-mobile" : "is-desktop"), flexbe_cli.run.is_OSX && flexbe_cli.run.is_desktop && l.push("is-osx"), flexbe_cli.run.is_EDGE && flexbe_cli.run.is_desktop && l.push("is-edge"), flexbe_cli.run.is_firefox && flexbe_cli.run.is_desktop && l.push("is-firefox"), flexbe_cli.run.is_chrome && flexbe_cli.run.is_desktop && l.push("is-chrome"), flexbe_cli.run.is_ios && l.push("is-ios"), flexbe_cli.run.is_android && l.push("is-android"), flexbe_cli.run.is_safari && l.push("is-safari"), /Instagram/i.test(navigator.userAgent) && l.push("is-instagram");
                    try {
                        var s;
                        (s = document.body.classList).add.apply(s, l)
                    } catch (e) {
                        document.body.className += " " + l.join(" ")
                    }
                    flexbe_cli.run.is_screenshoter || (i(), window.addEventListener("popstate", i)), svg4everybody({polyfill: !flexbe_cli.is_admin && (flexbe_cli.run.is_ie || flexbe_cli.run.is_EDGE)})
                } else setTimeout(e, 10)
        }

        ["complete", "loaded"].includes(document.readyState) ? e() : document.addEventListener("DOMContentLoaded", (function () {
            e()
        })), window.addEventListener("load", (function () {
            e(), flexbe_cli.isLoaded = !0
        }))
    }
}();
"use strict";
$.observable = function (t) {
    var i = {
        _JQInit: function () {
            this._JQ = $({})
        }, emit: function (t, i) {
            return !this._JQ && this._JQInit(), this._JQ.trigger(t, i), this
        }, one: function (t, i) {
            return !this._JQ && this._JQInit(), this._JQ.one(t, i), this
        }, on: function (t, i) {
            return !this._JQ && this._JQInit(), this._JQ.on(t, i), this
        }, off: function (t, i) {
            return !this._JQ && this._JQInit(), this._JQ.off(t, i), this
        }
    };
    return "object" != typeof t && (t = this), Object.keys(i).forEach((function (n) {
        t[n] = i[n].bind(t)
    })), i
}, flexbe_cli.events = $.observable({});
"use strict";

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
        }
        return t
    }).apply(this, arguments)
}

flexbe_cli.vars = {
    init: function () {
        var t = document.getElementById("flexbe-globals");
        try {
            _extends(this, JSON.parse(t.getAttribute("data-store"))), t.parentNode.removeChild(t)
        } catch (t) {
        }
    }
};
"use strict";
flexbe_cli.run = {
    init: function () {
        var i = this;
        this.deviceInfo(), $(window).on("resized", (function () {
            i.deviceInfo()
        }))
    },
    deviceInfo: function () {
        var i = navigator.userAgent.toLowerCase();
        this.is_screen_tablet = window.innerWidth >= 768 && window.innerWidth <= 1024, this.is_screen_tablet_s = window.innerWidth >= 570 && window.innerWidth < 768, this.is_screen_mobile = window.innerWidth < 570, this.is_screen_mobile_s = window.innerWidth < 350, this.is_screen_all_mobile = this.is_screen_tablet_s || this.is_screen_mobile, this.is_screen_small_pc = window.innerWidth > 1024 && window.innerWidth < 1200, this.is_screen_pc = window.innerWidth >= 1200, this.is_touch = "ontouchstart" in window, this.is_pointer = !this.is_touch, this.is_bot = /bot|aolbuild|bingpreview|msnbot|baidu|duckduckgo|mediapartners-google|teoma|slurp/gi.test(i), this.is_mobile = -1 !== i.indexOf("mobile") || this.is_screen_mobile || this.is_screen_tablet_s, this.is_desktop = !this.is_mobile, this.is_webkit = -1 !== i.indexOf("webkit"), this.is_chrome = i.match(/(chromium|chrome)\/(\d+)/), this.is_safari = -1 !== i.indexOf("safari") && i.match(/version\/(\d+)/), this.is_firefox = -1 !== i.indexOf("firefox"), this.is_mobile_ie = -1 !== i.indexOf("iemobile"), this.is_ie = -1 !== i.indexOf("trident") || -1 !== i.indexOf("msie"), this.is_EDGE = -1 !== i.indexOf("edge"), this.is_OSX = /iPad|iPhone|iPod|Macintosh/gi.test(i), this.is_android = -1 !== i.indexOf("android"), this.is_ios = this.is_touch && this.is_mobile && this.is_OSX, this.is_screenshoter = i.indexOf("slimerjs") > -1 || i.indexOf("phantomjs") > -1, this.is_screen_mobile ? this.device_type = "mobile" : this.is_screen_tablet_s || this.is_screen_tablet ? this.device_type = "tablet" : this.device_type = "desktop"
    }
};
"use strict";

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var l = arguments[e];
            for (var i in l) Object.prototype.hasOwnProperty.call(l, i) && (t[i] = l[i])
        }
        return t
    }).apply(this, arguments)
}

flexbe_cli.lib = {
    init: function () {
        this.lg.init()
    },
    lg: {
        init: function () {
            var t, e = this,
                l = ".lg-container, .b_block, .m_modal, .w_widget";
            this.isOpen = !1, $(window).one("load.lightbox", (function () {
                e.loaded || e.require()
            }));
            var i = {};
            $(document).on("click.lightbox", "[data-lg]", (function (t) {
                t.preventDefault()
            })), $(document).on("mousedown.lightbox", "[data-lg]", (function (e) {
                if (flexbe_cli.is_admin) return !1;
                e.preventDefault(), t = e.target, i = {x: e.clientX, y: e.clientY}
            })), $(document).on("mouseup.lightbox", "[data-lg]", (function (n) {
                var o = t === n.target,
                    a = Math.sqrt(Math.pow(i.x - n.clientX, 2) + Math.pow(i.y - n.clientY, 2)) < 5;
                if (o && a) {
                    var r = $(n.currentTarget),
                        s = r.closest(l),
                        c = r.attr("href"),
                        d = "0" !== s.attr("data-loop"),
                        u = !s.attr("data-lg-single"),
                        g = s.find("[data-lg]").filter((function (t, e) {
                            var i = $(e).closest(l),
                                n = i.is(s),
                                o = i.closest(".swiper-slide-duplicate").length;
                            return n && !o
                        })).toArray().map((function (t) {
                            var e, l = $(t),
                                i = l.attr("href"),
                                n = l.attr("data-sub-html");
                            return e = n ? l.find(n).html() : l.attr("alt") || l.find("img").attr("alt") || "", {
                                src: i,
                                subHtml: e
                            }
                        })),
                        f = g.findIndex((function (t) {
                            return t.src === c
                        })) || 0;
                    e.openGallery({index: f, dynamicEl: g, enableSlide: u, loop: d})
                }
            })), $(window).on("popstate.lightbox", (function () {
                var t = history.state || {};
                t.lg ? e.openGallery(t.lg) : e.closeGallery()
            })), history.state && history.state.lg && this.openGallery(history.state.lg)
        },
        openGallery: function (t) {
            var e = this;
            if (void 0 === t && (t = {}), 0 !== t.dynamicEl.length) {
                this.$lg = $("<div/>");
                var l = this.$lg,
                    i = _extends({
                        index: 0,
                        dynamicEl: [],
                        dynamic: !0,
                        subHtmlSelectorRelative: !0,
                        getCaptionFromTitleOrAlt: !0,
                        slideEndAnimation: !1,
                        swipeThreshold: 30,
                        counter: !0,
                        closable: !0,
                        download: !1,
                        easing: "ease-out",
                        hideBarsDelay: 1e3,
                        zoomIcons: !1,
                        actualSize: !1,
                        enableSlide: !0,
                        loop: !0
                    }, t);
                i.index <= 0 && (i.index = 0), this.require((function () {
                    l.lightGallery(i)
                })), l.on("onBeforeOpen.lg", (function () {
                    e.isOpen = !0, n()
                })), l.on("onBeforeClose.lg", (function () {
                    history.state && history.state.lg && (flexbe_cli.lockPopstate = !0, history.back(), setTimeout((function () {
                        flexbe_cli.lockPopstate = !1
                    }), 20)), e.isOpen = !1
                })), l.on("onBeforeSlide.lg", (function (t, e, l) {
                    i.index = l, n()
                }))
            }

            function n() {
                var t = history.state,
                    e = i;
                flexbe_cli.lockPopstate = !0, t && t.lg ? history.replaceState({lg: e}, null, "#image-" + (e.index + 1)) : history.pushState({lg: e}, null, "#image-" + (e.index + 1)), flexbe_cli.lockPopstate = !1
            }
        },
        closeGallery: function () {
            var t = this.$lg && this.$lg.data("lightGallery");
            t && t.destroy()
        },
        require: function (t) {
            var e = this;
            $("[data-lg]").length && flexbe_cli.require(["/_s/lib/jquery/lightGallery/css/lightgallery.min.css?1", "/_s/lib/jquery/lightGallery/js/lg-spaced-bundle.min.js?1"], (function () {
                e.loaded || (e.loaded = !0, $(document).off("click.beforeLoadedLg")), "function" == typeof t && t()
            }))
        }
    }
};
"use strict";
flexbe_cli.helpers = {
    setHref: function (e) {
        var i = window.parent || window;
        if (!e) return console.warn("WRONG ACTION", "empty_link"), void (flexbe_cli.is_admin && flexbe_cli.events.emit("editor_page_error", {
            type: "action",
            error: "link_is_wrong"
        }));
        flexbe_cli.is_admin ? flexbe_cli.events.emit("editor_leave_page", {href: e}) : i.location.host === window.location.host ? i.location.href = e : location.href = e
    },
    gotoLink: function (e) {
        if (void 0 === e && (e = ""), "string" != typeof e) return !1;
        if (!/#{1,2}.+/.test(e)) return this.setHref(e), !0;
        flexbe_cli.scroll.scrollLock.unlock(), flexbe_cli.events.emit("ui_mobilemenu_close"), 4 != flexbe_cli.theme_id && $(".mobile-menu").removeClass("active").trigger("close");
        var i = (e = e.replace(/^(?:\.\/)#{2}/, "#").trim()).trim().split("#"),
            t = i[i.length - 1];
        if ("" !== i[0] && "default.htm" !== i[0] && i[0] !== location.pathname) return this.setHref(e), !0;
        var l = $('._anchor[name="' + t + '"]'),
            n = l.length ? l.closest("[data-id]") : $('[data-id="' + t + '"]'),
            o = n.closest(".b_block"),
            r = n.closest(".m_modal");
        if (o.length) this.bringIntoView(l.length ? l : n), flexbe_cli.events.emit("ui_modal_close"), setTimeout((function () {
            var e = o;
            if (n && !o.is(n)) {
                var i = o.offset().top;
                n.offset().top - i > flexbe_cli.resize.height - 100 && (e = n)
            }
            flexbe_cli.scroll.scrollTo(e)
        }), 30), history.replaceState(null, null, "#" + t);
        else if (r.length) {
            var s = r.data("id");
            this.bringIntoView(l.length ? l : n), flexbe_cli.events.emit("ui_modal_open", {id: s})
        } else history.replaceState(null, null, "#" + t), flexbe_cli.is_admin && flexbe_cli.events.emit("editor_page_error", {
            type: "action",
            error: "anchor_is_wrong"
        })
    },
    bringIntoView: function (e, i) {
        var t = $(e).eq(0);
        if (t.length && (i || t.is(":hidden"))) {
            var l = new Event("bringIntoView", {bubbles: !0, cancelable: !0});
            t[0].dispatchEvent(l)
        }
    }
};
"use strict";
!function () {
    var e = [];
    flexbe_cli.require = function (i, t, n, r) {
        if (void 0 === i && (i = ""), void 0 === t && (t = function () {
        }), void 0 === n && (n = 15e3), void 0 === r && (r = !1), i && 0 !== i.length || t(!1), !r) {
            "string" == typeof i && (i = [i]);
            var o = 0,
                c = function (n) {
                    var r = i.every((function (i) {
                        return "boolean" == typeof e[i]
                    }));
                    o += 1, r && o === i.length && t(n)
                };
            return Array.isArray(i) && i.forEach((function (e) {
                flexbe_cli.require(e, c, n, !0)
            })), !1
        }
        if (!0 === e[i]) t(!0);
        else if (Array.isArray(e[i])) e[i].push(t);
        else {
            var s, u = !1,
                d = function (t) {
                    if (void 0 === t && (t = !0), !u) {
                        u = !0, clearTimeout(s);
                        var n = e[i];
                        e[i] = t, n.forEach((function (e) {
                            "function" == typeof e && e(t)
                        }))
                    }
                };
            if (e[i] = [t], /\.css(\?.*)?$/.test(i)) {
                var a = document.createElement("link");
                a.onerror = d.bind(this, !1), a.onload = d.bind(this, !0), s = setTimeout(d.bind(this, "timeout"), n), a.rel = "stylesheet", a.href = i, document.body.appendChild(a)
            } else {
                var f = document.createElement("script");
                f.onload = d.bind(this, !0), f.onerror = d.bind(this, !1), s = setTimeout(d.bind(this, "timeout"), n), f.async = !0, f.src = i, document.body.appendChild(f)
            }
        }
    }
}();
"use strict";

function ownKeys(e, t) {
    var i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t && (o = o.filter((function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), i.push.apply(i, o)
    }
    return i
}

function _objectSpread(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(i), !0).forEach((function (t) {
            _defineProperty(e, t, i[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach((function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
        }))
    }
    return e
}

function _defineProperty(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e
}

!function () {
    var e;
    flexbe_cli.stat = {
        u_id: 0,
        time: 0,
        goals: {
            quiz: "quiz_start",
            modal: "modal_open",
            modal_form: "form_open",
            modal_done: "done_open",
            modal_product: "product_show",
            order_done: "order_done",
            pay_done: "pay_done",
            cart: "add_to_cart",
            link: "link_open",
            file: "file_load",
            close: "modal_close"
        },
        init: function () {
            this.reach_goal = this.reachGoal;
            var e, t, i = window.getCookie("f_uid");
            if (flexbe_cli.is_admin || flexbe_cli.run.is_bot || flexbe_cli.run.is_screenshoter || !flexbe_cli.p_id) return !1;
            i ? (this.u_id = i, $.ajax({
                url: "mod/stat/visit/default.htm",
                type: "POST",
                dataType: "json",
                data: {
                    s_id: flexbe_cli.s_id,
                    group_id: flexbe_cli.group_id,
                    p_id: flexbe_cli.p_id,
                    u_id: flexbe_cli.stat.u_id
                }
            }).done((function (e) {
                e.v_id || console.warn("Cookie visit not created", e)
            }))) : $.ajax({
                url: "mod/stat/default.htm",
                type: "POST",
                dataType: "json",
                data: {
                    s_id: flexbe_cli.s_id,
                    group_id: flexbe_cli.group_id,
                    p_id: flexbe_cli.p_id,
                    utm_data: (e = function (e) {
                        if ("" === e) return {};
                        for (var t = {}, i = 0; i < e.length; ++i) {
                            var o = e[i].split("=");
                            2 === o.length && (t[o[0]] = decodeURIComponent(o[1].replace(/\+/g, " ")))
                        }
                        return t
                    }(window.location.search.substr(1).split("&")), t = {}, $.each(e, (function (e, i) {
                        "utm_" === e.substring(0, 4) && (t[e] = i)
                    })), document.referrer && (t.url = document.referrer), t),
                    device: {type: flexbe_cli.run.device_type, width: window.innerWidth, browser: navigator.userAgent}
                }
            }).done((function (e) {
                "object" == typeof e && null !== e && e.u_id ? (window.setCookie("f_uid", e.u_id, {Path: "default.htm"}), flexbe_cli.stat.u_id = e.u_id, flexbe_cli.events.emit("user_created")) : console.warn("Cookie visit not setted", e)
            })), this.AB.init(), this.ecommerce.init(), this.QUIZ.init()
        },
        getGoal: function (e, t) {
            return "modal" === e && (/form/.test(t) && (e = "modal_form"), /done/.test(t) ? e = "modal_done" : /product/.test(t) ? e = "modal_product" : /quiz/.test(t) && (e = "quiz")), this.goals[e] || !1
        },
        reachGoal: function (e, t) {
            if (void 0 === t && (t = {}), !flexbe_cli.is_admin) {
                t = _objectSpread({goalAction: "send", goalValue: ""}, t), flexbe_cli.events.emit("reach_goal", e, t);
                try {
                    "object" == typeof Ya && "object" == typeof Ya._metrika.counter && Ya._metrika.counter.reachGoal(e, t), "function" == typeof ga && ga("send", {
                        hitType: "event",
                        eventCategory: e,
                        eventAction: t.goalAction,
                        eventLabel: t.goalValue
                    })
                } catch (e) {
                    console.warn("stat.js", e)
                }
            }
        },
        reachGoals: function (t, i) {
            void 0 === t && (t = {}), void 0 === i && (i = {});
            var o = ("" + (t.goal || "")).trim(),
                a = ("" + (t.mainGoal || "")).trim(),
                n = ("" + (t.htmlGoal || "")).trim();
            if (a && this.reachGoal(a, i), o) try {
                this.reachGoal(o, i)
            } catch (e) {
                console.warn("reachGoals [goal]: ", e.message)
            }
            if (n) try {
                var r = $(n)[0].outerHTML;
                if (r) {
                    r = (r = (r = r.replace(/\{\{\s*goalAction\s*\}\}/g, i.goalAction || "")).replace(/\{\{\s*goalValue\s*\}\}/g, i.goalValue || "")).replace(/(['"]?)\{\{\s*goalParams\s*\}\}\1/g, JSON.stringify(i.goalParams || {}));
                    var c = document.write;
                    document.write = function (e) {
                        $("body").eq(0).append(e)
                    };
                    var s = $('<div style="display:none">' + r + "</div>");
                    $("body").eq(0).append(s), setTimeout((function () {
                        s.remove()
                    }), 2e3), clearTimeout(e), e = setTimeout((function () {
                        document.write = c
                    }), 1e4)
                }
            } catch (e) {
                console.warn("reachGoals [htmlGoal]: ", e.message)
            }
        },
        ecommerce: {
            inited: !1, init: function () {
                this.inited = !0, window.dataLayer || (window.dataLayer = [])
            }, add: function (e, t, i, o) {
                this.inited && window.dataLayer.push({
                    ecommerce: {
                        currencyCode: flexbe_cli.locale.currency.code,
                        add: {products: [{id: e, name: t, price: o, quantity: i}]}
                    }
                })
            }, remove: function (e, t) {
                this.inited && window.dataLayer.push({
                    ecommerce: {
                        currencyCode: flexbe_cli.locale.currency.code,
                        remove: {products: [{id: e, name: t}]}
                    }
                })
            }, purchase: function (e, t) {
                if (void 0 === t && (t = !1), this.inited && (e || 0 != e.length)) {
                    t || (t = Math.ceil(1e4 * Math.random()));
                    try {
                        window.dataLayer.push({
                            ecommerce: {
                                currencyCode: flexbe_cli.locale.currency.code,
                                purchase: {
                                    actionField: {id: t}, products: e.map((function (e) {
                                        return {id: e.id, name: e.title, price: e.price, quantity: e.count}
                                    }))
                                }
                            }
                        })
                    } catch (e) {
                    }
                }
            }
        },
        AB: {
            proccess: {},
            init: function () {
                var e = this;
                flexbe_cli.events.off("entity_event.abstat").on("entity_event.abstat", (function (t, i) {
                    var o = i.type,
                        a = i.core,
                        n = i.params;
                    if (a && "onView" === o && n.state && n.first) {
                        var r = a.abtestId,
                            c = a.abtestVariant;
                        c && e.fixView(r, c)
                    }
                }))
            },
            setCookie: function (e) {
                window.setCookie("f_ab", JSON.stringify(e), {
                    expires: 604800,
                    path: "/",
                    domain: document.location.hostname
                })
            },
            getCookie: function () {
                var e = window.getCookie("f_ab");
                if (e) try {
                    e = JSON.parse(decodeURIComponent(e))
                } catch (e) {
                    console.warn("Can`t parse abtest cookie", e)
                }
                return e || (e = {view: {}, lead: []}), e
            },
            fixView: function (e, t) {
                var i = this;
                if (null == e || null == t || "a" !== t && "b" !== t) return !1;
                null != this.getCookie().view[e] || this.proccess[e] || (this.proccess[e] = !0, $.ajax({
                    url: "mod/stat/abtest",
                    type: "POST",
                    dataType: "json",
                    data: {testId: e, variant: t, s_id: flexbe_cli.s_id, p_id: flexbe_cli.p_id}
                }).done((function (o) {
                    if (i.proccess[e] = !1, 1 == o.status) {
                        var a = i.getCookie();
                        a.view[e] = t, i.setCookie(a)
                    }
                })))
            }
        },
        QUIZ: {
            inited: !1,
            init: function () {
                var e = this;
                this.inited || (this.inited = !0, flexbe_cli.events.on("quiz_event.stat", (function (t, i) {
                    void 0 === i && (i = {});
                    var o = i.payload || {};
                    if (["step", "submit"].includes(i.event) && ("step" !== i.event || o.toNext)) {
                        var a = i.quiz,
                            n = i.answerGoals,
                            r = i.resultGoals,
                            c = a.core.id,
                            s = o.fromAnswers || [],
                            l = o.toId,
                            d = o.sessionId,
                            u = o.fromId,
                            f = s.reduce((function (e, t) {
                                return e.concat((t.variants || []).map((function (e) {
                                    return e.id
                                })))
                            }), []);
                        if (e.fixAnswer({
                            sessionId: d,
                            sectionId: c,
                            answerStep: u,
                            answerVariants: f,
                            viewStep: l
                        }), n) {
                            s.forEach((function (e) {
                                if (e.variants && e.variants.length) e.variants.forEach((function (e) {
                                    var t = e.value;
                                    flexbe_cli.stat.reachGoals(n, {goalAction: "answer", goalValue: t})
                                }));
                                else {
                                    var t = e.value || "";
                                    ["email", "phone", "name"].includes(e.type) && (t = ""), flexbe_cli.stat.reachGoals(n, {
                                        goalAction: "answer",
                                        goalValue: t
                                    })
                                }
                            }))
                        }
                        r && flexbe_cli.stat.reachGoals(r)
                    }
                })))
            },
            fixAnswer: function (e) {
                var t, i = e.sectionId,
                    o = e.sessionId,
                    a = e.answerStep,
                    n = e.viewStep,
                    r = e.answerVariants;

                function c() {
                    $.ajax({
                        url: t,
                        type: "POST",
                        dataType: "json",
                        data: {
                            s_id: flexbe_cli.s_id,
                            group_id: flexbe_cli.group_id,
                            f_uid: flexbe_cli.stat.u_id,
                            page_id: flexbe_cli.p_id,
                            session_id: o,
                            section_id: i,
                            answer_step: a,
                            answer_variants: r,
                            view_step: n
                        }
                    })
                }

                n && a ? t = "mod/quiz/stat/save/composite/default.htm" : a
            @t
                = "mod/quiz/stat/save/answer/default.htm"
            :
                n && (t = "mod/quiz/stat/save/view/default.htm"), t && (flexbe_cli.stat.u_id ? c() : flexbe_cli.events.one("user_created", (function () {
                    c()
                })))
            }
        }
    }
}();
"use strict";

function _extends() {
    return (_extends = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
        }
        return e
    }).apply(this, arguments)
}

!function () {
    var e = function (e, t, r, a) {
        var n, i;
        return void 0 === t && (t = 2), void 0 === r && (r = ","), void 0 === a && (a = "."), isNaN(t = Math.abs(t)) && (t = 2), (i = (n = parseInt(e = (+e || 0).toFixed(t), 10) + "").length) > 3 ? i %= 3 : i = 0, (i ? n.substr(0, i) + a : "") + n.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + a) + (t ? r + Math.abs(e - n).toFixed(t).replace(/-/, 0).slice(2) : "")
    };
    flexbe_cli.locale = _extends({
        language: "en",
        country: "US",
        currency: {code: "USD", symbol: "$"},
        date_format: {
            dateLiteral: "/",
            dateMask: "DD/MM/YYYY",
            firstDay: 1,
            dateTimeLiteral: ", ",
            hour12: !1,
            timeLiteral: ":",
            timeMask: "HH:MM"
        },
        translation: {},
        currency_format: {},
        init: function (e) {
            var t = this;
            void 0 === e && (e = "body"), $("[data-lang]", e).each((function (e, r) {
                var a = $(r).attr("data-lang"),
                    n = $(r).attr("data-lang-content"),
                    i = String(t.tr(a));
                $(r).html(i.replace(/%s/, n))
            }))
        },
        tr: function (e, t) {
            if (!e) return "";
            var r = /^currency/.test(e) ? this.currency : this.translation,
                a = String(e).replace(/^currency\./, "").split(/\.|:{2}/).reduce((function (e, t) {
                    return e && e[t]
                }), r) || "";
            return a ? this.interpolate(a, t) : e
        },
        interpolate: function (e, t) {
            for (var r in void 0 === t && (t = {}), t) "_" !== r && t.hasOwnProperty(r) && (e = e.replace(new RegExp("%" + r + "%", "g"), t[r]));
            return e
        },
        parseMoney: function (e, t) {
            void 0 === t && (t = 2);
            var r = (e = String(e).replace(/,/g, ".").replace(/ /g, "").replace(/(?!^)\-/g, "").replace(/^\./g, "0.")).replace(/[^\d\.]/g, ""),
                a = ((r.match(new RegExp("\\.\\d{1," + t + "}$")) || [])[0] || "").replace(/\D/g, ""),
                n = r.replace(new RegExp("\\." + a + "$"), "");
            n = parseInt(n.replace(/[^\d-]/g, ""), 10) || 0, parseInt(a, 10) || (a = "");
            var i = parseFloat(a ? n + "." + a : n);
            return /^-/.test(e) ? -i : i
        },
        formatMoney: function (t, r) {
            var a = void 0 === r ? {} : r,
                n = a.currencyFormat,
                i = void 0 === n ? this.currency_format : n,
                o = a.currencyData,
                c = void 0 === o ? this.currency : o,
                l = a.freeLabel,
                s = void 0 !== l && l;
            if (!(t = parseFloat(t)) && s) return flexbe_cli.locale.tr("cart::free_price");
            var u = i.str,
                f = i.d,
                d = Math.abs(t) >= 1e4 ? i.t : "",
                p = i.d_force || parseInt(t, 10) !== t ? c.decimals : 0,
                v = e(Math.abs(t), p, f, d),
                m = v;
            return u && (m = u.replace(":value", v).replace(":symbol", c.symbol)), t < 0 && (m = "-" + m), m.trim()
        },
        formatNumber: function (t, r, a) {
            void 0 === a && (a = this.currency_format);
            var n = a.d,
                i = Math.abs(t) >= 1e4 ? a.t : "";
            return r = null != r ? r : a.d_force || parseInt(t, 10) !== t ? this.currency.decimals : 0, e(Math.abs(t), r, n, i)
        },
        animateNumber: function (e) {
            var t = this,
                r = e.target,
                a = e.from,
                n = e.to,
                i = e.asMoney,
                o = e.freeLabel,
                c = void 0 === o || o,
                l = e.duration,
                s = e.easing;
            if (!r) return !1;
            var u = $(r);
            null == a && (a = this.parseMoney(u.text()) || "");
            var f = Math.abs(a - n);
            if (a !== n)
                if (r._animation && (r._animation.pause(), r._animation.reset()), i && (!n || !a) || f < 3 || "function" != typeof anime) u.text(i ? this.formatMoney(n, {freeLabel: c}) : n);
                else {
                    var d = {value: a};
                    null == l && (l = Math.max(150, Math.min(.3 * f, 650))), null == s && (s = "linear"), r._animation = anime({
                        targets: d,
                        value: n,
                        duration: l,
                        easing: s,
                        update: function () {
                            var e = Math.floor(d.value),
                                r = i ? t.formatMoney(e, {freeLabel: c}) : e;
                            u.text(r)
                        },
                        complete: function () {
                            var e = i ? t.formatMoney(n, {freeLabel: c}) : n;
                            u.text(e)
                        }
                    })
                }
        }
    }, flexbe_cli.locale)
}();
"use strict";
var docResizeTimer;
flexbe_cli.resize = {
    width: window.innerWidth,
    height: window.innerHeight,
    oldWidth: window.innerWidth,
    oldHeight: window.innerHeight,
    init: function () {
        this.simulateWindowResized(), this.simulateDocumentResize()
    },
    simulateWindowResized: function () {
        var e, i = this,
            t = this.oldWidth,
            n = this.oldHeight;
        $(window).on("resize orientationchange", (function () {
            i.width = window.innerWidth, i.height = window.innerHeight, clearTimeout(e), e = setTimeout((function () {
                i.oldWidth = t, i.oldHeight = n, t = i.width, n = i.height, $(window).trigger("resized")
            }), 80)
        }))
    },
    simulateDocumentResize: function () {
        var e = this;
        this.documentHeight = $(document).height();
        var i = flexbe_cli.is_admin ? 500 : 150,
            t = function (i) {
                void 0 === i && (i = 0);
                var t = $(document).height();
                Math.abs(t - e.documentHeight) >= 5 && (e.documentHeight = t, document.dispatchEvent(new CustomEvent("documentresize")), clearTimeout(docResizeTimer), docResizeTimer = setTimeout((function () {
                    document.dispatchEvent(new CustomEvent("documentresized"))
                }), i))
            };
        if ("function" == typeof ResizeObserver) {
            var n = !0;
            new ResizeObserver((function () {
                n ? n = !1 : t(i)
            })).observe(document.querySelector("body"))
        } else setInterval((function () {
            t(0)
        }), i)
    }
};
"use strict";
flexbe_cli.scroll = {
    inScroll: !1,
    skip: !1,
    latest: window.pageYOffset,
    init: function () {
        var e = this;
        this.latest = window.pageYOffset, document.addEventListener("mousewheel", (function () {
            e.$inScrollElement && (e.$inScrollElement.stop(), e.$inScrollElement = null)
        }), {passive: !0}), document.addEventListener("scroll", (function () {
            e.latest = window.pageYOffset, e.inScroll = !0
        }), {passive: !0}), document.addEventListener("scrollend", (function () {
            e.inScroll = !1
        }), {passive: !0}), this.scrollLock.init(), this.scrollImprovement.init()
    },
    scrollImprovement: {
        scrollTimer: 0,
        pointerState: !1,
        init: function () {
            this.createStopScrollEvent(), this.pointerEvents()
        },
        createStopScrollEvent: function () {
            var e = this,
                l = flexbe_cli.scroll.latest;
            document.addEventListener("scroll", (function () {
                var o = l > flexbe_cli.scroll.latest ? "up" : "down",
                    t = Math.max(flexbe_cli.scroll.latest - l, l - flexbe_cli.scroll.latest);
                clearTimeout(e.scrollTimer), e.scrollTimer = setTimeout((function () {
                    l = flexbe_cli.scroll.latest, document.dispatchEvent(new CustomEvent("scrollend", {
                        detail: {
                            direction: o,
                            distance: t
                        }
                    }))
                }), 200)
            }), {passive: !0})
        },
        pointerEvents: function () {
            var e = this;
            flexbe_cli.is_admin || (document.addEventListener("scroll", (function () {
                e.pointerState || (e.pointerState = !0)
            }), {passive: !0}), document.addEventListener("scrollend", (function () {
                e.pointerState && (e.pointerState = !1)
            })))
        }
    },
    scrollLock: {
        loaded: !1,
        locked: !1,
        init: function () {
            var e = this;
            this.loaded || flexbe_cli.require(["_s/lib/scroll-lock/scroll-lock.min.js"], (function () {
                e.loaded = !0, scrollLock.addScrollableSelector([".scroller", ".scrollable"]), e.locked && scrollLock.disablePageScroll()
            }))
        },
        lock: function () {
            this.locked = !0, $("body").addClass("overflow"), "undefined" != typeof scrollLock && scrollLock.disablePageScroll()
        },
        unlock: function () {
            this.locked = !1, $("body").removeClass("overflow"), "undefined" != typeof scrollLock && (scrollLock.clearQueueScrollLocks(), scrollLock.enablePageScroll())
        }
    },
    scrollTo: function (e, l) {
        var o = this;
        void 0 === l && (l = {});
        var t = $(e);
        if (!(e = t[0])) return !1;
        null == l.animation && (l.animation = !0), null == l.centered && (l.centered = !0), null == l.force && (l.force = !0);
        var n, i = 0,
            c = 0,
            r = window.scrollParent(e, "y");
        r && !$(r).is(".b_block, .container-list") || (r = document.scrollingElement);
        var s = r === document.body || r === document.documentElement,
            a = s ? window.innerHeight : r.offsetHeight,
            d = l.padding || 0,
            f = t.offset().top,
            u = e.offsetHeight,
            m = s ? $("html, body") : $(r);
        flexbe_cli.run.is_mobile ? n = m.find(".menu-fixed > .nav-header") : 4 == flexbe_cli.theme_id ? (n = m.find(".floating-header.fixed-header"))[0] || (c = (n = m.find(".floating-header > .header-content"))[0] && flexbe_cli.run.is_screen_pc ? 20 : 0) : n = m.find('.floating[data-floating="true"]'), n && n.length && (c += n[0].offsetHeight - 2);
        var p = Math.max(0, a - c - u);
        if (u >= a && (l.centered = !1), i = l.centered ? f - Math.max(0, p / 2) - c : f - d - c, l.offset && (i += l.offset), !l.force) {
            var v = r.offsetTop,
                h = t[0].getBoundingClientRect();
            if (h.top >= v && h.bottom <= v + a) return !1
        }
        this.$inScrollElement = m, $(document).off("documentresize.scrollTo").on("documentresize.scrollTo", (function () {
            o.scrollTo(e, l)
        })), m.stop(), m.animate({scrollTop: i}, {
            duration: l.duration ? l.duration : l.animation ? 450 : 0,
            easing: l.animation ? "swing" : "linear",
            complete: function () {
                var e;
                o.$inScrollElement = !1, $(document).off("documentresize.scrollTo"), "function" == typeof l.complete && (e = l).complete.apply(e, arguments)
            }
        })
    }
};
"use strict";
!function () {
    var e, t, a, i = !1,
        r = !1;
    flexbe_cli.header = {
        $floating: !1,
        offset: 0,
        init: function () {
            var e = this;
            flexbe_cli.is_admin || (this.floatingHeader(), $(window).off("resized.floatingHeader").on("resized.floatingHeader", (function () {
                e.floatingHeader(!0)
            })))
        },
        floatingHeader: function (n) {
            var s = this,
                f = flexbe_cli.responsive && flexbe_cli.run.is_screen_all_mobile;
            if (flexbe_cli.is_admin || f) return !1;
            var o = $(".header-wrapper.floating-header");
            if (!o.length) return !1;
            n || (o.removeClass("fixed-header"), o.find("[data-contrast]").removeAttr("data-contrast"), o.parent().css("min-height", ""));
            var d = o.eq(0),
                l = d.parent(),
                c = d.closest(".b_block"),
                h = d.find(".content-zone"),
                m = d.attr("data-fixed-contrast") || "inherit";
            cancelAnimationFrame(a),
                function n() {
                    a = requestAnimationFrame(n);
                    var o = c[0]._core;
                    if (!flexbe_cli.scroll.skip && o) {
                        var u = o.tween.start + Math.min(o.tween.height, 150) + 150,
                            g = flexbe_cli.scroll.latest > u,
                            _ = i && flexbe_cli.scroll.latest <= Math.min(u, o.tween.end);
                        if (r !== g) {
                            if (r = g, clearTimeout(e), clearTimeout(t), _) return i = !1, s.offset = 0, h.removeAttr("data-contrast"), d.removeClass("fixed-header fade-in fade-out"), void l.css("min-height", "");
                            if (g) t = setTimeout((function () {
                                i = !0, s.offset = d[0].offsetHeight, l.css("min-height", s.offset + "px"), d.addClass("fade-in"), d.addClass("fixed-header"), h.attr("data-contrast", m), o && o._tween({fixed: !0}), d.trigger("transform-header"), e = setTimeout((function () {
                                    d.removeClass("fade-in fade-out"), i = !1
                                }), 300)
                            }), f ? 0 : 300);
                            else i = !0, s.offset = 0, d.addClass("fade-out"), o && o._tween({fixed: !1}), e = setTimeout((function () {
                                d.removeClass("fixed-header fade-in fade-out"), d.trigger("transform-header"), h.removeAttr("data-contrast"), l.css("min-height", ""), i = !1
                            }), 200)
                        }
                    }
                }()
        }
    }
}();
"use strict";
!function () {
    var e = {};
    flexbe_cli.block = {
        hasOverlay: [],
        $list: !1,
        get $blocks() {
            return this._$blocks && !flexbe_cli.is_admin || (this._$blocks = this.$list && this.$list.find(".b_block")), this._$blocks
        },
        init: function () {
            var e = this;
            this.$list = $(" header, .container-list, footer"), this.$blocks.toArray().forEach((function (i) {
                var t = e.bind(i);
                t && !t.inited && t.init({}), flexbe_cli.element && flexbe_cli.element.initArea(i)
            })), this.dispatchEvents()
        },
        dispatchEvents: function () {
            var e = this;
            $(document).on("documentresized.flexbe_block", (function () {
                e.checkSizes()
            })), $(window).on("resized.flexbe_block orientationchange.flexbe_block", (function () {
                e.checkSizes();
                var i = flexbe_cli.run.is_mobile ? 200 : 10;
                Math.abs(flexbe_cli.resize.height - flexbe_cli.resize.oldHeight) > i && e.fixCoverHeight()
            })), flexbe_cli.is_admin && (flexbe_cli.events.on("block_render.flexbe_block", (function (i, t) {
                if (t && t.id) {
                    var n = $('[data-id="' + t.id + '"]', e.$list)[0],
                        l = e.bind(n);
                    l && l.init(t)
                }
            })), flexbe_cli.events.on("block_resize", (function (i, t) {
                if (t && t.id) {
                    var n = document.querySelector('[data-id="' + t.id + '"]'),
                        l = e.bind(n);
                    l && l._onResize(t)
                }
            })), flexbe_cli.events.on("block_remove", (function (e, i) {
                var t = document.querySelector('[data-id="' + i.id + '"]');
                t && (t._core = null)
            })), flexbe_cli.events.on("client_msg.flexbe_block", (function (i, t) {
                if (t && t.id && "block" === t.is) {
                    var n = $('[data-id="' + t.id + '"]', e.$list)[0],
                        l = e.bind(n);
                    l && l._onMsg(t.msg, t.data)
                }
            })), flexbe_cli.events.off("layout_change.flexbe_block").on("layout_change.flexbe_block", $.debounce((function (i, t) {
                t && "block" !== !t.is && (e.$blocks.each((function (e, i) {
                    i._core && i._core.updateTweens()
                })), e.fixCoverHeight())
            }), 100)))
        },
        pushOverlay: function (e, i) {
            return i && this.hasOverlay.includes(e) && this.hasOverlay.splice(this.hasOverlay.indexOf(e)), this.hasOverlay.push(e), !0
        },
        removeOverlay: function (e) {
            return this.hasOverlay.includes(e) && this.hasOverlay.splice(this.hasOverlay.indexOf(e)), !0
        },
        checkSizes: function () {
            var e = this;
            this.$blocks.toArray().forEach((function (i) {
                var t = e.bind(i);
                t && t._onResize({})
            }))
        },
        fixCoverHeight: function (e) {
            void 0 === e && (e = this.$list.find(".b_block")), e.length && e.each((function (e, i) {
                var t = $(i),
                    n = t.find(".cover");
                if (n.length) {
                    var l = flexbe_cli.resize.height,
                        c = 0,
                        o = l;
                    if (t.next().length && (o += 1), [2, 3].includes(flexbe_cli.theme_id)) {
                        var s, r = t.prevAll(".b_block");
                        s = (s = flexbe_cli.is_admin && t.is('[data-abtest-variant="b"]') ? r.eq(1) : r.eq(0)).filter('[data-b-type*="header"]').not('[data-b-type*="overflow"]'), (c = Math.max(0, s.outerHeight() || 0)) < 250 && c < l / 2.5 && (o -= c)
                    }
                    n.css("min-height", o + "px")
                }
            }))
        },
        bind: function (i) {
            if (!i) return !1;
            var t = i.getAttribute("data-b-id"),
                n = i._core;
            if (t && !n) {
                var l = e[t] || {};
                n = new BlockCore(i, l), i._core = n
            }
            return n
        },
        register: function (i, t) {
            void 0 === t && (t = {}), i || console.warn("Element register error: Element must have templateId"), e[i] = t
        }
    }
}();
"use strict";
!function () {
    var e = {};
    flexbe_cli.modal = {
        opened: {},
        get $modals() {
            return this._$modals && !flexbe_cli.is_admin || (this._$modals = this.$list && this.$list.find(".m_modal")), this._$modals
        },
        init: function () {
            var e = this;
            this.list = document.querySelector(".modal-list"), this.$list = $(this.list), this.$modals.toArray().forEach((function (i) {
                var o = e.bind(i, {}, "init");
                o && !o.inited && o.init({}), flexbe_cli.element && flexbe_cli.element.initArea(i)
            }));
            var i = getJsonFromUrl();
            if (i.service && i.m_id) return this.$list.addClass("noanimate"), this.open({id: i.m_id}), !1;
            this.dispatchEvents()
        },
        dispatchEvents: function () {
            var e = this,
                i = $("body");
            flexbe_cli.events.on("modal_render.flexbe_modal", (function (i, o) {
                if (o && o.id) {
                    var t = (e.find(o.id) || {}).modal,
                        n = e.bind(t);
                    n && n.init(o)
                }
            })), flexbe_cli.events.on("modal_remove", (function (e, i) {
                var o = document.querySelector('[data-id="' + i.id + '"]');
                o && (o._core = null)
            })), flexbe_cli.events.on("client_msg.flexbe_modal", (function (i, o) {
                if (o && o.id && "modal" === o.is) {
                    var t = (e.find(o.id) || {}).modal,
                        n = e.bind(t);
                    n && n._onMsg(o.msg, o.data)
                }
            })), flexbe_cli.events.on("ui_modal_open.core_modal", (function (i, o) {
                void 0 === o && (o = {}), e.open(o)
            })), flexbe_cli.events.on("ui_modal_close.core_modal", (function (i, o) {
                void 0 === o && (o = {}), e.close(o)
            })), i.on("click.modal-close", ".m_modal .close", (function (i) {
                i.preventDefault(), i.stopPropagation();
                var o = $(i.currentTarget).closest(".m_modal").data("id");
                e.close({id: o})
            }));
            var o, t, n = function () {
                if (flexbe_cli.is_admin && (window.parent.flexbe.modal.visible || []).length) return !1;
                return !0
            };
            i.off(".modal-close-overlay").on("mousedown.modal-close-overlay mouseup.modal-close-overlay", ".modal-data", (function (i) {
                if (!(flexbe_cli.responsive && flexbe_cli.run.is_screen_all_mobile || !Object.keys(e.opened).length) && n()) {
                    if ("mousedown" === i.type) return o = $(i.target).is(".modal-data") || $(i.target).is('[data-overlay="true"]') ? i.target : null, void (t = i.target.clientWidth <= i.pageX);
                    if (o === i.target && !t) {
                        var l = $(".m_modal.show").eq(0).attr("data-id");
                        e.close({id: l})
                    }
                }
            })), $(window).off(".modal-close-esc").on("keyup.modal-close-esc", (function (i) {
                27 === i.which && n() && e.close({id: $(".m_modal.show").eq(0).attr("data-id")})
            }))
        },
        find: function (e) {
            var i = this.$list.find('[data-id="' + e + '"]').toArray(),
                o = i[0] || !1;
            return !!o && {modals: i, modal: o}
        },
        open: function (e) {
            var i = void 0 === e ? {} : e,
                o = i.id,
                t = i.data,
                n = void 0 === t ? {} : t,
                l = i.options,
                a = void 0 === l ? {} : l,
                d = this.find(o) || {},
                r = d.modals,
                s = d.modal,
                c = $(r);
            if (!s) return console.warn("WRONG ACTION", "modal_not_found", o), flexbe_cli.is_admin && flexbe_cli.events.emit("editor_page_error", {
                type: "action",
                error: "modal_is_wrong"
            }), !1;
            if (c.length > 1) {
                var m = a.multivar;
                if (!m) {
                    var f = String(o).split("_")[0];
                    m = $('[data-id="' + f + '"]').attr("data-multivar")
                }
                var u = [];
                m && "default" !== m && (u = c.filter('[data-multivar="' + m + '"]').eq(0)), s = (c = u.length ? u.eq(0) : c.eq(0))[0]
            }
            var v = this.bind(s);
            if (s && !v) return console.warn("Try to open modal without core object,", "id: " + o + ",", "modal: ", s), !1;
            var _ = Object.keys(this.opened),
                h = _[_.length - 1];
            return h && this.close({id: h, openId: o}), v.open({fromId: h, data: n, options: a}), this.opened[o] = v, !0
        },
        close: function (e) {
            var i = this,
                o = void 0 === e ? {} : e,
                t = o.id,
                n = o.openId;
            if (!t) return Object.keys(this.opened).map((function (e) {
                return !(!i.opened[e] || e == n) && i.close({id: e, openId: n})
            }));
            if (!this.opened[t]) return !1;
            delete this.opened[t];
            var l = (this.find(t) || {}).modal,
                a = this.bind(l);
            return l ? a ? (a.close({openId: n}), !0) : (console.warn("Try to close modal without core object"), !1) : void 0
        },
        bind: function (i) {
            if (!i) return !1;
            var o = i.getAttribute("data-m-id"),
                t = i._core;
            if (o && !t) {
                var n = e[o] || {};
                t = new ModalCore(i, n), i._core = t
            }
            return t
        },
        register: function (i, o) {
            void 0 === o && (o = {}), i || console.warn("Element register error: Element must have templateId"), e[i] = o
        }
    }
}();
"use strict";

function ownKeys(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e && (r = r.filter((function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }))), i.push.apply(i, r)
    }
    return i
}

function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? ownKeys(Object(i), !0).forEach((function (e) {
            _defineProperty(t, e, i[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach((function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
        }))
    }
    return t
}

function _defineProperty(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t
}

!function () {
    var t = {};
    flexbe_cli.widget = {
        init: function () {
            var t = this;
            this.$list = $(".widget-list"), this.list = this.$list.get(0), this.cart && this.cart.init(), this.$list.find(".w_widget").toArray().forEach((function (e) {
                var i = t.bind(e, {}, "init");
                i && !i.inited && i.init({}), flexbe_cli.element && flexbe_cli.element.initArea(e)
            })), this.dispatchEvents()
        },
        dispatchEvents: function () {
            var t = this;
            flexbe_cli.events.on("widget_render.flexbe_widget", (function (e, i) {
                if (i && i.id) {
                    var r = $('[data-id="' + i.id + '"]', t.$list)[0],
                        n = t.bind(r);
                    n && n.init(i)
                }
            })), flexbe_cli.events.on("widget_remove", (function (t, e) {
                var i = document.querySelector('[data-id="' + e.id + '"]');
                i && (i._core = null)
            })), flexbe_cli.events.on("client_msg.flexbe_widget", (function (e, i) {
                if (i && i.id && "widget" === i.is) {
                    var r = t.list.querySelector('[data-id="' + i.id + '"]'),
                        n = t.bind(r);
                    n && n._onMsg(i.msg, i.data)
                }
            }))
        },
        bind: function (e) {
            if (!e) return !1;
            var i = e.getAttribute("data-w-id"),
                r = e._core;
            if (!r) {
                var n = t[i] || {};
                r = new WidgetCore(e, n), e._core = r
            }
            return r
        },
        register: function (e, i) {
            void 0 === i && (i = {}), e || console.warn("Element register error: Element must have templateId"), t[e] = i
        }
    }
}(),
    function () {
        var t = [],
            e = function () {
                function t(t) {
                    $.observable(this), this.cart = t
                }

                var e = t.prototype;
                return e.init = function () {
                    this.methods = (flexbe_cli.vars._group.ecommerce.delivery || []).filter((function (t) {
                        return t.enabled
                    })), this.cartSettings = flexbe_cli.vars._group.ecommerce.cart || {}, this.enabled = this.methods.length > 0, this.activeMethod = this.methods[0]
                }, e.dispatch = function (t) {
                    var e = this[t];
                    if ("function" != typeof e) throw new Error("Delivery dispatch: action '" + t + "' doesnt exist");
                    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) r[n - 1] = arguments[n];
                    var o = e.apply(this, r);
                    this.emit("dispatch", {name: t, args: r, result: o})
                }, e.getActive = function () {
                    var t = this.activeMethod;
                    if (t) {
                        var e = this.getPrice(t.id);
                        return {id: t.id, type: t.type, title: t.title, desc: t.desc, price: e}
                    }
                }, e.getMethod = function (t) {
                    return this.methods.find((function (e) {
                        return e.id == t
                    }))
                }, e.selectMethod = function (t) {
                    return this.activeMethod = this.getMethod(t) || this.methods[0], this.activeMethod
                }, e.getPrice = function (t) {
                    var e, i, r = t ? this.getMethod(t) : this.activeMethod,
                        n = this.cartSettings.use_total ? +this.cartSettings.total : 0,
                        o = 0,
                        c = 0,
                        a = "",
                        s = 0,
                        l = "",
                        u = 0,
                        f = "",
                        d = 0,
                        h = "",
                        p = 0;
                    if (r) {
                        var m = this.cart.getTotal();
                        r.prices.filter((function (t) {
                            return "" !== t.from
                        })).forEach((function (t, e) {
                            r.useMinTotal && !e && +t.from && (o = +t.price, +t.from > n && (u = +t.from)), (m >= +t.from || !e) && (o = +t.price)
                        })), r.useNotFixTotal && (p = r.useNotFixTotal);
                        var g = r.prices.find((function (t) {
                            return 0 === t.price
                        }));
                        i = r.useNotFixTotal && "" === g.from, g && (c = +g.from || 0, s = Math.max(0, c - m), a = flexbe_cli.locale.formatMoney(c), l = flexbe_cli.locale.formatMoney(s)), u && (d = Math.max(0, u - m), f = flexbe_cli.locale.formatMoney(u), h = flexbe_cli.locale.formatMoney(d))
                    }
                    return e = flexbe_cli.locale.formatMoney(o, {freeLabel: !0}), {
                        current: o,
                        currentFormatted: e,
                        freeFrom: c,
                        freeFromFormatted: a,
                        untilFree: s,
                        untilFreeFormatted: l,
                        minTotal: u,
                        minTotalFormatted: f,
                        untilMinTotal: d,
                        untilMinTotalFormatted: h,
                        useNotFixTotal: p,
                        isNotFree: i
                    }
                }, t
            }(),
            i = function () {
                function i() {
                    $.observable(this), this.delivery = new e(this)
                }

                var r = i.prototype;
                return r.init = function () {
                    this.initList(), this.delivery.init()
                }, r.dispatch = function (t) {
                    var e = this[t];
                    if ("function" != typeof e) throw new Error("Cart dispatch: action '" + t + "' doesnt exist");
                    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) r[n - 1] = arguments[n];
                    var o = e.apply(this, r);
                    this.emit("dispatch", {name: t, args: r, result: o})
                }, r.initList = function () {
                    if (flexbe_cli.is_admin) {
                        var e = "ru" === flexbe_cli.locale.language,
                            i = "RUB" === flexbe_cli.locale.currency.code;
                        t = [{
                            id: "7832324_1",
                            count: 1,
                            protect: 1,
                            img: "/img/1000000945_200.jpg",
                            title: e ? "Пример товара" : "Example Item",
                            price: i ? 750 : 10
                        }, {
                            id: "7832464_2",
                            count: 2,
                            protect: 1,
                            img: "/img/1000000948_200.jpg",
                            title: e ? "Другой товар" : "Another Item",
                            price: i ? 2550 : 25
                        }], this.emit("list_loaded", {})
                    } else try {
                        t = JSON.parse(localStorage.getItem("f_cart")) || [], this.emit("list_loaded", {})
                    } catch (t) {
                        console.error(t)
                    }
                }, r.getList = function () {
                    return t
                }, r.getItem = function (e) {
                    return t.find((function (t) {
                        return t.id === e
                    }))
                }, r.getCount = function () {
                    return t.reduce((function (t, e) {
                        return e.count && (t += parseInt(e.count, 10)), t
                    }), 0)
                }, r.getTotal = function () {
                    return t.reduce((function (t, e) {
                        return e.count && e.price && (t += parseInt(e.count, 10) * parseFloat(e.price)), t
                    }), 0)
                }, r.updateList = function (e) {
                    if (!Array.isArray(e)) return !1;
                    if (t = [].concat(e), !flexbe_cli.is_admin) try {
                        localStorage.setItem("f_cart", JSON.stringify(e))
                    } catch (t) {
                    }
                    return t
                }, r.resetList = function () {
                    var e = [].concat(t).filter((function (t) {
                        return t.protect
                    }));
                    this.updateList(e)
                }, r.addItem = function (e) {
                    if (!e.id) throw new Error("Cart add item: product ID is not defined");
                    e.count = parseInt(e.count, 10) || 1, e.price = parseFloat(e.price) || 0, e.type = e.type || "product";
                    var i = this.getItem(e.id);
                    return i ? i.count += e.count : t.push(_objectSpread({}, e)), this.updateList(t), flexbe_cli.stat.ecommerce.add(e.id, e.title, e.count, e.price), t
                }, r.removeItem = function (e) {
                    var i = this.getItem(e);
                    return !(!i || i.protect) && (t.splice(t.indexOf(i), 1), this.updateList(t), flexbe_cli.stat.ecommerce.remove(i.id, i.title), t)
                }, r.updateCount = function (e) {
                    var i = e.id,
                        r = e.count,
                        n = this.getItem(i);
                    return !!n && ("+" === r ? n.count += 1 : "-" === r && n.count > 1 ? n.count -= 1 : (r = parseInt(r, 10), n.count = r || 1), this.updateList(t), n)
                }, i
            }();
        flexbe_cli.widget.cart = new i
    }();
"use strict";
!function () {
    var e = {};
    flexbe_cli.element = {
        instances: {},
        get $zones() {
            return $('[data-is="zone"]')
        },
        get $elements() {
            return $('[data-is="element"]')
        },
        init: function () {
            this.dispatchEvents()
        },
        initArea: function (e, t) {
            var n, i, r = this,
                a = function (e) {
                    var n = r.bind(e);
                    n && !n.inited && n.init(t)
                };
            if (e) {
                var o = $(e);
                n = o.find('[data-is="zone"]').addBack('[data-is="zone"]'), i = o.find('[data-is="element"]').addBack('[data-is="element"]')
            } else n = this.$zones, i = this.$elements;
            n.toArray().forEach(a), i.toArray().forEach(a)
        },
        dispatchEvents: function () {
            var e = this;
            flexbe_cli.is_admin && (flexbe_cli.events.on("element_render.flexbe_element", (function (t, n) {
                n && n.id && Array.from(document.querySelectorAll('[data-id="' + n.id + '"]')).forEach((function (t) {
                    var i = e.bind(t);
                    i && i.init(n, i.inited ? "update" : "init")
                }))
            })), flexbe_cli.events.on("element_resize", (function (t, n) {
                if (n && n.id) {
                    var i = document.querySelector('[data-id="' + n.id + '"]'),
                        r = e.bind(i);
                    r && (n.force = !0, r._onResize(n))
                }
            })), flexbe_cli.events.on("element_remove", (function (e, t) {
                Array.from(document.querySelectorAll('[data-id="' + t.id + '"]')).forEach((function (e) {
                    e && (e._core = null)
                }))
            })), flexbe_cli.events.on("client_msg.flexbe_element", (function (t, n) {
                if (n && n.id && "element" === n.is) {
                    var i = document.querySelector('[data-id="' + n.id + '"]'),
                        r = e.bind(i);
                    r && r._onMsg(n.msg, n.data)
                }
            })))
        },
        bind: function (t) {
            if (!t) return !1;
            var n = t.getAttribute("data-e-id"),
                i = t._core;
            if (!i) {
                var r = e[n] || {};
                i = new ElementCore(t, r), t._core = i
            }
            return i
        },
        register: function (t, n) {
            void 0 === n && (n = {}), t || console.warn("Element register error: Element must have templateId"), e[t] = n
        }
    }
}();
"use strict";

function _extends() {
    return (_extends = Object.assign || function (e) {
        for (var o = 1; o < arguments.length; o++) {
            var t = arguments[o];
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        return e
    }).apply(this, arguments)
}

!function () {
    var e = function () {
        function e() {
        }

        var o = e.prototype;
        return o.init = function () {
            this.cookieApplied = !1, this.params = _extends({
                show: 0,
                dont_set_if_not_agree: 0,
                use_custom_warning_text: 0,
                custom_warning_text: "",
                policy_uri: "",
                style: "right_bottom"
            }, flexbe_cli.vars._group.cookies_warning), flexbe_cli.is_admin || flexbe_cli.run.is_screenshoter || 99 == flexbe_cli.theme_id || !this.params.show || localStorage.getItem("f_cookies_allowed") || this.createNotify()
        }, o.createNotify = function () {
            var e = this,
                o = this.params,
                t = $("body"),
                n = document.documentElement.clientHeight;
            if (+o.use_custom_warning_text && o.custom_warning_text) this.content = o.custom_warning_text.replace(/(?:\r\n|\r|\n)/g, "<br />");
            else {
                var i = "center_compact" === o.style ? "cookies.compact_text" : "cookies.long_text";
                this.content = flexbe_cli.locale.tr(i)
            }
            var c = o.button_text && o.use_custom_warning_text ? o.button_text.replace(/(?:\r\n|\r|\n)/g, "<br />") : flexbe_cli.locale.tr("cookies.button"),
                l = o.link_text ? o.link_text.replace(/(?:\r\n|\r|\n)/g, "<br />") : flexbe_cli.locale.tr("cookies.button_link"),
                s = o.policy_uri ? o.policy_uri.replace(/(?:\r\n|\r|\n)/g, "<br />") : "/legal/cookie-policy/",
                r = +o.use_policy ? "show" : "",
                a = $('\n                <div class="cookies-wrap style--' + o.style + '">\n                    <div class="cookies-container">\n                        <div class="cookies-content scrollable">\n                            <span>\n                                ' + this.content + '\n                                <a href="' + s + '" target="_blank" class="cookies-button-more ' + r + '">\n                                 ' + l + '\n                                </a> \n                            </span>\n                        </div>\n\n                        <div class="cookies-button-container">   \n                            <a href="' + s + '" target="_blank" class="cookies-button-more scrollable ' + r + '">\n                                ' + l + '\n                            </a>\n                            <div class="cookies-button scrollable">\n                                ' + c + '\n                            </div>\n                        </div>\n\n                        <div class="cookies-close">\n                            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">\n                                 <path d="M7 6L13 0L14 1L8 7L14 13L13 14L7 8L1 14L0 13L6 7L0 1L1 0L7 6Z"/>\n                            </svg>\n                        </div> \n                    </div>\n                </div>\n            ');
            t.append(a);
            var _ = function () {
                e.cookieApplied || o.dont_set_if_not_agree && (e.cookieApplied = !0, "function" == typeof window.applyCookies && window.applyCookies(), $(document).off("scroll.cookies").off("click.cookies"))
            };
            document.addEventListener("scroll", (function () {
                e.scrollSkip = !0
            }), {once: !0}), $(window).one("DOMContentLoaded", (function () {
                var o = 0;
                a.offset(), a.addClass("show"), a.on("click.cookies", ".cookies-button, .cookies-close", (function () {
                    a.removeClass("show"), localStorage.setItem("f_cookies_allowed", "allowed"), a.off("click.cookies"), _()
                })), $(document).on("click.cookies", "a, [data-component]", (function () {
                    _()
                })), setTimeout((function () {
                    var t = flexbe_cli.scroll.latest;
                    $(document).on("scroll.cookies", (function () {
                        var i = Math.max(flexbe_cli.scroll.latest - t, t - flexbe_cli.scroll.latest);
                        clearTimeout(e.scrollTimer), e.scrollTimer = setTimeout((function () {
                            t = flexbe_cli.scroll.latest, (o += i) >= n && _()
                        }), 200)
                    }))
                }), 500)
            }))
        }, e
    }();
    flexbe_cli.cookies = new e
}();
"use strict";
var EntityCore = function () {
    function i(i, t) {
        var e = this;
        void 0 === t && (t = {});
        var s = $(i),
            n = s.attr("data-is"),
            o = s.attr("data-id"),
            a = "zone" === n ? "e" : n[0],
            h = s.attr("data-" + a + "-id"),
            r = s.attr("data-mod-id") || 0,
            c = JSON.parse(s.attr(a + "-type") || "[]"),
            d = JSON.parse(s.attr("data-components") || !0);
        this.require = [], this.$area = s, this.area = s[0], this.$container = this.$area, this.container = this.area, this.$root = s, this.root = s[0], this.inited = !1, this.is = n, this.id = o, this.template_id = h, this.mod_id = r, this.type = c, this.components = d, this.tween = {}, this.isVisible = !1, this.inScreen = !1, this.inBeside = !1, this.inView = !1, this.inFocus = !1, this.wasVisible = !1, this.wasScreen = !1, this.wasBeside = !1, this.wasView = !1, this.wasFocus = !1, Object.keys(t).forEach((function (i) {
            var s = Object.getOwnPropertyDescriptor(t, i);
            if ("value" in s) {
                var n = t[i];
                e[i] = "object" == typeof n ? $.extend(!0, Array.isArray(n) ? [] : {}, n) : n
            } else Object.defineProperty(e, i, s)
        }))
    }

    var t = i.prototype;
    return t.onInit = function () {
    }, t.onUpdate = function () {
    }, t.onLoad = function () {
    }, t.onReady = function () {
    }, t.onVisible = function () {
    }, t.onBeside = function () {
    }, t.onFocus = function () {
    }, t.onScreen = function () {
    }, t.onView = function () {
    }, t.onMsg = function () {
    }, t.onResize = function () {
    }, t.onOpen = function () {
    }, t.onClose = function () {
    }, t.init = function (i, t) {
        var e = this;
        null == t && (t = this.inited ? "update" : "init"), "init" === t ? this._onInit(i) : "update" === t && this._onUpdate(i), ("init" === t || i.templateRendered) && flexbe_cli.require(this.require, (function () {
            e._onLoad(i)
        }))
    }, t._sendEvent = function (i, t) {
        flexbe_cli.events.emit("entity_event", {type: i, core: this, params: t});
        var e = new CustomEvent(i, {detail: t});
        this.area.dispatchEvent(e)
    }, t._onInit = function (i) {
        this.inited = !0, this.onInit(i), this._sendEvent("onInit", i), this._tween()
    }, t._onLoad = function (i) {
        this.loaded = !0, this.onLoad(i), this.onReady(i), this.require.length && this._tween({force: !0})
    }, t._onUpdate = function (i) {
        var t = this.$area.attr("data-mod-id") || 0,
            e = JSON.parse(this.$area.attr("data-components") || !0);
        this.modId = t, this.components = e, this.inited = !0, this.updated = !0, this.onUpdate(i), this._sendEvent("onInit", i), (i.templateRendered || i.styleRendered) && this._tween({force: !0})
    }, t._onResize = function (i) {
        void 0 === i && (i = {});
        var t = this._tween();
        this.isVisible && (t || i.force) && (this.onResize(i), this._sendEvent("onResize", i))
    }, t._onMsg = function (i, t) {
        this.onMsg(i, t)
    }, t._onVisible = function (i) {
        var t = i.state,
            e = i.force;
        if (this.isVisible !== t || e) {
            var s = t && !this.wasVisible;
            this.isVisible = t, this.onVisible({state: t, first: s}), this._sendEvent("onVisible", {
                state: t,
                first: s
            }), t && (this.wasVisible = !0)
        }
    }, t._onFocus = function (i) {
        var t = i.state,
            e = i.force;
        if (this.isVisible || (t = !1), this.inFocus !== t || e) {
            var s = t && !this.wasFocus;
            this.inFocus = t, this.onFocus(t, s), this._sendEvent("onFocus", {
                state: t,
                first: s
            }), t && (this.wasFocus = !0)
        }
    }, t._onScreen = function (i) {
        var t = i.state,
            e = i.force;
        if (this.isVisible || (t = !1), this.inScreen !== t || e) {
            var s = t && !this.wasScreen;
            this.inScreen = t, this.onScreen(t, s), this._sendEvent("onScreen", {
                state: t,
                first: s
            }), t && (this.wasScreen = !0)
        }
    }, t._onView = function (i) {
        var t = i.state,
            e = i.force;
        if (this.isVisible || (t = !1), this.inView !== t || e) {
            var s = t && !this.wasView;
            this.inView = t, s && "block" === this.is && this.$area.addClass("was-view"), this.onView(t, s), this._sendEvent("onView", {
                state: t,
                first: s
            }), t && (this.wasView = !0)
        }
    }, t._onBeside = function (i) {
        var t = i.state,
            e = i.force;
        if (this.isVisible || (t = !1), this.inBeside !== t || e) {
            var s = t && !this.wasBeside;
            this.inBeside = t, this.onBeside(t, s), this._sendEvent("onBeside", {
                state: t,
                first: s
            }), t && (this.wasBeside = !0)
        }
    }, t._tween = function () {
    }, t._onOpen = function (i) {
        this._tween({force: !0}), this.onOpen(i), this._sendEvent("onOpen", i)
    }, t._onClose = function (i) {
        this.onClose(), this._sendEvent("onClose", i)
    }, t.updateTweens = function () {
        this._tween(), this.$area.find("[data-id]").each((function (i, t) {
            t._core && t._core._tween()
        }))
    }, i
}();
"use strict";

function _inheritsLoose(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
}

var BlockCore = function (e) {
    function t(t, i) {
        var n;
        return (n = e.call(this, t, i) || this).is = "block", n.$block = n.$area, n.$container = n.$area.find(".container-fluid"), n.container = n.$container[0], n.abtestVariant = n.$area.attr("data-abtest-variant"), n.abtestId = n.abtestVariant && n.$area.attr("data-abtest-id"), n
    }

    _inheritsLoose(t, e);
    var i = t.prototype;
    return i._onInit = function (t) {
        flexbe_cli.block.fixCoverHeight(this.$area), e.prototype._onInit.call(this, t)
    }, i._onUpdate = function (t) {
        t.templateRendered && flexbe_cli.block.fixCoverHeight(this.$area), e.prototype._onUpdate.call(this, t)
    }, i._tween = function (e) {
        var t = void 0 === e ? {} : e,
            i = t.force,
            n = void 0 !== i && i,
            o = t.fixed,
            r = void 0 !== o && o,
            a = this,
            s = $(this.area).offset() || {top: this.area.offsetTop},
            l = this.area.offsetWidth,
            h = this.area.offsetHeight,
            c = Math.max(0, s.top),
            f = !(!l && !h),
            w = l !== this.tween.width || h !== this.tween.height;
        if (this.tween.fixed = r, this.tween.width = l, this.tween.height = h, this.tween.start = c, this.tween.end = c + h, this.tween.color = "#6a6a6a", this.container) {
            var d = this.container.getAttribute("data-contrast");
            if (d) this.tween.color = "light" === d ? "#FFF" : "#1B1B1C";
            else {
                var _ = this.$area.find(".container")[0];
                this.tween.color = _ && getComputedStyle(_).color || "#FFF"
            }
        }
        return a._onVisible({state: f}), b(), $(window).off("scroll.tween_" + this.id).on("scroll.tween_" + this.id, $.throttle(b, 50)), w;

        function b() {
            if (!a.inited) return !1;
            var e, t, i, o = Math.max(flexbe_cli.resize.height - h, 0),
                r = 1 / a.tween.height * (flexbe_cli.scroll.latest - a.tween.start),
                s = (e = flexbe_cli.scroll.latest + flexbe_cli.resize.height / 2, t = a.tween.start + a.tween.height / 2, (e - t + a.tween.height / 2) / a.tween.height),
                l = (i = a.tween.start - flexbe_cli.resize.height, 1 / (a.tween.end - i) * (flexbe_cli.scroll.latest - i));
            a.tween.fix = o, a.tween.position = r, a.tween.positionAbs = l, a.tween.positionCenter = s;
            var c = f && s > 0 && s < 1,
                w = f && function () {
                    if (a.tween.fixed) return !0;
                    var e = Math.min(a.tween.height / 3, flexbe_cli.resize.height / 4);
                    return flexbe_cli.scroll.latest + flexbe_cli.resize.height > a.tween.start + e && flexbe_cli.scroll.latest < a.tween.end - e
                }(),
                d = f && function () {
                    if (a.tween.fixed) return !0;
                    return a.tween.positionAbs >= 0 && a.tween.positionAbs <= 1
                }(),
                _ = f && function () {
                    if (a.tween.fixed) return !0;
                    return a.tween.positionAbs >= -.2 && a.tween.positionAbs <= 1.2
                }();
            a._onBeside({force: n, state: _}), a._onScreen({force: n, state: d}), a._onView({
                force: n,
                state: w
            }), a._onFocus({force: n, state: c})
        }
    }, t
}(EntityCore);
"use strict";

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

var ModalCore = function (t) {
    function e(e, s) {
        var o;
        return (o = t.call(this, e, s) || this).is = "modal", o.isOpen = !1, o.$modal = o.$area, o.$list = flexbe_cli.modal.$list, o
    }

    _inheritsLoose(e, t);
    var s = e.prototype;
    return s.open = function (t) {
        var e = this,
            s = t.fromId,
            o = t.data,
            i = t.options,
            l = void 0 === i ? {} : i;
        this.isOpen = !0, flexbe_cli.block.pushOverlay("modal", !0), this.lastOptions = l, this.lastScroll = flexbe_cli.scroll.latest;
        var n = this.$area.find(".modal-data > ._anchor").attr("name") || this.id;
        flexbe_cli.lockPopstate = !0, history.pushState(null, null, "#" + n), flexbe_cli.lockPopstate = !1, this.$area.addClass("show"), this.$list.addClass("show"), $("body").addClass("is-modal-open"), $(".w_cart.show").length && this.$list.addClass("rise"), setTimeout((function () {
            e.$list.addClass("overlay"), e._onOpen({data: o}), e._onBeside({state: !0}), e._onScreen({state: !0}), e._onView({state: !0}), e._onFocus({state: !0}), "function" == typeof l.onOpen && l.onOpen(e)
        }), 30), flexbe_cli.scroll.scrollLock.lock(), flexbe_cli.events.emit("modal_opened", {
            id: this.id,
            fromId: s,
            data: o,
            options: l
        })
    }, s.close = function (t) {
        var e = (void 0 === t ? {} : t).openId,
            s = this.lastOptions;
        this.lastOptions = {}, this.isOpen = !1, flexbe_cli.block.removeOverlay("modal"), /^#{1,2}/.test(location.hash) && (flexbe_cli.lockPopstate = !0, history.replaceState(null, null, "#"), flexbe_cli.lockPopstate = !1), this.$area.removeClass("show"), e || (this.$list.removeClass("show rise overlay"), flexbe_cli.scroll.scrollLock.unlock()), flexbe_cli.run.is_screen_all_mobile && $("body, html").scrollTop(this.lastScroll), $("body").removeClass("is-modal-open"), this._onClose(), this._onBeside({state: !1}), this._onScreen({state: !1}), this._onView({state: !1}), this._onFocus({state: !1}), "function" == typeof s.onClose && s.onClose(this), flexbe_cli.events.emit("modal_closed", {
            id: this.id,
            openId: e
        })
    }, s._tween = function (t) {
        var e = (void 0 === t ? {} : t).force;
        if (this.isOpen || e) {
            var s = this.area,
                o = s.offsetWidth,
                i = s.offsetHeight,
                l = o !== this.tween.width || i !== this.tween.height;
            return this.tween.width = o, this.tween.height = i, this.inited && (this._onVisible({
                force: e,
                state: this.isOpen
            }), this._onBeside({force: e, state: this.isOpen}), this._onScreen({
                force: e,
                state: this.isOpen
            }), this._onView({force: e, state: this.isOpen}), this._onFocus({force: e, state: this.isOpen})), l
        }
    }, e
}(EntityCore);
"use strict";

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

var WidgetCore = function (t) {
    function e(e, i) {
        var o;
        return (o = t.call(this, e, i) || this).is = "widget", o.$widget = o.$area, o
    }

    return _inheritsLoose(e, t), e.prototype._tween = function (t) {
        var e, i = (void 0 === t ? {} : t).force,
            o = this.area,
            s = o.offsetWidth,
            r = o.offsetHeight;
        e = null != this.isOpen ? !!this.isOpen : !(!s && !r);
        var n = s !== this.tween.width || r !== this.tween.height;
        return this.tween.width = s, this.tween.height = r, this.inited && (this._onVisible({
            force: i,
            state: e
        }), this._onBeside({force: i, state: e}), this._onScreen({force: i, state: e}), this._onView({
            force: i,
            state: e
        }), this._onFocus({force: i, state: e})), n
    }, e
}(EntityCore);
"use strict";

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

var ElementCore = function (t) {
    function e(e, n) {
        var i, o = (i = t.call(this, e, n) || this).$area.closest(".b_block, .m_modal, .w_widget"),
            r = i.$area.parent().closest("[data-is]");
        i.is = "element";
        var s = i.$area.closest("[data-cloned]");
        return i.isClone = !!s.length && s.attr("data-cloned"), i.$root = o, i.root = o[0], i.$parent = r, i.parent = r[0], i
    }

    _inheritsLoose(e, t);
    var n = e.prototype;
    return n._onInit = function (e) {
        t.prototype._onInit.call(this, e), this._inheritEvents()
    }, n._onUpdate = function (e) {
        t.prototype._onUpdate.call(this, e), this._inheritEvents()
    }, n._inheritEvents = function () {
        var t = this;
        ["onVisible", "onFocus", "onView", "onScreen", "onBeside", "onResize", "onOpen", "onClose"].forEach((function (e) {
            var n = e + ".element_" + t.id + (t.isClone ? "_clone_" + Number(t.isClone) : "_original");
            t.$parent.off(n).on(n, (function (i) {
                for (var o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), s = 1; s < o; s++) r[s - 1] = arguments[s];
                if (!r.length && i.detail && (r[0] = i.detail), flexbe_cli.is_admin && !t.root.contains(t.area)) return t.$parent.off(n), !1;
                t["_" + e].apply(t, r)
            }))
        }))
    }, n._tween = function (t) {
        var e = (void 0 === t ? {} : t).force,
            n = this.container || this.area,
            i = this.root && this.root._core,
            o = this.parent && this.parent._core,
            r = o && o.isVisible,
            s = r && n.offsetWidth || 0,
            a = r && n.offsetHeight || 0,
            c = !(!s && !a),
            h = s !== this.tween.width || a !== this.tween.height;
        return this.tween.width = s, this.tween.height = a, this.inited && (this._onVisible({
            force: e,
            state: c
        }), i && i.inited && (this._onBeside({force: e, state: c && i.inBeside}), this._onScreen({
            force: e,
            state: c && i.inScreen
        }), this._onView({force: e, state: c && i.inView}), this._onFocus({force: e, state: c && i.inFocus}))), h
    }, e
}(EntityCore);
"use strict";
flexbe_cli.components = {
    instances: {},
    classes: {},
    helpers: {},
    init: function () {
        var e = this,
            n = this.instances;
        this.links(), flexbe_cli.locale.init(), flexbe_cli.events.on("entity_event.components_init", (function (t, o) {
            if (void 0 === o && (o = {}), !o.type || !o.core || !o.core.id) return !1;
            var i = o.core,
                s = i.isClone ? i.id + "_clone" + i.isClone : i.id,
                a = n[s] || [];
            "onInit" === o.type || "onUpdate" === o.type && o.params.templateRendered ? (e.initComponents({
                core: i,
                reason: o.type,
                params: o.params
            }), flexbe_cli.locale.init(i.area)) : ["onResize", "onOpen", "onClose", "onVisible", "onBeside", "onScreen", "onView", "onFocus"].includes(o.type) && a.forEach((function (e) {
                var n = e["_" + o.type] || e[o.type];
                "function" == typeof n && n.call(e, o.params)
            }))
        })), $(window).off("load.core_components").one("load.core_components", (function () {
            Object.values(n).forEach((function (e) {
                e.forEach((function (e) {
                    return e._onPageLoad()
                }))
            }))
        }))
    },
    initComponents: function (e) {
        var n = this,
            t = void 0 === e ? {} : e,
            o = t.core,
            i = t.reason,
            s = void 0 === i ? "onInit" : i,
            a = t.force,
            c = void 0 !== a && a,
            r = o.$area,
            l = o.isClone ? o.id + "_clone" + o.isClone : o.id,
            f = o.components,
            p = !1;
        if (!0 === f ? p = "[data-component]" : Array.isArray(f) && (p = f.map((function (e) {
            return '[data-component^="' + e + '"]'
        })).join(", ")), p) {
            var d = r.find(p).toArray(),
                u = {};
            this.instances[l] = d.map((function (e) {
                var t = [],
                    i = String(e.getAttribute("data-component")).trim().split(":"),
                    a = i[0],
                    r = i[1];
                r && (t = String(r).replace(/^\[|\]$/g, "").split(",")), void 0 === u[a] && (u[a] = 0);
                var l = u[a];
                if (u[a] += 1, c && e.componentInstance) "function" == typeof e.componentInstance.destroy && e.componentInstance.destroy(), delete e.componentInstance;
                else if (e.componentInstance) return e.componentInstance.index = l, e.componentInstance;
                var f = n.classes[a];
                if ("function" == typeof f) {
                    var p = new f({args: t, component: e, index: l, core: o, reason: s});
                    if (p instanceof BaseComponent) return e.componentInstance = p, p._onInit(), o.inBeside && p._onBeside({
                        state: !0,
                        first: !0
                    }), o.inScreen && p._onScreen({state: !0, first: !0}), o.inView && p._onView({
                        state: !0,
                        first: !0
                    }), o.inFocus && p._onFocus({state: !0, first: !0}), p
                }
                return !1
            })).filter((function (e) {
                return e
            }))
        }
        if (this.instances[l] && !this.instances[l].length) return delete this.instances[l], !1
    },
    links: function (e) {
        var n = this;
        void 0 === e && (e = ".container-list, .modal-list, .widget-list, .component-menu-dropdown, header, footer"), $(e).on("click.component-links", "a[href], [data-action]", (function (e) {
            var t = e.currentTarget,
                o = t.hasAttribute("href"),
                i = t.getAttribute("href"),
                s = t.getAttribute("data-action"),
                a = t.getAttribute("target"),
                c = t.hasAttribute("download"),
                r = "_blank" === a || e.metaKey || e.ctrlKey;
            if ((i || s && "none" !== s) && !c)
                if (!flexbe_cli.is_admin || t.closest(".editor-focus")) {
                    var l = 1 === flexbe_cli.theme_id && $(e.currentTarget).find("a").length;
                    if (r || c || l || e.preventDefault(), "button" !== s) o && !r && (clearTimeout(n._lastLinkTmt), n._lastLinkTmt = setTimeout((function () {
                        flexbe_cli.helpers.gotoLink(i)
                    }), 15));
                    else {
                        var f = $(t).closest(".content-zone, [data-item-id]").first().find(".component-button").not(".form-field-submit");
                        f[0] && f[0].click()
                    }
                } else e.preventDefault()
        }))
    }
};
"use strict";
var BaseComponent = function () {
    function n(n) {
        var o = n.component,
            i = n.index,
            t = n.core,
            e = n.reason;
        this.core = t, this.owner = t.area, this.root = t.root, this.index = i || 0, this.component = o, this.$component = $(o), this.require = [], this.isPageLoaded = flexbe_cli.isLoaded || !1, this.isUpdated = "onUpdate" === e, this.isInited = !1, this.isLoaded = !1
    }

    var o = n.prototype;
    return o.onInit = function () {
    }, o.onLoad = function () {
    }, o.onVisible = function () {
    }, o.onScreen = function () {
    }, o.onBeside = function () {
    }, o.onView = function () {
    }, o.onFocus = function () {
    }, o.onPageLoad = function () {
    }, o.onResize = function () {
    }, o.onOpen = function () {
    }, o.onClose = function () {
    }, o._onInit = function () {
        var n = this;
        this.isInited = !0, "function" == typeof this.onInit && this.onInit(), flexbe_cli.require(this.require, (function () {
            n._onLoad()
        }))
    }, o._onLoad = function () {
        this.isLoaded = !0, "function" == typeof this.onLoad && this.onLoad()
    }, o._onVisible = function (n) {
        this.onVisible(n)
    }, o._onScreen = function (n) {
        this.onScreen(n)
    }, o._onView = function (n) {
        this.onView(n)
    }, o._onBeside = function (n) {
        this.onBeside(n)
    }, o._onFocus = function (n) {
        this.onFocus(n)
    }, o._onResize = function (n) {
        this.onResize(n)
    }, o._onOpen = function (n) {
        this.onOpen(n)
    }, o._onClose = function (n) {
        this.onClose(n)
    }, o._onPageLoad = function () {
        this.onPageLoad(), this.isPageLoaded = !0
    }, n
}();
"use strict";

function _assertThisInitialized(i) {
    if (void 0 === i) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return i
}

function _inheritsLoose(i, t) {
    i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i.__proto__ = t
}

!function () {
    var i = function () {
            function i(i, t, e) {
                var a = this;
                this.id = i, this.params = e, this.pending = !1, this.visible = !1, this.size = !1, this.imSize = {
                    w: 0,
                    h: 0
                }, this.$outer = $(".parallax-outer", t), this.overlay = $(".overlay", t).get(0), this.canvas = $("canvas", this.$outer).get(0), this.offScreen = document.createElement("canvas"), this.overlayOpacity = +this.overlay.getAttribute("data-opacity"), this.factor = 1 === e.parallax || 2 === e.parallax ? .3 : 0, this.zoomRatio = 3 === e.parallax || 4 === e.parallax ? .2 : 0, this.zoomType = 3 === e.parallax || 4 === e.parallax ? 2 : 0, this.zoomD = 3 === e.parallax ? .5 : 4 === e.parallax ? 1 : 0, this.fadeout = 1 === e.parallax ? 0 : 3 === e.parallax ? .5 : 1;
                var s = window.devicePixelRatio >= 1.5 ? 1960 / window.devicePixelRatio : 1960,
                    o = this.$outer.width(),
                    n = this.$outer.height(),
                    r = this.$outer.offset() || {};
                this.blSize = {w: o <= s ? o : s}, this.blSize.r = this.blSize.w / o, this.blSize.h = this.blSize.r * n, this.blSize.x = this.blSize.r * r.top, this.winSize = {
                    w: $("window").width() * this.blSize.r,
                    h: $("window").height() * this.blSize.r
                }, this.blSizeOr = {
                    w: o,
                    h: n,
                    x: r.top
                }, this.offCtx = this.offScreen.getContext("2d", {alpha: !1}), this.canvas.width = 0, this.canvas.height = 0, this.ctx = this.canvas.getContext("2d", {alpha: !1}), this.img = document.createElement("img"), this.position = {
                    x: +this.$outer.data("bg-pos-x").replace("%", "") / 100,
                    y: +this.$outer.data("bg-pos-y").replace("%", "") / 100
                }, this.dispatchEvents(), this.img.onload = function () {
                    a.loaded = !0, a.imSize = {
                        w: a.img.width,
                        h: a.img.height
                    }, a.imSize.r = a.imSize.h / a.imSize.w, a.updateCanvasSource(), setTimeout((function () {
                        a.$outer.addClass("ready")
                    }), 30)
                }, this.img.src = this.$outer.attr("data-image")
            }

            var t = i.prototype;
            return t.dispatchEvents = function () {
                var i = this;
                $(window).off("resized." + this.id + " documentresize." + this.id).on("resized." + this.id + " documentresize." + this.id, (function () {
                    i.updateCanvasSource()
                })), $(window).off("scroll.component-bg-" + this.id).on("scroll.component-bg-" + this.id, (function () {
                    i.pending || (i.pending = !0, i.updateInst())
                })), flexbe_cli.events.off("block_render.bg_" + this.id).on("block_render.bg_" + this.id, (function (t, e) {
                    e.entity && e.entity.id == i.id && e.styleRendered && (i.overlayOpacity = e.entity.data.background.opacity / 100, i.pending || (i.pending = !0, i.updateInst()))
                })), flexbe_cli.events.off("layout_change.bg_" + this.id).on("layout_change.bg_" + this.id, (function (t, e) {
                    e && e.test && e.test.current && e.test[e.test.current] === i.id && i.updateCanvasSource()
                }))
            }, t.toggleRendering = function (i) {
                if ("boolean" != typeof i) return !1;
                i !== this.visible && (this.visible = i)
            }, t.getCosPoint = function (i, t, e) {
                return void 0 === e && (e = 1), 1 - i > e && (i = e), (1 - Math.cos(Math.PI * i * t)) / 2
            }, t.getZoomCoords = function (i) {
                var t = 1 === this.zoomType ? i : -1 === this.zoomType ? 100 - i : 2 === this.zoomType ? 100 - 100 * this.getCosPoint(.01 * i, 2, this.zoomD) : 0,
                    e = {ratio: this.zoomRatio / 100 * t};
                return e.w = this.blSize.w * (1 + e.ratio), e.h = this.blSize.h * (1 + e.ratio), e.x = (e.w - this.canvas.width) / 2, e.y = (e.h - this.blSize.h) / 2, e
            }, t.draw = function (i, t) {
                var e, a = this;
                if (this.fadeout && (e = 1 - (1 - this.overlayOpacity) * this.getCosPoint(.01 * t, 2, this.fadeout)), this.zoomRatio) {
                    var s = this.getZoomCoords(t);
                    requestAnimationFrame((function () {
                        a.overlay.style.opacity = e, a.ctx.drawImage(a.offScreen, Math.ceil(-1 * s.x), Math.ceil(i * a.factor - a.winSize.h * a.factor - s.y), s.w, s.h), a.pending = !1
                    }))
                } else {
                    var o = Math.ceil(i * this.factor - this.winSize.h * this.factor);
                    requestAnimationFrame((function () {
                        a.overlay.style.opacity = e, a.ctx.drawImage(a.offScreen, 0, o), a.pending = !1
                    }))
                }
            }, t.updateInst = function () {
                if (this.winSize.x = (window.scrollY || window.pageYOffset) * this.blSize.r, this.winSize.x + this.winSize.h > this.blSize.x - 200 && this.winSize.x < this.blSize.x + this.blSize.h) {
                    this.toggleRendering(!0);
                    var i = this.winSize.x + this.winSize.h - this.blSize.x,
                        t = 100 - i / (this.blSize.h + this.winSize.h) * 100;
                    this.draw(i, t)
                } else this.toggleRendering(!1), this.pending = !1
            }, t.prerender = function () {
                this.loaded && (this.fitToOuter(), this.offScreen.width = this.blSize.w, this.offScreen.height = this.zoomRatio ? this.blSize.h : Math.ceil(this.size.offH), this.drawOffscreenImage(this.position.x, this.position.y))
            }, t.updateCanvasSource = function () {
                this.prerender(), this.updateInst()
            }, t.drawOffscreenImage = function (i, t) {
                (i = "number" == typeof i ? i : .5) < 0 && (i = 0), (t = "number" == typeof t ? t : .5) < 0 && (t = 0), i > 1 && (i = 1), t > 1 && (t = 1);
                var e, a, s, o, n = this.offCtx.canvas.width,
                    r = this.offCtx.canvas.height;
                r / n <= this.imSize.r ? (s = n, e = 0, a = ((o = n * this.imSize.r) - r) * t * -1) : (o = r, a = 0, e = ((s = r / this.imSize.r) - n) * i * -1), this.offCtx.drawImage(this.img, e, a, s, o)
            }, t.fitToOuter = function () {
                var i = window.devicePixelRatio >= 1.5 ? 1600 : 1960;
                this.blSize = {w: this.$outer.width() <= i ? this.$outer.width() : i}, this.blSize.r = this.blSize.w / this.$outer.width(), this.blSize.h = this.blSize.r * this.$outer.height(), this.blSize.x = this.blSize.r * this.$outer.offset().top, this.winSize = {
                    w: $(window).width() * this.blSize.r,
                    h: $(window).height() * this.blSize.r
                }, this.canvas.width = this.blSize.w, this.canvas.height = this.blSize.h, this.canvas.style.transform = "scale(" + 1 / this.blSize.r + ")";
                var t, e = Math.max(this.winSize.h, this.blSize.h),
                    a = e - (e - Math.min(this.winSize.h, this.blSize.h)) * (this.blSize.h > this.winSize.h ? this.factor : 1 - this.factor),
                    s = a / this.blSize.w;
                (t = this.imSize.r >= s ? {w: this.blSize.w, h: this.blSize.w * this.imSize.r} : {
                    h: a,
                    w: a / this.imSize.r
                }).offH = a, t.x = (t.w - this.blSize.w) / 2, this.size = t
            }, t.destroy = function () {
                this.destroyed = !0, $(window).off("resize." + this.id + " documentresize." + this.id), $(window).off("scroll.component-bg-" + this.id), flexbe_cli.events.off("block_render.bl.bg_" + this.id), this.$outer.removeClass("ready"), this.offScreen.remove(), this.img.remove()
            }, i
        }(),
        t = function (t) {
            function e() {
                for (var i, e = arguments.length, a = new Array(e), s = 0; s < e; s++) a[s] = arguments[s];
                var o = _assertThisInitialized(i = t.call.apply(t, [this].concat(a)) || this).$component;
                return i.data = {
                    type: o.data("type") || "color",
                    parallax: o.data("parallax") || 0,
                    video: o.data("video") || !1,
                    videoParallaxFactor: .6
                }, i.data.parallax && flexbe_cli.run.is_mobile && (flexbe_cli.run.is_screen_mobile_s || flexbe_cli.run.is_screen_all_mobile && "video" === i.data.type) && (i.data.parallax = 0), i
            }

            _inheritsLoose(e, t);
            var a = e.prototype;
            return a.onScreen = function (i) {
                var t = i.state;
                if (this.videoInstance && (t ? (this.videoInstance.play(), this.onscreen = !0) : (this.videoInstance.pause(), this.onscreen = !1)), !t || this.played) return !1;
                this.playVideo()
            }, a.onBeside = function (i) {
                var t = i.state,
                    e = i.first;
                t && e && (this.loadImage(), this.imageParallaxInit(), this.videoParallaxInit()), this.played || this.playVideo()
            }, a.onResize = function () {
                var i = this;
                if ("video" === this.data.type && this.videoInstance) {
                    if (this.data.parallax && this.fixHolder && this.setParallax) return void setTimeout((function () {
                        i.fixHolder(), i.videoInstance.resize(), i.setParallax()
                    }), 100);
                    this.videoInstance.resize()
                }
            }, a.loadImage = function () {
                if (!flexbe_cli.is_admin) {
                    var i, t = this.$component,
                        e = t.find(".image, .parallax-outer"),
                        a = e.find(".loader-image"),
                        s = a.attr("data-src");
                    if (s) {
                        var o = new Image;
                        o.onload = n, o.src = s, i = setTimeout(n, 1e3)
                    }
                }

                function n() {
                    clearTimeout(i), e.css("backgroundImage", ""), t.removeClass("loading"), setTimeout((function () {
                        a.remove()
                    }), 300)
                }
            }, a.imageParallaxInit = function () {
                if ("image" !== this.data.type || !this.data.parallax) return !1;
                var t = this.owner,
                    e = this.$component,
                    a = this.data,
                    s = t._core && t._core.id || t.getAttribute("data-id");
                "object" == typeof t._bgEffects && t._bgEffects.destroy(), t._bgEffects = new i(s, e, a)
            }, a.videoParallaxInit = function () {
                var i = this;
                if ("video" !== this.data.type || !this.data.parallax || !this.owner._core) return !1;
                var t = $(".image-holder, .video_bg_container", this.$component),
                    e = t.find(".image"),
                    a = t.find(".video_bg_player"),
                    s = this.owner._core,
                    o = !1;
                this.fixHolder = function () {
                    flexbe_cli.resize.height < s.tween.height && s.tween.width > 500 ? t.css("height", s.tween.height + "px") : t.css("height", "")
                }, this.setParallax = function () {
                    var t = s.$area.offset().top,
                        o = 1 - (1 - i.data.videoParallaxFactor) * (s.tween.height / flexbe_cli.resize.height);
                    o < 0 && (o = i.data.videoParallaxFactor / 2);
                    var n = parseInt((window.pageYOffset - t) * -o, 10) || 0;
                    i.videoInstance && i.videoInstance.executed || e.css("transform", "translate3d(0, " + n + "px, 0)"), a.css("transform", "translate3d(0, " + n + "px, 0)")
                }, this.fixHolder(), this.setParallax(), s.$area.off("fixHeaderHeight.component-bg").on("fixHeaderHeight.component-bg", (function () {
                    i.setParallax()
                })), $(window).off("scroll.component-bg-" + s.id).on("scroll.component-bg-" + s.id, (function () {
                    !o && i.onscreen && (o = !0, requestAnimationFrame((function () {
                        i.setParallax(), o = !1
                    })))
                }))
            }, a.playVideo = function () {
                var i = this;
                if (flexbe_cli.run.is_screen_all_mobile) return !1;
                this.played = !0;
                var t = this.$component,
                    e = this.data,
                    a = e.video;
                return !("video" !== e.type || !a) && (!("custom" !== a.type && !a.id) && (this.videoInstance = new flexbe_cli.components.classes.VideoBackground(t, a, (function () {
                    i.videoParallaxInit()
                })), !0))
            }, a.destroyVideo = function () {
                var i = this.$component;
                i.data("ytPlayer") && i.data("ytPlayer").destroy(), i.removeData("video_bg_played")
            }, e
        }(BaseComponent);
    flexbe_cli.components.classes.background = t
}();
"use strict";

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

!function () {
    var t = function (t) {
        function e() {
            for (var e, i = arguments.length, a = new Array(i), s = 0; s < i; s++) a[s] = arguments[s];
            return (e = t.call.apply(t, [this].concat(a)) || this).is = "timer", e
        }

        _inheritsLoose(e, t);
        var i = e.prototype;
        return i.onInit = function () {
            this.$timer = this.$component.find(".timer"), this.data = this.$timer.data("time"), this.initTimer()
        }, i.initTimer = function () {
            var t = this.$timer,
                e = this.data,
                i = new Date;
            if ("date" === e.type) {
                var a = e.my ? String(e.my).replace(".", "default.htm").split("/") : [1, 2018];
                this.finalDate = new Date(a[1], parseInt(a[0], 10) - 1, e.d, e.h, e.m)
            } else if ("monthly" === e.type) this.finalDate = new Date(i.getFullYear(), i.getMonth(), e.d, e.h, e.m), i.getTime() > this.finalDate.getTime() && (this.finalDate = new Date(i.getFullYear(), i.getMonth() + 1, e.d, e.h, e.m)), parseInt(e.d, 10) != this.finalDate.getDate() && (this.finalDate.setDate(0), i.getTime() > this.finalDate.getTime() && (this.finalDate = new Date(this.finalDate.getFullYear(), this.finalDate.getMonth() + 2, 0, e.h, e.m)));
            else if ("weekly" === e.type) {
                var s = parseInt(i.getDate(), 10) - parseInt(i.getDay(), 10) + parseInt(e.dw, 10);
                this.finalDate = new Date(i.getFullYear(), i.getMonth(), s, e.h, e.m), i.getTime() > this.finalDate.getTime() && this.finalDate.setDate(this.finalDate.getDate() + 7)
            } else "daily" === e.type ? (this.finalDate = new Date(i.getFullYear(), i.getMonth(), i.getDate(), e.h, e.m), i.getTime() > this.finalDate.getTime() && this.finalDate.setDate(this.finalDate.getDate() + 1)) : (this.finalDate = new Date, this.finalDate.setMonth(this.finalDate.getMonth() + 1, 15));
            this.$itemDay1 = t.find(".d [data-value]").eq(0), this.$itemDay2 = t.find(".d [data-value]").eq(1), this.$itemDay3 = t.find(".d [data-value]").eq(2), this.$itemHour1 = t.find(".h [data-value]").eq(0), this.$itemHour2 = t.find(".h [data-value]").eq(1), this.$itemMinute1 = t.find(".m [data-value]").eq(0), this.$itemMinute2 = t.find(".m [data-value]").eq(1), this.$itemSecond1 = t.find(".s [data-value]").eq(0), this.$itemSecond2 = t.find(".s [data-value]").eq(1), this.lastOffset = {
                d: void 0,
                h: void 0,
                m: void 0,
                s: void 0
            }, !flexbe_cli.is_admin && "none" !== this.data.on_expired && this.finalDate.getTime() < i.getTime() ? "element" === this.data.on_expired ? $(this.owner).hide() : $(this.root).hide() : this.start()
        }, i.tick = function () {
            if (this.secondLeft = this.finalDate.getTime() - (new Date).getTime(), this.secondLeft = Math.ceil(this.secondLeft / 1e3), this.secondLeft = this.secondLeft < 0 ? 0 : this.secondLeft, this.offset = {
                d: Math.floor(this.secondLeft / 60 / 60 / 24),
                h: Math.floor(this.secondLeft / 60 / 60) % 24,
                m: Math.floor(this.secondLeft / 60) % 60,
                s: this.secondLeft % 60
            }, this.lastOffset.d !== this.offset.d) {
                var t = this.offset.d.toString().split("");
                t.length < 2 && t.unshift(0), t.length < 3 && t.unshift(0), this.$itemDay1.attr("data-value", t[0]).text(t[0]), this.$itemDay2.attr("data-value", t[1]).text(t[1]), this.$itemDay3.attr("data-value", t[2]).text(t[2])
            }
            if (this.lastOffset.h !== this.offset.h) {
                var e = this.offset.h.toString().split("");
                e.length < 2 && e.unshift(0), this.$itemHour1.attr("data-value", e[0]).text(e[0]), this.$itemHour2.attr("data-value", e[1]).text(e[1])
            }
            if (this.lastOffset.m !== this.offset.m) {
                var i = this.offset.m.toString().split("");
                i.length < 2 && i.unshift(0), this.$itemMinute1.attr("data-value", i[0]).text(i[0]), this.$itemMinute2.attr("data-value", i[1]).text(i[1])
            }
            if (this.lastOffset.s !== this.offset.s) {
                var a = this.offset.s.toString().split("");
                a.length < 2 && a.unshift(0), this.$itemSecond1.attr("data-value", a[0]).text(a[0]), this.$itemSecond2.attr("data-value", a[1]).text(a[1])
            }
            this.lastOffset = this.offset, this.secondLeft < 0 && this.stop()
        }, i.start = function () {
            var t = this;
            this.tick(), clearInterval(this.interval), this.interval = setInterval((function () {
                t.tick()
            }), 200)
        }, i.stop = function () {
            clearInterval(this.interval)
        }, e
    }(BaseComponent);
    flexbe_cli.components.classes.timer = t
}();
"use strict";

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

!function () {
    var t = function (t) {
        function e() {
            for (var e, o = arguments.length, i = new Array(o), n = 0; n < o; n++) i[n] = arguments[n];
            (e = t.call.apply(t, [this].concat(i)) || this).is = "video", e.type = e.$component.data("type"), e.autoplay = !!+e.$component.data("autoplay"), e.custom = !!+e.$component.data("custom"), e.$preview = e.$component.find(".video-preview"), e.$video = e.$component.find(".custom-video"), e.hasPreview = e.$preview.length, e.frameLoaded = !1, e.autoSet = !0;
            var a = e.$component.parent();
            a.hasClass("slider-item") && (a.closest(".component-slider").attr("data-current-index") === a.attr("data-real-index") || (e.autoSet = !1));
            return e.$preview.on("click", (function () {
                e.set(), e.custom ? e.$preview.off("click").addClass("preloading") : e.$preview.off("click").fadeOut(150, (function () {
                    e.$preview.remove()
                }))
            })), e.$component.off("sliderActivate").on("sliderActivate", (function () {
                e.set()
            })), e.$component.off("sliderDeactivate").on("sliderDeactivate", (function () {
                e.pause()
            })), e
        }

        _inheritsLoose(e, t);
        var o = e.prototype;
        return o.onScreen = function (t) {
            var e = this;
            t.state ? this.autoplay ? (!this.isPaused && this.autoSet && this.set(), this.onFrameLoaded((function () {
                e.play()
            }))) : !this.hasPreview && this.autoSet && this.set() : this.pause()
        }, o.set = function (t) {
            var e = (void 0 === t ? {} : t).autoplay;
            "youtube" === this.type ? this.initYoutube(e) : "vimeo" === this.type ? this.initVimeo(e) : this.initCustom(e)
        }, o.initCustom = function () {
            var t = this;
            this.$component.addClass("loading");
            var e = this.$video[0],
                o = e.getAttribute("data-src"),
                i = e.getAttribute("src");
            if (o && !i) {
                var n = document.createElement("source");
                e.addEventListener("canplaythrough", (function () {
                    t.hasPreview && (t.$video[0].play(), t.$preview.off("click").fadeOut(150, (function () {
                        t.$preview.remove()
                    })))
                })), e.addEventListener("error", console.error), n.addEventListener("error", console.error), e.load(), n.setAttribute("type", "video/mp4"), n.setAttribute("src", o), e.appendChild(n)
            }
        }, o.initVimeo = function (t) {
            var e = this;
            this.$component.addClass("loading");
            var o = this.component.querySelector("iframe"),
                i = o.getAttribute("data-src"),
                n = o.getAttribute("src");
            i && !n && (o.src = i + (t ? "&autoplay=1" : "")), flexbe_cli.require(["../https@player.vimeo.com/api/player.js"], (function () {
                e.vPlayer = new window.Vimeo.Player(o), $(o).on("load", (function () {
                    e.$component.addClass("loaded"), e.frameLoaded = !0, e.hasPreview && !flexbe_cli.is_admin && e.vPlayer.on("bufferstart", (function () {
                        e.vPlayer.off("bufferstart"), e.$component.addClass("started")
                    }))
                })), e.vPlayer.on("bufferstart", (function () {
                    e.vPlayer.off("bufferstart"), e.$component.addClass("started")
                }))
            }))
        }, o.initYoutube = function (t) {
            var e = this;
            this.$component.addClass("loading");
            var o = this.component.querySelector("iframe"),
                i = o.getAttribute("data-src"),
                n = o.getAttribute("src");
            $(o).on("load", (function () {
                if (e.$component.addClass("loaded"), e.frameLoaded = !0, e.hasPreview && !flexbe_cli.is_admin) {
                    var t = function (t) {
                        t.data !== window.YT.PlayerState.BUFFERING && t.data !== window.YT.PlayerState.PLAYING || e.$component.addClass("started")
                    };
                    flexbe_cli.require(["../https@www.youtube.com/iframe_api@origin=" + window.location.host], (function () {
                        !function (t, e) {
                            if ("function" != typeof e || "function" != typeof t) return !1;
                            if (t()) e();
                            else var o = window.setInterval((function () {
                                t() && (window.clearInterval(o), e())
                            }), 10)
                        }((function () {
                            return window.YT && window.YT.Player
                        }), (function () {
                            var o = e.component.querySelector("iframe");
                            e.ytVideo = new window.YT.Player(o, {events: {onStateChange: t}})
                        }))
                    }))
                }
            })), i && !n && (o.src = i + (t ? "&autoplay=1" : ""))
        }, o.play = function () {
            var t = this.component.querySelector("iframe"),
                e = t && t.contentWindow;
            if (!(e || this.custom && this.$video)) return !1;
            this.isPaused = !1, this.custom ? this.$video[0].play() : "vimeo" === this.type && this.vPlayer ? this.vPlayer.play() : e.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }, o.pause = function () {
            var t = this.component.querySelector("iframe"),
                e = t && t.contentWindow;
            if (!(e || this.custom && this.$video)) return !1;
            this.isPaused = !0, this.custom ? this.$video[0].pause() : "vimeo" === this.type && this.vPlayer ? this.vPlayer.pause() : e.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }, o.onFrameLoaded = function (t) {
            var e = this;
            if ("custom" === this.type) return t(), !0;
            this.frameLoaded ? "function" == typeof t && t() : this.$component.find("iframe").on("load", (function () {
                e.frameLoaded = !0, "function" == typeof t && t()
            }))
        }, e
    }(BaseComponent);
    flexbe_cli.components.classes.video = t
}();
"use strict";

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a])
        }
        return t
    }).apply(this, arguments)
}

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

!function () {
    var t = {},
        e = function (t, e) {
            void 0 === e && (e = function () {
            });
            var i = new Image;
            return i.onload = function () {
                "function" == typeof i.remove && i.remove(), e(i)
            }, i.src = t, i
        },
        i = function (t, e) {
            var i = t.ext,
                a = t.id,
                n = t.name,
                o = t.resizable,
                r = Math.max(1, window.devicePixelRatio || 1);
            return e = Math.round(Math.min(2560, e * r)), ["img/" + a, o && e ? "_" + e : "", i ? "." + i : "./" + n].join("")
        },
        a = function (a) {
            function n() {
                for (var t, e = arguments.length, i = new Array(e), n = 0; n < e; n++) i[n] = arguments[n];
                return (t = a.call.apply(a, [this].concat(i)) || this).is = "image", t
            }

            _inheritsLoose(n, a);
            var o = n.prototype;
            return o.onInit = function () {
                this.isUpdated && (this.create(), this.set())
            }, o.onScreen = function (t) {
                if (!t.state) return !1;
                this.isCreated || this.create(), this.autoSet && !this.isSet && this.set()
            }, o.onBeside = function (t) {
                if (!t.state) return !1;
                this.isCreated || this.create(), this.autoSet && !this.isSet && this.set()
            }, o.onResize = function () {
                this.updateSize(), this.setOverlay()
            }, o.create = function () {
                var t = this;
                if (this.isCreated = !0, this.imageLoaded = !!this.$component.attr("data-img-loaded"), this.autoSet = !this.imageLoaded, this.params = {}, this.img = this.$component.find("img").get(0), this.layer = this.$component.find("[data-img-layer]").get(0) || this.component, this.overlay = this.$component.find(".overlay-container").get(0), this.updateParams(), this.updateSize(), this.img) {
                    var e = this.$component.parent();
                    if (e.hasClass("slider-item")) e.closest(".component-slider").attr("data-current-index") == e.attr("data-real-index") || (this.autoSet = !1);
                    this.$component.on("setImage sliderActivate", $.debounce((function () {
                        t.set()
                    }), 50))
                }
            }, o.set = function (t) {
                var a = this;
                void 0 === t && (t = !1), this.isCreated || this.create(), (t || !this.isSet && !this.imageLoaded) && (this.isSet = !0, this.setOverlay(), this.getOptimalSize((function (t) {
                    var n = t.width,
                        o = a.params,
                        r = i(o, n);
                    if (flexbe_cli.is_admin) a.setImage(r);
                    else {
                        var s = setTimeout((function () {
                            a.setImage(r)
                        }), 3e3);
                        e(r, (function () {
                            a.setImage(r), clearTimeout(s)
                        }))
                    }
                })))
            }, o.setImage = function (t) {
                var e = this,
                    a = this.params;
                if (t || (t = i(a)), this.imageLoaded || (this.imageLoaded = !0, requestAnimationFrame((function () {
                    e.$component.removeClass("loading")
                }))), this.img && this.img.src === t) return !1;
                if (this.img && (this.img.src = t), "background" === a.type) {
                    var n = "url(" + t + ")";
                    this.layer.style.backgroundColor = "", this.layer.style.backgroundImage = n
                }
            }, o.setOverlay = function () {
                var t = this.overlay,
                    e = this.componentWidth,
                    i = this.componentHeight;
                if (t) {
                    var a = "medium";
                    e <= 200 || i <= 150 ? a = "xsmall" : e <= 400 || i <= 250 ? a = "small" : e >= 650 && i >= 400 && (a = "large"), t.setAttribute("data-size", a), "hover" === t.getAttribute("data-type") && $(t).on("mouseenter mouseleave touchstart touchend", (function (e) {
                        var i = /enter|start/.test(e.type);
                        $(t).toggleClass("hover", i)
                    }))
                }
            }, o.updateParams = function () {
                var e = this.params,
                    i = this.component,
                    a = this.img;
                if (!e.id) {
                    var n = i.getAttribute("data-img-id");
                    if (t[n]) e = _extends({}, t[n]);
                    else {
                        e.id = n, e.ext = i.getAttribute("data-img-ext"), e.name = i.getAttribute("data-img-name"), e.proportion = +i.getAttribute("data-img-proportion") / 100;
                        var o = e.name.match(/\.(\D{2,4})$/i) || [];
                        o[1] && e.ext !== o[1] && (e.ext = o[1] || !1), e.resizable = !["svg", "gif"].includes(e.ext)
                    }
                    e.x = i.getAttribute("data-img-x"), e.y = i.getAttribute("data-img-y"), e.type = i.getAttribute("data-img-type"), e.action = i.getAttribute("data-action")
                }
                return !e.proportion && a && a.src && (e.proportion = a.naturalHeight / a.naturalWidth), e.scale = i.getAttribute("data-img-scale") || "cover", e.original_resolution = +i.getAttribute("data-original-resolution"), t[e.id] || (t[e.id] = _extends({}, e)), this.params = e, e
            }, o.updateSize = function () {
                var t = this.component.getBoundingClientRect();
                this.componentWidth = t.width % 1 ? Math.ceil(t.width) : t.width, this.componentHeight = t.height % 1 ? Math.ceil(t.height) : t.height
            }, o.getProportion = function (a) {
                void 0 === a && (a = function () {
                });
                var n = this.params;
                if (n.proportion) a(n.proportion);
                else {
                    var o = i(n, 50);
                    e(o, (function (e) {
                        n.proportion = e.naturalHeight / e.naturalWidth, t[n.id] && (t[n.id].proportion = n.proportion), a(n.proportion)
                    }))
                }
            }, o.getOptimalSize = function (t) {
                void 0 === t && (t = function () {
                });
                var e = this.componentWidth,
                    i = this.componentHeight,
                    a = i / e,
                    n = this.params.type,
                    o = this.params.scale;
                this.params.original_resolution ? t({width: null, height: null}) : this.getProportion((function (r) {
                    var s, h;
                    "image" === n || a > r && "contain" === o || a < r && "cover" === o ? (s = Math.ceil(e), h = Math.ceil(s * r)) : (h = Math.ceil(i), s = Math.ceil(h / r)), t({
                        width: s,
                        height: h
                    })
                }))
            }, n
        }(BaseComponent);
    flexbe_cli.components.classes.image = a, flexbe_cli.components.helpers.replacePlaceholder = function (t) {
        var e = $(t);
        e && 0 !== e.length && e.each((function (t, e) {
            var i = $(e).data("src"),
                a = $(e).data("srcset"),
                n = new Image;
            n.onload = function () {
                i && (e.src = i), a && (e.srcset = a), $(e).addClass("loaded")
            }, i && (n.src = i), a && (n.srcset = a)
        }))
    }
}();
"use strict";
!function () {
    var e = function () {
        function e(e) {
            if (this.$legend = e.find(".range-legend"), this.$component = e.find(".range-outer"), this.$input = e.find("input"), this.startEdge = this.$component.data("start"), this.isDouble = !!this.$component.data("double"), this.endEdge = this.$component.data("end"), this.range = this.endEdge - this.startEdge, this.barWidth = this.$component.width(), this.step = this.$component.data("step") || 1, this.steps = Math.round(this.range / this.step), this.legendType = this.$legend.data("type"), this.legendText = 1 == +this.$legend.data("text"), this.animated = !0, this.duration = this.steps < 10 && 1 / this.steps * 300, this.fractExponent = Math.max(this.getFract(this.startEdge), this.getFract(this.endEdge), this.getFract(this.step)), this.fractDevider = Math.pow(10, this.fractExponent), this.$value = $(".range-value", this.$component), this.$endRunner = $(".range-runner-right", this.$component), this.$endRunnerTip = $(".runner-tip", this.$endRunner), this.$endRunnerValue = $(".value", this.$endRunner), this.endRunnerWidth = this.$endRunner.width(), this.$startRunner = $(".range-runner-left", this.$component), this.$startRunnerValue = $(".value", this.$startRunner), this.$startRunnerTip = $(".runner-tip", this.$startRunner), this.startRunnerWidth = this.$startRunner.width(), this.defaultShift = this.$endRunner.width() / 2, this.activeRunner = !1, this.isDouble) {
                var t = this.$input.data("value").split(" — ");
                this.startValue = +t[0], this.endValue = +t[1]
            } else this.endValue = +this.$input.data("value"), this.startValue = +this.startEdge;
            this.endParams = {}, this.drawLegend(), this.setEvents(), this.setRunnersValue()
        }

        var t = e.prototype;
        return t.formatN = function (e) {
            return (e < 0 ? "-" : "") + flexbe_cli.locale.formatNumber(e, this.fractExponent)
        }, t.getFract = function (e) {
            var t = ("" + e).split(".");
            return t[1] && t[1].length || 0
        }, t.drawLegend = function () {
            var e = this;
            if (this.legendText) return !1;
            var t = this.$legend.find(".from"),
                n = this.$legend.find(".to");
            if (t.text(this.formatN(this.startEdge)), n.text(this.formatN(this.endEdge)), "complex" !== this.legendType) return !1;
            this.$legend.find(".legend-point:not(.from, .to)").off("click").remove(), this.$legend.removeClass("complex").addClass("limits");
            for (var s, i = [("" + this.formatN(this.startEdge)).length, ("" + this.formatN(this.endEdge)).length, ("" + this.formatN(this.step)).length], a = (i[0] + i[1] + i[2]) / 3, r = Math.max(this.startEdge, this.endEdge), u = [5 * this.step * this.fractDevider / this.fractDevider], o = 1; o <= 12; o += 1) {
                var h = Math.pow(10, o) * this.step;
                h < r && D(u, h, this.fractDevider)
            }
            for (var d = Math.ceil(this.$legend.find(i[0] > i[1] ? ".from" : ".to").width() / Math.max(i[1], i[0])), l = Math.round(.83 * this.barWidth / (d * a)), c = this.range > 0 ? 1 : -1, f = Math.min(l, 10); f >= 3; f -= 1) {
                var p = C(this.step, Math.abs(this.steps), f, u);
                if (p && Number.isInteger(p / this.step) && Number.isInteger(this.range / p)) {
                    s = p;
                    break
                }
            }
            if (!s || !Number.isInteger(this.range / (s * c)) || this.range / (s * c) < 3)
                for (var v = Math.min(Math.round(this.range / this.step), l, 10); v >= 2; v -= 1) {
                    var m = this.roundFraction(this.range / v);
                    if (m % this.step == 0) {
                        s = m * c;
                        break
                    }
                }
            var g = this.roundFraction(this.range / (s * c));
            if (s && Number.isInteger(g)) {
                for (var R = [], b = 1; b < g; b += 1) {
                    var V = Math.round((this.startEdge + s * b * c) * this.fractDevider) / this.fractDevider;
                    R.push('<div class="legend-point" data-value="' + V + '">' + this.formatN(V) + "</div>")
                }
                g > 2 && (this.$legend.attr("data-count", g), this.$legend.removeClass("limits").addClass("complex"));
                var E = $(R.join(""));
                this.$legend.find(".from").after(E)
            } else this.$legend.removeClass("complex").addClass("limits");

            function C(e, t, n, s) {
                return s.includes(t / n * e) ? t / n * e : s.includes((t + 1) / n * e) ? (t + 1) / n * e : s.includes((t + 2) / n * e) ? (t + 2) / n * e : s.includes((t + 3) / n * e) ? (t + 3) / n * e : s.includes((t + 4) / n * e) ? (t + 4) / n * e : s.includes((t + 5) / n * e) ? (t + 5) / n * e : s.includes((t + 6) / n * e) ? (t + 6) / n * e : s.includes((t + 7) / n * e) ? (t + 7) / n * e : s.includes((t + 8) / n * e) ? (t + 8) / n * e : !!s.includes((t + 9) / n * e) && (t + 9) / n * e
            }

            function D(e, t, n) {
                for (var s = 1; s < 10; s += 1) e.push(Math.round(t * s * n) / n), e.push(Math.round(t * s * n + t / 2) / n)
            }

            this.$legend.find(".legend-point:not(.to), .legend-point:not(.from)").each((function (t, n) {
                $(n).on("click", (function () {
                    if (e.updateBarWidth(), e.isDouble) {
                        var t = (e.startValue + e.endValue) / 2,
                            s = +$(n).data("value"),
                            i = e.startEdge < e.endEdge ? 1 : -1;
                        s * i >= t * i ? e.endValue = s : e.startValue = s
                    } else e.endValue = $(n).data("value");
                    e.setRunnersValue()
                }))
            }))
        }, t.roundFraction = function (e) {
            return Math.round(1e10 * e) / 1e10
        }, t.setRunnersValue = function (e) {
            var t = this;
            if (void 0 === e && (e = !1), !Number.isFinite(this.endValue) || !Number.isFinite(this.range) || this.isDouble && !Number.isFinite(this.startValue)) return !1;
            var n = this.startEdge < this.endEdge ? 1 : -1;
            "start" === this.activeRunner ? this.startValue * n <= this.startEdge * n ? this.startValue = this.startEdge : this.startValue * n >= this.endValue * n && (this.startValue = this.endValue) : this.endValue * n >= this.endEdge * n ? this.endValue = this.endEdge : this.endValue * n <= this.startValue * n && (this.endValue = this.startValue);
            var s = this.isDouble ? this.startValue : this.startEdge,
                i = this.isDouble ? (this.startValue - this.startEdge) / (this.range / 100) : 0,
                a = (this.endValue - s) / (this.range / 100);
            if (this.endValue = Math.round(this.endValue * this.fractDevider) / this.fractDevider, this.startValue = Math.round(this.startValue * this.fractDevider) / this.fractDevider, requestAnimationFrame((function () {
                t.$endRunnerValue.text(t.formatN(t.endValue)), t.$startRunnerValue.text(t.formatN(t.startValue))
            })), flexbe_cli.run.is_mobile) {
                var r = this.$endRunnerTip.width() / 2,
                    u = this.barWidth * (a / 100);
                if ("end" === this.activeRunner)
                    if (u > this.barWidth - r) {
                        var o = u + r - this.barWidth;
                        this.$endRunnerTip.css({transform: "translateX(-" + o + "px)"})
                    } else if (u < r) {
                        var h = r - u;
                        this.$endRunnerTip.css({transform: "translateX(" + h + "px)"})
                    } else this.$endRunnerTip.css({transform: "translateX(0)"});
                else {
                    var d = this.$startRunnerTip.width() / 2;
                    if (u > this.barWidth - d) {
                        var l = u + r - this.barWidth;
                        this.$startRunnerTip.css({transform: "translateX(" + l + "px)"})
                    } else if (u < d) {
                        var c = d - u;
                        this.$startRunnerTip.css({transform: "translateX(-" + c + "px)"})
                    } else this.$startRunnerTip.css({transform: "translateX(0)"})
                }
            }
            this.$value.css({
                width: a + "%",
                marginLeft: i + "%"
            }), e || (this.isDouble ? this.$input.val(this.startValue + " — " + this.endValue) : this.$input.val(this.endValue))
        }, t.getValueFromLength = function (e) {
            var t = this.range / (this.barWidth / e);
            return (Math.round(t / this.step) + this.startEdge / this.step) * this.step
        }, t.applyEndPosition = function (e) {
            return this["start" === this.activeRunner ? "startValue" : "endValue"] = this.getValueFromLength(e), this.setRunnersValue(), !0
        }, t.touchHendler = function (e) {
            if (!this.endParams.active || 1 !== e.touches.length) return $("body")[0].removeEventListener("touchmove", this.touchHendler), !1;
            this.toggleAnimation(!1), e.preventDefault(), e.stopPropagation();
            var t = e.touches[0].pageX - this.endParams.left - this.endParams.shift;
            this.applyEndPosition(t)
        }, t.startWatchingEvents = function (e) {
            void 0 === e && (e = this.defaultShift), this.endParams = {
                active: !0,
                left: this.$component.offset().left,
                shift: e
            }, clearTimeout(this.calmRunnersTimeout), "end" === this.activeRunner ? this.$endRunner.addClass("active") : this.$startRunner.addClass("active")
        }, t.toggleAnimation = function (e) {
            e ? Math.abs(this.barWidth / this.steps) < 15 ? this.$component.addClass("animated") : (this.$component.removeClass("active-animation"), this.duration && this.$component.removeClass("animation-speed-" + (12 - Math.abs(Math.round(this.steps))))) : Math.abs(this.barWidth / this.steps) < 15 ? this.$component.removeClass("animated") : (this.$component.addClass("active-animation"), this.duration && this.$component.addClass("animation-speed-" + (12 - Math.abs(Math.round(this.steps)))))
        }, t.afterRunnerReleased = function () {
            this.endParams.active && ("start" === this.activeRunner ? this.$startRunner.focus() : this.$endRunner.focus()), this.endParams.active = !1, this.debounceActive(), this.barWidth / this.steps < 15 ? this.$component.addClass("animated") : this.$component.removeClass("active-animation"), this.toggleAnimation(!0)
        }, t.updateBarWidth = function () {
            var e = this.$component.width();
            e !== this.barWidth && (this.barWidth = e, "complex" === this.legendType && this.drawLegend())
        }, t.setEvents = function () {
            var e = this,
                t = $(window),
                n = this;

            function s(e) {
                if (!n.endParams.active) return t.off("mousemove.dragRange"), !1;
                n.toggleAnimation(!1);
                var s = e.pageX - n.endParams.left - n.endParams.shift;
                return n.applyEndPosition(s), !0
            }

            this.$component.on("resize", (function () {
                e.updateBarWidth()
            })), this.$component.on("touchstart", (function (n) {
                if (1 !== n.touches.length) return !1;
                if (e.isDouble) {
                    var s = (e.$endRunner.offset().left + e.$startRunner.offset().left) / 2;
                    e.activeRunner = n.touches[0].pageX >= s ? "end" : "start", "start" === e.activeRunner ? (e.$startRunner.addClass("upper-runner"), e.$endRunner.removeClass("upper-runner")) : (e.$endRunner.addClass("upper-runner"), e.$startRunner.removeClass("upper-runner"))
                } else e.activeRunner = "end";
                n.stopPropagation(), e.updateBarWidth();
                var i = n.touches[0].pageX - e.$value.offset().left;
                e.startWatchingEvents(), e.applyEndPosition(i - e.defaultShift), t[0].addEventListener("touchmove", e.touchHendler.bind(e), {passive: !1}), t.on("touchend.range", (function () {
                    e.afterRunnerReleased(), t[0].removeEventListener("touchmove", e.touchHendler), t.off("touchend.range")
                }))
            })), this.$component.on("mousedown", (function (n) {
                var i = n.pageX - e.$component.offset().left;
                if (e.isDouble) {
                    var a = (e.$endRunner.offset().left + e.$startRunner.offset().left) / 2;
                    e.activeRunner = n.pageX >= a ? "end" : "start", "start" === e.activeRunner ? (e.$startRunner.addClass("upper-runner"), e.$endRunner.removeClass("upper-runner")) : (e.$endRunner.addClass("upper-runner"), e.$startRunner.removeClass("upper-runner"))
                }
                e.updateBarWidth(), e.startWatchingEvents(), e.applyEndPosition(i - e.defaultShift), "start" === e.activeRunner ? e.$startRunner.focus() : e.$endRunner.focus(), t.on("mousemove.dragRange", s), t.on("mouseup.range", (function () {
                    e.afterRunnerReleased(), t.off("mousemove.dragRange"), t.off("mouseup.range")
                }))
            })), this.$endRunner.on("touchstart", (function (n) {
                if (1 !== n.touches.length) return !1;
                n.stopPropagation(), e.updateBarWidth(), e.activeRunner = "end", e.$startRunner.removeClass("upper-runner"), e.$endRunner.addClass("upper-runner"), n.stopPropagation(), e.startWatchingEvents(n.touches[0].pageX - e.$endRunner.offset().left), e.toggleAnimation(!1), t[0].addEventListener("touchmove", e.touchHendler.bind(e), {passive: !1}), t.on("touchend.range", (function () {
                    e.afterRunnerReleased(), t[0].removeEventListener("touchmove", e.touchHendler), t.off("touchend.range")
                }))
            })), this.$startRunner.on("touchstart", (function (n) {
                if (1 !== n.touches.length) return !1;
                n.stopPropagation(), e.updateBarWidth(), e.activeRunner = "start", e.$startRunner.addClass("upper-runner"), e.$endRunner.removeClass("upper-runner"), n.stopPropagation(), e.startWatchingEvents(n.touches[0].pageX - e.$startRunner.offset().left), e.toggleAnimation(!1), t[0].addEventListener("touchmove", e.touchHendler.bind(e), {passive: !1}), t.on("touchend.range", (function () {
                    e.afterRunnerReleased(), t[0].removeEventListener("touchmove", e.touchHendler), t.off("touchend.range")
                }))
            })), this.$endRunner.on("mousedown", (function (n) {
                n.stopPropagation(), e.activeRunner = "end", e.$startRunner.removeClass("upper-runner"), e.$endRunner.addClass("upper-runner"), e.updateBarWidth(), e.$endRunner.focus(), e.startWatchingEvents(n.pageX - e.$endRunner.offset().left), e.toggleAnimation(!1), t.on("mousemove.dragRange", s), t.on("mouseup.range", (function () {
                    e.afterRunnerReleased(), t.off("mousemove.dragRange"), t.off("mouseup.range")
                }))
            })), this.$startRunner.on("mousedown", (function (n) {
                n.stopPropagation(), e.activeRunner = "start", e.$startRunner.addClass("upper-runner"), e.$endRunner.removeClass("upper-runner"), e.updateBarWidth(), e.$startRunner.focus(), e.startWatchingEvents(n.pageX - e.$startRunner.offset().left), e.toggleAnimation(!1), t.on("mousemove.dragRange", s), t.on("mouseup.range", (function () {
                    e.afterRunnerReleased(), t.off("mousemove.dragRange"), t.off("mouseup.range")
                }))
            })), this.$legend.find(".legend-point.to, .legend-point.from").each((function (t, n) {
                $(n).on("click", (function () {
                    if (e.updateBarWidth(), e.isDouble) {
                        var t = e.startEdge < e.endEdge ? 1 : -1,
                            s = (e.startValue + e.endValue) / 2,
                            i = +$(n).data("value");
                        i * t >= s * t ? e.endValue = i : e.startValue = i
                    } else e.endValue = $(n).data("value");
                    e.setRunnersValue()
                }))
            })), this.$input.on("change", (function () {
                if (e.isDouble) {
                    var t = e.$input.val().split(" — ");
                    e.startValue = +t[0], e.endValue = +t[1]
                } else e.endValue = +e.$input.val();
                e.setRunnersValue(!0)
            })), this.$startRunner.on("keyup", (function (t) {
                t.preventDefault(), e.activeRunner = "start", e.handleKeydown(t, e.$startRunner)
            })), this.$endRunner.on("keyup", (function (t) {
                t.preventDefault(), e.activeRunner = "end", e.handleKeydown(t, e.$endRunner)
            })), this.$startRunner.on("keydown", (function (t) {
                e.activeRunner = "start", e.handleKeyup(t, e.$startRunner)
            })), this.$endRunner.on("keydown", (function (t) {
                e.activeRunner = "end", e.handleKeyup(t, e.$endRunner)
            })), this.$startRunner.on("blur", (function () {
                e.handleBlur()
            }))
        }, t.handleBlur = function () {
            this.movingInterval && (clearInterval(this.movingInterval), this.movingInterval = !1), this.movingDebounceTimeout && (clearTimeout(this.movingDebounceTimeout), this.movingDebounceTimeout = !1)
        }, t.handleKeydown = function (e, t) {
            if (this.movingInterval && (clearInterval(this.movingInterval), this.movingInterval = !1), this.movingDebounceTimeout && (clearTimeout(this.movingDebounceTimeout), this.movingDebounceTimeout = !1), [37, 38, 39, 40].includes(e.keyCode)) {
                var n = e.shiftKey ? 10 : 1,
                    s = "start" === this.activeRunner ? "startValue" : "endValue";
                38 === e.keyCode || 39 === e.keyCode ? this[s] = (this[s] / this.step + n) * this.step : 37 !== e.keyCode && 40 !== e.keyCode || (this[s] = (this[s] / this.step - n) * this.step), t.addClass("active"), this.debounceActive(), this.setRunnersValue()
            }
        }, t.handleKeyup = function (e, t) {
            9 !== e.keyCode && [37, 38, 39, 40].includes(e.keyCode) && (e.preventDefault(), t.addClass("active"), this.debounceActive(), this.startDebouncedMove(e))
        }, t.startDebouncedMove = function (e) {
            var t = this;
            this.movingDebounceTimeout && (clearTimeout(this.movingDebounceTimeout), this.movingDebounceTimeout = !1), this.movingDebounceTimeout = setTimeout((function () {
                t.movingInterval = setInterval((function () {
                    t.debounceActive();
                    var n = e.shiftKey ? 10 : 1,
                        s = "start" === t.activeRunner ? "startValue" : "endValue";
                    38 === e.keyCode || 39 === e.keyCode ? t[s] = (Math.round(t[s] / t.step) + n) * t.step : 37 !== e.keyCode && 40 !== e.keyCode || (t[s] = (Math.round(t[s] / t.step) - n) * t.step), t.setRunnersValue()
                }), 50)
            }), 300)
        }, t.debounceActive = function () {
            var e = this;
            this.calmRunnersTimeout && clearTimeout(this.calmRunnersTimeout), this.calmRunnersTimeout = setTimeout((function () {
                e.$endRunner.removeClass("active"), e.$startRunner.removeClass("active")
            }), 500)
        }, e
    }();
    flexbe_cli.components.classes.rangeInput = e
}();
"use strict";

function ownKeys(e, i) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        i && (o = o.filter((function (i) {
            return Object.getOwnPropertyDescriptor(e, i).enumerable
        }))), t.push.apply(t, o)
    }
    return t
}

function _objectSpread(e) {
    for (var i = 1; i < arguments.length; i++) {
        var t = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(t), !0).forEach((function (i) {
            _defineProperty(e, i, t[i])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i))
        }))
    }
    return e
}

function _defineProperty(e, i, t) {
    return i in e ? Object.defineProperty(e, i, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[i] = t, e
}

!function () {
    var e = function () {
        function e(e, i, t) {
            this.$section = e, this.video = i, this.sectionSize = {
                width: this.$section.width(),
                height: this.$section.height()
            }, "function" == typeof t && (this.onStructured = t), this.sectionSize.res = this.sectionSize.width / this.sectionSize.height, this.initVideo()
        }

        var i = e.prototype;
        return i.initVideo = function () {
            this.$container = $('<div class="video_bg_container ' + this.video.type + '">\n                <div class="video_bg_player"></div>\n                <div class="video_bg_protect"></div>\n            </div>'), this.$playerOuter = this.$container.find(".video_bg_player"), this.$playerOverlay = this.$container.find(".video_bg_protect").first(), this.video.image && this.$playerOverlay.css({backgroundImage: "url(" + this.video.image + ")"}), "vimeo" === this.video.type ? this.createVimeo() : "youtube" === this.video.type ? this.createYoutube() : this.createMP4()
        }, i.createVimeo = function () {
            var e = this;
            flexbe_cli.require(["https://player.vimeo.com/api/player.js"], (function () {
                e.$videoElement = $('<iframe src="../https@player.vimeo.com/video/' + e.video.id + '@muted=1&controls=0&autopause=0&loop=1&autoplay=1&background=1" width="640" height="360" frameborder="0"></iframe>'), e.insertVideo(), e.vPlayer = new window.Vimeo.Player(e.$videoElement[0]), e.vPlayer.on("play", (function () {
                    e.videoIsLoaded = !0, e.videoIsResized && e.$section.delay(100).addClass("video_is_loaded")
                })), e.getVimeoResolution().then((function (i) {
                    return e.video.size = _objectSpread({res: i.width / i.height}, i), e.resize(), !0
                })).catch((function () {
                }))
            }))
        }, i.createYoutube = function () {
            var e = this,
                i = {
                    videoId: this.video.id,
                    playerVars: {
                        cc_load_policy: 0,
                        iv_load_policy: 3,
                        autoplay: 1,
                        modestbranding: 1,
                        branding: 0,
                        wmode: "opaque",
                        rel: 0,
                        mute: 1,
                        disablekb: 1,
                        color: "white",
                        controls: 0,
                        showinfo: 0
                    },
                    events: {
                        onReady: function () {
                            e.$videoElement = e.$playerOuter.find("iframe"), e.youtubeGetResolution(), e.resize()
                        }, onStateChange: function (i) {
                            1 !== i.data || e.videoIsLoaded ? 0 === i.data && e.play() : (e.videoIsLoaded = !0, e.videoIsResized && (e.$section.delay(100).addClass("video_is_loaded"), e.executed = !0))
                        }
                    }
                };
            if (window.YT || window.onYouTubeIframeAPIReady)
                if (window.onYouTubeIframeAPIReady) window.youtubeBGQuae.push((function () {
                    var t = $("<div></div>");
                    e.insertVideo(t), e.yPlayer = new window.YT.Player(t[0], i)
                }));
                else {
                    var t = $("<div></div>");
                    this.insertVideo(t), this.yPlayer = new window.YT.Player(t[0], i)
                }
            else window.onYouTubeIframeAPIReady = function () {
                window.youtubeBGQuae.forEach((function (e) {
                    e()
                })), window.youtubeBGQuae = null, window.onYouTubeIframeAPIReady = null
            }, window.youtubeBGQuae = [], window.youtubeBGQuae.push((function () {
                var t = $("<div></div>");
                e.insertVideo(t), e.yPlayer = new window.YT.Player(t[0], i)
            })), flexbe_cli.require(["../https@www.youtube.com/iframe_api"])
        }, i.createMP4 = function () {
            var e = this;
            this.$videoElement = $('<video src="' + this.video.url + '" controlslist="nodownload" loop="1" muted="1" autoplay="1"></video>'), this.insertVideo(), this.$videoElement[0].oncanplay = function () {
                setInterval((function () {
                    e.videoIsLoaded = !0, e.videoIsResized && e.$section.delay(100).addClass("video_is_loaded")
                }), 50)
            }, this.$videoElement.on("loadeddata", (function () {
                e.video.size = {res: e.$videoElement.width() / e.$videoElement.height()}, e.resize()
            }))
        }, i.getVimeoResolution = function () {
            var e = this.vPlayer,
                i = 0;
            return function t() {
                return Promise.all([e.getVideoWidth(), e.getVideoHeight()]).then((function (e) {
                    var o = e[0],
                        s = e[1];
                    return o / s < 2.5 && o / s > .4 || 3 === i ? {width: o, height: s} : (i += 1, t())
                }))
            }()
        }, i.youtubeGetResolution = function () {
            var e = this.$videoElement.attr("width"),
                i = this.$videoElement.attr("height");
            return this.video.size = {width: e, height: i, res: e / i}, this.video.size
        }, i.insertVideo = function (e) {
            this.$playerOuter.append(e || this.$videoElement), this.$section.append(this.$container), this.onStructured && this.onStructured(this.$container)
        }, i.resize = function () {
            if (this.sectionSize = {
                width: this.$section.width(),
                height: this.$section.height()
            }, this.sectionSize.res = this.sectionSize.width / this.sectionSize.height, "custom" !== this.video.type && this.video && this.video.size)
                if (this.$videoElement.width(this.$videoElement.height() * this.video.size.res), this.video.size.res > this.sectionSize.res) {
                    var e = this.$playerOuter.height();
                    this.$videoElement.css({height: e + "px"}), this.$videoElement.css({width: e * this.video.size.res + "px"})
                } else {
                    var i = this.$playerOuter.width();
                    this.$videoElement.css({width: i + "px"}), this.$videoElement.css({height: i / this.video.size.res + "px"})
                }
            else "custom" === this.video.type && this.video && this.video.size && this.video.size.res && (this.sectionSize.res >= this.video.size.res ? this.$videoElement.removeClass("wide").addClass("high") : this.$videoElement.removeClass("high").addClass("wide"));
            this.videoIsResized = !0, this.videoIsLoaded && this.$section.delay(100).addClass("video_is_loaded")
        }, i.play = function () {
            "vimeo" === this.video.type && this.vPlayer ? this.vPlayer.play() : "youtube" === this.video.type && this.yPlayer && this.yPlayer.playVideo ? this.yPlayer.playVideo() : this.$videoElement && this.$videoElement[0] && this.$videoElement[0].pause && this.$videoElement[0].play()
        }, i.pause = function () {
            "vimeo" === this.video.type && this.vPlayer ? this.vPlayer.pause() : "youtube" === this.video.type && this.yPlayer && this.yPlayer.pauseVideo ? this.yPlayer.pauseVideo() : this.$videoElement && this.$videoElement[0] && this.$videoElement[0].pause && this.$videoElement[0].pause()
        }, e
    }();
    flexbe_cli.components.classes.VideoBackground = e
}();
"use strict";

function _assertThisInitialized(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
}

function _inheritsLoose(t, i) {
    t.prototype = Object.create(i.prototype), t.prototype.constructor = t, t.__proto__ = i
}

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var i = 1; i < arguments.length; i++) {
            var e = arguments[i];
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }
        return t
    }).apply(this, arguments)
}

!function () {
    function t(t, i, e, n) {
        var s = $(t),
            a = i ? '[data-component="' + i + '"]' : "[data-component]";
        s.is(a) ? s.trigger(e, n) : $(t).find(a).each((function (t, i) {
            $(i).trigger(e, n)
        }))
    }

    function i(t) {
        return ["normal", "active"].includes(t)
    }

    var e = function () {
            function t(t, i) {
                if (i = _extends({
                    init: !0,
                    targets: "span",
                    active: 0
                }, i), "object" != typeof t || !t.querySelectorAll) return !1;
                Array.isArray(i.targets) || i.targets instanceof NodeList || i.targets instanceof HTMLCollection ? this.targets = Array.from(i.targets) : this.targets = Array.from(t.querySelectorAll(i.targets)), this.pagination = t, this.options = i, this.active = i.active, this.visible = i.visible || +t.getAttribute("data-bullets-visible"), this.visible || (this.visible = this.targets.length >= 8 ? 3 : this.targets.length), this.init()
            }

            var e = t.prototype;
            return e.init = function () {
                this.bindEvents(), this.options.init && this.setActive(this.active, !0)
            }, e.bindEvents = function () {
                var t = this.targets,
                    i = this.options,
                    e = $(t);
                "function" == typeof i.onClick && e.off(".bpc").on("click.bpc", (function (t) {
                    var n = $(t.currentTarget),
                        s = +e.filter('[data-state="active"]').attr("data-index"),
                        a = +n.attr("data-index");
                    i.onClick(a, s)
                }))
            }, e.setActive = function (t, e) {
                var n, s, a = this.targets,
                    o = this.active,
                    r = this.oldMap,
                    l = this.newMap;
                if (!a.length) return t;
                if (t = Math.max(Math.min(t, a.length - 1), 0), r = r && r.length ? r : a.map((function (t) {
                    var i = t.getAttribute("data-state") || "hidden";
                    return {target: t, state: i}
                })), (e ? 0 : r.reduce((function (t, e) {
                    return t + (i(e.state) ? 1 : 0)
                }), 0)) !== this.visible) s = Math.min(t + this.visible - 1, a.length - 1), n = Math.max(s - this.visible + 1, 0), l = r.map((function (t, i) {
                    var e = t.target;
                    t.state;
                    return {target: e, state: i >= n && i <= s ? "normal" : "hidden"}
                }));
                else {
                    var d = function t(e) {
                        var n = e.from,
                            s = e.to,
                            a = e.map,
                            o = e.move,
                            r = void 0 === o ? 0 : o,
                            l = a[s - r],
                            d = l && i(l.state);
                        return !l || d ? r : n < s ? t({from: n, to: s, map: a, move: r + 1}) : s < n ? t({
                            from: n,
                            to: s,
                            map: a,
                            move: r - 1
                        }) : r
                    }({from: o, to: t, map: r});
                    l = r.map((function (t, e) {
                        var a = t.target,
                            o = t.state,
                            l = r[e - d];
                        return "normal" === (o = l && l.state && i(l.state) ? "normal" : "hidden") && (void 0 === n && (n = e), s = e), {
                            target: a,
                            state: o
                        }
                    }))
                }
                return l[t].state = "active", l[n - 1] && (l[n - 1].state = "next"), l[n - 2] && (l[n - 2].state = "more"), l[s + 1] && (l[s + 1].state = "next"), l[s + 2] && (l[s + 2].state = "more"), a.forEach((function (t, i) {
                    t.setAttribute("data-state", l[i].state)
                })), this.active = t, this.oldMap = l, t
            }, t
        }(),
        n = function () {
            function t(t, i) {
                this.options = _extends({
                    init: !0,
                    tag: "span"
                }, i), this.pagination = t, this.tag = this.options.tag, this.filled = !1, this.states = ["hidden", "more", "next", "active", "next", "more", "hidden"], this.init()
            }

            var i = t.prototype;
            return i.init = function () {
                this.bindEvents(), this.options.init && this.fillPagination({states: this.states, force: !0})
            }, i.bindEvents = function () {
                var t = this.tag,
                    i = this.pagination,
                    e = this.options,
                    n = $(i);
                "function" == typeof e.onClick && n.off(".bpc").on("click.bpc", t, (function (t) {
                    var i = $(t.currentTarget),
                        n = +i.siblings('[data-state="active"]').attr("data-index"),
                        s = +i.attr("data-index") - n;
                    e.onClick(s)
                }))
            }, i.setActive = function (t) {
                var i = this,
                    e = this.states,
                    n = this.filled && t;
                if (this.fillPagination({states: e, force: !0}), n) {
                    this.pagination.offsetWidth;
                    var s = e.map((function (i, n) {
                        return e[n + ("prev" === t ? 1 : -1)] || "hidden"
                    }));
                    requestAnimationFrame((function () {
                        i.fillPagination({states: s})
                    }))
                }
            }, i.fillPagination = function (t) {
                var i = void 0 === t ? {} : t,
                    e = i.states,
                    n = i.force,
                    s = $(this.pagination),
                    a = this.tag;
                if (this.filled = !0, n) {
                    var o = e.reduce((function (t, i, e) {
                        return t + "<" + a + ' data-index="' + e + '" class="swiper-pagination-bullet" data-state="' + i + '"></' + a + ">"
                    }), "");
                    s.html(o)
                } else s.find(a).each((function (t, i) {
                    var n = $(i);
                    n.attr("data-state", e[t] || "hidden"), n.attr("data-index", t)
                }))
            }, t
        }(),
        s = function (i) {
            function s() {
                for (var t, e = arguments.length, n = new Array(e), s = 0; s < e; s++) n[s] = arguments[s];
                var a = _assertThisInitialized(t = i.call.apply(i, [this].concat(n)) || this).component;
                t.require = ["/_s/lib/swiper/swiper.v5.js?538"], t.is = "slider", t.swiper = null, t.sliderEl = a.querySelector(".swiper-container"), t.paginationEl = a.querySelector(".slider-pagination"), t.prevEl = a.querySelector('.slider-prev, [data-direction="prev"]'), t.nextEl = a.querySelector('.slider-next, [data-direction="next"]');
                var o = t.paginationEl && t.paginationEl.getAttribute("data-type") || "bullets";
                return t.options = {
                    paginationType: o,
                    count: a.getAttribute("data-count"),
                    loop: Boolean(!flexbe_cli.is_admin && Math.floor(a.getAttribute("data-loop"))),
                    autoplay: !flexbe_cli.is_admin && Math.floor(a.getAttribute("data-autoplay")) || !1,
                    effect: a.getAttribute("data-effect") || "slide"
                }, t
            }

            _inheritsLoose(s, i);
            var a = s.prototype;
            return a.onInit = function () {
                this.isUpdated && this.isLoaded && this.initSwiper()
            }, a.onLoad = function () {
                if (!this.core.inScreen && !this.core.inBeside) return !1;
                this.initSwiper()
            }, a.onView = function (t) {
                var i = t.state;
                this.isLoaded && (i && !this.swiper && this.initSwiper(), this.swiper && this.toggleAutoplay({state: i}))
            }, a.onScreen = function (t) {
                if (t.state) return !!this.isLoaded && void (this.swiper || this.initSwiper())
            }, a.onBeside = function (t) {
                t.state && this.isLoaded && !this.swiper && this.initSwiper()
            }, a.onResize = function () {
                this.setComponentSize(), this.setSliderClasses()
            }, a.initSwiper = function () {
                var i = this;
                if (this.swiper || this.options.count <= 1 || "undefined" == typeof Swiper) return !1;
                var s, a = this.options,
                    o = this.component,
                    r = this.core,
                    l = this.root,
                    d = this.index,
                    c = this.sliderEl,
                    p = this.paginationEl,
                    h = this.prevEl,
                    u = this.nextEl,
                    f = (r && r.id || "-") + ":" + d,
                    v = a.count,
                    g = a.loop,
                    m = a.paginationType,
                    b = a.effect,
                    w = this.owner.closest(".swiper-inited"),
                    x = {prevEl: h, nextEl: u},
                    y = {
                        el: p,
                        type: m,
                        clickable: 4 !== flexbe_cli.theme_id || !g,
                        modifierClass: "slider-pagination-"
                    },
                    S = !!a.autoplay && {delay: 1e3 * a.autoplay, stopOnLastSlide: !g, disableOnInteraction: !1},
                    _ = 0;
                if (flexbe_cli.is_admin) {
                    l._sliderState || (l._sliderState = {});
                    var C = l._sliderState;
                    C[f] && (_ = Math.max(0, Math.min(v - 1, C[f]) || 0)), C[f] = _
                }
                if ("thumbs" === m) {
                    y.type = !1, y.el = null;
                    var A = new Swiper(p.querySelector(".thumbs-slider"), {
                        wrapperClass: "thumbs",
                        slideClass: "thumb-item",
                        loop: !1,
                        slidesPerView: "auto",
                        watchSlidesProgress: !0,
                        watchSlidesVisibility: !0,
                        roundLengths: !0,
                        freeMode: !0,
                        freeModeSticky: !0,
                        normalizeSlideIndex: !1,
                        a11y: !1
                    });
                    s = {
                        swiper: A,
                        autoScrollOffset: 1,
                        slideThumbActiveClass: "thumb-item--active"
                    }, this.thumbsSwiper = A
                }
                var E = new Swiper(c, {
                    init: !1,
                    speed: "fade" === b ? 650 : 450,
                    nested: w,
                    wrapperClass: "swiper-wrapper",
                    slideClass: "swiper-slide",
                    noSwipingClass: "redactor-box",
                    initialSlide: _,
                    navigation: x,
                    pagination: y,
                    thumbs: s,
                    autoplay: S,
                    effect: b,
                    loop: g,
                    fadeEffect: {crossFade: !0},
                    observer: !0,
                    observeParents: !0,
                    simulateTouch: !flexbe_cli.is_admin,
                    a11y: !1,
                    touchReleaseOnEdges: !0,
                    roundLengths: !0,
                    touchMoveStopPropagation: !1,
                    preventClicksPropagation: !0,
                    preventClicks: !0,
                    runCallbacksOnInit: !1
                });
                this.swiper = E, E.on("init", (function () {
                    if (i.setComponentSize(), i.setSliderClasses(), $(h).add(u).removeClass("disabled"), "thumbs" === m && $(p).removeClass("disabled"), g) {
                        var e = $(".swiper-slide-duplicate", o);
                        e.attr("data-cloned", !0), e.find(".component-image").removeAttr("data-lg"), flexbe_cli.components.initComponents({core: r})
                    }
                    var n = E.slides[E.previousIndex],
                        s = E.slides[E.activeIndex];
                    setTimeout((function () {
                        null != n && t(n, !1, "sliderDeactivate"), null != s && t(s, !1, "sliderActivate")
                    }), 10)
                }));
                var I = !1,
                    P = !1;
                g && E.on("slideChangeTransitionEnd", (function () {
                    E.activeIndex !== E.realIndex + 1 ? (I = !0, E.slideToLoop(E.realIndex, 0)) : I = !1
                })), E.on("slideChange", (function () {
                    if (!I) {
                        var e = E.slides[E.previousIndex],
                            n = E.slides[E.activeIndex],
                            s = n && n.getAttribute("data-type") || "image";
                        o.setAttribute("data-current-index", E.realIndex), o.setAttribute("data-current-content", s), flexbe_cli.is_admin && (l._sliderState[f] = E.realIndex), setTimeout((function () {
                            t(e, !1, "sliderDeactivate"), t(n, !1, "sliderActivate"), E.initialized && !P && (P = !0, t(i.$component, "image", "setImage"))
                        }), 10)
                    }
                })), E.on("slideChangeTransitionStart touchStart", (function () {
                    $(c).addClass("slider-in-animation")
                })), E.on("slideChangeTransitionEnd touchEnd", (function () {
                    $(c).removeClass("slider-in-animation")
                })), E.on("paginationRender", (function () {
                    4 === flexbe_cli.theme_id && "bullets" === y.type && (g ? i.loopPagination = new n(p, {
                        init: !1,
                        tag: "span",
                        onClick: function (t) {
                            t < 0 ? E.slidePrev() : t > 0 && E.slideNext()
                        }
                    }) : i.bulletsPagination = new e(p, {
                        init: !1,
                        targets: "span",
                        active: E.realIndex
                    })), $(p).removeClass("disabled")
                })), E.on("paginationUpdate", (function () {
                    if (!I)
                        if (i.bulletsPagination) i.bulletsPagination.setActive(E.realIndex);
                        else if (i.loopPagination) {
                            var t = E.previousIndex < E.activeIndex ? "next" : "prev";
                            i.loopPagination.setActive(t)
                        }
                })), E.init(), this.toggleAutoplay({state: this.core.inView})
            }, a.toggleAutoplay = function (t) {
                var i = t.state;
                if (!this.swiper) return !1;
                var e = this.swiper;
                this.options.autoplay && e.autoplay && (i && !e.autoplay.running ? e.autoplay.start() : !i && e.autoplay.running && e.autoplay.stop())
            }, a.slideTo = function (t, i) {
                void 0 === i && (i = !0), this.swiper && void 0 !== this.swiper.realIndex && this.swiper.realIndex !== t && (i ? this.swiper.slideToLoop(t) : this.swiper.slideTo(t))
            }, a.setSliderClasses = function () {
                if (this.swiper) {
                    var t = this.swiper.params.effect,
                        i = $(this.sliderEl);
                    this._inited || (this._inited = !0, i.addClass("swiper-inited")), this._activeEffect !== t && (this._activeEffect = t, i.toggleClass("swiper-effect-slide", "slide" === t), i.toggleClass("swiper-effect-fade", "fade" === t))
                }
            }, a.setComponentSize = function () {
                this.component.style.width = "";
                var t = this.component.getBoundingClientRect().width;
                if (t % 1 > 0 && (this.component.style.width = Math.round(t) + "px", this.swiper && this.swiper.update()), "thumbs" === this.options.paginationType) {
                    var i = $(this.paginationEl).find(".thumbs-slider"),
                        e = i.find(".thumb-item"),
                        n = e.length,
                        s = this.thumbsSwiper && this.thumbsSwiper.params.slidesPerView;
                    i.css("width", ""), e.css("width", "");
                    var a = i[0].offsetWidth,
                        o = e[0].offsetWidth,
                        r = Math.max(4, Math.round(a / o));
                    n >= 4 && (n === r + 1 || n === r - 1) ? r = n : !s || s !== r + 1 && s !== r - 1 || (r = s);
                    var l = Math.round(a / r) * r;
                    a !== l && i.css("width", l + "px"), i.toggleClass("is-filled", n >= r), this.thumbsSwiper && (this.thumbsSwiper.params.slidesPerView = r, this.thumbsSwiper.update())
                }
            }, s
        }(BaseComponent);
    flexbe_cli.components.classes.slider = s, flexbe_cli.components.classes.bulletsPagination = e, flexbe_cli.components.classes.bulletsLoopPagination = n
}();
"use strict";

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
        }
        return t
    }).apply(this, arguments)
}

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

!function () {
    var t = function (t) {
        function e() {
            for (var e, i = arguments.length, o = new Array(i), n = 0; n < i; n++) o[n] = arguments[n];
            return (e = t.call.apply(t, [this].concat(o)) || this).is = "button", e
        }

        _inheritsLoose(e, t), e.getProductInfo = function (t, e) {
            void 0 === e && (e = !1);
            var i = e ? {} : t._core && t._core.productData || t.data("product");
            if (!1 !== i) {
                var o;
                if (4 === flexbe_cli.theme_id ? (o = t.parents(".content-zone, .flexbe-card, .flexbe-column, .modal-content").last()).length || (o = t.parents("[data-item-id]").last()) : o = t.closest("[data-item-id], .modal-data").eq(0), o = o.clone(), t = t.clone(), o.find('[class^="editor"]').remove(), (i = _extends({}, i)).count || (i.count = 1), !i.img) {
                    var n = function (t) {
                        var e = t.find("[data-img-id]").filter((function (t, e) {
                                return !$(e).closest(".swiper-slide-duplicate").length
                            })).eq(0),
                            i = e.attr("data-img-id"),
                            o = e.attr("data-img-name");
                        return !(!i || !o) && "img/" + i + "_200/" + o
                    };
                    i.img = n(o) || n(o.closest(".flexbe-row"))
                }
                if (!i.title) {
                    var a = o.find(".name, .title, .item-title, .text_title, .element-text--title, .text-style-title:not(.text-rotator), .text-style-subtitle:not(.text-rotator)").eq(0);
                    a.length || (a = o.find(".text-style-conntent").eq(0)), i.title = a.text().trim() || ""
                }
                if (!i.price && 0 !== i.price) {
                    var r = function (t) {
                        var e = t,
                            i = e.find(".text-rotator");
                        i.length > 0 && i.remove(), e.find("del, s, strike").remove();
                        var o = String(e[0] && e[0].innerText || "").replace(/\n/g, "<br>").replace(/\.$/, "").replace(/\u00a0/g, " ");
                        return o = (o = (o = o.match(/(?:[0-9]?\D{0,2} ?)?(?:[1-9][ ,.]?[0-9]{0,3}[ ,.]?[0-9]{0,3})(?:[\.,][0-9]{1,2})?(?: ?\D)?/g) || []).find((function (t) {
                            return t.includes(flexbe_cli.locale.currency.symbol)
                        })) || o[0] || "").match(/(\d+[., ]\d+|\d+)/g, ""), o = flexbe_cli.locale.parseMoney(o)
                    };
                    i.price = r(t.closest(".element-item").find(".price, .item-price, .main-price, .element-text--price").eq(0)) || r(t) || r(o.find(".price, .item-price, .main-price, .element-text--price").eq(0)) || r(o)
                }
            }
            return i
        };
        var i = e.prototype;
        return i.onInit = function () {
            this.isForm = this.$component.is(".form-field-submit"), this.isForm || (this.buttonAction = this.$component.attr("data-action"), this.$component.off("click.core-component").on("click.core-component", this.onClick.bind(this)))
        }, i.onScreen = function (t) {
            t.state && this.setProduct()
        }, i.onBeside = function (t) {
            t.state && this.setProduct()
        }, i.setProduct = function () {
            this.productData || ["link", "file", "close", "quiz"].includes(this.buttonAction) || (this.productData = this.constructor.getProductInfo(this.$component), this.$component.removeAttr("data-product"))
        }, i.onClick = function (t) {
            var e = this.$component,
                i = this.buttonAction,
                o = this.core.id;
            if (!i) return !0;
            if (flexbe_cli.is_admin && !t.target.closest(".editor-focus")) return t.preventDefault(), !0;
            var n = e.attr("data-modal-id");
            flexbe_cli.stat.reachGoals({
                mainGoal: flexbe_cli.stat.getGoal(i, n),
                goal: e.find('[name="goal"]').val(),
                htmlGoal: e.find('[name="goal_html"]').val()
            });
            var a = !1;
            if (!["link", "file", "close", "quiz"].includes(i) && !(a = this.productData || {}).id) {
                var r = flexbe_cli.p_id,
                    c = e.closest("[data-item-id]").attr("data-item-id") || 0,
                    l = this.root && this.root.getAttribute("data-multivar") || "";
                a.id = r + "_" + o + "_" + c + l
            }
            if (a && (a.title && "-" !== a.title || a.price) || (a = !1), i.match(/^modal|^form/)) {
                if (!n || !flexbe_cli.modal.find(n)) n = parseInt(String(o).split("_")[0], 10) + "_" + n;
                flexbe_cli.events.emit("ui_mobilemenu_close"), flexbe_cli.events.emit("ui_modal_open", {
                    id: n,
                    data: {items: a ? [a] : []}
                })
            } else if (a && i.match(/^cart$/)) {
                var s = e.closest(".m_modal").length;
                e.addClass("animate-add-to-cart"), setTimeout((function () {
                    e.removeClass("animate-add-to-cart"), s && (flexbe_cli.events.emit("ui_modal_close"), flexbe_cli.widget.cart.dispatch("addItem", a))
                }), s ? 450 : 1600), s || flexbe_cli.widget.cart.dispatch("addItem", a)
            } else "quiz" === i ? flexbe_cli.events.emit("quiz_command", {
                command: "start",
                id: o
            }) : "close" === i && flexbe_cli.events.emit("ui_modal_close")
        }, e
    }(BaseComponent);
    flexbe_cli.components.classes.button = t
}();
"use strict";

function _inheritsLoose(e, o) {
    e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e.__proto__ = o
}

!function () {
    var e = function (e) {
            function o() {
                for (var o, t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                return (o = e.call.apply(e, [this].concat(n)) || this).is = "map", o.$map = o.$component, o.data = o.$component.data("data"), o
            }

            _inheritsLoose(o, e);
            var t = o.prototype;
            return t.onInit = function () {
                this.isUpdated && this.isLoaded && this.createMap()
            }, t.onLoad = function () {
                (this.core.inScreen || this.core.inBeside) && this.createMap()
            }, t.onScreen = function (e) {
                if (!e.state || !this.isLoaded || this.isCreated) return !1;
                this.isCreated = !0, this.createMap()
            }, t.onBeside = function (e) {
                if (!e.state || !this.isLoaded || this.isCreated) return !1;
                this.isCreated = !0, this.createMap()
            }, t.createMap = function () {
            }, o
        }(BaseComponent),
        o = function (e) {
            function o() {
                for (var o, t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                o = e.call.apply(e, [this].concat(n)) || this;
                var s = flexbe_cli.components.classes.map.getLocaleCode({provider: "yandex"}) || "ru_RU",
                    r = flexbe_cli.vars._group.yandexMapsKey ? "&apikey=" + flexbe_cli.vars._group.yandexMapsKey : "";
                return o.require = ["../https@api-maps.yandex.ru/2.1/@lang=" + s + r], o
            }

            _inheritsLoose(o, e);
            var t = o.prototype;
            return t.onResize = function () {
                var e = this.map;
                e && e.container.fitToViewport()
            }, t.createMap = function () {
                var e = this;
                "undefined" != typeof ymaps && ymaps.ready((function () {
                    e.createVendor(), e.setPlaces(), e.dispatchEvents(), e.fixBehavior(), e.$component.trigger("mapInit"), e.$component.removeClass("loading")
                }))
            }, t.createVendor = function () {
                this.map && this.map.destroy(), this.map = new ymaps.Map(this.$component.find(".map")[0], {
                    center: this.data.center,
                    zoom: this.data.zoom,
                    controls: ["zoomControl"],
                    behaviors: ["default", "scrollZoom"],
                    type: "yandex#map"
                })
            }, t.setPlaces = function () {
                var e = this,
                    o = this.map,
                    t = this.data;
                if (o) {
                    o.geoObjects.removeAll();
                    var n = ymaps.templateLayoutFactory.createClass('<svg title="$[properties.balloonContent]" class="placemark" width="32" height="48" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.36 0 0 5.36 0 12c0 8 12 20 12 20s12-12 12-20c0-6.64-5.36-12-12-12zm0 8a4 4 0 0 1 4 4c0 2.22-1.78 4-4 4a4 4 0 0 1-4-4c0-2.2 1.8-4 4-4z" fill="$[properties.color]" fill-rule="evenodd"/></svg>');
                    ymaps.layout.storage.get("custom#placemark") || ymaps.layout.storage.add("custom#placemark", n), t.places.forEach((function (t, n) {
                        t.color = t.color || "#3D52B0";
                        var a = new ymaps.Placemark(t.coords, {
                            balloonContentHeader: t.name || !1,
                            balloonContent: t.address,
                            color: t.color
                        }, {
                            hideIconOnBalloonOpen: !1,
                            balloonOffset: [0, -48],
                            balloonCloseButton: !1,
                            iconLayout: "custom#placemark",
                            iconShape: {
                                type: "Rectangle",
                                coordinates: [
                                    [-16, -48],
                                    [16, 0]
                                ]
                            }
                        });
                        a.events.add("balloonopen", (function () {
                            e.$component.trigger("balloonOpen", n, t)
                        })), o.geoObjects.add(a), t._mark = a
                    }))
                }
            }, t.dispatchEvents = function () {
                var e = this.data,
                    o = this.map;
                o && (this.$component.on("selectMark", (function (t, n) {
                    if (e.places.length && e.places[n]) {
                        var a = e.places[n];
                        o.setCenter(a.coords, e.zoom, {duration: 350, checkZoomRange: !0}).then((function () {
                            o.setCenter(a.coords)
                        })), a._mark && a._mark.balloon.open()
                    }
                })), this.$component.on("resizeMap", (function () {
                    o.container.fitToViewport()
                })))
            }, t.fixBehavior = function () {
                var e, o = this.map;
                o && (o.behaviors.disable("scrollZoom"), this.$component.off("mouseenter.preventzoom").on("mouseenter.preventzoom", (function () {
                    e = setTimeout((function () {
                        o.behaviors.enable("scrollZoom")
                    }), 500)
                })), this.$component.off("mouseleave.preventzoom").on("mouseleave.preventzoom", (function () {
                    e && (clearTimeout(e), o.behaviors.disable("scrollZoom"))
                })), flexbe_cli.run.is_mobile && o.behaviors.disable("drag"))
            }, o
        }(e),
        t = function (e) {
            function o() {
                for (var o, t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                o = e.call.apply(e, [this].concat(n)) || this;
                var s = flexbe_cli.vars._group.googleMapsKey,
                    r = flexbe_cli.components.classes.map.getLocaleCode({provider: "google"}) || "ru";
                return o.require = ["../https@maps.googleapis.com/maps/api/js@key=" + s + "&language=" + r], o
            }

            _inheritsLoose(o, e);
            var t = o.prototype;
            return t.createMap = function () {
                "undefined" != typeof google && (this.createVendor(), this.styleMap(), this.setPlaces(), this.dispatchEvents(), this.fixBehavior(), this.$component.trigger("mapInit"), this.$component.removeClass("loading"))
            }, t.createVendor = function () {
                var e = this.data;
                this.map = new google.maps.Map(this.$component.find(".map")[0], {
                    center: {
                        lat: e.center[0],
                        lng: e.center[1]
                    },
                    zoom: e.zoom,
                    disableDefaultUI: !0,
                    panControl: !0,
                    zoomControl: !0,
                    fullscreenControl: !0,
                    mapTypeControl: !1,
                    streetViewControl: !1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: !1
                })
            }, t.dispatchEvents = function () {
                var e = this,
                    o = this.$component,
                    t = this.map;
                t && (o.on("selectMark", (function (o, t) {
                    e.selectMark(t, !0)
                })), o.on("resizeMap", (function () {
                    google.maps.event.trigger(t, "resize")
                })))
            }, t.setPlaces = function () {
                var e = this,
                    o = this.data,
                    t = this.map;
                t && o.places.forEach((function (o, n) {
                    var a = '<svg width="32" height="48" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.36 0 0 5.36 0 12c0 8 12 20 12 20s12-12 12-20c0-6.64-5.36-12-12-12zm0 8a4 4 0 0 1 4 4c0 2.22-1.78 4-4 4a4 4 0 0 1-4-4c0-2.2 1.8-4 4-4z" fill="' + (o.color || "#222") + '" fill-rule="evenodd"/></svg>',
                        s = new google.maps.Marker({
                            position: {lat: o.coords[0], lng: o.coords[1]},
                            map: t,
                            visible: !0,
                            animation: google.maps.Animation.DROP,
                            icon: {url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(a)}
                        });
                    o._mark = s, s.addListener("click", (function () {
                        e.selectMark(n)
                    }))
                }))
            }, t.styleMap = function () {
                var e = this.data,
                    o = this.map;
                if (o)
                    if ("default" !== e.style && e.style) {
                        var t = "_s/lib/google/maps/styles/" + e.style + ".json";
                        $.getJSON(t, (function (e) {
                            e && Array.isArray(e) && o.setOptions({styles: e})
                        }))
                    } else o.setOptions({styles: []})
            }, t.selectMark = function (e, o) {
                void 0 === o && (o = !1);
                var t = this.data,
                    n = this.map,
                    a = t.places;
                if (n && a && a.length && a[e]) {
                    a.forEach((function (e) {
                        return e._info && e._info.close()
                    }));
                    var s = a[e],
                        r = "";
                    s.name && (r += '<div style="margin-bottom: 3px;"><strong>' + s.name + "</strong></div>"), s.address && (r += "<div>" + s.address + "</div>"), s._info = new google.maps.InfoWindow({content: r}), s._info.open(n, s._mark), o && n.panTo({
                        lat: s.coords[0],
                        lng: s.coords[1]
                    }), this.$component.trigger("balloonOpen", e, s)
                }
            }, t.fixBehavior = function () {
                var e, o = this.$component,
                    t = this.map;
                t && (o.off("mouseenter.preventzoom").on("mouseenter.preventzoom", (function () {
                    e = setTimeout((function () {
                        t.setOptions({scrollwheel: !0})
                    }), 500)
                })), o.off("mouseleave.preventzoom").on("mouseleave.preventzoom", (function () {
                    e && (clearTimeout(e), t.setOptions({scrollwheel: !1}))
                })))
            }, o
        }(e);
    flexbe_cli.components.classes.map = function (e) {
        return new ("google" === (e.args[0] || "yandex") ? t : o)(e)
    }, flexbe_cli.components.classes.map.getLocaleCode = function (e) {
        var o = e.lang,
            t = e.provider,
            n = o || flexbe_cli.locale.language,
            a = {
                yandex: {ru: "ru_RU", by: "ru_RU", ge: "ru_RU", kz: "ru_RU", ua: "uk_UA", default: "en_US"},
                google: {
                    ru: "ru",
                    by: "be",
                    ge: "ru",
                    kz: "kk",
                    ua: "uk",
                    fr: "fr",
                    pl: "pl",
                    de: "de",
                    es: "es",
                    it: "it",
                    default: "en"
                }
            };
        return !!a[t] && (a[t][n] || a[t].default)
    }
}();
"use strict";

function ownKeys(e, t) {
    var u = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        t && (i = i.filter((function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), u.push.apply(u, i)
    }
    return u
}

function _objectSpread(e) {
    for (var t = 1; t < arguments.length; t++) {
        var u = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(u), !0).forEach((function (t) {
            _defineProperty(e, t, u[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(u)) : ownKeys(Object(u)).forEach((function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(u, t))
        }))
    }
    return e
}

function _defineProperty(e, t, u) {
    return t in e ? Object.defineProperty(e, t, {
        value: u,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = u, e
}

function _extends() {
    return (_extends = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var u = arguments[t];
            for (var i in u) Object.prototype.hasOwnProperty.call(u, i) && (e[i] = u[i])
        }
        return e
    }).apply(this, arguments)
}

function _inheritsLoose(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
}

!function () {
    var e = {
            phone: {
                RU: ["+7 (***) ***-**-**", "8 (***) ***-**-**"],
                KZ: ["+7 (***) ***-**-**", "8 (***) ***-**-**"],
                UA: ["+38 (***) ***-****"],
                BY: ["+375 ** *******"],
                US: ["+1 (***) ***-****"]
            }
        },
        t = function (t) {
            function u() {
                for (var e, u = arguments.length, i = new Array(u), a = 0; a < u; a++) i[a] = arguments[a];
                return (e = t.call.apply(t, [this].concat(i)) || this).is = "form", e.ownerId = e.owner.getAttribute("data-id"), e.eventId = "." + e.ownerId, e.$form = e.$component.find("form"), e.$fields = e.$form.find(".form-fields"), e.action = e.$form.find('input[name="action"]').val(), e.$form.find('input[name="p_id"]').val(flexbe_cli.p_id), e
            }

            _inheritsLoose(u, t), u.getDefaultMask = function (t) {
                var u = String(t).toLowerCase(),
                    i = flexbe_cli.locale.country,
                    a = e[u] && e[u][i];
                return a && "string" == typeof a && (a = [a]), _extends([], a)
            }, u.initMask = function (e) {
                if ("undefined" == typeof IMask) return !1;
                var t = {
                        signed: !0,
                        lazy: !0,
                        padFractionalZeros: !0,
                        definitions: "tel" === e.getAttribute("type") ? {"*": /\d/, "#": /\d/} : {
                            "#": /\d/,
                            "@": /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
                            "*": /./
                        }
                    },
                    u = e.getAttribute("data-required"),
                    i = e.getAttribute("data-mask");
                i = i && !/[ ()*{}#@]/.test(i) ? this.getDefaultMask(i) : [i];
                try {
                    if (0 === (i = (i = i.filter((function (e) {
                        return /[ ()*_{}#@]/.test(e)
                    }))).map((function (e) {
                        return e.replace(/0/g, "\\0")
                    }))).length) throw {message: "Mask is empty"};
                    i = 1 === i.length ? String(i[0]) : i.map((function (e) {
                        return _extends({}, t, {mask: e})
                    }));
                    var a = new IMask(e, _extends({}, t, {
                            mask: i, dispatch: function (e, t) {
                                var u = t.compiledMasks;
                                if (1 === u.length) return u[0];
                                var i = (t.value + e).replace(/\W/g, "");
                                return u.find((function (e) {
                                    var t = e.mask.replace(/\W/g, "")[0];
                                    return i[0] === t
                                })) || u[0]
                            }
                        })),
                        n = function () {
                            a.masked.isComplete || !u && !a.value ? e.setAttribute("data-mask-complete", !0) : e.removeAttribute("data-mask-complete"), e.setAttribute("value", a.value)
                        };
                    e.value && n(), a.on("accept", n), e._mask = a
                } catch (t) {
                    return t instanceof Error && console.warn("MASK ERROR:", {
                        masks: i,
                        errorMessage: t.message
                    }), e.removeAttribute("data-mask"), !1
                }
            }, u.initCalendar = function (e) {
                var t = $(e),
                    u = t.closest("[data-type]").attr("data-type"),
                    i = t.attr("data-date-range") || "any",
                    a = t.attr("data-date-work-days") || "0,1,2,3,4,5,6",
                    n = (new Date).getFullYear() + 3;
                "datetime" === u && (n = (new Date).getMonth() >= 8 ? (new Date).getFullYear() + 1 : (new Date).getFullYear());
                var r = new Date((new Date).getFullYear() - 100, 0, 1),
                    s = new Date(n, 11, 31);
                "datetime" !== u && "future" !== i || (r = new Date), "date" === u && "past" === i && (s = new Date);
                var o = {
                    type: u,
                    lowerLimit: r,
                    upperLimit: s,
                    dateRange: i,
                    locale: flexbe_cli.locale.translation.calendar,
                    dateFormat: flexbe_cli.locale.date_format,
                    showDateSelector: "date" === u && "future" !== i
                };
                if (a && (o.workDays = a.split(",")), "datetime" === u) {
                    var l = t.attr("data-date-time-interval") || 30,
                        d = t.attr("data-date-time-start") || "00:00",
                        c = t.attr("data-date-time-finish") || "00:00";
                    o.workTime = {
                        interval: l,
                        start: {hour: +d.substring(0, 2), minute: +d.substring(3, 5)},
                        finish: {hour: +c.substring(0, 2), minute: +c.substring(3, 5)}
                    }
                }
                t.calendar(o)
            };
            var i = u.prototype;
            return i.onInit = function () {
                this.$masked = this.$form.find("[data-mask]"), this.$calendars = this.$form.find(".form-field-date__input"), this.$delivery = this.$fields.find('[data-type="delivery"]'), this.$masked.length && (this.hasMaskedField = !0, this.require = ["/_s/lib/imask/imask.min.js?v1"]), this.$calendars.length && (this.hasCalendarField = !0, this.require.push("/_s/lib/scroll-lock/scroll-lock.min.js"), this.require.push("/_s/lib/calendar/dist/js/calendar.js?v2.1", "/_s/lib/calendar/dist/css/calendar.min.css?v2.1")), this.$delivery.length && (this.hasDelivery = !0)
            }, i.onLoad = function () {
                (this.core.wasScreen || this.core.wasBeside) && (this.hasMaskedField && this.inputMask(), this.hasCalendarField && this.inputDate())
            }, i.onScreen = function (e) {
                if (!e.state) return !1;
                this.formInit()
            }, i.onBeside = function (e) {
                if (!e.state) return !1;
                this.formInit()
            }, i.onOpen = function (e) {
                void 0 === e && (e = {});
                var t = this.component.getBoundingClientRect().top;
                !flexbe_cli.run.is_screen_all_mobile && !flexbe_cli.is_admin && flexbe_cli.resize.height > t + 100 && this.$component.find(".form-field").eq(0).find("input, textarea").eq(0).focus(), e.data && this.setData(e.data)
            }, i.onResize = function () {
                this.$component.find(".range-outer").trigger("resize")
            }, i.formInit = function () {
                if (this.formInited) return !1;
                this.formInited = !0, this.unbindEvents(), this.bindEvents(), this.customize()
            }, i.customize = function () {
                this.fileInput(), this.customSelect(), this.textResize(), this.inputRange(), this.hasDelivery && this.deliveryField(), this.hasMaskedField && this.isLoaded && this.inputMask(), this.hasCalendarField && this.isLoaded && this.inputDate(), this.$component.find(".form-field-range").trigger("resize")
            }, i.unbindEvents = function () {
                this.$component.off(this.eventId), this.$form.off(this.eventId)
            }, i.bindEvents = function () {
                var e = this,
                    t = this.$fields.find(".form-field-text__input, .form-field-text__textarea, .form-field-checkbox__input");
                t.on("keydown" + this.eventId, (function (e) {
                    var t = e.currentTarget,
                        u = t.getAttribute("data-check"),
                        i = e.key || "",
                        a = e.ctrlKey || e.metaKey;
                    return !("phone" === u && !t._mask && !a && 1 === i.length && /[^\d ()+-]/.test(i)) && (("email" !== u || !/[\s,]/.test(i)) && void 0)
                })), t.on("input" + this.eventId + " change" + this.eventId, (function (e) {
                    var t = e.currentTarget,
                        u = $(t);
                    u.attr("value", t.value), u.closest(".form-field").removeClass("is_error")
                })), this.$form.on("click" + this.eventId, ".form-field-submit", (function () {
                    e.$form.submit(), e.$form.find(".is_error").addClass("animate"), setTimeout((function () {
                        e.$form.find(".is_error").removeClass("animate")
                    }), 500)
                })), this.$form.on("submit" + this.eventId, (function (t) {
                    if (e.busy || !e.validateForm()) return t.stopPropagation(), t.stopImmediatePropagation(), !1;
                    if (e.busy = !0, flexbe_cli.stat.u_id && e.addFields([{
                        name: "f_uid",
                        type: "hidden",
                        value: flexbe_cli.stat.u_id
                    }], !1), "function" == typeof e.beforeSend && !1 === e.beforeSend()) return e.busy = !1, !1;
                    if (e.addFields([{
                        name: "jsform",
                        type: "hidden",
                        value: parseInt(448312, 10)
                    }], !1), "undefined" != typeof FormData) e.sendFormdata();
                    else {
                        if (!(e.$form.find('input[type="file"]').length < 1)) return !0;
                        e.sendAjax()
                    }
                    return t.preventDefault(), !1
                }))
            }, i.setData = function (e) {
                if (!e) return !1;
                e && e.fields && this.addFields(e.fields), e && e.items && this.addItems(e.items)
            }, i.defineBeforeSend = function (e) {
                "function" == typeof e && (this.beforeSend = e)
            }, i.defineAfterSent = function (e) {
                "function" == typeof e && (this.afterSent = e)
            }, i.addFields = function (e, t) {
                void 0 === t && (t = !0);
                var u = this.$form.find(".form-fields-advanced");
                e.length && u[0] && (t && u.empty(), e.forEach((function (e) {
                    u.find('input[name="' + e.name + '"]').remove();
                    var t = $("<input>").attr("type", e.type).attr("name", e.name).attr("value", e.value);
                    u.append(t)
                })))
            }, i.addItems = function (e) {
                if (void 0 === e && (e = []), e && e.length) {
                    var t = 0,
                        u = 0,
                        i = "",
                        a = [];
                    e = e.map((function (e) {
                        return "object" != typeof e ? {} : (e.count = parseInt(e.count, 10) || 1, e.price = parseFloat(e.price) || 0, e.title = "string" == typeof e.title && e.title.trim() || e.title || "", t += e.price * e.count || 0, u += e.count, e)
                    }));
                    try {
                        i = JSON.stringify(e)
                    } catch (e) {
                    }
                    var n = {"product[items]": i, "product[price]": t, "product[total]": u};
                    t && (n = _objectSpread(_objectSpread({}, n), {}, {
                        "pay[price]": t,
                        "pay[desc]": ""
                    })), Object.entries(n).forEach((function (e) {
                        var t = e[0],
                            u = e[1];
                        a.push({type: "hidden", name: t, value: u})
                    })), this.lastItems = e || [], this.addFields(a)
                }
            }, i.sendFormdata = function () {
                var e = this,
                    t = new FormData(this.$form.get(0));
                if (t.append("is_ajax", "true"), "undefined" != typeof flexbeAPI && void 0 !== flexbeAPI.customLeadData && t.append("customLeadData", JSON.stringify(flexbeAPI.customLeadData)), flexbe_cli.run.is_OSX && "function" == typeof t.entries) {
                    var u = t.entries(),
                        i = Array.isArray(u),
                        a = 0;
                    for (u = i ? u : u[Symbol.iterator](); ;) {
                        var n;
                        if (i) {
                            if (a >= u.length) break;
                            n = u[a++]
                        } else {
                            if ((a = u.next()).done) break;
                            n = a.value
                        }
                        var r = n,
                            s = r[0],
                            o = r[1];
                        "object" == typeof o && o instanceof File && 0 === o.size && t.delete(s)
                    }
                }
                t.append("f_ab", JSON.stringify(flexbe_cli.stat.AB.getCookie())), this.$component.addClass("submitting");
                var l = $.ajax({
                    url: this.$form.attr("action"),
                    type: "POST",
                    dataType: "json",
                    processData: !1,
                    contentType: !1,
                    data: t,
                    xhr: function () {
                        return $.ajaxSettings.xhr()
                    }
                });
                l.done((function (t) {
                    e.$component.addClass("success submit-ok"), e.$component.removeClass("submitting"), t.send_formdata = !0, void 0 !== t.pay && (e.pay = t.pay), e.showDone(), setTimeout((function () {
                        e.$component.removeClass("success submit-ok")
                    }), 1e3)
                })), l.fail((function (t) {
                    console.error("sendFormdata error: ", t), e.busy = !1, e.$component.removeClass("submitting")
                }))
            }, i.sendAjax = function () {
                var e = this,
                    t = this.$form.serialize();
                $.ajax({
                    url: this.$form.attr("action"),
                    type: "POST",
                    dataType: "json",
                    data: t + "&is_ajax=true"
                }).done((function (t) {
                    e.$form.get(0).reset(), t.send_ajax = !0, void 0 !== t.pay && (e.pay = t.pay), e.showDone()
                })).fail((function (t) {
                    console.error("sendAjax: Ошибка при отправке формы", t), e.busy = !1, e.$component.removeClass("submitting")
                }))
            }, i.resetForm = function () {
                this.$form.find(".file-input-outer").removeClass("active");
                var e = this.$fields.find("input, textarea, select"),
                    t = e.not("select").not('[type="hidden"]').not(".form-field-range__input"),
                    u = e.filter("select"),
                    i = e.filter(".form-field-range__input");
                u.each((function (e, t) {
                    var u = t.querySelector("option"),
                        i = u && u.value || "";
                    t.value !== i && (t.value = i, t.dispatchEvent(new Event("change", {bubbles: !0, cancelable: !0})))
                })), i.each((function (e, t) {
                    t.value = t.getAttribute("data-value"), t.dispatchEvent(new Event("change", {
                        bubbles: !0,
                        cancelable: !0
                    }))
                })), t.each((function (e, t) {
                    var u = t.defaultChecked;
                    if (["radio", "checkbox"].includes(t.type)) u ? t.setAttribute("checked", !0) : t.removeAttribute("checked"), t.checked = u;
                    else {
                        t.removeAttribute("value"), t.value = "", t.removeAttribute("data-mask-complete");
                        var i = t._mask;
                        i && i.updateValue()
                    }
                    t.dispatchEvent(new Event("change", {bubbles: !0, cancelable: !0}))
                })), this.$form.get(0).reset()
            }, i.validateForm = function () {
                var e = this,
                    t = !0,
                    u = !0;
                return this.$form.find(".form-field[data-type]").each((function (i, a) {
                    var n = $(a),
                        r = n.find("input, textarea, select").not('[type="hidden"]')[0];
                    if (r) {
                        var s = "checkbox" === r.type ? r.checked : r.value,
                            o = e.checkField(r);
                        if (n.removeClass("is_error"), o) {
                            var l = n.attr("data-type"),
                                d = n.find(".error");
                            n.outerWidth(), n.addClass("is_error"), d.length && (d.attr("title", o), d.find(".error-text").text(o)), "checkbox" === l && n.find(".form-field-checkbox__box").attr("title", o), t = !1
                        }
                        u && s && (u = !1)
                    }
                })), this.$fields.removeClass("all-fields-empty"), this.$fields.removeClass("has-error"), this.$fields.outerWidth(), t || this.$fields.addClass("has-error"), u && (this.$fields.toggleClass("all-fields-empty", u), 4 === flexbe_cli.theme_id && (t = !1)), t
            }, i.showDone = function () {
                if (this.resetForm(), "function" == typeof this.afterSent && this.afterSent(), this.busy = !1, Array.isArray(this.lastItems) && this.lastItems.forEach((function (e) {
                    flexbe_cli.stat.ecommerce.add(e.id, e.title, e.count, e.price)
                })), flexbe_cli.stat.reachGoals({
                    mainGoal: flexbe_cli.stat.goals.order_done,
                    goal: this.$form.find('input[name="goal"]').val(),
                    htmlGoal: this.$form.find('textarea[name="goal_html"]').val()
                }), "pay" === this.action && void 0 !== this.pay && null !== this.pay) {
                    if (this.pay.pay_link.length > 0) {
                        var e = window.location.origin + window.location.pathname + (window.location.search ? window.location.search + "&" : "?") + "pay_id=" + this.pay.pay_id + "&h=" + this.pay.pay_hash;
                        try {
                            history.pushState(null, null, e), setTimeout((function () {
                                flexbe_cli.events.emit("pay", {action: "init"})
                            }), 200)
                        } catch (t) {
                            setTimeout((function () {
                                document.location = e
                            }), 500)
                        }
                    }
                } else if ("redirect" === this.action) {
                    var t = this.$form.find('input[name="action_redirect"]').val();
                    t && setTimeout((function () {
                        flexbe_cli.helpers.gotoLink(t)
                    }), 500)
                } else {
                    var u = this.$component.find("[data-modal-id]").attr("data-modal-id");
                    if (!flexbe_cli.modal.find(u)) {
                        var i = String(this.ownerId);
                        u = (i && i.split("_")[0]) + "_" + u
                    }
                    flexbe_cli.events.emit("ui_modal_open", {id: u})
                }
            }, i.fileInput = function () {
                this.$component.on("change" + this.eventId, ".file-input", (function (e) {
                    var t = $(e.currentTarget),
                        u = t.parents(".file-input-outer"),
                        i = t.val(),
                        a = e.currentTarget.files.length;
                    if (u.addClass("active"), t.parents(".form-field").removeClass("is_error"), 1 === a && u.find(".form-field-file--file-name").text(i), a > 1) {
                        var n, r = a % 100,
                            s = a % 10,
                            o = Math.floor(r / 10);
                        n = 1 === s && 11 !== r ? "form.filesMult" : s > 1 && s < 5 && 1 !== o ? "form.filesMult1" : "form.filesMult2", u.find(".form-field-file--file-name").text(a + " " + flexbe_cli.locale.tr(n))
                    }
                    0 === a && u.removeClass("active")
                })), this.$component.on("click" + this.eventId, ".clear-files", (function (e) {
                    var t = $(e.currentTarget).parents(".file-input-outer");
                    t.find(".file-input").val(""), t.removeClass("active")
                }))
            }, i.textResize = function () {
                this.$component.find(".autosize").each((function (e, t) {
                    var u = t.offsetHeight - t.clientHeight,
                        i = $(t),
                        a = getComputedStyle(t),
                        n = +i.attr("rows") || 0,
                        r = parseInt(a.paddingTop, 10) + parseInt(a.paddingBottom, 10),
                        s = parseInt(a.lineHeight, 10);
                    i.removeAttr("data-autoresize"), i.off("keyup input").on("keyup input", (function (e) {
                        var t = e.currentTarget;
                        t.style.height = t.scrollHeight + u + "px"
                    })), i.css("minHeight", r + s * n + "px")
                }))
            }, i.customSelect = function () {
                function e(e) {
                    return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }

                this.$component.find(".dropdown-container").remove(), this.$component.find("select.custom-select").each((function (t, u) {
                    var i = $(u),
                        a = i.closest('[data-type="select"]'),
                        n = "",
                        r = "";
                    i.children("option").each((function (t, u) {
                        var i = $(u),
                            a = i.attr("selected"),
                            s = e(i.val()),
                            o = e(i.text() || "—");
                        "selected" === a ? (n = o, r += '<li class="selected" data-value="' + s + '">' + o + "</li>") : r += '<li data-value="' + s + '">' + o + "</li>"
                    }));
                    var s = $('\n                    <div class="dropdown-container">\n                        <div class="dropdown-select">\n                            <span>' + n + '</span>\n                        </div>\n\n                        <ul class="dropdown-select-ul">' + r + "</ul>\n                    </div>\n                ");
                    i.after(s), s.off("click.selectdd").on("click.selectdd", ".dropdown-select", (function () {
                        var e = s.hasClass("active");
                        s.toggleClass("active", !e), a.toggleClass("active", !e), e || a.siblings('[data-type="select"]').removeClass("active").find(".dropdown-container").removeClass("active")
                    })), s.off("click.selectli").on("click.selectli", ".dropdown-select-ul li", (function (t) {
                        var u = $(t.currentTarget);
                        if (!u.hasClass("optgroup")) {
                            var a = u.closest("ul").siblings(".dropdown-select");
                            s.toggleClass("active"), s.closest('[data-type="select"]').toggleClass("active"), u.siblings("li").removeClass("selected"), u.addClass("selected"), i.val(u.attr("data-value")), a.children("span").html(e(u.text()))
                        }
                    }))
                }))
            }, i.deliveryField = function () {
                if (this.hasDelivery) {
                    var e = this.$delivery,
                        t = flexbe_cli.widget.cart,
                        u = flexbe_cli.widget.cart.delivery,
                        i = e.find(".form-field-delivery-item"),
                        a = e.find(".form-field-delivery-fields"),
                        n = function () {
                            var e = u.activeMethod;
                            if (e) {
                                var t = i.filter('[data-delivery="' + e.id + '"]'),
                                    n = a.filter('[data-delivery="' + e.id + '"]');
                                i.removeClass("form-field-delivery-item--active"), t.addClass("form-field-delivery-item--active"), a.removeClass("form-field-delivery-fields--active"), n.addClass("form-field-delivery-fields--active"), a.find("input, textarea, select").prop("disabled", !0), n.find("input, textarea, select").prop("disabled", !1)
                            }
                        },
                        r = function () {
                            i.each((function (e, t) {
                                var i = t.getAttribute("data-delivery"),
                                    a = $(t).find(".item-price"),
                                    n = $(t).find(".delimiter"),
                                    r = $(t).find(".min-total"),
                                    s = u.getPrice(i),
                                    o = flexbe_cli.locale.tr("form.min_total_tip") + " " + s.minTotalFormatted;
                                s.isNotFree || s.untilFree && s.useNotFixTotal ? (a.text(""), n.text("")) : (a.text(s.currentFormatted), n.text("–")), r.text(flexbe_cli.locale.tr(o))
                            }))
                        };
                    n(), r(), e.on("change", ".form-field-delivery-item input", (function (e) {
                        if (e.currentTarget.checked) {
                            var t = e.currentTarget.closest("[data-delivery]").getAttribute("data-delivery");
                            u.dispatch("selectMethod", t)
                        }
                    })), u.on("dispatch", (function (e, t) {
                        "selectMethod" === t.name && n()
                    })), t.on("dispatch", (function () {
                        r()
                    }))
                }
            }, i.checkField = function (e) {
                if (e.disabled || e.hidden) return !1;
                var t = e.type,
                    u = "checkbox" === t ? e.checked : "file" === t ? e.files : e.value,
                    i = e.getAttribute("data-required") || !1,
                    a = e.getAttribute("data-check") || !1,
                    n = !(!i || u) && "form.required";
                if (e._mask && e.getAttribute("data-mask") || !1) !i && !u || e.getAttribute("data-mask-complete") || (n = "tel" === t && u ? "form.phone" : "text" === t && u ? "form.text" : "form.required");
                else if (a)
                    if ("date" === a || "datetime" === a) {
                        var r = $(e).data("calendar"),
                            s = r && r.input.checkError();
                        s && (n = s)
                    } else if (u.length && "email" === t) {
                        /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d-A-Za-zЁА-яё]+\.)+[A-Za-zЁА-яё]{2,}))$/.test(u) || (n = "form.email")
                    } else if (u.length && "tel" == t) {
                        if (/[^\d\s()+-]/.test(u)) n = "form.digits";
                        else u.replace(/\D/g, "").length < 5 && (n = "form.minlength")
                    } else "file" === t && (n = !(!i || u.length) && "form.required");
                return n = n && flexbe_cli.locale.tr(n) || !1
            }, i.inputRange = function () {
                this.$form.find(".form-field-range").each((function (e, t) {
                    return new flexbe_cli.components.classes.rangeInput($(t))
                }))
            }, i.inputMask = function () {
                var e = this;
                return "undefined" != typeof IMask && (this.hasMaskedField = !1, this.$masked.each((function (t, u) {
                    flexbe_cli.components.classes.form.initMask(u);
                    var i = !!u.getAttribute("data-placeholder"),
                        a = u._mask;
                    i && a && ($(u).on("focus" + e.eventId, (function () {
                        a.updateOptions({lazy: !1})
                    })), $(u).on("blur" + e.eventId, (function () {
                        if (!a.unmaskedValue) {
                            var e = a.mask.replace(/\*/g, "_"),
                                t = a.value;
                            a.updateOptions({lazy: !0}), a.masked.rawInputValue && e !== t || (a.unmaskedValue = "", a.value = "", a.updateValue())
                        }
                    })))
                })), !0)
            }, i.inputDate = function () {
                return this.hasCalendarField = !1, this.$calendars.each((function (e, t) {
                    flexbe_cli.components.classes.form.initCalendar(t)
                })), !0
            }, u
        }(BaseComponent);
    flexbe_cli.components.classes.form = t
}();
"use strict";

function _inheritsLoose(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
}

!function () {
    var e = function (e) {
        function t() {
            return e.apply(this, arguments) || this
        }

        _inheritsLoose(t, e);
        var n = t.prototype;
        return n.customSelect = function () {
            var e = this;
            this.$form.find(".dropdown-container").remove(), this.$form.find("select.atom-custom-select").each((function (t, n) {
                var o = $(n),
                    l = o.closest('[data-type="select"]'),
                    s = o.children("option").length,
                    c = e.$form.hasClass("style-underlined") ? "sharp" : "",
                    i = $('\n                    <div class="dropdown-container">\n                        <div tabindex="0" class="dropdown-select">\n                            <span class="selected"></span>\n                            \n                            <span class="arrow">\n                                <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">\n                                    <path fill="currentColor" d="M 1.4 6.99441e-15L 0 1.34043L 5 6L 10 1.34043L 8.6 0L 5 3.34998L 1.4 6.99441e-15Z"/>\n                                </svg>\n                            </span>\n                        </div>\n                    </div>\n                '),
                    r = $('\n                    <div class="atom-select size--medium">\n                        <div class="overlay"></div>\n                    </div>\n                '),
                    a = $('<ul class="dropdown-select-ul ' + c + '"></ul>'),
                    d = i.find(".dropdown-select .selected"),
                    f = !1,
                    u = !1,
                    p = !1;

                function v(e, t) {
                    e[0] && (e.siblings("li").removeClass("selected"), e.addClass("selected"), o.val(e.attr("data-value")), d.text(e.text()), t && h())
                }

                function m() {
                    var e = a.children(".option-e"),
                        t = e.height(),
                        n = a.height(),
                        o = t * (e.index($(".selected", a)) + 1);
                    if (n > t * s) return !1;
                    a.scrollTop() < o - n ? a.animate({scrollTop: o - n}, 100) : a.scrollTop() > o - t && a.animate({scrollTop: o - t}, 100)
                }

                function h() {
                    p = !1, r.removeClass("active"), l.removeClass("active"), clearTimeout(f), r.detach()
                }

                function g() {
                    var e = i.hasClass("active");
                    r.off("click.closeSelect").on("click.closeSelect", ".overlay", (function (e) {
                        h(), document.elementFromPoint(e.clientX, e.clientY).focus()
                    })), r.off("click.selectli").on("click.selectli", ".dropdown-select-ul li", (function (e) {
                        v($(e.currentTarget), !0)
                    })), r.off("mousewheel.selectUl").on("mousewheel.selectUl", ".dropdown-select-ul", (function (e) {
                        var t = e.currentTarget.scrollHeight,
                            n = e.currentTarget.clientHeight;
                        return !(e.currentTarget.scrollTop === t - n && event.deltaY > 0 || 0 === e.currentTarget.scrollTop && event.deltaY < 0)
                    })), $("body").append(r), p = !0, clearTimeout(f), a.css({
                        left: i.offset().left + "px",
                        top: i.offset().top + "px",
                        width: i.width() + "px"
                    }), r.toggleClass("active", !e), l.toggleClass("active", !e), e || l.siblings('[data-type="select"]').removeClass("active").find(".dropdown-container").removeClass("active"), m()
                }

                o.children("option").each((function (e, t) {
                    var n = $(t),
                        o = n.val(),
                        l = n.text() || "—",
                        s = n.attr("selected"),
                        c = $('<li class="option-e"><span class="option-inner"></span></li>');
                    "selected" === s && c.addClass("selected"), c.attr("data-value", o), c.find(".option-inner").text(l), a.append(c)
                })), d.text(o[0].value), r.append(a), o.after(i), flexbe_cli.run.is_screen_tablet || flexbe_cli.run.is_screen_small_pc || flexbe_cli.run.is_screen_pc || !flexbe_cli.responsive ? (i.off("click.selectdd").on("click.selectdd", ".dropdown-select", (function () {
                    g()
                })), i.off("focus.selectfocus").on("focus.selectfocus", ".dropdown-select", (function () {
                    u = !0
                })), i.off("blur.selectblur").on("blur.selectblur", ".dropdown-select", (function () {
                    u = !1, f = setTimeout((function () {
                        h()
                    }), 200)
                })), o.off("change.changeSelect").on("change.changeSelect", (function (e) {
                    var t = r.find(".dropdown-select-ul li"),
                        n = e.currentTarget.value;
                    t.removeClass("selected"), t.filter((function (e, t) {
                        return t.getAttribute("data-value") === n
                    })).addClass("selected"), d.text(n)
                })), i.off("keydown.selectkeydown").on("keydown.selectkeydown", ".dropdown-select", (function (e) {
                    if (u && 38 === e.keyCode || 40 === e.keyCode || 13 === e.keyCode || 27 === e.keyCode || 32 === e.keyCode) {
                        e.preventDefault();
                        var t = a.find(".option-e.selected");
                        40 === e.keyCode ? (v(t.next(), !1), m()) : 38 === e.keyCode ? (v(t.prev(), !1), m()) : 13 !== e.keyCode && 32 !== e.keyCode && 27 !== e.keyCode || (p ? h() : 27 !== e.keyCode && g())
                    }
                }))) : o.off("change.selectdd").on("change.selectdd", (function (e) {
                    var t = e.target.value;
                    d.text(t)
                }))
            }))
        }, n.fileInput = function () {
            this.$form.on("change" + this.eventId, ".file-input--original", (function (e) {
                var t = $(e.currentTarget),
                    n = t.parents(".file-input-outer"),
                    o = t.val(),
                    l = e.currentTarget.files.length;
                if (n.addClass("active"), t.parents(".form-field").removeClass("is_error"), 1 === l && n.find(".file-item--title").text(o), l > 1) {
                    var s, c = l % 100,
                        i = l % 10,
                        r = Math.floor(c / 10);
                    s = 1 === i && 11 !== c ? "form.filesMult" : i > 1 && i < 5 && 1 !== r ? "form.filesMult1" : "form.filesMult2", n.find(".file-item--title").text(l + " " + flexbe_cli.locale.tr(s))
                }
                0 === l && n.removeClass("active")
            })), this.$form.on("click" + this.eventId, ".clear-files", (function (e) {
                var t = $(e.currentTarget).parents(".file-input-outer");
                t.find(".file-input--original").val(""), t.removeClass("active")
            }))
        }, t
    }(flexbe_cli.components.classes.form);
    flexbe_cli.components.classes.form = e
}();
"use strict";

function ownKeys(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e && (n = n.filter((function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }))), i.push.apply(i, n)
    }
    return i
}

function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? ownKeys(Object(i), !0).forEach((function (e) {
            _defineProperty(t, e, i[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach((function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
        }))
    }
    return t
}

function _defineProperty(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t
}

function _inheritsLoose(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
}

!function () {
    var t = function (t) {
        function e() {
            for (var e, i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
            return (e = t.call.apply(t, [this].concat(n)) || this).is = "quiz", e.id = e.core.id, e.eventId = ".quiz" + e.id, e.createQuiz(), e
        }

        _inheritsLoose(e, t);
        var i = e.prototype;
        return i.onInit = function () {
            this.$masked = this.$form.find("[data-mask]"), this.require = [], this.$masked.length && (this.needInitMasks = !0, this.require.push("_s/lib/imask/imask.min.js@v1")), this.$calendars = this.$form.find(".form-field-date__input"), this.$calendars.length && (this.needInitCalendar = !0, this.require.push("_s/lib/scroll-lock/scroll-lock.min.js"), this.require.push("_s/lib/calendar/dist/js/calendar.js@v2.1", "_s/lib/calendar/dist/css/calendar.min.css@v2.1"))
        }, i.onLoad = function () {
            (this.core.wasScreen || this.core.wasBeside) && (this.needInitMasks && this.initFieldMask(), this.needInitCalendar && this.initFieldDate()), this.isLoaded = !0
        }, i.onScreen = function (t) {
            if (!t.state) return !1;
            this.initQuiz()
        }, i.onBeside = function (t) {
            if (!t.state) return !1;
            this.initQuiz()
        }, i.onOpen = function (t) {
            void 0 === t && (t = {}), this.initQuiz(), this.started || this.startQuiz(), t.data && this.setData(t.data)
        }, i.onResize = function () {
            this.$component.find(".range-outer").trigger("resize")
        }, i.createQuiz = function () {
            this.timeouts = [], this.history = [], this.swiper = [], this.$area = this.core.$area, this.$form = this.$component.find("form"), this.$steps = this.$component.find(".quiz-steps"), this.$actions = this.$component.find(".quiz-actions"), this.$progress = this.$component.find(".quiz-progress"), this.$stepsWrapper = this.$steps.find(".steps-wrapper"), this.$outerWrapper = this.$area.find('[data-quiz-part="wrapper"]'), this.$welcomeScreen = this.$outerWrapper.find('[data-quiz-part="welcome"]'), this.$progress.length || (this.$progress = this.$area.find('[data-quiz-part="progress"]')), this.rootModal = "modal" === this.core.is && this.core, this.hasWelcome = !!this.rootModal || this.$welcomeScreen.length > 0, this.autoNextEnabled = +this.$steps.attr("data-autonext") || 0, this.currentId = null, this.currentIndex = -1, this.total = parseInt(this.$component.attr("data-total-steps"), 10)
        }, i.initQuiz = function () {
            if (!this.inited) {
                this.inited = !0, this.resetForm(), this.bindEvents(), this.initFields(), this.initControls();
                var t = flexbe_cli.is_admin && this.$area.data("initialQuizStepId"),
                    e = flexbe_cli.is_admin && this.$area.data("initialQuizStepIndex");
                t ? this.toStep({id: t, index: e, animated: !1}) : this.hasWelcome || this.startQuiz({animated: !1})
            }
        }, i.bindEvents = function () {
            var t = this;
            flexbe_cli.events.off("quiz_command").on("quiz_command", (function (t, e) {
                var i;
                flexbe_cli.components.instances[e.id] && flexbe_cli.components.instances[e.id].forEach((function (t) {
                    "quiz" === t.is && (i = t)
                })), i && ("welcome" === e.command ? i.toWelcome() : "start" === e.command ? i.startQuiz() : "step" === e.command && i.toStep({
                    id: e.stepId,
                    index: e.stepIndex,
                    force: e.force,
                    animated: e.animated,
                    scroll: e.scroll
                }))
            })), this.$form.off(this.eventId), this.$form.on("input" + this.eventId + " change" + this.eventId, "input, textarea", (function (t) {
                var e = t.currentTarget,
                    i = e.value,
                    n = $(e);
                n.attr("value", i), n.closest(".field").removeClass("is_error")
            })), this.$form.on("keydown" + this.eventId, "input, textarea", (function (t) {
                var e = t.currentTarget,
                    i = e.getAttribute("data-check"),
                    n = t.key || "",
                    r = t.ctrlKey || t.metaKey;
                return !("phone" === i && !e._mask && !r && 1 === n.length && /[^\-+\d ()]/.test(n)) && (("email" !== i || !/[\s,]/.test(n)) && void 0)
            })), this.$form.on("submit" + this.eventId, (function () {
                return t.submitForm()
            }))
        }, i.initControls = function () {
            var t = this;
            $("body").off("keypress" + this.eventId).on("keypress" + this.eventId, (function (e) {
                var i = 9 === e.keyCode,
                    n = 13 === e.keyCode;
                if (n || i) {
                    var r = flexbe_cli.block.hasOverlay || [],
                        s = t.rootModal && "modal" === r[r.length - 1],
                        a = !t.rootModal && !r.length,
                        o = t.core.inFocus && (a || s),
                        l = e.metaKey || e.ctrlKey,
                        c = e.shiftKey;
                    if (o && ("TEXTAREA" !== e.target.tagName || !n || l)) {
                        if (c && i) t.toPrevStep();
                        else if (!c && !l) {
                            var d = t.$currentStep.find(":focus").closest(".field").next(".field");
                            t.focusField(d) || t.toNextStep()
                        }
                        return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !1
                    }
                }
            })), this.$component.off("click.control").on("click.control", "[data-quiz-action]", (function (e) {
                var i = e.currentTarget.getAttribute("data-quiz-action");
                "welcome" === i ? t.toWelcome() : "prev" === i ? t.toPrevStep() : "next" === i && t.toNextStep()
            }))
        }, i.setProgress = function () {
            var t = this.$progress.find(".progress-loader-bar .current"),
                e = this.total,
                i = t.data("unit"),
                n = this.realIndex + 1;
            flexbe_cli.is_admin && -1 === this.realIndex && "welcome" !== this.currentId && (n = (+this.$currentStep.prevAll('[data-linked="linked"]').first().attr("data-real-index") + 1 || 0) + 1);
            var r = parseInt(100 * n / e, 10) || 0;
            if (n = Math.max(0, Math.min(e, n)), r = Math.max(0, Math.min(100, r)), t.length && i) {
                var s = r + "%";
                "step" === i ? s = n + " / " + e : "none" === i && (s = ""), t.attr("data-value", s)
            }
            this.$progress.attr("data-current-progress", r), this.$progress.attr("data-current", n), this.$progress.attr("data-total", e), this.$progress.find(".progress-text .current").text(n), this.$progress.find(".progress-text .total").text(e), this.$progress.find(".progress-percent .current").text(r), this.$progress.find(".progress-loader-bar .current").css("width", r + "%"), this.$progress.find(".progress-loader-circle .current").attr("stroke-dashoffset", "" + Math.abs(100 - r))
        }, i.setActionButtons = function () {
            var t = this.hasWelcome || this.history.length > 1 || flexbe_cli.is_admin && 0 !== this.realIndex && this.currentIndex > 0;
            !flexbe_cli.is_admin || !this.rootModal || this.realIndex && this.currentIndex || (t = !1), this.$actions.toggleClass("show-prev", t)
        }, i.toWelcome = function (t) {
            var e = (void 0 === t ? {} : t).scroll,
                i = void 0 === e || e;
            if (!this.hasWelcome) return this.startQuiz({scroll: i}), !0;
            if (this.started = !1, this.currentIndex = -1, this.realIndex = -1, this.currentId = "welcome", this.$area.data("initialQuizStepId", this.currentId), this.$area.data("initialQuizStepIndex", this.currentIndex), this.$outerWrapper.attr("data-active-step", this.currentId), this.$outerWrapper.attr("data-active-index", this.currentIndex), this.$outerWrapper.toggleClass("quiz-state-welcome", !0), this.$outerWrapper.toggleClass("quiz-state-started", !1), this.rootModal) flexbe_cli.is_admin || flexbe_cli.events.emit("ui_modal_close", {id: this.rootModal.id});
            else if (this.$outerWrapper.length) {
                var n = this.$welcomeScreen.outerHeight() || 0;
                this.$outerWrapper.css("minHeight", n), flexbe_cli.run.is_ie && flexbe_cli.block.fixCoverHeight(this.$area)
            }
            return this.setProgress(), this.setActionButtons(), i && "block" === this.core.is && !flexbe_cli.is_admin && flexbe_cli.scroll.scrollTo(this.$area), flexbe_cli.events.emit("quiz_event", {
                event: "welcome",
                sender: "core",
                quiz: this
            }), !0
        }, i.startQuiz = function (t) {
            var e = void 0 === t ? {} : t,
                i = e.animated,
                n = e.scroll;
            this.sessionId = parseInt(Date.now() / 1e3, 10);
            var r = this.$stepsWrapper.find('.step[data-type="root"][data-linked="linked"]').first();
            r.length && this.toStep({$step: r, force: !0, animated: i, scroll: n})
        }, i.autoNextStep = function () {
            var t = this;
            this.autoNextEnabled && "1" === this.$currentStep.find(".quiz-fields").attr("data-count") && setTimeout((function () {
                t.toNextStep()
            }), 150)
        }, i.toPrevStep = function () {
            var t = this.history[this.history.length - 2];
            if (!t) {
                var e = this.$currentStep.prevAll('.step[data-type="root"][data-linked="linked"]').first();
                return e.length ? this.toStep({$step: e}) : this.hasWelcome && this.toWelcome(), !1
            }
            return this.toStep(t), !0
        }, i.toNextStep = function (t) {
            var e = this;
            if (!((void 0 === t ? {} : t).force || this.validateStep())) return !1;
            var i = this.$currentStep.attr("data-goto"),
                n = this.$currentStep.attr("data-goal"),
                r = this.$currentStep.attr("data-html-goal"),
                s = this.history.find((function (t) {
                    return t.id === e.currentId
                })) || {},
                a = this.$currentStep.find("[data-field-id]").map((function (t, e) {
                    var i = $(e),
                        n = i.attr("data-field-id"),
                        r = i.find("input, textarea").not('[type="hidden"]'),
                        s = i.find("[data-goto]"),
                        a = i.attr("data-type"),
                        o = i.find('[name="vars[' + n + ']"]').val(),
                        l = r.attr("type"),
                        c = s,
                        d = r.val();
                    ["checkbox", "radio", "image"].includes(a) ? c = s.filter(":checked") : "select" === a ? (c = c.filter((function (t, e) {
                        return e.selected
                    })), l = "select") : "file" === a && (d = Array.from(r[0].files));
                    var u = c.toArray(),
                        f = u.map((function (t) {
                            return t.getAttribute("data-goto")
                        })).filter((function (t) {
                            return t
                        }));
                    return {
                        id: n, title: o, type: a, inputType: l, value: d, variants: u.map((function (t) {
                            return {id: t.getAttribute("data-id"), value: t.value}
                        })).filter((function (t) {
                            return t.id
                        })), goto: f
                    }
                })).toArray(),
                o = a.map((function (t) {
                    var e = {id: t.id, title: t.title, type: t.type};
                    return ["radio", "checkbox", "select", "image"].includes(t.inputType) ? e.variants = t.variants : e.value = t.value, e
                })),
                l = a.reduce((function (t, e) {
                    return t.concat(e.goto)
                }), []),
                c = this.getNextStep({gotoId: l[0] || i || "next"});
            s && (s.fields = a, s.answers = o, s.toId = c, s.goal = n, s.htmlGoal = r), this.toStep({
                id: c,
                historyItem: s
            })
        }, i.getNextStep = function (t) {
            var e = void 0 === t ? {} : t,
                i = e.gotoId,
                n = e.$current,
                r = void 0 === n ? this.$currentStep : n;
            if ("result" === i) return i;
            var s = i,
                a = r.nextAll('.step[data-type="root"][data-linked="linked"]').first();
            return "next" !== s && this.$stepsWrapper.find('.step[data-id="' + s + '"]').length || (s = a.attr("data-id")) ? this.checkStepCondition({id: s}) ? s : this.getNextStep({
                gotoId: "next",
                $current: a
            }) : "result"
        }, i.toStep = function (t) {
            var e = this,
                i = t.id,
                n = t.index,
                r = t.$step,
                s = t.force,
                a = t.scroll,
                o = void 0 === a || a,
                l = t.animated,
                c = void 0 === l || l,
                d = t.historyItem;
            if (this.inStepAnimation) return !1;
            if (null == d && (d = this.history.find((function (t) {
                return t.id === e.currentId
            }))), "result" !== i) {
                if (r && r.length || null == i || (r = this.$stepsWrapper.find('.step[data-id="' + i + '"]')), r && r.length || null == n || (r = this.$stepsWrapper.find('.step[data-index="' + n + '"]')), !r || !r.length) return !1;
                if (i = null != i ? i : r.attr("data-id"), n = parseInt(null != n ? n : r.attr("data-index"), 10), i === this.currentId) return this.enableStep(r), !1;
                var u = flexbe_cli.is_admin ? parseInt(r.attr("data-real-index"), 10) : n,
                    f = n > this.currentIndex;
                c || this.$area.addClass("noanimate");
                var h = r.outerHeight(),
                    p = {
                        $step: r,
                        id: i,
                        title: r.find(".step-title").text().trim(),
                        index: n,
                        realIndex: u,
                        fields: [],
                        answers: []
                    },
                    m = [];
                s ? (m = this.history, this.history = []) : (m = this.history.filter((function (t) {
                    return t.index >= p.index
                })), this.history = this.history.filter((function (t) {
                    return !m.includes(t)
                }))), m.forEach((function (t) {
                    e.disableStep(t.$step)
                })), this.enableStep(r), this.started = !0, this.history.push(p), this.$component.addClass("quiz-started"), c && this.$component.addClass("step-change-animation");
                var v = window.scrollParent(this.$component[0]) || document.scrollingElement,
                    g = v && v.scrollTop || 0,
                    y = this.$stepsWrapper.outerHeight();
                if (this.$area.data("initialQuizStepId", i), this.$area.data("initialQuizStepIndex", n), this.$outerWrapper.attr("data-active-step", i), this.$outerWrapper.attr("data-active-index", n), this.$outerWrapper.toggleClass("quiz-state-welcome", !1), this.$outerWrapper.toggleClass("quiz-state-started", !0), r.toggleClass("higher", h > y), c && this.$stepsWrapper.css("height", y + "px"), this.$outerWrapper.css("minHeight", y + "px"), r.prevAll().removeClass("active next").addClass("prev"), r.nextAll().removeClass("active prev").addClass("next"), r.removeClass("next prev").addClass("active"), this.currentId = i, this.currentIndex = n, this.realIndex = u, this.$currentStep = r, this.setProgress(), this.setActionButtons(), flexbe_cli.run.is_ie && this.$area.find(".cover").css("height", "auto"), 2 === flexbe_cli.theme_id) this.$area.find(".b_head").length && flexbe_cli.block.headers.setHeaders();
                return this.timeouts = this.timeouts.filter((function (t) {
                    return clearTimeout(t)
                })), this.timeouts.push(setTimeout((function () {
                    c || e.$area.removeClass("noanimate")
                }), 20)), c ? (this.inStepAnimation = !0, this.timeouts.push(setTimeout((function () {
                    e.$stepsWrapper.css("height", ""), e.$component.removeClass("step-change-animation"), e.$component.find(".range-outer").trigger("resize"), e.inStepAnimation = !1
                }), 250)), o && (this.timeouts.push(setTimeout((function () {
                    var t = e.$area.get(0).getBoundingClientRect();
                    e.$stepsWrapper.css("height", h + "px");
                    var i = v.scrollTop,
                        n = e.$area.get(0).getBoundingClientRect().bottom - t.bottom - (g - i);
                    n && v.scrollTo(0, i + n)
                }), 150)), flexbe_cli.is_admin || this.timeouts.push(setTimeout((function () {
                    var t = e.$component;
                    e.$area.outerHeight() <= flexbe_cli.resize.height && (t = e.$area), flexbe_cli.scroll.scrollTo(t, {
                        centered: !0,
                        force: !1,
                        complete: function () {
                            flexbe_cli.is_admin || flexbe_cli.run.is_mobile || e.focusField(r)
                        }
                    })
                }), 450)))) : this.$component.find(".range-outer").trigger("resize"), d = d || {}, this.lastHistoryItem = d, flexbe_cli.events.emit("quiz_event", {
                    event: "step",
                    sender: "core",
                    quiz: this,
                    payload: {
                        fromId: d.id,
                        fromTitle: d.title,
                        fromAnswers: d.answers,
                        toNext: f,
                        toId: i,
                        sessionId: this.sessionId
                    },
                    answerGoals: {goal: d.goal, htmlGoal: d.htmlGoal}
                }), !0
            }
            this.toSubmit({historyItem: d})
        }, i.toSubmit = function (t) {
            var e = void 0 === t ? {} : t,
                i = e.force,
                n = e.historyItem,
                r = i || this.validateStep();
            return !(this.busy || !r) && (null == n && (n = this.history[this.history.length - 1]), this.result = this.getResult(), this.lastHistoryItem = n, this.$form.submit(), !0)
        }, i.validateStep = function () {
            var t = this,
                e = !0;
            return this.$currentStep && this.$currentStep.length && this.$currentStep.find(".field[data-type]").each((function (i, n) {
                var r = $(n);
                r.removeClass("is_error");
                var s = t.checkField(r);
                s && (r.outerWidth(), r.addClass("is_error"), r.find(".error").text(s), e && t.focusField(r, 500), e = !1)
            })), e
        }, i.getResult = function () {
            var t = this,
                e = this.$form.find("input[name=results]").data("value") || [],
                i = e.filter((function (t) {
                    return null != t.id && "default" !== t.id
                })).find((function (e) {
                    return t.checkResultCondition(e)
                }));
            return i || (i = e.find((function (t) {
                return null == t.id || "default" === t.id
            })) || e[0]), "object" != typeof i.action && (i.action = {
                pay: i.pay,
                name: i.action,
                modal_id: i.modal_id,
                action_redirect: i.action_redirect
            }), i
        }, i.checkStepCondition = function () {
            return !0
        }, i.checkResultCondition = function (t) {
            var e = t.conditions || {},
                i = e.union,
                n = e.list || [],
                r = this.history.reduce((function (t, e) {
                    return t.concat(e.fields)
                }), []),
                s = n.map((function (t) {
                    var e = r.find((function (e) {
                        return e.id == t.field
                    }));
                    return {condition: t, field: e}
                }));
            return !!s.length && (s = s["and" === i ? "every" : "some"]((function (t) {
                var e = t.condition,
                    i = t.field,
                    n = !0;
                if (!i) return !1;
                if ("vars" === e.type) {
                    var r = i.variants || [],
                        s = (e.variants || []).map((function (t) {
                            return "" + t
                        }));
                    if (!r.length) return !!e.emptyVariant;
                    if (e.unionExtra || (n = r.every((function (t) {
                        return s.includes("" + t.id)
                    }))), n) {
                        var o = e.union;
                        "radio" !== i.inputType && "select" !== i.inputType || (o = "or"), n = s["and" === o ? "every" : "some"]((function (t) {
                            return r.find((function (e) {
                                return e.id == t
                            }))
                        }))
                    }
                } else if ("range" === e.type) {
                    var l = ("" + i.value).replace(/\s+/g, "").split(/\s[—-]\s/).map((function (t) {
                            return +t
                        })).filter((function (t) {
                            return "number" == typeof t && !isNaN(t)
                        })),
                        c = Math.min.apply(null, l),
                        d = Math.max.apply(null, l),
                        u = c !== d,
                        f = +e.rangeLimitFrom,
                        h = +e.rangeLimitTo;
                    if ("equal" === e.operator) return u ? c <= f && f <= d : f === c;
                    a(f) && a(h) && (f = Math.min(e.rangeLimitFrom, e.rangeLimitTo), h = Math.max(e.rangeLimitTo, e.rangeLimitFrom)), n && a(f) && (n = f <= c), n && a(h) && (n = d <= h)
                } else if ("text" === e.type) {
                    var p = e.fill,
                        m = (i.value || "").trim().replace(/ +/g, " "),
                        v = e.answers.map((function (t) {
                            return ("" + t).toLowerCase()
                        })).filter((function (t) {
                            return t
                        }));
                    if ("fill" === p) return !!m;
                    if ("empty" === p) return !m;
                    if ("include" === p) return v.some((function (t) {
                        return new RegExp("^" + t + "|\\s" + t, "i").test(m)
                    }));
                    if ("exclude" === p) return v.every((function (t) {
                        return !new RegExp("^" + t + "|\\s" + t, "i").test(m)
                    }))
                } else if ("file" === e.type) {
                    var g = e.fill,
                        y = i.value;
                    if ("fill" === g) return !!y.length;
                    if ("empty" === g) return !y.length
                }
                return n
            })));

            function a(t) {
                return !isNaN(+t) && null != t && "" != t
            }
        }, i.checkField = function (t) {
            var e = t.find("input, textarea, select").not('[type="hidden"]'),
                i = e[0],
                n = t[0];
            if (i) {
                var r, s = n.getAttribute("data-type"),
                    a = [!0, 1, "true", "1"].includes(n.getAttribute("data-is-required")),
                    o = i.getAttribute("data-check") || !1,
                    l = i._mask && i.getAttribute("data-mask") || !1;
                r = ["checkbox", "radio", "image"].includes(s) ? !!e.closest(":checked").length : "file" === s ? i.files : i.value;
                var c = !(!a || r) && "form.required";
                if (l) !a && !r || i.getAttribute("data-mask-complete") || (c = "phone" === s && r ? "form.phone" : "text" === s && r ? "form.text" : "form.required");
                else if (o)
                    if (r.length && "email" === s) {
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яёА-ЯЁ\-0-9]+\.)+[a-zA-Zа-яёА-ЯЁ]{2,}))$/.test(r) || (c = "form.email")
                    } else if (r.length && "phone" == s) {
                        if (/[^0-9+\(\)\-\s]/.test(r)) c = "form.digits";
                        else r.replace(/[^0-9]/g, "").length < 5 && (c = "form.minlength")
                    } else if ("file" === s) c = !(!a || r.length) && "form.required";
                    else if ("date" === s || "datetime" === s) {
                        var d = $(i).data("calendar"),
                            u = d && d.input.checkError();
                        u && (c = u)
                    }
                return c = c && flexbe_cli.locale.tr(c) || !1
            }
        }, i.disableStep = function (t) {
            t.find("input, textarea, select").prop("disabled", !0)
        }, i.enableStep = function (t) {
            t.find("input, textarea, select").prop("disabled", !1)
        }, i.focusField = function (t, e) {
            if (void 0 === e && (e = 200), !t || !t.length) return !1;
            if (flexbe_cli.run.is_ios) return !1;
            var i = t.find(".form-field-text__input, .dropdown-select").not(".form-field-date__input").first();
            return !!i.length && (e ? setTimeout((function () {
                return i.focus()
            }), e) : i.focus(), !0)
        }, i.initFields = function () {
            this.initFieldImage(), this.initFieldCheckbox(), this.initFieldRadio(), this.initFieldSelect(), this.initFieldTextarea(), this.initFieldFile(), this.initFieldRange(), this.isLoaded && (this.needInitMasks && this.initFieldMask(), this.needInitCalendar && this.initFieldDate())
        }, i.initFieldImage = function () {
            var t = this;
            this.$component.off("click.fieldImages").on("click.fieldImages", ".form-field-image-item", (function (e) {
                var i = e.currentTarget.querySelector("input"),
                    n = !i.checked;
                i.checked = n, n && "radio" === i.type && t.autoNextStep()
            }))
        }, i.initFieldFile = function () {
            this.$component.off("change.uploadFile").on("change.uploadFile", ".file-input", (function (t) {
                var e = $(t.currentTarget),
                    i = e.parents(".form-field-file"),
                    n = i.find(".form-field-file--files"),
                    r = e.val(),
                    s = t.currentTarget.files.length;
                if (i.addClass("active"), e.parents(".field").removeClass("is_error"), 0 === s) i.removeClass("active");
                else if (1 === s) n.find(".text").text(r);
                else if (s > 1) {
                    var a, o = s % 10;
                    a = 1 === o && 11 !== s % 100 ? "form.filesMult" : o > 1 && o < 5 ? "form.filesMult1" : "form.filesMult2", n.find(".text").text(s + " " + flexbe_cli.locale.tr(a))
                }
            })), this.$component.off("click.clearFiles").on("click.clearFiles", ".clear-files", (function (t) {
                var e = $(t.currentTarget).parents(".form-field-file");
                e.find(".file-input").val(""), e.removeClass("active")
            }))
        }, i.initFieldCheckbox = function () {
        }, i.initFieldRadio = function () {
            var t = this;
            this.autoNextEnabled && this.$component.off("click.initRadio").on("click.initRadio", ".form-field-radio-item", (function () {
                t.autoNextStep()
            }))
        }, i.initFieldSelect = function () {
            var t = this;

            function e(t) {
                return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }

            this.$component.find(".dropdown-container").remove(), this.$component.find("select").each((function (i, n) {
                var r = $(n),
                    s = r.closest('[data-type="select"]'),
                    a = "",
                    o = "";
                r.children("option").each((function (t, i) {
                    var n = $(i),
                        r = e(n.val()),
                        s = e(n.text() || "—");
                    "selected" === n.attr("selected") ? (a = s, o += '<li class="selected" data-value="' + r + '">' + s + "</li>") : o += '<li data-value="' + r + '">' + s + "</li>"
                }));
                var l = $('<div class="dropdown-container">\n                    <div class="dropdown-select">\n                        <span>' + a + '</span>\n                        <i></i>\n                    </div>\n                    \n                    <ul class="dropdown-select-ul">' + o + "</ul>\n                </div>"),
                    c = l.find(".dropdown-select-ul");
                r.after(l), l.off("click.selectdd").on("click.selectdd", ".dropdown-select", (function () {
                    var e = t.$component.closest(".b_block"),
                        i = t.core,
                        n = e.outerHeight() - 60,
                        r = c.outerHeight(),
                        a = Math.min(n, r),
                        o = l.offset().top,
                        d = i.tween.end - 30;
                    o + a > d && c.css({top: d - (o + a) + "px", maxHeight: a + "px"}), setTimeout((function () {
                        var t = !l.hasClass("active");
                        l.toggleClass("active", t), s.toggleClass("active", t), t && $("body").on("click.quiz-select-element", (function (t) {
                            $(t.target).is(l) || $(t.target).closest(l).length || (l.removeClass("active"), s.removeClass("active"), $("body").off("click.quiz-select-element"))
                        }))
                    }), 50)
                })), l.off("click.selectli").on("click.selectli", ".dropdown-select-ul li", (function (t) {
                    var i = $(t.currentTarget);
                    if (!i.hasClass("optgroup")) {
                        var n = i.closest("ul").siblings(".dropdown-select");
                        l.removeClass("active"), s.removeClass("active"), i.siblings("li").removeClass("selected"), i.addClass("selected"), r.val(i.attr("data-value")), n.children("span").html(e(i.text()))
                    }
                })), r.off("change.changeSelect").on("change.changeSelect", (function (t) {
                    var i = c.find("li"),
                        n = t.currentTarget.value;
                    i.removeClass("selected"), i.filter('[data-value="' + n + '"]').addClass("selected"), l.find(".dropdown-select > span").html(e(n))
                }))
            }))
        }, i.initFieldTextarea = function () {
            this.$component.find("textarea.autosize").each((function (t, e) {
                var i = e.offsetHeight - e.clientHeight,
                    n = $(e);
                n.removeAttr("data-autoresize"), n.off("keyup input").on("keyup input", (function (t) {
                    t.currentTarget.style.height = "auto", t.currentTarget.style.height = t.currentTarget.scrollHeight + i + "px"
                }))
            }))
        }, i.initFieldRange = function () {
            this.$component.find(".form-field-range").each((function (t, e) {
                return new flexbe_cli.components.classes.rangeInput($(e))
            }))
        }, i.submitForm = function () {
            var t = this;
            if (this.busy) return !1;
            this.busy = !0;
            var e = {
                p_id: flexbe_cli.p_id,
                id: this.core.id,
                name: this.result.name,
                action: this.result.action.name,
                jsform: parseInt(448312, 10)
            };
            if (flexbe_cli.stat.u_id && (e.f_uid = flexbe_cli.stat.u_id), "pay" === this.result.action.name && this.result.action.pay) {
                var i = this.result.action.pay;
                i.desc && (e["pay[desc]"] = i.desc), i.price && (e["pay[price]"] = i.price, i.title && (e["product[items]"] = JSON.stringify([{
                    title: i.title,
                    id: flexbe_cli.p_id + "_" + flexbe_cli.s_id,
                    img: i.img,
                    count: 1,
                    price: i.price
                }]), e["product[price]"] = i.price, e["product[total]"] = 1))
            }
            return Object.entries(e).forEach((function (e) {
                var i = e[0],
                    n = e[1];
                null != n && t.addFields([{name: i, value: n, type: "hidden"}], !1)
            })), "undefined" != typeof FormData ? (this.sendFormdata(), !1) : !(this.$form.find('input[type="file"]').length < 1) || (this.sendAjax(), !1)
        }, i.sendFormdata = function () {
            var t = this,
                e = new FormData(this.$form.get(0));
            if (e.append("is_ajax", "true"), "undefined" != typeof flexbeAPI && void 0 !== flexbeAPI.customLeadData && e.append("customLeadData", JSON.stringify(flexbeAPI.customLeadData)), e.append("f_ab", JSON.stringify(flexbe_cli.stat.AB.getCookie())), flexbe_cli.run.is_OSX && "function" == typeof e.entries) {
                var i = e.entries(),
                    n = Array.isArray(i),
                    r = 0;
                for (i = n ? i : i[Symbol.iterator](); ;) {
                    var s;
                    if (n) {
                        if (r >= i.length) break;
                        s = i[r++]
                    } else {
                        if ((r = i.next()).done) break;
                        s = r.value
                    }
                    var a = s,
                        o = a[0],
                        l = a[1];
                    "object" == typeof l && l instanceof File && 0 === l.size && e.delete(o)
                }
            }
            this.$component.addClass("submitting"), this.$form.addClass("submitting"), $.ajax({
                url: this.$form.attr("action"),
                type: "POST",
                dataType: "json",
                processData: !1,
                contentType: !1,
                data: e,
                xhr: function () {
                    var t = $.ajaxSettings.xhr();
                    return t.upload, t
                }
            }).done((function (e) {
                t.$component.addClass("success"), t.$component.removeClass("submitting"), t.$form.removeClass("submitting"), e.send_formdata = !0, void 0 !== e.pay && (t.pay = e.pay), t.afterSend(), setTimeout((function () {
                    t.$component.removeClass("success")
                }), 1e3)
            })).fail((function () {
                t.$component.removeClass("submitting success"), t.$form.removeClass("submitting"), t.busy = !1
            }))
        }, i.sendAjax = function () {
            var t = this;
            this.$form.addClass("submitting");
            var e = this.$form.serialize();
            $.ajax({
                url: this.$form.attr("action"),
                type: "POST",
                dataType: "json",
                data: e + "&is_ajax=true"
            }).done((function (e) {
                t.$form.removeClass("submitting"), e.send_ajax = !0, void 0 !== e.pay && (t.pay = e.pay), t.afterSend()
            })).fail((function () {
                t.$form.removeClass("submitting")
            }))
        }, i.afterSend = function () {
            var t = this,
                e = function () {
                    setTimeout((function () {
                        t.busy = !1, t.resetForm(), t.toWelcome({scroll: !1})
                    }), 500)
                },
                i = this.result.action.name,
                n = this.lastHistoryItem;
            if (n) {
                var r = n.answers,
                    s = n.id,
                    a = n.title,
                    o = this.result.goals || {};
                flexbe_cli.events.emit("quiz_event", {
                    event: "submit",
                    sender: "core",
                    quiz: this,
                    payload: {fromAnswers: r, fromId: s, fromTitle: a, sessionId: this.sessionId},
                    answerGoals: {goal: n.goal, htmlGoal: n.htmlGoal},
                    resultGoals: {mainGoal: flexbe_cli.stat.goals.order_done, goal: o.goal, htmlGoal: o.goal_html}
                })
            }
            if ("pay" === i && void 0 !== this.pay && null !== this.pay && this.pay.pay_link.length > 0) {
                var l = window.location.origin + window.location.pathname + (window.location.search ? window.location.search + "&" : "?") + "pay_id=" + this.pay.pay_id + "&h=" + this.pay.pay_hash;
                try {
                    window.history.pushState(null, null, l), setTimeout((function () {
                        flexbe_cli.events.emit("pay", {action: "init"})
                    }), 200)
                } catch (t) {
                    setTimeout((function () {
                        document.location = l
                    }), 500)
                }
                e()
            } else if (["redirect", "anchor"].includes(i)) {
                var c = this.result.action.action_redirect;
                c ? setTimeout((function () {
                    flexbe_cli.helpers.gotoLink(c), e()
                }), 1e3) : e()
            } else {
                var d = this.result.action.modal_id;
                if (!flexbe_cli.modal.find(d)) {
                    var u = String(this.ownerId);
                    d = (u && u.split("_")[0]) + "_" + d
                }
                flexbe_cli.events.emit("ui_modal_open", {id: d}), e()
            }
        }, i.resetForm = function () {
            this.$form.find(".form-field-file, .file-input-outer").removeClass("active");
            var t = this.$stepsWrapper.find("input, textarea, select"),
                e = t.not("select").not('[type="hidden"]').not(".form-field-range__input"),
                i = t.filter("select"),
                n = t.filter(".form-field-range__input");
            t.prop("disabled", !0), i.each((function (t, e) {
                var i = e.querySelector("option"),
                    n = i && i.value || "";
                e.value !== n && (e.value = n, e.dispatchEvent(new Event("change")))
            })), n.each((function (t, e) {
                e.value = e.getAttribute("data-value"), e.dispatchEvent(new Event("change"))
            })), e.each((function (t, e) {
                var i = e.defaultChecked;
                ["radio", "checkbox"].includes(e.type) ? e.checked = i : (e.removeAttribute("value"), e.value = "", e.removeAttribute("data-mask-complete"), e._mask && e._mask.updateValue()), e.dispatchEvent(new Event("change"))
            })), this.$form[0].reset()
        }, i.setData = function (t) {
            if (!t) return !1;
            t && t.fields && this.addFields(t.fields), t && t.items && this.addItems(t.items)
        }, i.addFields = function (t, e) {
            void 0 === e && (e = !0);
            var i = this.$component.find(".form-fields-advanced");
            t.length && i[0] && (e && i.empty(), t.forEach((function (t) {
                i.find('input[name="' + t.name + '"]').remove();
                var e = $("<input>").attr("type", t.type).attr("name", t.name).attr("value", t.value);
                i.append(e)
            })))
        }, i.addItems = function (t) {
            if (void 0 === t && (t = []), t && t.length) {
                var e = 0,
                    i = 0,
                    n = "",
                    r = [];
                t = t.map((function (t) {
                    return "object" != typeof t ? {} : (t.count = parseInt(t.count, 10) || 1, t.price = parseFloat(t.price) || 0, t.title = "string" == typeof t.title && t.title.trim() || t.title || "", e += t.price * t.count || 0, i += t.count, t)
                }));
                try {
                    n = JSON.stringify(t)
                } catch (t) {
                }
                var s = {"product[items]": n, "product[price]": e, "product[total]": i};
                e && (s = _objectSpread(_objectSpread({}, s), {}, {
                    "pay[price]": e,
                    "pay[desc]": ""
                })), Object.entries(s).forEach((function (t) {
                    var e = t[0],
                        i = t[1];
                    r.push({type: "hidden", name: e, value: i})
                })), this.addFields(r)
            }
        }, i.initFieldMask = function () {
            var t = this;
            return "undefined" != typeof IMask && (this.needInitMasks = !1, this.$masked.each((function (e, i) {
                flexbe_cli.components.classes.form.initMask(i);
                var n = !!i.getAttribute("data-placeholder"),
                    r = i._mask;
                n && r && ($(i).on("focus" + t.eventId, (function () {
                    r.updateOptions({lazy: !1})
                })), $(i).on("blur" + t.eventId, (function () {
                    if (!r.unmaskedValue) {
                        var t = r.mask.replace(/\*/g, "_"),
                            e = r.value;
                        r.updateOptions({lazy: !0}), r.masked.rawInputValue && t !== e || (r.unmaskedValue = "", r.value = "", r.updateValue())
                    }
                })))
            })), !0)
        }, i.initFieldDate = function () {
            return this.needInitCalendar = !1, this.$calendars.each((function (t, e) {
                flexbe_cli.components.classes.form.initCalendar(e)
            })), !0
        }, e
    }(BaseComponent);
    flexbe_cli.components.classes.quiz = t
}();
"use strict";

function _inheritsLoose(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
}

!function () {
    var e = function (e) {
        function t() {
            return e.apply(this, arguments) || this
        }

        _inheritsLoose(t, e);
        var s = t.prototype;
        return s.setProgress = function () {
            var e = this.$progress.find(".progress-loader-bar .current"),
                t = "step" === this.$progress.attr("data-text-style"),
                s = e.attr("data-unit"),
                n = this.total,
                r = this.realIndex;
            flexbe_cli.is_admin && -1 === this.realIndex && "welcome" !== this.currentId && (r = +this.$currentStep.prevAll('[data-linked="linked"]').first().attr("data-real-index") + 1 || 0);
            r = Math.max(0, Math.min(n - 1, r));
            var l = t ? r + 1 : r,
                o = parseInt(100 * l / n, 10);
            if (this.$progress.attr("data-current", l), this.$progress.attr("data-total", n), this.$progress.attr("data-current-progress", o > 0 ? o : 0), e && s) {
                var i = o + "%";
                "step" === s ? i = l + " / " + n : "none" === s && (i = ""), e.find(".progress-runner").attr("data-value", i)
            }
            this.$progress.find(".progress-text .current").text(l), this.$progress.find(".progress-text .total").text(n), this.$progress.find(".progress-percent .current").text(o), this.$progress.find(".progress-loader-bar .current").css("width", o + "%"), this.$progress.find(".progress-loader-circle .current").attr("stroke-dashoffset", "" + Math.abs(100 - o))
        }, s.initFieldSelect = function () {
            var e = this,
                t = this;
            this.$component.find(".dropdown-container").remove(), this.$steps.find("select.atom-custom-select").each((function (s, n) {
                var r = $(n),
                    l = r.closest('[data-type="select"]'),
                    o = r.children("option").length,
                    i = e.$form.hasClass("style-underlined") ? "sharp" : "",
                    a = $('\n                    <div class="dropdown-container">\n                        <div tabindex="0" class="dropdown-select">\n                            <span class="selected"></span>\n                            <span class="arrow">\n                                <svg viewBox="0 0 14 8">\n                                    <path d="M1.4 0L0 1.34043L7 8L14 1.34043L12.6 0L7 5.34998L1.4 0Z"/>\n                                </svg>\n                            </span>\n                        </div>\n                    </div>\n                '),
                    c = $('\n                    <div class="atom-select size--large">\n                        <div class="overlay"></div>\n                    </div>\n                '),
                    d = $('<ul class="dropdown-select-ul ' + i + '"></ul>'),
                    f = a.find(".dropdown-select .selected"),
                    u = !1,
                    p = !1,
                    v = !1;

                function h(e, t) {
                    e[0] && (e.siblings("li").removeClass("selected"), e.addClass("selected"), r.val(e.attr("data-value")), f.text(e.text()), t && m())
                }

                function g() {
                    var e = d.children(".option-e"),
                        t = e.height(),
                        s = d.height(),
                        n = t * (e.index($(".selected", d)) + 1);
                    if (s > t * o) return !1;
                    d.scrollTop() < n - s ? d.animate({scrollTop: n - s}, 100) : d.scrollTop() > n - t && d.animate({scrollTop: n - t}, 100)
                }

                function m() {
                    v = !1, flexbe_cli.block.removeOverlay("customSelect"), c.removeClass("active"), l.removeClass("active"), clearTimeout(u)
                }

                function x() {
                    v = !0, flexbe_cli.block.pushOverlay("customSelect");
                    var e = a.hasClass("active");
                    c.off("click.closeSelect").on("click.closeSelect", ".overlay", (function (e) {
                        m(), document.elementFromPoint(e.clientX, e.clientY).focus()
                    })), c.off("click.selectli").on("click.selectli", ".dropdown-select-ul li", (function (e) {
                        h($(e.currentTarget), !0), t.autoNextStep()
                    })), c.off("mousewheel.selectUl").on("mousewheel.selectUl", ".dropdown-select-ul", (function (e) {
                        var t = e.currentTarget.scrollHeight,
                            s = e.currentTarget.clientHeight;
                        return !(e.currentTarget.scrollTop === t - s && e.deltaY > 0 || 0 === e.currentTarget.scrollTop && e.deltaY < 0)
                    })), $("body").append(c), clearTimeout(u), d.css({
                        left: a.offset().left + "px",
                        top: a.offset().top + "px",
                        width: a.width() + "px"
                    }), c.toggleClass("active", !e), l.toggleClass("active", !e), e || l.siblings('[data-type="select"]').removeClass("active").find(".dropdown-container").removeClass("active"), g()
                }

                r.children("option").each((function (e, t) {
                    var s = $(t),
                        n = s.val(),
                        r = s.text() || "—",
                        l = s.attr("selected"),
                        o = $('<li class="option-e"><span class="option-inner"></span></li>');
                    "selected" === l && o.addClass("selected"), o.attr("data-value", n), o.find(".option-inner").text(r), d.append(o)
                })), f.text(r[0].value), c.append(d), r.after(a), flexbe_cli.responsive && flexbe_cli.run.is_screen_all_mobile ? r.off("change.changeSelect").on("change.changeSelect", (function (e) {
                    var t = e.target.value;
                    f.text(t)
                })) : (a.off("click.openSelect").on("click.openSelect", ".dropdown-select", (function () {
                    x()
                })), a.off("focus.focusSelect").on("focus.focusSelect", ".dropdown-select", (function () {
                    p = !0
                })), a.off("blur.blurSelect").on("blur.blurSelect", ".dropdown-select", (function () {
                    p = !1, u = setTimeout((function () {
                        m()
                    }), 200)
                })), r.off("change.changeSelect").on("change.changeSelect", (function (e) {
                    var s = c.find(".dropdown-select-ul li"),
                        n = e.currentTarget.value;
                    s.removeClass("selected"), s.filter((function (e, t) {
                        return t.getAttribute("data-value") === n
                    })).addClass("selected"), f.text(n), t.autoNextStep()
                })), a.off("keydown.keydownSelect").on("keydown.keydownSelect", ".dropdown-select", (function (e) {
                    if (p && [13, 27, 32, 38, 40].includes(e.keyCode)) {
                        var t = d.find(".option-e.selected");
                        if (40 === e.keyCode) e.preventDefault(), h(t.next(), !1), g();
                        else if (38 === e.keyCode) e.preventDefault(), h(t.prev(), !1), g();
                        else if (v || 32 !== e.keyCode) {
                            if (v && [13, 27, 32].includes(e.keyCode)) return e.preventDefault(), m(), !1
                        } else e.preventDefault(), x()
                    }
                })))
            }))
        }, s.initFieldFile = function () {
            this.$form.on("change.file" + this.eventId, ".file-input--original", (function (e) {
                var t = $(e.currentTarget),
                    s = t.parents(".file-input-outer"),
                    n = t.val(),
                    r = e.currentTarget.files.length;
                if (s.addClass("active"), t.closest("[data-type]").removeClass("is_error"), 1 === r) s.find(".file-item--title").text(n);
                else if (r > 1) {
                    var l, o = r % 10;
                    l = 1 === o && 11 !== r % 100 ? "form.filesMult" : o > 1 && o < 5 ? "form.filesMult1" : "form.filesMult2", s.find(".file-item--title").text(r + " " + flexbe_cli.locale.tr(l))
                } else s.removeClass("active")
            })), this.$form.on("click" + this.eventId, ".clear-files", (function (e) {
                var t = $(e.currentTarget).parents(".file-input-outer");
                t.find(".file-input--original").val(""), t.removeClass("active")
            }))
        }, t
    }(flexbe_cli.components.classes.quiz);
    flexbe_cli.components.classes.quiz = e
}();
"use strict";

function _inheritsLoose(e, o) {
    e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e.__proto__ = o
}

!function () {
    var e = function (e) {
        function o() {
            for (var o, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
            return (o = e.call.apply(e, [this].concat(n)) || this).is = "menu", o.isOpen = !1, o.isOpenNested = !1, o.isRestored = !0, o.eventId = o.owner._core.id, o.isRowDirection = "row" === o.$component.attr("data-direction"), o.isShowDropdownClick = "click" === o.$component.attr("data-type"), o.isMenuShowMore = "true" === o.$component.attr("data-show_more"), o.$menuList = o.$component.find(".component-menu-list"), o.menuSize = Array.from(o.component.classList).filter((function (e) {
                return e.includes("size--")
            }))[0], o.menuWeight = Array.from(o.component.classList).filter((function (e) {
                return e.includes("weight--")
            }))[0], o.menuClasses = o.menuSize + " " + o.menuWeight, o.$componentCopy = o.$component.clone(), o
        }

        _inheritsLoose(o, e);
        var t = o.prototype;
        return t.onBeside = function (e) {
            var o = this,
                t = e.state,
                n = e.first;
            t && n && (this.bindEvents(), this.isMenuShowMore && this.createListShowMore(), this.$button = this.$component.find(".folder-item"), this.$header = this.$button.closest(".floating-header"), this.$header.length && this.$header.off("transform-header").on("transform-header", (function () {
                o.$dropdown && o.$dropdown.length && o.closeDropdown()
            })), flexbe_cli.run.is_screen_all_mobile && this.$menuList.find(".folder-item").length && this.$menuList.addClass("nested-menu"))
        }, t.onResize = function (e) {
            if (!this.isMenuShowMore || !this.isRowDirection || ["bottom", "top"].includes(e.type)) return !1;
            this.createListShowMore(), this.isOpen && this.setDropdownPosition(this.folder)
        }, t.bindEvents = function () {
            var e = this;
            $(window).off("." + this.eventId), this.$component.off(".core"), flexbe_cli.run.is_desktop && this.$component.on("mouseenter.core mouseleave.core", ".menu-item", (function (o) {
                e.$component.toggleClass("in-hover"), $(o.currentTarget).toggleClass("hover")
            })), flexbe_cli.run.is_screen_all_mobile ? this.$component.on("click.core", "li.folder-item > .folder-item-text", (function (o) {
                return e.toggleMobileMenu(o.currentTarget), !1
            })) : (this.isShowDropdownClick || flexbe_cli.run.is_touch ? (flexbe_cli.is_admin && this.$component.off(".editorPrevent").on("mouseup.editorPrevent click.editorPrevent", "li.folder-item", (function (e) {
                e.stopPropagation()
            })), this.$component.on("click.core", "li.folder-item", (function (o) {
                e.toggleDropdown(o.currentTarget)
            })), this.$component.on("mouseenter.core", "li.folder-item", (function () {
                clearTimeout(e.nestedTimer), clearTimeout(e.containerCloseTimer)
            }))) : (this.$component.on("mouseenter.core", "li.folder-item", (function (o) {
                clearTimeout(e.dropdownTimer), clearTimeout(e.nestedTimer), clearTimeout(e.containerCloseTimer), e.currentTarget !== o.currentTarget && (e.currentTarget = o.currentTarget, e.toggleDropdown(o.currentTarget)), e.$component.off("click.core"), setTimeout((function () {
                    e.$component.on("click.core", "li.folder-item", (function (o) {
                        e.toggleDropdown(o.currentTarget)
                    }))
                }), 500)
            })), this.$component.on("mouseleave.core", "li.folder-item", (function () {
                clearTimeout(e.dropdownTimer), e.dropdownTimer = setTimeout((function () {
                    e.currentTarget = null, e.closeDropdown()
                }), 100)
            }))), $(window).on("blur." + this.eventId, (function () {
                e.closeDropdown()
            })), this.isRowDirection && this.isMenuShowMore && $(window).on("resized." + this.eventId, (function () {
                e.createListShowMore(), e.isOpen && e.setDropdownPosition(e.folder)
            })))
        }, t.observeItems = function () {
            var e, o = this,
                t = !0,
                n = this.$component.find("li.root-item")[0];
            this._resizeObserver = new ResizeObserver((function () {
                t ? t = !1 : (clearTimeout(e), e = setTimeout((function () {
                    o.onResize({})
                }), 30))
            })), this._resizeObserver.observe(n)
        }, t.unobserveItems = function () {
            this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null)
        }, t.createListShowMore = function () {
            if (this.restoreMenuItems(), (this.isRowDirection || flexbe_cli.run.is_screen_all_mobile) && !flexbe_cli.run.is_screen_all_mobile) {
                var e = this.$menuList.parent().innerWidth();
                if (e >= this.initialMenuWidth) return this.observeItems(), !1;
                this.isRestored = !1;
                var o = this.$componentCopy.clone(),
                    t = o.find("li.root-item").toArray(),
                    n = 42,
                    i = 0;
                o.appendTo("body").css({position: "absolute", top: 0, left: 0, opacity: 0}), t.some((function (o, t) {
                    if (i = t, n += $(o).outerWidth(!0), e < n) return !0
                })), this.$menuList.empty(), this.$menuList.append(t.splice(0, i)), this.$menuList.append('\n                <li class=\'show-more menu-item folder-item\'>\n                <svg width="18" height="4" viewBox="0 0 18 4" xmlns="http://www.w3.org/2000/svg">\n                <path transform="rotate(-90 2 2)" fill="currentcolor" fill-rule="evenodd" d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>\n                </svg>\n                <ul class=\'component-menu-dropdown-list\'></ul>\n                </li>\n                '), this.$menuList.find(".show-more .component-menu-dropdown-list").append(t), o.remove(), this.observeItems()
            }
        }, t.restoreMenuItems = function () {
            if (this.isRowDirection) {
                if (!this.isRestored && this.$componentCopy) {
                    var e = this.$componentCopy.find(".component-menu-list").clone();
                    this.$menuList.html(e.html()), this.isRestored = !0
                }
                this.$menuList.css({
                    position: "fixed",
                    top: "-9999px",
                    left: "-9999px"
                }), this.initialMenuWidth = this.$menuList.innerWidth(), this.$menuList.css({
                    position: "",
                    top: "",
                    left: ""
                }), this.unobserveItems()
            }
        }, t.onClose = function () {
            this.closeDropdown()
        }, t.toggleDropdown = function (e) {
            !this.isOpen ? this.openDropdown(e) : this.closeDropdown(e)
        }, t.openDropdown = function (e) {
            var o = this;
            this.isOpen && this.folder != e && this.closeDropdown();
            var t = flexbe_cli.is_admin && !!this.$component.closest(".editor-focus").length;
            if (flexbe_cli.is_admin && !t) return !1;
            $(this.root).closest(".m_modal").length && $(this.root).find(".scroller").off("scroll." + this.eventId).on("scroll." + this.eventId, (function () {
                o.isOpen && o.closeDropdown()
            })), this.$component.addClass("in-open"), $(e).addClass("open");
            var n = $("body"),
                i = $(e).find(".component-menu-dropdown-list").clone()[0];
            this.isOpen = !0, this.isOpenNested = !1, this.folder = e, this.$dropdown = $('<div class="component-menu-dropdown ' + (t ? "editor-focus" : "") + '"></div>'), this.$dropdown.addClass(this.menuClasses), this.$dropdown.append(i).appendTo(n), this.setDropdownPosition(e), $("body").on("click.menu-dropdown-" + this.eventId + " keydown.menu-dropdown-" + this.eventId, (function (e) {
                var t = "keydown" === e.type && 27 === e.keyCode,
                    n = "click" === e.type && $(e.target).closest(".element-item").data("id") !== +o.eventId && !$(e.target).closest(".component-menu-dropdown").length,
                    i = $(e.target).closest(".folder-item").length;
                (t || n || !i && "click" === e.type) && o.closeDropdown()
            })), flexbe_cli.run.is_touch ? this.$dropdown.off("click.menu-dropdown-" + this.eventId).on("click.menu-dropdown-" + this.eventId, "li", (function (e) {
                e.currentTarget.classList.contains("folder-item") ? (o.toggleNestedDropdown({
                    folderDropdown: e.currentTarget,
                    parentTarget: e.currentTarget.parentElement
                }), e.stopPropagation()) : o.closeDropdown()
            })) : (this.$dropdown.off("mouseenter").on("mouseenter", (function () {
                clearTimeout(o.dropdownTimer), clearTimeout(o.nestedTimer), clearTimeout(o.containerCloseTimer)
            })), this.$dropdown.off("mouseenter.menu-dropdown-" + this.eventId).on("mouseenter.menu-dropdown-" + this.eventId, "li", (function (e) {
                clearTimeout(o.dropdownTimer), e.currentTarget !== o.folderDropdown && (o.folderDropdown = e.currentTarget, o.closeNestedDropdown({
                    folderDropdown: e.currentTarget,
                    parentTarget: e.currentTarget.parentElement
                })), o.openNestedDropdown({
                    folderDropdown: e.currentTarget,
                    parentTarget: e.currentTarget.parentElement
                })
            })), this.$dropdown.off("mouseleave.menu-dropdown-" + this.eventId).on("mouseleave.menu-dropdown-" + this.eventId, "li", (function (e) {
                clearTimeout(o.nestedTimer), o.nestedTimer = setTimeout((function () {
                    o.currentTarget = null, o.closeNestedDropdown({parentTarget: e.currentTarget.parentElement}), o.isShowDropdownClick || o.closeDropdown()
                }), 200)
            })), this.$dropdown.off("mouseover.menu-dropdown-" + this.eventId).on("mouseover.menu-dropdown-" + this.eventId, "li", (function () {
                clearTimeout(o.nestedTimer), clearTimeout(o.containerCloseTimer)
            })), this.$dropdown.off("mouseleave").on("mouseleave", (function (e) {
                clearTimeout(o.containerCloseTimer), o.closeNestedDropdown({parentTarget: e.currentTarget}), o.containerCloseTimer = setTimeout((function () {
                    o.isShowDropdownClick || (o.currentTarget = null, o.closeDropdown())
                }), 200)
            }))), flexbe_cli.components.links()
        }, t.closeDropdown = function (e) {
            if (this.isOpen) {
                this.$component.removeClass("in-open"), this.$component.find("li.menu-item").toArray().map((function (e) {
                    return $(e).removeClass("open")
                })), $("body").off("click.menu-dropdown-" + this.eventId + " keydown.menu-dropdown-" + this.eventId), this.$dropdown && (this.$dropdown.off("click.menu-dropdown-" + this.eventId), this.$dropdown.remove()), this.isOpen = !1;
                var o = this.folder === e,
                    t = e && $(e)[0].classList.contains("folder-item");
                !o && t && this.openDropdown(e)
            }
        }, t.toggleNestedDropdown = function (e) {
            var o = e.folderDropdown,
                t = e.parentTarget;
            !this.isOpenNested ? this.openNestedDropdown({
                folderDropdown: o,
                parentTarget: t
            }) : this.closeNestedDropdown({folderDropdown: o, parentTarget: t})
        }, t.openNestedDropdown = function (e) {
            var o = e.folderDropdown,
                t = e.parentTarget,
                n = $(t),
                i = $(o),
                r = $(o.lastElementChild),
                s = n.offset(),
                d = n.innerHeight(),
                l = n.innerWidth(),
                c = i.offset(),
                p = r.innerHeight(),
                h = r.innerWidth(),
                a = this.root.ownerDocument.defaultView.innerWidth - (s.left + l + 25),
                m = this.bodyHeight < s.top + d + p,
                u = c.top > p,
                f = c.top + p > window.pageYOffset + window.innerHeight,
                w = flexbe_cli.block.hasOverlay || [],
                g = "modal" === w[w.length - 1],
                v = m && u || g && f;
            this.folderDropdown = o, this.isOpenNested = !0, flexbe_cli.run.is_touch && $(o).hasClass("folder-item") && $(o).addClass("hover"), a > h || a > s.left ? $(o.lastChild).addClass("show-dropdown in-right") : $(o.lastChild).addClass("show-dropdown in-left"), v && $(o.lastChild).addClass("in-bottom")
        }, t.closeNestedDropdown = function (e) {
            var o = e.folderDropdown,
                t = e.parentTarget,
                n = $(t).find(".component-menu-dropdown-list"),
                i = this.folderDropdown === o,
                r = o && $(o)[0].classList.contains("folder-item");
            (this.isOpenNested = !1, $(n).removeClass("show-dropdown in-left in-right in-bottom"), flexbe_cli.run.is_touch) && Array.from($(t).find(".folder-item")).map((function (e) {
                $(e).removeClass("hover")
            }));
            r && !i && this.openNestedDropdown({folderDropdown: o, parentTarget: t})
        }, t.setDropdownPosition = function (e) {
            if (void 0 === e && (e = this.folder), e) {
                this.bodyHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
                var o, t = this.$dropdown,
                    n = t.find(".component-menu-dropdown-list"),
                    i = $(e).hasClass("show-more"),
                    r = i ? $(e) : $(e).children().first(),
                    s = r.innerWidth(),
                    d = r.innerHeight(),
                    l = r.offset(),
                    c = l.top,
                    p = l.left,
                    h = n.innerWidth(),
                    a = n.innerHeight(),
                    m = p + h > window.innerWidth,
                    u = p + p / 2 - (h / 2 + 20) < 0,
                    f = c + d + a + 20 > this.bodyHeight,
                    w = c + d + a > window.pageYOffset + window.innerHeight,
                    g = flexbe_cli.block.hasOverlay || [],
                    v = "modal" === g[g.length - 1];
                m ? o = p + s - h : i || !this.isRowDirection && !u ? (o = p + s / 2 - h / 2, h < s && (o = p)) : o = p - 8;
                var T = {
                    position: "absolute",
                    width: h,
                    height: a + 5,
                    "padding-top": "5px",
                    top: c + d,
                    left: o,
                    "z-index": 10
                };
                if (this.isRowDirection || (T["margin-top"] = "-5px"), (f || v && w) && (T.top = c - (a + 5), T["padding-top"] = "0", T["margin-top"] = "-5px", this.isRowDirection || (T["margin-top"] = "0")), h < s && (T.width = s + 20, n.css("min-width", s + 20)), this.$header.length && this.$header.hasClass("fixed-header")) {
                    var D = this.$header.find(".layout-type-header--second .folder-item.open");
                    if (T.position = "fixed", T.top = r[0].offsetTop + r[0].clientHeight + 10 + "px", D.length && D[0] === e) {
                        var b = this.$header.find(".layout-type-header--first");
                        T.top = r[0].offsetTop + r[0].clientHeight + 10 + b[0].clientHeight + "px"
                    }
                }
                $(this.root).hasClass("m_modal") && (T["z-index"] = 15), t.css(T)
            }
        }, t.toggleMobileMenu = function (e) {
            $(e.parentElement).toggleClass("show"), $(e.nextElementSibling).slideToggle(350)
        }, o
    }(BaseComponent);
    flexbe_cli.components.classes.menu = e
}();
"use strict";

function _extends() {
    return (_extends = Object.assign || function (e) {
        for (var i = 1; i < arguments.length; i++) {
            var t = arguments[i];
            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s])
        }
        return e
    }).apply(this, arguments)
}

function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}

function _inheritsLoose(e, i) {
    e.prototype = Object.create(i.prototype), e.prototype.constructor = e, e.__proto__ = i
}

!function () {
    var e = function (e) {
        function i() {
            for (var i, t = arguments.length, s = new Array(t), a = 0; a < t; a++) s[a] = arguments[a];
            var r = _assertThisInitialized(i = e.call.apply(e, [this].concat(s)) || this),
                n = r.component,
                l = r.$component,
                o = n.getAttribute("data-mode");
            return i.is = "cards", i.mode = o, "slider" === o && (i.require = ["_s/lib/swiper/swiper.v5.js@538"], i.$cardsRoot = l.closest(".flexbe-cards-root"), i.$slider = i.$cardsRoot.find(".swiper-container"), i.$pagination = i.$cardsRoot.find(".slider-pagination--cards"), i.$navigation = i.$cardsRoot.find(".slider-button--cards"), i.$flexbeCardsSlider = i.$cardsRoot.find(".flexbe-cards-slider"), i.$flexbeCards = i.$cardsRoot.find(".flexbe-cards"), i.$flexbeCard = i.$cardsRoot.find(".flexbe-card"), i.$flexbeCardsWrapper = i.$cardsRoot.find(".flexbe-cards-wrapper ")), i
        }

        _inheritsLoose(i, e);
        var t = i.prototype;
        return t.onLoad = function () {
            (this.core.inBeside || this.core.inScreen) && this.sliderDisposer()
        }, t.onBeside = function (e) {
            var i = e.state;
            this.isLoaded && i && this.sliderDisposer()
        }, t.onScreen = function (e) {
            var i = e.state;
            this.isLoaded && i && this.sliderDisposer()
        }, t.onResize = function () {
            this.sliderDisposer()
        }, t.onView = function (e) {
            var i = e.state;
            i && !this.wasView && this.swiper && (this.swiper.update(), this.checkSlidesVisibility(!0), this.checkNavigationState()), this.toggleSwiperAutoplay(i), this.toggleSwiperIteract(!i), i && (this.wasView = !0)
        }, t.sliderDisposer = function () {
            if ("slider" === this.mode) {
                var e = window.innerWidth < 768,
                    i = this.$slider.attr("data-slider-responsive-mode"),
                    t = e ? "desktop" !== i : "mobile" !== i;
                t && !this.swiper ? this.initSlider() : t || this.destroySlider()
            }
        }, t.initSlider = function () {
            if ("slider" === this.mode && !this.swiper && "undefined" != typeof Swiper) {
                this.$cardsRoot.addClass("slider-active slider-inited slider-enabled"), this.$cardsRoot.removeClass("slider-disabled"), this.$flexbeCardsSlider.addClass("swiper-active"), this.$flexbeCards.addClass("swiper-wrapper"), this.isOverflow && this.$flexbeCardsWrapper.addClass("overflow");
                try {
                    this.createSwiperSettings(), this.createSwiperInstance(), this.createSwiperNavigation(), this.createSwiperPagination(), this.createSwiperEditorFixes(), this.swiper.init(), this.toggleSwiperAutoplay(this.core.inView)
                } catch (e) {
                    console.log(e)
                }
            }
        }, t.destroySlider = function () {
            "slider" === this.mode && (this.swiper && this.swiper.destroy(), this.swiper = null, this.$cardsRoot.removeClass("slider-active slider-inited slider-enabled"), this.$cardsRoot.addClass("slider-disabled"), this.$flexbeCardsSlider.removeClass("swiper-active"), this.$flexbeCards.removeClass("swiper-wrapper"), this.$flexbeCard.removeClass("swiper-slide-hidden"), this.$flexbeCardsWrapper.removeClass("overflow"))
        }, t.createSwiperSettings = function () {
            var e = this,
                i = flexbe_cli.run.is_screen_all_mobile,
                t = +this.$slider.attr("data-count"),
                s = +this.$slider.attr("data-cards"),
                a = +this.$slider.attr("data-cards-mobile") || 1,
                r = +this.$slider.attr("data-overflow"),
                n = i ? t <= a : t <= s,
                l = 0;
            flexbe_cli.is_admin && (l = Math.floor($(this.root).data("slide-move")) || 0, l = Math.max(0, Math.min(t - 1, l)));
            var o = !flexbe_cli.is_admin && Math.floor(1e3 * +this.$slider.attr("data-autoplay")) || 0,
                d = this.$pagination.attr("data-type") || !1,
                c = this.$slider.attr("data-effect") || "slide",
                p = this.$slider.attr("data-effect-mobile") || "slide";
            s > 1 && (c = "slide"), a > 1 && (p = "slide");
            var h = !flexbe_cli.is_admin && +this.$slider.attr("data-loop");
            if (n && h && (h = !1), h = !!h, this.freeSlides = 0, !r) {
                var f = this.$slider[0].offsetWidth,
                    u = f / s,
                    v = (flexbe_cli.resize.width - f) / 2;
                this.freeSlides = Math.ceil(v / u)
            }
            this.isOverflow = r, this.totalSlides = t, this.effect = c, this.settings = {
                threshold: 10,
                autoHeight: !1,
                preloadImages: !1,
                preventClicks: !1,
                touchStartPreventDefault: !1,
                touchMoveStopPropagation: !1,
                preventClicksPropagation: !1,
                preventInteractionOnTransition: !0,
                touchReleaseOnEdges: !0,
                a11y: !1,
                lazy: !1,
                simulateTouch: !flexbe_cli.is_admin,
                virtualTranslate: !0,
                initialSlide: l,
                loop: h,
                autoplay: !!o && {delay: o, stopOnLastSlide: !1, disableOnInteraction: !0, waitForTransition: !0},
                fadeEffect: {crossFade: !0},
                navigation: {},
                pagination: {
                    clickable: !1, type: d, el: this.$pagination[0], renderBullet: function () {
                        return ""
                    }, formatFractionCurrent: function () {
                        return e.getGroupIndex() + 1
                    }, formatFractionTotal: function () {
                        return Math.ceil(e.totalSlides / e.swiper.params.slidesPerView)
                    }
                },
                slidesPerView: a,
                slidesPerGroup: 1,
                loopedSlides: a,
                speed: "fade" === p ? 650 : 450,
                effect: p,
                breakpoints: {
                    768: {
                        effect: c,
                        speed: "fade" === c ? 650 : 450,
                        slidesPerView: s,
                        slidesPerGroup: 1,
                        loopedSlides: s + this.freeSlides
                    }
                }
            }
        }, t.createSwiperInstance = function () {
            var e = this;
            this.swiper && (this.swiper.destroy(), this.swiper = null);
            var i, t, s = !1,
                a = new Swiper(this.$slider[0], _extends({
                    init: !1,
                    wrapperClass: "flexbe-cards",
                    slideClass: "flexbe-card",
                    noSwipingClass: "redactor-box"
                }, this.settings)),
                r = function () {
                    var r = a.params,
                        n = r.effect,
                        l = r.slidesPerView,
                        o = e.totalSlides > l;
                    s || (s = !0, e.$cardsRoot.addClass("slider-inited"), e.$slider.addClass("swiper-inited")), t !== n && (t = n, e.$slider.toggleClass("swiper-effect-slide", "slide" === n), e.$slider.toggleClass("swiper-effect-fade", "fade" === n)), i !== o && (i = o, e.$cardsRoot.toggleClass("slider-active", o), e.$slider.toggleClass("swiper-active", o), a.update())
                };
            a.once("init", (function () {
                r(),
                    function () {
                        if (a.loopedSlides) {
                            var i = $(a.slides).filter("." + a.params.slideDuplicateClass),
                                t = {};
                            i.each((function (e, i) {
                                var s = $(i),
                                    a = s.attr("data-swiper-slide-index");
                                t[a] = t[a] ? t[a] + 1 : 1, s.attr("data-cloned", t[a])
                            })), flexbe_cli.element.initArea(i), flexbe_cli.components.initComponents({core: e.core})
                        }
                    }(), e.checkSlidesVisibility()
            })), a.on("sliderMove", (function () {
                e.toggleSwiperIteract(!0), e.iteractTimeout = setTimeout((function () {
                    e.toggleSwiperIteract(!1)
                }), 3e3)
            })), a.on("resize", $.debounce((function () {
                e.swiper && (r(), e.checkSlidesVisibility())
            }), 50)), a.on("setTranslate", (function (e) {
                var i = a.$wrapperEl,
                    t = a.isHorizontal(),
                    s = t ? e : 0,
                    r = t ? 0 : e;
                "slide" === a.params.effect ? (flexbe_cli.is_admin ? i.css({
                    position: "relative",
                    top: r + "px",
                    left: s + "px"
                }) : i.css({transform: "translate3d(" + s + "px, " + r + "px, 0px)"}), a.slides.css({
                    opacity: "",
                    transform: ""
                })) : "fade" === a.params.effect && i.css({transform: ""})
            })), a.on("transitionStart touchStart", (function () {
                e.$cardsRoot.addClass("slider-in-animation")
            })), a.on("transitionEnd touchEnd", (function () {
                e.$cardsRoot.removeClass("slider-in-animation")
            })), a.on("slideChange", (function () {
                e.checkSlidesVisibility()
            })), this.swiper = a
        }, t.createSwiperNavigation = function () {
            var e = this,
                i = this.swiper;
            i.once("init", (function () {
                e.checkNavigationState()
            })), i.on("resize", $.debounce((function () {
                e.swiper && e.checkNavigationState()
            }), 50)), i.on("slideChange", (function () {
                e._skipSlide || e.checkNavigationState()
            })), this.$navigation.on("click", (function (i) {
                var t = i.currentTarget.getAttribute("data-direction");
                e["prev" === t ? "prevSlide" : "nextSlide"]()
            })), this.$slider.on("click.swiper-hidden", ".swiper-slide-hidden", (function (t) {
                t.preventDefault(), t.stopPropagation();
                var s = t.currentTarget,
                    a = Array.from(i.slides).findIndex((function (e) {
                        return e === s
                    })),
                    r = i.activeIndex,
                    n = r - a,
                    l = a - (r + i.params.slidesPerView - 1);
                n > 0 ? e.prevSlide(n) : l > 0 && e.nextSlide(l)
            }))
        }, t.createSwiperPagination = function () {
            var e = this,
                i = this.swiper,
                t = i.params,
                s = !1;
            i.on("paginationRender", (function () {
                if ("bullets" === t.pagination.type)
                    if (i.loopedSlides) e.loopPagination = new flexbe_cli.components.classes.bulletsLoopPagination(e.$pagination[0], {
                        init: !1,
                        tag: "span",
                        onClick: function (i) {
                            i < 0 ? e.prevSlide() : i > 0 && e.nextSlide()
                        }
                    });
                    else {
                        var s = t.pagination.bulletElement || "span",
                            a = t.pagination.bulletClass || "span",
                            r = t.slidesPerView || 1,
                            n = Math.ceil(e.totalSlides / r),
                            l = new Array(n).fill();
                        l = l.map((function (e, i) {
                            return "<" + s + ' class="' + a + '" data-index="' + i + '"></' + s + ">"
                        })).join(""), e.$pagination.html(l), e.bulletsPagination = new flexbe_cli.components.classes.bulletsPagination(e.$pagination[0], {
                            init: !1,
                            targets: "span",
                            active: i.realIndex,
                            onClick: function (i, t) {
                                t !== i && e.toSlide(i)
                            }
                        })
                    }
                e.$pagination.toggleClass("disabled", e.totalSlides <= i.params.slidesPerView)
            })), i.on("paginationUpdate", (function () {
                if (!e._skipSlide) {
                    if (e.bulletsPagination) {
                        var t = e.getGroupIndex(i.realIndex);
                        e.bulletsPagination.setActive(t)
                    } else if (e.loopPagination) {
                        var a = i.previousIndex,
                            r = i.activeIndex,
                            n = e.totalSlides,
                            l = a < r ? "next" : "prev";
                        !!(a === r || "next" === l && a === r - n || "prev" === l && a === r + n) && s || e.loopPagination.setActive(l)
                    }
                    s = !0
                }
            }))
        }, t.createSwiperEditorFixes = function () {
            var e = this;
            if (flexbe_cli.is_admin) {
                var i = this.swiper;
                i.on("slideChange", (function () {
                    $(e.root).data("slide-move", i.realIndex)
                }))
            }
        }, t.checkSlidesVisibility = function () {
            var e = this.swiper;
            e.updateSlides();
            var i = $(e.slides),
                t = i.slice(e.activeIndex, e.activeIndex + e.params.slidesPerView);
            i.not(t).removeClass("swiper-slide-visible").addClass("swiper-slide-hidden"), t.removeClass("swiper-slide-hidden").addClass("swiper-slide-visible")
        }, t.checkNavigationState = function () {
            var e = this.swiper,
                i = e.params.navigation.disabledClass,
                t = this.$navigation,
                s = t.eq(0),
                a = t.eq(1),
                r = e.isBeginning,
                n = e.isEnd;
            e.loopedSlides && (r = !1, n = !1), t.toggleClass("disabled", this.totalSlides <= e.params.slidesPerView), s.toggleClass(i, r), a.toggleClass(i, n)
        }, t.getGroupIndex = function (e, i, t) {
            void 0 === t && (t = !0);
            var s = this.swiper;
            null == e && (e = s.realIndex), i || (i = s.params.slidesPerView || 1), t && (s.loopedSlides || i <= 1) && (t = !1);
            var a = Math.ceil(this.totalSlides / i),
                r = Math.floor(e / i);
            if (t) {
                var n = r * i,
                    l = e - n > n + i - 1 - e,
                    o = e % i != 0 && e + i >= this.totalSlides;
                (l || o) && (r += 1)
            }
            return Math.max(0, Math.min(a, r))
        }, t.getSlideIndex = function (e, i) {
            return null == i && (i = this.swiper.params.slidesPerView || 1), e * i
        }, t.toSlide = function (e, i) {
            var t = this.swiper,
                s = this.getSlideIndex(e, i);
            return t.loopedSlides ? t.slideToLoop(s) : t.slideTo(s)
        }, t.prevSlide = function (e) {
            var i, t = this,
                s = this.swiper,
                a = s.params.slidesPerView;
            if (!s.animating) {
                e = e ? Math.abs(e) : this.isOverflow ? a : 1;
                var r = s.activeIndex;
                if (s.loopedSlides) {
                    var n = r,
                        l = this.isOverflow ? e : e + this.freeSlides;
                    r + this.totalSlides <= s.slides.length && !(n >= l) && (this.toggleSkip(!0), s.slideTo(r + this.totalSlides, 0)), i = s.activeIndex - e
                } else if (this.isOverflow) {
                    var o = this.getGroupIndex() - Math.ceil(e / a);
                    i = this.getSlideIndex(o)
                } else i = s.activeIndex - e;
                setTimeout((function () {
                    t.toggleSkip(!1), s.slideTo(i)
                }), 5)
            }
        }, t.nextSlide = function (e) {
            var i, t = this,
                s = this.swiper,
                a = s.params.slidesPerView;
            if (!s.animating) {
                e = e ? Math.abs(e) : this.isOverflow ? a : 1;
                var r = s.activeIndex,
                    n = r + a - 1;
                if (s.loopedSlides) {
                    var l = s.slides.length - n - 1,
                        o = this.isOverflow ? e : e + this.freeSlides;
                    r - this.totalSlides >= 0 && !(l >= o) && (this.toggleSkip(!0), s.slideTo(r - this.totalSlides, 0)), i = s.activeIndex + e
                } else if (this.isOverflow) {
                    var d = this.getGroupIndex(),
                        c = Math.ceil(e / a);
                    i = this.getSlideIndex(d + c)
                } else i = s.activeIndex + e;
                setTimeout((function () {
                    t.toggleSkip(!1), s.slideTo(i)
                }), 5)
            }
        }, t.toggleSkip = function (e) {
            void 0 === e && (e = !this._skipSlide), this._skipSlide = !!e, this.$slider.toggleClass("noanimate", this._skipSlide)
        }, t.toggleSwiperAutoplay = function (e) {
            if (this.swiper) {
                var i = this.swiper,
                    t = i.autoplay,
                    s = i.params.autoplay || {};
                t && s.enabled && (e && !t.running ? t.start() : e || t.stop())
            }
        }, t.toggleSwiperIteract = function (e) {
            this.swiper && this.$slider && (this.$slider.toggleClass("swiper-iteracted", e), clearTimeout(this.iteractTimeout))
        }, i
    }(BaseComponent);
    flexbe_cli.components.classes.cards = e
}();
"use strict";
flexbe_cli.init = function () {
    flexbe_cli.vars.init(), flexbe_cli.run.init(), flexbe_cli.header.init(), flexbe_cli.lib.init(), flexbe_cli.locale.init(), flexbe_cli.stat.init(), flexbe_cli.scroll.init(), flexbe_cli.resize.init(), flexbe_cli.components.init(), flexbe_cli.block.init(), flexbe_cli.modal.init(), flexbe_cli.widget.init(), flexbe_cli.element.init(), flexbe_cli.cookies.init()
}, flexbe_cli._init();
