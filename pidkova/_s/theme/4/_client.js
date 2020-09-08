"use strict";
flexbe_cli.block.register("ACADEMY_FEED", {
    lastItem: 0,
    loading: !1,
    list: [],
    onScreen: function (e) {
        e && this.initFeed()
    },
    initFeed: function () {
        var e = this;
        this.feedInited = !0, this.$loader = this.$area.find(".updates-loader");
        var a = -1,
            t = flexbe_cli.resize.height,
            i = !1;
        requestAnimationFrame((function s() {
            if (requestAnimationFrame(s), e.tween && e.inScreen && (!e.feedInited || a !== flexbe_cli.scroll.latest)) {
                a = flexbe_cli.scroll.latest, t = flexbe_cli.resize.height, i = e.loaderState;
                var l = (e.$loader.offset() || {}).top;
                e.loaderState = a + t >= l - 300, i !== e.loaderState && e.loaderState && e.loadFeed()
            }
        }))
    },
    loadFeed: function (e) {
        var a = this;
        if (void 0 === e && (e = function () {
        }), !this.loading) {
            this.loading = !0;
            var t = [];
            $.ajax({
                url: "admin/updates/get_updates",
                type: "POST",
                dataType: "json",
                data: {limit: 5, last_id: this.lastItem}
            }).done((function (i) {
                if (i.is_success && i.data) {
                    var s = "",
                        l = -1;
                    i.data.forEach((function (e) {
                        var i = a.list.findIndex((function (a) {
                            return a.id == e.id
                        }));
                        if (i >= 0) l = i, a.list.splice(i, 1, e);
                        else {
                            var s = -1 === l ? a.list.length : l;
                            a.list.splice(s, 0, e), t.splice(s, 0, e)
                        }
                    })), t.forEach((function (e) {
                        s += '<div class="card-item"><div class="date-wrap"><span data-info="data" class="date">', s += e.date, s += '</span></div><div class="line-wrap"><span class="line line-top"></span><span class="dot"></span><span class="line line-bottom"></span></div><div class="card-wrapper"><div class="img-card">', s += '<img  data-info="img"  src="' + e.image_retina + '">', s += '</div><div class="info"><span  data-info="data"  class="mobile-date">' + e.date + "</span>", s += '<div  data-info="title"  class="title">' + e.title + "</div>", s += '<div  data-info="text"  class="text">' + e.text + "</div>", e.buttons.length && (s += '<div class="wrap-button">', e.buttons.forEach((function (e) {
                            s += '<a href="' + e.url + '"', s += e.new_window ? ' target="_blank"' : "", s += ' class="gubert-button blue fill select size-l">' + e.title + "</a>"
                        })), s += "</div>"), s += "</div></div></div>"
                    })), a.list.length && a.$area.find(".updates-loader-wrap").removeClass("zero"), t.length && a.$area.find(".cards-container").append(s), t.length < 5 && (a.$area.find(".updates-loader-wrap").removeClass("active"), a.$area.find(".card-item:last-of-type .line.line-bottom").css("width", "0")), a.loading = !1, a.lastItem = a.list[a.list.length - 1].id
                } else e(new Error(i.message))
            })).fail((function (t) {
                e(new Error(t)), a.loading = !1
            }))
        }
    }
});
"use strict";
flexbe_cli.block.register("BUNDLE", {
    selectedTab: location.hash.replace(/^#tab/, ""),
    onInit: function () {
        this.initTabs()
    },
    onUpdate: function (t) {
        t.templateRendered && this.initTabs()
    },
    onResize: function () {
        this.normalizeLines()
    },
    onBeside: function (t) {
        t || this.resetHash()
    },
    initTabs: function () {
        var t = this;
        if (this.$mainContainer = this.$area.find(".main-area"), this.$tabsContainer = this.$area.find(".container-tabs"), this.$tabsList = this.$area.find('[role="tablist"]'), this.$tabsList.length) {
            this.tabInited = !0, this.$tabs = this.$tabsList.find('[role="tab"]'), this.$sections = this.$mainContainer.find('[role="tabpanel"]');
            var e, i = this.selectedTab && this.$tabs.filter('[data-item-uid="' + this.selectedTab + '"]');
            i && i.length || (i = this.$tabs.eq(0)), this.normalizeLines(), this.selectTab(i.attr("data-item-uid"), {force: !0}), setTimeout((function () {
                t.$mainContainer.addClass("main-area--tabs-inited")
            }), 150), this.$tabsContainer.on("click", ".tab", (function (e) {
                var i = $(e.currentTarget).closest("[data-item-uid]").attr("data-item-uid");
                i && (t.selectTab(i), t.setHash())
            })), this.$area.on("bringIntoView", (function (e) {
                var i = $(e.target).closest("[data-item-uid]").attr("data-item-uid");
                t.selectTab(i)
            })), flexbe_cli.is_admin && (this.$tabsContainer.on("mouseenter", ".tab", (function (i) {
                clearTimeout(e), 1 === i.buttons && (e = setTimeout((function () {
                    var e = $(i.target).closest("[data-item-uid]").attr("data-item-uid");
                    t.selectTab(e), t.setHash()
                }), 700))
            })), this.$tabsContainer.on("mouseleave", ".tab", (function () {
                clearTimeout(e)
            })))
        } else this.tabInited = !1
    },
    selectTab: function (t, e) {
        var i = (void 0 === e ? {} : e).force;
        if (this.tabInited && (i || this.selectedTab !== t)) {
            this.selectedTab = t;
            var a = this.$tabs.filter('[data-item-uid="' + this.selectedTab + '"]'),
                s = this.$sections.filter('[data-item-uid="' + this.selectedTab + '"]'),
                n = this.$sections.filter(".active"),
                l = n[0] && n[0].offsetTop;
            this.scrollToTab(a), this.$tabs.removeClass("active").attr("aria-selected", !1).attr("tabindex", -1), a.addClass("active").attr("aria-selected", !0).attr("tabindex", 0), this.$sections.removeClass("active").prop("hidden", !0), s.addClass("active").prop("hidden", !1);
            var o = s[0] && s[0].offsetTop;
            if (this.$activeTab = a, this.$activeSection = s, this.updateTweens(), flexbe_cli.run.is_desktop && null != l && null != o && Math.abs(l - o) > 0 && "undefined" != typeof anime) {
                var r = this.$mainContainer,
                    c = l - o;
                r.css("will-change", "transform"), anime({
                    targets: r[0],
                    translateY: [c, 0],
                    duration: 250,
                    easing: "easeOutCubic",
                    complete: function () {
                        r.css({transform: "", "will-change": ""})
                    }
                })
            }
        }
    },
    normalizeLines: function () {
        if (this.tabInited) {
            var t, e = this.$tabs;
            this.$tabsList.find(".tab-spacer").remove(), e.removeClass("first-in-line last-in-line"), e.first().addClass("first-in-line"), e.last().addClass("last-in-line"), e.each((function (e, i) {
                t && t.offsetTop !== i.offsetTop && ($(i).addClass("first-in-line"), $(t).addClass("last-in-line"), $(t).after('<span class="tab-spacer"></span>')), t = i
            }))
        }
    },
    scrollToTab: function (t) {
        if (this.tabInited) {
            var e = this.$tabsList,
                i = e[0].scrollWidth;
            if (i > e[0].offsetWidth) {
                var a, s = t[0].offsetLeft,
                    n = t[0].getBoundingClientRect(),
                    l = flexbe_cli.resize.width;
                n.width > l || n.left < 20 ? a = s - 20 : n.right > l - 20 && (a = s - (l - 20 - n.width)), null != a && (a = Math.max(0, Math.min(i - l, a)), e.animate({scrollLeft: a}, {duration: 250}))
            }
        }
    },
    setHash: function () {
        var t = this.$activeSection.find("._anchor").eq(0).attr("name");
        this.currentAnchor = t, t && (flexbe_cli.lockPopstate = !0, history.replaceState(null, null, "#" + t), flexbe_cli.is_admin && window.parent.history.replaceState(null, null, "#" + t), flexbe_cli.lockPopstate = !1)
    },
    resetHash: function () {
        this.tabInited && String(location.hash).replace(/^#{1,2}/, "") === this.currentAnchor && (flexbe_cli.lockPopstate = !0, history.replaceState(null, null, "#"), flexbe_cli.lockPopstate = !1)
    }
});
"use strict";
!function () {
    var e = !1;
    flexbe_cli.block.register("CARD", {
        onInit: function () {
            e || ($.get("mod/log", {
                channel: "max_log",
                title: "Страница " + location.href + " (" + flexbe_cli.p_id + ")",
                text: this.template_id + ":" + this.id
            }), e = !0)
        },
        onUpdate: function (e) {
            this.fixSwiper(e)
        },
        fixSwiper: function (e) {
            var i = this;
            void 0 === e && (e = {}), clearTimeout(this._changeTimer);
            var t = flexbe_cli.components.instances[this.id].find((function (e) {
                    return "cards" === e.is
                })),
                n = t && t.swiper;
            if (!n) return !1;
            if (document.body.contains(n.el)) {
                if (e.templateRendered && e && "items_add" === e.reason) {
                    var s = n.realIndex,
                        r = e.reasonData.to,
                        a = s;
                    s + n.params.slidesPerView <= r && (a = r - n.params.slidesPerView + 1), a !== s && (this._changeTimer = setTimeout((function () {
                        n.slideTo(a)
                    }), 30))
                }
                e.styleRendered && n.update(!1)
            } else this._changeTimer = setTimeout((function () {
                i.fixSwiper(e)
            }), 16)
        }
    })
}();
"use strict";
!function () {
    var e = !1;
    flexbe_cli.block.register("GALLERY", {
        onInit: function () {
            e || ($.get("mod/log", {
                channel: "max_log",
                title: "Страница " + location.href + " (" + flexbe_cli.p_id + ")",
                text: this.template_id + ":" + this.id
            }), e = !0)
        },
        onUpdate: function (e) {
            var i = this;
            void 0 === e && (e = {}), setTimeout((function () {
                var t = flexbe_cli.components.instances[i.id].find((function (e) {
                        return "cards" === e.is
                    })),
                    n = t && t.swiper;
                if (!n) return !1;
                if (e.templateRendered && e && "items_add" === e.reason) {
                    var s = n.realIndex,
                        a = e.reasonData.to,
                        r = s;
                    s + n.params.slidesPerView <= a && (r = a - n.params.slidesPerView + 1), r !== s && n.slideTo(r)
                }
                e.styleRendered && n.update(!1)
            }), 100)
        }
    })
}();
"use strict";
!function () {
    var t = !1;
    flexbe_cli.block.register("GRID", {
        onInit: function () {
            t || ($.get("mod/log", {
                channel: "max_log",
                title: "Страница " + location.href + " (" + flexbe_cli.p_id + ")",
                text: this.template_id + ":" + this.id
            }), t = !0)
        }
    })
}();
"use strict";
flexbe_cli.block.register("LOGO", {
    onUpdate: function (e) {
        var i = this;
        void 0 === e && (e = {}), setTimeout((function () {
            var s = flexbe_cli.components.instances[i.id].find((function (e) {
                    return "cards" === e.is
                })),
                r = s && s.swiper;
            if (!r) return !1;
            if (e.templateRendered && e && "items_add" === e.reason) {
                var t = r.realIndex,
                    n = e.reasonData.to,
                    a = t;
                t + r.params.slidesPerView <= n && (a = n - r.params.slidesPerView + 1), a !== t && r.slideTo(a)
            }
            e.styleRendered && r.update(!1)
        }), 100)
    }
});
"use strict";
flexbe_cli.block.register("_flexbe_tariff", {
    require: ["_s/lib/anime/anime.min.js@320"],
    currency: "RUB",
    currencies: {
        RUB: /AZ|AM|BY|KZ|KG|MD|RU|TJ|TK|UZ|UA/,
        EUR: AX | AD | AT | BE | CY | EE | FI | FR | GF | TF | DE | GR | GP | VA | IE | IT | LV | LT | LU | MT | MQ | YT | MC | ME | NL | PT | RE | BL | MF | PM | SM | SK | SI | ES /,
        USD: /.*/
    },
    onLoad: function () {
        this.$plans = this.$area.find(".plan-item"), this.$variants = this.$area.find(".plan-variant"), this.setCurrencyFromCookie(), this.setPeriod(), this.bindEvents(), this.updatePlans(!0)
    },
    bindEvents: function () {
        var e = this,
            a = this.$area.find(".subscribe-select"),
            t = this.$area.find(".advantage.has-variants"),
            r = this.$area.find(".plan-variants"),
            n = this.$area.find(".advantage-tip-icon"),
            i = function () {
                $(document).off("click.close-advantage"), t.removeClass("expand")
            };
        a.on("click", "[data-range]", (function (a) {
            var t = $(a.currentTarget).attr("data-range");
            e.setPeriod(t), e.updatePlans()
        })), t.on("click", (function (e) {
            !function (e) {
                e.hasClass("expand") || (e.addClass("expand"), setTimeout((function () {
                    $(document).off("click.close-advantage").on("click.close-advantage", (function (e) {
                        $(e.target).closest(".plan-variants").length || i()
                    }))
                }), 20))
            }($(e.currentTarget))
        })), r.on("click", ".plan-variant", (function (a) {
            a.preventDefault(), a.stopPropagation();
            var t = $(a.currentTarget).attr("data-plan"),
                r = e.$plans.filter('[data-plan-id="' + t + '"]'),
                n = r.attr("data-variant-id");
            r.removeClass("is-variant"), r.siblings('[data-variant-id="' + n + '"]').addClass("is-variant"), i(), e.updatePlans()
        })), n.on("mouseover", (function (e) {
            var a = e.currentTarget.getBoundingClientRect(),
                t = $(e.currentTarget).find(".advantage-tip"),
                r = t[0].getBoundingClientRect(),
                n = window.innerWidth;
            t.removeClass("top"), t.removeClass("bottom"), t.removeClass("left"), t.removeClass("right"), a.top > r.height + 25 ? t.addClass("top") : t.addClass("bottom"), n - a.x - 14 < 140 && t.addClass("left"), a.x + window.pageXOffset < 140 && t.addClass("right")
        })), flexbe_cli.events.on("update_currency", (function () {
            e.setCurrencyFromCookie(), e.updatePlans(), flexbe_cli.scroll.scrollTo(e.$area)
        }))
    },
    setPeriod: function (e) {
        void 0 === e && (e = "m1"), this.period = e, this.$area.find(".subscribe-select li").removeClass("active").filter("[data-range=" + e + "]").addClass("active"), this.$area.find(".subscribe-select .slider").removeClass().addClass("slider " + e)
    },
    setCurrencyFromCookie: function () {
        var e = this,
            a = this.$area.find(".lang-ru").length ? "ru" : "en",
            t = "ru" === a ? "RU" : getCookie("f_country") || "US",
            r = getCookie("f_currency") || Object.keys(this.currencies).find((function (a) {
                return e.currencies[a].test(t)
            }));
        Object.keys(this.currencies).includes(r) || (r = "ru" === a ? "RUB" : "USD"), this.currency = r
    },
    getCurrencyParams: function () {
        var e, a;
        switch (this.currency) {
            case "RUB":
                e = {str: ":value :symbol", t: " ", d: ","}, a = {code: "RUB", symbol: "₽", decimals: 2};
                break;
            case "EUR":
                e = {str: ":symbol:value", t: ",", d: "."}, a = {code: "EUR", symbol: "€", decimals: 2};
                break;
            default:
                e = {str: ":symbol:value", t: ",", d: "."}, a = {code: "USD", symbol: "$", decimals: 2}
        }
        return {currencyFormat: e, currencyData: a}
    },
    updatePlans: function (e) {
        void 0 === e && (e = !1);
        var a = this.getCurrencyParams(),
            t = a.currencyFormat,
            r = a.currencyData,
            n = this.period,
            i = this.currency.toLowerCase(),
            s = this.$plans,
            c = this.$variants;
        s.each((function (a, s) {
            var c = $(s),
                l = c.find(".plan-price"),
                o = c.find(".plan-title"),
                d = c.data("plan"),
                u = d.prices[i] || {};
            o.text(d.title);
            var f = flexbe_cli.locale.parseMoney(l.text()) || 0,
                v = u[n],
                p = {value: f},
                m = Math.abs(f - v) > 100,
                h = m ? "easeInOutExpo" : "linear",
                g = m ? 600 : 180;
            if (e) {
                var y = flexbe_cli.locale.formatMoney(u.m1, {currencyFormat: t, currencyData: r});
                l.text(y)
            } else anime({
                targets: p,
                value: v,
                duration: g,
                easing: h,
                update: function () {
                    var e = Math.floor(p.value),
                        a = flexbe_cli.locale.formatMoney(e, {currencyFormat: t, currencyData: r});
                    l.text(a)
                }
            })
        })), c.each((function (e, a) {
            var c = $(a),
                l = c.attr("data-plan"),
                o = s.filter('[data-plan-id="' + l + '"]').data("plan").prices[i][n],
                d = flexbe_cli.locale.formatMoney(o, {currencyFormat: t, currencyData: r});
            c.find(".plan-variant--price").text(d)
        })), s.removeAttr("data-plan")
    }
});
"use strict";
flexbe_cli.element.register("_flexbe_lang_cur", {
    onLoad: function () {
        var e = this,
            t = this.$area.find(".languages").data("language"),
            a = getCookie("f_currency") || ("ru" === t ? "RUB" : "USD"),
            c = this.$area.find(".simple-select"),
            r = this.$area.find(".currency .option"),
            n = this.$area.find(".currency-variants");
        this.current = {
            USD: "$ - USD",
            EUR: "€ - EUR"
        }, r.text(this.current[a]), c.on("click", ".option", (function (t) {
            var a = $(t.delegateTarget).hasClass("active");
            a || (t.preventDefault(), t.stopPropagation(), e.$area.find(".active").removeClass("active")), $(document).on("click", (function () {
                $(document).find(".simple-select.active").removeClass("active"), $(document).off("click")
            })), $(t.delegateTarget).toggleClass("active", !a)
        })), n.on("click", ".currency-variant", (function (t) {
            var a = $(t.currentTarget).attr("data-currency");
            r.text(e.current[a]), setCookie("f_currency", a), flexbe_cli.events.emit("update_currency", {currency: a})
        }))
    }
});
"use strict";
flexbe_cli.element.register("contacts01", {
    onInit: function () {
        this.initNodes(), this.fixDesc()
    },
    onUpdate: function () {
        this.initNodes(), this.fixDesc()
    },
    onMsg: function (t) {
        "change_contact" === t && this.fixDesc()
    },
    initNodes: function () {
        this.$desc = this.$area.find(".element-text--desc"), this.$icon = this.$area.find(".component-icon"), this.$contact = this.$area.find(".element-text--contact")
    },
    fixDesc: function () {
        if (this.$desc.length && this.$icon.length) {
            var t = this.$contact[0].offsetHeight,
                i = this.$icon[0].offsetHeight;
            if (t > i) {
                var n = t / 2 - i / 2;
                this.$icon.css("margin-top", n + "px")
            } else this.$icon.css("margin-top", "")
        }
    }
});
"use strict";
flexbe_cli.element.register("header_cart", {
    $headerCart: null,
    $cartDropdown: null,
    showDropdown: !1,
    forbidDropdownClose: !1,
    needed: !1,
    editorHasList: !1,
    openTimer: null,
    closeTimer: null,
    eventId: null,
    onInit: function () {
        this.$headerCart = this.$area.find(".header-cart-button-holder"), this.eventId = "cart_" + this.id, this.events(), flexbe_cli.is_admin && this.manageDropdownInEditor(), this.setCartData()
    },
    onUpdate: function (t) {
        var e = t.entity,
            o = t.path;
        e && o.includes("zone") && (this.$headerCart = e.$area.find(".header-cart-button-holder"), this.setCartData()), null != this.$cartDropdown && e && o.includes("button") && this.renderButton(), this.onInit()
    },
    events: function () {
        var t = this;
        if (flexbe_cli.widget.cart.off("list_loaded." + this.eventId).on("list_loaded." + this.eventId, (function () {
            t.setCartData()
        })), flexbe_cli.widget.cart.off("dispatch." + this.eventId).on("dispatch." + this.eventId, (function (e, o) {
            if ("addItem" === o.name) {
                var r = t.$area.find(".header-cart-button");
                r.removeClass("blink"), r.outerWidth(), r.addClass("blink")
            }
            t.setCartData()
        })), !flexbe_cli.is_admin) {
            var e = this.$area,
                o = "true" === this.$headerCart.attr("data-show-product-list"),
                r = flexbe_cli.run.is_screen_all_mobile;
            e.on("mouseenter." + this.eventId, (function () {
                clearTimeout(t.closeTimer), t.showDropdown || !o || r || (t.openTimer = setTimeout((function () {
                    return t.openDropdown()
                }), 150))
            })), e.on("mouseleave." + this.eventId, (function () {
                clearTimeout(t.openTimer), t.showDropdown && (t.closeTimer = setTimeout((function () {
                    return t.closeDropdown()
                }), 150))
            })), $(document).on("scroll.cookies", (function () {
                t.showDropdown && t.closeDropdown()
            })), window.addEventListener("blur", (function () {
                t.showDropdown && t.closeDropdown()
            })), this.$headerCart.off("click").on("click", (function () {
                flexbe_cli.events.emit("ui_cart_open")
            }))
        }
    },
    dropdownEvents: function () {
        var t = this;
        "true" === this.$headerCart.attr("data-show-product-list") && null != this.$cartDropdown && this.$cartDropdown.length && (this.$cartDropdown.on("mouseenter." + this.eventId, (function () {
            clearTimeout(t.closeTimer)
        })), this.$cartDropdown.on("mouseleave." + this.eventId, (function () {
            t.showDropdown && !t.forbidDropdownClose && (t.closeTimer = setTimeout((function () {
                return t.closeDropdown()
            }), 150))
        })), this.$cartDropdown.off("click.header-cart-products-list-button").on("click.header-cart-products-list-button", ".header-cart-products-list-button", (function () {
            flexbe_cli.events.emit("ui_cart_open"), t.closeDropdown()
        })))
    },
    manageDropdownInEditor: function () {
        var t = this;
        new MutationObserver((function (e) {
            var o;
            t.editorHasList = t.$headerCart.hasClass("has-list"), e.forEach((function (e) {
                var r = e.target && $(e.target).hasClass("editor-focus"),
                    n = $(".header-cart-products-list-content");
                clearTimeout(o), o = setTimeout((function () {
                    r ? t.editorHasList ? t.showDropdown || (t.forbidDropdownClose = !0, t.openDropdown()) : t.showDropdown && (t.showDropdown = !1, t.forbidDropdownClose = !1, n.remove()) : t.showDropdown && (t.showDropdown = !1, t.forbidDropdownClose = !1, n.remove(), t.editorHasList = !1)
                }), 50)
            }))
        })).observe(this.$area[0], {
            attributes: !0,
            attributeFilter: ["class"],
            attributeOldValue: !1,
            characterData: !1,
            childList: !1,
            subtree: !1
        })
    },
    openDropdown: function () {
        var t = "true" === this.$headerCart.attr("data-show-product-list");
        if (!flexbe_cli.run.is_screen_all_mobile && !this.showDropdown && t) {
            var e = $(".header-cart-products-list-holder"),
                o = this.$headerCart.offset(),
                r = o.top,
                n = o.left,
                a = this.$headerCart.outerWidth(),
                i = this.$headerCart.outerHeight();
            e.length && (e.remove(), this.$cartDropdown = null), this.$cartDropdown = $('<div class="header-cart-products-list-holder" data-id="dropdown_' + this.id + '"></div>'), $("body").append(this.$cartDropdown), this.showDropdown = !0, this.renderDropdownList(), this.dropdownEvents();
            var s = this.$cartDropdown.outerWidth(),
                d = r + i,
                c = n + a / 2 - s / 2;
            c <= 0 ? c = n : n + s >= window.innerWidth && (c = n + a - s), this.$cartDropdown.css({left: c, top: d})
        }
    },
    closeDropdown: function () {
        var t = this,
            e = $(".header-cart-products-list-holder"),
            o = $(".header-cart-products-list-content");
        this.showDropdown = !1, o.addClass("fade-out"), setTimeout((function () {
            o.remove(), e.remove(), t.$cartDropdown = null
        }), 180)
    },
    renderDropdownList: function () {
        var t = flexbe_cli.widget.cart.getList(),
            e = flexbe_cli.locale.tr("header_cart.title"),
            o = flexbe_cli.locale.tr("cart.total"),
            r = flexbe_cli.locale.tr("header_cart.empty"),
            n = '\n                <div class="header-cart-products-list-content" data-contrast="dark">\n                    <div class="header-cart-products-list-info">\n                        <span class="text-medium">' + e + '</span>\n                    </div> \n                    <ul class="header-cart-products-list">',
            a = '\n                </ul>\n                <div class="header-cart-products-list-info">\n                    <span class="text-medium">' + o + '</span>\n                    <span class="text-medium">' + flexbe_cli.locale.formatMoney(flexbe_cli.widget.cart.getTotal()) + '</span>\n                </div>\n                <div class="header-cart-products-list-button"></div>\n            </div>',
            i = '\n                    <div class="header-cart-products-list-content" data-contrast="dark">\n                        <div class="empty-text">' + r + "</div>\n                    </div>",
            s = "";
        t && t.length ? (s += n, t.forEach((function (t) {
            var e;
            s += '\n                <li class="header-cart-products-list-item" data-id="' + (e = t).id + '">\n                    <span class="title">' + (e.title || "-") + '</span>\n                    <span class="price text-gray">' + (e.count > 1 ? e.count + " x " : "") + flexbe_cli.locale.formatMoney(e.price) + "</span>\n                </li>"
        })), s += a, this.$cartDropdown.html(s), this.renderButton()) : this.$cartDropdown.html(i)
    },
    renderButton: function () {
        var t = this.$cartDropdown.find(".header-cart-products-list-button"),
            e = this.$area.find(".component-button");
        t.html(""), t.append(e.clone())
    },
    setCartData: function () {
        this.$headerCart.find(".header-cart-button-count").text(flexbe_cli.widget.cart.getCount()), this.$headerCart.find(".header-cart-button-text .price").text(flexbe_cli.locale.formatMoney(flexbe_cli.widget.cart.getTotal())), this.toggleSum(), this.toggleList()
    },
    toggleSum: function () {
        var t = "true" === this.$headerCart.attr("data-show-sum") && flexbe_cli.widget.cart.getList().length > 0;
        this.$headerCart.find(".header-cart-button-text .price").toggleClass("show", t), this.$headerCart.find(".header-cart-button-text .text").toggleClass("show", !t)
    },
    toggleList: function () {
        this.$headerCart.toggleClass("is-empty", 0 === flexbe_cli.widget.cart.getList().length)
    }
});
"use strict";
flexbe_cli.element.register("header_contacts", {
    onInit: function () {
        this.initNodes(), this.fixDesc()
    },
    onUpdate: function () {
        this.initNodes(), this.fixDesc()
    },
    onMsg: function (t) {
        "change_contact" === t && this.fixDesc()
    },
    initNodes: function () {
        this.$desc = this.$area.find(".element-text--desc"), this.$icon = this.$area.find(".component-icon"), this.$contact = this.$area.find(".element-text--contact")
    },
    fixDesc: function () {
        if (this.$desc.length && this.$icon.length) {
            var t = this.$contact[0].offsetHeight,
                i = this.$icon[0].offsetHeight;
            if (t > i) {
                var e = t / 2 - i / 2;
                this.$icon.css("margin-top", e + "px")
            } else this.$icon.css("margin-top", "")
        }
    }
});
"use strict";
"use strict";
flexbe_cli.element.register("media02", {
    onInit: function () {
        this.initElement()
    },
    onUpdate: function () {
        this.initElement()
    },
    onScreen: function (t) {
        t && this.needSetSize && (this.setSize(), this.setClip(this.initial))
    },
    onResize: function () {
        this.inScreen ? (this.setSize(), this.setClip(this.position)) : this.needSetSize = !0
    },
    initElement: function () {
        this.needSetSize = !0, this.$box = this.$area.find(".state-container"), this.$before = this.$box.find(".state-before"), this.$after = this.$box.find(".state-after"), this.$beforeImage = this.$before.find(".component-image"), this.$afterImage = this.$after.find(".component-image"), this.$handle = this.$box.find(".drag-handle"), this.direction = this.$box.attr("data-direction"), this.initial = this.$box.attr("data-initial") || 50, this.clientInited || (this.clientInited = !0, this.position = this.initial, this.$box.addClass("inited")), this.bindEvents()
    },
    bindEvents: function () {
        var t, e, i, n, s = this,
            o = this.direction,
            a = this.$box,
            h = a[0],
            d = !1,
            r = !1;

        function c(o) {
            if (!flexbe_cli.scroll.inScroll && (!flexbe_cli.is_admin || o.target.closest(".drag-handle"))) {
                var r = a.closest(".swiper-inited")[0];
                r && r.swiper && !n && (i = r.swiper, n = !0, i.detachEvents()), d = !0, e = h.getBoundingClientRect();
                var c = o.touches && o.touches[0] || o;
                t = m(c, e), a.addClass("drag"), flexbe_cli.is_admin || s.setClip(t), document.body.addEventListener("mousemove", f), document.body.addEventListener("touchmove", f, {passive: !1}, !1), window.addEventListener("mouseup", l), window.addEventListener("touchend", l, {passive: !1}, !1), u(o)
            }
        }

        function f(i) {
            if (d) {
                var n = m(i.touches && i.touches[0] || i, e),
                    o = Math.abs(t - n);
                if (!r) {
                    if (o < .8) return;
                    r = !0, a.addClass("resize")
                }
                s.setClip(n), u(i)
            }
        }

        function l() {
            d = !1, r = !1, a.removeClass("drag resize"), document.removeEventListener("mousemove", f), document.removeEventListener("touchmove", f), document.removeEventListener("mouseup", l), document.removeEventListener("touchend", l), i && n && (n = !1, i.attachEvents())
        }

        function u(t) {
            t.preventDefault(), t.stopPropagation()
        }

        function m(t, e) {
            return 100 * ("y" === o ? (t.clientY - e.top) / e.height : (t.clientX - e.left) / e.width)
        }

        this.$area[0].addEventListener("pointerdown", (function (t) {
            t.stopPropagation()
        }), !1), h.addEventListener("mousedown", c, {passive: !1}, !1), h.addEventListener("touchstart", c, {passive: !1}, !1)
    },
    setSize: function () {
        var t = this.direction,
            e = this.$box["y" === t ? "innerHeight" : "innerWidth"]();
        return e = Math.round(e), this.boxSize = e, this.needSetSize = !1, e
    },
    setClip: function (t) {
        if (void 0 !== t) {
            var e = this.direction,
                i = this.$before,
                n = this.$beforeImage,
                s = this.$after,
                o = this.$afterImage,
                a = this.$handle,
                h = "y" === e ? "height" : "width",
                d = "y" === e ? "top" : "left";
            this.position = Math.max(0, Math.min(100, t)), n.css(h, this.boxSize + "px"), o.css(h, this.boxSize + "px"), i.css(h, this.position + "%"), s.css(h, 100 - this.position + "%"), a.css(d, this.position + "%")
        }
    }
});
"use strict";

function ownKeys(t, i) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var e = Object.getOwnPropertySymbols(t);
        i && (e = e.filter((function (i) {
            return Object.getOwnPropertyDescriptor(t, i).enumerable
        }))), n.push.apply(n, e)
    }
    return n
}

function _objectSpread(t) {
    for (var i = 1; i < arguments.length; i++) {
        var n = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(n), !0).forEach((function (i) {
            _defineProperty(t, i, n[i])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach((function (i) {
            Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i))
        }))
    }
    return t
}

function _defineProperty(t, i, n) {
    return i in t ? Object.defineProperty(t, i, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = n, t
}

flexbe_cli.element.register("rotator01", {
    $rotator: null,
    $list: null,
    $animationElement: null,
    eventId: null,
    animation: null,
    animationId: null,
    speed: null,
    delay: null,
    loop: null,
    animationSet: !1,
    animationStarted: !1,
    completedEvent: null,
    animeFunction: null,
    typedFunction: null,
    maxHeight: 0,
    documentHidden: null,
    documentVisibilityChange: null,
    onInit: function () {
        this.events(), this.clearAnimation(), this.setInitParams()
    },
    onView: function (t) {
        var i = this.animationSet && this.animationStarted;
        this.loaded && (t && !i ? (this.clearAnimation(), this.animationSet = !0, this.setInitParams(), this.startAnimation()) : t && i ? this.restartAnimation() : !t && i && this.pauseAnimation())
    },
    onLoad: function () {
        !this.inView || this.animationSet || this.animationStarted || (this.clearAnimation(), this.animationSet = !0, this.setInitParams(), this.startAnimation())
    },
    onResize: function () {
        this.setMaxHeight(), 0 !== this.maxHeight && (this.clearAnimation(), this.startAnimation())
    },
    onUpdate: function () {
        this.clearAnimation(), this.setInitParams()
    },
    events: function () {
        var t = this;
        void 0 !== document.hidden ? (this.documentHidden = "hidden", this.documentVisibilityChange = "visibilitychange") : void 0 !== document.msHidden ? (this.documentHidden = "msHidden", this.documentVisibilityChange = "msvisibilitychange") : void 0 !== document.webkitHidden && (this.documentHidden = "webkitHidden", this.documentVisibilityChange = "webkitvisibilitychange"), document.addEventListener(this.documentVisibilityChange, this.handleVisibilityChange.bind(this), !1), flexbe_cli.events.on("font_changed." + this.eventId, (function () {
            t.setMaxHeight()
        }))
    },
    handleVisibilityChange: function () {
        var t = this;
        this.animationSet && this.animationStarted && (document[this.documentHidden] ? this.pauseAnimation() : setTimeout((function () {
            return t.restartAnimation()
        }), 100))
    },
    setInitParams: function () {
        this.$rotator = this.$area.find(".text-rotator"), this.$animationElement = this.$rotator.find(".text-animation"), this.animationId = this.$animationElement.attr("data-id"), "typing" === this.animationId ? this.require = ["_s/lib/typed/typed.min.js"] : this.require = ["_s/lib/anime/anime.min.js@320"], this.eventId = "anim_" + this.id, this.maxHeight = 0, this.$rotator.addClass(this.eventId), this.setList(), this.setMaxHeight()
    },
    setList: function () {
        this.$list = this.$area.find(".animation-container").filter((function (t, i) {
            if ("" !== $(i).find(".animate")[0].textContent) return i
        })).each((function (t, i) {
            var n = $(i).find(".animate")[0],
                e = n.textContent;
            n.innerHTML = e.replace(/(<[^>]+>)/g, "")
        }))
    },
    setMaxHeight: function () {
        var t = this;
        null != this.$list && this.$list.length > 0 ? (this.maxHeight = 0, this.$list.each((function (i, n) {
            var e = t.$area.closest(".modal-content").length > 0,
                a = $(n).find(".animate")[0],
                s = a.textContent;
            e && !t.inView ? t.maxHeight = "auto" : "typing" !== t.animationId || t.animation ? ("counter" !== t.animationId && t.breakToWordsAndLetters($(n)), t.maxHeight = Math.max(t.maxHeight, $(n).height()), a.innerHTML = s) : (a.innerText = n.innerText + "|", t.maxHeight = Math.max(t.maxHeight, $(n).height()), a.innerText = n.innerText.slice(0, n.innerText.length - 1))
        }))) : this.maxHeight = +this.$rotator.attr("data-size"), this.$area.find(".rotator-holder").css("height", this.maxHeight)
    },
    setAnimationParams: function () {
        this.$rotator.removeClass("animation-stopped"), this.$rotator.addClass("to-animate"), this.speed = 1 / +this.$animationElement.attr("data-speed"), this.delay = 1e3 * +this.$animationElement.attr("data-delay"), this.loop = "true" === this.$animationElement.attr("data-loop"), this.animation = this.parseAnimation()
    },
    startAnimation: function () {
        this.setAnimationParams();
        var t = this.$list && this.$list.length > 0 || !1,
            i = this.animation && this.animation.id || !1,
            n = this.animeFunction && this.animeFunction.children || !1,
            e = this.typedFunction && this.typedFunction.strings || !1;
        t && i && !this.animationStarted && this.maxHeight > 0 && (this.animationStarted = !0, "typing" === this.animation.id || n ? e || this.startTypingAnimation() : (this.$rotator.removeClass("to-animate"), this.playListItem(0)))
    },
    pauseAnimation: function () {
        var t = this.animeFunction && this.animeFunction.children || !1,
            i = this.typedFunction && this.typedFunction.strings || !1;
        "typing" === this.animationId && i ? this.typedFunction.stop() : t && this.animeFunction.pause()
    },
    restartAnimation: function () {
        var t = this.animeFunction && this.animeFunction.children || !1,
            i = this.typedFunction && this.typedFunction.strings || !1;
        "typing" === this.animationId && i ? this.typedFunction.start() : t && this.animeFunction.play()
    },
    playListItem: function (t) {
        var i = $(this.$list[t]);
        i.addClass("active"), this.onAnimationStart({index: t, $target: i})
    },
    onAnimationStart: function (t) {
        var i = this,
            n = t.index,
            e = t.$target;
        if (this.animation.steps && this.animation.steps.length) {
            var a = ".text-rotator." + this.eventId + " .animation-container.active";
            if (this.animation.replaceString) {
                var s = e.find(".animate")[0],
                    o = s.textContent;
                s.innerHTML = o.replace(/({.+})|(\[([^\]]+)])|([\S]*\(([^)]+)\)\S{0,1})|(?:\S)+/g, "<span class='word'>$&</span>");
                var d,
                    r = "(?:[✀-➿]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[#-9]️?⃣|㊙|㊗|〽|〰|Ⓜ|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|🆎|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|🈚|🈯|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|‼|⁉|[▪-▫]|▶|◀|[◻-◾]|©|®|™|ℹ|🀄|[☀-⛿]|⬅|⬆|⬇|⬛|⬜|⭐|⭕|⌚|⌛|⌨|⏏|[⏩-⏳]|[⏸-⏺]|🃏|⤴|⤵|[←-⇿])",
                    u = new RegExp(r, "g");
                d = u.test(o) ? new RegExp(r + "|([^\\s])", "g") : new RegExp("[^\\s]", "g"), e.find(".word").each((function (t, i) {
                    i.innerHTML = i.textContent.replace(d, "<span class='letter'>$&</span>")
                }))
            }
            this.animeFunction = anime.timeline({loop: 1}), this.animeFunction.id = this.eventId;
            var h = this.animation.steps.map((function (t) {
                return i.parseStep({step: t, container: a})
            }));
            this.loop || n !== this.$list.length - 1 || h.splice(1), h.forEach((function (t) {
                i.animeFunction.add(t)
            })), this.animeFunction.play(), this.animeFunction.finished.then((function () {
                i.onAnimationFinished({index: n, $target: e})
            })).catch((function (t) {
                return console.error(t)
            }))
        }
    },
    onAnimationFinished: function (t) {
        var i = t.index,
            n = t.$target;
        if ("typing" !== this.animationId) {
            var e = i >= this.$list.length - 1;
            if (this.purgeCurrentInstance(), this.animation.replaceString) {
                var a = n.find(".animate")[0],
                    s = a.textContent;
                a.innerHTML = s.replace(/(<[^>]+>)/g, "")
            }
            n.removeAttr("style"), n.find(".animate").removeAttr("style"), this.$rotator.find(".animation-container").removeClass("active"), e ? this.loop ? this.playListItem(0) : (n.addClass("active"), this.clearAnimation(!1, "animation stop")) : this.playListItem(i + 1)
        }
    },
    startTypingAnimation: function () {
        var t = ".text-rotator." + this.eventId + " .typing.active .animate",
            i = [],
            n = new RegExp("(?:[✀-➿]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[#-9]️?⃣|㊙|㊗|〽|〰|Ⓜ|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|🆎|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|🈚|🈯|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|‼|⁉|[▪-▫]|▶|◀|[◻-◾]|©|®|™|ℹ|🀄|[☀-⛿]|⬅|⬆|⬇|⬛|⬜|⭐|⭕|⌚|⌛|⌨|⏏|[⏩-⏳]|[⏸-⏺]|🃏|⤴|⤵|[←-⇿])", "g");
        this.$list.find(".animate").each((function (t, e) {
            var a = e.textContent;
            n.test(a) && (e.innerHTML = e.textContent.replace(n, "`$&`")), i.push(e.innerText)
        })), this.$list.first().removeClass("active").clone().addClass("typing active").appendTo(this.$rotator), this.setList();
        var e = _objectSpread(_objectSpread({}, this.animation), {}, {strings: i});
        this.typedFunction = new Typed(t, e)
    },
    clearAnimation: function (t) {
        void 0 === t && (t = !0);
        var i = this.animeFunction && this.animeFunction.children || !1,
            n = this.typedFunction && this.typedFunction.strings || !1;
        (this.loaded && "typing" !== this.animationId && this.purgeCurrentInstance(), i && (this.animeFunction = null), n) && (this.$rotator.find(".typing").remove(), this.setList(), this.typedFunction.destroy(), this.typedFunction = null);
        if (this.animation && this.animation.id && (this.animation = null, this.animationSet = !1), this.$rotator.length) {
            var e = this.$rotator.find(".animation-container");
            this.$rotator.css("opacity", ""), this.$rotator.addClass("animation-stopped"), e.length && (e.removeClass("active"), t ? (this.animationStarted = !1, e.first().addClass("active")) : e.last().addClass("active"))
        }
    },
    purgeCurrentInstance: function () {
        var t, i = this,
            n = anime.running;
        n.forEach((function (n, e) {
            n.id === i.eventId && (t = e)
        })), "number" == typeof t && n.splice(t, 1)
    },
    parseAnimation: function () {
        var t, i = this;
        if (this.$animationElement.find(".steps")[0]) {
            var n = this.$animationElement.attr("data-default-speed");
            if ("typing" === this.animationId) {
                var e = JSON.parse(this.$animationElement.find(".steps")[0].innerText)[0];
                t = {
                    id: this.animationId,
                    loop: this.loop,
                    typeSpeed: Math.round(this.speed * e.typeSpeedFactor * n),
                    backSpeed: Math.round(this.speed * e.backSpeedFactor * n),
                    backDelay: Math.round(this.delay * e.backDelayFactor),
                    contentType: null,
                    preStringTyped: function () {
                        i.$rotator.removeClass("to-animate")
                    },
                    onStringTyped: function (t) {
                        i.loop || t !== i.$list.length - 2 || setTimeout((function () {
                            i.clearAnimation(!1)
                        }), 180)
                    }
                }
            } else t = {
                defaultSpeed: n,
                steps: JSON.parse(this.$animationElement.find(".steps")[0].innerText),
                speed: this.speed,
                delay: this.delay,
                id: this.animationId,
                loop: this.loop,
                replaceString: "true" === this.$animationElement.attr("data-replace")
            }
        }
        return t
    },
    parseStep: function (t) {
        var i = t.step,
            n = t.container;
        return _objectSpread(_objectSpread({}, i), {}, {
            targets: n + " " + i.targets,
            duration: this.getStepDuration(i),
            delay: this.getStepDelay(i)
        })
    },
    getStepDuration: function (t) {
        return 0 === t.duration ? 0 : Math.round(this.speed * (t.durationFactor ? t.durationFactor : t.duration) * this.animation.defaultSpeed)
    },
    getStepDelay: function (t) {
        if (0 === t.delay) return 0;
        var i = t.delayFactor ? t.delayFactor : 1;
        if (t.delay && t.delay instanceof Object) {
            var n = this.getStepDuration(t) * t.delay.factor;
            return t.delay.increment && t.delay.add ? function (i, e) {
                return t.delay.add + n * (e + t.delay.incrementBy)
            } : t.delay.increment ? function (i, e) {
                return n * (e + t.delay.incrementBy)
            } : t.delay.add ? function (i, e) {
                return t.delay.add + n * e
            } : function (t, i) {
                return n * i
            }
        }
        return Math.round(this.delay * i)
    },
    breakToWordsAndLetters: function (t) {
        var i = t.find(".animate")[0],
            n = i.textContent;
        i.innerHTML = n.replace(/({.+})|(\[([^\]]+)])|([\S]*\(([^)]+)\)\S{0,1})|(?:\S)+/g, "<span class='word'>$&</span>");
        var e,
            a = "(?:[✀-➿]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[#-9]️?⃣|㊙|㊗|〽|〰|Ⓜ|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|🆎|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|🈚|🈯|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|‼|⁉|[▪-▫]|▶|◀|[◻-◾]|©|®|™|ℹ|🀄|[☀-⛿]|⬅|⬆|⬇|⬛|⬜|⭐|⭕|⌚|⌛|⌨|⏏|[⏩-⏳]|[⏸-⏺]|🃏|⤴|⤵|[←-⇿])",
            s = new RegExp(a, "g");
        e = s.test(n) ? new RegExp(a + "|([^\\s])", "g") : new RegExp("[^\\s]", "g"), t.find(".word").each((function (t, i) {
            i.innerHTML = i.textContent.replace(e, "<span class='letter'>$&</span>")
        }))
    }
});
"use strict";
var openedSpoiler = {},
    countSpoiler = {};
flexbe_cli.element.register("spoiler01", {
    onReady: function () {
        var e = this;
        this.$list = this.$area.find(".spoiler-list"), this.$items = this.$area.find(".spoiler-list-item"), this.$lastItem = null, this.isSpoilered = +this.$list.attr("data-spoiler"), countSpoiler[this.id] || (countSpoiler[this.id] = this.$items.length), countSpoiler[this.id] !== this.$items.length && (openedSpoiler[this.id] = [], countSpoiler[this.id] = this.$items.length), openedSpoiler[this.id] || (openedSpoiler[this.id] = []), this.isSpoilered ? openedSpoiler[this.id].forEach((function (t) {
            var i = t && e.$list.find('[uid="' + t + '"]');
            i.length && e.toggleSpoiler(i, !0, !1)
        })) : openedSpoiler[this.id] = [], this.bindEvents()
    },
    bindEvents: function () {
        var e = this;
        if (!this.isSpoilered) return !1;
        var t;
        this.$list.on("mousedown", ".clickable", (function (e) {
            t = (!flexbe_cli.is_admin || !$(e.target).closest(".element-text, .component-image, .editor-simple-handle").length) && (!$(e.target).closest(".not-clickable").length && {
                target: e.currentTarget,
                x: e.screenX,
                y: e.screenY
            })
        })), this.$list.on("mouseup", ".clickable", (function (i) {
            !t || t.target !== i.currentTarget || flexbe_cli.is_admin && $(i.target).closest(".element-text").length || (Math.sqrt(Math.pow(t.x - i.screenX, 2) + Math.pow(t.y - i.screenY, 2)) < 5 && e.toggleSpoiler($(i.currentTarget)), t = !1)
        }))
    },
    toggleSpoiler: function (e, t, i) {
        void 0 === i && (i = !0);
        var s = 0,
            n = e.attr("uid");
        void 0 === t ? t = "true" !== e.attr("data-expanded") : i && (t = !t), t && i ? openedSpoiler[this.id].push(n) : !t && i && (openedSpoiler[this.id] = openedSpoiler[this.id].filter((function (e) {
            return e !== n
        })));
        var o = e.find(".collapsed");
        if (!o[0].inAnimation) {
            o[0].inAnimation = !0;
            var l = e.find(".spoiler-text"),
                r = l.find(".spoiler-text-content"),
                a = o[0].scrollHeight,
                h = i ? Math.max(250, Math.min(400, 3 * a)) : 0;
            if (t) (s = (l.height() - r.innerHeight()) / 2) < 10 && r.css("margin", s + "px 0");
            o.off("transitionend").one("transitionend", (function () {
                o.css("height", "").toggleClass("collapsed--auto", t), o[0].inAnimation = !1
            })), o.css({
                height: a + "px",
                transitionDuration: h + "ms"
            }), t ? o.addClass("collapsed--show") : (o[0].offsetHeight, o.removeClass("collapsed--show").css("height", "0")), e.attr("data-expanded", t), this.$lastItem = e
        }
    }
});
"use strict";
flexbe_cli.element.register("table01", {
    onMsg: function (t) {
        "fix_width" === t && this.fixColsWidth()
    },
    onScreen: function (t) {
        t && this.needSetSize && this.updateSizes()
    },
    onResize: function () {
        this.inScreen ? this.updateSizes() : this.needSetSize = !0
    },
    onVisible: function (t) {
        var e = t.state;
        e && (this.needSetSize = e)
    },
    updateSizes: function () {
        this.needSetSize = !1, this.fixColsWidth(), this.fixAdaptiveColsWidth()
    },
    fixColsWidth: function () {
        var t = this.fixedCols,
            e = this.$area.find(".element-content--main .flexbe-table-container").eq(0),
            i = e.find(".flexbe-table"),
            n = i.find(".flexbe-table__row--first").find(".flexbe-table__cell"),
            a = n.length,
            d = window.pageYOffset;
        t && e.css({"--tableWidth": ""});
        var f = Math.min(e.innerWidth(), i.innerWidth());
        e.css("--tableWidth", "0px");
        var r = n.toArray().map((function (t) {
                var e = t.getAttribute("data-width"),
                    i = !1;
                e && "auto" !== e && (i = !0, e = parseInt(e, 10) || 0), $(t).css("--colWidth", i ? e + "px" : "0px");
                var n = t.getBoundingClientRect();
                return {el: t, width: e, minWidth: Math.ceil(n.width), fixed: i}
            })),
            o = W(r),
            h = W(r = r.map((function (t) {
                return !t.fixed && t.minWidth > o.averageWidth && (t.fixed = !0, t.width = t.minWidth), t
            }))),
            l = h.averageWidth,
            s = h.fixedWidth,
            c = h.fixedCount;
        if (r.forEach((function (t) {
            var e = t.el,
                i = t.fixed,
                n = t.width,
                a = t.minWidth,
                d = i ? n : l;
            $(e).css("--colWidth", Math.max(d, a) + "px")
        })), e.css({"--tableWidth": (a === c ? s : f) + "px"}), t) {
            var u = i.outerWidth(),
                x = e[0].scrollLeft,
                b = Math.max(u - f, 0);
            x > b && (e[0].scrollLeft = b), window.scrollTo(0, d)
        }

        function W(t) {
            var e = t.filter((function (t) {
                    return t.fixed
                })),
                i = e.length,
                n = a - i,
                d = e.reduce((function (t, e) {
                    var i = e.width,
                        n = e.minWidth;
                    return t + Math.max(i, n)
                }), 0);
            return {averageWidth: Math.floor((f - d) / n), fixedWidth: d, fixedCount: i}
        }

        this.fixedCols = !0
    },
    fixAdaptiveColsWidth: function () {
        var t = this.$area.find(".element-content--adaptive").find(".flexbe-table--adaptive-attrs");
        if (t.length) {
            var e = t.eq(0).find(".flexbe-table__row").not(".flexbe-table__row--header, .flexbe-table__row--footer").eq(0).find(".flexbe-table__cell").toArray().map((function (t) {
                    return t.offsetWidth
                })),
                i = e.reduce((function (t, e) {
                    return t + e
                }), 0);
            e = e.map((function (t) {
                return Math.round(t / i * 100)
            })), t.each((function (t, i) {
                $(i).find("colgroup col").each((function (t, i) {
                    i.setAttribute("width", e[t] + "%")
                }))
            }))
        }
        this.fixedAdaptiveCols = !0
    }
});
"use strict";
flexbe_cli.element.register("timer01", {
    sizes: {xs: 33, s: 40, m: 55, l: 80, xl: 1 / 0},
    onReady: function () {
        this.setTimerSize()
    },
    onResize: function () {
        this.setTimerSize()
    },
    onScreen: function (e) {
        e && !this.isViewed && (this.isViewed = !0, this.setTimerSize())
    },
    setTimerSize: function () {
        var e = this,
            i = this.$area.find(".component-timer"),
            t = i.outerWidth() / (i.find(".number").length + i.find(".colon").length),
            s = Object.keys(this.sizes).find((function (i) {
                return e.sizes[i] > t
            }));
        i.attr("data-size", s)
    }
});
"use strict";
flexbe_cli.element.register("zone", {
    onInit: function () {
        this.setMeta()
    },
    onUpdate: function () {
        this.setMeta()
    },
    onResize: function () {
        this.inScreen && this.isVisible && this.fixElementOrder()
    },
    onScreen: function (i) {
        i && this.fixElementOrder()
    },
    setMeta: function () {
        var i = this.lastViewPort,
            t = this.lastVisibility;
        this.lastViewPort = flexbe_cli.resize.width, this.lastVisibility = flexbe_cli.is_admin && $("body").hasClass("show-hidden"), this.needFix = this.needFix || this.lastViewPort !== i || this.lastVisibility !== t
    },
    fixElementOrder: function () {
        (this.setMeta(), this.needFix) && (this.needFix = !1, this.$area.find(".elements-list").each((function (i, t) {
            var e = $(t).find(".element-item"),
                s = e.filter(":visible");
            e.removeClass("is-first-child is-last-child"), s.first().addClass("is-first-child"), s.last().addClass("is-last-child")
        })))
    }
});
"use strict";
flexbe_cli.element.register("zone_cards", {
    onUpdate: function (e) {
        e.originId === e.id && this.fixSwiper(e)
    },
    fixSwiper: function (e) {
        var i = this;
        void 0 === e && (e = {}), clearTimeout(this._changeTimer);
        var t = (flexbe_cli.components.instances[this.id] || []).find((function (e) {
                return "cards" === e.is
            })),
            n = t && t.swiper;
        if (!n) return !1;
        if (document.body.contains(n.el)) {
            if (e && "items_add" === e.reason) {
                var s = n.realIndex,
                    r = e.reasonData.to,
                    a = s;
                s + n.params.slidesPerView <= r && (a = r - n.params.slidesPerView + 1), a !== s && (this._changeTimer = setTimeout((function () {
                    n.slideTo(a)
                }), 30))
            }
            e.styleRendered && n.update(!1)
        } else this._changeTimer = setTimeout((function () {
            i.fixSwiper(e)
        }), 16)
    }
});
"use strict";
flexbe_cli.element.register("zone_gallery", {
    onUpdate: function (e) {
        var i = this;
        void 0 === e && (e = {}), setTimeout((function () {
            var s = flexbe_cli.components.instances[i.id].find((function (e) {
                    return "cards" === e.is
                })),
                r = s && s.swiper;
            if (!r) return !1;
            if (e && "items_add" === e.reason) {
                var n = r.realIndex,
                    t = e.reasonData.to,
                    a = n;
                n + r.params.slidesPerView <= t && (a = t - r.params.slidesPerView + 1), a !== n && r.slideTo(a)
            }
            e.styleRendered && r.update(!1)
        }), 100)
    }
});
"use strict";
flexbe_cli.modal.register("PAY", {
    types: {},
    pay_id: "",
    hash: "",
    selectors: {},
    onLoad: function () {
        var t = this;
        this.start(), flexbe_cli.events.on("pay", (function (e, a) {
            a && "init" === a.action && t.start()
        }))
    },
    start: function () {
        this.loadSelectors();
        var t = this.getPayStatus();
        if (t) {
            switch (t) {
                case "success":
                    this.showSuccessAlert();
                    break;
                case "fail":
                    this.showFailAlert();
                    break;
                case "pay":
                    this.getBill()
            }
            setTimeout((function () {
                flexbe_cli.events.emit("ui_modal_open", {id: "pay"})
            }), 300)
        }
    },
    loadSelectors: function () {
        this.selectors.$container = this.$modal.find(".modal-content"), this.selectors.$bill = this.$modal.find(".action-bill"), this.selectors.$cash = this.$modal.find(".action-cash"), this.selectors.$already = this.$modal.find(".action-already"), this.selectors.$success = this.$modal.find(".action-success"), this.selectors.$fail = this.$modal.find(".action-fail")
    },
    getPayStatus: function () {
        var t = !1;
        try {
            t = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        } catch (t) {
        }
        if (!t.pay_id) return !1;
        if (this.pay_id = t.pay_id, this.hash = t.h, t.pay_status) {
            try {
                history.pushState(null, null, window.location.pathname)
            } catch (t) {
            }
            return t.pay_status
        }
        return "pay"
    },
    getBillData: function (t) {
        this.pay_id && !1 !== this.pay_id && $.ajax({
            url: "mod/pay/ajax",
            type: "GET",
            dataType: "json",
            data: {act: "payData", pay_id: this.pay_id, hash: this.hash}
        }).done((function (e) {
            "function" == typeof t && t(e)
        }))
    },
    getBill: function () {
        var t = this;
        this.pay_id && !1 !== this.pay_id && this.getBillData((function (e) {
            if (0 === e.status) return !1;
            t.types = e.pay.support_types, 2 == +e.pay.pay_status ? t.showAlreadyPayed(e.pay) : t.cashonly() ? t.showCashInstruction(e.pay) : t.showBillForm(e.pay)
        }))
    },
    showBillForm: function (t) {
        var e = this;
        this.selectors.$container.attr("data-type", "bill");
        var a = this.selectors.$bill.find(".pay-methods-list-inner").empty(),
            s = this.selectors.$container.find(".pay-action"),
            i = this.selectors.$bill.find(".component-button"),
            n = {
                cash: "cash",
                bank_card: "cards",
                visa: "visa",
                mastercard: "mastercard",
                yandex: "yandex",
                qiwi: "qiwi",
                webmoney: "webmoney",
                webmoney_z: "webmoney",
                webmoney_u: "webmoney",
                mobile_megafon: "megafon",
                mobile_beeline: "bee",
                mobile_mts: "mts",
                mobile_tele2: "t2",
                sberbank: "sberbank",
                bank: "bank",
                w1: "w1",
                ibank_robo: "ibank_robo",
                yandex_kassa: "yandexkassa",
                yandexkassa: "yandexkassa",
                bank_company: "bank_company",
                paypal: "paypal"
            };
        Object.entries(this.types).forEach((function (t, e) {
            var s = t[0],
                i = (t[1], n[s]),
                o = flexbe_cli.locale.tr("pay.methods." + s),
                c = '<label class="item" data-type="' + s + '" title="' + o + '" for="' + s + '">\n                <input type="radio" name="form[pay_method]" value="' + s + '" id="' + s + '" ' + (0 === e ? 'checked="checked"' : "") + '>\n                <div class="item-inner">\n                        <span class="check"></span>\n\n                        <span class="icon">\n                            <img class="icon-inner" src="_s/images/v3/theme/res/pay/' + i + '.svg" />\n                        </span>\n\n                        <span class="item-name font-size-tiny">' + o + "</span>\n                </div>\n            </label>";
            a.append(c)
        })), s.find(".title >span.num").text(t.pay_id), s.find(".price").text(flexbe_cli.locale.formatMoney(t.pay_sum)), Object.keys(this.types).length <= 1 && this.selectors.$bill.find(".pay-methods .title").hide(), a.on("click", ".item", (function (t) {
            return t.preventDefault(), $(t.currentTarget).find("input").prop("checked", !0), i.removeClass("disabled"), !1
        })), i.on("click", (function (t) {
            var s = a.find("input:checked").val();
            if (!s) return a.removeClass("shake"), setTimeout((function () {
                a.addClass("shake")
            }), 30), !1;
            if ("cash" === s) return e.showCashInstruction(), !1;
            var i = "/mod/pay/?pay_type=" + s + "&pay_id=" + e.pay_id + "&h=" + e.hash;
            $(t.currentTarget).attr("href", i), flexbe_cli.run.is_mobile && flexbe_cli.run.is_OSX || $(t.currentTarget).addClass("submitting")
        }))
    },
    showCashInstruction: function () {
        this.selectors.$container.attr("data-type", "cash"), this.types.cash && this.types.cash.instruction && this.selectors.$cash.find(".text").html(this.types.cash.instruction), $.ajax({
            url: "mod/pay/ajax",
            type: "GET",
            dataType: "json",
            data: {act: "selectCash", pay_id: this.pay_id, hash: this.hash}
        })
    },
    showAlreadyPayed: function (t) {
        this.selectors.$container.attr("data-type", "already");
        var e = this.selectors.$container.find(".pay-action"),
            a = "";
        "0" != t.pay_time_done && t.pay_time_done_formatted && (a = t.pay_time_done_formatted), this.selectors.$already.find(".text >span.num").text(t.pay_id), e.find(".title >span.num").text(t.pay_id), e.find(".sub > span").text(a), e.find(".price").text(flexbe_cli.locale.formatMoney(t.pay_sum))
    },
    showSuccessAlert: function () {
        setTimeout((function () {
            flexbe_cli.stat.reachGoal(flexbe_cli.stat.goals.pay_done)
        }), 1e3), this.selectors.$container.attr("data-type", "success")
    },
    showFailAlert: function () {
        var t = this;
        this.selectors.$container.attr("data-type", "fail"), this.getBillData((function (e) {
            var a = t.selectors.$container.find(".pay-action");
            a.find(".title >span.num").text(e.pay.pay_id), a.find(".price").text(flexbe_cli.locale.formatMoney(e.pay.pay_sum)), t.selectors.$fail.find(".component-button").off("click").on("click", (function () {
                t.getBill()
            }))
        }))
    },
    cashonly: function () {
        return this.types.cash && 1 === Object.keys(this.types).length
    }
});
"use strict";

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var i = 1; i < arguments.length; i++) {
            var e = arguments[i];
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s])
        }
        return t
    }).apply(this, arguments)
}

flexbe_cli.widget.register("ANCHORS", {
    require: ["_s/lib/anime/anime.min.js@320"],
    $list: null,
    onLoad: function () {
        var t = this;
        this.$list = this.$widget.find(".anchors-list"), this.list = "object" == typeof this.$list.data("anchors") && this.$list.data("anchors").list || [];
        var i = _extends({style: 1, show_title: 0}, this.$list.data("anchors"));
        this.style = i.style, this.show_title = i.show_title, this.$list.removeAttr("data-anchors"), flexbe_cli.run.is_mobile || (this.drawList(), this.bindEvents(), flexbe_cli.is_admin && flexbe_cli.events.off("layout_change.anchors").on("layout_change.anchors", (function (i, e) {
            "block" === e.is && t.drawList()
        })))
    },
    check: function () {
        var t = flexbe_cli.block.$blocks.not('[data-b-type*="overflow"]');
        this.list = this.list.filter((function (i) {
            return !(!i.enabled || !t.closest('[data-id="' + i.id + '"]')[0])
        }))
    },
    drawList: function () {
        var t = this;
        flexbe_cli.block.$blocks.length || this.$list.hide(), this.check();
        var i = "";
        flexbe_cli.is_admin && this.list.length < 2 ? i = '<svg style="color: #adadad" width="18" height="98" viewBox="0 0 18 98" xmlns="http://www.w3.org/2000/svg">\n                <g fill="none" fill-rule="evenodd">\n                    <circle opacity=".05" cx="9" cy="5" r="5"/>\n                    <circle opacity=".2" cx="9" cy="25" r="5"/>\n                    <circle opacity=".2" cx="9" cy="73" r="5"/>\n                    <circle opacity=".05" cx="9" cy="93" r="5"/>\n                    <path d="M9 40a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm5.126 9.626h-4.5v4.5H8.34v-4.5h-4.5V48.34h4.5v-4.5h1.286v4.5h4.5v1.286z" opacity=".45"/>\n                </g>\n            </svg>' : this.list.length >= 2 && (this.list.forEach((function (e) {
            var s = t.show_title && e.title ? ' data-title="' + e.title + '"' : "";
            i += "<li" + s + '><a href="#' + e.id + '"></a></li>'
        })), i += '<li class="helper"><a></a></li>'), this.$list.find("ul").html(i), this.$helper = this.$list.find(".helper"), this.animateList()
    },
    animateList: function () {
        var t = this;
        if (!(this.list.length < 1)) {
            if (flexbe_cli.is_admin) this.$helper.css({opacity: 1, transform: "translateY(" + 24 * this.index + "px)"});
            else {
                var i = anime({
                    targets: this.$list.find("li").not(this.$helper).get(),
                    duration: 350,
                    opacity: [0, 1],
                    scale: [.8, 1],
                    translateY: [10, 0],
                    easing: "easeInOutQuad",
                    autoplay: !1,
                    delay: function (t, i) {
                        return 30 * i
                    },
                    complete: function () {
                        anime({
                            targets: t.$helper.get(),
                            duration: 400,
                            translateY: 24 * t.index,
                            scale: [2.5, 1],
                            opacity: [0, 1],
                            easing: "easeInExpo"
                        })
                    }
                });
                this.$list.addClass("hide"), setTimeout((function () {
                    t.$list.removeClass("hide"), i.play()
                }), 800)
            }
            this.$list.find("li").removeClass("active").eq(this.index).addClass("active")
        }
    },
    index: 0,
    bindEvents: function () {
        var t = this;
        flexbe_cli.events.off("entity_event.anchors").on("entity_event.anchors", (function (i, e) {
            var s = e.type,
                a = e.core,
                n = e.params;
            "onFocus" === s && n.state && "block" === a.is && t.setBlock(a)
        })), flexbe_cli.block.$blocks.each((function (i, e) {
            var s = e._core;
            s && s.inFocus && t.setBlock(s)
        })), this.$list.on("click", "li", (function (t) {
            if (!$(t.target).is("a")) return $(t.currentTarget).find("[href]").trigger("click"), t.preventDefault(), !1
        }))
    },
    setBlock: function (t) {
        this.$list.css("color", t.tween.color);
        var i = this.index;
        this.list.some((function (e, s) {
            return +e.id == +t.id && (i = s, !0)
        })), (i = Math.max(0, Math.min(this.list.length - 1, i))) !== this.index && (this.animate(i), this.index = i)
    },
    animate: function (t) {
        var i = this;
        if (this.$list.find("li").removeClass("active"), this.$list.find("li").eq(t).addClass("active"), 1 == +this.style) {
            var e = 24 * t,
                s = t - this.index > 0 ? 12 : -12;
            anime.remove(this.$helper[0]), anime({
                targets: this.$helper[0],
                translateY: e - s,
                scaleY: 2.5,
                scaleX: .6,
                duration: 100,
                easing: "easeInQuad",
                complete: function () {
                    anime({
                        targets: i.$helper[0],
                        translateY: e,
                        scaleY: 1,
                        scaleX: 1,
                        duration: 100,
                        easing: "easeOutQuad"
                    })
                }
            })
        }
    }
});
"use strict";
flexbe_cli.widget.register("CART", {
    $list: null,
    $sum: null,
    $button: null,
    $buttonCount: null,
    get list() {
        return flexbe_cli.widget.cart.getList()
    },
    get count() {
        return flexbe_cli.widget.cart.getCount()
    },
    get total() {
        return flexbe_cli.widget.cart.getTotal()
    },
    onInit: function () {
        var t = this;
        this.$container = this.$widget.find(".widget-data"), this.$form = this.$widget.find(".component-form "), this.$list = this.$widget.find(".order-list"), this.$delivery = this.$widget.find(".cart-checkout-delivery"), this.$button = this.$widget.find(".cart-button"), this.$buttonCount = this.$button.find(".cart-button-count"), this.$total = this.$widget.find(".cart-checkout-summary__price"), this.$subtotal = this.$widget.find(".cart-checkout-subtotal__price"), this.$shipping = this.$widget.find(".cart-checkout-shipping__price"), this.$count = this.$widget.find(".cart-checkout-count__value"), this.$shippingNotFix = this.$widget.find(".cart-shipping__not-fix-total"), this.$untilFree = this.$widget.find(".cart-delivery-free"), this.$minTotal = this.$widget.find(".cart-min-total"), this.hasDelivery = this.$form.find('[data-type="delivery"]').length > 0, this.isAutoOpen = this.$container.data("autoOpen"), this.minTotal = this.$container.data("minTotal"), this.$formButton = this.$form.find(".form-submit");
        var e = flexbe_cli.widget.cart.delivery.methods.filter((function (e) {
            return e.useMinTotal && t.minTotal < +e.prices[0].from
        }));
        e.length ? this.arrMinDelivery = e.map((function (e) {
            return e.$item = t.$form.find('[data-delivery="' + e.id + '"]'), e
        })) : this.arrMinDelivery = [], this.$formButton.find(".component-button").append('<div class="flexbe-tooltip" data-value=""></div>'), this.$tooltipster = this.$formButton.find(".flexbe-tooltip")
    },
    onUpdate: function () {
        this.onInit(), this.isOpen && (this.$container.addClass("fade-in noanimate"), this.open())
    },
    onLoad: function () {
        this.events(), this.popstate(), this.formInit(), this.renderButton(), this.isOpen && this.renderList()
    },
    onUpdateList: function () {
        this.updatePrices(), this.isOpen && this.renderList()
    },
    onItemsAdd: function () {
        var t = this;
        this.$button.removeClass("blink"), this.$button.outerWidth(), this.$button.addClass("blink"), this.updatePrices(), this.isOpen && this.renderList(), this.isAutoOpen && 1 === this.count && setTimeout((function () {
            t.open()
        }), 200)
    },
    onItemsRemove: function () {
        this.updatePrices(), this.isOpen && this.renderList()
    },
    onResetList: function () {
        this.updatePrices()
    },
    onUpdateCount: function () {
        this.updatePrices()
    },
    onDeliveryChange: function () {
        this.updatePrices()
    },
    formInit: function () {
        var t = this,
            e = flexbe_cli.components.instances[this.id];
        (e = e.filter((function (t) {
            return "form" === t.is
        }))).forEach((function (e) {
            t.form = e, e.defineBeforeSend((function () {
                var i = [].concat(t.list),
                    n = flexbe_cli.widget.cart.delivery.getActive(),
                    o = t.hasDelivery && n.price.untilMinTotal;
                if (t.minTotal && t.minTotal > t.total || o) return !1;
                t.hasDelivery && n && i.push({
                    id: "delivery:" + n.id,
                    type: "delivery",
                    title: n.title,
                    img: "",
                    price: n.price.current,
                    count: 1
                }), e.addItems(i)
            })), e.defineAfterSent((function () {
                flexbe_cli.is_admin || t.close(), flexbe_cli.stat.ecommerce.purchase(t.list), flexbe_cli.widget.cart.dispatch("resetList")
            }))
        }))
    },
    events: function () {
        var t = this;
        flexbe_cli.events.off("ui_cart_open.cart-widget").on("ui_cart_open.cart-widget", (function () {
            t.open()
        })), flexbe_cli.events.off("ui_cart_close.cart-widget").on("ui_cart_close.cart-widget", (function () {
            t.close()
        })), flexbe_cli.widget.cart.off("dispatch.cart-widget").on("dispatch.cart-widget", (function (e, i) {
            var n = i.name;
            "updateList" === n ? t.onUpdateList() : "updateCount" === n ? t.onUpdateCount() : "addItem" === n ? t.onItemsAdd() : "removeItem" === n ? t.onItemsRemove() : "resetList" === n && t.onResetList()
        })), flexbe_cli.widget.cart.delivery.off("dispatch.cart-widget").on("dispatch.cart-widget", (function (e, i) {
            "selectMethod" === i.name && t.onDeliveryChange()
        })), this.$widget.off("click.cart-button").on("click.cart-button", ".cart-button", (function () {
            t.isOpen ? t.close() : t.open()
        })), this.$container.off("click.close-button").on("click.close-button", "a.close", (function (e) {
            e.target === e.currentTarget && t.close()
        }));
        var e, i, n = function () {
            return !flexbe_cli.is_admin || !(window.parent.flexbe.modal.visible || []).length
        };
        this.$container.off(".close-overlay").on("mouseup.close-overlay mousedown.close-overlay", '[data-overlay="true"]', (function (o) {
            if (n()) return "mousedown" === o.type ? (e = o.target, void (i = o.target.clientWidth <= o.pageX)) : void (o.target !== e || o.target !== o.currentTarget || i || (e = null, t.close()))
        })), $(document).off("keyup.cart_esc_close").on("keyup.cart_esc_close", (function (e) {
            27 === e.which && n() && t.close()
        })), $(window).on("popstate", (function () {
            t.popstate()
        })), this.$list.off("click").on("click", "[data-action]", (function (t) {
            var e = $(t.currentTarget).closest("li").attr("data-id"),
                i = flexbe_cli.widget.cart.getItem(e),
                n = $(t.currentTarget).attr("data-action");
            e && i && ("remove" === n || "-" === n && 1 === i.count ? flexbe_cli.widget.cart.dispatch("removeItem", e) : flexbe_cli.widget.cart.dispatch("updateCount", {
                id: e,
                count: n
            }))
        })), this.$list.off("input blur").on("input blur", "input.count", (function (t) {
            var e = $(t.currentTarget).closest("li").attr("data-id"),
                i = +t.currentTarget.value || 0,
                n = "blur" === t.type || "focusout" === t.type;
            i || n && "" === t.currentTarget.value ? flexbe_cli.widget.cart.dispatch("updateCount", {
                id: e,
                count: i
            }) : n && flexbe_cli.widget.cart.dispatch("removeItem", e)
        }))
    },
    open: function () {
        this.isOpen = !0, flexbe_cli.block.pushOverlay("cart", !0), this.oldHash = !1, flexbe_cli.is_admin ? this.$container.addClass("is-editor") : (this.$button.addClass("hide"), /customer_cart/.test(location.hash) || (/^#{1,2}/.test(location.hash) && (this.oldHash = location.hash), history.pushState(null, null, "#customer_cart"))), this._onOpen(), this.updatePrices(), this.renderList(), flexbe_cli.scroll.scrollLock.lock(), this.$area.addClass("show"), this.$container.hasClass("noanimate") ? (this.$container.addClass("show fade-in"), this.$container.removeClass("noanimate")) : (this.$container.addClass("show"), this.$container.outerHeight(), this.$container.addClass("fade-in"), this.$container.removeClass("noanimate")), this._tween(), flexbe_cli.events.emit("cart_opened")
    },
    close: function () {
        var t = this;
        $(window).off("keyup.cart_esc_close"), flexbe_cli.block.removeOverlay("cart"), this.isOpen && (this.isOpen = !1, flexbe_cli.scroll.scrollLock.unlock(), this.$area.removeClass("show"), this.$button.removeClass("hide"), this.$container.removeClass("fade-in"), this.$container.addClass("fade-out"), this._onClose(), /customer_cart/.test(location.hash) && (this.oldHash ? history.replaceState(null, null, this.oldHash) : (flexbe_cli.lockPopstate = !0, history.replaceState(null, null, "#"), flexbe_cli.lockPopstate = !1)), setTimeout((function () {
            t.$container.removeClass("fade-out show noanimate")
        }), 350), this._tween(), flexbe_cli.events.emit("cart_closed"))
    },
    popstate: function () {
        var t = this;
        if (flexbe_cli.is_admin || flexbe_cli.lockPopstate) return !1;
        setTimeout((function () {
            /customer_cart/.test(location.hash) ? t.open() : t.close()
        }), 30)
    },
    renderList: function () {
        this.listRendered = !0;
        var t = "";
        this.list.length ? (this.list.forEach((function (e) {
            t += function (t) {
                return '\n                <li class="order-item" data-id="' + t.id + '">\n                    <div class="img-holder">\n                        <div class="img" ' + (t.img ? 'style="background-image: url(' + t.img + ')"' : "") + '></div>\n                    </div>\n\n                    <div class="content-holder">\n                        <div class="flex-line item-title-outer">\n\n                        <div class="item-title">' + (t.title || "–") + '</div>\n                            <a class="close-times" data-action="remove"></a>\n                        </div>\n\n                        <div class="flex-line item-count-outer">\n                            <div class="item-count">\n                                <a data-action="-"></a>\n                                <input type="number" class="count" min="0" value="' + t.count + '"/>\n                                <a data-action="+"></a>\n                            </div>\n\n                            <div class="cart-price">                           \n                                ' + flexbe_cli.locale.formatMoney(t.price * t.count) + "\n                            </div>\n                        </div>\n                    </div>\n                </li>"
            }(e)
        })), this.$container.removeClass("cart-is-empty")) : this.$container.addClass("cart-is-empty"), this.$list.html(t)
    },
    renderButton: function () {
        this.$buttonCount.text(this.count), this.$button.toggleClass("hidden", 0 === this.count || $(".header-cart-button-holder").length > 0)
    },
    updatePrices: function () {
        var t = this,
            e = this,
            i = this.list,
            n = this.count,
            o = this.total,
            s = this.hasDelivery,
            a = flexbe_cli.widget.cart.delivery.getPrice(),
            l = this.$formButton,
            r = a.freeFrom ? a.useNotFixTotal && a.untilFree : a.useNotFixTotal,
            c = r ? "⏤" : a.currentFormatted;
        this.renderButton(), this.listRendered && i.forEach((function (e) {
            var i = t.$list.find('[data-id="' + e.id + '"]');
            i.find(".count").val(e.count), i.find(".cart-price").text(flexbe_cli.locale.formatMoney(e.price * e.count, {freeLabel: !0}))
        })), this.arrMinDelivery.length && this.arrMinDelivery.forEach((function (t) {
            return t.$item.toggleClass("form-field-delivery-item--blocked", !(t.prices[0].from <= e.total))
        })), this.$shipping.text(c), this.$subtotal.text(flexbe_cli.locale.formatMoney(o, {freeLabel: !0})), this.$shippingNotFix.toggleClass("show", !!r);
        var d = s ? o + a.current : o;
        flexbe_cli.locale.animateNumber({
            target: this.$total,
            to: d,
            asMoney: !0
        }), this.$count.text(n), this.$container.find(".product-count .count").text(n), this.$delivery.toggleClass("hide", !s);
        var u = this.minTotal - this.total,
            h = this.minTotal > a.minTotal,
            f = h && u > 0,
            m = f || a.untilMinTotal;
        l.toggleClass("disabled", !!m), this.$tooltipster.toggleClass("show", !!m);
        var p = l.hasClass("disabled");
        if (p) {
            var g = flexbe_cli.locale.tr("cart.min_total_tip") + " " + flexbe_cli.locale.formatMoney(this.minTotal, {freeLabel: !0}),
                v = flexbe_cli.locale.tr("cart.min_total_delivery_tip") + " " + a.minTotalFormatted,
                b = f ? g : v;
            this.$tooltipster.toggleClass("big", !f), b !== this.tipText && (this.tipText = b, this.$tooltipster.attr("data-value", b))
        }
        if (p ? l.off("click.disabled").on("click.disabled", (function () {
            setTimeout((function () {
                l.addClass("shake"), setTimeout((function () {
                    l.removeClass("shake")
                }), 500)
            }), 30)
        })) : l.off("click.disabled"), this.minTotal && this.$minTotal.length && (this.$minTotal.toggleClass("show", f), this.$minTotal.find(".min-total__total").text(flexbe_cli.locale.formatMoney(this.minTotal, {freeLabel: !0})), flexbe_cli.locale.animateNumber({
            target: this.$minTotal.find(".min-total__count"),
            to: u,
            asMoney: !0,
            freeLabel: !1
        })), s && this.$untilFree.length) {
            var $ = a.untilMinTotal / a.minTotal * 100,
                _ = a.untilFree / a.freeFrom * 100,
                x = a.untilMinTotal ? $ : _,
                w = (a.untilFree || a.untilMinTotal) && (!(u > 0) || !h);
            this.$untilFree.toggleClass("show", !!w), this.$untilFree.toggleClass("show-min-total", !!a.untilMinTotal), this.$untilFree.find(".progress-path").attr("stroke-dashoffset", x), flexbe_cli.locale.animateNumber({
                target: this.$untilFree.find(".delivery-free__count"),
                to: a.untilFree,
                asMoney: !0,
                freeLabel: !1
            }), flexbe_cli.locale.animateNumber({
                target: this.$untilFree.find(".delivery-min-total__count"),
                to: a.untilMinTotal,
                asMoney: !0,
                freeLabel: !1
            })
        }
    }
});
"use strict";
!function () {
    var e = {
            hidden: "hidden-all-m",
            navCreated: "mobile-navigation--created",
            cartContainer: "nav-header-controls--cart",
            burgerContainer: "nav-header-controls--burger"
        },
        t = {
            block: ".b_block",
            element: ".element-item",
            nav: ".mobile-navigation",
            header: ".header-wrapper",
            cartBtn: ".widget-list .cart-button",
            headerCartBtn: ".header-cart-button",
            navbar: ".nav-header",
            navbarContent: ".nav-header-content",
            navbarControls: ".nav-header-controls",
            navmenu: ".nav-menu",
            navmenuItem: ".nav-menu-item"
        },
        n = function (n, a) {
            void 0 === a && (a = !1);
            var i = $(n);
            if (!i.is(t.element)) {
                var s = i.closest(t.element);
                i = s.length ? s : i
            }
            i.toggleClass(e.hidden, !a)
        };
    flexbe_cli.widget.register("MENU01", {
        created: {},
        onLoad: function () {
            this.createWidget()
        },
        createWidget: function () {
            var a = this;
            this.clickEvent = "click", this.navbarStyle = !1, this.navmenuCreated = !1;
            var i = flexbe_cli.block.$list,
                s = $(t.block);
            n(i.find("." + e.hidden), !0);
            var o = s.not(".responsive-hide-mobile").slice(0, 3).find(t.header);
            if ((o = o.filter((function (e, t) {
                var n = $(t).offset();
                return n && n.top < flexbe_cli.resize.height
            }))).length) {
                var r = o.eq(0).attr("data-fixed-color") || "light",
                    c = o.eq(0).attr("data-fixed-contrast") || "dark",
                    l = o.eq(0).hasClass("floating-header");
                this.menuFixed = l, this.cssBackground = r, this.background = r, this.contrast = c, ["light", "dark"].includes(r) && (this.cssBackground = "light" === r ? "#FFF" : "#000"), o.length > 1 && (o = o.filter((function (e, t) {
                    return $(t).attr("data-fixed-contrast") === c
                })))
            }
            if (this.$source = o, this.$nav = this.$area.find(t.nav), this.$navbar = this.$area.find(t.navbar), this.$navmenu = this.$area.find(t.navmenu), this.fillNavmenu(), this.fillNavbar(), this.navbarStyle) {
                if (this.background || this.cssBackground)
                    if (["light", "dark"].includes(this.background)) this.$nav.attr("data-color", this.background);
                    else if (this.cssBackground) {
                        this.$navbar.css("background-color", this.cssBackground), this.$navmenu.css("background-color", this.cssBackground);
                        var d = $("head"),
                            u = d.find('meta[name="theme-color"]');
                        u.length ? u.attr("content", this.cssBackground) : d.append('<meta name="theme-color" content="' + this.cssBackground + '"/>')
                    }
                if (this.created.logo && flexbe_cli.run.is_android) {
                    var h = this.$nav.find(".component-logo-img"),
                        g = h.css("background-image");
                    h.css("background-image", "none"), setTimeout((function () {
                        h.css("background-image", g)
                    }), 50)
                }
                this.contrast ? this.$nav.attr("data-contrast", this.contrast) : this.color && this.$nav.css("color", this.color), this.menuFixed && this.$nav.addClass("menu-fixed"), this.animationMobileShow()
            }
            this.navmenuCreated && (flexbe_cli.events.off("ui_mobilemenu_open").on("ui_mobilemenu_open", (function () {
                a.openMenu()
            })), flexbe_cli.events.off("ui_mobilemenu_close").on("ui_mobilemenu_close", (function () {
                a.closeMenu()
            }))), $(window).off("resized.wigetmenu").on("resized.wigetmenu", (function () {
                a.animationMobileShow()
            }))
        },
        animationMobileShow: function () {
            var t = this,
                a = flexbe_cli.block.$list;
            setTimeout((function () {
                t.$nav.addClass(e.navCreated + " header-style-" + t.navbarStyle);
                var i = t.$navbar.outerHeight();
                t.$source.find(".elements-list").each((function (e, t) {
                    t.offsetHeight < 40 && n(t.closest(".header-area, .b_block"), !1)
                })), "panel" === t.navbarStyle && a.eq(0).css("paddingTop", i + "px")
            }), 10)
        },
        fillNavbar: function () {
            var a = this,
                i = a.created,
                s = a.$navbar,
                o = a.$source,
                r = a.navmenuCreated,
                c = s.find(t.navbarContent),
                l = s.find(t.navbarControls);
            c.empty(), l.empty();
            var d = [],
                u = [];
            !function () {
                var s = $(t.cartBtn).eq(0),
                    o = $(t.headerCartBtn).eq(0);
                if (o.length || s.length) {
                    i.cart = !0, u.push("cart");
                    var r, c, d, h = s.find("svg"),
                        g = s.find(".cart-button-count"),
                        v = o.find("svg"),
                        b = o.find(".header-cart-button-count");
                    r = v.length ? v.html() : h.html(), b.length ? (c = b.css("color"), "rgba(0, 0, 0, 0)" === (d = b.css("background-color")) && (c = "rgb(255, 255, 255, 1)", d = "rgb(234, 127, 84, 1)")) : (c = g.css("color"), d = g.css("background-color"));
                    var f = '\n                        <li class="' + e.cartContainer + '">\n                            <div class="cart-button hidden">\n                                <svg class="cart-button-icon">\n                                    ' + r + '\n                                </svg>\n                                <div class="cart-button-count" style="color: ' + c + "; background: " + d + '">0</div>\n                            </div>\n                        </li>';
                    a.$cart = $(f), l.append(a.$cart), n(s, !1), o.length || a.background || (a.color = s.css("color"), a.cssBackground = s.css("background-color"), a.background = a.cssBackground)
                } else i.cart = !1;
                if (i.cart) {
                    var m = flexbe_cli.widget.cart,
                        k = a.$area.find(".cart-button"),
                        p = k.find(".cart-button-count");
                    l.toggleClass("cart-empty", !m.getCount()), p.text(m.getCount()), a.$cart.on(a.clickEvent, (function () {
                        a.toggleMenu(!1), flexbe_cli.events.emit("ui_cart_open")
                    })), flexbe_cli.widget.cart.off("dispatch.mobilemenu").on("dispatch.mobilemenu", (function (e, t) {
                        var n = t.name;
                        l.toggleClass("cart-empty", !m.getCount()), p.text(m.getCount()), "addItem" === n && (k.addClass("blink"), setTimeout((function () {
                            k.removeClass("blink")
                        }), 300))
                    }))
                }
                i.cart
            }(),
                function () {
                    r ? (a.$burger = $('<li class="' + e.burgerContainer + '"><i></i><i></i><i></i></li>'), l.append(a.$burger), u.push("burger"), a.$burger.on(a.clickEvent, (function () {
                        a.toggleMenu()
                    })), i.burger = !0) : i.burger = !1;
                    i.burger
                }(), this.$nav.attr("data-enabled", !!u.length), u.length && function () {
                var e = o.find(".component-logo").eq(0);
                if (e.length) {
                    var t = 40 / Math.max(.25, e.innerHeight() / e.innerWidth()),
                        a = e.clone();
                    i.logo = !0, a.css({fontSize: "", maxWidth: t + "px"}), c.append(a), d.push("logo"), n(e, !1)
                } else i.logo = !1;
                i.logo
            }(), d.length && u.length || u.length > 1 ? this.navbarStyle = "panel" : 0 === d.length && 1 === u.length ? (this.navbarStyle = "round", this.menuFixed = !0) : this.navbarStyle = !1
        },
        fillNavmenu: function () {
            var e = this.created,
                a = this.$source;
            return this.$navmenu.find(t.navmenuItem).each((function (t, i) {
                var s = $(i),
                    o = s.attr("data-element"),
                    r = a.find('[data-e-id="' + o + '"]'),
                    c = r.length,
                    l = s.hasClass("nav-menu-item--cart"),
                    d = s.hasClass("nav-menu-item--spacer");
                if (c) {
                    if (!l && !d) {
                        var u = r.clone();
                        u.attr("data-cloned", !0), s.append(u), s.find('[data-direction="row"]').attr("data-direction", "column"), s.find(".element-content").removeClass("justify-content-center justify-content-end").addClass("justify-content-start")
                    }
                    n(r, !1), e[o] = e[o] ? e[o] + c : c
                }
            })), this.navmenuCreated = Object.keys(e).length, this.navmenuCreated
        },
        toggleMenu: function (e) {
            this[(e = void 0 === e ? !(e = [!0, "true"].includes(this.$nav.attr("data-opened"))) : !!e) ? "openMenu" : "closeMenu"]()
        },
        openMenu: function () {
            var e = this;
            this.isOpen = !0, this.$area.addClass("show"), this.$nav.outerHeight(), this.$nav.attr("data-opened", !0), this.$navmenu.addClass("active"), this.$burger && this.$burger.addClass("active"), flexbe_cli.scroll.scrollLock.lock(), flexbe_cli.block.pushOverlay("mobilemenu"), this._tween(), this.setAreaSize(), $(window).on("resized.mobilemenu", (function () {
                e.setAreaSize()
            })), flexbe_cli.run.is_screen_all_mobile && ($("body").addClass("is-widget-open").css("background", this.cssBackground), this.menuFixed || $("body, html").scrollTop(0))
        },
        closeMenu: function () {
            this.isOpen = !1, flexbe_cli.run.is_screen_all_mobile && ($("body").removeClass("is-widget-open").css("background", ""), Array.from(this.$navmenu.find(".folder-item")).forEach((function (e) {
                $(e).removeClass("show"), $(e.lastElementChild).slideUp(0)
            }))), this.$area.removeClass("show"), this.$area.css("height", ""), this.$nav.attr("data-opened", !1), this.$navmenu.removeClass("active"), this.$burger && this.$burger.removeClass("active"), flexbe_cli.scroll.scrollLock.unlock(), flexbe_cli.block.removeOverlay("mobilemenu"), $(window).off("resized.mobilemenu"), this._tween()
        },
        setAreaSize: function () {
            var e = this.isOpen ? flexbe_cli.resize.height + "px" : "";
            this.$area.css("height", e)
        }
    })
}();
