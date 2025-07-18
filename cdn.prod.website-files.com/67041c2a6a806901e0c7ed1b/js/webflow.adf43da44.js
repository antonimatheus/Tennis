/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var zv = Object.create;
  var Pn = Object.defineProperty;
  var jv = Object.getOwnPropertyDescriptor;
  var Kv = Object.getOwnPropertyNames;
  var Yv = Object.getPrototypeOf,
    Qv = Object.prototype.hasOwnProperty;
  var ye = (e, t) => () => (e && (t = e((e = 0))), t);
  var f = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    De = (e, t) => {
      for (var n in t) Pn(e, n, { get: t[n], enumerable: !0 });
    },
    da = (e, t, n, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of Kv(t))
          !Qv.call(e, i) &&
            i !== n &&
            Pn(e, i, {
              get: () => t[i],
              enumerable: !(r = jv(t, i)) || r.enumerable,
            });
      return e;
    };
  var de = (e, t, n) => (
      (n = e != null ? zv(Yv(e)) : {}),
      da(
        t || !e || !e.__esModule
          ? Pn(n, "default", { value: e, enumerable: !0 })
          : n,
        e
      )
    ),
    Qe = (e) => da(Pn({}, "__esModule", { value: !0 }), e);
  var pa = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let r = function (a) {
          let u = window.getComputedStyle(a, null),
            l = u.getPropertyValue("position"),
            m = u.getPropertyValue("overflow"),
            v = u.getPropertyValue("display");
          (!l || l === "static") && (a.style.position = "relative"),
            m !== "hidden" && (a.style.overflow = "hidden"),
            (!v || v === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            l = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let m in l)
            u.getPropertyValue(m) !== l[m] && (a.style[m] = l[m]);
        },
        o = function (a) {
          let u = a.parentNode;
          r(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let l = a[u].nodeName.toLowerCase();
            if (l === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              l === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var ha = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(r) {
        Webflow.env("design") ||
          ($("video").each(function () {
            r && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            r ? n($(this)) : t($(this));
          }));
      }
      function t(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function n(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)");
        r.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          r.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                n(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Kr = f(() => {
    "use strict";
    window.tram = (function (e) {
      function t(c, _) {
        var w = new k.Bare();
        return w.init(c, _);
      }
      function n(c) {
        return c.replace(/[A-Z]/g, function (_) {
          return "-" + _.toLowerCase();
        });
      }
      function r(c) {
        var _ = parseInt(c.slice(1), 16),
          w = (_ >> 16) & 255,
          x = (_ >> 8) & 255,
          P = 255 & _;
        return [w, x, P];
      }
      function i(c, _, w) {
        return (
          "#" + ((1 << 24) | (c << 16) | (_ << 8) | w).toString(16).slice(1)
        );
      }
      function o() {}
      function s(c, _) {
        l("Type warning: Expected: [" + c + "] Got: [" + typeof _ + "] " + _);
      }
      function a(c, _, w) {
        l("Units do not match [" + c + "]: " + _ + ", " + w);
      }
      function u(c, _, w) {
        if ((_ !== void 0 && (w = _), c === void 0)) return w;
        var x = w;
        return (
          Oe.test(c) || !ke.test(c)
            ? (x = parseInt(c, 10))
            : ke.test(c) && (x = 1e3 * parseFloat(c)),
          0 > x && (x = 0),
          x === x ? x : w
        );
      }
      function l(c) {
        K.debug && window && window.console.warn(c);
      }
      function m(c) {
        for (var _ = -1, w = c ? c.length : 0, x = []; ++_ < w; ) {
          var P = c[_];
          P && x.push(P);
        }
        return x;
      }
      var v = (function (c, _, w) {
          function x(ae) {
            return typeof ae == "object";
          }
          function P(ae) {
            return typeof ae == "function";
          }
          function N() {}
          function J(ae, ee) {
            function V() {
              var xe = new ue();
              return P(xe.init) && xe.init.apply(xe, arguments), xe;
            }
            function ue() {}
            ee === w && ((ee = ae), (ae = Object)), (V.Bare = ue);
            var ce,
              _e = (N[c] = ae[c]),
              Ge = (ue[c] = V[c] = new N());
            return (
              (Ge.constructor = V),
              (V.mixin = function (xe) {
                return (ue[c] = V[c] = J(V, xe)[c]), V;
              }),
              (V.open = function (xe) {
                if (
                  ((ce = {}),
                  P(xe) ? (ce = xe.call(V, Ge, _e, V, ae)) : x(xe) && (ce = xe),
                  x(ce))
                )
                  for (var tn in ce) _.call(ce, tn) && (Ge[tn] = ce[tn]);
                return P(Ge.init) || (Ge.init = ae), V;
              }),
              V.open(ee)
            );
          }
          return J;
        })("prototype", {}.hasOwnProperty),
        p = {
          ease: [
            "ease",
            function (c, _, w, x) {
              var P = (c /= x) * c,
                N = P * c;
              return (
                _ +
                w * (-2.75 * N * P + 11 * P * P + -15.5 * N + 8 * P + 0.25 * c)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (c, _, w, x) {
              var P = (c /= x) * c,
                N = P * c;
              return _ + w * (-1 * N * P + 3 * P * P + -3 * N + 2 * P);
            },
          ],
          "ease-out": [
            "ease-out",
            function (c, _, w, x) {
              var P = (c /= x) * c,
                N = P * c;
              return (
                _ +
                w * (0.3 * N * P + -1.6 * P * P + 2.2 * N + -1.8 * P + 1.9 * c)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (c, _, w, x) {
              var P = (c /= x) * c,
                N = P * c;
              return _ + w * (2 * N * P + -5 * P * P + 2 * N + 2 * P);
            },
          ],
          linear: [
            "linear",
            function (c, _, w, x) {
              return (w * c) / x + _;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (c, _, w, x) {
              return w * (c /= x) * c + _;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (c, _, w, x) {
              return -w * (c /= x) * (c - 2) + _;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (c, _, w, x) {
              return (c /= x / 2) < 1
                ? (w / 2) * c * c + _
                : (-w / 2) * (--c * (c - 2) - 1) + _;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (c, _, w, x) {
              return w * (c /= x) * c * c + _;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (c, _, w, x) {
              return w * ((c = c / x - 1) * c * c + 1) + _;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (c, _, w, x) {
              return (c /= x / 2) < 1
                ? (w / 2) * c * c * c + _
                : (w / 2) * ((c -= 2) * c * c + 2) + _;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (c, _, w, x) {
              return w * (c /= x) * c * c * c + _;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (c, _, w, x) {
              return -w * ((c = c / x - 1) * c * c * c - 1) + _;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (c, _, w, x) {
              return (c /= x / 2) < 1
                ? (w / 2) * c * c * c * c + _
                : (-w / 2) * ((c -= 2) * c * c * c - 2) + _;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (c, _, w, x) {
              return w * (c /= x) * c * c * c * c + _;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (c, _, w, x) {
              return w * ((c = c / x - 1) * c * c * c * c + 1) + _;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (c, _, w, x) {
              return (c /= x / 2) < 1
                ? (w / 2) * c * c * c * c * c + _
                : (w / 2) * ((c -= 2) * c * c * c * c + 2) + _;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (c, _, w, x) {
              return -w * Math.cos((c / x) * (Math.PI / 2)) + w + _;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (c, _, w, x) {
              return w * Math.sin((c / x) * (Math.PI / 2)) + _;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (c, _, w, x) {
              return (-w / 2) * (Math.cos((Math.PI * c) / x) - 1) + _;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (c, _, w, x) {
              return c === 0 ? _ : w * Math.pow(2, 10 * (c / x - 1)) + _;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (c, _, w, x) {
              return c === x
                ? _ + w
                : w * (-Math.pow(2, (-10 * c) / x) + 1) + _;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (c, _, w, x) {
              return c === 0
                ? _
                : c === x
                ? _ + w
                : (c /= x / 2) < 1
                ? (w / 2) * Math.pow(2, 10 * (c - 1)) + _
                : (w / 2) * (-Math.pow(2, -10 * --c) + 2) + _;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (c, _, w, x) {
              return -w * (Math.sqrt(1 - (c /= x) * c) - 1) + _;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (c, _, w, x) {
              return w * Math.sqrt(1 - (c = c / x - 1) * c) + _;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (c, _, w, x) {
              return (c /= x / 2) < 1
                ? (-w / 2) * (Math.sqrt(1 - c * c) - 1) + _
                : (w / 2) * (Math.sqrt(1 - (c -= 2) * c) + 1) + _;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (c, _, w, x, P) {
              return (
                P === void 0 && (P = 1.70158),
                w * (c /= x) * c * ((P + 1) * c - P) + _
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (c, _, w, x, P) {
              return (
                P === void 0 && (P = 1.70158),
                w * ((c = c / x - 1) * c * ((P + 1) * c + P) + 1) + _
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (c, _, w, x, P) {
              return (
                P === void 0 && (P = 1.70158),
                (c /= x / 2) < 1
                  ? (w / 2) * c * c * (((P *= 1.525) + 1) * c - P) + _
                  : (w / 2) *
                      ((c -= 2) * c * (((P *= 1.525) + 1) * c + P) + 2) +
                    _
              );
            },
          ],
        },
        y = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        T = document,
        I = window,
        S = "bkwld-tram",
        b = /[\-\.0-9]/g,
        R = /[A-Z]/,
        O = "number",
        L = /^(rgb|#)/,
        D = /(em|cm|mm|in|pt|pc|px)$/,
        C = /(em|cm|mm|in|pt|pc|px|%)$/,
        W = /(deg|rad|turn)$/,
        H = "unitless",
        z = /(all|none) 0s ease 0s/,
        Q = /^(width|height)$/,
        te = " ",
        q = T.createElement("a"),
        A = ["Webkit", "Moz", "O", "ms"],
        M = ["-webkit-", "-moz-", "-o-", "-ms-"],
        j = function (c) {
          if (c in q.style) return { dom: c, css: c };
          var _,
            w,
            x = "",
            P = c.split("-");
          for (_ = 0; _ < P.length; _++)
            x += P[_].charAt(0).toUpperCase() + P[_].slice(1);
          for (_ = 0; _ < A.length; _++)
            if (((w = A[_] + x), w in q.style))
              return { dom: w, css: M[_] + c };
        },
        B = (t.support = {
          bind: Function.prototype.bind,
          transform: j("transform"),
          transition: j("transition"),
          backface: j("backface-visibility"),
          timing: j("transition-timing-function"),
        });
      if (B.transition) {
        var ne = B.timing.dom;
        if (((q.style[ne] = p["ease-in-back"][0]), !q.style[ne]))
          for (var re in y) p[re][0] = y[re];
      }
      var le = (t.frame = (function () {
          var c =
            I.requestAnimationFrame ||
            I.webkitRequestAnimationFrame ||
            I.mozRequestAnimationFrame ||
            I.oRequestAnimationFrame ||
            I.msRequestAnimationFrame;
          return c && B.bind
            ? c.bind(I)
            : function (_) {
                I.setTimeout(_, 16);
              };
        })()),
        Ie = (t.now = (function () {
          var c = I.performance,
            _ = c && (c.now || c.webkitNow || c.msNow || c.mozNow);
          return _ && B.bind
            ? _.bind(c)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        E = v(function (c) {
          function _(ie, fe) {
            var Ee = m(("" + ie).split(te)),
              he = Ee[0];
            fe = fe || {};
            var Re = U[he];
            if (!Re) return l("Unsupported property: " + he);
            if (!fe.weak || !this.props[he]) {
              var We = Re[0],
                Ne = this.props[he];
              return (
                Ne || (Ne = this.props[he] = new We.Bare()),
                Ne.init(this.$el, Ee, Re, fe),
                Ne
              );
            }
          }
          function w(ie, fe, Ee) {
            if (ie) {
              var he = typeof ie;
              if (
                (fe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                he == "number" && fe)
              )
                return (
                  (this.timer = new oe({
                    duration: ie,
                    context: this,
                    complete: N,
                  })),
                  void (this.active = !0)
                );
              if (he == "string" && fe) {
                switch (ie) {
                  case "hide":
                    V.call(this);
                    break;
                  case "stop":
                    J.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    _.call(this, ie, Ee && Ee[1]);
                }
                return N.call(this);
              }
              if (he == "function") return void ie.call(this, this);
              if (he == "object") {
                var Re = 0;
                Ge.call(
                  this,
                  ie,
                  function (Te, Hv) {
                    Te.span > Re && (Re = Te.span), Te.stop(), Te.animate(Hv);
                  },
                  function (Te) {
                    "wait" in Te && (Re = u(Te.wait, 0));
                  }
                ),
                  _e.call(this),
                  Re > 0 &&
                    ((this.timer = new oe({ duration: Re, context: this })),
                    (this.active = !0),
                    fe && (this.timer.complete = N));
                var We = this,
                  Ne = !1,
                  Ln = {};
                le(function () {
                  Ge.call(We, ie, function (Te) {
                    Te.active && ((Ne = !0), (Ln[Te.name] = Te.nextStyle));
                  }),
                    Ne && We.$el.css(Ln);
                });
              }
            }
          }
          function x(ie) {
            (ie = u(ie, 0)),
              this.active
                ? this.queue.push({ options: ie })
                : ((this.timer = new oe({
                    duration: ie,
                    context: this,
                    complete: N,
                  })),
                  (this.active = !0));
          }
          function P(ie) {
            return this.active
              ? (this.queue.push({ options: ie, args: arguments }),
                void (this.timer.complete = N))
              : l(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function N() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ie = this.queue.shift();
              w.call(this, ie.options, !0, ie.args);
            }
          }
          function J(ie) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var fe;
            typeof ie == "string"
              ? ((fe = {}), (fe[ie] = 1))
              : (fe = typeof ie == "object" && ie != null ? ie : this.props),
              Ge.call(this, fe, xe),
              _e.call(this);
          }
          function ae(ie) {
            J.call(this, ie), Ge.call(this, ie, tn, Wv);
          }
          function ee(ie) {
            typeof ie != "string" && (ie = "block"),
              (this.el.style.display = ie);
          }
          function V() {
            J.call(this), (this.el.style.display = "none");
          }
          function ue() {
            this.el.offsetHeight;
          }
          function ce() {
            J.call(this), e.removeData(this.el, S), (this.$el = this.el = null);
          }
          function _e() {
            var ie,
              fe,
              Ee = [];
            this.upstream && Ee.push(this.upstream);
            for (ie in this.props)
              (fe = this.props[ie]), fe.active && Ee.push(fe.string);
            (Ee = Ee.join(",")),
              this.style !== Ee &&
                ((this.style = Ee), (this.el.style[B.transition.dom] = Ee));
          }
          function Ge(ie, fe, Ee) {
            var he,
              Re,
              We,
              Ne,
              Ln = fe !== xe,
              Te = {};
            for (he in ie)
              (We = ie[he]),
                he in pe
                  ? (Te.transform || (Te.transform = {}),
                    (Te.transform[he] = We))
                  : (R.test(he) && (he = n(he)),
                    he in U ? (Te[he] = We) : (Ne || (Ne = {}), (Ne[he] = We)));
            for (he in Te) {
              if (((We = Te[he]), (Re = this.props[he]), !Re)) {
                if (!Ln) continue;
                Re = _.call(this, he);
              }
              fe.call(this, Re, We);
            }
            Ee && Ne && Ee.call(this, Ne);
          }
          function xe(ie) {
            ie.stop();
          }
          function tn(ie, fe) {
            ie.set(fe);
          }
          function Wv(ie) {
            this.$el.css(ie);
          }
          function Ue(ie, fe) {
            c[ie] = function () {
              return this.children
                ? Bv.call(this, fe, arguments)
                : (this.el && fe.apply(this, arguments), this);
            };
          }
          function Bv(ie, fe) {
            var Ee,
              he = this.children.length;
            for (Ee = 0; he > Ee; Ee++) ie.apply(this.children[Ee], fe);
            return this;
          }
          (c.init = function (ie) {
            if (
              ((this.$el = e(ie)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              K.keepInherited && !K.fallback)
            ) {
              var fe = F(this.el, "transition");
              fe && !z.test(fe) && (this.upstream = fe);
            }
            B.backface &&
              K.hideBackface &&
              d(this.el, B.backface.css, "hidden");
          }),
            Ue("add", _),
            Ue("start", w),
            Ue("wait", x),
            Ue("then", P),
            Ue("next", N),
            Ue("stop", J),
            Ue("set", ae),
            Ue("show", ee),
            Ue("hide", V),
            Ue("redraw", ue),
            Ue("destroy", ce);
        }),
        k = v(E, function (c) {
          function _(w, x) {
            var P = e.data(w, S) || e.data(w, S, new E.Bare());
            return P.el || P.init(w), x ? P.start(x) : P;
          }
          c.init = function (w, x) {
            var P = e(w);
            if (!P.length) return this;
            if (P.length === 1) return _(P[0], x);
            var N = [];
            return (
              P.each(function (J, ae) {
                N.push(_(ae, x));
              }),
              (this.children = N),
              this
            );
          };
        }),
        h = v(function (c) {
          function _() {
            var N = this.get();
            this.update("auto");
            var J = this.get();
            return this.update(N), J;
          }
          function w(N, J, ae) {
            return J !== void 0 && (ae = J), N in p ? N : ae;
          }
          function x(N) {
            var J = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(N);
            return (J ? i(J[1], J[2], J[3]) : N).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var P = { duration: 500, ease: "ease", delay: 0 };
          (c.init = function (N, J, ae, ee) {
            (this.$el = N), (this.el = N[0]);
            var V = J[0];
            ae[2] && (V = ae[2]),
              Y[V] && (V = Y[V]),
              (this.name = V),
              (this.type = ae[1]),
              (this.duration = u(J[1], this.duration, P.duration)),
              (this.ease = w(J[2], this.ease, P.ease)),
              (this.delay = u(J[3], this.delay, P.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = Q.test(this.name)),
              (this.unit = ee.unit || this.unit || K.defaultUnit),
              (this.angle = ee.angle || this.angle || K.defaultAngle),
              K.fallback || ee.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    te +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? te + p[this.ease][0] : "") +
                    (this.delay ? te + this.delay + "ms" : "")));
          }),
            (c.set = function (N) {
              (N = this.convert(N, this.type)), this.update(N), this.redraw();
            }),
            (c.transition = function (N) {
              (this.active = !0),
                (N = this.convert(N, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  N == "auto" && (N = _.call(this))),
                (this.nextStyle = N);
            }),
            (c.fallback = function (N) {
              var J =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (N = this.convert(N, this.type)),
                this.auto &&
                  (J == "auto" && (J = this.convert(this.get(), this.type)),
                  N == "auto" && (N = _.call(this))),
                (this.tween = new Z({
                  from: J,
                  to: N,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (c.get = function () {
              return F(this.el, this.name);
            }),
            (c.update = function (N) {
              d(this.el, this.name, N);
            }),
            (c.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                d(this.el, this.name, this.get()));
              var N = this.tween;
              N && N.context && N.destroy();
            }),
            (c.convert = function (N, J) {
              if (N == "auto" && this.auto) return N;
              var ae,
                ee = typeof N == "number",
                V = typeof N == "string";
              switch (J) {
                case O:
                  if (ee) return N;
                  if (V && N.replace(b, "") === "") return +N;
                  ae = "number(unitless)";
                  break;
                case L:
                  if (V) {
                    if (N === "" && this.original) return this.original;
                    if (J.test(N))
                      return N.charAt(0) == "#" && N.length == 7 ? N : x(N);
                  }
                  ae = "hex or rgb string";
                  break;
                case D:
                  if (ee) return N + this.unit;
                  if (V && J.test(N)) return N;
                  ae = "number(px) or string(unit)";
                  break;
                case C:
                  if (ee) return N + this.unit;
                  if (V && J.test(N)) return N;
                  ae = "number(px) or string(unit or %)";
                  break;
                case W:
                  if (ee) return N + this.angle;
                  if (V && J.test(N)) return N;
                  ae = "number(deg) or string(angle)";
                  break;
                case H:
                  if (ee || (V && C.test(N))) return N;
                  ae = "number(unitless) or string(unit or %)";
              }
              return s(ae, N), N;
            }),
            (c.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        g = v(h, function (c, _) {
          c.init = function () {
            _.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), L));
          };
        }),
        X = v(h, function (c, _) {
          (c.init = function () {
            _.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (c.get = function () {
              return this.$el[this.name]();
            }),
            (c.update = function (w) {
              this.$el[this.name](w);
            });
        }),
        G = v(h, function (c, _) {
          function w(x, P) {
            var N, J, ae, ee, V;
            for (N in x)
              (ee = pe[N]),
                (ae = ee[0]),
                (J = ee[1] || N),
                (V = this.convert(x[N], ae)),
                P.call(this, J, V, ae);
          }
          (c.init = function () {
            _.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                pe.perspective &&
                  K.perspective &&
                  ((this.current.perspective = K.perspective),
                  d(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (c.set = function (x) {
              w.call(this, x, function (P, N) {
                this.current[P] = N;
              }),
                d(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (c.transition = function (x) {
              var P = this.values(x);
              this.tween = new se({
                current: this.current,
                values: P,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var N,
                J = {};
              for (N in this.current) J[N] = N in P ? P[N] : this.current[N];
              (this.active = !0), (this.nextStyle = this.style(J));
            }),
            (c.fallback = function (x) {
              var P = this.values(x);
              this.tween = new se({
                current: this.current,
                values: P,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (c.update = function () {
              d(this.el, this.name, this.style(this.current));
            }),
            (c.style = function (x) {
              var P,
                N = "";
              for (P in x) N += P + "(" + x[P] + ") ";
              return N;
            }),
            (c.values = function (x) {
              var P,
                N = {};
              return (
                w.call(this, x, function (J, ae, ee) {
                  (N[J] = ae),
                    this.current[J] === void 0 &&
                      ((P = 0),
                      ~J.indexOf("scale") && (P = 1),
                      (this.current[J] = this.convert(P, ee)));
                }),
                N
              );
            });
        }),
        Z = v(function (c) {
          function _(V) {
            ae.push(V) === 1 && le(w);
          }
          function w() {
            var V,
              ue,
              ce,
              _e = ae.length;
            if (_e)
              for (le(w), ue = Ie(), V = _e; V--; )
                (ce = ae[V]), ce && ce.render(ue);
          }
          function x(V) {
            var ue,
              ce = e.inArray(V, ae);
            ce >= 0 &&
              ((ue = ae.slice(ce + 1)),
              (ae.length = ce),
              ue.length && (ae = ae.concat(ue)));
          }
          function P(V) {
            return Math.round(V * ee) / ee;
          }
          function N(V, ue, ce) {
            return i(
              V[0] + ce * (ue[0] - V[0]),
              V[1] + ce * (ue[1] - V[1]),
              V[2] + ce * (ue[2] - V[2])
            );
          }
          var J = { ease: p.ease[1], from: 0, to: 1 };
          (c.init = function (V) {
            (this.duration = V.duration || 0), (this.delay = V.delay || 0);
            var ue = V.ease || J.ease;
            p[ue] && (ue = p[ue][1]),
              typeof ue != "function" && (ue = J.ease),
              (this.ease = ue),
              (this.update = V.update || o),
              (this.complete = V.complete || o),
              (this.context = V.context || this),
              (this.name = V.name);
            var ce = V.from,
              _e = V.to;
            ce === void 0 && (ce = J.from),
              _e === void 0 && (_e = J.to),
              (this.unit = V.unit || ""),
              typeof ce == "number" && typeof _e == "number"
                ? ((this.begin = ce), (this.change = _e - ce))
                : this.format(_e, ce),
              (this.value = this.begin + this.unit),
              (this.start = Ie()),
              V.autoplay !== !1 && this.play();
          }),
            (c.play = function () {
              this.active ||
                (this.start || (this.start = Ie()),
                (this.active = !0),
                _(this));
            }),
            (c.stop = function () {
              this.active && ((this.active = !1), x(this));
            }),
            (c.render = function (V) {
              var ue,
                ce = V - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var _e = this.ease(ce, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? N(this.startRGB, this.endRGB, _e)
                    : P(this.begin + _e * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (c.format = function (V, ue) {
              if (((ue += ""), (V += ""), V.charAt(0) == "#"))
                return (
                  (this.startRGB = r(ue)),
                  (this.endRGB = r(V)),
                  (this.endHex = V),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = ue.replace(b, ""),
                  _e = V.replace(b, "");
                ce !== _e && a("tween", ue, V), (this.unit = ce);
              }
              (ue = parseFloat(ue)),
                (V = parseFloat(V)),
                (this.begin = this.value = ue),
                (this.change = V - ue);
            }),
            (c.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var ae = [],
            ee = 1e3;
        }),
        oe = v(Z, function (c) {
          (c.init = function (_) {
            (this.duration = _.duration || 0),
              (this.complete = _.complete || o),
              (this.context = _.context),
              this.play();
          }),
            (c.render = function (_) {
              var w = _ - this.start;
              w < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        se = v(Z, function (c, _) {
          (c.init = function (w) {
            (this.context = w.context),
              (this.update = w.update),
              (this.tweens = []),
              (this.current = w.current);
            var x, P;
            for (x in w.values)
              (P = w.values[x]),
                this.current[x] !== P &&
                  this.tweens.push(
                    new Z({
                      name: x,
                      from: this.current[x],
                      to: P,
                      duration: w.duration,
                      delay: w.delay,
                      ease: w.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (c.render = function (w) {
              var x,
                P,
                N = this.tweens.length,
                J = !1;
              for (x = N; x--; )
                (P = this.tweens[x]),
                  P.context &&
                    (P.render(w), (this.current[P.name] = P.value), (J = !0));
              return J
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (c.destroy = function () {
              if ((_.destroy.call(this), this.tweens)) {
                var w,
                  x = this.tweens.length;
                for (w = x; w--; ) this.tweens[w].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        K = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !B.transition,
          agentTests: [],
        });
      (t.fallback = function (c) {
        if (!B.transition) return (K.fallback = !0);
        K.agentTests.push("(" + c + ")");
        var _ = new RegExp(K.agentTests.join("|"), "i");
        K.fallback = _.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (c) {
          return new Z(c);
        }),
        (t.delay = function (c, _, w) {
          return new oe({ complete: _, duration: c, context: w });
        }),
        (e.fn.tram = function (c) {
          return t.call(null, this, c);
        });
      var d = e.style,
        F = e.css,
        Y = { transform: B.transform && B.transform.css },
        U = {
          color: [g, L],
          background: [g, L, "background-color"],
          "outline-color": [g, L],
          "border-color": [g, L],
          "border-top-color": [g, L],
          "border-right-color": [g, L],
          "border-bottom-color": [g, L],
          "border-left-color": [g, L],
          "border-width": [h, D],
          "border-top-width": [h, D],
          "border-right-width": [h, D],
          "border-bottom-width": [h, D],
          "border-left-width": [h, D],
          "border-spacing": [h, D],
          "letter-spacing": [h, D],
          margin: [h, D],
          "margin-top": [h, D],
          "margin-right": [h, D],
          "margin-bottom": [h, D],
          "margin-left": [h, D],
          padding: [h, D],
          "padding-top": [h, D],
          "padding-right": [h, D],
          "padding-bottom": [h, D],
          "padding-left": [h, D],
          "outline-width": [h, D],
          opacity: [h, O],
          top: [h, C],
          right: [h, C],
          bottom: [h, C],
          left: [h, C],
          "font-size": [h, C],
          "text-indent": [h, C],
          "word-spacing": [h, C],
          width: [h, C],
          "min-width": [h, C],
          "max-width": [h, C],
          height: [h, C],
          "min-height": [h, C],
          "max-height": [h, C],
          "line-height": [h, H],
          "scroll-top": [X, O, "scrollTop"],
          "scroll-left": [X, O, "scrollLeft"],
        },
        pe = {};
      B.transform &&
        ((U.transform = [G]),
        (pe = {
          x: [C, "translateX"],
          y: [C, "translateY"],
          rotate: [W],
          rotateX: [W],
          rotateY: [W],
          scale: [O],
          scaleX: [O],
          scaleY: [O],
          skew: [W],
          skewX: [W],
          skewY: [W],
        })),
        B.transform &&
          B.backface &&
          ((pe.z = [C, "translateZ"]),
          (pe.rotateZ = [W]),
          (pe.scaleZ = [O]),
          (pe.perspective = [D]));
      var Oe = /ms/,
        ke = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var va = f((FF, ga) => {
    "use strict";
    var $v = window.$,
      Zv = Kr() && $v.tram;
    ga.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        n = Array.prototype,
        r = Object.prototype,
        i = Function.prototype,
        o = n.push,
        s = n.slice,
        a = n.concat,
        u = r.toString,
        l = r.hasOwnProperty,
        m = n.forEach,
        v = n.map,
        p = n.reduce,
        y = n.reduceRight,
        T = n.filter,
        I = n.every,
        S = n.some,
        b = n.indexOf,
        R = n.lastIndexOf,
        O = Array.isArray,
        L = Object.keys,
        D = i.bind,
        C =
          (e.each =
          e.forEach =
            function (A, M, j) {
              if (A == null) return A;
              if (m && A.forEach === m) A.forEach(M, j);
              else if (A.length === +A.length) {
                for (var B = 0, ne = A.length; B < ne; B++)
                  if (M.call(j, A[B], B, A) === t) return;
              } else
                for (var re = e.keys(A), B = 0, ne = re.length; B < ne; B++)
                  if (M.call(j, A[re[B]], re[B], A) === t) return;
              return A;
            });
      (e.map = e.collect =
        function (A, M, j) {
          var B = [];
          return A == null
            ? B
            : v && A.map === v
            ? A.map(M, j)
            : (C(A, function (ne, re, le) {
                B.push(M.call(j, ne, re, le));
              }),
              B);
        }),
        (e.find = e.detect =
          function (A, M, j) {
            var B;
            return (
              W(A, function (ne, re, le) {
                if (M.call(j, ne, re, le)) return (B = ne), !0;
              }),
              B
            );
          }),
        (e.filter = e.select =
          function (A, M, j) {
            var B = [];
            return A == null
              ? B
              : T && A.filter === T
              ? A.filter(M, j)
              : (C(A, function (ne, re, le) {
                  M.call(j, ne, re, le) && B.push(ne);
                }),
                B);
          });
      var W =
        (e.some =
        e.any =
          function (A, M, j) {
            M || (M = e.identity);
            var B = !1;
            return A == null
              ? B
              : S && A.some === S
              ? A.some(M, j)
              : (C(A, function (ne, re, le) {
                  if (B || (B = M.call(j, ne, re, le))) return t;
                }),
                !!B);
          });
      (e.contains = e.include =
        function (A, M) {
          return A == null
            ? !1
            : b && A.indexOf === b
            ? A.indexOf(M) != -1
            : W(A, function (j) {
                return j === M;
              });
        }),
        (e.delay = function (A, M) {
          var j = s.call(arguments, 2);
          return setTimeout(function () {
            return A.apply(null, j);
          }, M);
        }),
        (e.defer = function (A) {
          return e.delay.apply(e, [A, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (A) {
          var M, j, B;
          return function () {
            M ||
              ((M = !0),
              (j = arguments),
              (B = this),
              Zv.frame(function () {
                (M = !1), A.apply(B, j);
              }));
          };
        }),
        (e.debounce = function (A, M, j) {
          var B,
            ne,
            re,
            le,
            Ie,
            E = function () {
              var k = e.now() - le;
              k < M
                ? (B = setTimeout(E, M - k))
                : ((B = null), j || ((Ie = A.apply(re, ne)), (re = ne = null)));
            };
          return function () {
            (re = this), (ne = arguments), (le = e.now());
            var k = j && !B;
            return (
              B || (B = setTimeout(E, M)),
              k && ((Ie = A.apply(re, ne)), (re = ne = null)),
              Ie
            );
          };
        }),
        (e.defaults = function (A) {
          if (!e.isObject(A)) return A;
          for (var M = 1, j = arguments.length; M < j; M++) {
            var B = arguments[M];
            for (var ne in B) A[ne] === void 0 && (A[ne] = B[ne]);
          }
          return A;
        }),
        (e.keys = function (A) {
          if (!e.isObject(A)) return [];
          if (L) return L(A);
          var M = [];
          for (var j in A) e.has(A, j) && M.push(j);
          return M;
        }),
        (e.has = function (A, M) {
          return l.call(A, M);
        }),
        (e.isObject = function (A) {
          return A === Object(A);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var H = /(.)^/,
        z = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        Q = /\\|'|\r|\n|\u2028|\u2029/g,
        te = function (A) {
          return "\\" + z[A];
        },
        q = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (A, M, j) {
          !M && j && (M = j), (M = e.defaults({}, M, e.templateSettings));
          var B = RegExp(
              [
                (M.escape || H).source,
                (M.interpolate || H).source,
                (M.evaluate || H).source,
              ].join("|") + "|$",
              "g"
            ),
            ne = 0,
            re = "__p+='";
          A.replace(B, function (k, h, g, X, G) {
            return (
              (re += A.slice(ne, G).replace(Q, te)),
              (ne = G + k.length),
              h
                ? (re +=
                    `'+
((__t=(` +
                    h +
                    `))==null?'':_.escape(__t))+
'`)
                : g
                ? (re +=
                    `'+
((__t=(` +
                    g +
                    `))==null?'':__t)+
'`)
                : X &&
                  (re +=
                    `';
` +
                    X +
                    `
__p+='`),
              k
            );
          }),
            (re += `';
`);
          var le = M.variable;
          if (le) {
            if (!q.test(le))
              throw new Error("variable is not a bare identifier: " + le);
          } else
            (re =
              `with(obj||{}){
` +
              re +
              `}
`),
              (le = "obj");
          re =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            re +
            `return __p;
`;
          var Ie;
          try {
            Ie = new Function(M.variable || "obj", "_", re);
          } catch (k) {
            throw ((k.source = re), k);
          }
          var E = function (k) {
            return Ie.call(this, k, e);
          };
          return (
            (E.source =
              "function(" +
              le +
              `){
` +
              re +
              "}"),
            E
          );
        }),
        e
      );
    })();
  });
  var Xe = f((qF, wa) => {
    "use strict";
    var ge = {},
      St = {},
      Ot = [],
      Qr = window.Webflow || [],
      lt = window.jQuery,
      He = lt(window),
      Jv = lt(document),
      $e = lt.isFunction,
      Be = (ge._ = va()),
      Ea = (ge.tram = Kr() && lt.tram),
      Dn = !1,
      $r = !1;
    Ea.config.hideBackface = !1;
    Ea.config.keepInherited = !0;
    ge.define = function (e, t, n) {
      St[e] && _a(St[e]);
      var r = (St[e] = t(lt, Be, n) || {});
      return ma(r), r;
    };
    ge.require = function (e) {
      return St[e];
    };
    function ma(e) {
      ge.env() &&
        ($e(e.design) && He.on("__wf_design", e.design),
        $e(e.preview) && He.on("__wf_preview", e.preview)),
        $e(e.destroy) && He.on("__wf_destroy", e.destroy),
        e.ready && $e(e.ready) && ey(e);
    }
    function ey(e) {
      if (Dn) {
        e.ready();
        return;
      }
      Be.contains(Ot, e.ready) || Ot.push(e.ready);
    }
    function _a(e) {
      $e(e.design) && He.off("__wf_design", e.design),
        $e(e.preview) && He.off("__wf_preview", e.preview),
        $e(e.destroy) && He.off("__wf_destroy", e.destroy),
        e.ready && $e(e.ready) && ty(e);
    }
    function ty(e) {
      Ot = Be.filter(Ot, function (t) {
        return t !== e.ready;
      });
    }
    ge.push = function (e) {
      if (Dn) {
        $e(e) && e();
        return;
      }
      Qr.push(e);
    };
    ge.env = function (e) {
      var t = window.__wf_design,
        n = typeof t < "u";
      if (!e) return n;
      if (e === "design") return n && t;
      if (e === "preview") return n && !t;
      if (e === "slug") return n && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var Nn = navigator.userAgent.toLowerCase(),
      Ia = (ge.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      ny = (ge.env.chrome =
        /chrome/.test(Nn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(Nn.match(/chrome\/(\d+)\./)[1], 10)),
      ry = (ge.env.ios = /(ipod|iphone|ipad)/.test(Nn));
    ge.env.safari = /safari/.test(Nn) && !ny && !ry;
    var Yr;
    Ia &&
      Jv.on("touchstart mousedown", function (e) {
        Yr = e.target;
      });
    ge.validClick = Ia
      ? function (e) {
          return e === Yr || lt.contains(e, Yr);
        }
      : function () {
          return !0;
        };
    var Ta = "resize.webflow orientationchange.webflow load.webflow",
      iy = "scroll.webflow " + Ta;
    ge.resize = Zr(He, Ta);
    ge.scroll = Zr(He, iy);
    ge.redraw = Zr();
    function Zr(e, t) {
      var n = [],
        r = {};
      return (
        (r.up = Be.throttle(function (i) {
          Be.each(n, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, r.up),
        (r.on = function (i) {
          typeof i == "function" && (Be.contains(n, i) || n.push(i));
        }),
        (r.off = function (i) {
          if (!arguments.length) {
            n = [];
            return;
          }
          n = Be.filter(n, function (o) {
            return o !== i;
          });
        }),
        r
      );
    }
    ge.location = function (e) {
      window.location = e;
    };
    ge.env() && (ge.location = function () {});
    ge.ready = function () {
      (Dn = !0), $r ? oy() : Be.each(Ot, ya), Be.each(Qr, ya), ge.resize.up();
    };
    function ya(e) {
      $e(e) && e();
    }
    function oy() {
      ($r = !1), Be.each(St, ma);
    }
    var Et;
    ge.load = function (e) {
      Et.then(e);
    };
    function ba() {
      Et && (Et.reject(), He.off("load", Et.resolve)),
        (Et = new lt.Deferred()),
        He.on("load", Et.resolve);
    }
    ge.destroy = function (e) {
      (e = e || {}),
        ($r = !0),
        He.triggerHandler("__wf_destroy"),
        e.domready != null && (Dn = e.domready),
        Be.each(St, _a),
        ge.resize.off(),
        ge.scroll.off(),
        ge.redraw.off(),
        (Ot = []),
        (Qr = []),
        Et.state() === "pending" && ba();
    };
    lt(ge.ready);
    ba();
    wa.exports = window.Webflow = ge;
  });
  var Oa = f((kF, Sa) => {
    "use strict";
    var Aa = Xe();
    Aa.define(
      "brand",
      (Sa.exports = function (e) {
        var t = {},
          n = document,
          r = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          l;
        t.ready = function () {
          var y = r.attr("data-wf-status"),
            T = r.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(T) && s.hostname !== T && (y = !0),
            y &&
              !a &&
              ((l = l || v()),
              p(),
              setTimeout(p, 500),
              e(n).off(u, m).on(u, m));
        };
        function m() {
          var y =
            n.fullScreen ||
            n.mozFullScreen ||
            n.webkitIsFullScreen ||
            n.msFullscreenElement ||
            !!n.webkitFullscreenElement;
          e(l).attr("style", y ? "display: none !important;" : "");
        }
        function p() {
          var y = i.children(o),
            T = y.length && y.get(0) === l,
            I = Aa.env("editor");
          if (T) {
            I && y.remove();
            return;
          }
          y.length && y.remove(), I || i.append(l);
        }
        return t;
      })
    );
  });
  var Ra = f((GF, xa) => {
    "use strict";
    var Jr = Xe();
    Jr.define(
      "edit",
      (xa.exports = function (e, t, n) {
        if (
          ((n = n || {}),
          (Jr.env("test") || Jr.env("frame")) && !n.fixture && !ay())
        )
          return { exit: 1 };
        var r = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          l = n.load || p,
          m = !1;
        try {
          m =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        m
          ? l()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            l()
          : i.on(a, v).triggerHandler(a);
        function v() {
          u || (/\?edit/.test(s.hash) && l());
        }
        function p() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, v),
            R(function (L) {
              e.ajax({
                url: b("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: y(L),
              });
            });
        }
        function y(L) {
          return function (D) {
            if (!D) {
              console.error("Could not load editor data");
              return;
            }
            (D.thirdPartyCookiesSupported = L),
              T(S(D.scriptPath), function () {
                window.WebflowEditor(D);
              });
          };
        }
        function T(L, D) {
          e.ajax({ type: "GET", url: L, dataType: "script", cache: !0 }).then(
            D,
            I
          );
        }
        function I(L, D, C) {
          throw (console.error("Could not load editor script: " + D), C);
        }
        function S(L) {
          return L.indexOf("//") >= 0
            ? L
            : b("https://editor-api.webflow.com" + L);
        }
        function b(L) {
          return L.replace(/([^:])\/\//g, "$1/");
        }
        function R(L) {
          var D = window.document.createElement("iframe");
          (D.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (D.style.display = "none"),
            (D.sandbox = "allow-scripts allow-same-origin");
          var C = function (W) {
            W.data === "WF_third_party_cookies_unsupported"
              ? (O(D, C), L(!1))
              : W.data === "WF_third_party_cookies_supported" &&
                (O(D, C), L(!0));
          };
          (D.onerror = function () {
            O(D, C), L(!1);
          }),
            window.addEventListener("message", C, !1),
            window.document.body.appendChild(D);
        }
        function O(L, D) {
          window.removeEventListener("message", D, !1), L.remove();
        }
        return r;
      })
    );
    function ay() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var La = f((XF, Ca) => {
    "use strict";
    var sy = Xe();
    sy.define(
      "focus-visible",
      (Ca.exports = function () {
        function e(n) {
          var r = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(O) {
            return !!(
              O &&
              O !== document &&
              O.nodeName !== "HTML" &&
              O.nodeName !== "BODY" &&
              "classList" in O &&
              "contains" in O.classList
            );
          }
          function u(O) {
            var L = O.type,
              D = O.tagName;
            return !!(
              (D === "INPUT" && s[L] && !O.readOnly) ||
              (D === "TEXTAREA" && !O.readOnly) ||
              O.isContentEditable
            );
          }
          function l(O) {
            O.getAttribute("data-wf-focus-visible") ||
              O.setAttribute("data-wf-focus-visible", "true");
          }
          function m(O) {
            O.getAttribute("data-wf-focus-visible") &&
              O.removeAttribute("data-wf-focus-visible");
          }
          function v(O) {
            O.metaKey ||
              O.altKey ||
              O.ctrlKey ||
              (a(n.activeElement) && l(n.activeElement), (r = !0));
          }
          function p() {
            r = !1;
          }
          function y(O) {
            a(O.target) && (r || u(O.target)) && l(O.target);
          }
          function T(O) {
            a(O.target) &&
              O.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              m(O.target));
          }
          function I() {
            document.visibilityState === "hidden" && (i && (r = !0), S());
          }
          function S() {
            document.addEventListener("mousemove", R),
              document.addEventListener("mousedown", R),
              document.addEventListener("mouseup", R),
              document.addEventListener("pointermove", R),
              document.addEventListener("pointerdown", R),
              document.addEventListener("pointerup", R),
              document.addEventListener("touchmove", R),
              document.addEventListener("touchstart", R),
              document.addEventListener("touchend", R);
          }
          function b() {
            document.removeEventListener("mousemove", R),
              document.removeEventListener("mousedown", R),
              document.removeEventListener("mouseup", R),
              document.removeEventListener("pointermove", R),
              document.removeEventListener("pointerdown", R),
              document.removeEventListener("pointerup", R),
              document.removeEventListener("touchmove", R),
              document.removeEventListener("touchstart", R),
              document.removeEventListener("touchend", R);
          }
          function R(O) {
            (O.target.nodeName && O.target.nodeName.toLowerCase() === "html") ||
              ((r = !1), b());
          }
          document.addEventListener("keydown", v, !0),
            document.addEventListener("mousedown", p, !0),
            document.addEventListener("pointerdown", p, !0),
            document.addEventListener("touchstart", p, !0),
            document.addEventListener("visibilitychange", I, !0),
            S(),
            n.addEventListener("focus", y, !0),
            n.addEventListener("blur", T, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Da = f((VF, Na) => {
    "use strict";
    var Pa = Xe();
    Pa.define(
      "focus",
      (Na.exports = function () {
        var e = [],
          t = !1;
        function n(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function r(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          r(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Pa.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", n, !0),
            document.addEventListener("click", n, !0));
        }
        return { ready: o };
      })
    );
  });
  var qa = f((UF, Fa) => {
    "use strict";
    var ei = window.jQuery,
      Ze = {},
      Mn = [],
      Ma = ".w-ix",
      Fn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ei(t).triggerHandler(Ze.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ei(t).triggerHandler(Ze.types.OUTRO));
        },
      };
    Ze.triggers = {};
    Ze.types = { INTRO: "w-ix-intro" + Ma, OUTRO: "w-ix-outro" + Ma };
    Ze.init = function () {
      for (var e = Mn.length, t = 0; t < e; t++) {
        var n = Mn[t];
        n[0](0, n[1]);
      }
      (Mn = []), ei.extend(Ze.triggers, Fn);
    };
    Ze.async = function () {
      for (var e in Fn) {
        var t = Fn[e];
        Fn.hasOwnProperty(e) &&
          (Ze.triggers[e] = function (n, r) {
            Mn.push([t, r]);
          });
      }
    };
    Ze.async();
    Fa.exports = Ze;
  });
  var kn = f((WF, Xa) => {
    "use strict";
    var ti = qa();
    function ka(e, t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
    }
    var uy = window.jQuery,
      qn = {},
      Ga = ".w-ix",
      cy = {
        reset: function (e, t) {
          ti.triggers.reset(e, t);
        },
        intro: function (e, t) {
          ti.triggers.intro(e, t), ka(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          ti.triggers.outro(e, t), ka(t, "COMPONENT_INACTIVE");
        },
      };
    qn.triggers = {};
    qn.types = { INTRO: "w-ix-intro" + Ga, OUTRO: "w-ix-outro" + Ga };
    uy.extend(qn.triggers, cy);
    Xa.exports = qn;
  });
  var ni = f((BF, Va) => {
    var ly =
      typeof global == "object" && global && global.Object === Object && global;
    Va.exports = ly;
  });
  var ze = f((HF, Ua) => {
    var fy = ni(),
      dy = typeof self == "object" && self && self.Object === Object && self,
      py = fy || dy || Function("return this")();
    Ua.exports = py;
  });
  var xt = f((zF, Wa) => {
    var hy = ze(),
      gy = hy.Symbol;
    Wa.exports = gy;
  });
  var ja = f((jF, za) => {
    var Ba = xt(),
      Ha = Object.prototype,
      vy = Ha.hasOwnProperty,
      yy = Ha.toString,
      nn = Ba ? Ba.toStringTag : void 0;
    function Ey(e) {
      var t = vy.call(e, nn),
        n = e[nn];
      try {
        e[nn] = void 0;
        var r = !0;
      } catch {}
      var i = yy.call(e);
      return r && (t ? (e[nn] = n) : delete e[nn]), i;
    }
    za.exports = Ey;
  });
  var Ya = f((KF, Ka) => {
    var my = Object.prototype,
      _y = my.toString;
    function Iy(e) {
      return _y.call(e);
    }
    Ka.exports = Iy;
  });
  var ft = f((YF, Za) => {
    var Qa = xt(),
      Ty = ja(),
      by = Ya(),
      wy = "[object Null]",
      Ay = "[object Undefined]",
      $a = Qa ? Qa.toStringTag : void 0;
    function Sy(e) {
      return e == null
        ? e === void 0
          ? Ay
          : wy
        : $a && $a in Object(e)
        ? Ty(e)
        : by(e);
    }
    Za.exports = Sy;
  });
  var ri = f((QF, Ja) => {
    function Oy(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    Ja.exports = Oy;
  });
  var ii = f(($F, es) => {
    var xy = ri(),
      Ry = xy(Object.getPrototypeOf, Object);
    es.exports = Ry;
  });
  var ot = f((ZF, ts) => {
    function Cy(e) {
      return e != null && typeof e == "object";
    }
    ts.exports = Cy;
  });
  var oi = f((JF, rs) => {
    var Ly = ft(),
      Py = ii(),
      Ny = ot(),
      Dy = "[object Object]",
      My = Function.prototype,
      Fy = Object.prototype,
      ns = My.toString,
      qy = Fy.hasOwnProperty,
      ky = ns.call(Object);
    function Gy(e) {
      if (!Ny(e) || Ly(e) != Dy) return !1;
      var t = Py(e);
      if (t === null) return !0;
      var n = qy.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && ns.call(n) == ky;
    }
    rs.exports = Gy;
  });
  var is = f((ai) => {
    "use strict";
    Object.defineProperty(ai, "__esModule", { value: !0 });
    ai.default = Xy;
    function Xy(e) {
      var t,
        n = e.Symbol;
      return (
        typeof n == "function"
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var os = f((ui, si) => {
    "use strict";
    Object.defineProperty(ui, "__esModule", { value: !0 });
    var Vy = is(),
      Uy = Wy(Vy);
    function Wy(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Rt;
    typeof self < "u"
      ? (Rt = self)
      : typeof window < "u"
      ? (Rt = window)
      : typeof global < "u"
      ? (Rt = global)
      : typeof si < "u"
      ? (Rt = si)
      : (Rt = Function("return this")());
    var By = (0, Uy.default)(Rt);
    ui.default = By;
  });
  var ci = f((rn) => {
    "use strict";
    rn.__esModule = !0;
    rn.ActionTypes = void 0;
    rn.default = cs;
    var Hy = oi(),
      zy = us(Hy),
      jy = os(),
      as = us(jy);
    function us(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ss = (rn.ActionTypes = { INIT: "@@redux/INIT" });
    function cs(e, t, n) {
      var r;
      if (
        (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
        typeof n < "u")
      ) {
        if (typeof n != "function")
          throw new Error("Expected the enhancer to be a function.");
        return n(cs)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function l() {
        a === s && (a = s.slice());
      }
      function m() {
        return o;
      }
      function v(I) {
        if (typeof I != "function")
          throw new Error("Expected listener to be a function.");
        var S = !0;
        return (
          l(),
          a.push(I),
          function () {
            if (S) {
              (S = !1), l();
              var R = a.indexOf(I);
              a.splice(R, 1);
            }
          }
        );
      }
      function p(I) {
        if (!(0, zy.default)(I))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof I.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, I));
        } finally {
          u = !1;
        }
        for (var S = (s = a), b = 0; b < S.length; b++) S[b]();
        return I;
      }
      function y(I) {
        if (typeof I != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = I), p({ type: ss.INIT });
      }
      function T() {
        var I,
          S = v;
        return (
          (I = {
            subscribe: function (R) {
              if (typeof R != "object")
                throw new TypeError("Expected the observer to be an object.");
              function O() {
                R.next && R.next(m());
              }
              O();
              var L = S(O);
              return { unsubscribe: L };
            },
          }),
          (I[as.default] = function () {
            return this;
          }),
          I
        );
      }
      return (
        p({ type: ss.INIT }),
        (r = { dispatch: p, subscribe: v, getState: m, replaceReducer: y }),
        (r[as.default] = T),
        r
      );
    }
  });
  var fi = f((li) => {
    "use strict";
    li.__esModule = !0;
    li.default = Ky;
    function Ky(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var ds = f((di) => {
    "use strict";
    di.__esModule = !0;
    di.default = Jy;
    var ls = ci(),
      Yy = oi(),
      r1 = fs(Yy),
      Qy = fi(),
      i1 = fs(Qy);
    function fs(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function $y(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Zy(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, { type: ls.ActionTypes.INIT });
        if (typeof r > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof n(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                ls.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Jy(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        typeof e[i] == "function" && (n[i] = e[i]);
      }
      var o = Object.keys(n);
      if (!1) var s;
      var a;
      try {
        Zy(n);
      } catch (u) {
        a = u;
      }
      return function () {
        var l =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          m = arguments[1];
        if (a) throw a;
        if (!1) var v;
        for (var p = !1, y = {}, T = 0; T < o.length; T++) {
          var I = o[T],
            S = n[I],
            b = l[I],
            R = S(b, m);
          if (typeof R > "u") {
            var O = $y(I, m);
            throw new Error(O);
          }
          (y[I] = R), (p = p || R !== b);
        }
        return p ? y : l;
      };
    }
  });
  var hs = f((pi) => {
    "use strict";
    pi.__esModule = !0;
    pi.default = eE;
    function ps(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function eE(e, t) {
      if (typeof e == "function") return ps(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(e), r = {}, i = 0; i < n.length; i++) {
        var o = n[i],
          s = e[o];
        typeof s == "function" && (r[o] = ps(s, t));
      }
      return r;
    }
  });
  var gi = f((hi) => {
    "use strict";
    hi.__esModule = !0;
    hi.default = tE;
    function tE() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var r = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, r.apply(void 0, arguments));
      };
    }
  });
  var gs = f((vi) => {
    "use strict";
    vi.__esModule = !0;
    var nE =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    vi.default = aE;
    var rE = gi(),
      iE = oE(rE);
    function oE(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function aE() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (r) {
        return function (i, o, s) {
          var a = r(i, o, s),
            u = a.dispatch,
            l = [],
            m = {
              getState: a.getState,
              dispatch: function (p) {
                return u(p);
              },
            };
          return (
            (l = t.map(function (v) {
              return v(m);
            })),
            (u = iE.default.apply(void 0, l)(a.dispatch)),
            nE({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var yi = f((Ve) => {
    "use strict";
    Ve.__esModule = !0;
    Ve.compose =
      Ve.applyMiddleware =
      Ve.bindActionCreators =
      Ve.combineReducers =
      Ve.createStore =
        void 0;
    var sE = ci(),
      uE = Ct(sE),
      cE = ds(),
      lE = Ct(cE),
      fE = hs(),
      dE = Ct(fE),
      pE = gs(),
      hE = Ct(pE),
      gE = gi(),
      vE = Ct(gE),
      yE = fi(),
      c1 = Ct(yE);
    function Ct(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ve.createStore = uE.default;
    Ve.combineReducers = lE.default;
    Ve.bindActionCreators = dE.default;
    Ve.applyMiddleware = hE.default;
    Ve.compose = vE.default;
  });
  var je,
    Ei,
    Je,
    EE,
    mE,
    Gn,
    _E,
    mi = ye(() => {
      "use strict";
      (je = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Ei = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (Je = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (EE = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (mE = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Gn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (_E = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Ce,
    IE,
    Xn = ye(() => {
      "use strict";
      (Ce = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (IE = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var TE,
    vs = ye(() => {
      "use strict";
      TE = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var bE,
    wE,
    AE,
    SE,
    OE,
    xE,
    RE,
    _i,
    ys = ye(() => {
      "use strict";
      Xn();
      ({
        TRANSFORM_MOVE: bE,
        TRANSFORM_SCALE: wE,
        TRANSFORM_ROTATE: AE,
        TRANSFORM_SKEW: SE,
        STYLE_SIZE: OE,
        STYLE_FILTER: xE,
        STYLE_FONT_VARIATION: RE,
      } = Ce),
        (_i = {
          [bE]: !0,
          [wE]: !0,
          [AE]: !0,
          [SE]: !0,
          [OE]: !0,
          [xE]: !0,
          [RE]: !0,
        });
    });
  var be = {};
  De(be, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => zE,
    IX2_ANIMATION_FRAME_CHANGED: () => XE,
    IX2_CLEAR_REQUESTED: () => qE,
    IX2_ELEMENT_STATE_CHANGED: () => HE,
    IX2_EVENT_LISTENER_ADDED: () => kE,
    IX2_EVENT_STATE_CHANGED: () => GE,
    IX2_INSTANCE_ADDED: () => UE,
    IX2_INSTANCE_REMOVED: () => BE,
    IX2_INSTANCE_STARTED: () => WE,
    IX2_MEDIA_QUERIES_DEFINED: () => KE,
    IX2_PARAMETER_CHANGED: () => VE,
    IX2_PLAYBACK_REQUESTED: () => ME,
    IX2_PREVIEW_REQUESTED: () => DE,
    IX2_RAW_DATA_IMPORTED: () => CE,
    IX2_SESSION_INITIALIZED: () => LE,
    IX2_SESSION_STARTED: () => PE,
    IX2_SESSION_STOPPED: () => NE,
    IX2_STOP_REQUESTED: () => FE,
    IX2_TEST_FRAME_RENDERED: () => YE,
    IX2_VIEWPORT_WIDTH_CHANGED: () => jE,
  });
  var CE,
    LE,
    PE,
    NE,
    DE,
    ME,
    FE,
    qE,
    kE,
    GE,
    XE,
    VE,
    UE,
    WE,
    BE,
    HE,
    zE,
    jE,
    KE,
    YE,
    Es = ye(() => {
      "use strict";
      (CE = "IX2_RAW_DATA_IMPORTED"),
        (LE = "IX2_SESSION_INITIALIZED"),
        (PE = "IX2_SESSION_STARTED"),
        (NE = "IX2_SESSION_STOPPED"),
        (DE = "IX2_PREVIEW_REQUESTED"),
        (ME = "IX2_PLAYBACK_REQUESTED"),
        (FE = "IX2_STOP_REQUESTED"),
        (qE = "IX2_CLEAR_REQUESTED"),
        (kE = "IX2_EVENT_LISTENER_ADDED"),
        (GE = "IX2_EVENT_STATE_CHANGED"),
        (XE = "IX2_ANIMATION_FRAME_CHANGED"),
        (VE = "IX2_PARAMETER_CHANGED"),
        (UE = "IX2_INSTANCE_ADDED"),
        (WE = "IX2_INSTANCE_STARTED"),
        (BE = "IX2_INSTANCE_REMOVED"),
        (HE = "IX2_ELEMENT_STATE_CHANGED"),
        (zE = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (jE = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (KE = "IX2_MEDIA_QUERIES_DEFINED"),
        (YE = "IX2_TEST_FRAME_RENDERED");
    });
  var Se = {};
  De(Se, {
    ABSTRACT_NODE: () => jm,
    AUTO: () => Fm,
    BACKGROUND: () => Cm,
    BACKGROUND_COLOR: () => Rm,
    BAR_DELIMITER: () => Gm,
    BORDER_COLOR: () => Lm,
    BOUNDARY_SELECTOR: () => em,
    CHILDREN: () => Xm,
    COLON_DELIMITER: () => km,
    COLOR: () => Pm,
    COMMA_DELIMITER: () => qm,
    CONFIG_UNIT: () => um,
    CONFIG_VALUE: () => im,
    CONFIG_X_UNIT: () => om,
    CONFIG_X_VALUE: () => tm,
    CONFIG_Y_UNIT: () => am,
    CONFIG_Y_VALUE: () => nm,
    CONFIG_Z_UNIT: () => sm,
    CONFIG_Z_VALUE: () => rm,
    DISPLAY: () => Nm,
    FILTER: () => Am,
    FLEX: () => Dm,
    FONT_VARIATION_SETTINGS: () => Sm,
    HEIGHT: () => xm,
    HTML_ELEMENT: () => Hm,
    IMMEDIATE_CHILDREN: () => Vm,
    IX2_ID_DELIMITER: () => QE,
    OPACITY: () => wm,
    PARENT: () => Wm,
    PLAIN_OBJECT: () => zm,
    PRESERVE_3D: () => Bm,
    RENDER_GENERAL: () => Ym,
    RENDER_PLUGIN: () => $m,
    RENDER_STYLE: () => Qm,
    RENDER_TRANSFORM: () => Km,
    ROTATE_X: () => Em,
    ROTATE_Y: () => mm,
    ROTATE_Z: () => _m,
    SCALE_3D: () => ym,
    SCALE_X: () => hm,
    SCALE_Y: () => gm,
    SCALE_Z: () => vm,
    SIBLINGS: () => Um,
    SKEW: () => Im,
    SKEW_X: () => Tm,
    SKEW_Y: () => bm,
    TRANSFORM: () => cm,
    TRANSLATE_3D: () => pm,
    TRANSLATE_X: () => lm,
    TRANSLATE_Y: () => fm,
    TRANSLATE_Z: () => dm,
    WF_PAGE: () => $E,
    WIDTH: () => Om,
    WILL_CHANGE: () => Mm,
    W_MOD_IX: () => JE,
    W_MOD_JS: () => ZE,
  });
  var QE,
    $E,
    ZE,
    JE,
    em,
    tm,
    nm,
    rm,
    im,
    om,
    am,
    sm,
    um,
    cm,
    lm,
    fm,
    dm,
    pm,
    hm,
    gm,
    vm,
    ym,
    Em,
    mm,
    _m,
    Im,
    Tm,
    bm,
    wm,
    Am,
    Sm,
    Om,
    xm,
    Rm,
    Cm,
    Lm,
    Pm,
    Nm,
    Dm,
    Mm,
    Fm,
    qm,
    km,
    Gm,
    Xm,
    Vm,
    Um,
    Wm,
    Bm,
    Hm,
    zm,
    jm,
    Km,
    Ym,
    Qm,
    $m,
    ms = ye(() => {
      "use strict";
      (QE = "|"),
        ($E = "data-wf-page"),
        (ZE = "w-mod-js"),
        (JE = "w-mod-ix"),
        (em = ".w-dyn-item"),
        (tm = "xValue"),
        (nm = "yValue"),
        (rm = "zValue"),
        (im = "value"),
        (om = "xUnit"),
        (am = "yUnit"),
        (sm = "zUnit"),
        (um = "unit"),
        (cm = "transform"),
        (lm = "translateX"),
        (fm = "translateY"),
        (dm = "translateZ"),
        (pm = "translate3d"),
        (hm = "scaleX"),
        (gm = "scaleY"),
        (vm = "scaleZ"),
        (ym = "scale3d"),
        (Em = "rotateX"),
        (mm = "rotateY"),
        (_m = "rotateZ"),
        (Im = "skew"),
        (Tm = "skewX"),
        (bm = "skewY"),
        (wm = "opacity"),
        (Am = "filter"),
        (Sm = "font-variation-settings"),
        (Om = "width"),
        (xm = "height"),
        (Rm = "backgroundColor"),
        (Cm = "background"),
        (Lm = "borderColor"),
        (Pm = "color"),
        (Nm = "display"),
        (Dm = "flex"),
        (Mm = "willChange"),
        (Fm = "AUTO"),
        (qm = ","),
        (km = ":"),
        (Gm = "|"),
        (Xm = "CHILDREN"),
        (Vm = "IMMEDIATE_CHILDREN"),
        (Um = "SIBLINGS"),
        (Wm = "PARENT"),
        (Bm = "preserve-3d"),
        (Hm = "HTML_ELEMENT"),
        (zm = "PLAIN_OBJECT"),
        (jm = "ABSTRACT_NODE"),
        (Km = "RENDER_TRANSFORM"),
        (Ym = "RENDER_GENERAL"),
        (Qm = "RENDER_STYLE"),
        ($m = "RENDER_PLUGIN");
    });
  var _s = {};
  De(_s, {
    ActionAppliesTo: () => IE,
    ActionTypeConsts: () => Ce,
    EventAppliesTo: () => Ei,
    EventBasedOn: () => Je,
    EventContinuousMouseAxes: () => EE,
    EventLimitAffectedElements: () => mE,
    EventTypeConsts: () => je,
    IX2EngineActionTypes: () => be,
    IX2EngineConstants: () => Se,
    InteractionTypeConsts: () => TE,
    QuickEffectDirectionConsts: () => _E,
    QuickEffectIds: () => Gn,
    ReducedMotionTypes: () => _i,
  });
  var Me = ye(() => {
    "use strict";
    mi();
    Xn();
    vs();
    ys();
    Es();
    ms();
    Xn();
    mi();
  });
  var Zm,
    Is,
    Ts = ye(() => {
      "use strict";
      Me();
      ({ IX2_RAW_DATA_IMPORTED: Zm } = be),
        (Is = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case Zm:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Lt = f((me) => {
    "use strict";
    Object.defineProperty(me, "__esModule", { value: !0 });
    var Jm =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    me.clone = Un;
    me.addLast = As;
    me.addFirst = Ss;
    me.removeLast = Os;
    me.removeFirst = xs;
    me.insert = Rs;
    me.removeAt = Cs;
    me.replaceAt = Ls;
    me.getIn = Wn;
    me.set = Bn;
    me.setIn = Hn;
    me.update = Ns;
    me.updateIn = Ds;
    me.merge = Ms;
    me.mergeDeep = Fs;
    me.mergeIn = qs;
    me.omit = ks;
    me.addDefaults = Gs;
    var bs = "INVALID_ARGS";
    function ws(e) {
      throw new Error(e);
    }
    function Ii(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var e_ = {}.hasOwnProperty;
    function Un(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Ii(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        n[i] = e[i];
      }
      return n;
    }
    function Fe(e, t, n) {
      var r = n;
      r == null && ws(bs);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var l = s[u];
        if (l != null) {
          var m = Ii(l);
          if (m.length)
            for (var v = 0; v <= m.length; v++) {
              var p = m[v];
              if (!(e && r[p] !== void 0)) {
                var y = l[p];
                t && Vn(r[p]) && Vn(y) && (y = Fe(e, t, r[p], y)),
                  !(y === void 0 || y === r[p]) &&
                    (i || ((i = !0), (r = Un(r))), (r[p] = y));
              }
            }
        }
      }
      return r;
    }
    function Vn(e) {
      var t = typeof e > "u" ? "undefined" : Jm(e);
      return e != null && (t === "object" || t === "function");
    }
    function As(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Ss(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Os(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function xs(e) {
      return e.length ? e.slice(1) : e;
    }
    function Rs(e, t, n) {
      return e
        .slice(0, t)
        .concat(Array.isArray(n) ? n : [n])
        .concat(e.slice(t));
    }
    function Cs(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Ls(e, t, n) {
      if (e[t] === n) return e;
      for (var r = e.length, i = Array(r), o = 0; o < r; o++) i[o] = e[o];
      return (i[t] = n), i;
    }
    function Wn(e, t) {
      if ((!Array.isArray(t) && ws(bs), e != null)) {
        for (var n = e, r = 0; r < t.length; r++) {
          var i = t[r];
          if (((n = n?.[i]), n === void 0)) return n;
        }
        return n;
      }
    }
    function Bn(e, t, n) {
      var r = typeof t == "number" ? [] : {},
        i = e ?? r;
      if (i[t] === n) return i;
      var o = Un(i);
      return (o[t] = n), o;
    }
    function Ps(e, t, n, r) {
      var i = void 0,
        o = t[r];
      if (r === t.length - 1) i = n;
      else {
        var s =
          Vn(e) && Vn(e[o]) ? e[o] : typeof t[r + 1] == "number" ? [] : {};
        i = Ps(s, t, n, r + 1);
      }
      return Bn(e, o, i);
    }
    function Hn(e, t, n) {
      return t.length ? Ps(e, t, n, 0) : n;
    }
    function Ns(e, t, n) {
      var r = e?.[t],
        i = n(r);
      return Bn(e, t, i);
    }
    function Ds(e, t, n) {
      var r = Wn(e, t),
        i = n(r);
      return Hn(e, t, i);
    }
    function Ms(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Fe.call.apply(Fe, [null, !1, !1, e, t, n, r, i, o].concat(a))
        : Fe(!1, !1, e, t, n, r, i, o);
    }
    function Fs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Fe.call.apply(Fe, [null, !1, !0, e, t, n, r, i, o].concat(a))
        : Fe(!1, !0, e, t, n, r, i, o);
    }
    function qs(e, t, n, r, i, o, s) {
      var a = Wn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          l = arguments.length,
          m = Array(l > 7 ? l - 7 : 0),
          v = 7;
        v < l;
        v++
      )
        m[v - 7] = arguments[v];
      return (
        m.length
          ? (u = Fe.call.apply(Fe, [null, !1, !1, a, n, r, i, o, s].concat(m)))
          : (u = Fe(!1, !1, a, n, r, i, o, s)),
        Hn(e, t, u)
      );
    }
    function ks(e, t) {
      for (var n = Array.isArray(t) ? t : [t], r = !1, i = 0; i < n.length; i++)
        if (e_.call(e, n[i])) {
          r = !0;
          break;
        }
      if (!r) return e;
      for (var o = {}, s = Ii(e), a = 0; a < s.length; a++) {
        var u = s[a];
        n.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Gs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Fe.call.apply(Fe, [null, !0, !1, e, t, n, r, i, o].concat(a))
        : Fe(!0, !1, e, t, n, r, i, o);
    }
    var t_ = {
      clone: Un,
      addLast: As,
      addFirst: Ss,
      removeLast: Os,
      removeFirst: xs,
      insert: Rs,
      removeAt: Cs,
      replaceAt: Ls,
      getIn: Wn,
      set: Bn,
      setIn: Hn,
      update: Ns,
      updateIn: Ds,
      merge: Ms,
      mergeDeep: Fs,
      mergeIn: qs,
      omit: ks,
      addDefaults: Gs,
    };
    me.default = t_;
  });
  var Vs,
    n_,
    r_,
    i_,
    o_,
    a_,
    Xs,
    Us,
    Ws = ye(() => {
      "use strict";
      Me();
      (Vs = de(Lt())),
        ({
          IX2_PREVIEW_REQUESTED: n_,
          IX2_PLAYBACK_REQUESTED: r_,
          IX2_STOP_REQUESTED: i_,
          IX2_CLEAR_REQUESTED: o_,
        } = be),
        (a_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Xs = Object.create(null, {
          [n_]: { value: "preview" },
          [r_]: { value: "playback" },
          [i_]: { value: "stop" },
          [o_]: { value: "clear" },
        })),
        (Us = (e = a_, t) => {
          if (t.type in Xs) {
            let n = [Xs[t.type]];
            return (0, Vs.setIn)(e, [n], { ...t.payload });
          }
          return e;
        });
    });
  var Le,
    s_,
    u_,
    c_,
    l_,
    f_,
    d_,
    p_,
    h_,
    g_,
    v_,
    Bs,
    y_,
    Hs,
    zs = ye(() => {
      "use strict";
      Me();
      (Le = de(Lt())),
        ({
          IX2_SESSION_INITIALIZED: s_,
          IX2_SESSION_STARTED: u_,
          IX2_TEST_FRAME_RENDERED: c_,
          IX2_SESSION_STOPPED: l_,
          IX2_EVENT_LISTENER_ADDED: f_,
          IX2_EVENT_STATE_CHANGED: d_,
          IX2_ANIMATION_FRAME_CHANGED: p_,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: h_,
          IX2_VIEWPORT_WIDTH_CHANGED: g_,
          IX2_MEDIA_QUERIES_DEFINED: v_,
        } = be),
        (Bs = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (y_ = 20),
        (Hs = (e = Bs, t) => {
          switch (t.type) {
            case s_: {
              let { hasBoundaryNodes: n, reducedMotion: r } = t.payload;
              return (0, Le.merge)(e, {
                hasBoundaryNodes: n,
                reducedMotion: r,
              });
            }
            case u_:
              return (0, Le.set)(e, "active", !0);
            case c_: {
              let {
                payload: { step: n = y_ },
              } = t;
              return (0, Le.set)(e, "tick", e.tick + n);
            }
            case l_:
              return Bs;
            case p_: {
              let {
                payload: { now: n },
              } = t;
              return (0, Le.set)(e, "tick", n);
            }
            case f_: {
              let n = (0, Le.addLast)(e.eventListeners, t.payload);
              return (0, Le.set)(e, "eventListeners", n);
            }
            case d_: {
              let { stateKey: n, newState: r } = t.payload;
              return (0, Le.setIn)(e, ["eventState", n], r);
            }
            case h_: {
              let { actionListId: n, isPlaying: r } = t.payload;
              return (0, Le.setIn)(e, ["playbackState", n], r);
            }
            case g_: {
              let { width: n, mediaQueries: r } = t.payload,
                i = r.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: l } = r[s];
                if (n >= u && n <= l) {
                  o = a;
                  break;
                }
              }
              return (0, Le.merge)(e, { viewportWidth: n, mediaQueryKey: o });
            }
            case v_:
              return (0, Le.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var Ks = f((R1, js) => {
    function E_() {
      (this.__data__ = []), (this.size = 0);
    }
    js.exports = E_;
  });
  var zn = f((C1, Ys) => {
    function m_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Ys.exports = m_;
  });
  var on = f((L1, Qs) => {
    var __ = zn();
    function I_(e, t) {
      for (var n = e.length; n--; ) if (__(e[n][0], t)) return n;
      return -1;
    }
    Qs.exports = I_;
  });
  var Zs = f((P1, $s) => {
    var T_ = on(),
      b_ = Array.prototype,
      w_ = b_.splice;
    function A_(e) {
      var t = this.__data__,
        n = T_(t, e);
      if (n < 0) return !1;
      var r = t.length - 1;
      return n == r ? t.pop() : w_.call(t, n, 1), --this.size, !0;
    }
    $s.exports = A_;
  });
  var eu = f((N1, Js) => {
    var S_ = on();
    function O_(e) {
      var t = this.__data__,
        n = S_(t, e);
      return n < 0 ? void 0 : t[n][1];
    }
    Js.exports = O_;
  });
  var nu = f((D1, tu) => {
    var x_ = on();
    function R_(e) {
      return x_(this.__data__, e) > -1;
    }
    tu.exports = R_;
  });
  var iu = f((M1, ru) => {
    var C_ = on();
    function L_(e, t) {
      var n = this.__data__,
        r = C_(n, e);
      return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
    }
    ru.exports = L_;
  });
  var an = f((F1, ou) => {
    var P_ = Ks(),
      N_ = Zs(),
      D_ = eu(),
      M_ = nu(),
      F_ = iu();
    function Pt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Pt.prototype.clear = P_;
    Pt.prototype.delete = N_;
    Pt.prototype.get = D_;
    Pt.prototype.has = M_;
    Pt.prototype.set = F_;
    ou.exports = Pt;
  });
  var su = f((q1, au) => {
    var q_ = an();
    function k_() {
      (this.__data__ = new q_()), (this.size = 0);
    }
    au.exports = k_;
  });
  var cu = f((k1, uu) => {
    function G_(e) {
      var t = this.__data__,
        n = t.delete(e);
      return (this.size = t.size), n;
    }
    uu.exports = G_;
  });
  var fu = f((G1, lu) => {
    function X_(e) {
      return this.__data__.get(e);
    }
    lu.exports = X_;
  });
  var pu = f((X1, du) => {
    function V_(e) {
      return this.__data__.has(e);
    }
    du.exports = V_;
  });
  var et = f((V1, hu) => {
    function U_(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    hu.exports = U_;
  });
  var Ti = f((U1, gu) => {
    var W_ = ft(),
      B_ = et(),
      H_ = "[object AsyncFunction]",
      z_ = "[object Function]",
      j_ = "[object GeneratorFunction]",
      K_ = "[object Proxy]";
    function Y_(e) {
      if (!B_(e)) return !1;
      var t = W_(e);
      return t == z_ || t == j_ || t == H_ || t == K_;
    }
    gu.exports = Y_;
  });
  var yu = f((W1, vu) => {
    var Q_ = ze(),
      $_ = Q_["__core-js_shared__"];
    vu.exports = $_;
  });
  var _u = f((B1, mu) => {
    var bi = yu(),
      Eu = (function () {
        var e = /[^.]+$/.exec((bi && bi.keys && bi.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function Z_(e) {
      return !!Eu && Eu in e;
    }
    mu.exports = Z_;
  });
  var wi = f((H1, Iu) => {
    var J_ = Function.prototype,
      eI = J_.toString;
    function tI(e) {
      if (e != null) {
        try {
          return eI.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Iu.exports = tI;
  });
  var bu = f((z1, Tu) => {
    var nI = Ti(),
      rI = _u(),
      iI = et(),
      oI = wi(),
      aI = /[\\^$.*+?()[\]{}|]/g,
      sI = /^\[object .+?Constructor\]$/,
      uI = Function.prototype,
      cI = Object.prototype,
      lI = uI.toString,
      fI = cI.hasOwnProperty,
      dI = RegExp(
        "^" +
          lI
            .call(fI)
            .replace(aI, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function pI(e) {
      if (!iI(e) || rI(e)) return !1;
      var t = nI(e) ? dI : sI;
      return t.test(oI(e));
    }
    Tu.exports = pI;
  });
  var Au = f((j1, wu) => {
    function hI(e, t) {
      return e?.[t];
    }
    wu.exports = hI;
  });
  var dt = f((K1, Su) => {
    var gI = bu(),
      vI = Au();
    function yI(e, t) {
      var n = vI(e, t);
      return gI(n) ? n : void 0;
    }
    Su.exports = yI;
  });
  var jn = f((Y1, Ou) => {
    var EI = dt(),
      mI = ze(),
      _I = EI(mI, "Map");
    Ou.exports = _I;
  });
  var sn = f((Q1, xu) => {
    var II = dt(),
      TI = II(Object, "create");
    xu.exports = TI;
  });
  var Lu = f(($1, Cu) => {
    var Ru = sn();
    function bI() {
      (this.__data__ = Ru ? Ru(null) : {}), (this.size = 0);
    }
    Cu.exports = bI;
  });
  var Nu = f((Z1, Pu) => {
    function wI(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Pu.exports = wI;
  });
  var Mu = f((J1, Du) => {
    var AI = sn(),
      SI = "__lodash_hash_undefined__",
      OI = Object.prototype,
      xI = OI.hasOwnProperty;
    function RI(e) {
      var t = this.__data__;
      if (AI) {
        var n = t[e];
        return n === SI ? void 0 : n;
      }
      return xI.call(t, e) ? t[e] : void 0;
    }
    Du.exports = RI;
  });
  var qu = f((e2, Fu) => {
    var CI = sn(),
      LI = Object.prototype,
      PI = LI.hasOwnProperty;
    function NI(e) {
      var t = this.__data__;
      return CI ? t[e] !== void 0 : PI.call(t, e);
    }
    Fu.exports = NI;
  });
  var Gu = f((t2, ku) => {
    var DI = sn(),
      MI = "__lodash_hash_undefined__";
    function FI(e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = DI && t === void 0 ? MI : t),
        this
      );
    }
    ku.exports = FI;
  });
  var Vu = f((n2, Xu) => {
    var qI = Lu(),
      kI = Nu(),
      GI = Mu(),
      XI = qu(),
      VI = Gu();
    function Nt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Nt.prototype.clear = qI;
    Nt.prototype.delete = kI;
    Nt.prototype.get = GI;
    Nt.prototype.has = XI;
    Nt.prototype.set = VI;
    Xu.exports = Nt;
  });
  var Bu = f((r2, Wu) => {
    var Uu = Vu(),
      UI = an(),
      WI = jn();
    function BI() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Uu(),
          map: new (WI || UI)(),
          string: new Uu(),
        });
    }
    Wu.exports = BI;
  });
  var zu = f((i2, Hu) => {
    function HI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Hu.exports = HI;
  });
  var un = f((o2, ju) => {
    var zI = zu();
    function jI(e, t) {
      var n = e.__data__;
      return zI(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
    }
    ju.exports = jI;
  });
  var Yu = f((a2, Ku) => {
    var KI = un();
    function YI(e) {
      var t = KI(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Ku.exports = YI;
  });
  var $u = f((s2, Qu) => {
    var QI = un();
    function $I(e) {
      return QI(this, e).get(e);
    }
    Qu.exports = $I;
  });
  var Ju = f((u2, Zu) => {
    var ZI = un();
    function JI(e) {
      return ZI(this, e).has(e);
    }
    Zu.exports = JI;
  });
  var tc = f((c2, ec) => {
    var eT = un();
    function tT(e, t) {
      var n = eT(this, e),
        r = n.size;
      return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
    }
    ec.exports = tT;
  });
  var Kn = f((l2, nc) => {
    var nT = Bu(),
      rT = Yu(),
      iT = $u(),
      oT = Ju(),
      aT = tc();
    function Dt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Dt.prototype.clear = nT;
    Dt.prototype.delete = rT;
    Dt.prototype.get = iT;
    Dt.prototype.has = oT;
    Dt.prototype.set = aT;
    nc.exports = Dt;
  });
  var ic = f((f2, rc) => {
    var sT = an(),
      uT = jn(),
      cT = Kn(),
      lT = 200;
    function fT(e, t) {
      var n = this.__data__;
      if (n instanceof sT) {
        var r = n.__data__;
        if (!uT || r.length < lT - 1)
          return r.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new cT(r);
      }
      return n.set(e, t), (this.size = n.size), this;
    }
    rc.exports = fT;
  });
  var Ai = f((d2, oc) => {
    var dT = an(),
      pT = su(),
      hT = cu(),
      gT = fu(),
      vT = pu(),
      yT = ic();
    function Mt(e) {
      var t = (this.__data__ = new dT(e));
      this.size = t.size;
    }
    Mt.prototype.clear = pT;
    Mt.prototype.delete = hT;
    Mt.prototype.get = gT;
    Mt.prototype.has = vT;
    Mt.prototype.set = yT;
    oc.exports = Mt;
  });
  var sc = f((p2, ac) => {
    var ET = "__lodash_hash_undefined__";
    function mT(e) {
      return this.__data__.set(e, ET), this;
    }
    ac.exports = mT;
  });
  var cc = f((h2, uc) => {
    function _T(e) {
      return this.__data__.has(e);
    }
    uc.exports = _T;
  });
  var fc = f((g2, lc) => {
    var IT = Kn(),
      TT = sc(),
      bT = cc();
    function Yn(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.__data__ = new IT(); ++t < n; ) this.add(e[t]);
    }
    Yn.prototype.add = Yn.prototype.push = TT;
    Yn.prototype.has = bT;
    lc.exports = Yn;
  });
  var pc = f((v2, dc) => {
    function wT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
        if (t(e[n], n, e)) return !0;
      return !1;
    }
    dc.exports = wT;
  });
  var gc = f((y2, hc) => {
    function AT(e, t) {
      return e.has(t);
    }
    hc.exports = AT;
  });
  var Si = f((E2, vc) => {
    var ST = fc(),
      OT = pc(),
      xT = gc(),
      RT = 1,
      CT = 2;
    function LT(e, t, n, r, i, o) {
      var s = n & RT,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var l = o.get(e),
        m = o.get(t);
      if (l && m) return l == t && m == e;
      var v = -1,
        p = !0,
        y = n & CT ? new ST() : void 0;
      for (o.set(e, t), o.set(t, e); ++v < a; ) {
        var T = e[v],
          I = t[v];
        if (r) var S = s ? r(I, T, v, t, e, o) : r(T, I, v, e, t, o);
        if (S !== void 0) {
          if (S) continue;
          p = !1;
          break;
        }
        if (y) {
          if (
            !OT(t, function (b, R) {
              if (!xT(y, R) && (T === b || i(T, b, n, r, o))) return y.push(R);
            })
          ) {
            p = !1;
            break;
          }
        } else if (!(T === I || i(T, I, n, r, o))) {
          p = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), p;
    }
    vc.exports = LT;
  });
  var Ec = f((m2, yc) => {
    var PT = ze(),
      NT = PT.Uint8Array;
    yc.exports = NT;
  });
  var _c = f((_2, mc) => {
    function DT(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r, i) {
          n[++t] = [i, r];
        }),
        n
      );
    }
    mc.exports = DT;
  });
  var Tc = f((I2, Ic) => {
    function MT(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r) {
          n[++t] = r;
        }),
        n
      );
    }
    Ic.exports = MT;
  });
  var Oc = f((T2, Sc) => {
    var bc = xt(),
      wc = Ec(),
      FT = zn(),
      qT = Si(),
      kT = _c(),
      GT = Tc(),
      XT = 1,
      VT = 2,
      UT = "[object Boolean]",
      WT = "[object Date]",
      BT = "[object Error]",
      HT = "[object Map]",
      zT = "[object Number]",
      jT = "[object RegExp]",
      KT = "[object Set]",
      YT = "[object String]",
      QT = "[object Symbol]",
      $T = "[object ArrayBuffer]",
      ZT = "[object DataView]",
      Ac = bc ? bc.prototype : void 0,
      Oi = Ac ? Ac.valueOf : void 0;
    function JT(e, t, n, r, i, o, s) {
      switch (n) {
        case ZT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case $T:
          return !(e.byteLength != t.byteLength || !o(new wc(e), new wc(t)));
        case UT:
        case WT:
        case zT:
          return FT(+e, +t);
        case BT:
          return e.name == t.name && e.message == t.message;
        case jT:
        case YT:
          return e == t + "";
        case HT:
          var a = kT;
        case KT:
          var u = r & XT;
          if ((a || (a = GT), e.size != t.size && !u)) return !1;
          var l = s.get(e);
          if (l) return l == t;
          (r |= VT), s.set(e, t);
          var m = qT(a(e), a(t), r, i, o, s);
          return s.delete(e), m;
        case QT:
          if (Oi) return Oi.call(e) == Oi.call(t);
      }
      return !1;
    }
    Sc.exports = JT;
  });
  var Qn = f((b2, xc) => {
    function eb(e, t) {
      for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
      return e;
    }
    xc.exports = eb;
  });
  var we = f((w2, Rc) => {
    var tb = Array.isArray;
    Rc.exports = tb;
  });
  var xi = f((A2, Cc) => {
    var nb = Qn(),
      rb = we();
    function ib(e, t, n) {
      var r = t(e);
      return rb(e) ? r : nb(r, n(e));
    }
    Cc.exports = ib;
  });
  var Pc = f((S2, Lc) => {
    function ob(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = 0, o = []; ++n < r; ) {
        var s = e[n];
        t(s, n, e) && (o[i++] = s);
      }
      return o;
    }
    Lc.exports = ob;
  });
  var Ri = f((O2, Nc) => {
    function ab() {
      return [];
    }
    Nc.exports = ab;
  });
  var Ci = f((x2, Mc) => {
    var sb = Pc(),
      ub = Ri(),
      cb = Object.prototype,
      lb = cb.propertyIsEnumerable,
      Dc = Object.getOwnPropertySymbols,
      fb = Dc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                sb(Dc(e), function (t) {
                  return lb.call(e, t);
                }));
          }
        : ub;
    Mc.exports = fb;
  });
  var qc = f((R2, Fc) => {
    function db(e, t) {
      for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
      return r;
    }
    Fc.exports = db;
  });
  var Gc = f((C2, kc) => {
    var pb = ft(),
      hb = ot(),
      gb = "[object Arguments]";
    function vb(e) {
      return hb(e) && pb(e) == gb;
    }
    kc.exports = vb;
  });
  var cn = f((L2, Uc) => {
    var Xc = Gc(),
      yb = ot(),
      Vc = Object.prototype,
      Eb = Vc.hasOwnProperty,
      mb = Vc.propertyIsEnumerable,
      _b = Xc(
        (function () {
          return arguments;
        })()
      )
        ? Xc
        : function (e) {
            return yb(e) && Eb.call(e, "callee") && !mb.call(e, "callee");
          };
    Uc.exports = _b;
  });
  var Bc = f((P2, Wc) => {
    function Ib() {
      return !1;
    }
    Wc.exports = Ib;
  });
  var $n = f((ln, Ft) => {
    var Tb = ze(),
      bb = Bc(),
      jc = typeof ln == "object" && ln && !ln.nodeType && ln,
      Hc = jc && typeof Ft == "object" && Ft && !Ft.nodeType && Ft,
      wb = Hc && Hc.exports === jc,
      zc = wb ? Tb.Buffer : void 0,
      Ab = zc ? zc.isBuffer : void 0,
      Sb = Ab || bb;
    Ft.exports = Sb;
  });
  var Zn = f((N2, Kc) => {
    var Ob = 9007199254740991,
      xb = /^(?:0|[1-9]\d*)$/;
    function Rb(e, t) {
      var n = typeof e;
      return (
        (t = t ?? Ob),
        !!t &&
          (n == "number" || (n != "symbol" && xb.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Kc.exports = Rb;
  });
  var Jn = f((D2, Yc) => {
    var Cb = 9007199254740991;
    function Lb(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Cb;
    }
    Yc.exports = Lb;
  });
  var $c = f((M2, Qc) => {
    var Pb = ft(),
      Nb = Jn(),
      Db = ot(),
      Mb = "[object Arguments]",
      Fb = "[object Array]",
      qb = "[object Boolean]",
      kb = "[object Date]",
      Gb = "[object Error]",
      Xb = "[object Function]",
      Vb = "[object Map]",
      Ub = "[object Number]",
      Wb = "[object Object]",
      Bb = "[object RegExp]",
      Hb = "[object Set]",
      zb = "[object String]",
      jb = "[object WeakMap]",
      Kb = "[object ArrayBuffer]",
      Yb = "[object DataView]",
      Qb = "[object Float32Array]",
      $b = "[object Float64Array]",
      Zb = "[object Int8Array]",
      Jb = "[object Int16Array]",
      ew = "[object Int32Array]",
      tw = "[object Uint8Array]",
      nw = "[object Uint8ClampedArray]",
      rw = "[object Uint16Array]",
      iw = "[object Uint32Array]",
      ve = {};
    ve[Qb] =
      ve[$b] =
      ve[Zb] =
      ve[Jb] =
      ve[ew] =
      ve[tw] =
      ve[nw] =
      ve[rw] =
      ve[iw] =
        !0;
    ve[Mb] =
      ve[Fb] =
      ve[Kb] =
      ve[qb] =
      ve[Yb] =
      ve[kb] =
      ve[Gb] =
      ve[Xb] =
      ve[Vb] =
      ve[Ub] =
      ve[Wb] =
      ve[Bb] =
      ve[Hb] =
      ve[zb] =
      ve[jb] =
        !1;
    function ow(e) {
      return Db(e) && Nb(e.length) && !!ve[Pb(e)];
    }
    Qc.exports = ow;
  });
  var Jc = f((F2, Zc) => {
    function aw(e) {
      return function (t) {
        return e(t);
      };
    }
    Zc.exports = aw;
  });
  var tl = f((fn, qt) => {
    var sw = ni(),
      el = typeof fn == "object" && fn && !fn.nodeType && fn,
      dn = el && typeof qt == "object" && qt && !qt.nodeType && qt,
      uw = dn && dn.exports === el,
      Li = uw && sw.process,
      cw = (function () {
        try {
          var e = dn && dn.require && dn.require("util").types;
          return e || (Li && Li.binding && Li.binding("util"));
        } catch {}
      })();
    qt.exports = cw;
  });
  var er = f((q2, il) => {
    var lw = $c(),
      fw = Jc(),
      nl = tl(),
      rl = nl && nl.isTypedArray,
      dw = rl ? fw(rl) : lw;
    il.exports = dw;
  });
  var Pi = f((k2, ol) => {
    var pw = qc(),
      hw = cn(),
      gw = we(),
      vw = $n(),
      yw = Zn(),
      Ew = er(),
      mw = Object.prototype,
      _w = mw.hasOwnProperty;
    function Iw(e, t) {
      var n = gw(e),
        r = !n && hw(e),
        i = !n && !r && vw(e),
        o = !n && !r && !i && Ew(e),
        s = n || r || i || o,
        a = s ? pw(e.length, String) : [],
        u = a.length;
      for (var l in e)
        (t || _w.call(e, l)) &&
          !(
            s &&
            (l == "length" ||
              (i && (l == "offset" || l == "parent")) ||
              (o &&
                (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
              yw(l, u))
          ) &&
          a.push(l);
      return a;
    }
    ol.exports = Iw;
  });
  var tr = f((G2, al) => {
    var Tw = Object.prototype;
    function bw(e) {
      var t = e && e.constructor,
        n = (typeof t == "function" && t.prototype) || Tw;
      return e === n;
    }
    al.exports = bw;
  });
  var ul = f((X2, sl) => {
    var ww = ri(),
      Aw = ww(Object.keys, Object);
    sl.exports = Aw;
  });
  var nr = f((V2, cl) => {
    var Sw = tr(),
      Ow = ul(),
      xw = Object.prototype,
      Rw = xw.hasOwnProperty;
    function Cw(e) {
      if (!Sw(e)) return Ow(e);
      var t = [];
      for (var n in Object(e)) Rw.call(e, n) && n != "constructor" && t.push(n);
      return t;
    }
    cl.exports = Cw;
  });
  var mt = f((U2, ll) => {
    var Lw = Ti(),
      Pw = Jn();
    function Nw(e) {
      return e != null && Pw(e.length) && !Lw(e);
    }
    ll.exports = Nw;
  });
  var pn = f((W2, fl) => {
    var Dw = Pi(),
      Mw = nr(),
      Fw = mt();
    function qw(e) {
      return Fw(e) ? Dw(e) : Mw(e);
    }
    fl.exports = qw;
  });
  var pl = f((B2, dl) => {
    var kw = xi(),
      Gw = Ci(),
      Xw = pn();
    function Vw(e) {
      return kw(e, Xw, Gw);
    }
    dl.exports = Vw;
  });
  var vl = f((H2, gl) => {
    var hl = pl(),
      Uw = 1,
      Ww = Object.prototype,
      Bw = Ww.hasOwnProperty;
    function Hw(e, t, n, r, i, o) {
      var s = n & Uw,
        a = hl(e),
        u = a.length,
        l = hl(t),
        m = l.length;
      if (u != m && !s) return !1;
      for (var v = u; v--; ) {
        var p = a[v];
        if (!(s ? p in t : Bw.call(t, p))) return !1;
      }
      var y = o.get(e),
        T = o.get(t);
      if (y && T) return y == t && T == e;
      var I = !0;
      o.set(e, t), o.set(t, e);
      for (var S = s; ++v < u; ) {
        p = a[v];
        var b = e[p],
          R = t[p];
        if (r) var O = s ? r(R, b, p, t, e, o) : r(b, R, p, e, t, o);
        if (!(O === void 0 ? b === R || i(b, R, n, r, o) : O)) {
          I = !1;
          break;
        }
        S || (S = p == "constructor");
      }
      if (I && !S) {
        var L = e.constructor,
          D = t.constructor;
        L != D &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof L == "function" &&
            L instanceof L &&
            typeof D == "function" &&
            D instanceof D
          ) &&
          (I = !1);
      }
      return o.delete(e), o.delete(t), I;
    }
    gl.exports = Hw;
  });
  var El = f((z2, yl) => {
    var zw = dt(),
      jw = ze(),
      Kw = zw(jw, "DataView");
    yl.exports = Kw;
  });
  var _l = f((j2, ml) => {
    var Yw = dt(),
      Qw = ze(),
      $w = Yw(Qw, "Promise");
    ml.exports = $w;
  });
  var Tl = f((K2, Il) => {
    var Zw = dt(),
      Jw = ze(),
      e0 = Zw(Jw, "Set");
    Il.exports = e0;
  });
  var Ni = f((Y2, bl) => {
    var t0 = dt(),
      n0 = ze(),
      r0 = t0(n0, "WeakMap");
    bl.exports = r0;
  });
  var rr = f((Q2, Cl) => {
    var Di = El(),
      Mi = jn(),
      Fi = _l(),
      qi = Tl(),
      ki = Ni(),
      Rl = ft(),
      kt = wi(),
      wl = "[object Map]",
      i0 = "[object Object]",
      Al = "[object Promise]",
      Sl = "[object Set]",
      Ol = "[object WeakMap]",
      xl = "[object DataView]",
      o0 = kt(Di),
      a0 = kt(Mi),
      s0 = kt(Fi),
      u0 = kt(qi),
      c0 = kt(ki),
      _t = Rl;
    ((Di && _t(new Di(new ArrayBuffer(1))) != xl) ||
      (Mi && _t(new Mi()) != wl) ||
      (Fi && _t(Fi.resolve()) != Al) ||
      (qi && _t(new qi()) != Sl) ||
      (ki && _t(new ki()) != Ol)) &&
      (_t = function (e) {
        var t = Rl(e),
          n = t == i0 ? e.constructor : void 0,
          r = n ? kt(n) : "";
        if (r)
          switch (r) {
            case o0:
              return xl;
            case a0:
              return wl;
            case s0:
              return Al;
            case u0:
              return Sl;
            case c0:
              return Ol;
          }
        return t;
      });
    Cl.exports = _t;
  });
  var kl = f(($2, ql) => {
    var Gi = Ai(),
      l0 = Si(),
      f0 = Oc(),
      d0 = vl(),
      Ll = rr(),
      Pl = we(),
      Nl = $n(),
      p0 = er(),
      h0 = 1,
      Dl = "[object Arguments]",
      Ml = "[object Array]",
      ir = "[object Object]",
      g0 = Object.prototype,
      Fl = g0.hasOwnProperty;
    function v0(e, t, n, r, i, o) {
      var s = Pl(e),
        a = Pl(t),
        u = s ? Ml : Ll(e),
        l = a ? Ml : Ll(t);
      (u = u == Dl ? ir : u), (l = l == Dl ? ir : l);
      var m = u == ir,
        v = l == ir,
        p = u == l;
      if (p && Nl(e)) {
        if (!Nl(t)) return !1;
        (s = !0), (m = !1);
      }
      if (p && !m)
        return (
          o || (o = new Gi()),
          s || p0(e) ? l0(e, t, n, r, i, o) : f0(e, t, u, n, r, i, o)
        );
      if (!(n & h0)) {
        var y = m && Fl.call(e, "__wrapped__"),
          T = v && Fl.call(t, "__wrapped__");
        if (y || T) {
          var I = y ? e.value() : e,
            S = T ? t.value() : t;
          return o || (o = new Gi()), i(I, S, n, r, o);
        }
      }
      return p ? (o || (o = new Gi()), d0(e, t, n, r, i, o)) : !1;
    }
    ql.exports = v0;
  });
  var Xi = f((Z2, Vl) => {
    var y0 = kl(),
      Gl = ot();
    function Xl(e, t, n, r, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Gl(e) && !Gl(t))
        ? e !== e && t !== t
        : y0(e, t, n, r, Xl, i);
    }
    Vl.exports = Xl;
  });
  var Wl = f((J2, Ul) => {
    var E0 = Ai(),
      m0 = Xi(),
      _0 = 1,
      I0 = 2;
    function T0(e, t, n, r) {
      var i = n.length,
        o = i,
        s = !r;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = n[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = n[i];
        var u = a[0],
          l = e[u],
          m = a[1];
        if (s && a[2]) {
          if (l === void 0 && !(u in e)) return !1;
        } else {
          var v = new E0();
          if (r) var p = r(l, m, u, e, t, v);
          if (!(p === void 0 ? m0(m, l, _0 | I0, r, v) : p)) return !1;
        }
      }
      return !0;
    }
    Ul.exports = T0;
  });
  var Vi = f((eq, Bl) => {
    var b0 = et();
    function w0(e) {
      return e === e && !b0(e);
    }
    Bl.exports = w0;
  });
  var zl = f((tq, Hl) => {
    var A0 = Vi(),
      S0 = pn();
    function O0(e) {
      for (var t = S0(e), n = t.length; n--; ) {
        var r = t[n],
          i = e[r];
        t[n] = [r, i, A0(i)];
      }
      return t;
    }
    Hl.exports = O0;
  });
  var Ui = f((nq, jl) => {
    function x0(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    jl.exports = x0;
  });
  var Yl = f((rq, Kl) => {
    var R0 = Wl(),
      C0 = zl(),
      L0 = Ui();
    function P0(e) {
      var t = C0(e);
      return t.length == 1 && t[0][2]
        ? L0(t[0][0], t[0][1])
        : function (n) {
            return n === e || R0(n, e, t);
          };
    }
    Kl.exports = P0;
  });
  var hn = f((iq, Ql) => {
    var N0 = ft(),
      D0 = ot(),
      M0 = "[object Symbol]";
    function F0(e) {
      return typeof e == "symbol" || (D0(e) && N0(e) == M0);
    }
    Ql.exports = F0;
  });
  var or = f((oq, $l) => {
    var q0 = we(),
      k0 = hn(),
      G0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      X0 = /^\w*$/;
    function V0(e, t) {
      if (q0(e)) return !1;
      var n = typeof e;
      return n == "number" ||
        n == "symbol" ||
        n == "boolean" ||
        e == null ||
        k0(e)
        ? !0
        : X0.test(e) || !G0.test(e) || (t != null && e in Object(t));
    }
    $l.exports = V0;
  });
  var ef = f((aq, Jl) => {
    var Zl = Kn(),
      U0 = "Expected a function";
    function Wi(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(U0);
      var n = function () {
        var r = arguments,
          i = t ? t.apply(this, r) : r[0],
          o = n.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, r);
        return (n.cache = o.set(i, s) || o), s;
      };
      return (n.cache = new (Wi.Cache || Zl)()), n;
    }
    Wi.Cache = Zl;
    Jl.exports = Wi;
  });
  var nf = f((sq, tf) => {
    var W0 = ef(),
      B0 = 500;
    function H0(e) {
      var t = W0(e, function (r) {
          return n.size === B0 && n.clear(), r;
        }),
        n = t.cache;
      return t;
    }
    tf.exports = H0;
  });
  var of = f((uq, rf) => {
    var z0 = nf(),
      j0 =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      K0 = /\\(\\)?/g,
      Y0 = z0(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(j0, function (n, r, i, o) {
            t.push(i ? o.replace(K0, "$1") : r || n);
          }),
          t
        );
      });
    rf.exports = Y0;
  });
  var Bi = f((cq, af) => {
    function Q0(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
        i[n] = t(e[n], n, e);
      return i;
    }
    af.exports = Q0;
  });
  var df = f((lq, ff) => {
    var sf = xt(),
      $0 = Bi(),
      Z0 = we(),
      J0 = hn(),
      eA = 1 / 0,
      uf = sf ? sf.prototype : void 0,
      cf = uf ? uf.toString : void 0;
    function lf(e) {
      if (typeof e == "string") return e;
      if (Z0(e)) return $0(e, lf) + "";
      if (J0(e)) return cf ? cf.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -eA ? "-0" : t;
    }
    ff.exports = lf;
  });
  var hf = f((fq, pf) => {
    var tA = df();
    function nA(e) {
      return e == null ? "" : tA(e);
    }
    pf.exports = nA;
  });
  var gn = f((dq, gf) => {
    var rA = we(),
      iA = or(),
      oA = of(),
      aA = hf();
    function sA(e, t) {
      return rA(e) ? e : iA(e, t) ? [e] : oA(aA(e));
    }
    gf.exports = sA;
  });
  var Gt = f((pq, vf) => {
    var uA = hn(),
      cA = 1 / 0;
    function lA(e) {
      if (typeof e == "string" || uA(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -cA ? "-0" : t;
    }
    vf.exports = lA;
  });
  var ar = f((hq, yf) => {
    var fA = gn(),
      dA = Gt();
    function pA(e, t) {
      t = fA(t, e);
      for (var n = 0, r = t.length; e != null && n < r; ) e = e[dA(t[n++])];
      return n && n == r ? e : void 0;
    }
    yf.exports = pA;
  });
  var sr = f((gq, Ef) => {
    var hA = ar();
    function gA(e, t, n) {
      var r = e == null ? void 0 : hA(e, t);
      return r === void 0 ? n : r;
    }
    Ef.exports = gA;
  });
  var _f = f((vq, mf) => {
    function vA(e, t) {
      return e != null && t in Object(e);
    }
    mf.exports = vA;
  });
  var Tf = f((yq, If) => {
    var yA = gn(),
      EA = cn(),
      mA = we(),
      _A = Zn(),
      IA = Jn(),
      TA = Gt();
    function bA(e, t, n) {
      t = yA(t, e);
      for (var r = -1, i = t.length, o = !1; ++r < i; ) {
        var s = TA(t[r]);
        if (!(o = e != null && n(e, s))) break;
        e = e[s];
      }
      return o || ++r != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && IA(i) && _A(s, i) && (mA(e) || EA(e)));
    }
    If.exports = bA;
  });
  var wf = f((Eq, bf) => {
    var wA = _f(),
      AA = Tf();
    function SA(e, t) {
      return e != null && AA(e, t, wA);
    }
    bf.exports = SA;
  });
  var Sf = f((mq, Af) => {
    var OA = Xi(),
      xA = sr(),
      RA = wf(),
      CA = or(),
      LA = Vi(),
      PA = Ui(),
      NA = Gt(),
      DA = 1,
      MA = 2;
    function FA(e, t) {
      return CA(e) && LA(t)
        ? PA(NA(e), t)
        : function (n) {
            var r = xA(n, e);
            return r === void 0 && r === t ? RA(n, e) : OA(t, r, DA | MA);
          };
    }
    Af.exports = FA;
  });
  var ur = f((_q, Of) => {
    function qA(e) {
      return e;
    }
    Of.exports = qA;
  });
  var Hi = f((Iq, xf) => {
    function kA(e) {
      return function (t) {
        return t?.[e];
      };
    }
    xf.exports = kA;
  });
  var Cf = f((Tq, Rf) => {
    var GA = ar();
    function XA(e) {
      return function (t) {
        return GA(t, e);
      };
    }
    Rf.exports = XA;
  });
  var Pf = f((bq, Lf) => {
    var VA = Hi(),
      UA = Cf(),
      WA = or(),
      BA = Gt();
    function HA(e) {
      return WA(e) ? VA(BA(e)) : UA(e);
    }
    Lf.exports = HA;
  });
  var pt = f((wq, Nf) => {
    var zA = Yl(),
      jA = Sf(),
      KA = ur(),
      YA = we(),
      QA = Pf();
    function $A(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? KA
        : typeof e == "object"
        ? YA(e)
          ? jA(e[0], e[1])
          : zA(e)
        : QA(e);
    }
    Nf.exports = $A;
  });
  var zi = f((Aq, Df) => {
    var ZA = pt(),
      JA = mt(),
      eS = pn();
    function tS(e) {
      return function (t, n, r) {
        var i = Object(t);
        if (!JA(t)) {
          var o = ZA(n, 3);
          (t = eS(t)),
            (n = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, n, r);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Df.exports = tS;
  });
  var ji = f((Sq, Mf) => {
    function nS(e, t, n, r) {
      for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Mf.exports = nS;
  });
  var qf = f((Oq, Ff) => {
    var rS = /\s/;
    function iS(e) {
      for (var t = e.length; t-- && rS.test(e.charAt(t)); );
      return t;
    }
    Ff.exports = iS;
  });
  var Gf = f((xq, kf) => {
    var oS = qf(),
      aS = /^\s+/;
    function sS(e) {
      return e && e.slice(0, oS(e) + 1).replace(aS, "");
    }
    kf.exports = sS;
  });
  var cr = f((Rq, Uf) => {
    var uS = Gf(),
      Xf = et(),
      cS = hn(),
      Vf = 0 / 0,
      lS = /^[-+]0x[0-9a-f]+$/i,
      fS = /^0b[01]+$/i,
      dS = /^0o[0-7]+$/i,
      pS = parseInt;
    function hS(e) {
      if (typeof e == "number") return e;
      if (cS(e)) return Vf;
      if (Xf(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Xf(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = uS(e);
      var n = fS.test(e);
      return n || dS.test(e) ? pS(e.slice(2), n ? 2 : 8) : lS.test(e) ? Vf : +e;
    }
    Uf.exports = hS;
  });
  var Hf = f((Cq, Bf) => {
    var gS = cr(),
      Wf = 1 / 0,
      vS = 17976931348623157e292;
    function yS(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = gS(e)), e === Wf || e === -Wf)) {
        var t = e < 0 ? -1 : 1;
        return t * vS;
      }
      return e === e ? e : 0;
    }
    Bf.exports = yS;
  });
  var Ki = f((Lq, zf) => {
    var ES = Hf();
    function mS(e) {
      var t = ES(e),
        n = t % 1;
      return t === t ? (n ? t - n : t) : 0;
    }
    zf.exports = mS;
  });
  var Kf = f((Pq, jf) => {
    var _S = ji(),
      IS = pt(),
      TS = Ki(),
      bS = Math.max;
    function wS(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = n == null ? 0 : TS(n);
      return i < 0 && (i = bS(r + i, 0)), _S(e, IS(t, 3), i);
    }
    jf.exports = wS;
  });
  var Yi = f((Nq, Yf) => {
    var AS = zi(),
      SS = Kf(),
      OS = AS(SS);
    Yf.exports = OS;
  });
  var Zf = {};
  De(Zf, {
    ELEMENT_MATCHES: () => xS,
    FLEX_PREFIXED: () => Qi,
    IS_BROWSER_ENV: () => Ke,
    TRANSFORM_PREFIXED: () => ht,
    TRANSFORM_STYLE_PREFIXED: () => fr,
    withBrowser: () => lr,
  });
  var $f,
    Ke,
    lr,
    xS,
    Qi,
    ht,
    Qf,
    fr,
    dr = ye(() => {
      "use strict";
      ($f = de(Yi())),
        (Ke = typeof window < "u"),
        (lr = (e, t) => (Ke ? e() : t)),
        (xS = lr(() =>
          (0, $f.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Qi = lr(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            n = "";
          try {
            let { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return n;
          } catch {
            return n;
          }
        }, "flex")),
        (ht = lr(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              n = "Transform",
              { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i] + n;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (Qf = ht.split("transform")[0]),
        (fr = Qf ? Qf + "TransformStyle" : "transformStyle");
    });
  var $i = f((Dq, rd) => {
    var RS = 4,
      CS = 0.001,
      LS = 1e-7,
      PS = 10,
      vn = 11,
      pr = 1 / (vn - 1),
      NS = typeof Float32Array == "function";
    function Jf(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function ed(e, t) {
      return 3 * t - 6 * e;
    }
    function td(e) {
      return 3 * e;
    }
    function hr(e, t, n) {
      return ((Jf(t, n) * e + ed(t, n)) * e + td(t)) * e;
    }
    function nd(e, t, n) {
      return 3 * Jf(t, n) * e * e + 2 * ed(t, n) * e + td(t);
    }
    function DS(e, t, n, r, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (n - t) / 2), (o = hr(s, r, i) - e), o > 0 ? (n = s) : (t = s);
      while (Math.abs(o) > LS && ++a < PS);
      return s;
    }
    function MS(e, t, n, r) {
      for (var i = 0; i < RS; ++i) {
        var o = nd(t, n, r);
        if (o === 0) return t;
        var s = hr(t, n, r) - e;
        t -= s / o;
      }
      return t;
    }
    rd.exports = function (t, n, r, i) {
      if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = NS ? new Float32Array(vn) : new Array(vn);
      if (t !== n || r !== i)
        for (var s = 0; s < vn; ++s) o[s] = hr(s * pr, t, r);
      function a(u) {
        for (var l = 0, m = 1, v = vn - 1; m !== v && o[m] <= u; ++m) l += pr;
        --m;
        var p = (u - o[m]) / (o[m + 1] - o[m]),
          y = l + p * pr,
          T = nd(y, t, r);
        return T >= CS ? MS(u, y, t, r) : T === 0 ? y : DS(u, l, l + pr, t, r);
      }
      return function (l) {
        return t === n && r === i
          ? l
          : l === 0
          ? 0
          : l === 1
          ? 1
          : hr(a(l), n, i);
      };
    };
  });
  var En = {};
  De(En, {
    bounce: () => yO,
    bouncePast: () => EO,
    ease: () => FS,
    easeIn: () => qS,
    easeInOut: () => GS,
    easeOut: () => kS,
    inBack: () => uO,
    inCirc: () => iO,
    inCubic: () => WS,
    inElastic: () => fO,
    inExpo: () => tO,
    inOutBack: () => lO,
    inOutCirc: () => aO,
    inOutCubic: () => HS,
    inOutElastic: () => pO,
    inOutExpo: () => rO,
    inOutQuad: () => US,
    inOutQuart: () => KS,
    inOutQuint: () => $S,
    inOutSine: () => eO,
    inQuad: () => XS,
    inQuart: () => zS,
    inQuint: () => YS,
    inSine: () => ZS,
    outBack: () => cO,
    outBounce: () => sO,
    outCirc: () => oO,
    outCubic: () => BS,
    outElastic: () => dO,
    outExpo: () => nO,
    outQuad: () => VS,
    outQuart: () => jS,
    outQuint: () => QS,
    outSine: () => JS,
    swingFrom: () => gO,
    swingFromTo: () => hO,
    swingTo: () => vO,
  });
  function XS(e) {
    return Math.pow(e, 2);
  }
  function VS(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function US(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function WS(e) {
    return Math.pow(e, 3);
  }
  function BS(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function HS(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function zS(e) {
    return Math.pow(e, 4);
  }
  function jS(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function KS(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function YS(e) {
    return Math.pow(e, 5);
  }
  function QS(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function $S(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function ZS(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function JS(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function eO(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function tO(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function nO(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function rO(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function iO(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function oO(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function aO(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function sO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function uO(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function cO(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function lO(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function fO(e) {
    let t = at,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        -(
          r *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / n)
        ));
  }
  function dO(e) {
    let t = at,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) + 1);
  }
  function pO(e) {
    let t = at,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (n || (n = 0.3 * 1.5),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        e < 1
          ? -0.5 *
            (r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n))
          : r *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n) *
              0.5 +
            1);
  }
  function hO(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function gO(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function vO(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function yO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function EO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var yn,
    at,
    FS,
    qS,
    kS,
    GS,
    Zi = ye(() => {
      "use strict";
      (yn = de($i())),
        (at = 1.70158),
        (FS = (0, yn.default)(0.25, 0.1, 0.25, 1)),
        (qS = (0, yn.default)(0.42, 0, 1, 1)),
        (kS = (0, yn.default)(0, 0, 0.58, 1)),
        (GS = (0, yn.default)(0.42, 0, 0.58, 1));
    });
  var od = {};
  De(od, {
    applyEasing: () => _O,
    createBezierEasing: () => mO,
    optimizeFloat: () => mn,
  });
  function mn(e, t = 5, n = 10) {
    let r = Math.pow(n, t),
      i = Number(Math.round(e * r) / r);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function mO(e) {
    return (0, id.default)(...e);
  }
  function _O(e, t, n) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : mn(n ? (t > 0 ? n(t) : t) : t > 0 && e && En[e] ? En[e](t) : t);
  }
  var id,
    Ji = ye(() => {
      "use strict";
      Zi();
      id = de($i());
    });
  var ud = {};
  De(ud, {
    createElementState: () => sd,
    ixElements: () => DO,
    mergeActionState: () => eo,
  });
  function sd(e, t, n, r, i) {
    let o =
      n === IO ? (0, Xt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Xt.mergeIn)(e, [r], { id: r, ref: t, refId: o, refType: n });
  }
  function eo(e, t, n, r, i) {
    let o = FO(i);
    return (0, Xt.mergeIn)(e, [t, NO, n], r, o);
  }
  function FO(e) {
    let { config: t } = e;
    return MO.reduce((n, r) => {
      let i = r[0],
        o = r[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (n[o] = a), n;
    }, {});
  }
  var Xt,
    Fq,
    IO,
    qq,
    TO,
    bO,
    wO,
    AO,
    SO,
    OO,
    xO,
    RO,
    CO,
    LO,
    PO,
    ad,
    NO,
    DO,
    MO,
    cd = ye(() => {
      "use strict";
      Xt = de(Lt());
      Me();
      ({
        HTML_ELEMENT: Fq,
        PLAIN_OBJECT: IO,
        ABSTRACT_NODE: qq,
        CONFIG_X_VALUE: TO,
        CONFIG_Y_VALUE: bO,
        CONFIG_Z_VALUE: wO,
        CONFIG_VALUE: AO,
        CONFIG_X_UNIT: SO,
        CONFIG_Y_UNIT: OO,
        CONFIG_Z_UNIT: xO,
        CONFIG_UNIT: RO,
      } = Se),
        ({
          IX2_SESSION_STOPPED: CO,
          IX2_INSTANCE_ADDED: LO,
          IX2_ELEMENT_STATE_CHANGED: PO,
        } = be),
        (ad = {}),
        (NO = "refState"),
        (DO = (e = ad, t = {}) => {
          switch (t.type) {
            case CO:
              return ad;
            case LO: {
              let {
                  elementId: n,
                  element: r,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Xt.getIn)(u, [n, r]) !== r && (u = sd(u, r, s, n, o)),
                eo(u, n, a, i, o)
              );
            }
            case PO: {
              let {
                elementId: n,
                actionTypeId: r,
                current: i,
                actionItem: o,
              } = t.payload;
              return eo(e, n, r, i, o);
            }
            default:
              return e;
          }
        });
      MO = [
        [TO, SO],
        [bO, OO],
        [wO, xO],
        [AO, RO],
      ];
    });
  var ld = f((to) => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    function qO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    qO(to, {
      clearPlugin: function () {
        return BO;
      },
      createPluginInstance: function () {
        return UO;
      },
      getPluginConfig: function () {
        return kO;
      },
      getPluginDestination: function () {
        return VO;
      },
      getPluginDuration: function () {
        return GO;
      },
      getPluginOrigin: function () {
        return XO;
      },
      renderPlugin: function () {
        return WO;
      },
    });
    var kO = (e) => e.value,
      GO = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let n = parseFloat(e.getAttribute("data-duration"));
        return n > 0
          ? n * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      XO = (e) => e || { value: 0 },
      VO = (e) => ({ value: e.value }),
      UO = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      },
      WO = (e, t, n) => {
        if (!e) return;
        let r = t[n.actionTypeId].value / 100;
        e.goToFrame(e.frames * r);
      },
      BO = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var dd = f((no) => {
    "use strict";
    Object.defineProperty(no, "__esModule", { value: !0 });
    function HO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    HO(no, {
      clearPlugin: function () {
        return tx;
      },
      createPluginInstance: function () {
        return JO;
      },
      getPluginConfig: function () {
        return YO;
      },
      getPluginDestination: function () {
        return ZO;
      },
      getPluginDuration: function () {
        return QO;
      },
      getPluginOrigin: function () {
        return $O;
      },
      renderPlugin: function () {
        return ex;
      },
    });
    var zO = (e) => document.querySelector(`[data-w-id="${e}"]`),
      jO = () => window.Webflow.require("spline"),
      KO = (e, t) => e.filter((n) => !t.includes(n)),
      YO = (e, t) => e.value[t],
      QO = () => null,
      fd = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      $O = (e, t) => {
        let n = t.config.value,
          r = Object.keys(n);
        if (e) {
          let o = Object.keys(e),
            s = KO(r, o);
          return s.length ? s.reduce((u, l) => ((u[l] = fd[l]), u), e) : e;
        }
        return r.reduce((o, s) => ((o[s] = fd[s]), o), {});
      },
      ZO = (e) => e.value,
      JO = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? zO(n) : null;
      },
      ex = (e, t, n) => {
        let r = jO(),
          i = r.getInstance(e),
          o = n.config.target.objectId,
          s = (a) => {
            if (!a)
              throw new Error("Invalid spline app passed to renderSpline");
            let u = o && a.findObjectById(o);
            if (!u) return;
            let { PLUGIN_SPLINE: l } = t;
            l.positionX != null && (u.position.x = l.positionX),
              l.positionY != null && (u.position.y = l.positionY),
              l.positionZ != null && (u.position.z = l.positionZ),
              l.rotationX != null && (u.rotation.x = l.rotationX),
              l.rotationY != null && (u.rotation.y = l.rotationY),
              l.rotationZ != null && (u.rotation.z = l.rotationZ),
              l.scaleX != null && (u.scale.x = l.scaleX),
              l.scaleY != null && (u.scale.y = l.scaleY),
              l.scaleZ != null && (u.scale.z = l.scaleZ);
          };
        i ? s(i.spline) : r.setLoadHandler(e, s);
      },
      tx = () => null;
  });
  var pd = f((oo) => {
    "use strict";
    Object.defineProperty(oo, "__esModule", { value: !0 });
    function nx(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    nx(oo, {
      clearPlugin: function () {
        return fx;
      },
      createPluginInstance: function () {
        return cx;
      },
      getPluginConfig: function () {
        return ox;
      },
      getPluginDestination: function () {
        return ux;
      },
      getPluginDuration: function () {
        return ax;
      },
      getPluginOrigin: function () {
        return sx;
      },
      renderPlugin: function () {
        return lx;
      },
    });
    var ro = "--wf-rive-fit",
      io = "--wf-rive-alignment",
      rx = (e) => document.querySelector(`[data-w-id="${e}"]`),
      ix = () => window.Webflow.require("rive"),
      ox = (e, t) => e.value.inputs[t],
      ax = () => null,
      sx = (e, t) => {
        if (e) return e;
        let n = {},
          { inputs: r = {} } = t.config.value;
        for (let i in r) r[i] == null && (n[i] = 0);
        return n;
      },
      ux = (e) => e.value.inputs ?? {},
      cx = (e, t) => {
        if ((t.config?.target?.selectorGuids || []).length > 0) return e;
        let r = t?.config?.target?.pluginElement;
        return r ? rx(r) : null;
      },
      lx = (e, { PLUGIN_RIVE: t }, n) => {
        let r = ix(),
          i = r.getInstance(e),
          o = r.rive.StateMachineInputType,
          { name: s, inputs: a = {} } = n.config.value || {};
        function u(l) {
          if (l.loaded) m();
          else {
            let v = () => {
              m(), l?.off("load", v);
            };
            l?.on("load", v);
          }
          function m() {
            let v = l.stateMachineInputs(s);
            if (v != null) {
              if ((l.isPlaying || l.play(s, !1), ro in a || io in a)) {
                let p = l.layout,
                  y = a[ro] ?? p.fit,
                  T = a[io] ?? p.alignment;
                (y !== p.fit || T !== p.alignment) &&
                  (l.layout = p.copyWith({ fit: y, alignment: T }));
              }
              for (let p in a) {
                if (p === ro || p === io) continue;
                let y = v.find((T) => T.name === p);
                if (y != null)
                  switch (y.type) {
                    case o.Boolean: {
                      if (a[p] != null) {
                        let T = !!a[p];
                        y.value = T;
                      }
                      break;
                    }
                    case o.Number: {
                      let T = t[p];
                      T != null && (y.value = T);
                      break;
                    }
                    case o.Trigger: {
                      a[p] && y.fire();
                      break;
                    }
                  }
              }
            }
          }
        }
        i?.rive ? u(i.rive) : r.setLoadHandler(e, u);
      },
      fx = (e, t) => null;
  });
  var so = f((ao) => {
    "use strict";
    Object.defineProperty(ao, "__esModule", { value: !0 });
    Object.defineProperty(ao, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return dx;
      },
    });
    var hd = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function dx(e) {
      let t,
        n,
        r,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof hd[o] == "string" ? hd[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (n = parseInt(u[1] + u[1], 16)),
            (r = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (n = parseInt(u.substring(2, 4), 16)),
            (r = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          m = parseFloat(u[1].replace("%", "")) / 100,
          v = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let p = (1 - Math.abs(2 * v - 1)) * m,
          y = p * (1 - Math.abs(((l / 60) % 2) - 1)),
          T = v - p / 2,
          I,
          S,
          b;
        l >= 0 && l < 60
          ? ((I = p), (S = y), (b = 0))
          : l >= 60 && l < 120
          ? ((I = y), (S = p), (b = 0))
          : l >= 120 && l < 180
          ? ((I = 0), (S = p), (b = y))
          : l >= 180 && l < 240
          ? ((I = 0), (S = y), (b = p))
          : l >= 240 && l < 300
          ? ((I = y), (S = 0), (b = p))
          : ((I = p), (S = 0), (b = y)),
          (t = Math.round((I + T) * 255)),
          (n = Math.round((S + T) * 255)),
          (r = Math.round((b + T) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          m = parseFloat(u[1].replace("%", "")) / 100,
          v = parseFloat(u[2].replace("%", "")) / 100,
          p = (1 - Math.abs(2 * v - 1)) * m,
          y = p * (1 - Math.abs(((l / 60) % 2) - 1)),
          T = v - p / 2,
          I,
          S,
          b;
        l >= 0 && l < 60
          ? ((I = p), (S = y), (b = 0))
          : l >= 60 && l < 120
          ? ((I = y), (S = p), (b = 0))
          : l >= 120 && l < 180
          ? ((I = 0), (S = p), (b = y))
          : l >= 180 && l < 240
          ? ((I = 0), (S = y), (b = p))
          : l >= 240 && l < 300
          ? ((I = y), (S = 0), (b = p))
          : ((I = p), (S = 0), (b = y)),
          (t = Math.round((I + T) * 255)),
          (n = Math.round((S + T) * 255)),
          (r = Math.round((b + T) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: n, blue: r, alpha: i };
    }
  });
  var gd = f((uo) => {
    "use strict";
    Object.defineProperty(uo, "__esModule", { value: !0 });
    function px(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    px(uo, {
      clearPlugin: function () {
        return Tx;
      },
      createPluginInstance: function () {
        return mx;
      },
      getPluginConfig: function () {
        return gx;
      },
      getPluginDestination: function () {
        return Ex;
      },
      getPluginDuration: function () {
        return vx;
      },
      getPluginOrigin: function () {
        return yx;
      },
      renderPlugin: function () {
        return Ix;
      },
    });
    var hx = so(),
      gx = (e, t) => e.value[t],
      vx = () => null,
      yx = (e, t) => {
        if (e) return e;
        let n = t.config.value,
          r = t.config.target.objectId,
          i = getComputedStyle(document.documentElement).getPropertyValue(r);
        if (n.size != null) return { size: parseInt(i, 10) };
        if (n.unit === "%" || n.unit === "-") return { size: parseFloat(i) };
        if (n.red != null && n.green != null && n.blue != null)
          return (0, hx.normalizeColor)(i);
      },
      Ex = (e) => e.value,
      mx = () => null,
      _x = {
        color: {
          match: ({ red: e, green: t, blue: n, alpha: r }) =>
            [e, t, n, r].every((i) => i != null),
          getValue: ({ red: e, green: t, blue: n, alpha: r }) =>
            `rgba(${e}, ${t}, ${n}, ${r})`,
        },
        size: {
          match: ({ size: e }) => e != null,
          getValue: ({ size: e }, t) => {
            switch (t) {
              case "-":
                return e;
              default:
                return `${e}${t}`;
            }
          },
        },
      },
      Ix = (e, t, n) => {
        let {
            target: { objectId: r },
            value: { unit: i },
          } = n.config,
          o = t.PLUGIN_VARIABLE,
          s = Object.values(_x).find((a) => a.match(o, i));
        s && document.documentElement.style.setProperty(r, s.getValue(o, i));
      },
      Tx = (e, t) => {
        let n = t.config.target.objectId;
        document.documentElement.style.removeProperty(n);
      };
  });
  var yd = f((co) => {
    "use strict";
    Object.defineProperty(co, "__esModule", { value: !0 });
    Object.defineProperty(co, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return Ox;
      },
    });
    var gr = (Me(), Qe(_s)),
      bx = vr(ld()),
      wx = vr(dd()),
      Ax = vr(pd()),
      Sx = vr(gd());
    function vd(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (vd = function (r) {
        return r ? n : t;
      })(e);
    }
    function vr(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = vd(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var Ox = new Map([
      [gr.ActionTypeConsts.PLUGIN_LOTTIE, { ...bx }],
      [gr.ActionTypeConsts.PLUGIN_SPLINE, { ...wx }],
      [gr.ActionTypeConsts.PLUGIN_RIVE, { ...Ax }],
      [gr.ActionTypeConsts.PLUGIN_VARIABLE, { ...Sx }],
    ]);
  });
  var Ed = {};
  De(Ed, {
    clearPlugin: () => vo,
    createPluginInstance: () => Rx,
    getPluginConfig: () => fo,
    getPluginDestination: () => ho,
    getPluginDuration: () => xx,
    getPluginOrigin: () => po,
    isPluginType: () => It,
    renderPlugin: () => go,
  });
  function It(e) {
    return lo.pluginMethodMap.has(e);
  }
  var lo,
    Tt,
    fo,
    po,
    xx,
    ho,
    Rx,
    go,
    vo,
    yo = ye(() => {
      "use strict";
      dr();
      lo = de(yd());
      (Tt = (e) => (t) => {
        if (!Ke) return () => null;
        let n = lo.pluginMethodMap.get(t);
        if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
        let r = n[e];
        if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
        return r;
      }),
        (fo = Tt("getPluginConfig")),
        (po = Tt("getPluginOrigin")),
        (xx = Tt("getPluginDuration")),
        (ho = Tt("getPluginDestination")),
        (Rx = Tt("createPluginInstance")),
        (go = Tt("renderPlugin")),
        (vo = Tt("clearPlugin"));
    });
  var _d = f((Hq, md) => {
    function Cx(e, t) {
      return e == null || e !== e ? t : e;
    }
    md.exports = Cx;
  });
  var Td = f((zq, Id) => {
    function Lx(e, t, n, r) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (r && o && (n = e[++i]); ++i < o; ) n = t(n, e[i], i, e);
      return n;
    }
    Id.exports = Lx;
  });
  var wd = f((jq, bd) => {
    function Px(e) {
      return function (t, n, r) {
        for (var i = -1, o = Object(t), s = r(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (n(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    bd.exports = Px;
  });
  var Sd = f((Kq, Ad) => {
    var Nx = wd(),
      Dx = Nx();
    Ad.exports = Dx;
  });
  var Eo = f((Yq, Od) => {
    var Mx = Sd(),
      Fx = pn();
    function qx(e, t) {
      return e && Mx(e, t, Fx);
    }
    Od.exports = qx;
  });
  var Rd = f((Qq, xd) => {
    var kx = mt();
    function Gx(e, t) {
      return function (n, r) {
        if (n == null) return n;
        if (!kx(n)) return e(n, r);
        for (
          var i = n.length, o = t ? i : -1, s = Object(n);
          (t ? o-- : ++o < i) && r(s[o], o, s) !== !1;

        );
        return n;
      };
    }
    xd.exports = Gx;
  });
  var mo = f(($q, Cd) => {
    var Xx = Eo(),
      Vx = Rd(),
      Ux = Vx(Xx);
    Cd.exports = Ux;
  });
  var Pd = f((Zq, Ld) => {
    function Wx(e, t, n, r, i) {
      return (
        i(e, function (o, s, a) {
          n = r ? ((r = !1), o) : t(n, o, s, a);
        }),
        n
      );
    }
    Ld.exports = Wx;
  });
  var Dd = f((Jq, Nd) => {
    var Bx = Td(),
      Hx = mo(),
      zx = pt(),
      jx = Pd(),
      Kx = we();
    function Yx(e, t, n) {
      var r = Kx(e) ? Bx : jx,
        i = arguments.length < 3;
      return r(e, zx(t, 4), n, i, Hx);
    }
    Nd.exports = Yx;
  });
  var Fd = f((ek, Md) => {
    var Qx = ji(),
      $x = pt(),
      Zx = Ki(),
      Jx = Math.max,
      eR = Math.min;
    function tR(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = r - 1;
      return (
        n !== void 0 &&
          ((i = Zx(n)), (i = n < 0 ? Jx(r + i, 0) : eR(i, r - 1))),
        Qx(e, $x(t, 3), i, !0)
      );
    }
    Md.exports = tR;
  });
  var kd = f((tk, qd) => {
    var nR = zi(),
      rR = Fd(),
      iR = nR(rR);
    qd.exports = iR;
  });
  function Gd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function oR(e, t) {
    if (Gd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let i = 0; i < n.length; i++)
      if (!Object.hasOwn(t, n[i]) || !Gd(e[n[i]], t[n[i]])) return !1;
    return !0;
  }
  var _o,
    Xd = ye(() => {
      "use strict";
      _o = oR;
    });
  var ip = {};
  De(ip, {
    cleanupHTMLElement: () => nC,
    clearAllStyles: () => tC,
    clearObjectCache: () => TR,
    getActionListProgress: () => iC,
    getAffectedElements: () => Ao,
    getComputedStyle: () => CR,
    getDestinationValues: () => qR,
    getElementId: () => SR,
    getInstanceId: () => wR,
    getInstanceOrigin: () => NR,
    getItemConfigByKey: () => FR,
    getMaxDurationItemIndex: () => rp,
    getNamespacedParameterId: () => sC,
    getRenderType: () => ep,
    getStyleProp: () => kR,
    mediaQueriesEqual: () => cC,
    observeStore: () => RR,
    reduceListToGroup: () => oC,
    reifyState: () => OR,
    renderHTMLElement: () => GR,
    shallowEqual: () => _o,
    shouldAllowMediaQuery: () => uC,
    shouldNamespaceEventParameter: () => aC,
    stringifyTarget: () => lC,
  });
  function TR() {
    yr.clear();
  }
  function wR() {
    return "i" + bR++;
  }
  function SR(e, t) {
    for (let n in e) {
      let r = e[n];
      if (r && r.ref === t) return r.id;
    }
    return "e" + AR++;
  }
  function OR({ events: e, actionLists: t, site: n } = {}) {
    let r = (0, Ir.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = n && n.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: r,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function RR({ store: e, select: t, onChange: n, comparator: r = xR }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let l = t(i());
      if (l == null) {
        s();
        return;
      }
      r(l, a) || ((a = l), n(a, e));
    }
    return s;
  }
  function Wd(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function Ao({
    config: e,
    event: t,
    eventTarget: n,
    elementRoot: r,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (q, A) =>
          q.concat(
            Ao({
              config: { target: A },
              event: t,
              eventTarget: n,
              elementRoot: r,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: l,
        getSiblingElements: m,
        matchSelector: v,
        elementContains: p,
        isSiblingNode: y,
      } = i,
      { target: T } = e;
    if (!T) return [];
    let {
      id: I,
      objectId: S,
      selector: b,
      selectorGuids: R,
      appliesTo: O,
      useEventTarget: L,
    } = Wd(T);
    if (S) return [yr.has(S) ? yr.get(S) : yr.set(S, {}).get(S)];
    if (O === Ei.PAGE) {
      let q = s(I);
      return q ? [q] : [];
    }
    let C = (t?.action?.config?.affectedElements ?? {})[I || b] || {},
      W = !!(C.id || C.selector),
      H,
      z,
      Q,
      te = t && a(Wd(t.target));
    if (
      (W
        ? ((H = C.limitAffectedElements), (z = te), (Q = a(C)))
        : (z = Q = a({ id: I, selector: b, selectorGuids: R })),
      t && L)
    ) {
      let q = n && (Q || L === !0) ? [n] : u(te);
      if (Q) {
        if (L === mR) return u(Q).filter((A) => q.some((M) => p(A, M)));
        if (L === Vd) return u(Q).filter((A) => q.some((M) => p(M, A)));
        if (L === Ud) return u(Q).filter((A) => q.some((M) => y(M, A)));
      }
      return q;
    }
    return z == null || Q == null
      ? []
      : Ke && r
      ? u(Q).filter((q) => r.contains(q))
      : H === Vd
      ? u(z, Q)
      : H === ER
      ? l(u(z)).filter(v(Q))
      : H === Ud
      ? m(u(z)).filter(v(Q))
      : u(Q);
  }
  function CR({ element: e, actionItem: t }) {
    if (!Ke) return {};
    let { actionTypeId: n } = t;
    switch (n) {
      case Ht:
      case zt:
      case jt:
      case Kt:
      case br:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function NR(e, t = {}, n = {}, r, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = r;
    if (It(s)) return po(s)(t[s], r);
    switch (r.actionTypeId) {
      case Ut:
      case Wt:
      case Bt:
      case bn:
        return t[r.actionTypeId] || So[r.actionTypeId];
      case wn:
        return LR(t[r.actionTypeId], r.config.filters);
      case An:
        return PR(t[r.actionTypeId], r.config.fontVariations);
      case $d:
        return { value: (0, st.default)(parseFloat(o(e, mr)), 1) };
      case Ht: {
        let a = o(e, tt),
          u = o(e, nt),
          l,
          m;
        return (
          r.config.widthUnit === gt
            ? (l = Bd.test(a) ? parseFloat(a) : parseFloat(n.width))
            : (l = (0, st.default)(parseFloat(a), parseFloat(n.width))),
          r.config.heightUnit === gt
            ? (m = Bd.test(u) ? parseFloat(u) : parseFloat(n.height))
            : (m = (0, st.default)(parseFloat(u), parseFloat(n.height))),
          { widthValue: l, heightValue: m }
        );
      }
      case zt:
      case jt:
      case Kt:
        return ZR({
          element: e,
          actionTypeId: r.actionTypeId,
          computedStyle: n,
          getStyle: o,
        });
      case br:
        return { value: (0, st.default)(o(e, _r), n.display) };
      case IR:
        return t[r.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function qR({ element: e, actionItem: t, elementApi: n }) {
    if (It(t.actionTypeId)) return ho(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case Ut:
      case Wt:
      case Bt:
      case bn: {
        let { xValue: r, yValue: i, zValue: o } = t.config;
        return { xValue: r, yValue: i, zValue: o };
      }
      case Ht: {
        let { getStyle: r, setStyle: i, getProperty: o } = n,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: l } = t.config;
        if (!Ke) return { widthValue: u, heightValue: l };
        if (s === gt) {
          let m = r(e, tt);
          i(e, tt, ""), (u = o(e, "offsetWidth")), i(e, tt, m);
        }
        if (a === gt) {
          let m = r(e, nt);
          i(e, nt, ""), (l = o(e, "offsetHeight")), i(e, nt, m);
        }
        return { widthValue: u, heightValue: l };
      }
      case zt:
      case jt:
      case Kt: {
        let {
          rValue: r,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = n,
            l = u(e, a),
            m = (0, jd.normalizeColor)(l);
          return {
            rValue: m.red,
            gValue: m.green,
            bValue: m.blue,
            aValue: m.alpha,
          };
        }
        return { rValue: r, gValue: i, bValue: o, aValue: s };
      }
      case wn:
        return t.config.filters.reduce(DR, {});
      case An:
        return t.config.fontVariations.reduce(MR, {});
      default: {
        let { value: r } = t.config;
        return { value: r };
      }
    }
  }
  function ep(e) {
    if (/^TRANSFORM_/.test(e)) return Yd;
    if (/^STYLE_/.test(e)) return bo;
    if (/^GENERAL_/.test(e)) return To;
    if (/^PLUGIN_/.test(e)) return Qd;
  }
  function kR(e, t) {
    return e === bo ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function GR(e, t, n, r, i, o, s, a, u) {
    switch (a) {
      case Yd:
        return BR(e, t, n, i, s);
      case bo:
        return JR(e, t, n, i, o, s);
      case To:
        return eC(e, i, s);
      case Qd: {
        let { actionTypeId: l } = i;
        if (It(l)) return go(l)(u, t, i);
      }
    }
  }
  function BR(e, t, n, r, i) {
    let o = WR.map((a) => {
        let u = So[a],
          {
            xValue: l = u.xValue,
            yValue: m = u.yValue,
            zValue: v = u.zValue,
            xUnit: p = "",
            yUnit: y = "",
            zUnit: T = "",
          } = t[a] || {};
        switch (a) {
          case Ut:
            return `${uR}(${l}${p}, ${m}${y}, ${v}${T})`;
          case Wt:
            return `${cR}(${l}${p}, ${m}${y}, ${v}${T})`;
          case Bt:
            return `${lR}(${l}${p}) ${fR}(${m}${y}) ${dR}(${v}${T})`;
          case bn:
            return `${pR}(${l}${p}, ${m}${y})`;
          default:
            return "";
        }
      }).join(" "),
      { setStyle: s } = i;
    bt(e, ht, i), s(e, ht, o), jR(r, n) && s(e, fr, hR);
  }
  function HR(e, t, n, r) {
    let i = (0, Ir.default)(t, (s, a, u) => `${s} ${u}(${a}${UR(u, n)})`, ""),
      { setStyle: o } = r;
    bt(e, _n, r), o(e, _n, i);
  }
  function zR(e, t, n, r) {
    let i = (0, Ir.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = r;
    bt(e, In, r), o(e, In, i);
  }
  function jR({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
    return (
      (e === Ut && r !== void 0) ||
      (e === Wt && r !== void 0) ||
      (e === Bt && (t !== void 0 || n !== void 0))
    );
  }
  function $R(e, t) {
    let n = e.exec(t);
    return n ? n[1] : "";
  }
  function ZR({ element: e, actionTypeId: t, computedStyle: n, getStyle: r }) {
    let i = wo[t],
      o = r(e, i),
      s = YR.test(o) ? o : n[i],
      a = $R(QR, s).split(Tn);
    return {
      rValue: (0, st.default)(parseInt(a[0], 10), 255),
      gValue: (0, st.default)(parseInt(a[1], 10), 255),
      bValue: (0, st.default)(parseInt(a[2], 10), 255),
      aValue: (0, st.default)(parseFloat(a[3]), 1),
    };
  }
  function JR(e, t, n, r, i, o) {
    let { setStyle: s } = o;
    switch (r.actionTypeId) {
      case Ht: {
        let { widthUnit: a = "", heightUnit: u = "" } = r.config,
          { widthValue: l, heightValue: m } = n;
        l !== void 0 && (a === gt && (a = "px"), bt(e, tt, o), s(e, tt, l + a)),
          m !== void 0 &&
            (u === gt && (u = "px"), bt(e, nt, o), s(e, nt, m + u));
        break;
      }
      case wn: {
        HR(e, n, r.config, o);
        break;
      }
      case An: {
        zR(e, n, r.config, o);
        break;
      }
      case zt:
      case jt:
      case Kt: {
        let a = wo[r.actionTypeId],
          u = Math.round(n.rValue),
          l = Math.round(n.gValue),
          m = Math.round(n.bValue),
          v = n.aValue;
        bt(e, a, o),
          s(e, a, v >= 1 ? `rgb(${u},${l},${m})` : `rgba(${u},${l},${m},${v})`);
        break;
      }
      default: {
        let { unit: a = "" } = r.config;
        bt(e, i, o), s(e, i, n.value + a);
        break;
      }
    }
  }
  function eC(e, t, n) {
    let { setStyle: r } = n;
    switch (t.actionTypeId) {
      case br: {
        let { value: i } = t.config;
        i === gR && Ke ? r(e, _r, Qi) : r(e, _r, i);
        return;
      }
    }
  }
  function bt(e, t, n) {
    if (!Ke) return;
    let r = Jd[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Vt);
    if (!s) {
      o(e, Vt, r);
      return;
    }
    let a = s.split(Tn).map(Zd);
    a.indexOf(r) === -1 && o(e, Vt, a.concat(r).join(Tn));
  }
  function tp(e, t, n) {
    if (!Ke) return;
    let r = Jd[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Vt);
    !s ||
      s.indexOf(r) === -1 ||
      o(
        e,
        Vt,
        s
          .split(Tn)
          .map(Zd)
          .filter((a) => a !== r)
          .join(Tn)
      );
  }
  function tC({ store: e, elementApi: t }) {
    let { ixData: n } = e.getState(),
      { events: r = {}, actionLists: i = {} } = n;
    Object.keys(r).forEach((o) => {
      let s = r[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        l = i[u];
      l && Hd({ actionList: l, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Hd({ actionList: i[o], elementApi: t });
      });
  }
  function Hd({ actionList: e = {}, event: t, elementApi: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e;
    r &&
      r.forEach((o) => {
        zd({ actionGroup: o, event: t, elementApi: n });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            zd({ actionGroup: a, event: t, elementApi: n });
          });
        });
  }
  function zd({ actionGroup: e, event: t, elementApi: n }) {
    let { actionItems: r } = e;
    r.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      It(o)
        ? (a = (u) => vo(o)(u, i))
        : (a = np({ effect: rC, actionTypeId: o, elementApi: n })),
        Ao({ config: s, event: t, elementApi: n }).forEach(a);
    });
  }
  function nC(e, t, n) {
    let { setStyle: r, getStyle: i } = n,
      { actionTypeId: o } = t;
    if (o === Ht) {
      let { config: s } = t;
      s.widthUnit === gt && r(e, tt, ""), s.heightUnit === gt && r(e, nt, "");
    }
    i(e, Vt) && np({ effect: tp, actionTypeId: o, elementApi: n })(e);
  }
  function rC(e, t, n) {
    let { setStyle: r } = n;
    tp(e, t, n), r(e, t, ""), t === ht && r(e, fr, "");
  }
  function rp(e) {
    let t = 0,
      n = 0;
    return (
      e.forEach((r, i) => {
        let { config: o } = r,
          s = o.delay + o.duration;
        s >= t && ((t = s), (n = i));
      }),
      n
    );
  }
  function iC(e, t) {
    let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      n.forEach((u, l) => {
        if (r && l === 0) return;
        let { actionItems: m } = u,
          v = m[rp(m)],
          { config: p, actionTypeId: y } = v;
        i.id === v.id && (a = s + o);
        let T = ep(y) === To ? 0 : p.duration;
        s += p.delay + T;
      }),
      s > 0 ? mn(a / s) : 0
    );
  }
  function oC({ actionList: e, actionItemId: t, rawData: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, Tr.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      r && r.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: l }) => l.some(s));
        }),
      (0, Tr.setIn)(n, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function aC(e, { basedOn: t }) {
    return (
      (e === je.SCROLLING_IN_VIEW && (t === Je.ELEMENT || t == null)) ||
      (e === je.MOUSE_MOVE && t === Je.ELEMENT)
    );
  }
  function sC(e, t) {
    return e + _R + t;
  }
  function uC(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function cC(e, t) {
    return _o(e && e.sort(), t && t.sort());
  }
  function lC(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Io + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
    return t + Io + n + Io + r;
  }
  var st,
    Ir,
    Er,
    Tr,
    jd,
    aR,
    sR,
    uR,
    cR,
    lR,
    fR,
    dR,
    pR,
    hR,
    gR,
    mr,
    _n,
    In,
    tt,
    nt,
    Kd,
    vR,
    yR,
    Vd,
    ER,
    Ud,
    mR,
    _r,
    Vt,
    gt,
    Tn,
    _R,
    Io,
    Yd,
    To,
    bo,
    Qd,
    Ut,
    Wt,
    Bt,
    bn,
    $d,
    wn,
    An,
    Ht,
    zt,
    jt,
    Kt,
    br,
    IR,
    Zd,
    wo,
    Jd,
    yr,
    bR,
    AR,
    xR,
    Bd,
    LR,
    PR,
    DR,
    MR,
    FR,
    So,
    XR,
    VR,
    UR,
    WR,
    KR,
    YR,
    QR,
    np,
    op = ye(() => {
      "use strict";
      (st = de(_d())), (Ir = de(Dd())), (Er = de(kd())), (Tr = de(Lt()));
      Me();
      Xd();
      Ji();
      jd = de(so());
      yo();
      dr();
      ({
        BACKGROUND: aR,
        TRANSFORM: sR,
        TRANSLATE_3D: uR,
        SCALE_3D: cR,
        ROTATE_X: lR,
        ROTATE_Y: fR,
        ROTATE_Z: dR,
        SKEW: pR,
        PRESERVE_3D: hR,
        FLEX: gR,
        OPACITY: mr,
        FILTER: _n,
        FONT_VARIATION_SETTINGS: In,
        WIDTH: tt,
        HEIGHT: nt,
        BACKGROUND_COLOR: Kd,
        BORDER_COLOR: vR,
        COLOR: yR,
        CHILDREN: Vd,
        IMMEDIATE_CHILDREN: ER,
        SIBLINGS: Ud,
        PARENT: mR,
        DISPLAY: _r,
        WILL_CHANGE: Vt,
        AUTO: gt,
        COMMA_DELIMITER: Tn,
        COLON_DELIMITER: _R,
        BAR_DELIMITER: Io,
        RENDER_TRANSFORM: Yd,
        RENDER_GENERAL: To,
        RENDER_STYLE: bo,
        RENDER_PLUGIN: Qd,
      } = Se),
        ({
          TRANSFORM_MOVE: Ut,
          TRANSFORM_SCALE: Wt,
          TRANSFORM_ROTATE: Bt,
          TRANSFORM_SKEW: bn,
          STYLE_OPACITY: $d,
          STYLE_FILTER: wn,
          STYLE_FONT_VARIATION: An,
          STYLE_SIZE: Ht,
          STYLE_BACKGROUND_COLOR: zt,
          STYLE_BORDER: jt,
          STYLE_TEXT_COLOR: Kt,
          GENERAL_DISPLAY: br,
          OBJECT_VALUE: IR,
        } = Ce),
        (Zd = (e) => e.trim()),
        (wo = Object.freeze({ [zt]: Kd, [jt]: vR, [Kt]: yR })),
        (Jd = Object.freeze({
          [ht]: sR,
          [Kd]: aR,
          [mr]: mr,
          [_n]: _n,
          [tt]: tt,
          [nt]: nt,
          [In]: In,
        })),
        (yr = new Map());
      bR = 1;
      AR = 1;
      xR = (e, t) => e === t;
      (Bd = /px/),
        (LR = (e, t) =>
          t.reduce(
            (n, r) => (n[r.type] == null && (n[r.type] = XR[r.type]), n),
            e || {}
          )),
        (PR = (e, t) =>
          t.reduce(
            (n, r) => (
              n[r.type] == null &&
                (n[r.type] = VR[r.type] || r.defaultValue || 0),
              n
            ),
            e || {}
          ));
      (DR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (MR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (FR = (e, t, n) => {
          if (It(e)) return fo(e)(n, t);
          switch (e) {
            case wn: {
              let r = (0, Er.default)(n.filters, ({ type: i }) => i === t);
              return r ? r.value : 0;
            }
            case An: {
              let r = (0, Er.default)(
                n.fontVariations,
                ({ type: i }) => i === t
              );
              return r ? r.value : 0;
            }
            default:
              return n[t];
          }
        });
      (So = {
        [Ut]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Wt]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Bt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [bn]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (XR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (VR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (UR = (e, t) => {
          let n = (0, Er.default)(t.filters, ({ type: r }) => r === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (WR = Object.keys(So));
      (KR = "\\(([^)]+)\\)"), (YR = /^rgb/), (QR = RegExp(`rgba?${KR}`));
      np =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (r) => {
          switch (t) {
            case Ut:
            case Wt:
            case Bt:
            case bn:
              e(r, ht, n);
              break;
            case wn:
              e(r, _n, n);
              break;
            case An:
              e(r, In, n);
              break;
            case $d:
              e(r, mr, n);
              break;
            case Ht:
              e(r, tt, n), e(r, nt, n);
              break;
            case zt:
            case jt:
            case Kt:
              e(r, wo[t], n);
              break;
            case br:
              e(r, _r, n);
              break;
          }
        };
    });
  var wt = f((Oo) => {
    "use strict";
    Object.defineProperty(Oo, "__esModule", { value: !0 });
    function fC(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    fC(Oo, {
      IX2BrowserSupport: function () {
        return dC;
      },
      IX2EasingUtils: function () {
        return hC;
      },
      IX2Easings: function () {
        return pC;
      },
      IX2ElementsReducer: function () {
        return gC;
      },
      IX2VanillaPlugins: function () {
        return vC;
      },
      IX2VanillaUtils: function () {
        return yC;
      },
    });
    var dC = Yt((dr(), Qe(Zf))),
      pC = Yt((Zi(), Qe(En))),
      hC = Yt((Ji(), Qe(od))),
      gC = Yt((cd(), Qe(ud))),
      vC = Yt((yo(), Qe(Ed))),
      yC = Yt((op(), Qe(ip)));
    function ap(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (ap = function (r) {
        return r ? n : t;
      })(e);
    }
    function Yt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = ap(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
  });
  var Ar,
    ut,
    EC,
    mC,
    _C,
    IC,
    TC,
    bC,
    wr,
    sp,
    wC,
    AC,
    xo,
    SC,
    OC,
    xC,
    RC,
    up,
    cp = ye(() => {
      "use strict";
      Me();
      (Ar = de(wt())),
        (ut = de(Lt())),
        ({
          IX2_RAW_DATA_IMPORTED: EC,
          IX2_SESSION_STOPPED: mC,
          IX2_INSTANCE_ADDED: _C,
          IX2_INSTANCE_STARTED: IC,
          IX2_INSTANCE_REMOVED: TC,
          IX2_ANIMATION_FRAME_CHANGED: bC,
        } = be),
        ({
          optimizeFloat: wr,
          applyEasing: sp,
          createBezierEasing: wC,
        } = Ar.IX2EasingUtils),
        ({ RENDER_GENERAL: AC } = Se),
        ({
          getItemConfigByKey: xo,
          getRenderType: SC,
          getStyleProp: OC,
        } = Ar.IX2VanillaUtils),
        (xC = (e, t) => {
          let {
              position: n,
              parameterId: r,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: l,
              skipMotion: m,
              skipToValue: v,
            } = e,
            { parameters: p } = t.payload,
            y = Math.max(1 - s, 0.01),
            T = p[r];
          T == null && ((y = 1), (T = a));
          let I = Math.max(T, 0) || 0,
            S = wr(I - n),
            b = m ? v : wr(n + S * y),
            R = b * 100;
          if (b === n && e.current) return e;
          let O, L, D, C;
          for (let H = 0, { length: z } = i; H < z; H++) {
            let { keyframe: Q, actionItems: te } = i[H];
            if ((H === 0 && (O = te[0]), R >= Q)) {
              O = te[0];
              let q = i[H + 1],
                A = q && R !== Q;
              (L = A ? q.actionItems[0] : null),
                A && ((D = Q / 100), (C = (q.keyframe - Q) / 100));
            }
          }
          let W = {};
          if (O && !L)
            for (let H = 0, { length: z } = o; H < z; H++) {
              let Q = o[H];
              W[Q] = xo(u, Q, O.config);
            }
          else if (O && L && D !== void 0 && C !== void 0) {
            let H = (b - D) / C,
              z = O.config.easing,
              Q = sp(z, H, l);
            for (let te = 0, { length: q } = o; te < q; te++) {
              let A = o[te],
                M = xo(u, A, O.config),
                ne = (xo(u, A, L.config) - M) * Q + M;
              W[A] = ne;
            }
          }
          return (0, ut.merge)(e, { position: b, current: W });
        }),
        (RC = (e, t) => {
          let {
              active: n,
              origin: r,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: l,
              destinationKeys: m,
              pluginDuration: v,
              instanceDelay: p,
              customEasingFn: y,
              skipMotion: T,
            } = e,
            I = u.config.easing,
            { duration: S, delay: b } = u.config;
          v != null && (S = v),
            (b = p ?? b),
            s === AC ? (S = 0) : (o || T) && (S = b = 0);
          let { now: R } = t.payload;
          if (n && r) {
            let O = R - (i + b);
            if (a) {
              let H = R - i,
                z = S + b,
                Q = wr(Math.min(Math.max(0, H / z), 1));
              e = (0, ut.set)(e, "verboseTimeElapsed", z * Q);
            }
            if (O < 0) return e;
            let L = wr(Math.min(Math.max(0, O / S), 1)),
              D = sp(I, L, y),
              C = {},
              W = null;
            return (
              m.length &&
                (W = m.reduce((H, z) => {
                  let Q = l[z],
                    te = parseFloat(r[z]) || 0,
                    A = (parseFloat(Q) - te) * D + te;
                  return (H[z] = A), H;
                }, {})),
              (C.current = W),
              (C.position = L),
              L === 1 && ((C.active = !1), (C.complete = !0)),
              (0, ut.merge)(e, C)
            );
          }
          return e;
        }),
        (up = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case EC:
              return t.payload.ixInstances || Object.freeze({});
            case mC:
              return Object.freeze({});
            case _C: {
              let {
                  instanceId: n,
                  elementId: r,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: l,
                  isCarrier: m,
                  origin: v,
                  destination: p,
                  immediate: y,
                  verbose: T,
                  continuous: I,
                  parameterId: S,
                  actionGroups: b,
                  smoothing: R,
                  restingValue: O,
                  pluginInstance: L,
                  pluginDuration: D,
                  instanceDelay: C,
                  skipMotion: W,
                  skipToValue: H,
                } = t.payload,
                { actionTypeId: z } = i,
                Q = SC(z),
                te = OC(Q, z),
                q = Object.keys(p).filter(
                  (M) => p[M] != null && typeof p[M] != "string"
                ),
                { easing: A } = i.config;
              return (0, ut.set)(e, n, {
                id: n,
                elementId: r,
                active: !1,
                position: 0,
                start: 0,
                origin: v,
                destination: p,
                destinationKeys: q,
                immediate: y,
                verbose: T,
                current: null,
                actionItem: i,
                actionTypeId: z,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: l,
                renderType: Q,
                isCarrier: m,
                styleProp: te,
                continuous: I,
                parameterId: S,
                actionGroups: b,
                smoothing: R,
                restingValue: O,
                pluginInstance: L,
                pluginDuration: D,
                instanceDelay: C,
                skipMotion: W,
                skipToValue: H,
                customEasingFn:
                  Array.isArray(A) && A.length === 4 ? wC(A) : void 0,
              });
            }
            case IC: {
              let { instanceId: n, time: r } = t.payload;
              return (0, ut.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: r,
              });
            }
            case TC: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let r = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== n && (r[a] = e[a]);
              }
              return r;
            }
            case bC: {
              let n = e,
                r = Object.keys(e),
                { length: i } = r;
              for (let o = 0; o < i; o++) {
                let s = r[o],
                  a = e[s],
                  u = a.continuous ? xC : RC;
                n = (0, ut.set)(n, s, u(a, t));
              }
              return n;
            }
            default:
              return e;
          }
        });
    });
  var CC,
    LC,
    PC,
    lp,
    fp = ye(() => {
      "use strict";
      Me();
      ({
        IX2_RAW_DATA_IMPORTED: CC,
        IX2_SESSION_STOPPED: LC,
        IX2_PARAMETER_CHANGED: PC,
      } = be),
        (lp = (e = {}, t) => {
          switch (t.type) {
            case CC:
              return t.payload.ixParameters || {};
            case LC:
              return {};
            case PC: {
              let { key: n, value: r } = t.payload;
              return (e[n] = r), e;
            }
            default:
              return e;
          }
        });
    });
  var hp = {};
  De(hp, { default: () => DC });
  var dp,
    pp,
    NC,
    DC,
    gp = ye(() => {
      "use strict";
      dp = de(yi());
      Ts();
      Ws();
      zs();
      pp = de(wt());
      cp();
      fp();
      ({ ixElements: NC } = pp.IX2ElementsReducer),
        (DC = (0, dp.combineReducers)({
          ixData: Is,
          ixRequest: Us,
          ixSession: Hs,
          ixElements: NC,
          ixInstances: up,
          ixParameters: lp,
        }));
    });
  var yp = f((mk, vp) => {
    var MC = ft(),
      FC = we(),
      qC = ot(),
      kC = "[object String]";
    function GC(e) {
      return typeof e == "string" || (!FC(e) && qC(e) && MC(e) == kC);
    }
    vp.exports = GC;
  });
  var mp = f((_k, Ep) => {
    var XC = Hi(),
      VC = XC("length");
    Ep.exports = VC;
  });
  var Ip = f((Ik, _p) => {
    var UC = "\\ud800-\\udfff",
      WC = "\\u0300-\\u036f",
      BC = "\\ufe20-\\ufe2f",
      HC = "\\u20d0-\\u20ff",
      zC = WC + BC + HC,
      jC = "\\ufe0e\\ufe0f",
      KC = "\\u200d",
      YC = RegExp("[" + KC + UC + zC + jC + "]");
    function QC(e) {
      return YC.test(e);
    }
    _p.exports = QC;
  });
  var Cp = f((Tk, Rp) => {
    var bp = "\\ud800-\\udfff",
      $C = "\\u0300-\\u036f",
      ZC = "\\ufe20-\\ufe2f",
      JC = "\\u20d0-\\u20ff",
      eL = $C + ZC + JC,
      tL = "\\ufe0e\\ufe0f",
      nL = "[" + bp + "]",
      Ro = "[" + eL + "]",
      Co = "\\ud83c[\\udffb-\\udfff]",
      rL = "(?:" + Ro + "|" + Co + ")",
      wp = "[^" + bp + "]",
      Ap = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Sp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      iL = "\\u200d",
      Op = rL + "?",
      xp = "[" + tL + "]?",
      oL = "(?:" + iL + "(?:" + [wp, Ap, Sp].join("|") + ")" + xp + Op + ")*",
      aL = xp + Op + oL,
      sL = "(?:" + [wp + Ro + "?", Ro, Ap, Sp, nL].join("|") + ")",
      Tp = RegExp(Co + "(?=" + Co + ")|" + sL + aL, "g");
    function uL(e) {
      for (var t = (Tp.lastIndex = 0); Tp.test(e); ) ++t;
      return t;
    }
    Rp.exports = uL;
  });
  var Pp = f((bk, Lp) => {
    var cL = mp(),
      lL = Ip(),
      fL = Cp();
    function dL(e) {
      return lL(e) ? fL(e) : cL(e);
    }
    Lp.exports = dL;
  });
  var Dp = f((wk, Np) => {
    var pL = nr(),
      hL = rr(),
      gL = mt(),
      vL = yp(),
      yL = Pp(),
      EL = "[object Map]",
      mL = "[object Set]";
    function _L(e) {
      if (e == null) return 0;
      if (gL(e)) return vL(e) ? yL(e) : e.length;
      var t = hL(e);
      return t == EL || t == mL ? e.size : pL(e).length;
    }
    Np.exports = _L;
  });
  var Fp = f((Ak, Mp) => {
    var IL = "Expected a function";
    function TL(e) {
      if (typeof e != "function") throw new TypeError(IL);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Mp.exports = TL;
  });
  var Lo = f((Sk, qp) => {
    var bL = dt(),
      wL = (function () {
        try {
          var e = bL(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    qp.exports = wL;
  });
  var Po = f((Ok, Gp) => {
    var kp = Lo();
    function AL(e, t, n) {
      t == "__proto__" && kp
        ? kp(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (e[t] = n);
    }
    Gp.exports = AL;
  });
  var Vp = f((xk, Xp) => {
    var SL = Po(),
      OL = zn(),
      xL = Object.prototype,
      RL = xL.hasOwnProperty;
    function CL(e, t, n) {
      var r = e[t];
      (!(RL.call(e, t) && OL(r, n)) || (n === void 0 && !(t in e))) &&
        SL(e, t, n);
    }
    Xp.exports = CL;
  });
  var Bp = f((Rk, Wp) => {
    var LL = Vp(),
      PL = gn(),
      NL = Zn(),
      Up = et(),
      DL = Gt();
    function ML(e, t, n, r) {
      if (!Up(e)) return e;
      t = PL(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = DL(t[i]),
          l = n;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var m = a[u];
          (l = r ? r(m, u, a) : void 0),
            l === void 0 && (l = Up(m) ? m : NL(t[i + 1]) ? [] : {});
        }
        LL(a, u, l), (a = a[u]);
      }
      return e;
    }
    Wp.exports = ML;
  });
  var zp = f((Ck, Hp) => {
    var FL = ar(),
      qL = Bp(),
      kL = gn();
    function GL(e, t, n) {
      for (var r = -1, i = t.length, o = {}; ++r < i; ) {
        var s = t[r],
          a = FL(e, s);
        n(a, s) && qL(o, kL(s, e), a);
      }
      return o;
    }
    Hp.exports = GL;
  });
  var Kp = f((Lk, jp) => {
    var XL = Qn(),
      VL = ii(),
      UL = Ci(),
      WL = Ri(),
      BL = Object.getOwnPropertySymbols,
      HL = BL
        ? function (e) {
            for (var t = []; e; ) XL(t, UL(e)), (e = VL(e));
            return t;
          }
        : WL;
    jp.exports = HL;
  });
  var Qp = f((Pk, Yp) => {
    function zL(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    Yp.exports = zL;
  });
  var Zp = f((Nk, $p) => {
    var jL = et(),
      KL = tr(),
      YL = Qp(),
      QL = Object.prototype,
      $L = QL.hasOwnProperty;
    function ZL(e) {
      if (!jL(e)) return YL(e);
      var t = KL(e),
        n = [];
      for (var r in e)
        (r == "constructor" && (t || !$L.call(e, r))) || n.push(r);
      return n;
    }
    $p.exports = ZL;
  });
  var eh = f((Dk, Jp) => {
    var JL = Pi(),
      eP = Zp(),
      tP = mt();
    function nP(e) {
      return tP(e) ? JL(e, !0) : eP(e);
    }
    Jp.exports = nP;
  });
  var nh = f((Mk, th) => {
    var rP = xi(),
      iP = Kp(),
      oP = eh();
    function aP(e) {
      return rP(e, oP, iP);
    }
    th.exports = aP;
  });
  var ih = f((Fk, rh) => {
    var sP = Bi(),
      uP = pt(),
      cP = zp(),
      lP = nh();
    function fP(e, t) {
      if (e == null) return {};
      var n = sP(lP(e), function (r) {
        return [r];
      });
      return (
        (t = uP(t)),
        cP(e, n, function (r, i) {
          return t(r, i[0]);
        })
      );
    }
    rh.exports = fP;
  });
  var ah = f((qk, oh) => {
    var dP = pt(),
      pP = Fp(),
      hP = ih();
    function gP(e, t) {
      return hP(e, pP(dP(t)));
    }
    oh.exports = gP;
  });
  var uh = f((kk, sh) => {
    var vP = nr(),
      yP = rr(),
      EP = cn(),
      mP = we(),
      _P = mt(),
      IP = $n(),
      TP = tr(),
      bP = er(),
      wP = "[object Map]",
      AP = "[object Set]",
      SP = Object.prototype,
      OP = SP.hasOwnProperty;
    function xP(e) {
      if (e == null) return !0;
      if (
        _P(e) &&
        (mP(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          IP(e) ||
          bP(e) ||
          EP(e))
      )
        return !e.length;
      var t = yP(e);
      if (t == wP || t == AP) return !e.size;
      if (TP(e)) return !vP(e).length;
      for (var n in e) if (OP.call(e, n)) return !1;
      return !0;
    }
    sh.exports = xP;
  });
  var lh = f((Gk, ch) => {
    var RP = Po(),
      CP = Eo(),
      LP = pt();
    function PP(e, t) {
      var n = {};
      return (
        (t = LP(t, 3)),
        CP(e, function (r, i, o) {
          RP(n, i, t(r, i, o));
        }),
        n
      );
    }
    ch.exports = PP;
  });
  var dh = f((Xk, fh) => {
    function NP(e, t) {
      for (
        var n = -1, r = e == null ? 0 : e.length;
        ++n < r && t(e[n], n, e) !== !1;

      );
      return e;
    }
    fh.exports = NP;
  });
  var hh = f((Vk, ph) => {
    var DP = ur();
    function MP(e) {
      return typeof e == "function" ? e : DP;
    }
    ph.exports = MP;
  });
  var vh = f((Uk, gh) => {
    var FP = dh(),
      qP = mo(),
      kP = hh(),
      GP = we();
    function XP(e, t) {
      var n = GP(e) ? FP : qP;
      return n(e, kP(t));
    }
    gh.exports = XP;
  });
  var Eh = f((Wk, yh) => {
    var VP = ze(),
      UP = function () {
        return VP.Date.now();
      };
    yh.exports = UP;
  });
  var Ih = f((Bk, _h) => {
    var WP = et(),
      No = Eh(),
      mh = cr(),
      BP = "Expected a function",
      HP = Math.max,
      zP = Math.min;
    function jP(e, t, n) {
      var r,
        i,
        o,
        s,
        a,
        u,
        l = 0,
        m = !1,
        v = !1,
        p = !0;
      if (typeof e != "function") throw new TypeError(BP);
      (t = mh(t) || 0),
        WP(n) &&
          ((m = !!n.leading),
          (v = "maxWait" in n),
          (o = v ? HP(mh(n.maxWait) || 0, t) : o),
          (p = "trailing" in n ? !!n.trailing : p));
      function y(C) {
        var W = r,
          H = i;
        return (r = i = void 0), (l = C), (s = e.apply(H, W)), s;
      }
      function T(C) {
        return (l = C), (a = setTimeout(b, t)), m ? y(C) : s;
      }
      function I(C) {
        var W = C - u,
          H = C - l,
          z = t - W;
        return v ? zP(z, o - H) : z;
      }
      function S(C) {
        var W = C - u,
          H = C - l;
        return u === void 0 || W >= t || W < 0 || (v && H >= o);
      }
      function b() {
        var C = No();
        if (S(C)) return R(C);
        a = setTimeout(b, I(C));
      }
      function R(C) {
        return (a = void 0), p && r ? y(C) : ((r = i = void 0), s);
      }
      function O() {
        a !== void 0 && clearTimeout(a), (l = 0), (r = u = i = a = void 0);
      }
      function L() {
        return a === void 0 ? s : R(No());
      }
      function D() {
        var C = No(),
          W = S(C);
        if (((r = arguments), (i = this), (u = C), W)) {
          if (a === void 0) return T(u);
          if (v) return clearTimeout(a), (a = setTimeout(b, t)), y(u);
        }
        return a === void 0 && (a = setTimeout(b, t)), s;
      }
      return (D.cancel = O), (D.flush = L), D;
    }
    _h.exports = jP;
  });
  var bh = f((Hk, Th) => {
    var KP = Ih(),
      YP = et(),
      QP = "Expected a function";
    function $P(e, t, n) {
      var r = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(QP);
      return (
        YP(n) &&
          ((r = "leading" in n ? !!n.leading : r),
          (i = "trailing" in n ? !!n.trailing : i)),
        KP(e, t, { leading: r, maxWait: t, trailing: i })
      );
    }
    Th.exports = $P;
  });
  var Ah = {};
  De(Ah, {
    actionListPlaybackChanged: () => $t,
    animationFrameChanged: () => Or,
    clearRequested: () => TN,
    elementStateChanged: () => Vo,
    eventListenerAdded: () => Sr,
    eventStateChanged: () => ko,
    instanceAdded: () => Go,
    instanceRemoved: () => Xo,
    instanceStarted: () => xr,
    mediaQueriesDefined: () => Wo,
    parameterChanged: () => Qt,
    playbackRequested: () => _N,
    previewRequested: () => mN,
    rawDataImported: () => Do,
    sessionInitialized: () => Mo,
    sessionStarted: () => Fo,
    sessionStopped: () => qo,
    stopRequested: () => IN,
    testFrameRendered: () => bN,
    viewportWidthChanged: () => Uo,
  });
  var wh,
    ZP,
    JP,
    eN,
    tN,
    nN,
    rN,
    iN,
    oN,
    aN,
    sN,
    uN,
    cN,
    lN,
    fN,
    dN,
    pN,
    hN,
    gN,
    vN,
    yN,
    EN,
    Do,
    Mo,
    Fo,
    qo,
    mN,
    _N,
    IN,
    TN,
    Sr,
    bN,
    ko,
    Or,
    Qt,
    Go,
    xr,
    Xo,
    Vo,
    $t,
    Uo,
    Wo,
    Rr = ye(() => {
      "use strict";
      Me();
      (wh = de(wt())),
        ({
          IX2_RAW_DATA_IMPORTED: ZP,
          IX2_SESSION_INITIALIZED: JP,
          IX2_SESSION_STARTED: eN,
          IX2_SESSION_STOPPED: tN,
          IX2_PREVIEW_REQUESTED: nN,
          IX2_PLAYBACK_REQUESTED: rN,
          IX2_STOP_REQUESTED: iN,
          IX2_CLEAR_REQUESTED: oN,
          IX2_EVENT_LISTENER_ADDED: aN,
          IX2_TEST_FRAME_RENDERED: sN,
          IX2_EVENT_STATE_CHANGED: uN,
          IX2_ANIMATION_FRAME_CHANGED: cN,
          IX2_PARAMETER_CHANGED: lN,
          IX2_INSTANCE_ADDED: fN,
          IX2_INSTANCE_STARTED: dN,
          IX2_INSTANCE_REMOVED: pN,
          IX2_ELEMENT_STATE_CHANGED: hN,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: gN,
          IX2_VIEWPORT_WIDTH_CHANGED: vN,
          IX2_MEDIA_QUERIES_DEFINED: yN,
        } = be),
        ({ reifyState: EN } = wh.IX2VanillaUtils),
        (Do = (e) => ({ type: ZP, payload: { ...EN(e) } })),
        (Mo = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: JP,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Fo = () => ({ type: eN })),
        (qo = () => ({ type: tN })),
        (mN = ({ rawData: e, defer: t }) => ({
          type: nN,
          payload: { defer: t, rawData: e },
        })),
        (_N = ({
          actionTypeId: e = Ce.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: r,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: rN,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: s,
            eventId: r,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (IN = (e) => ({ type: iN, payload: { actionListId: e } })),
        (TN = () => ({ type: oN })),
        (Sr = (e, t) => ({
          type: aN,
          payload: { target: e, listenerParams: t },
        })),
        (bN = (e = 1) => ({ type: sN, payload: { step: e } })),
        (ko = (e, t) => ({ type: uN, payload: { stateKey: e, newState: t } })),
        (Or = (e, t) => ({ type: cN, payload: { now: e, parameters: t } })),
        (Qt = (e, t) => ({ type: lN, payload: { key: e, value: t } })),
        (Go = (e) => ({ type: fN, payload: { ...e } })),
        (xr = (e, t) => ({ type: dN, payload: { instanceId: e, time: t } })),
        (Xo = (e) => ({ type: pN, payload: { instanceId: e } })),
        (Vo = (e, t, n, r) => ({
          type: hN,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: r },
        })),
        ($t = ({ actionListId: e, isPlaying: t }) => ({
          type: gN,
          payload: { actionListId: e, isPlaying: t },
        })),
        (Uo = ({ width: e, mediaQueries: t }) => ({
          type: vN,
          payload: { width: e, mediaQueries: t },
        })),
        (Wo = () => ({ type: yN }));
    });
  var Pe = {};
  De(Pe, {
    elementContains: () => zo,
    getChildElements: () => NN,
    getClosestElement: () => Sn,
    getProperty: () => xN,
    getQuerySelector: () => Ho,
    getRefType: () => jo,
    getSiblingElements: () => DN,
    getStyle: () => ON,
    getValidDocument: () => CN,
    isSiblingNode: () => PN,
    matchSelector: () => RN,
    queryDocument: () => LN,
    setStyle: () => SN,
  });
  function SN(e, t, n) {
    e.style[t] = n;
  }
  function ON(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function xN(e, t) {
    return e[t];
  }
  function RN(e) {
    return (t) => t[Bo](e);
  }
  function Ho({ id: e, selector: t }) {
    if (e) {
      let n = e;
      if (e.indexOf(Sh) !== -1) {
        let r = e.split(Sh),
          i = r[0];
        if (((n = r[1]), i !== document.documentElement.getAttribute(xh)))
          return null;
      }
      return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
    }
    return t;
  }
  function CN(e) {
    return e == null || e === document.documentElement.getAttribute(xh)
      ? document
      : null;
  }
  function LN(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function zo(e, t) {
    return e.contains(t);
  }
  function PN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function NN(e) {
    let t = [];
    for (let n = 0, { length: r } = e || []; n < r; n++) {
      let { children: i } = e[n],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function DN(e = []) {
    let t = [],
      n = [];
    for (let r = 0, { length: i } = e; r < i; r++) {
      let { parentNode: o } = e[r];
      if (!o || !o.children || !o.children.length || n.indexOf(o) !== -1)
        continue;
      n.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function jo(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? wN
        : AN
      : null;
  }
  var Oh,
    Bo,
    Sh,
    wN,
    AN,
    xh,
    Sn,
    Rh = ye(() => {
      "use strict";
      Oh = de(wt());
      Me();
      ({ ELEMENT_MATCHES: Bo } = Oh.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Sh,
          HTML_ELEMENT: wN,
          PLAIN_OBJECT: AN,
          WF_PAGE: xh,
        } = Se);
      Sn = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[Bo] && n[Bo](t)) return n;
              n = n.parentNode;
            } while (n != null);
            return null;
          };
    });
  var Ko = f((Kk, Lh) => {
    var MN = et(),
      Ch = Object.create,
      FN = (function () {
        function e() {}
        return function (t) {
          if (!MN(t)) return {};
          if (Ch) return Ch(t);
          e.prototype = t;
          var n = new e();
          return (e.prototype = void 0), n;
        };
      })();
    Lh.exports = FN;
  });
  var Cr = f((Yk, Ph) => {
    function qN() {}
    Ph.exports = qN;
  });
  var Pr = f((Qk, Nh) => {
    var kN = Ko(),
      GN = Cr();
    function Lr(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Lr.prototype = kN(GN.prototype);
    Lr.prototype.constructor = Lr;
    Nh.exports = Lr;
  });
  var qh = f(($k, Fh) => {
    var Dh = xt(),
      XN = cn(),
      VN = we(),
      Mh = Dh ? Dh.isConcatSpreadable : void 0;
    function UN(e) {
      return VN(e) || XN(e) || !!(Mh && e && e[Mh]);
    }
    Fh.exports = UN;
  });
  var Xh = f((Zk, Gh) => {
    var WN = Qn(),
      BN = qh();
    function kh(e, t, n, r, i) {
      var o = -1,
        s = e.length;
      for (n || (n = BN), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && n(a)
          ? t > 1
            ? kh(a, t - 1, n, r, i)
            : WN(i, a)
          : r || (i[i.length] = a);
      }
      return i;
    }
    Gh.exports = kh;
  });
  var Uh = f((Jk, Vh) => {
    var HN = Xh();
    function zN(e) {
      var t = e == null ? 0 : e.length;
      return t ? HN(e, 1) : [];
    }
    Vh.exports = zN;
  });
  var Bh = f((eG, Wh) => {
    function jN(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    Wh.exports = jN;
  });
  var jh = f((tG, zh) => {
    var KN = Bh(),
      Hh = Math.max;
    function YN(e, t, n) {
      return (
        (t = Hh(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var r = arguments, i = -1, o = Hh(r.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = r[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
          return (a[t] = n(s)), KN(e, this, a);
        }
      );
    }
    zh.exports = YN;
  });
  var Yh = f((nG, Kh) => {
    function QN(e) {
      return function () {
        return e;
      };
    }
    Kh.exports = QN;
  });
  var Zh = f((rG, $h) => {
    var $N = Yh(),
      Qh = Lo(),
      ZN = ur(),
      JN = Qh
        ? function (e, t) {
            return Qh(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: $N(t),
              writable: !0,
            });
          }
        : ZN;
    $h.exports = JN;
  });
  var eg = f((iG, Jh) => {
    var eD = 800,
      tD = 16,
      nD = Date.now;
    function rD(e) {
      var t = 0,
        n = 0;
      return function () {
        var r = nD(),
          i = tD - (r - n);
        if (((n = r), i > 0)) {
          if (++t >= eD) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    Jh.exports = rD;
  });
  var ng = f((oG, tg) => {
    var iD = Zh(),
      oD = eg(),
      aD = oD(iD);
    tg.exports = aD;
  });
  var ig = f((aG, rg) => {
    var sD = Uh(),
      uD = jh(),
      cD = ng();
    function lD(e) {
      return cD(uD(e, void 0, sD), e + "");
    }
    rg.exports = lD;
  });
  var sg = f((sG, ag) => {
    var og = Ni(),
      fD = og && new og();
    ag.exports = fD;
  });
  var cg = f((uG, ug) => {
    function dD() {}
    ug.exports = dD;
  });
  var Yo = f((cG, fg) => {
    var lg = sg(),
      pD = cg(),
      hD = lg
        ? function (e) {
            return lg.get(e);
          }
        : pD;
    fg.exports = hD;
  });
  var pg = f((lG, dg) => {
    var gD = {};
    dg.exports = gD;
  });
  var Qo = f((fG, gg) => {
    var hg = pg(),
      vD = Object.prototype,
      yD = vD.hasOwnProperty;
    function ED(e) {
      for (
        var t = e.name + "", n = hg[t], r = yD.call(hg, t) ? n.length : 0;
        r--;

      ) {
        var i = n[r],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    gg.exports = ED;
  });
  var Dr = f((dG, vg) => {
    var mD = Ko(),
      _D = Cr(),
      ID = 4294967295;
    function Nr(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = ID),
        (this.__views__ = []);
    }
    Nr.prototype = mD(_D.prototype);
    Nr.prototype.constructor = Nr;
    vg.exports = Nr;
  });
  var Eg = f((pG, yg) => {
    function TD(e, t) {
      var n = -1,
        r = e.length;
      for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
      return t;
    }
    yg.exports = TD;
  });
  var _g = f((hG, mg) => {
    var bD = Dr(),
      wD = Pr(),
      AD = Eg();
    function SD(e) {
      if (e instanceof bD) return e.clone();
      var t = new wD(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = AD(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    mg.exports = SD;
  });
  var bg = f((gG, Tg) => {
    var OD = Dr(),
      Ig = Pr(),
      xD = Cr(),
      RD = we(),
      CD = ot(),
      LD = _g(),
      PD = Object.prototype,
      ND = PD.hasOwnProperty;
    function Mr(e) {
      if (CD(e) && !RD(e) && !(e instanceof OD)) {
        if (e instanceof Ig) return e;
        if (ND.call(e, "__wrapped__")) return LD(e);
      }
      return new Ig(e);
    }
    Mr.prototype = xD.prototype;
    Mr.prototype.constructor = Mr;
    Tg.exports = Mr;
  });
  var Ag = f((vG, wg) => {
    var DD = Dr(),
      MD = Yo(),
      FD = Qo(),
      qD = bg();
    function kD(e) {
      var t = FD(e),
        n = qD[t];
      if (typeof n != "function" || !(t in DD.prototype)) return !1;
      if (e === n) return !0;
      var r = MD(n);
      return !!r && e === r[0];
    }
    wg.exports = kD;
  });
  var Rg = f((yG, xg) => {
    var Sg = Pr(),
      GD = ig(),
      XD = Yo(),
      $o = Qo(),
      VD = we(),
      Og = Ag(),
      UD = "Expected a function",
      WD = 8,
      BD = 32,
      HD = 128,
      zD = 256;
    function jD(e) {
      return GD(function (t) {
        var n = t.length,
          r = n,
          i = Sg.prototype.thru;
        for (e && t.reverse(); r--; ) {
          var o = t[r];
          if (typeof o != "function") throw new TypeError(UD);
          if (i && !s && $o(o) == "wrapper") var s = new Sg([], !0);
        }
        for (r = s ? r : n; ++r < n; ) {
          o = t[r];
          var a = $o(o),
            u = a == "wrapper" ? XD(o) : void 0;
          u &&
          Og(u[0]) &&
          u[1] == (HD | WD | BD | zD) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[$o(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && Og(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var l = arguments,
            m = l[0];
          if (s && l.length == 1 && VD(m)) return s.plant(m).value();
          for (var v = 0, p = n ? t[v].apply(this, l) : m; ++v < n; )
            p = t[v].call(this, p);
          return p;
        };
      });
    }
    xg.exports = jD;
  });
  var Lg = f((EG, Cg) => {
    var KD = Rg(),
      YD = KD();
    Cg.exports = YD;
  });
  var Ng = f((mG, Pg) => {
    function QD(e, t, n) {
      return (
        e === e &&
          (n !== void 0 && (e = e <= n ? e : n),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Pg.exports = QD;
  });
  var Mg = f((_G, Dg) => {
    var $D = Ng(),
      Zo = cr();
    function ZD(e, t, n) {
      return (
        n === void 0 && ((n = t), (t = void 0)),
        n !== void 0 && ((n = Zo(n)), (n = n === n ? n : 0)),
        t !== void 0 && ((t = Zo(t)), (t = t === t ? t : 0)),
        $D(Zo(e), t, n)
      );
    }
    Dg.exports = ZD;
  });
  var Bg,
    Hg,
    zg,
    jg,
    JD,
    eM,
    tM,
    nM,
    rM,
    iM,
    oM,
    aM,
    sM,
    uM,
    cM,
    lM,
    fM,
    dM,
    pM,
    Kg,
    Yg,
    hM,
    gM,
    vM,
    Qg,
    yM,
    EM,
    $g,
    mM,
    Jo,
    Zg,
    Fg,
    qg,
    Jg,
    xn,
    _M,
    rt,
    ev,
    IM,
    qe,
    Ye,
    Rn,
    tv,
    ea,
    kg,
    ta,
    TM,
    On,
    bM,
    wM,
    AM,
    nv,
    Gg,
    SM,
    Xg,
    OM,
    xM,
    RM,
    Vg,
    Fr,
    qr,
    Ug,
    Wg,
    rv,
    iv = ye(() => {
      "use strict";
      (Bg = de(Lg())), (Hg = de(sr())), (zg = de(Mg()));
      Me();
      na();
      Rr();
      (jg = de(wt())),
        ({
          MOUSE_CLICK: JD,
          MOUSE_SECOND_CLICK: eM,
          MOUSE_DOWN: tM,
          MOUSE_UP: nM,
          MOUSE_OVER: rM,
          MOUSE_OUT: iM,
          DROPDOWN_CLOSE: oM,
          DROPDOWN_OPEN: aM,
          SLIDER_ACTIVE: sM,
          SLIDER_INACTIVE: uM,
          TAB_ACTIVE: cM,
          TAB_INACTIVE: lM,
          NAVBAR_CLOSE: fM,
          NAVBAR_OPEN: dM,
          MOUSE_MOVE: pM,
          PAGE_SCROLL_DOWN: Kg,
          SCROLL_INTO_VIEW: Yg,
          SCROLL_OUT_OF_VIEW: hM,
          PAGE_SCROLL_UP: gM,
          SCROLLING_IN_VIEW: vM,
          PAGE_FINISH: Qg,
          ECOMMERCE_CART_CLOSE: yM,
          ECOMMERCE_CART_OPEN: EM,
          PAGE_START: $g,
          PAGE_SCROLL: mM,
        } = je),
        (Jo = "COMPONENT_ACTIVE"),
        (Zg = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Fg } = Se),
        ({ getNamespacedParameterId: qg } = jg.IX2VanillaUtils),
        (Jg = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (xn = Jg(({ element: e, nativeEvent: t }) => e === t.target)),
        (_M = Jg(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (rt = (0, Bg.default)([xn, _M])),
        (ev = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: r } = n,
              i = r[t];
            if (i && !TM[i.eventTypeId]) return i;
          }
          return null;
        }),
        (IM = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: r } = n.config;
          return !!ev(e, r);
        }),
        (qe = ({ store: e, event: t, element: n, eventStateKey: r }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            l = ev(e, u);
          return (
            l &&
              Zt({
                store: e,
                eventId: u,
                eventTarget: n,
                eventStateKey: u + Fg + r.split(Fg)[1],
                actionListId: (0, Hg.default)(l, "action.config.actionListId"),
              }),
            Zt({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            Cn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            i
          );
        }),
        (Ye = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
        (Rn = { handler: Ye(rt, qe) }),
        (tv = { ...Rn, types: [Jo, Zg].join(" ") }),
        (ea = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (kg = "mouseover mouseout"),
        (ta = { types: ea }),
        (TM = { PAGE_START: $g, PAGE_FINISH: Qg }),
        (On = (() => {
          let e = window.pageXOffset !== void 0,
            n =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : n.scrollLeft,
            scrollTop: e ? window.pageYOffset : n.scrollTop,
            stiffScrollTop: (0, zg.default)(
              e ? window.pageYOffset : n.scrollTop,
              0,
              n.scrollHeight - window.innerHeight
            ),
            scrollWidth: n.scrollWidth,
            scrollHeight: n.scrollHeight,
            clientWidth: n.clientWidth,
            clientHeight: n.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (bM = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (wM = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: r, relatedTarget: i } = t,
            o = e.contains(r);
          if (n === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(n === "mouseout" && o && s);
        }),
        (AM = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: r, clientHeight: i } = On(),
            o = n.scrollOffsetValue,
            u = n.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return bM(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: r,
            bottom: i - u,
          });
        }),
        (nv = (e) => (t, n) => {
          let { type: r } = t.nativeEvent,
            i = [Jo, Zg].indexOf(r) !== -1 ? r === Jo : n.isActive,
            o = { ...n, isActive: i };
          return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
        }),
        (Gg = (e) => (t, n) => {
          let r = { elementHovered: wM(t) };
          return (
            ((n ? r.elementHovered !== n.elementHovered : r.elementHovered) &&
              e(t, r)) ||
            r
          );
        }),
        (SM = (e) => (t, n) => {
          let r = { ...n, elementVisible: AM(t) };
          return (
            ((n ? r.elementVisible !== n.elementVisible : r.elementVisible) &&
              e(t, r)) ||
            r
          );
        }),
        (Xg =
          (e) =>
          (t, n = {}) => {
            let { stiffScrollTop: r, scrollHeight: i, innerHeight: o } = On(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: l } = s,
              m = l === "PX",
              v = i - o,
              p = Number((r / v).toFixed(2));
            if (n && n.percentTop === p) return n;
            let y = (m ? u : (o * (u || 0)) / 100) / v,
              T,
              I,
              S = 0;
            n &&
              ((T = p > n.percentTop),
              (I = n.scrollingDown !== T),
              (S = I ? p : n.anchorTop));
            let b = a === Kg ? p >= S + y : p <= S - y,
              R = {
                ...n,
                percentTop: p,
                inBounds: b,
                anchorTop: S,
                scrollingDown: T,
              };
            return (n && b && (I || R.inBounds !== n.inBounds) && e(t, R)) || R;
          }),
        (OM = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (xM = (e) => (t, n) => {
          let r = { finished: document.readyState === "complete" };
          return r.finished && !(n && n.finshed) && e(t), r;
        }),
        (RM = (e) => (t, n) => {
          let r = { started: !0 };
          return n || e(t), r;
        }),
        (Vg =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let r = { clickCount: (n.clickCount % 2) + 1 };
            return (r.clickCount !== n.clickCount && e(t, r)) || r;
          }),
        (Fr = (e = !0) => ({
          ...tv,
          handler: Ye(
            e ? rt : xn,
            nv((t, n) => (n.isActive ? Rn.handler(t, n) : n))
          ),
        })),
        (qr = (e = !0) => ({
          ...tv,
          handler: Ye(
            e ? rt : xn,
            nv((t, n) => (n.isActive ? n : Rn.handler(t, n)))
          ),
        })),
        (Ug = {
          ...ta,
          handler: SM((e, t) => {
            let { elementVisible: n } = t,
              { event: r, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[r.action.config.autoStopEventId] && t.triggered
              ? t
              : (r.eventTypeId === Yg) === n
              ? (qe(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Wg = 0.05),
        (rv = {
          [sM]: Fr(),
          [uM]: qr(),
          [aM]: Fr(),
          [oM]: qr(),
          [dM]: Fr(!1),
          [fM]: qr(!1),
          [cM]: Fr(),
          [lM]: qr(),
          [EM]: { types: "ecommerce-cart-open", handler: Ye(rt, qe) },
          [yM]: { types: "ecommerce-cart-close", handler: Ye(rt, qe) },
          [JD]: {
            types: "click",
            handler: Ye(
              rt,
              Vg((e, { clickCount: t }) => {
                IM(e) ? t === 1 && qe(e) : qe(e);
              })
            ),
          },
          [eM]: {
            types: "click",
            handler: Ye(
              rt,
              Vg((e, { clickCount: t }) => {
                t === 2 && qe(e);
              })
            ),
          },
          [tM]: { ...Rn, types: "mousedown" },
          [nM]: { ...Rn, types: "mouseup" },
          [rM]: {
            types: kg,
            handler: Ye(
              rt,
              Gg((e, t) => {
                t.elementHovered && qe(e);
              })
            ),
          },
          [iM]: {
            types: kg,
            handler: Ye(
              rt,
              Gg((e, t) => {
                t.elementHovered || qe(e);
              })
            ),
          },
          [pM]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: r,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: l,
                  restingState: m = 0,
                } = n,
                {
                  clientX: v = o.clientX,
                  clientY: p = o.clientY,
                  pageX: y = o.pageX,
                  pageY: T = o.pageY,
                } = r,
                I = a === "X_AXIS",
                S = r.type === "mouseout",
                b = m / 100,
                R = u,
                O = !1;
              switch (s) {
                case Je.VIEWPORT: {
                  b = I
                    ? Math.min(v, window.innerWidth) / window.innerWidth
                    : Math.min(p, window.innerHeight) / window.innerHeight;
                  break;
                }
                case Je.PAGE: {
                  let {
                    scrollLeft: L,
                    scrollTop: D,
                    scrollWidth: C,
                    scrollHeight: W,
                  } = On();
                  b = I ? Math.min(L + y, C) / C : Math.min(D + T, W) / W;
                  break;
                }
                case Je.ELEMENT:
                default: {
                  R = qg(i, u);
                  let L = r.type.indexOf("mouse") === 0;
                  if (L && rt({ element: t, nativeEvent: r }) !== !0) break;
                  let D = t.getBoundingClientRect(),
                    { left: C, top: W, width: H, height: z } = D;
                  if (!L && !OM({ left: v, top: p }, D)) break;
                  (O = !0), (b = I ? (v - C) / H : (p - W) / z);
                  break;
                }
              }
              return (
                S && (b > 1 - Wg || b < Wg) && (b = Math.round(b)),
                (s !== Je.ELEMENT || O || O !== o.elementHovered) &&
                  ((b = l ? 1 - b : b), e.dispatch(Qt(R, b))),
                {
                  elementHovered: O,
                  clientX: v,
                  clientY: p,
                  pageX: y,
                  pageY: T,
                }
              );
            },
          },
          [mM]: {
            types: ea,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: r } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = On(),
                a = i / (o - s);
              (a = r ? 1 - a : a), e.dispatch(Qt(n, a));
            },
          },
          [vM]: {
            types: ea,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: r },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: l,
                } = On(),
                {
                  basedOn: m,
                  selectedAxis: v,
                  continuousParameterGroupId: p,
                  startsEntering: y,
                  startsExiting: T,
                  addEndOffset: I,
                  addStartOffset: S,
                  addOffsetValue: b = 0,
                  endOffsetValue: R = 0,
                } = n,
                O = v === "X_AXIS";
              if (m === Je.VIEWPORT) {
                let L = O ? o / a : s / u;
                return (
                  L !== i.scrollPercent && t.dispatch(Qt(p, L)),
                  { scrollPercent: L }
                );
              } else {
                let L = qg(r, p),
                  D = e.getBoundingClientRect(),
                  C = (S ? b : 0) / 100,
                  W = (I ? R : 0) / 100;
                (C = y ? C : 1 - C), (W = T ? W : 1 - W);
                let H = D.top + Math.min(D.height * C, l),
                  Q = D.top + D.height * W - H,
                  te = Math.min(l + Q, u),
                  A = Math.min(Math.max(0, l - H), te) / te;
                return (
                  A !== i.scrollPercent && t.dispatch(Qt(L, A)),
                  { scrollPercent: A }
                );
              }
            },
          },
          [Yg]: Ug,
          [hM]: Ug,
          [Kg]: {
            ...ta,
            handler: Xg((e, t) => {
              t.scrollingDown && qe(e);
            }),
          },
          [gM]: {
            ...ta,
            handler: Xg((e, t) => {
              t.scrollingDown || qe(e);
            }),
          },
          [Qg]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ye(xn, xM(qe)),
          },
          [$g]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ye(xn, RM(qe)),
          },
        });
    });
  var Iv = {};
  De(Iv, {
    observeRequests: () => YM,
    startActionGroup: () => Cn,
    startEngine: () => Wr,
    stopActionGroup: () => Zt,
    stopAllActionGroups: () => Ev,
    stopEngine: () => Br,
  });
  function YM(e) {
    At({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: ZM }),
      At({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: JM }),
      At({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: eF }),
      At({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: tF });
  }
  function QM(e) {
    At({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Br(e),
          hv({ store: e, elementApi: Pe }),
          Wr({ store: e, allowEvents: !0 }),
          gv();
      },
    });
  }
  function $M(e, t) {
    let n = At({
      store: e,
      select: ({ ixSession: r }) => r.tick,
      onChange: (r) => {
        t(r), n();
      },
    });
  }
  function ZM({ rawData: e, defer: t }, n) {
    let r = () => {
      Wr({ store: n, rawData: e, allowEvents: !0 }), gv();
    };
    t ? setTimeout(r, 0) : r();
  }
  function gv() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function JM(e, t) {
    let {
        actionTypeId: n,
        actionListId: r,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: l = !0,
      } = e,
      { rawData: m } = e;
    if (r && i && m && a) {
      let v = m.actionLists[r];
      v && (m = kM({ actionList: v, actionItemId: i, rawData: m }));
    }
    if (
      (Wr({ store: t, rawData: m, allowEvents: s, testManual: u }),
      (r && n === Ce.GENERAL_START_ACTION) || ra(n))
    ) {
      Zt({ store: t, actionListId: r }),
        yv({ store: t, actionListId: r, eventId: o });
      let v = Cn({
        store: t,
        eventId: o,
        actionListId: r,
        immediate: a,
        verbose: l,
      });
      l && v && t.dispatch($t({ actionListId: r, isPlaying: !a }));
    }
  }
  function eF({ actionListId: e }, t) {
    e ? Zt({ store: t, actionListId: e }) : Ev({ store: t }), Br(t);
  }
  function tF(e, t) {
    Br(t), hv({ store: t, elementApi: Pe });
  }
  function Wr({ store: e, rawData: t, allowEvents: n, testManual: r }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(Do(t)),
      i.active ||
        (e.dispatch(
          Mo({
            hasBoundaryNodes: !!document.querySelector(Gr),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        n &&
          (sF(e), nF(), e.getState().ixSession.hasDefinedMediaQueries && QM(e)),
        e.dispatch(Fo()),
        rF(e, r));
  }
  function nF() {
    let { documentElement: e } = document;
    e.className.indexOf(ov) === -1 && (e.className += ` ${ov}`);
  }
  function rF(e, t) {
    let n = (r) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(Or(r, o)), t ? $M(e, n) : requestAnimationFrame(n));
    };
    n(window.performance.now());
  }
  function Br(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: n } = t;
      n.forEach(iF), UM(), e.dispatch(qo());
    }
  }
  function iF({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function oF({
    store: e,
    eventStateKey: t,
    eventTarget: n,
    eventId: r,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: l, ixSession: m } = e.getState(),
      { events: v } = l,
      p = v[r],
      { eventTypeId: y } = p,
      T = {},
      I = {},
      S = [],
      { continuousActionGroups: b } = s,
      { id: R } = s;
    GM(y, i) && (R = XM(t, R));
    let O = m.hasBoundaryNodes && n ? Sn(n, Gr) : null;
    b.forEach((L) => {
      let { keyframe: D, actionItems: C } = L;
      C.forEach((W) => {
        let { actionTypeId: H } = W,
          { target: z } = W.config;
        if (!z) return;
        let Q = z.boundaryMode ? O : null,
          te = WM(z) + ia + H;
        if (((I[te] = aF(I[te], D, W)), !T[te])) {
          T[te] = !0;
          let { config: q } = W;
          Xr({
            config: q,
            event: p,
            eventTarget: n,
            elementRoot: Q,
            elementApi: Pe,
          }).forEach((A) => {
            S.push({ element: A, key: te });
          });
        }
      });
    }),
      S.forEach(({ element: L, key: D }) => {
        let C = I[D],
          W = (0, ct.default)(C, "[0].actionItems[0]", {}),
          { actionTypeId: H } = W,
          Q = (
            H === Ce.PLUGIN_RIVE
              ? (W.config?.target?.selectorGuids || []).length === 0
              : Ur(H)
          )
            ? aa(H)(L, W)
            : null,
          te = oa({ element: L, actionItem: W, elementApi: Pe }, Q);
        sa({
          store: e,
          element: L,
          eventId: r,
          actionListId: o,
          actionItem: W,
          destination: te,
          continuous: !0,
          parameterId: R,
          actionGroups: C,
          smoothing: a,
          restingValue: u,
          pluginInstance: Q,
        });
      });
  }
  function aF(e = [], t, n) {
    let r = [...e],
      i;
    return (
      r.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = r.length), r.push({ keyframe: t, actionItems: [] })),
      r[i].actionItems.push(n),
      r
    );
  }
  function sF(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: n } = t;
    vv(e),
      (0, Jt.default)(n, (i, o) => {
        let s = rv[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        pF({ logic: s, store: e, events: i });
      });
    let { ixSession: r } = e.getState();
    r.eventListeners.length && cF(e);
  }
  function cF(e) {
    let t = () => {
      vv(e);
    };
    uF.forEach((n) => {
      window.addEventListener(n, t), e.dispatch(Sr(window, [n, t]));
    }),
      t();
  }
  function vv(e) {
    let { ixSession: t, ixData: n } = e.getState(),
      r = window.innerWidth;
    if (r !== t.viewportWidth) {
      let { mediaQueries: i } = n;
      e.dispatch(Uo({ width: r, mediaQueries: i }));
    }
  }
  function pF({ logic: e, store: t, events: n }) {
    hF(n);
    let { types: r, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = lF(n, dF);
    if (!(0, uv.default)(a)) return;
    (0, Jt.default)(a, (v, p) => {
      let y = n[p],
        { action: T, id: I, mediaQueries: S = o.mediaQueryKeys } = y,
        { actionListId: b } = T.config;
      BM(S, o.mediaQueryKeys) || t.dispatch(Wo()),
        T.actionTypeId === Ce.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(y.config) ? y.config : [y.config]).forEach((O) => {
            let { continuousParameterGroupId: L } = O,
              D = (0, ct.default)(s, `${b}.continuousParameterGroups`, []),
              C = (0, sv.default)(D, ({ id: z }) => z === L),
              W = (O.smoothing || 0) / 100,
              H = (O.restingState || 0) / 100;
            C &&
              v.forEach((z, Q) => {
                let te = I + ia + Q;
                oF({
                  store: t,
                  eventStateKey: te,
                  eventTarget: z,
                  eventId: I,
                  eventConfig: O,
                  actionListId: b,
                  parameterGroup: C,
                  smoothing: W,
                  restingValue: H,
                });
              });
          }),
        (T.actionTypeId === Ce.GENERAL_START_ACTION || ra(T.actionTypeId)) &&
          yv({ store: t, actionListId: b, eventId: I });
    });
    let u = (v) => {
        let { ixSession: p } = t.getState();
        fF(a, (y, T, I) => {
          let S = n[T],
            b = p.eventState[I],
            { action: R, mediaQueries: O = o.mediaQueryKeys } = S;
          if (!Vr(O, p.mediaQueryKey)) return;
          let L = (D = {}) => {
            let C = i(
              {
                store: t,
                element: y,
                event: S,
                eventConfig: D,
                nativeEvent: v,
                eventStateKey: I,
              },
              b
            );
            HM(C, b) || t.dispatch(ko(I, C));
          };
          R.actionTypeId === Ce.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(S.config) ? S.config : [S.config]).forEach(L)
            : L();
        });
      },
      l = (0, dv.default)(u, KM),
      m = ({ target: v = document, types: p, throttle: y }) => {
        p.split(" ")
          .filter(Boolean)
          .forEach((T) => {
            let I = y ? l : u;
            v.addEventListener(T, I), t.dispatch(Sr(v, [T, I]));
          });
      };
    Array.isArray(r) ? r.forEach(m) : typeof r == "string" && m(e);
  }
  function hF(e) {
    if (!jM) return;
    let t = {},
      n = "";
    for (let r in e) {
      let { eventTypeId: i, target: o } = e[r],
        s = Ho(o);
      t[s] ||
        ((i === je.MOUSE_CLICK || i === je.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (n += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (n) {
      let r = document.createElement("style");
      (r.textContent = n), document.body.appendChild(r);
    }
  }
  function yv({ store: e, actionListId: t, eventId: n }) {
    let { ixData: r, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = r,
      a = s[n],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let l = (0, ct.default)(u, "actionItemGroups[0].actionItems", []),
        m = (0, ct.default)(a, "mediaQueries", r.mediaQueryKeys);
      if (!Vr(m, i.mediaQueryKey)) return;
      l.forEach((v) => {
        let { config: p, actionTypeId: y } = v,
          T =
            p?.target?.useEventTarget === !0 && p?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : p,
          I = Xr({ config: T, event: a, elementApi: Pe }),
          S = Ur(y);
        I.forEach((b) => {
          let R = S ? aa(y)(b, v) : null;
          sa({
            destination: oa({ element: b, actionItem: v, elementApi: Pe }, R),
            immediate: !0,
            store: e,
            element: b,
            eventId: n,
            actionItem: v,
            actionListId: t,
            pluginInstance: R,
          });
        });
      });
    }
  }
  function Ev({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, Jt.default)(t, (n) => {
      if (!n.continuous) {
        let { actionListId: r, verbose: i } = n;
        ua(n, e), i && e.dispatch($t({ actionListId: r, isPlaying: !1 }));
      }
    });
  }
  function Zt({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && n ? Sn(n, Gr) : null;
    (0, Jt.default)(o, (u) => {
      let l = (0, ct.default)(u, "actionItem.config.target.boundaryMode"),
        m = r ? u.eventStateKey === r : !0;
      if (u.actionListId === i && u.eventId === t && m) {
        if (a && l && !zo(a, u.element)) return;
        ua(u, e),
          u.verbose && e.dispatch($t({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function Cn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: l } = e.getState(),
      { events: m } = u,
      v = m[t] || {},
      { mediaQueries: p = u.mediaQueryKeys } = v,
      y = (0, ct.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: T, useFirstGroupAsInitialState: I } = y;
    if (!T || !T.length) return !1;
    o >= T.length && (0, ct.default)(v, "config.loop") && (o = 0),
      o === 0 && I && o++;
    let b =
        (o === 0 || (o === 1 && I)) && ra(v.action?.actionTypeId)
          ? v.config.delay
          : void 0,
      R = (0, ct.default)(T, [o, "actionItems"], []);
    if (!R.length || !Vr(p, l.mediaQueryKey)) return !1;
    let O = l.hasBoundaryNodes && n ? Sn(n, Gr) : null,
      L = MM(R),
      D = !1;
    return (
      R.forEach((C, W) => {
        let { config: H, actionTypeId: z } = C,
          Q = Ur(z),
          { target: te } = H;
        if (!te) return;
        let q = te.boundaryMode ? O : null;
        Xr({
          config: H,
          event: v,
          eventTarget: n,
          elementRoot: q,
          elementApi: Pe,
        }).forEach((M, j) => {
          let B = Q ? aa(z)(M, C) : null,
            ne = Q ? zM(z)(M, C) : null;
          D = !0;
          let re = L === W && j === 0,
            le = FM({ element: M, actionItem: C }),
            Ie = oa({ element: M, actionItem: C, elementApi: Pe }, B);
          sa({
            store: e,
            element: M,
            actionItem: C,
            eventId: t,
            eventTarget: n,
            eventStateKey: r,
            actionListId: i,
            groupIndex: o,
            isCarrier: re,
            computedStyle: le,
            destination: Ie,
            immediate: s,
            verbose: a,
            pluginInstance: B,
            pluginDuration: ne,
            instanceDelay: b,
          });
        });
      }),
      D
    );
  }
  function sa(e) {
    let { store: t, computedStyle: n, ...r } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: l,
        eventId: m,
      } = r,
      v = !u,
      p = NM(),
      { ixElements: y, ixSession: T, ixData: I } = t.getState(),
      S = PM(y, i),
      { refState: b } = y[S] || {},
      R = jo(i),
      O = T.reducedMotion && _i[o.actionTypeId],
      L;
    if (O && u)
      switch (I.events[m]?.eventTypeId) {
        case je.MOUSE_MOVE:
        case je.MOUSE_MOVE_IN_VIEWPORT:
          L = l;
          break;
        default:
          L = 0.5;
          break;
      }
    let D = qM(i, b, n, o, Pe, a);
    if (
      (t.dispatch(
        Go({
          instanceId: p,
          elementId: S,
          origin: D,
          refType: R,
          skipMotion: O,
          skipToValue: L,
          ...r,
        })
      ),
      mv(document.body, "ix2-animation-started", p),
      s)
    ) {
      gF(t, p);
      return;
    }
    At({ store: t, select: ({ ixInstances: C }) => C[p], onChange: _v }),
      v && t.dispatch(xr(p, T.tick));
  }
  function ua(e, t) {
    mv(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: n, actionItem: r } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[n] || {};
    s === pv && VM(o, r, Pe), t.dispatch(Xo(e.id));
  }
  function mv(e, t, n) {
    let r = document.createEvent("CustomEvent");
    r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
  }
  function gF(e, t) {
    let { ixParameters: n } = e.getState();
    e.dispatch(xr(t, 0)), e.dispatch(Or(performance.now(), n));
    let { ixInstances: r } = e.getState();
    _v(r[t], e);
  }
  function _v(e, t) {
    let {
        active: n,
        continuous: r,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: l,
        groupIndex: m,
        eventId: v,
        eventTarget: p,
        eventStateKey: y,
        actionListId: T,
        isCarrier: I,
        styleProp: S,
        verbose: b,
        pluginInstance: R,
      } = e,
      { ixData: O, ixSession: L } = t.getState(),
      { events: D } = O,
      C = D && D[v] ? D[v] : {},
      { mediaQueries: W = O.mediaQueryKeys } = C;
    if (Vr(W, L.mediaQueryKey) && (r || n || i)) {
      if (l || (u === LM && i)) {
        t.dispatch(Vo(o, a, l, s));
        let { ixElements: H } = t.getState(),
          { ref: z, refType: Q, refState: te } = H[o] || {},
          q = te && te[a];
        (Q === pv || Ur(a)) && DM(z, te, q, v, s, S, Pe, u, R);
      }
      if (i) {
        if (I) {
          let H = Cn({
            store: t,
            eventId: v,
            eventTarget: p,
            eventStateKey: y,
            actionListId: T,
            groupIndex: m + 1,
            verbose: b,
          });
          b && !H && t.dispatch($t({ actionListId: T, isPlaying: !1 }));
        }
        ua(e, t);
      }
    }
  }
  var sv,
    ct,
    uv,
    cv,
    lv,
    fv,
    Jt,
    dv,
    kr,
    CM,
    ra,
    ia,
    Gr,
    pv,
    LM,
    ov,
    Xr,
    PM,
    oa,
    At,
    NM,
    DM,
    hv,
    MM,
    FM,
    qM,
    kM,
    GM,
    XM,
    Vr,
    VM,
    UM,
    WM,
    BM,
    HM,
    Ur,
    aa,
    zM,
    av,
    jM,
    KM,
    uF,
    lF,
    fF,
    dF,
    na = ye(() => {
      "use strict";
      (sv = de(Yi())),
        (ct = de(sr())),
        (uv = de(Dp())),
        (cv = de(ah())),
        (lv = de(uh())),
        (fv = de(lh())),
        (Jt = de(vh())),
        (dv = de(bh()));
      Me();
      kr = de(wt());
      Rr();
      Rh();
      iv();
      (CM = Object.keys(Gn)),
        (ra = (e) => CM.includes(e)),
        ({
          COLON_DELIMITER: ia,
          BOUNDARY_SELECTOR: Gr,
          HTML_ELEMENT: pv,
          RENDER_GENERAL: LM,
          W_MOD_IX: ov,
        } = Se),
        ({
          getAffectedElements: Xr,
          getElementId: PM,
          getDestinationValues: oa,
          observeStore: At,
          getInstanceId: NM,
          renderHTMLElement: DM,
          clearAllStyles: hv,
          getMaxDurationItemIndex: MM,
          getComputedStyle: FM,
          getInstanceOrigin: qM,
          reduceListToGroup: kM,
          shouldNamespaceEventParameter: GM,
          getNamespacedParameterId: XM,
          shouldAllowMediaQuery: Vr,
          cleanupHTMLElement: VM,
          clearObjectCache: UM,
          stringifyTarget: WM,
          mediaQueriesEqual: BM,
          shallowEqual: HM,
        } = kr.IX2VanillaUtils),
        ({
          isPluginType: Ur,
          createPluginInstance: aa,
          getPluginDuration: zM,
        } = kr.IX2VanillaPlugins),
        (av = navigator.userAgent),
        (jM = av.match(/iPad/i) || av.match(/iPhone/)),
        (KM = 12);
      uF = ["resize", "orientationchange"];
      (lF = (e, t) => (0, cv.default)((0, fv.default)(e, t), lv.default)),
        (fF = (e, t) => {
          (0, Jt.default)(e, (n, r) => {
            n.forEach((i, o) => {
              let s = r + ia + o;
              t(i, r, s);
            });
          });
        }),
        (dF = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Xr({ config: t, elementApi: Pe });
        });
    });
  var wv = f((la) => {
    "use strict";
    Object.defineProperty(la, "__esModule", { value: !0 });
    function vF(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    vF(la, {
      actions: function () {
        return mF;
      },
      destroy: function () {
        return bv;
      },
      init: function () {
        return bF;
      },
      setEnv: function () {
        return TF;
      },
      store: function () {
        return Hr;
      },
    });
    var yF = yi(),
      EF = _F((gp(), Qe(hp))),
      ca = (na(), Qe(Iv)),
      mF = IF((Rr(), Qe(Ah)));
    function _F(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Tv(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (Tv = function (r) {
        return r ? n : t;
      })(e);
    }
    function IF(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = Tv(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var Hr = (0, yF.createStore)(EF.default);
    function TF(e) {
      e() && (0, ca.observeRequests)(Hr);
    }
    function bF(e) {
      bv(), (0, ca.startEngine)({ store: Hr, rawData: e, allowEvents: !0 });
    }
    function bv() {
      (0, ca.stopEngine)(Hr);
    }
  });
  var xv = f((CG, Ov) => {
    "use strict";
    var Av = Xe(),
      Sv = wv();
    Sv.setEnv(Av.env);
    Av.define(
      "ix2",
      (Ov.exports = function () {
        return Sv;
      })
    );
  });
  var Cv = f((LG, Rv) => {
    "use strict";
    var en = Xe();
    en.define(
      "links",
      (Rv.exports = function (e, t) {
        var n = {},
          r = e(window),
          i,
          o = en.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          l = /index\.(html|php)$/,
          m = /\/$/,
          v,
          p;
        n.ready = n.design = n.preview = y;
        function y() {
          (i = o && en.env("design")),
            (p = en.env("slug") || s.pathname || ""),
            en.scroll.off(I),
            (v = []);
          for (var b = document.links, R = 0; R < b.length; ++R) T(b[R]);
          v.length && (en.scroll.on(I), I());
        }
        function T(b) {
          if (!b.getAttribute("hreflang")) {
            var R =
              (i && b.getAttribute("href-disabled")) || b.getAttribute("href");
            if (((a.href = R), !(R.indexOf(":") >= 0))) {
              var O = e(b);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var L = e(a.hash);
                L.length && v.push({ link: O, sec: L, active: !1 });
                return;
              }
              if (!(R === "#" || R === "")) {
                var D =
                  a.href === s.href || R === p || (l.test(R) && m.test(p));
                S(O, u, D);
              }
            }
          }
        }
        function I() {
          var b = r.scrollTop(),
            R = r.height();
          t.each(v, function (O) {
            if (!O.link.attr("hreflang")) {
              var L = O.link,
                D = O.sec,
                C = D.offset().top,
                W = D.outerHeight(),
                H = R * 0.5,
                z = D.is(":visible") && C + W - H >= b && C + H <= b + R;
              O.active !== z && ((O.active = z), S(L, u, z));
            }
          });
        }
        function S(b, R, O) {
          var L = b.hasClass(R);
          (O && L) || (!O && !L) || (O ? b.addClass(R) : b.removeClass(R));
        }
        return n;
      })
    );
  });
  var Pv = f((PG, Lv) => {
    "use strict";
    var zr = Xe();
    zr.define(
      "scroll",
      (Lv.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          n = window.location,
          r = T() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (q) {
              window.setTimeout(q, 15);
            },
          u = zr.env("editor") ? ".w-editor-body" : "body",
          l =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          m = 'a[href="#"]',
          v = 'a[href*="#"]:not(.w-tab-link):not(' + m + ")",
          p = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          y = document.createElement("style");
        y.appendChild(document.createTextNode(p));
        function T() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var I = /^#[a-zA-Z0-9][\w:.-]*$/;
        function S(q) {
          return I.test(q.hash) && q.host + q.pathname === n.host + n.pathname;
        }
        let b =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function R() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            b.matches
          );
        }
        function O(q, A) {
          var M;
          switch (A) {
            case "add":
              (M = q.attr("tabindex")),
                M
                  ? q.attr("data-wf-tabindex-swap", M)
                  : q.attr("tabindex", "-1");
              break;
            case "remove":
              (M = q.attr("data-wf-tabindex-swap")),
                M
                  ? (q.attr("tabindex", M),
                    q.removeAttr("data-wf-tabindex-swap"))
                  : q.removeAttr("tabindex");
              break;
          }
          q.toggleClass("wf-force-outline-none", A === "add");
        }
        function L(q) {
          var A = q.currentTarget;
          if (
            !(
              zr.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(A.className))
            )
          ) {
            var M = S(A) ? A.hash : "";
            if (M !== "") {
              var j = e(M);
              j.length &&
                (q && (q.preventDefault(), q.stopPropagation()),
                D(M, q),
                window.setTimeout(
                  function () {
                    C(j, function () {
                      O(j, "add"),
                        j.get(0).focus({ preventScroll: !0 }),
                        O(j, "remove");
                    });
                  },
                  q ? 0 : 300
                ));
            }
          }
        }
        function D(q) {
          if (
            n.hash !== q &&
            r &&
            r.pushState &&
            !(zr.env.chrome && n.protocol === "file:")
          ) {
            var A = r.state && r.state.hash;
            A !== q && r.pushState({ hash: q }, "", q);
          }
        }
        function C(q, A) {
          var M = i.scrollTop(),
            j = W(q);
          if (M !== j) {
            var B = H(q, M, j),
              ne = Date.now(),
              re = function () {
                var le = Date.now() - ne;
                window.scroll(0, z(M, j, le, B)),
                  le <= B ? a(re) : typeof A == "function" && A();
              };
            a(re);
          }
        }
        function W(q) {
          var A = e(l),
            M = A.css("position") === "fixed" ? A.outerHeight() : 0,
            j = q.offset().top - M;
          if (q.data("scroll") === "mid") {
            var B = i.height() - M,
              ne = q.outerHeight();
            ne < B && (j -= Math.round((B - ne) / 2));
          }
          return j;
        }
        function H(q, A, M) {
          if (R()) return 0;
          var j = 1;
          return (
            s.add(q).each(function (B, ne) {
              var re = parseFloat(ne.getAttribute("data-scroll-time"));
              !isNaN(re) && re >= 0 && (j = re);
            }),
            (472.143 * Math.log(Math.abs(A - M) + 125) - 2e3) * j
          );
        }
        function z(q, A, M, j) {
          return M > j ? A : q + (A - q) * Q(M / j);
        }
        function Q(q) {
          return q < 0.5
            ? 4 * q * q * q
            : (q - 1) * (2 * q - 2) * (2 * q - 2) + 1;
        }
        function te() {
          var { WF_CLICK_EMPTY: q, WF_CLICK_SCROLL: A } = t;
          o.on(A, v, L),
            o.on(q, m, function (M) {
              M.preventDefault();
            }),
            document.head.insertBefore(y, document.head.firstChild);
        }
        return { ready: te };
      })
    );
  });
  var Dv = f((NG, Nv) => {
    "use strict";
    var wF = Xe();
    wF.define(
      "touch",
      (Nv.exports = function (e) {
        var t = {},
          n = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new r(o) : null
            );
          });
        function r(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            l,
            m;
          o.addEventListener("touchstart", v, !1),
            o.addEventListener("touchmove", p, !1),
            o.addEventListener("touchend", y, !1),
            o.addEventListener("touchcancel", T, !1),
            o.addEventListener("mousedown", v, !1),
            o.addEventListener("mousemove", p, !1),
            o.addEventListener("mouseup", y, !1),
            o.addEventListener("mouseout", T, !1);
          function v(S) {
            var b = S.touches;
            (b && b.length > 1) ||
              ((s = !0),
              b ? ((a = !0), (l = b[0].clientX)) : (l = S.clientX),
              (m = l));
          }
          function p(S) {
            if (s) {
              if (a && S.type === "mousemove") {
                S.preventDefault(), S.stopPropagation();
                return;
              }
              var b = S.touches,
                R = b ? b[0].clientX : S.clientX,
                O = R - m;
              (m = R),
                Math.abs(O) > u &&
                  n &&
                  String(n()) === "" &&
                  (i("swipe", S, { direction: O > 0 ? "right" : "left" }), T());
            }
          }
          function y(S) {
            if (s && ((s = !1), a && S.type === "mouseup")) {
              S.preventDefault(), S.stopPropagation(), (a = !1);
              return;
            }
          }
          function T() {
            s = !1;
          }
          function I() {
            o.removeEventListener("touchstart", v, !1),
              o.removeEventListener("touchmove", p, !1),
              o.removeEventListener("touchend", y, !1),
              o.removeEventListener("touchcancel", T, !1),
              o.removeEventListener("mousedown", v, !1),
              o.removeEventListener("mousemove", p, !1),
              o.removeEventListener("mouseup", y, !1),
              o.removeEventListener("mouseout", T, !1),
              (o = null);
          }
          this.destroy = I;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var Mv = f((fa) => {
    "use strict";
    Object.defineProperty(fa, "__esModule", { value: !0 });
    Object.defineProperty(fa, "default", {
      enumerable: !0,
      get: function () {
        return AF;
      },
    });
    function AF(e, t, n, r, i, o, s, a, u, l, m, v, p) {
      return function (y) {
        e(y);
        var T = y.form,
          I = {
            name: T.attr("data-name") || T.attr("name") || "Untitled Form",
            pageId: T.attr("data-wf-page-id") || "",
            elementId: T.attr("data-wf-element-id") || "",
            source: t.href,
            test: n.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              T.html()
            ),
            trackingCookies: r(),
          };
        let S = T.attr("data-wf-flow");
        S && (I.wfFlow = S), i(y);
        var b = o(T, I.fields);
        if (b) return s(b);
        if (((I.fileUploads = a(T)), u(y), !l)) {
          m(y);
          return;
        }
        v.ajax({
          url: p,
          type: "POST",
          data: I,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (R) {
            R && R.code === 200 && (y.success = !0), m(y);
          })
          .fail(function () {
            m(y);
          });
      };
    }
  });
  var qv = f((MG, Fv) => {
    "use strict";
    var jr = Xe(),
      SF = (e, t, n, r) => {
        let i = document.createElement("div");
        t.appendChild(i),
          turnstile.render(i, {
            sitekey: e,
            callback: function (o) {
              n(o);
            },
            "error-callback": function () {
              r();
            },
          });
      };
    jr.define(
      "forms",
      (Fv.exports = function (e, t) {
        let n = "TURNSTILE_LOADED";
        var r = {},
          i = e(document),
          o,
          s = window.location,
          a = window.XDomainRequest && !window.atob,
          u = ".w-form",
          l,
          m = /e(-)?mail/i,
          v = /^\S+@\S+$/,
          p = window.alert,
          y = jr.env(),
          T,
          I,
          S;
        let b = i.find("[data-turnstile-sitekey]").data("turnstile-sitekey"),
          R;
        var O = /list-manage[1-9]?.com/i,
          L = t.debounce(function () {
            p(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              C(), D(), !y && !T && H();
            };
        function D() {
          (l = e("html").attr("data-wf-site")),
            (I = "https://webflow.com/api/v1/form/" + l),
            a &&
              I.indexOf("https://webflow.com") >= 0 &&
              (I = I.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (S = `${I}/signFile`),
            (o = e(u + " form")),
            o.length && o.each(W);
        }
        function C() {
          b &&
            ((R = document.createElement("script")),
            (R.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"),
            document.head.appendChild(R),
            (R.onload = () => {
              i.trigger(n);
            }));
        }
        function W(h, g) {
          var X = e(g),
            G = e.data(g, u);
          G || (G = e.data(g, u, { form: X })), z(G);
          var Z = X.closest("div.w-form");
          (G.done = Z.find("> .w-form-done")),
            (G.fail = Z.find("> .w-form-fail")),
            (G.fileUploads = Z.find(".w-file-upload")),
            G.fileUploads.each(function (K) {
              Ie(K, G);
            }),
            b &&
              ((G.wait = !1),
              Q(G),
              i.on(typeof turnstile < "u" ? "ready" : n, function () {
                SF(
                  b,
                  g,
                  (K) => {
                    (G.turnstileToken = K), z(G);
                  },
                  () => {
                    Q(G);
                  }
                );
              }));
          var oe =
            G.form.attr("aria-label") || G.form.attr("data-name") || "Form";
          G.done.attr("aria-label") || G.form.attr("aria-label", oe),
            G.done.attr("tabindex", "-1"),
            G.done.attr("role", "region"),
            G.done.attr("aria-label") ||
              G.done.attr("aria-label", oe + " success"),
            G.fail.attr("tabindex", "-1"),
            G.fail.attr("role", "region"),
            G.fail.attr("aria-label") ||
              G.fail.attr("aria-label", oe + " failure");
          var se = (G.action = X.attr("action"));
          if (
            ((G.handler = null),
            (G.redirect = X.attr("data-redirect")),
            O.test(se))
          ) {
            G.handler = ne;
            return;
          }
          if (!se) {
            if (l) {
              G.handler = (() => {
                let K = Mv().default;
                return K(z, s, jr, M, le, te, p, q, Q, l, re, e, I);
              })();
              return;
            }
            L();
          }
        }
        function H() {
          (T = !0),
            i.on("submit", u + " form", function (K) {
              var d = e.data(this, u);
              d.handler && ((d.evt = K), d.handler(d));
            });
          let h = ".w-checkbox-input",
            g = ".w-radio-input",
            X = "w--redirected-checked",
            G = "w--redirected-focus",
            Z = "w--redirected-focus-visible",
            oe = ":focus-visible, [data-wf-focus-visible]",
            se = [
              ["checkbox", h],
              ["radio", g],
            ];
          i.on(
            "change",
            u + ' form input[type="checkbox"]:not(' + h + ")",
            (K) => {
              e(K.target).siblings(h).toggleClass(X);
            }
          ),
            i.on("change", u + ' form input[type="radio"]', (K) => {
              e(`input[name="${K.target.name}"]:not(${h})`).map((F, Y) =>
                e(Y).siblings(g).removeClass(X)
              );
              let d = e(K.target);
              d.hasClass("w-radio-input") || d.siblings(g).addClass(X);
            }),
            se.forEach(([K, d]) => {
              i.on(
                "focus",
                u + ` form input[type="${K}"]:not(` + d + ")",
                (F) => {
                  e(F.target).siblings(d).addClass(G),
                    e(F.target).filter(oe).siblings(d).addClass(Z);
                }
              ),
                i.on(
                  "blur",
                  u + ` form input[type="${K}"]:not(` + d + ")",
                  (F) => {
                    e(F.target).siblings(d).removeClass(`${G} ${Z}`);
                  }
                );
            });
        }
        function z(h) {
          var g = (h.btn = h.form.find(':input[type="submit"]'));
          (h.wait = h.btn.attr("data-wait") || null),
            (h.success = !1),
            g.prop("disabled", !!(b && !h.turnstileToken)),
            h.label && g.val(h.label);
        }
        function Q(h) {
          var g = h.btn,
            X = h.wait;
          g.prop("disabled", !0), X && ((h.label = g.val()), g.val(X));
        }
        function te(h, g) {
          var X = null;
          return (
            (g = g || {}),
            h
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (G, Z) {
                var oe = e(Z),
                  se = oe.attr("type"),
                  K =
                    oe.attr("data-name") ||
                    oe.attr("name") ||
                    "Field " + (G + 1);
                K = encodeURIComponent(K);
                var d = oe.val();
                if (se === "checkbox") d = oe.is(":checked");
                else if (se === "radio") {
                  if (g[K] === null || typeof g[K] == "string") return;
                  d =
                    h
                      .find('input[name="' + oe.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof d == "string" && (d = e.trim(d)),
                  (g[K] = d),
                  (X = X || j(oe, se, K, d));
              }),
            X
          );
        }
        function q(h) {
          var g = {};
          return (
            h.find(':input[type="file"]').each(function (X, G) {
              var Z = e(G),
                oe = Z.attr("data-name") || Z.attr("name") || "File " + (X + 1),
                se = Z.attr("data-value");
              typeof se == "string" && (se = e.trim(se)), (g[oe] = se);
            }),
            g
          );
        }
        let A = { _mkto_trk: "marketo" };
        function M() {
          return document.cookie.split("; ").reduce(function (g, X) {
            let G = X.split("="),
              Z = G[0];
            if (Z in A) {
              let oe = A[Z],
                se = G.slice(1).join("=");
              g[oe] = se;
            }
            return g;
          }, {});
        }
        function j(h, g, X, G) {
          var Z = null;
          return (
            g === "password"
              ? (Z = "Passwords cannot be submitted.")
              : h.attr("required")
              ? G
                ? m.test(h.attr("type")) &&
                  (v.test(G) ||
                    (Z = "Please enter a valid email address for: " + X))
                : (Z = "Please fill out the required field: " + X)
              : X === "g-recaptcha-response" &&
                !G &&
                (Z = "Please confirm you\u2019re not a robot."),
            Z
          );
        }
        function B(h) {
          le(h), re(h);
        }
        function ne(h) {
          z(h);
          var g = h.form,
            X = {};
          if (/^https/.test(s.href) && !/^https/.test(h.action)) {
            g.attr("method", "post");
            return;
          }
          le(h);
          var G = te(g, X);
          if (G) return p(G);
          Q(h);
          var Z;
          t.each(X, function (d, F) {
            m.test(F) && (X.EMAIL = d),
              /^((full[ _-]?)?name)$/i.test(F) && (Z = d),
              /^(first[ _-]?name)$/i.test(F) && (X.FNAME = d),
              /^(last[ _-]?name)$/i.test(F) && (X.LNAME = d);
          }),
            Z &&
              !X.FNAME &&
              ((Z = Z.split(" ")),
              (X.FNAME = Z[0]),
              (X.LNAME = X.LNAME || Z[1]));
          var oe = h.action.replace("/post?", "/post-json?") + "&c=?",
            se = oe.indexOf("u=") + 2;
          se = oe.substring(se, oe.indexOf("&", se));
          var K = oe.indexOf("id=") + 3;
          (K = oe.substring(K, oe.indexOf("&", K))),
            (X["b_" + se + "_" + K] = ""),
            e
              .ajax({ url: oe, data: X, dataType: "jsonp" })
              .done(function (d) {
                (h.success = d.result === "success" || /already/.test(d.msg)),
                  h.success || console.info("MailChimp error: " + d.msg),
                  re(h);
              })
              .fail(function () {
                re(h);
              });
        }
        function re(h) {
          var g = h.form,
            X = h.redirect,
            G = h.success;
          if (G && X) {
            jr.location(X);
            return;
          }
          h.done.toggle(G),
            h.fail.toggle(!G),
            G ? h.done.focus() : h.fail.focus(),
            g.toggle(!G),
            z(h);
        }
        function le(h) {
          h.evt && h.evt.preventDefault(), (h.evt = null);
        }
        function Ie(h, g) {
          if (!g.fileUploads || !g.fileUploads[h]) return;
          var X,
            G = e(g.fileUploads[h]),
            Z = G.find("> .w-file-upload-default"),
            oe = G.find("> .w-file-upload-uploading"),
            se = G.find("> .w-file-upload-success"),
            K = G.find("> .w-file-upload-error"),
            d = Z.find(".w-file-upload-input"),
            F = Z.find(".w-file-upload-label"),
            Y = F.children(),
            U = K.find(".w-file-upload-error-msg"),
            pe = se.find(".w-file-upload-file"),
            Oe = se.find(".w-file-remove-link"),
            ke = pe.find(".w-file-upload-file-name"),
            c = U.attr("data-w-size-error"),
            _ = U.attr("data-w-type-error"),
            w = U.attr("data-w-generic-error");
          if (
            (y ||
              F.on("click keydown", function (ee) {
                (ee.type === "keydown" && ee.which !== 13 && ee.which !== 32) ||
                  (ee.preventDefault(), d.click());
              }),
            F.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            Oe.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            y)
          )
            d.on("click", function (ee) {
              ee.preventDefault();
            }),
              F.on("click", function (ee) {
                ee.preventDefault();
              }),
              Y.on("click", function (ee) {
                ee.preventDefault();
              });
          else {
            Oe.on("click keydown", function (ee) {
              if (ee.type === "keydown") {
                if (ee.which !== 13 && ee.which !== 32) return;
                ee.preventDefault();
              }
              d.removeAttr("data-value"),
                d.val(""),
                ke.html(""),
                Z.toggle(!0),
                se.toggle(!1),
                F.focus();
            }),
              d.on("change", function (ee) {
                (X = ee.target && ee.target.files && ee.target.files[0]),
                  X &&
                    (Z.toggle(!1),
                    K.toggle(!1),
                    oe.toggle(!0),
                    oe.focus(),
                    ke.text(X.name),
                    ae() || Q(g),
                    (g.fileUploads[h].uploading = !0),
                    E(X, N));
              });
            var x = F.outerHeight();
            d.height(x), d.width(1);
          }
          function P(ee) {
            var V = ee.responseJSON && ee.responseJSON.msg,
              ue = w;
            typeof V == "string" && V.indexOf("InvalidFileTypeError") === 0
              ? (ue = _)
              : typeof V == "string" &&
                V.indexOf("MaxFileSizeError") === 0 &&
                (ue = c),
              U.text(ue),
              d.removeAttr("data-value"),
              d.val(""),
              oe.toggle(!1),
              Z.toggle(!0),
              K.toggle(!0),
              K.focus(),
              (g.fileUploads[h].uploading = !1),
              ae() || z(g);
          }
          function N(ee, V) {
            if (ee) return P(ee);
            var ue = V.fileName,
              ce = V.postData,
              _e = V.fileId,
              Ge = V.s3Url;
            d.attr("data-value", _e), k(Ge, ce, X, ue, J);
          }
          function J(ee) {
            if (ee) return P(ee);
            oe.toggle(!1),
              se.css("display", "inline-block"),
              se.focus(),
              (g.fileUploads[h].uploading = !1),
              ae() || z(g);
          }
          function ae() {
            var ee = (g.fileUploads && g.fileUploads.toArray()) || [];
            return ee.some(function (V) {
              return V.uploading;
            });
          }
        }
        function E(h, g) {
          var X = new URLSearchParams({ name: h.name, size: h.size });
          e.ajax({ type: "GET", url: `${S}?${X}`, crossDomain: !0 })
            .done(function (G) {
              g(null, G);
            })
            .fail(function (G) {
              g(G);
            });
        }
        function k(h, g, X, G, Z) {
          var oe = new FormData();
          for (var se in g) oe.append(se, g[se]);
          oe.append("file", X, G),
            e
              .ajax({
                type: "POST",
                url: h,
                data: oe,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                Z(null);
              })
              .fail(function (K) {
                Z(K);
              });
        }
        return r;
      })
    );
  });
  var Gv = f((FG, kv) => {
    "use strict";
    var vt = Xe(),
      OF = kn(),
      Ae = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    vt.define(
      "navbar",
      (kv.exports = function (e, t) {
        var n = {},
          r = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          l,
          m,
          v = vt.env(),
          p = '<div class="w-nav-overlay" data-wf-ignore />',
          y = ".w-nav",
          T = "w--open",
          I = "w--nav-dropdown-open",
          S = "w--nav-dropdown-toggle-open",
          b = "w--nav-dropdown-list-open",
          R = "w--nav-link-open",
          O = OF.triggers,
          L = e();
        (n.ready = n.design = n.preview = D),
          (n.destroy = function () {
            (L = e()), C(), u && u.length && u.each(Q);
          });
        function D() {
          (l = v && vt.env("design")),
            (m = vt.env("editor")),
            (a = e(document.body)),
            (u = o.find(y)),
            u.length && (u.each(z), C(), W());
        }
        function C() {
          vt.resize.off(H);
        }
        function W() {
          vt.resize.on(H);
        }
        function H() {
          u.each(h);
        }
        function z(d, F) {
          var Y = e(F),
            U = e.data(F, y);
          U ||
            (U = e.data(F, y, {
              open: !1,
              el: Y,
              config: {},
              selectedIdx: -1,
            })),
            (U.menu = Y.find(".w-nav-menu")),
            (U.links = U.menu.find(".w-nav-link")),
            (U.dropdowns = U.menu.find(".w-dropdown")),
            (U.dropdownToggle = U.menu.find(".w-dropdown-toggle")),
            (U.dropdownList = U.menu.find(".w-dropdown-list")),
            (U.button = Y.find(".w-nav-button")),
            (U.container = Y.find(".w-container")),
            (U.overlayContainerId = "w-nav-overlay-" + d),
            (U.outside = E(U));
          var pe = Y.find(".w-nav-brand");
          pe &&
            pe.attr("href") === "/" &&
            pe.attr("aria-label") == null &&
            pe.attr("aria-label", "home"),
            U.button.attr("style", "-webkit-user-select: text;"),
            U.button.attr("aria-label") == null &&
              U.button.attr("aria-label", "menu"),
            U.button.attr("role", "button"),
            U.button.attr("tabindex", "0"),
            U.button.attr("aria-controls", U.overlayContainerId),
            U.button.attr("aria-haspopup", "menu"),
            U.button.attr("aria-expanded", "false"),
            U.el.off(y),
            U.button.off(y),
            U.menu.off(y),
            A(U),
            l
              ? (te(U), U.el.on("setting" + y, M(U)))
              : (q(U),
                U.button.on("click" + y, le(U)),
                U.menu.on("click" + y, "a", Ie(U)),
                U.button.on("keydown" + y, j(U)),
                U.el.on("keydown" + y, B(U))),
            h(d, F);
        }
        function Q(d, F) {
          var Y = e.data(F, y);
          Y && (te(Y), e.removeData(F, y));
        }
        function te(d) {
          d.overlay && (K(d, !0), d.overlay.remove(), (d.overlay = null));
        }
        function q(d) {
          d.overlay ||
            ((d.overlay = e(p).appendTo(d.el)),
            d.overlay.attr("id", d.overlayContainerId),
            (d.parent = d.menu.parent()),
            K(d, !0));
        }
        function A(d) {
          var F = {},
            Y = d.config || {},
            U = (F.animation = d.el.attr("data-animation") || "default");
          (F.animOver = /^over/.test(U)),
            (F.animDirect = /left$/.test(U) ? -1 : 1),
            Y.animation !== U && d.open && t.defer(re, d),
            (F.easing = d.el.attr("data-easing") || "ease"),
            (F.easing2 = d.el.attr("data-easing2") || "ease");
          var pe = d.el.attr("data-duration");
          (F.duration = pe != null ? Number(pe) : 400),
            (F.docHeight = d.el.attr("data-doc-height")),
            (d.config = F);
        }
        function M(d) {
          return function (F, Y) {
            Y = Y || {};
            var U = i.width();
            A(d),
              Y.open === !0 && oe(d, !0),
              Y.open === !1 && K(d, !0),
              d.open &&
                t.defer(function () {
                  U !== i.width() && re(d);
                });
          };
        }
        function j(d) {
          return function (F) {
            switch (F.keyCode) {
              case Ae.SPACE:
              case Ae.ENTER:
                return le(d)(), F.preventDefault(), F.stopPropagation();
              case Ae.ESCAPE:
                return K(d), F.preventDefault(), F.stopPropagation();
              case Ae.ARROW_RIGHT:
              case Ae.ARROW_DOWN:
              case Ae.HOME:
              case Ae.END:
                return d.open
                  ? (F.keyCode === Ae.END
                      ? (d.selectedIdx = d.links.length - 1)
                      : (d.selectedIdx = 0),
                    ne(d),
                    F.preventDefault(),
                    F.stopPropagation())
                  : (F.preventDefault(), F.stopPropagation());
            }
          };
        }
        function B(d) {
          return function (F) {
            if (d.open)
              switch (
                ((d.selectedIdx = d.links.index(document.activeElement)),
                F.keyCode)
              ) {
                case Ae.HOME:
                case Ae.END:
                  return (
                    F.keyCode === Ae.END
                      ? (d.selectedIdx = d.links.length - 1)
                      : (d.selectedIdx = 0),
                    ne(d),
                    F.preventDefault(),
                    F.stopPropagation()
                  );
                case Ae.ESCAPE:
                  return (
                    K(d),
                    d.button.focus(),
                    F.preventDefault(),
                    F.stopPropagation()
                  );
                case Ae.ARROW_LEFT:
                case Ae.ARROW_UP:
                  return (
                    (d.selectedIdx = Math.max(-1, d.selectedIdx - 1)),
                    ne(d),
                    F.preventDefault(),
                    F.stopPropagation()
                  );
                case Ae.ARROW_RIGHT:
                case Ae.ARROW_DOWN:
                  return (
                    (d.selectedIdx = Math.min(
                      d.links.length - 1,
                      d.selectedIdx + 1
                    )),
                    ne(d),
                    F.preventDefault(),
                    F.stopPropagation()
                  );
              }
          };
        }
        function ne(d) {
          if (d.links[d.selectedIdx]) {
            var F = d.links[d.selectedIdx];
            F.focus(), Ie(F);
          }
        }
        function re(d) {
          d.open && (K(d, !0), oe(d, !0));
        }
        function le(d) {
          return s(function () {
            d.open ? K(d) : oe(d);
          });
        }
        function Ie(d) {
          return function (F) {
            var Y = e(this),
              U = Y.attr("href");
            if (!vt.validClick(F.currentTarget)) {
              F.preventDefault();
              return;
            }
            U && U.indexOf("#") === 0 && d.open && K(d);
          };
        }
        function E(d) {
          return (
            d.outside && o.off("click" + y, d.outside),
            function (F) {
              var Y = e(F.target);
              (m && Y.closest(".w-editor-bem-EditorOverlay").length) || k(d, Y);
            }
          );
        }
        var k = s(function (d, F) {
          if (d.open) {
            var Y = F.closest(".w-nav-menu");
            d.menu.is(Y) || K(d);
          }
        });
        function h(d, F) {
          var Y = e.data(F, y),
            U = (Y.collapsed = Y.button.css("display") !== "none");
          if ((Y.open && !U && !l && K(Y, !0), Y.container.length)) {
            var pe = X(Y);
            Y.links.each(pe), Y.dropdowns.each(pe);
          }
          Y.open && se(Y);
        }
        var g = "max-width";
        function X(d) {
          var F = d.container.css(g);
          return (
            F === "none" && (F = ""),
            function (Y, U) {
              (U = e(U)), U.css(g, ""), U.css(g) === "none" && U.css(g, F);
            }
          );
        }
        function G(d, F) {
          F.setAttribute("data-nav-menu-open", "");
        }
        function Z(d, F) {
          F.removeAttribute("data-nav-menu-open");
        }
        function oe(d, F) {
          if (d.open) return;
          (d.open = !0),
            d.menu.each(G),
            d.links.addClass(R),
            d.dropdowns.addClass(I),
            d.dropdownToggle.addClass(S),
            d.dropdownList.addClass(b),
            d.button.addClass(T);
          var Y = d.config,
            U = Y.animation;
          (U === "none" || !r.support.transform || Y.duration <= 0) && (F = !0);
          var pe = se(d),
            Oe = d.menu.outerHeight(!0),
            ke = d.menu.outerWidth(!0),
            c = d.el.height(),
            _ = d.el[0];
          if (
            (h(0, _),
            O.intro(0, _),
            vt.redraw.up(),
            l || o.on("click" + y, d.outside),
            F)
          ) {
            P();
            return;
          }
          var w = "transform " + Y.duration + "ms " + Y.easing;
          if (
            (d.overlay &&
              ((L = d.menu.prev()), d.overlay.show().append(d.menu)),
            Y.animOver)
          ) {
            r(d.menu)
              .add(w)
              .set({ x: Y.animDirect * ke, height: pe })
              .start({ x: 0 })
              .then(P),
              d.overlay && d.overlay.width(ke);
            return;
          }
          var x = c + Oe;
          r(d.menu).add(w).set({ y: -x }).start({ y: 0 }).then(P);
          function P() {
            d.button.attr("aria-expanded", "true");
          }
        }
        function se(d) {
          var F = d.config,
            Y = F.docHeight ? o.height() : a.height();
          return (
            F.animOver
              ? d.menu.height(Y)
              : d.el.css("position") !== "fixed" && (Y -= d.el.outerHeight(!0)),
            d.overlay && d.overlay.height(Y),
            Y
          );
        }
        function K(d, F) {
          if (!d.open) return;
          (d.open = !1), d.button.removeClass(T);
          var Y = d.config;
          if (
            ((Y.animation === "none" ||
              !r.support.transform ||
              Y.duration <= 0) &&
              (F = !0),
            O.outro(0, d.el[0]),
            o.off("click" + y, d.outside),
            F)
          ) {
            r(d.menu).stop(), _();
            return;
          }
          var U = "transform " + Y.duration + "ms " + Y.easing2,
            pe = d.menu.outerHeight(!0),
            Oe = d.menu.outerWidth(!0),
            ke = d.el.height();
          if (Y.animOver) {
            r(d.menu)
              .add(U)
              .start({ x: Oe * Y.animDirect })
              .then(_);
            return;
          }
          var c = ke + pe;
          r(d.menu).add(U).start({ y: -c }).then(_);
          function _() {
            d.menu.height(""),
              r(d.menu).set({ x: 0, y: 0 }),
              d.menu.each(Z),
              d.links.removeClass(R),
              d.dropdowns.removeClass(I),
              d.dropdownToggle.removeClass(S),
              d.dropdownList.removeClass(b),
              d.overlay &&
                d.overlay.children().length &&
                (L.length ? d.menu.insertAfter(L) : d.menu.prependTo(d.parent),
                d.overlay.attr("style", "").hide()),
              d.el.triggerHandler("w-close"),
              d.button.attr("aria-expanded", "false");
          }
        }
        return n;
      })
    );
  });
  var Uv = f((qG, Vv) => {
    "use strict";
    var yt = Xe(),
      xF = kn(),
      it = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      Xv =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    yt.define(
      "slider",
      (Vv.exports = function (e, t) {
        var n = {},
          r = e.tram,
          i = e(document),
          o,
          s,
          a = yt.env(),
          u = ".w-slider",
          l = '<div class="w-slider-dot" data-wf-ignore />',
          m =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          v = "w-slider-force-show",
          p = xF.triggers,
          y,
          T = !1;
        (n.ready = function () {
          (s = yt.env("design")), I();
        }),
          (n.design = function () {
            (s = !0), setTimeout(I, 1e3);
          }),
          (n.preview = function () {
            (s = !1), I();
          }),
          (n.redraw = function () {
            (T = !0), I(), (T = !1);
          }),
          (n.destroy = S);
        function I() {
          (o = i.find(u)), o.length && (o.each(O), !y && (S(), b()));
        }
        function S() {
          yt.resize.off(R), yt.redraw.off(n.redraw);
        }
        function b() {
          yt.resize.on(R), yt.redraw.on(n.redraw);
        }
        function R() {
          o.filter(":visible").each(B);
        }
        function O(E, k) {
          var h = e(k),
            g = e.data(k, u);
          g ||
            (g = e.data(k, u, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: h,
              config: {},
            })),
            (g.mask = h.children(".w-slider-mask")),
            (g.left = h.children(".w-slider-arrow-left")),
            (g.right = h.children(".w-slider-arrow-right")),
            (g.nav = h.children(".w-slider-nav")),
            (g.slides = g.mask.children(".w-slide")),
            g.slides.each(p.reset),
            T && (g.maskWidth = 0),
            h.attr("role") === void 0 && h.attr("role", "region"),
            h.attr("aria-label") === void 0 && h.attr("aria-label", "carousel");
          var X = g.mask.attr("id");
          if (
            (X || ((X = "w-slider-mask-" + E), g.mask.attr("id", X)),
            !s && !g.ariaLiveLabel && (g.ariaLiveLabel = e(m).appendTo(g.mask)),
            g.left.attr("role", "button"),
            g.left.attr("tabindex", "0"),
            g.left.attr("aria-controls", X),
            g.left.attr("aria-label") === void 0 &&
              g.left.attr("aria-label", "previous slide"),
            g.right.attr("role", "button"),
            g.right.attr("tabindex", "0"),
            g.right.attr("aria-controls", X),
            g.right.attr("aria-label") === void 0 &&
              g.right.attr("aria-label", "next slide"),
            !r.support.transform)
          ) {
            g.left.hide(), g.right.hide(), g.nav.hide(), (y = !0);
            return;
          }
          g.el.off(u),
            g.left.off(u),
            g.right.off(u),
            g.nav.off(u),
            L(g),
            s
              ? (g.el.on("setting" + u, A(g)), q(g), (g.hasTimer = !1))
              : (g.el.on("swipe" + u, A(g)),
                g.left.on("click" + u, H(g)),
                g.right.on("click" + u, z(g)),
                g.left.on("keydown" + u, W(g, H)),
                g.right.on("keydown" + u, W(g, z)),
                g.nav.on("keydown" + u, "> div", A(g)),
                g.config.autoplay &&
                  !g.hasTimer &&
                  ((g.hasTimer = !0), (g.timerCount = 1), te(g)),
                g.el.on("mouseenter" + u, C(g, !0, "mouse")),
                g.el.on("focusin" + u, C(g, !0, "keyboard")),
                g.el.on("mouseleave" + u, C(g, !1, "mouse")),
                g.el.on("focusout" + u, C(g, !1, "keyboard"))),
            g.nav.on("click" + u, "> div", A(g)),
            a ||
              g.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var G = h.filter(":hidden");
          G.addClass(v);
          var Z = h.parents(":hidden");
          Z.addClass(v), T || B(E, k), G.removeClass(v), Z.removeClass(v);
        }
        function L(E) {
          var k = {};
          (k.crossOver = 0),
            (k.animation = E.el.attr("data-animation") || "slide"),
            k.animation === "outin" &&
              ((k.animation = "cross"), (k.crossOver = 0.5)),
            (k.easing = E.el.attr("data-easing") || "ease");
          var h = E.el.attr("data-duration");
          if (
            ((k.duration = h != null ? parseInt(h, 10) : 500),
            D(E.el.attr("data-infinite")) && (k.infinite = !0),
            D(E.el.attr("data-disable-swipe")) && (k.disableSwipe = !0),
            D(E.el.attr("data-hide-arrows"))
              ? (k.hideArrows = !0)
              : E.config.hideArrows && (E.left.show(), E.right.show()),
            D(E.el.attr("data-autoplay")))
          ) {
            (k.autoplay = !0),
              (k.delay = parseInt(E.el.attr("data-delay"), 10) || 2e3),
              (k.timerMax = parseInt(E.el.attr("data-autoplay-limit"), 10));
            var g = "mousedown" + u + " touchstart" + u;
            s ||
              E.el.off(g).one(g, function () {
                q(E);
              });
          }
          var X = E.right.width();
          (k.edge = X ? X + 40 : 100), (E.config = k);
        }
        function D(E) {
          return E === "1" || E === "true";
        }
        function C(E, k, h) {
          return function (g) {
            if (k) E.hasFocus[h] = k;
            else if (
              e.contains(E.el.get(0), g.relatedTarget) ||
              ((E.hasFocus[h] = k),
              (E.hasFocus.mouse && h === "keyboard") ||
                (E.hasFocus.keyboard && h === "mouse"))
            )
              return;
            k
              ? (E.ariaLiveLabel.attr("aria-live", "polite"),
                E.hasTimer && q(E))
              : (E.ariaLiveLabel.attr("aria-live", "off"), E.hasTimer && te(E));
          };
        }
        function W(E, k) {
          return function (h) {
            switch (h.keyCode) {
              case it.SPACE:
              case it.ENTER:
                return k(E)(), h.preventDefault(), h.stopPropagation();
            }
          };
        }
        function H(E) {
          return function () {
            j(E, { index: E.index - 1, vector: -1 });
          };
        }
        function z(E) {
          return function () {
            j(E, { index: E.index + 1, vector: 1 });
          };
        }
        function Q(E, k) {
          var h = null;
          k === E.slides.length && (I(), ne(E)),
            t.each(E.anchors, function (g, X) {
              e(g.els).each(function (G, Z) {
                e(Z).index() === k && (h = X);
              });
            }),
            h != null && j(E, { index: h, immediate: !0 });
        }
        function te(E) {
          q(E);
          var k = E.config,
            h = k.timerMax;
          (h && E.timerCount++ > h) ||
            (E.timerId = window.setTimeout(function () {
              E.timerId == null || s || (z(E)(), te(E));
            }, k.delay));
        }
        function q(E) {
          window.clearTimeout(E.timerId), (E.timerId = null);
        }
        function A(E) {
          return function (k, h) {
            h = h || {};
            var g = E.config;
            if (s && k.type === "setting") {
              if (h.select === "prev") return H(E)();
              if (h.select === "next") return z(E)();
              if ((L(E), ne(E), h.select == null)) return;
              Q(E, h.select);
              return;
            }
            if (k.type === "swipe")
              return g.disableSwipe || yt.env("editor")
                ? void 0
                : h.direction === "left"
                ? z(E)()
                : h.direction === "right"
                ? H(E)()
                : void 0;
            if (E.nav.has(k.target).length) {
              var X = e(k.target).index();
              if (
                (k.type === "click" && j(E, { index: X }), k.type === "keydown")
              )
                switch (k.keyCode) {
                  case it.ENTER:
                  case it.SPACE: {
                    j(E, { index: X }), k.preventDefault();
                    break;
                  }
                  case it.ARROW_LEFT:
                  case it.ARROW_UP: {
                    M(E.nav, Math.max(X - 1, 0)), k.preventDefault();
                    break;
                  }
                  case it.ARROW_RIGHT:
                  case it.ARROW_DOWN: {
                    M(E.nav, Math.min(X + 1, E.pages)), k.preventDefault();
                    break;
                  }
                  case it.HOME: {
                    M(E.nav, 0), k.preventDefault();
                    break;
                  }
                  case it.END: {
                    M(E.nav, E.pages), k.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function M(E, k) {
          var h = E.children().eq(k).focus();
          E.children().not(h);
        }
        function j(E, k) {
          k = k || {};
          var h = E.config,
            g = E.anchors;
          E.previous = E.index;
          var X = k.index,
            G = {};
          X < 0
            ? ((X = g.length - 1),
              h.infinite &&
                ((G.x = -E.endX), (G.from = 0), (G.to = g[0].width)))
            : X >= g.length &&
              ((X = 0),
              h.infinite &&
                ((G.x = g[g.length - 1].width),
                (G.from = -g[g.length - 1].x),
                (G.to = G.from - G.x))),
            (E.index = X);
          var Z = E.nav
            .children()
            .eq(X)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          E.nav
            .children()
            .not(Z)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            h.hideArrows &&
              (E.index === g.length - 1 ? E.right.hide() : E.right.show(),
              E.index === 0 ? E.left.hide() : E.left.show());
          var oe = E.offsetX || 0,
            se = (E.offsetX = -g[E.index].x),
            K = { x: se, opacity: 1, visibility: "" },
            d = e(g[E.index].els),
            F = e(g[E.previous] && g[E.previous].els),
            Y = E.slides.not(d),
            U = h.animation,
            pe = h.easing,
            Oe = Math.round(h.duration),
            ke = k.vector || (E.index > E.previous ? 1 : -1),
            c = "opacity " + Oe + "ms " + pe,
            _ = "transform " + Oe + "ms " + pe;
          if (
            (d.find(Xv).removeAttr("tabindex"),
            d.removeAttr("aria-hidden"),
            d.find("*").removeAttr("aria-hidden"),
            Y.find(Xv).attr("tabindex", "-1"),
            Y.attr("aria-hidden", "true"),
            Y.find("*").attr("aria-hidden", "true"),
            s || (d.each(p.intro), Y.each(p.outro)),
            k.immediate && !T)
          ) {
            r(d).set(K), P();
            return;
          }
          if (E.index === E.previous) return;
          if (
            (s || E.ariaLiveLabel.text(`Slide ${X + 1} of ${g.length}.`),
            U === "cross")
          ) {
            var w = Math.round(Oe - Oe * h.crossOver),
              x = Math.round(Oe - w);
            (c = "opacity " + w + "ms " + pe),
              r(F).set({ visibility: "" }).add(c).start({ opacity: 0 }),
              r(d)
                .set({ visibility: "", x: se, opacity: 0, zIndex: E.depth++ })
                .add(c)
                .wait(x)
                .then({ opacity: 1 })
                .then(P);
            return;
          }
          if (U === "fade") {
            r(F).set({ visibility: "" }).stop(),
              r(d)
                .set({ visibility: "", x: se, opacity: 0, zIndex: E.depth++ })
                .add(c)
                .start({ opacity: 1 })
                .then(P);
            return;
          }
          if (U === "over") {
            (K = { x: E.endX }),
              r(F).set({ visibility: "" }).stop(),
              r(d)
                .set({
                  visibility: "",
                  zIndex: E.depth++,
                  x: se + g[E.index].width * ke,
                })
                .add(_)
                .start({ x: se })
                .then(P);
            return;
          }
          h.infinite && G.x
            ? (r(E.slides.not(F))
                .set({ visibility: "", x: G.x })
                .add(_)
                .start({ x: se }),
              r(F).set({ visibility: "", x: G.from }).add(_).start({ x: G.to }),
              (E.shifted = F))
            : (h.infinite &&
                E.shifted &&
                (r(E.shifted).set({ visibility: "", x: oe }),
                (E.shifted = null)),
              r(E.slides).set({ visibility: "" }).add(_).start({ x: se }));
          function P() {
            (d = e(g[E.index].els)),
              (Y = E.slides.not(d)),
              U !== "slide" && (K.visibility = "hidden"),
              r(Y).set(K);
          }
        }
        function B(E, k) {
          var h = e.data(k, u);
          if (h) {
            if (le(h)) return ne(h);
            s && Ie(h) && ne(h);
          }
        }
        function ne(E) {
          var k = 1,
            h = 0,
            g = 0,
            X = 0,
            G = E.maskWidth,
            Z = G - E.config.edge;
          Z < 0 && (Z = 0),
            (E.anchors = [{ els: [], x: 0, width: 0 }]),
            E.slides.each(function (se, K) {
              g - h > Z &&
                (k++,
                (h += G),
                (E.anchors[k - 1] = { els: [], x: g, width: 0 })),
                (X = e(K).outerWidth(!0)),
                (g += X),
                (E.anchors[k - 1].width += X),
                E.anchors[k - 1].els.push(K);
              var d = se + 1 + " of " + E.slides.length;
              e(K).attr("aria-label", d), e(K).attr("role", "group");
            }),
            (E.endX = g),
            s && (E.pages = null),
            E.nav.length && E.pages !== k && ((E.pages = k), re(E));
          var oe = E.index;
          oe >= k && (oe = k - 1), j(E, { immediate: !0, index: oe });
        }
        function re(E) {
          var k = [],
            h,
            g = E.el.attr("data-nav-spacing");
          g && (g = parseFloat(g) + "px");
          for (var X = 0, G = E.pages; X < G; X++)
            (h = e(l)),
              h
                .attr("aria-label", "Show slide " + (X + 1) + " of " + G)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              E.nav.hasClass("w-num") && h.text(X + 1),
              g != null && h.css({ "margin-left": g, "margin-right": g }),
              k.push(h);
          E.nav.empty().append(k);
        }
        function le(E) {
          var k = E.mask.width();
          return E.maskWidth !== k ? ((E.maskWidth = k), !0) : !1;
        }
        function Ie(E) {
          var k = 0;
          return (
            E.slides.each(function (h, g) {
              k += e(g).outerWidth(!0);
            }),
            E.slidesWidth !== k ? ((E.slidesWidth = k), !0) : !1
          );
        }
        return n;
      })
    );
  });
  pa();
  ha();
  Oa();
  Ra();
  La();
  Da();
  kn();
  xv();
  Cv();
  Pv();
  Dv();
  qv();
  Gv();
  Uv();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "67041c2a6a806901e0c7ed22|cf27677c-e3d0-62bd-4d63-f46756324b46",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|cf27677c-e3d0-62bd-4d63-f46756324b46",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-p",
          smoothing: 50,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728505432395,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728506750693,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|0b3b7d24-f975-d9ef-d93e-6f41868a416a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|0b3b7d24-f975-d9ef-d93e-6f41868a416a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728516139605,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|b2d90520-e10a-4f72-0cf3-af4a01a8b8ba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|b2d90520-e10a-4f72-0cf3-af4a01a8b8ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728517480035,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-12",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".locations_item",
        originalId: "855e7db5-8687-facb-58bc-c9c9e1e84ed6",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".locations_item",
          originalId: "855e7db5-8687-facb-58bc-c9c9e1e84ed6",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728517696049,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".faqs_item",
        originalId: "ab1a3d19-977b-898b-3bc1-40074489c468",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".faqs_item",
          originalId: "ab1a3d19-977b-898b-3bc1-40074489c468",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728517953483,
    },
    "e-14": {
      id: "e-14",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-13",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".faqs_item",
        originalId: "ab1a3d19-977b-898b-3bc1-40074489c468",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".faqs_item",
          originalId: "ab1a3d19-977b-898b-3bc1-40074489c468",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728517953484,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|4654afeb-bf30-8433-b76d-671c51894643",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|4654afeb-bf30-8433-b76d-671c51894643",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728518185758,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "4500f34f-ad71-c737-340f-a39b6520a857",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "4500f34f-ad71-c737-340f-a39b6520a857",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 15,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728518331558,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "4500f34f-ad71-c737-340f-a39b6520a855",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "4500f34f-ad71-c737-340f-a39b6520a855",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728518344081,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-12", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|cf27677c-e3d0-62bd-4d63-f46756324b46",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|cf27677c-e3d0-62bd-4d63-f46756324b46",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-12-p",
          smoothing: 50,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728520701311,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-13", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".player_item",
        originalId: "20bd0fcf-0ffa-fb32-1801-11b2da2948a3",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".player_item",
          originalId: "20bd0fcf-0ffa-fb32-1801-11b2da2948a3",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-13-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: true,
          addOffsetValue: 15,
          startsExiting: true,
          addEndOffset: false,
          endOffsetValue: 20,
        },
      ],
      createdOn: 1728593293131,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|ecf134b5-aa9e-9740-f390-8f3f07464eb0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|ecf134b5-aa9e-9740-f390-8f3f07464eb0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728594312993,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-15", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|03ed8e6b-3b81-745a-78d6-9b0187a7ce30",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|03ed8e6b-3b81-745a-78d6-9b0187a7ce30",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-15-p",
          smoothing: 80,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728594863029,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|f0443543-7ba6-cbc7-74ed-da3d58ab7911",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|f0443543-7ba6-cbc7-74ed-da3d58ab7911",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728595023456,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|c4c61132-10a5-f5b8-f9a0-5ff4e441da56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|c4c61132-10a5-f5b8-f9a0-5ff4e441da56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728595111495,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-27",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|7df0f447-f4c0-5e53-7f1e-55491f278c40",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|7df0f447-f4c0-5e53-7f1e-55491f278c40",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728595223366,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|2ad11c2f-e27d-3c08-ad75-c1f693737f7a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|2ad11c2f-e27d-3c08-ad75-c1f693737f7a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728595444700,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67057e51c8a92868107e6416|77dfe5a9-bc5b-9fc5-7a87-e2dc3413984c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67057e51c8a92868107e6416|77dfe5a9-bc5b-9fc5-7a87-e2dc3413984c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728595507086,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|dac3a0ad-1bc4-f50d-4480-37c180ea2f7d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|dac3a0ad-1bc4-f50d-4480-37c180ea2f7d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 50,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728596483186,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-113",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|dac3a0ad-1bc4-f50d-4480-37c180ea2f7d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|dac3a0ad-1bc4-f50d-4480-37c180ea2f7d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728597177790,
    },
    "e-36": {
      id: "e-36",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-37",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|a41fac32-d451-d387-ddeb-f99c2df28067",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|a41fac32-d451-d387-ddeb-f99c2df28067",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728597264820,
    },
    "e-38": {
      id: "e-38",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-39",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|2868c035-7512-59ff-d96d-180201f9bdc9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|2868c035-7512-59ff-d96d-180201f9bdc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728597570524,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|edacf3db-d746-a07d-9d0a-ba32c805a8af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|edacf3db-d746-a07d-9d0a-ba32c805a8af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1728597733175,
    },
    "e-41": {
      id: "e-41",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav_link",
        originalId: "5edb4eb9-d636-2d84-0fda-7fc3e9497815",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav_link",
          originalId: "5edb4eb9-d636-2d84-0fda-7fc3e9497815",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728598007060,
    },
    "e-42": {
      id: "e-42",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-41",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav_link",
        originalId: "5edb4eb9-d636-2d84-0fda-7fc3e9497815",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav_link",
          originalId: "5edb4eb9-d636-2d84-0fda-7fc3e9497815",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728598007060,
    },
    "e-43": {
      id: "e-43",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-44",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "17a6340c-761b-7fc0-e914-c76287f98ca8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "17a6340c-761b-7fc0-e914-c76287f98ca8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728598417943,
    },
    "e-44": {
      id: "e-44",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-43",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "17a6340c-761b-7fc0-e914-c76287f98ca8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "17a6340c-761b-7fc0-e914-c76287f98ca8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728598417943,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button.is-link",
        originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button.is-link",
          originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728599408307,
    },
    "e-46": {
      id: "e-46",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-45",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button.is-link",
        originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button.is-link",
          originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1728599408308,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-48",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".footer_link",
        originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".footer_link",
          originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728599548217,
    },
    "e-48": {
      id: "e-48",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-47",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".footer_link",
        originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".footer_link",
          originalId: "6c8afb6f-bcf6-b9d9-52c0-fda26c3ed4dc",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728599548241,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-50",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".social-link",
        originalId: "d0e80abc-0b67-11d7-2a38-8a77c9d01ecf",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".social-link",
          originalId: "d0e80abc-0b67-11d7-2a38-8a77c9d01ecf",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728642641075,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-49",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".social-link",
        originalId: "d0e80abc-0b67-11d7-2a38-8a77c9d01ecf",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".social-link",
          originalId: "d0e80abc-0b67-11d7-2a38-8a77c9d01ecf",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728642641075,
    },
    "e-53": {
      id: "e-53",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd529",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd529",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 90,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-23-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 90,
          restingState: 50,
        },
      ],
      createdOn: 1728643200199,
    },
    "e-54": {
      id: "e-54",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-55",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd529",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd529",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728643260797,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-54",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd529",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd529",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728643260797,
    },
    "e-56": {
      id: "e-56",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-57",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|cd271bba-260c-d0ac-a377-96bcddb9d88f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|cd271bba-260c-d0ac-a377-96bcddb9d88f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728643358097,
    },
    "e-58": {
      id: "e-58",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-59",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|0020ec38-bce4-0963-4a28-4bb0331c2c9c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|0020ec38-bce4-0963-4a28-4bb0331c2c9c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728644268456,
    },
    "e-60": {
      id: "e-60",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-61",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|ec3f27ba-38d3-5e7c-803d-89b817e226e9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|ec3f27ba-38d3-5e7c-803d-89b817e226e9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728644299781,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-63",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|3d8a5086-b811-6497-ff27-f5612d0369ec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|3d8a5086-b811-6497-ff27-f5612d0369ec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728644366269,
    },
    "e-64": {
      id: "e-64",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-65",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|00e4789c-f5b4-f8f6-d739-25a9b69e21df",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|00e4789c-f5b4-f8f6-d739-25a9b69e21df",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728644429235,
    },
    "e-66": {
      id: "e-66",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-67",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|9df46b77-dac5-2d62-d982-31df081bda45",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|9df46b77-dac5-2d62-d982-31df081bda45",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728644456726,
    },
    "e-68": {
      id: "e-68",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-69",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".exp-slider_arrow",
        originalId:
          "6705807fd8f75b7e3a2d3bdc|06c99d02-5b1b-ab82-23bb-aa92962fad52",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".exp-slider_arrow",
          originalId:
            "6705807fd8f75b7e3a2d3bdc|06c99d02-5b1b-ab82-23bb-aa92962fad52",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728648255406,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".exp-slider_arrow",
        originalId:
          "6705807fd8f75b7e3a2d3bdc|06c99d02-5b1b-ab82-23bb-aa92962fad52",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".exp-slider_arrow",
          originalId:
            "6705807fd8f75b7e3a2d3bdc|06c99d02-5b1b-ab82-23bb-aa92962fad52",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728648255407,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-71",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705a6009c78a7cebe6ff2cb|ab7d90b9-0e1e-c69a-4acb-4f38bdc8b700",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705a6009c78a7cebe6ff2cb|ab7d90b9-0e1e-c69a-4acb-4f38bdc8b700",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728649563292,
    },
    "e-73": {
      id: "e-73",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-72",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705a6009c78a7cebe6ff2cb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705a6009c78a7cebe6ff2cb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728649708005,
    },
    "e-74": {
      id: "e-74",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-75",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|b2d90520-e10a-4f72-0cf3-af4a01a8b8ba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|b2d90520-e10a-4f72-0cf3-af4a01a8b8ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728650607488,
    },
    "e-76": {
      id: "e-76",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-77",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|f34fdec2-7330-0cd6-5ea1-badf54d8c9e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|f34fdec2-7330-0cd6-5ea1-badf54d8c9e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1728650966155,
    },
    "e-78": {
      id: "e-78",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-79",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|f34fdec2-7330-0cd6-5ea1-badf54d8c9e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|f34fdec2-7330-0cd6-5ea1-badf54d8c9e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728650979121,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|0e2ba735-0b1e-eb7d-5169-048742268950",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|0e2ba735-0b1e-eb7d-5169-048742268950",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651055900,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-83",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|0e2ba735-0b1e-eb7d-5169-048742268950",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|0e2ba735-0b1e-eb7d-5169-048742268950",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651062436,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-85",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|39c41625-96bb-d3d0-8826-2fcb008cc178",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|39c41625-96bb-d3d0-8826-2fcb008cc178",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651104723,
    },
    "e-86": {
      id: "e-86",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-87",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67041c2a6a806901e0c7ed22|39c41625-96bb-d3d0-8826-2fcb008cc178",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67041c2a6a806901e0c7ed22|39c41625-96bb-d3d0-8826-2fcb008cc178",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651155923,
    },
    "e-88": {
      id: "e-88",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-89",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|cd271bba-260c-d0ac-a377-96bcddb9d88f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|cd271bba-260c-d0ac-a377-96bcddb9d88f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651220634,
    },
    "e-90": {
      id: "e-90",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-91",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|f0443543-7ba6-cbc7-74ed-da3d58ab7911",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|f0443543-7ba6-cbc7-74ed-da3d58ab7911",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651349444,
    },
    "e-92": {
      id: "e-92",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-93",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705807fd8f75b7e3a2d3bdc|7df0f447-f4c0-5e53-7f1e-55491f278c40",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705807fd8f75b7e3a2d3bdc|7df0f447-f4c0-5e53-7f1e-55491f278c40",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651370812,
    },
    "e-94": {
      id: "e-94",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-95",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67057e51c8a92868107e6416|77dfe5a9-bc5b-9fc5-7a87-e2dc3413984c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67057e51c8a92868107e6416|77dfe5a9-bc5b-9fc5-7a87-e2dc3413984c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651385188,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-97",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|dac3a0ad-1bc4-f50d-4480-37c180ea2f7d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|dac3a0ad-1bc4-f50d-4480-37c180ea2f7d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651432668,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-99",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|a41fac32-d451-d387-ddeb-f99c2df28067",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|a41fac32-d451-d387-ddeb-f99c2df28067",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651446885,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-101",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "670598f47f049d1fde569f7a|2868c035-7512-59ff-d96d-180201f9bdc9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "670598f47f049d1fde569f7a|2868c035-7512-59ff-d96d-180201f9bdc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651455779,
    },
    "e-102": {
      id: "e-102",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-103",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6705a6009c78a7cebe6ff2cb|ab7d90b9-0e1e-c69a-4acb-4f38bdc8b700",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6705a6009c78a7cebe6ff2cb|ab7d90b9-0e1e-c69a-4acb-4f38bdc8b700",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728651477842,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-113",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".footer_social-link",
        originalId:
          "670ad54b73f57e3c96b7a675|a24b44d3-91b8-6a6c-aaf2-27ae9adc25c4",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".footer_social-link",
          originalId:
            "670ad54b73f57e3c96b7a675|a24b44d3-91b8-6a6c-aaf2-27ae9adc25c4",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728495174419,
    },
    "e-113": {
      id: "e-113",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-112",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".footer_social-link",
        originalId:
          "670ad54b73f57e3c96b7a675|a24b44d3-91b8-6a6c-aaf2-27ae9adc25c4",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".footer_social-link",
          originalId:
            "670ad54b73f57e3c96b7a675|a24b44d3-91b8-6a6c-aaf2-27ae9adc25c4",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728495174419,
    },
    "e-114": {
      id: "e-114",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-115",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "17a6340c-761b-7fc0-e914-c76287f98ca6",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728885223294,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-114",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "17a6340c-761b-7fc0-e914-c76287f98ca6",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1728885223295,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "hero-video –> scrolls in",
      continuousParameterGroups: [
        {
          id: "a-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                    xValue: 0.6,
                    yValue: 0.6,
                    locked: true,
                  },
                },
                {
                  id: "a-n-3",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 3.125, unit: "rem" },
                    target: {
                      objectId: "--hero-video-radius",
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                  },
                },
                {
                  id: "a-n-5",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_btn",
                      selectorGuids: ["48b5f15e-f360-0f00-57eb-ace111f7e884"],
                    },
                    xValue: 1.5,
                    yValue: 1.5,
                    locked: true,
                  },
                },
                {
                  id: "a-n-7",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    xValue: 1.5,
                    yValue: 1.5,
                    locked: true,
                  },
                },
                {
                  id: "a-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 16,
              actionItems: [
                {
                  id: "a-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    yValue: 400,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 33.33,
              actionItems: [
                {
                  id: "a-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-n-4",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 0, unit: "rem" },
                    target: {
                      objectId: "--hero-video-radius",
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                  },
                },
                {
                  id: "a-n-6",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_btn",
                      selectorGuids: ["48b5f15e-f360-0f00-57eb-ace111f7e884"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-n-8",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728505435249,
    },
    "a-2": {
      id: "a-2",
      title: "homepage -> loads",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|7392a2d2-e2cf-5cad-069a-b7a3d9846baa",
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-19",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd528",
                },
                xValue: 3,
                yValue: 3,
                locked: true,
              },
            },
            {
              id: "a-2-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd528",
                },
                yValue: 15,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd528",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-21",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|256a64f6-f429-7765-d6fb-826f628ae915",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|256a64f6-f429-7765-d6fb-826f628ae915",
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-23",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|9d3ddad4-712e-c16c-7560-87756315819c",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-24",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|9d3ddad4-712e-c16c-7560-87756315819c",
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-25",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|af0f8885-ee6b-84ff-4a36-f2fd2ec4124f",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-26",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|af0f8885-ee6b-84ff-4a36-f2fd2ec4124f",
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-33",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|499d3b83-ae7b-a8b5-0eaf-abde592d3be3",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-34",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|499d3b83-ae7b-a8b5-0eaf-abde592d3be3",
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-35",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|7d330f68-f229-ae7c-c9da-be61c38d44a3",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-36",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|7d330f68-f229-ae7c-c9da-be61c38d44a3",
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-37",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|49273ef5-6d27-c105-5fc8-92c5b230491d",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-38",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "67041c2a6a806901e0c7ed22|49273ef5-6d27-c105-5fc8-92c5b230491d",
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-20",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd528",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-2-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd528",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-16",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|805de4e7-667f-95f8-2868-3a3b4fbdd528",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-27",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|256a64f6-f429-7765-d6fb-826f628ae915",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-28",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 600,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|256a64f6-f429-7765-d6fb-826f628ae915",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-29",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 700,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|9d3ddad4-712e-c16c-7560-87756315819c",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-30",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 700,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|9d3ddad4-712e-c16c-7560-87756315819c",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-32",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 800,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|af0f8885-ee6b-84ff-4a36-f2fd2ec4124f",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-31",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 800,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|af0f8885-ee6b-84ff-4a36-f2fd2ec4124f",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|7392a2d2-e2cf-5cad-069a-b7a3d9846baa",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-40",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|499d3b83-ae7b-a8b5-0eaf-abde592d3be3",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-39",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|499d3b83-ae7b-a8b5-0eaf-abde592d3be3",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-42",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1100,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|7d330f68-f229-ae7c-c9da-be61c38d44a3",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-41",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1100,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|7d330f68-f229-ae7c-c9da-be61c38d44a3",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-43",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|49273ef5-6d27-c105-5fc8-92c5b230491d",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-44",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "67041c2a6a806901e0c7ed22|49273ef5-6d27-c105-5fc8-92c5b230491d",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728506753749,
    },
    "a-17": {
      id: "a-17",
      title: "hover-line -> hover in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link_line",
                  selectorGuids: ["9cf9eaf6-20c8-12d4-b89c-f09b8d97a9db"],
                },
                xValue: 0,
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "swingTo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link_line",
                  selectorGuids: ["9cf9eaf6-20c8-12d4-b89c-f09b8d97a9db"],
                },
                xValue: 1,
                yValue: null,
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728598009698,
    },
    "a-6": {
      id: "a-6",
      title: "headline -> scrolls in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-1",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "49c75286-500c-32b1-dd65-fd7943cdd2cf",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-1",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "49c75286-500c-32b1-dd65-fd7943cdd2cf",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-2",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e85835c6-584e-056c-31b8-2f99e8d689c0",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-2",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e85835c6-584e-056c-31b8-2f99e8d689c0",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-45",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-3",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "62b0e67e-5461-b1fb-25a2-60c1294f5399",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-37",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-3",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "62b0e67e-5461-b1fb-25a2-60c1294f5399",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-50",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-4",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "d6ef9d9b-7b8b-0654-5624-5101625fba8c",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-51",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-4",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "d6ef9d9b-7b8b-0654-5624-5101625fba8c",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-52",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-5",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e449fd35-9e5f-eefb-6b51-baf2db877263",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-53",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-5",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e449fd35-9e5f-eefb-6b51-baf2db877263",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-54",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-6",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "52a8482f-030e-4e3b-cac4-1c4711750e0d",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-55",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-6",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "52a8482f-030e-4e3b-cac4-1c4711750e0d",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-56",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-7",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "716b3604-0b7a-ef53-80df-85bbbdb4d28c",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-57",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-7",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "716b3604-0b7a-ef53-80df-85bbbdb4d28c",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-58",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-9",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "cc4f24dd-070e-a75b-873f-aa94b2de8ed7",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-59",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-9",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "cc4f24dd-070e-a75b-873f-aa94b2de8ed7",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-60",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-10",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "ad725f09-1016-7b2a-427a-b0b7ac63c649",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-61",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-10",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "ad725f09-1016-7b2a-427a-b0b7ac63c649",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-62",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-11",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "b5bdae95-4906-aa85-9551-53e2e870816e",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-63",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-11",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "b5bdae95-4906-aa85-9551-53e2e870816e",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-64",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-12",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "7eee6a62-fd71-7f7d-3e51-c7547211218b",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-65",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-12",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "7eee6a62-fd71-7f7d-3e51-c7547211218b",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-6-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-1",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "49c75286-500c-32b1-dd65-fd7943cdd2cf",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-1",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "49c75286-500c-32b1-dd65-fd7943cdd2cf",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-2",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e85835c6-584e-056c-31b8-2f99e8d689c0",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-2",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e85835c6-584e-056c-31b8-2f99e8d689c0",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-39",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-3",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "62b0e67e-5461-b1fb-25a2-60c1294f5399",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-40",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-3",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "62b0e67e-5461-b1fb-25a2-60c1294f5399",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-66",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-4",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "d6ef9d9b-7b8b-0654-5624-5101625fba8c",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-67",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-4",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "d6ef9d9b-7b8b-0654-5624-5101625fba8c",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-68",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-5",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e449fd35-9e5f-eefb-6b51-baf2db877263",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-69",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-5",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "e449fd35-9e5f-eefb-6b51-baf2db877263",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-70",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-6",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "52a8482f-030e-4e3b-cac4-1c4711750e0d",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-71",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-6",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "52a8482f-030e-4e3b-cac4-1c4711750e0d",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-72",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-7",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "716b3604-0b7a-ef53-80df-85bbbdb4d28c",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-73",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 600,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-7",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "716b3604-0b7a-ef53-80df-85bbbdb4d28c",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-74",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 700,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-8",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "d1dafe24-8d6d-818d-7546-7f077edf4880",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-75",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 700,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-8",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "d1dafe24-8d6d-818d-7546-7f077edf4880",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-76",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 800,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-9",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "cc4f24dd-070e-a75b-873f-aa94b2de8ed7",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-77",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 800,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-9",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "cc4f24dd-070e-a75b-873f-aa94b2de8ed7",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-78",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 900,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-10",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "ad725f09-1016-7b2a-427a-b0b7ac63c649",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-79",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 900,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-10",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "ad725f09-1016-7b2a-427a-b0b7ac63c649",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-80",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-10",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "ad725f09-1016-7b2a-427a-b0b7ac63c649",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-81",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-10",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "ad725f09-1016-7b2a-427a-b0b7ac63c649",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-82",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1100,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-11",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "b5bdae95-4906-aa85-9551-53e2e870816e",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-83",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1100,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-11",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "b5bdae95-4906-aa85-9551-53e2e870816e",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-84",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-12",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "7eee6a62-fd71-7f7d-3e51-c7547211218b",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-85",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".is-word.is-12",
                  selectorGuids: [
                    "78bca9e3-55d0-e474-95c3-ec527deb940a",
                    "7eee6a62-fd71-7f7d-3e51-c7547211218b",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728517483265,
    },
    "a-7": {
      id: "a-7",
      title: "location-card -> scrolls in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "20bd0fcf-0ffa-fb32-1801-11b2da2948a3",
                },
                yValue: 2,
                xUnit: "PX",
                yUnit: "rem",
                zUnit: "PX",
              },
            },
            {
              id: "a-7-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".locations_visual",
                  selectorGuids: ["f6533226-b8fd-feff-3eaf-36d019eb890e"],
                },
                xValue: 0.9,
                yValue: 0.9,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: true,
                  id: "20bd0fcf-0ffa-fb32-1801-11b2da2948a3",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "rem",
                zUnit: "PX",
              },
            },
            {
              id: "a-7-n-4",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".locations_visual",
                  selectorGuids: ["f6533226-b8fd-feff-3eaf-36d019eb890e"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728516668250,
    },
    "a-8": {
      id: "a-8",
      title: "accordion -> open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_body",
                  selectorGuids: ["4c898ee7-0c25-2f3d-7256-6b31cfb2708d"],
                },
                widthValue: 100,
                heightValue: 0,
                widthUnit: "%",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_body",
                  selectorGuids: ["4c898ee7-0c25-2f3d-7256-6b31cfb2708d"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-8-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-24",
                  selectorGuids: ["3e1240f1-6b72-d2d8-cbb3-3f0a0a43ecd1"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-8-n-4",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "ab1a3d19-977b-898b-3bc1-40074489c468",
                },
                globalSwatchId: "--green",
                rValue: 206,
                bValue: 101,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-8-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_head",
                  selectorGuids: ["79c5458c-1afe-cb19-4d69-c0c12c553457"],
                },
                globalSwatchId: "--green",
                rValue: 206,
                bValue: 101,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728517776309,
    },
    "a-9": {
      id: "a-9",
      title: "accordion -> close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_body",
                  selectorGuids: ["4c898ee7-0c25-2f3d-7256-6b31cfb2708d"],
                },
                widthValue: 100,
                heightValue: 0,
                widthUnit: "%",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-9-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-24",
                  selectorGuids: ["3e1240f1-6b72-d2d8-cbb3-3f0a0a43ecd1"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-9-n-4",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "ab1a3d19-977b-898b-3bc1-40074489c468",
                },
                globalSwatchId: "",
                rValue: 206,
                bValue: 101,
                gValue: 255,
                aValue: 0.2,
              },
            },
            {
              id: "a-9-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_head",
                  selectorGuids: ["79c5458c-1afe-cb19-4d69-c0c12c553457"],
                },
                globalSwatchId: "--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728517776309,
    },
    "a-10": {
      id: "a-10",
      title: "img -> parallax",
      continuousParameterGroups: [
        {
          id: "a-10-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-10-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".parallax-img",
                      selectorGuids: ["d15d6864-842a-b05f-d9f5-7cc06f7d443b"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-10-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".parallax-img",
                      selectorGuids: ["d15d6864-842a-b05f-d9f5-7cc06f7d443b"],
                    },
                    yValue: 20,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728518188205,
    },
    "a-11": {
      id: "a-11",
      title: "bottom-cta -> scroll",
      continuousParameterGroups: [
        {
          id: "a-11-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-11-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".bottom-cta_box",
                      selectorGuids: ["d4790e7b-d1b7-7854-e50a-5d88e7eaec39"],
                    },
                    xValue: 2.5,
                    yValue: 2.5,
                    locked: true,
                  },
                },
                {
                  id: "a-11-n-5",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 0, unit: "rem" },
                    target: {
                      objectId: "--bottom-cta-radius",
                      useEventTarget: true,
                      id: "4500f34f-ad71-c737-340f-a39b6520a855",
                    },
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-11-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".bottom-cta_box",
                      selectorGuids: ["d4790e7b-d1b7-7854-e50a-5d88e7eaec39"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-11-n-6",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 3.125, unit: "rem" },
                    target: {
                      objectId: "--bottom-cta-radius",
                      useEventTarget: true,
                      id: "4500f34f-ad71-c737-340f-a39b6520a855",
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728518346398,
    },
    "a-12": {
      id: "a-12",
      title: "hero-video_re –> scrolls in",
      continuousParameterGroups: [
        {
          id: "a-12-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-12-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                    xValue: 0.9,
                    yValue: 0.9,
                    locked: true,
                  },
                },
                {
                  id: "a-12-n-2",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 1.5, unit: "rem" },
                    target: {
                      objectId: "--hero-video-radius",
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                  },
                },
                {
                  id: "a-12-n-3",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_btn",
                      selectorGuids: ["48b5f15e-f360-0f00-57eb-ace111f7e884"],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
                {
                  id: "a-12-n-4",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
                {
                  id: "a-12-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 16,
              actionItems: [
                {
                  id: "a-12-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    yValue: 200,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 33.33,
              actionItems: [
                {
                  id: "a-12-n-7",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-12-n-8",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 0, unit: "rem" },
                    target: {
                      objectId: "--hero-video-radius",
                      useEventTarget: "CHILDREN",
                      selector: ".video_wrap",
                      selectorGuids: ["c7878a48-9b25-1085-cc5f-a0d9fe85121a"],
                    },
                  },
                },
                {
                  id: "a-12-n-9",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_btn",
                      selectorGuids: ["48b5f15e-f360-0f00-57eb-ace111f7e884"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-12-n-10",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_title",
                      selectorGuids: ["69b99529-818a-58a6-ff57-383ad53add5a"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728505435249,
    },
    "a-13": {
      id: "a-13",
      title: "player-card -> scrolls in",
      continuousParameterGroups: [
        {
          id: "a-13-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-13-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".player_visual.shadow-card",
                      selectorGuids: [
                        "3a803c13-2474-0783-ab89-0536f44e8d5a",
                        "d302a14c-c67d-193b-56d6-1fa3b69c41e0",
                      ],
                    },
                    xValue: 0.7,
                    yValue: 0.7,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-13-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".player_visual.shadow-card",
                      selectorGuids: [
                        "3a803c13-2474-0783-ab89-0536f44e8d5a",
                        "d302a14c-c67d-193b-56d6-1fa3b69c41e0",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728593295861,
    },
    "a-14": {
      id: "a-14",
      title: "gallery -> parallax",
      continuousParameterGroups: [
        {
          id: "a-14-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-14-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._1",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "80c8c62a-60e0-7ba3-d041-13625a5d51b3",
                      ],
                    },
                    yValue: 5,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._2",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "ce1c6c2c-2ef1-a485-02a8-a32b10364e7c",
                      ],
                    },
                    yValue: 7,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._3",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "557edea9-8d53-fb47-483c-cfdeced4177d",
                      ],
                    },
                    yValue: 12,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._4",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "b4de19f3-f263-7496-d564-44abd2f8f3d1",
                      ],
                    },
                    yValue: 12,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._5",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "b677b4d2-4c0c-54b8-131b-8b89ab717d99",
                      ],
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-14-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._1",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "80c8c62a-60e0-7ba3-d041-13625a5d51b3",
                      ],
                    },
                    yValue: -5,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._2",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "ce1c6c2c-2ef1-a485-02a8-a32b10364e7c",
                      ],
                    },
                    yValue: -7,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._3",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "557edea9-8d53-fb47-483c-cfdeced4177d",
                      ],
                    },
                    yValue: -6,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._4",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "b4de19f3-f263-7496-d564-44abd2f8f3d1",
                      ],
                    },
                    yValue: -4,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-14-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".gallery_img._5",
                      selectorGuids: [
                        "eb70c2a8-3bcd-dded-675b-cf9805985161",
                        "b677b4d2-4c0c-54b8-131b-8b89ab717d99",
                      ],
                    },
                    yValue: -10,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728594315615,
    },
    "a-15": {
      id: "a-15",
      title: "fitness -> intro-line",
      continuousParameterGroups: [
        {
          id: "a-15-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-15-n",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: 0, unit: "em" },
                    target: {
                      objectId: "--fitness-intro-shadow-y",
                      useEventTarget: true,
                      id: "6705807fd8f75b7e3a2d3bdc|6a3ecc14-ec69-9bbd-db05-9782133e248d",
                    },
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-15-n-2",
                  actionTypeId: "PLUGIN_VARIABLE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    value: { size: -0.6, unit: "em" },
                    target: {
                      objectId: "--fitness-intro-shadow-y",
                      useEventTarget: true,
                      id: "6705807fd8f75b7e3a2d3bdc|6a3ecc14-ec69-9bbd-db05-9782133e248d",
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728594710015,
    },
    "a-16": {
      id: "a-16",
      title: "feature-visual -> scrolls in",
      continuousParameterGroups: [
        {
          id: "a-16-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-16-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6705807fd8f75b7e3a2d3bdc|c4c61132-10a5-f5b8-f9a0-5ff4e441da56",
                    },
                    xValue: 0.7,
                    yValue: 0.7,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-16-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6705807fd8f75b7e3a2d3bdc|c4c61132-10a5-f5b8-f9a0-5ff4e441da56",
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728593295861,
    },
    "a-18": {
      id: "a-18",
      title: "hover-line -> hover out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "swingFrom",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link_line",
                  selectorGuids: ["9cf9eaf6-20c8-12d4-b89c-f09b8d97a9db"],
                },
                xValue: 0,
                yValue: null,
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728598009698,
    },
    "a-19": {
      id: "a-19",
      title: "hover-box -> hover in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-box",
                  selectorGuids: ["7bc8cf0d-181f-72ae-b9f8-7197dc1c2e37"],
                },
                xValue: 0.5,
                yValue: 0.5,
                locked: true,
              },
            },
            {
              id: "a-19-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-box",
                  selectorGuids: ["7bc8cf0d-181f-72ae-b9f8-7197dc1c2e37"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-19-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "swingTo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-box",
                  selectorGuids: ["7bc8cf0d-181f-72ae-b9f8-7197dc1c2e37"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-19-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "swingTo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-box",
                  selectorGuids: ["7bc8cf0d-181f-72ae-b9f8-7197dc1c2e37"],
                },
                value: 0.7,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728642643898,
    },
    "a-20": {
      id: "a-20",
      title: "hover-box -> hover out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "swingFrom",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-box",
                  selectorGuids: ["7bc8cf0d-181f-72ae-b9f8-7197dc1c2e37"],
                },
                xValue: 0.5,
                yValue: 0.5,
                locked: true,
              },
            },
            {
              id: "a-20-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "swingFrom",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-box",
                  selectorGuids: ["7bc8cf0d-181f-72ae-b9f8-7197dc1c2e37"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728642643898,
    },
    "a-23": {
      id: "a-23",
      title: "learn-more -> mouse move",
      continuousParameterGroups: [
        {
          id: "a-23-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-23-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_play",
                      selectorGuids: ["3f81e598-cd52-c8c6-f044-98729414ef51"],
                    },
                    xValue: -2,
                    xUnit: "rem",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-23-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_play",
                      selectorGuids: ["3f81e598-cd52-c8c6-f044-98729414ef51"],
                    },
                    xValue: 2,
                    xUnit: "rem",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-23-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-23-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_play",
                      selectorGuids: ["3f81e598-cd52-c8c6-f044-98729414ef51"],
                    },
                    xValue: null,
                    yValue: -1,
                    xUnit: "rem",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-23-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video_play",
                      selectorGuids: ["3f81e598-cd52-c8c6-f044-98729414ef51"],
                    },
                    yValue: 1,
                    xUnit: "PX",
                    yUnit: "rem",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1728643204318,
    },
    "a-21": {
      id: "a-21",
      title: "learn-more -> hover in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".video_play",
                  selectorGuids: ["3f81e598-cd52-c8c6-f044-98729414ef51"],
                },
                xValue: 1.2,
                yValue: 1.2,
                locked: true,
              },
            },
            {
              id: "a-21-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-16",
                  selectorGuids: ["a5a0defd-f324-bd27-81c2-3ca4ba015545"],
                },
                xValue: 0.8,
                yValue: 0.8,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643024519,
    },
    "a-22": {
      id: "a-22",
      title: "learn-more -> hover out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".video_play",
                  selectorGuids: ["3f81e598-cd52-c8c6-f044-98729414ef51"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-22-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-16",
                  selectorGuids: ["a5a0defd-f324-bd27-81c2-3ca4ba015545"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643024519,
    },
    "a-26": {
      id: "a-26",
      title: "rotate-image_3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 16000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 180,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 16000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: null,
                zValue: 12,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 360,
                zValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 1500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 16000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 16000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643705736,
    },
    "a-28": {
      id: "a-28",
      title: "rotate-image_5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 32000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 180,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-28-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 32000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: null,
                zValue: 12,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 360,
                zValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 1500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-28-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643705736,
    },
    "a-24": {
      id: "a-24",
      title: "rotate-image_1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 180,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-24-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: null,
                zValue: 12,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 360,
                zValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 1500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-24-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 32000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-24-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 32000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643705736,
    },
    "a-27": {
      id: "a-27",
      title: "rotate-image_4",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 24000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 180,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-27-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 24000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: null,
                zValue: 12,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 360,
                zValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 1500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-27-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 8000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-27-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 8000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643705736,
    },
    "a-25": {
      id: "a-25",
      title: "rotate-image_2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 8000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 180,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 8000,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: null,
                zValue: 12,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 3000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                xValue: null,
                yValue: 360,
                zValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 1500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "swingFromTo",
                duration: 24000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 24000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".rotate-box",
                  selectorGuids: ["64b602f0-f009-741c-1939-6d1ec1651a56"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728643705736,
    },
    "a-29": {
      id: "a-29",
      title: "arrow-dot -> hover-in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "swingFrom",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow_dot",
                  selectorGuids: ["b7c0798c-83d6-a982-8035-9c825a65e32f"],
                },
                xValue: 0.5,
                yValue: 0.5,
                locked: true,
              },
            },
            {
              id: "a-29-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow_dot",
                  selectorGuids: ["b7c0798c-83d6-a982-8035-9c825a65e32f"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-29-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow_dot",
                  selectorGuids: ["b7c0798c-83d6-a982-8035-9c825a65e32f"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-29-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow_dot",
                  selectorGuids: ["b7c0798c-83d6-a982-8035-9c825a65e32f"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728648259103,
    },
    "a-30": {
      id: "a-30",
      title: "arrow-dot -> hover-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-30-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow_dot",
                  selectorGuids: ["b7c0798c-83d6-a982-8035-9c825a65e32f"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
            {
              id: "a-30-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow_dot",
                  selectorGuids: ["b7c0798c-83d6-a982-8035-9c825a65e32f"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728648259103,
    },
    "a-31": {
      id: "a-31",
      title: "contact-us -> reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-31-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "6705a6009c78a7cebe6ff2cb|d5f6a4b2-9414-5c9e-4db8-6d4a9b945aee",
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-31-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6705a6009c78a7cebe6ff2cb|d38a1bab-da7c-5502-1032-859abe3a6aa1",
                },
                xValue: 1.2,
                yValue: 1.2,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-31-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  id: "6705a6009c78a7cebe6ff2cb|d5f6a4b2-9414-5c9e-4db8-6d4a9b945aee",
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-31-n-4",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 2000,
                target: {
                  id: "6705a6009c78a7cebe6ff2cb|d38a1bab-da7c-5502-1032-859abe3a6aa1",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728649710651,
    },
    "a-32": {
      id: "a-32",
      title: "content -> scrolls in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-32-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-medium",
                  selectorGuids: ["bb0086f1-7d86-7383-094f-dae4e0e5c93b"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-medium",
                  selectorGuids: ["bb0086f1-7d86-7383-094f-dae4e0e5c93b"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button",
                  selectorGuids: ["e5195153-8ecd-ca48-1499-6df4e8b316e4"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button",
                  selectorGuids: ["e5195153-8ecd-ca48-1499-6df4e8b316e4"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-eyebrow",
                  selectorGuids: ["cc41b641-e58b-e5dc-41b1-6af0378874a0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-eyebrow",
                  selectorGuids: ["cc41b641-e58b-e5dc-41b1-6af0378874a0"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".staff_list",
                  selectorGuids: ["484e9a30-5c3f-51e9-d732-5225de224bdc"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".staff_list",
                  selectorGuids: ["484e9a30-5c3f-51e9-d732-5225de224bdc"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".history_list",
                  selectorGuids: ["3d58ef48-d7bf-a157-a46a-0a0230028eb5"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".history_list",
                  selectorGuids: ["3d58ef48-d7bf-a157-a46a-0a0230028eb5"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".locations_grid",
                  selectorGuids: ["7024e355-2af1-c79f-03a7-f1a37083951b"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".locations_grid",
                  selectorGuids: ["7024e355-2af1-c79f-03a7-f1a37083951b"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".stats_list",
                  selectorGuids: ["3ecdc732-91d5-84d9-fb13-bb959b77b91e"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".stats_list",
                  selectorGuids: ["3ecdc732-91d5-84d9-fb13-bb959b77b91e"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".list_wrap",
                  selectorGuids: ["ae6fffdd-9b43-0d81-0e4f-dd34a7eaabb0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".list_wrap",
                  selectorGuids: ["ae6fffdd-9b43-0d81-0e4f-dd34a7eaabb0"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-17",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact_form-block",
                  selectorGuids: ["c04ace79-72ea-6e51-26ad-97e856419d0e"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact_form-block",
                  selectorGuids: ["c04ace79-72ea-6e51-26ad-97e856419d0e"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-86",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".form-input.is-green",
                  selectorGuids: [
                    "91772283-4ead-0021-4f37-755517caa597",
                    "bdae9cda-2f2b-170e-6d17-38a135c23c26",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-85",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".form-input.is-green",
                  selectorGuids: [
                    "91772283-4ead-0021-4f37-755517caa597",
                    "bdae9cda-2f2b-170e-6d17-38a135c23c26",
                  ],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-89",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_list",
                  selectorGuids: ["ed9c93f3-129e-3ffa-fbb9-0c4f553721ae"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-90",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_list",
                  selectorGuids: ["ed9c93f3-129e-3ffa-fbb9-0c4f553721ae"],
                },
                yValue: 0.5,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-68",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-medium",
                  selectorGuids: ["bb0086f1-7d86-7383-094f-dae4e0e5c93b"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-67",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-medium",
                  selectorGuids: ["bb0086f1-7d86-7383-094f-dae4e0e5c93b"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-69",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button",
                  selectorGuids: ["e5195153-8ecd-ca48-1499-6df4e8b316e4"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-70",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button",
                  selectorGuids: ["e5195153-8ecd-ca48-1499-6df4e8b316e4"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-71",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-eyebrow",
                  selectorGuids: ["cc41b641-e58b-e5dc-41b1-6af0378874a0"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-72",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text-size-eyebrow",
                  selectorGuids: ["cc41b641-e58b-e5dc-41b1-6af0378874a0"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-87",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".form-input.is-green",
                  selectorGuids: [
                    "91772283-4ead-0021-4f37-755517caa597",
                    "bdae9cda-2f2b-170e-6d17-38a135c23c26",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-88",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".form-input.is-green",
                  selectorGuids: [
                    "91772283-4ead-0021-4f37-755517caa597",
                    "bdae9cda-2f2b-170e-6d17-38a135c23c26",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-73",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".list_wrap",
                  selectorGuids: ["ae6fffdd-9b43-0d81-0e4f-dd34a7eaabb0"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-74",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".list_wrap",
                  selectorGuids: ["ae6fffdd-9b43-0d81-0e4f-dd34a7eaabb0"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-75",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".stats_list",
                  selectorGuids: ["3ecdc732-91d5-84d9-fb13-bb959b77b91e"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-76",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".stats_list",
                  selectorGuids: ["3ecdc732-91d5-84d9-fb13-bb959b77b91e"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-77",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".locations_grid",
                  selectorGuids: ["7024e355-2af1-c79f-03a7-f1a37083951b"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-78",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".locations_grid",
                  selectorGuids: ["7024e355-2af1-c79f-03a7-f1a37083951b"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-79",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".history_list",
                  selectorGuids: ["3d58ef48-d7bf-a157-a46a-0a0230028eb5"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-80",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".history_list",
                  selectorGuids: ["3d58ef48-d7bf-a157-a46a-0a0230028eb5"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-81",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".staff_list",
                  selectorGuids: ["484e9a30-5c3f-51e9-d732-5225de224bdc"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-82",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".staff_list",
                  selectorGuids: ["484e9a30-5c3f-51e9-d732-5225de224bdc"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-83",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact_form-block",
                  selectorGuids: ["c04ace79-72ea-6e51-26ad-97e856419d0e"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-84",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact_form-block",
                  selectorGuids: ["c04ace79-72ea-6e51-26ad-97e856419d0e"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-91",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_list",
                  selectorGuids: ["ed9c93f3-129e-3ffa-fbb9-0c4f553721ae"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-92",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outExpo",
                duration: 2000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faqs_list",
                  selectorGuids: ["ed9c93f3-129e-3ffa-fbb9-0c4f553721ae"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "em",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728517483265,
    },
    "a-38": {
      id: "a-38",
      title: "link-box -> hover in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-38-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {},
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-38-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {},
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1728495294836,
    },
    "a-39": {
      id: "a-39",
      title: "link-box -> hover out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {},
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1728495294836,
    },
    "a-40": {
      id: "a-40",
      title: "nav -> opens",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-40-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-line.is-top",
                  selectorGuids: [
                    "011acbae-1098-1982-3684-b5f8e5bf3bc6",
                    "e49c9707-83d6-f07b-5915-354f36640bfe",
                  ],
                },
                yValue: 7,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-40-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-line.is-bottom",
                  selectorGuids: [
                    "011acbae-1098-1982-3684-b5f8e5bf3bc6",
                    "14d5974f-54ac-e12a-4410-9140ae491336",
                  ],
                },
                yValue: -7,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-40-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-line.is-middle",
                  selectorGuids: [
                    "011acbae-1098-1982-3684-b5f8e5bf3bc6",
                    "f70b7933-aff6-d0c5-f34b-446c9eeda13e",
                  ],
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-40-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-inner",
                  selectorGuids: ["0c9c9542-2999-3584-1285-d4e26d2db556"],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      createdOn: 1728885258688,
      useFirstGroupAsInitialState: false,
    },
    "a-41": {
      id: "a-41",
      title: "nav -> close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-41-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-line.is-middle",
                  selectorGuids: [
                    "011acbae-1098-1982-3684-b5f8e5bf3bc6",
                    "f70b7933-aff6-d0c5-f34b-446c9eeda13e",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-41-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-inner",
                  selectorGuids: ["0c9c9542-2999-3584-1285-d4e26d2db556"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-41-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-line.is-top",
                  selectorGuids: [
                    "011acbae-1098-1982-3684-b5f8e5bf3bc6",
                    "e49c9707-83d6-f07b-5915-354f36640bfe",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-41-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_button-line.is-bottom",
                  selectorGuids: [
                    "011acbae-1098-1982-3684-b5f8e5bf3bc6",
                    "14d5974f-54ac-e12a-4410-9140ae491336",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      createdOn: 1728885258688,
      useFirstGroupAsInitialState: false,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
