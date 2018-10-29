(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

module.exports = function (isi) {
    var me = this;

    var $screen1 = $('.screen-1'),
        $screen2 = $('.screen-2'),
        $screen3 = $('.screen-3'),
        $screen4 = $('.screen-4'),
        $screen5 = $('.screen-5');

    this.isi = isi;
    this.loopAnimation = false;
    this.animationSpeed = 900;
    this.holdAnimation = 1800;
    this.gwdAd = document.getElementById('gwd-ad');

    this.fadeIn = {
        screen1: function screen1() {

            $screen1.fadeIn(me.animationSpeed, function () {
                // Do something after screen-1 fades in
                setTimeout(function () {
                    $screen1.fadeOut(me.animationSpeed, function () {
                        me.fadeIn.screen2();
                    });
                }, 800);
            });
        },

        screen2: function screen2() {
            // fade in screen
            $screen2.fadeIn(me.animationSpeed, function () {
                // me.gwdAd.initAd();
                setTimeout(function () {
                    $screen2.fadeOut(me.animationSpeed, function () {
                        me.fadeIn.screen3();
                    });
                }, 2600);
            });
            // me.animate.screen2();
        },

        screen3: function screen3() {
            // pretty straightforward. fade in new screen, hold it for the specified time, then fade out and fade in new screen
            $screen3.fadeIn(me.animationSpeed, function () {
                setTimeout(function () {
                    $screen3.fadeOut(me.animationSpeed, function () {
                        me.fadeIn.screen4();
                    });
                }, me.holdAnimation);
            });
        },

        screen4: function screen4() {
            // pretty straightforward. fade in new screen, hold it for the specified time, then fade out and fade in new screen
            $screen4.fadeIn(me.animationSpeed, function () {
                $('.animated-content').addClass('has-bg');
                setTimeout(function () {
                    $screen4.fadeOut(me.animationSpeed, function () {
                        me.fadeIn.screen5();
                    });
                }, me.holdAnimation);
            });
        },

        screen5: function screen5() {
            // fade in new screen
            setTimeout(function () {
                $('.screen-5 img').addClass('active');
                setTimeout(function () {
                    $('.screen-5 .shield-content').addClass('active');
                }, 800);
            }, 200);
            $screen5.fadeIn(me.animationSpeed, function () {
                // then either re animate once or if the animation has looped already, do nothing
                if (me.loopAnimation === false) {
                    me.loopAnimation = true;

                    me.isi.init();

                    setTimeout(function () {
                        $('.animated-content').removeClass('has-bg');
                        $screen5.fadeOut(me.animationSpeed, function () {
                            me.fadeIn.screen1();
                            $screen5.find('.active').removeClass('active');
                        });
                    }, me.holdAnimation);
                }
            });
        }

    };

    this.init = function () {
        this.fadeIn.screen1();
    };
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function () {
  if ($('.clickTag1').length) {
    $('.clickTag1').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('Tavalisee HCP');
    });
  }if ($('.clickTag2').length) {
    $('.clickTag2').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('Full PI');
    });
  }if ($('.clickTag3').length) {
    $('.clickTag3').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('Medwatch');
    });
  }if ($('.clickTag4').length) {
    $('.clickTag4').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('Tavalisse Home');
    });
  }
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function (IScroll, id) {
	var me = this;
	this.id = id ? id : 'isi';
	this.isi = document.getElementById(this.id);
	this.isiContainer = document.getElementById(this.id + '-container');
	this.isiScroll = new IScroll('#' + this.id + '-container', {
		mouseWheel: true,
		bounce: false,
		mouseWheelSpeed: 10,
		scrollbars: true,
		resizeScrollbars: false,
		interactiveScrollbars: true,
		probeType: 3
	});

	this.initialized = false;
	this.mouseOverIsi = false;
	this.scrollSpeedMultiplier = -100;

	this.init = function () {
		if (!this.initialized) {
			this.initialized = true;
			this.startScrollFromBeginning();
		}
	};

	this.handleMouseEnter = function () {
		this.mouseOverIsi = true;
		if (this.initialized) {
			this.pauseScroll();
		}
	};

	this.handleMouseLeave = function () {
		this.mouseOverIsi = false;
		if (this.initialized) {
			this.resumeScroll();
		}
		if (me.isiScroll.y <= me.isiScroll.maxScrollY) {
			me.isiScroll.scrollTo(0, 0);
			me.startScrollFromBeginning();
		}
	};

	this.startScrollFromBeginning = function () {
		if (!this.mouseOverIsi) {
			me.isiScroll.scrollTo(0, me.isiScroll.maxScrollY, me.isiScroll.maxScrollY * me.scrollSpeedMultiplier, IScroll.utils.ease.quadratic);
		}
	};

	this.pauseScroll = function () {
		this.isiScroll.scrollTo(0, this.isiScroll.y, -1, IScroll.utils.ease.quadratic);
	};

	this.resumeScroll = function () {
		if (!this.mouseOverIsi) {
			var self = this;
			setTimeout(function () {
				if (!self.mouseOverIsi) {
					self.isiScroll.scrollBy(0, self.isiScroll.maxScrollY - self.isiScroll.y, (self.isiScroll.maxScrollY - self.isiScroll.y) * self.scrollSpeedMultiplier, IScroll.utils.ease.quadratic);
				}
			}, 75);
		}
	};

	this.isiScroll.on('scrollEnd', function () {
		if (me.isiScroll.y <= me.isiScroll.maxScrollY) {
			if (!me.mouseOverIsi) {
				me.isiScroll.scrollTo(0, 0);
				me.startScrollFromBeginning();
			}
		}
	});
	// Set event listeners
	this.isiContainer.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
	this.isiContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
};

},{}],4:[function(require,module,exports){
'use strict';

var Isi = require('./components/isi.js');
var IScroll = require('./vendor/iscroll-probe.js');
var animationLoader = require('./components/animation.js');
require('./vendor/googbase_min.js');
require('./vendor/gwd_webcomponents_min.js');
require('./vendor/gwdgooglead_min.js');
require('./vendor/gwdimage_min.js');
require('./vendor/gwdpage_min.js');
require('./vendor/gwdpagedeck_min.js');

module.exports = function () {
	// instantiate the isi object
	var isi = new Isi(IScroll);
	// instantiate the animate object
	var animate = new animationLoader(isi);
	// you can turn on auto-scrolling here by uncommenting this line
	// isi.init();

	// passing in the isi object in case you want to initialize autoscrolling after an animation

	var gwdAd = document.getElementById('gwd-ad');

	gwdAd.initAd();
	animate.init();
};

},{"./components/animation.js":1,"./components/isi.js":3,"./vendor/googbase_min.js":7,"./vendor/gwd_webcomponents_min.js":8,"./vendor/gwdgooglead_min.js":9,"./vendor/gwdimage_min.js":10,"./vendor/gwdpage_min.js":11,"./vendor/gwdpagedeck_min.js":12,"./vendor/iscroll-probe.js":13}],5:[function(require,module,exports){
"use strict";

},{}],6:[function(require,module,exports){
'use strict';

var mainJs = require('../main.js');
var exitLinks = require('../components/exit-links.js');

window.addEventListener('load', function () {
  if ($('#main-panel').hasClass('doubleclick')) {
    var enablerInitHandler = function enablerInitHandler() {

      exitLinks();

      if (Enabler.isPageLoaded()) {
        mainJs();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
      }
    };

    if (Enabler.isInitialized()) {
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, function () {
        enablerInitHandler();
      });
    }
  } else {
    mainJs();
  }
});

},{"../components/exit-links.js":2,"../main.js":4}],7:[function(require,module,exports){
"use strict";

(function () {
  (window.goog = window.goog || {}).inherits = function (a, d) {
    function b() {}b.prototype = d.prototype;a.b = d.prototype;a.prototype = new b();a.prototype.constructor = a;a.a = function (a, b, f) {
      for (var e = Array(arguments.length - 2), c = 2; c < arguments.length; c++) {
        e[c - 2] = arguments[c];
      }return d.prototype[b].apply(a, e);
    };
  };
}).call(undefined);

},{}],8:[function(require,module,exports){
"use strict";

"undefined" == typeof document.register && (document.register = function (a) {
  return document.registerElement.apply(document, arguments);
});document.createElement || (document.createElement = document.constructor.prototype.createElement, document.createElementNS = document.constructor.prototype.createElementNS);

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.7.24-5b70476
"undefined" == typeof WeakMap && !function () {
  var e = Object.defineProperty,
      t = Date.now() % 1e9,
      n = function n() {
    this.name = "__st" + (1e9 * Math.random() >>> 0) + (t++ + "__");
  };n.prototype = { set: function set(t, n) {
      var o = t[this.name];return o && o[0] === t ? o[1] = n : e(t, this.name, { value: [t, n], writable: !0 }), this;
    }, get: function get(e) {
      var t;return (t = e[this.name]) && t[0] === e ? t[1] : void 0;
    }, "delete": function _delete(e) {
      var t = e[this.name];return !(!t || t[0] !== e) && (t[0] = t[1] = void 0, !0);
    }, has: function has(e) {
      var t = e[this.name];return !!t && t[0] === e;
    } }, window.WeakMap = n;
}(), function (e) {
  function t(e) {
    E.push(e), b || (b = !0, m(o));
  }function n(e) {
    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e;
  }function o() {
    b = !1;var e = E;E = [], e.sort(function (e, t) {
      return e.uid_ - t.uid_;
    });var t = !1;e.forEach(function (e) {
      var n = e.takeRecords();r(e), n.length && (e.callback_(n, e), t = !0);
    }), t && o();
  }function r(e) {
    e.nodes_.forEach(function (t) {
      var n = v.get(t);n && n.forEach(function (t) {
        t.observer === e && t.removeTransientObservers();
      });
    });
  }function i(e, t) {
    for (var n = e; n; n = n.parentNode) {
      var o = v.get(n);if (o) for (var r = 0; r < o.length; r++) {
        var i = o[r],
            a = i.options;if (n === e || a.subtree) {
          var d = t(a);d && i.enqueue(d);
        }
      }
    }
  }function a(e) {
    this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++_;
  }function d(e, t) {
    this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null;
  }function s(e) {
    var t = new d(e.type, e.target);return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t;
  }function u(e, t) {
    return y = new d(e, t);
  }function c(e) {
    return N ? N : (N = s(y), N.oldValue = e, N);
  }function l() {
    y = N = void 0;
  }function f(e) {
    return e === N || e === y;
  }function p(e, t) {
    return e === t ? e : N && f(e) ? N : null;
  }function w(e, t, n) {
    this.observer = e, this.target = t, this.options = n, this.transientObservedNodes = [];
  }if (!e.JsMutationObserver) {
    var m,
        v = new WeakMap();if (/Trident|Edge/.test(navigator.userAgent)) m = setTimeout;else if (window.setImmediate) m = window.setImmediate;else {
      var h = [],
          g = String(Math.random());window.addEventListener("message", function (e) {
        if (e.data === g) {
          var t = h;h = [], t.forEach(function (e) {
            e();
          });
        }
      }), m = function m(e) {
        h.push(e), window.postMessage(g, "*");
      };
    }var b = !1,
        E = [],
        _ = 0;a.prototype = { observe: function observe(e, t) {
        if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData) throw new SyntaxError();var o = v.get(e);o || v.set(e, o = []);for (var r, i = 0; i < o.length; i++) {
          if (o[i].observer === this) {
            r = o[i], r.removeListeners(), r.options = t;break;
          }
        }r || (r = new w(this, e, t), o.push(r), this.nodes_.push(e)), r.addListeners();
      }, disconnect: function disconnect() {
        this.nodes_.forEach(function (e) {
          for (var t = v.get(e), n = 0; n < t.length; n++) {
            var o = t[n];if (o.observer === this) {
              o.removeListeners(), t.splice(n, 1);break;
            }
          }
        }, this), this.records_ = [];
      }, takeRecords: function takeRecords() {
        var e = this.records_;return this.records_ = [], e;
      } };var y, N;w.prototype = { enqueue: function enqueue(e) {
        var n = this.observer.records_,
            o = n.length;if (n.length > 0) {
          var r = n[o - 1],
              i = p(r, e);if (i) return void (n[o - 1] = i);
        } else t(this.observer);n[o] = e;
      }, addListeners: function addListeners() {
        this.addListeners_(this.target);
      }, addListeners_: function addListeners_(e) {
        var t = this.options;t.attributes && e.addEventListener("DOMAttrModified", this, !0), t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0), t.childList && e.addEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0);
      }, removeListeners: function removeListeners() {
        this.removeListeners_(this.target);
      }, removeListeners_: function removeListeners_(e) {
        var t = this.options;t.attributes && e.removeEventListener("DOMAttrModified", this, !0), t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0), t.childList && e.removeEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0);
      }, addTransientObserver: function addTransientObserver(e) {
        if (e !== this.target) {
          this.addListeners_(e), this.transientObservedNodes.push(e);var t = v.get(e);t || v.set(e, t = []), t.push(this);
        }
      }, removeTransientObservers: function removeTransientObservers() {
        var e = this.transientObservedNodes;this.transientObservedNodes = [], e.forEach(function (e) {
          this.removeListeners_(e);for (var t = v.get(e), n = 0; n < t.length; n++) {
            if (t[n] === this) {
              t.splice(n, 1);break;
            }
          }
        }, this);
      }, handleEvent: function handleEvent(e) {
        switch (e.stopImmediatePropagation(), e.type) {case "DOMAttrModified":
            var t = e.attrName,
                n = e.relatedNode.namespaceURI,
                o = e.target,
                r = new u("attributes", o);r.attributeName = t, r.attributeNamespace = n;var a = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;i(o, function (e) {
              if (e.attributes && (!e.attributeFilter || !e.attributeFilter.length || e.attributeFilter.indexOf(t) !== -1 || e.attributeFilter.indexOf(n) !== -1)) return e.attributeOldValue ? c(a) : r;
            });break;case "DOMCharacterDataModified":
            var o = e.target,
                r = u("characterData", o),
                a = e.prevValue;i(o, function (e) {
              if (e.characterData) return e.characterDataOldValue ? c(a) : r;
            });break;case "DOMNodeRemoved":
            this.addTransientObserver(e.target);case "DOMNodeInserted":
            var d,
                s,
                f = e.target;"DOMNodeInserted" === e.type ? (d = [f], s = []) : (d = [], s = [f]);var p = f.previousSibling,
                w = f.nextSibling,
                r = u("childList", e.target.parentNode);r.addedNodes = d, r.removedNodes = s, r.previousSibling = p, r.nextSibling = w, i(e.relatedNode, function (e) {
              if (e.childList) return r;
            });}l();
      } }, e.JsMutationObserver = a, e.MutationObserver || (e.MutationObserver = a, a._isPolyfilled = !0);
  }
}(self), function (e) {
  "use strict";
  if (!window.performance || !window.performance.now) {
    var t = Date.now();window.performance = { now: function now() {
        return Date.now() - t;
      } };
  }window.requestAnimationFrame || (window.requestAnimationFrame = function () {
    var e = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;return e ? function (t) {
      return e(function () {
        t(performance.now());
      });
    } : function (e) {
      return window.setTimeout(e, 1e3 / 60);
    };
  }()), window.cancelAnimationFrame || (window.cancelAnimationFrame = function () {
    return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (e) {
      clearTimeout(e);
    };
  }());var n = function () {
    var e = document.createEvent("Event");return e.initEvent("foo", !0, !0), e.preventDefault(), e.defaultPrevented;
  }();if (!n) {
    var o = Event.prototype.preventDefault;Event.prototype.preventDefault = function () {
      this.cancelable && (o.call(this), Object.defineProperty(this, "defaultPrevented", { get: function get() {
          return !0;
        }, configurable: !0 }));
    };
  }var r = /Trident/.test(navigator.userAgent);if ((!window.CustomEvent || r && "function" != typeof window.CustomEvent) && (window.CustomEvent = function (e, t) {
    t = t || {};var n = document.createEvent("CustomEvent");return n.initCustomEvent(e, Boolean(t.bubbles), Boolean(t.cancelable), t.detail), n;
  }, window.CustomEvent.prototype = window.Event.prototype), !window.Event || r && "function" != typeof window.Event) {
    var i = window.Event;window.Event = function (e, t) {
      t = t || {};var n = document.createEvent("Event");return n.initEvent(e, Boolean(t.bubbles), Boolean(t.cancelable)), n;
    }, window.Event.prototype = i.prototype;
  }
}(window.WebComponents), window.CustomElements = window.CustomElements || { flags: {} }, function (e) {
  var t = e.flags,
      n = [],
      o = function o(e) {
    n.push(e);
  },
      r = function r() {
    n.forEach(function (t) {
      t(e);
    });
  };e.addModule = o, e.initializeModules = r, e.hasNative = Boolean(document.registerElement), e.isIE = /Trident/.test(navigator.userAgent), e.useNative = !t.register && e.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
}(window.CustomElements), window.CustomElements.addModule(function (e) {
  function t(e, t) {
    n(e, function (e) {
      return !!t(e) || void o(e, t);
    }), o(e, t);
  }function n(e, t, o) {
    var r = e.firstElementChild;if (!r) for (r = e.firstChild; r && r.nodeType !== Node.ELEMENT_NODE;) {
      r = r.nextSibling;
    }for (; r;) {
      t(r, o) !== !0 && n(r, t, o), r = r.nextElementSibling;
    }return null;
  }function o(e, n) {
    for (var o = e.shadowRoot; o;) {
      t(o, n), o = o.olderShadowRoot;
    }
  }function r(e, t) {
    i(e, t, []);
  }function i(e, t, n) {
    if (e = window.wrap(e), !(n.indexOf(e) >= 0)) {
      n.push(e);for (var o, r = e.querySelectorAll("link[rel=" + a + "]"), d = 0, s = r.length; d < s && (o = r[d]); d++) {
        o["import"] && i(o["import"], t, n);
      }t(e);
    }
  }var a = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";e.forDocumentTree = r, e.forSubtree = t;
}), window.CustomElements.addModule(function (e) {
  function t(e, t) {
    return n(e, t) || o(e, t);
  }function n(t, n) {
    return !!e.upgrade(t, n) || void (n && a(t));
  }function o(e, t) {
    b(e, function (e) {
      if (n(e, t)) return !0;
    });
  }function r(e) {
    N.push(e), y || (y = !0, setTimeout(i));
  }function i() {
    y = !1;for (var e, t = N, n = 0, o = t.length; n < o && (e = t[n]); n++) {
      e();
    }N = [];
  }function a(e) {
    _ ? r(function () {
      d(e);
    }) : d(e);
  }function d(e) {
    e.__upgraded__ && !e.__attached && (e.__attached = !0, e.attachedCallback && e.attachedCallback());
  }function s(e) {
    u(e), b(e, function (e) {
      u(e);
    });
  }function u(e) {
    _ ? r(function () {
      c(e);
    }) : c(e);
  }function c(e) {
    e.__upgraded__ && e.__attached && (e.__attached = !1, e.detachedCallback && e.detachedCallback());
  }function l(e) {
    for (var t = e, n = window.wrap(document); t;) {
      if (t == n) return !0;t = t.parentNode || t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host;
    }
  }function f(e) {
    if (e.shadowRoot && !e.shadowRoot.__watched) {
      g.dom && console.log("watching shadow-root for: ", e.localName);for (var t = e.shadowRoot; t;) {
        m(t), t = t.olderShadowRoot;
      }
    }
  }function p(e, n) {
    if (g.dom) {
      var o = n[0];if (o && "childList" === o.type && o.addedNodes && o.addedNodes) {
        for (var r = o.addedNodes[0]; r && r !== document && !r.host;) {
          r = r.parentNode;
        }var i = r && (r.URL || r._URL || r.host && r.host.localName) || "";i = i.split("/?").shift().split("/").pop();
      }console.group("mutations (%d) [%s]", n.length, i || "");
    }var a = l(e);n.forEach(function (e) {
      "childList" === e.type && (M(e.addedNodes, function (e) {
        e.localName && t(e, a);
      }), M(e.removedNodes, function (e) {
        e.localName && s(e);
      }));
    }), g.dom && console.groupEnd();
  }function w(e) {
    for (e = window.wrap(e), e || (e = window.wrap(document)); e.parentNode;) {
      e = e.parentNode;
    }var t = e.__observer;t && (p(e, t.takeRecords()), i());
  }function m(e) {
    if (!e.__observer) {
      var t = new MutationObserver(p.bind(this, e));t.observe(e, { childList: !0, subtree: !0 }), e.__observer = t;
    }
  }function v(e) {
    e = window.wrap(e), g.dom && console.group("upgradeDocument: ", e.baseURI.split("/").pop());var n = e === window.wrap(document);t(e, n), m(e), g.dom && console.groupEnd();
  }function h(e) {
    E(e, v);
  }var g = e.flags,
      b = e.forSubtree,
      E = e.forDocumentTree,
      _ = window.MutationObserver._isPolyfilled && g["throttle-attached"];e.hasPolyfillMutations = _, e.hasThrottledAttached = _;var y = !1,
      N = [],
      M = Array.prototype.forEach.call.bind(Array.prototype.forEach),
      O = Element.prototype.createShadowRoot;O && (Element.prototype.createShadowRoot = function () {
    var e = O.call(this);return window.CustomElements.watchShadow(this), e;
  }), e.watchShadow = f, e.upgradeDocumentTree = h, e.upgradeDocument = v, e.upgradeSubtree = o, e.upgradeAll = t, e.attached = a, e.takeRecords = w;
}), window.CustomElements.addModule(function (e) {
  function t(t, o) {
    if ("template" === t.localName && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(t), !t.__upgraded__ && t.nodeType === Node.ELEMENT_NODE) {
      var r = t.getAttribute("is"),
          i = e.getRegisteredDefinition(t.localName) || e.getRegisteredDefinition(r);if (i && (r && i.tag == t.localName || !r && !i["extends"])) return n(t, i, o);
    }
  }function n(t, n, r) {
    return a.upgrade && console.group("upgrade:", t.localName), n.is && t.setAttribute("is", n.is), o(t, n), t.__upgraded__ = !0, i(t), r && e.attached(t), e.upgradeSubtree(t, r), a.upgrade && console.groupEnd(), t;
  }function o(e, t) {
    Object.__proto__ ? e.__proto__ = t.prototype : (r(e, t.prototype, t["native"]), e.__proto__ = t.prototype);
  }function r(e, t, n) {
    for (var o = {}, r = t; r !== n && r !== HTMLElement.prototype;) {
      for (var i, a = Object.getOwnPropertyNames(r), d = 0; i = a[d]; d++) {
        o[i] || (Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i)), o[i] = 1);
      }r = Object.getPrototypeOf(r);
    }
  }function i(e) {
    e.createdCallback && e.createdCallback();
  }var a = e.flags;e.upgrade = t, e.upgradeWithDefinition = n, e.implementPrototype = o;
}), window.CustomElements.addModule(function (e) {
  function t(t, o) {
    var s = o || {};if (!t) throw new Error("document.registerElement: first argument `name` must not be empty");if (t.indexOf("-") < 0) throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(t) + "'.");if (r(t)) throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(t) + "'. The type name is invalid.");if (u(t)) throw new Error("DuplicateDefinitionError: a type with name '" + String(t) + "' is already registered");return s.prototype || (s.prototype = Object.create(HTMLElement.prototype)), s.__name = t.toLowerCase(), s["extends"] && (s["extends"] = s["extends"].toLowerCase()), s.lifecycle = s.lifecycle || {}, s.ancestry = i(s["extends"]), a(s), d(s), n(s.prototype), c(s.__name, s), s.ctor = l(s), s.ctor.prototype = s.prototype, s.prototype.constructor = s.ctor, e.ready && v(document), s.ctor;
  }function n(e) {
    if (!e.setAttribute._polyfilled) {
      var t = e.setAttribute;e.setAttribute = function (e, n) {
        o.call(this, e, n, t);
      };var n = e.removeAttribute;e.removeAttribute = function (e) {
        o.call(this, e, null, n);
      }, e.setAttribute._polyfilled = !0;
    }
  }function o(e, t, n) {
    e = e.toLowerCase();var o = this.getAttribute(e);n.apply(this, arguments);var r = this.getAttribute(e);this.attributeChangedCallback && r !== o && this.attributeChangedCallback(e, o, r);
  }function r(e) {
    for (var t = 0; t < _.length; t++) {
      if (e === _[t]) return !0;
    }
  }function i(e) {
    var t = u(e);return t ? i(t["extends"]).concat([t]) : [];
  }function a(e) {
    for (var t, n = e["extends"], o = 0; t = e.ancestry[o]; o++) {
      n = t.is && t.tag;
    }e.tag = n || e.__name, n && (e.is = e.__name);
  }function d(e) {
    if (!Object.__proto__) {
      var t = HTMLElement.prototype;if (e.is) {
        var n = document.createElement(e.tag);t = Object.getPrototypeOf(n);
      }for (var o, r = e.prototype, i = !1; r;) {
        r == t && (i = !0), o = Object.getPrototypeOf(r), o && (r.__proto__ = o), r = o;
      }i || console.warn(e.tag + " prototype not found in prototype chain for " + e.is), e["native"] = t;
    }
  }function s(e) {
    return g(M(e.tag), e);
  }function u(e) {
    if (e) return y[e.toLowerCase()];
  }function c(e, t) {
    y[e] = t;
  }function l(e) {
    return function () {
      return s(e);
    };
  }function f(e, t, n) {
    return e === N ? p(t, n) : O(e, t);
  }function p(e, t) {
    e && (e = e.toLowerCase()), t && (t = t.toLowerCase());var n = u(t || e);if (n) {
      if (e == n.tag && t == n.is) return new n.ctor();if (!t && !n.is) return new n.ctor();
    }var o;return t ? (o = p(e), o.setAttribute("is", t), o) : (o = M(e), e.indexOf("-") >= 0 && b(o, HTMLElement), o);
  }function w(e, t) {
    var n = e[t];e[t] = function () {
      var e = n.apply(this, arguments);return h(e), e;
    };
  }var m,
      v = (e.isIE, e.upgradeDocumentTree),
      h = e.upgradeAll,
      g = e.upgradeWithDefinition,
      b = e.implementPrototype,
      E = e.useNative,
      _ = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"],
      y = {},
      N = "http://www.w3.org/1999/xhtml",
      M = document.createElement.bind(document),
      O = document.createElementNS.bind(document);m = Object.__proto__ || E ? function (e, t) {
    return e instanceof t;
  } : function (e, t) {
    if (e instanceof t) return !0;for (var n = e; n;) {
      if (n === t.prototype) return !0;n = n.__proto__;
    }return !1;
  }, w(Node.prototype, "cloneNode"), w(document, "importNode"), document.registerElement = t, document.createElement = p, document.createElementNS = f, e.registry = y, e["instanceof"] = m, e.reservedTagList = _, e.getRegisteredDefinition = u, document.register = document.registerElement;
}), function (e) {
  function t() {
    i(window.wrap(document)), window.CustomElements.ready = !0;window.requestAnimationFrame || function (e) {
      setTimeout(e, 16);
    };setTimeout(function () {
      window.CustomElements.readyTime = Date.now(), window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime), document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: !0 }));
    });
  }var n = e.useNative,
      o = e.initializeModules;e.isIE;if (n) {
    var r = function r() {};e.watchShadow = r, e.upgrade = r, e.upgradeAll = r, e.upgradeDocumentTree = r, e.upgradeSubtree = r, e.takeRecords = r, e["instanceof"] = function (e, t) {
      return e instanceof t;
    };
  } else o();var i = e.upgradeDocumentTree,
      a = e.upgradeDocument;if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function (e) {
    return e;
  }), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function (e) {
    e["import"] && a(wrap(e["import"]));
  }), "complete" === document.readyState || e.flags.eager) t();else if ("interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
    var d = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";window.addEventListener(d, t);
  } else t();
}(window.CustomElements);

},{}],9:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  'use strict';
  var f,
      h = function h(a, b) {
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);for (; b && a != b;) {
      b = b.parentNode;
    }return b == a;
  },
      k = function k(a) {
    return "gwd-page" == a.tagName.toLowerCase() || "gwd-page" == a.getAttribute("is");
  },
      l = function l(a) {
    if (k(a)) return a;for (; a && 9 != a.nodeType;) {
      if ((a = a.parentElement) && k(a)) return a;
    }return null;
  };function m() {
    this.v = {};
  }m.prototype.add = function (a, b) {
    a = "string" == typeof a ? a : a.getString();this.v[a] || (this.v[a] = []);this.v[a].push(b);
  };var n = function n(a) {
    var b = [],
        c = "object" == (typeof gwd === "undefined" ? "undefined" : _typeof(gwd)) && "GwdId" in gwd,
        d;for (d in a.v) {
      b.push(c ? new gwd.GwdId(d) : d);
    }return b;
  },
      p = function p(a, b) {
    return b ? a.v["string" == typeof b ? b : b.getString()] || [] : [];
  };function q(a, b) {
    this.i = a;this.W = b;this.F = this.J.bind(this);
  }q.prototype.observe = function (a) {
    if (a.nodeType == Node.ELEMENT_NODE) for (var b = n(this.i), c = 0; c < b.length; c++) {
      var d = r(b[c]);if (d && h(a, d)) {
        var e = p(this.i, b[c]);e && e.forEach(function (a) {
          d.addEventListener(a.event, this.F, !1);
        }.bind(this));
      }
    }
  };var t = function t(a, b) {
    if (b.nodeType == Node.ELEMENT_NODE) for (var c = n(a.i), d = 0; d < c.length; d++) {
      var e = r(c[d]);if (e && h(b, e)) {
        var g = p(a.i, c[d]);g && g.forEach(function (a) {
          e.removeEventListener(a.event, this.F, !1);
        }.bind(a));
      }
    }
  };
  q.prototype.J = function (a) {
    this.W(a);
  };var r = function r(a) {
    return "string" == typeof a ? document.getElementById(a) : a.getElement(document);
  };document.registerElement("gwd-exit");document.registerElement("gwd-metric-event");document.registerElement("gwd-metric-configuration");document.registerElement("gwd-timer");var u = function u(a, b, c) {
    if (c) {
      var d = document.createEvent("CustomEvent");d.initCustomEvent(a, !0, !0, c);
    } else d = document.createEvent("Event"), d.initEvent(a, !0, !0);b.dispatchEvent(d);return d;
  };var w = function w() {};goog.inherits(w, HTMLElement);f = w.prototype;
  f.createdCallback = function () {
    document.body.style.opacity = "1";this.P = this.ba.bind(this);this.H = this.da.bind(this);this.R = this.ca.bind(this);this.B = this.aa.bind(this);this.A = this.Z.bind(this);this.C = u.bind(null, "expandfinish", this);this.w = u.bind(null, "collapsefinish", this);this.O = this.$.bind(this);this.F = this.J.bind(this);this.T = this.ea.bind(this);this.V = this.fa.bind(this);this.c = this.h = null;this.s = this.u = !1;this.K = [];this.o = !1;this.L = this.hasAttribute("fullscreen");this.m = null;this.D = this.j = !1;this.G = window.innerHeight >= window.innerWidth ? 1 : 2;this.g = this.b = null;
  };
  f.attachedCallback = function () {
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, this.B);Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, this.A);Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, this.B);Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, this.A);Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, this.C);Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, this.w);Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, this.C);Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, this.w);Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_DIMENSIONS, this.O);this.a = this.querySelector("gwd-pagedeck") || this.querySelector("[is=gwd-pagedeck]");this.a.addEventListener("pagetransitionend", this.T, !1);this.b = document.getElementById(this.getAttribute("data-provider"));this.g = document.querySelector("gwd-data-binder");var a = this.querySelector("gwd-metric-configuration"),
        b = new m();if (a) {
      a = Array.prototype.slice.call(a.getElementsByTagName("gwd-metric-event"));
      for (var c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.getAttribute("source");if (e) {
          var g = d.getAttribute("exit");d = { event: d.getAttribute("event"), ga: d.getAttribute("metric") || g, X: d.hasAttribute("cumulative"), exit: g };b.add(x(e), d);
        }
      }
    }this.i = b;this.S = new q(this.i, this.F);window.addEventListener("resize", this.V, !1);
  };
  f.detachedCallback = function () {
    Enabler.removeEventListener(studio.events.StudioEvent.INIT, this.P);Enabler.removeEventListener(studio.events.StudioEvent.VISIBLE, this.H);Enabler.removeEventListener(studio.events.StudioEvent.PAGE_LOADED, this.R);Enabler.removeEventListener(studio.events.StudioEvent.EXPAND_START, this.B);Enabler.removeEventListener(studio.events.StudioEvent.COLLAPSE_START, this.A);Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, this.B);Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, this.A);Enabler.removeEventListener(studio.events.StudioEvent.EXPAND_FINISH, this.C);Enabler.removeEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, this.w);Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, this.C);Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, this.w);Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_DIMENSIONS, this.O);this.a.removeEventListener("pagetransitionend", this.T, !1);window.removeEventListener("resize", this.V, !1);this.b && this.h && this.b.removeEventListener("ready", this.h);this.g && this.c && this.g.removeEventListener("bindingfinished", this.c);
  };f.initAd = function () {
    this.o = !1;var a = this.P;Enabler.removeEventListener(studio.events.StudioEvent.INIT, a);Enabler.addEventListener(studio.events.StudioEvent.INIT, a);Enabler.isInitialized() && a();
  };f.exit = function (a, b, c, d, e) {
    Enabler.exit(a, b);("undefined" == typeof d || d) && y(this);c && this.goToPage(e);
  };
  f.exitOverride = function (a, b, c, d, e) {
    Enabler.exitOverride(a, b);("undefined" == typeof d || d) && y(this);c && this.goToPage(e);
  };f.incrementCounter = function (a, b) {
    Enabler.counter(a, b);
  };f.startTimer = function (a) {
    Enabler.startTimer(a);
  };f.stopTimer = function (a) {
    Enabler.stopTimer(a);
  };f.reportManualClose = function () {
    Enabler.reportManualClose();
  };
  f.J = function (a) {
    var b = a.target,
        c = x(b),
        d = c + ": " + a.type;a: {
      var e = p(this.i, c);for (var g = 0; g < e.length; g++) {
        if (e[g].event == a.type) {
          e = e[g];break a;
        }
      }e = void 0;
    }e.exit && a.detail && a.detail.url ? (d = c + ": " + e.exit, a.detail["exit-id"] && (d = a.detail["exit-id"]), b = "", null != a.detail["product-index"] && (b = a.detail["product-index"]), this.b && "dynamic_remarketing" == this.b.getAttribute("gwd-schema-id") ? (c = a.detail["action-event"], e = {}, c && (e.clickX = c.clientX || c.changedTouches[0].clientX, e.clickY = c.clientY || c.changedTouches[0].clientY), Enabler.dynamicExit(d, a.detail.url, b, void 0, e)) : Enabler.exitOverride(d, a.detail.url), a.detail.handled = !0, a.detail.collapse && this.goToPage()) : (a = l(b)) && a.gwdIsActive() && this.incrementCounter(e.ga || d, e.X);
  };
  f.ba = function () {
    var a = function () {
      if (this.hasAttribute("polite-load")) {
        var a = this.R;Enabler.isPageLoaded() ? a() : Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, a);
      } else a = this.H, Enabler.isVisible() ? a() : Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, a);
    }.bind(this);if (this.L) {
      var b = function (c) {
        (this.m = !!c.supported) && u("fullscreensupport", this);Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_SUPPORT, b);a();
      }.bind(this);Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_SUPPORT, b);Enabler.queryFullscreenSupport();
    } else a();
  };f.da = function (a) {
    if (this.o) this.b && this.N(null);else {
      var b;a && (b = a.detail);var c = this.ia.bind(this, b);this.b && (c = this.Y.bind(this, c));if (this.L) {
        Enabler.setResponsiveExpanding(!0);var d = function (a) {
          this.D = a;c();
        }.bind(this);Enabler.loadModule(studio.module.ModuleId.GDN, function () {
          var a = studio.sdk.gdn.getConfig();a.isInCreativeToolsetContext() ? a.isInterstitial(d) : c();
        });
      } else c();
    }
  };
  f.ca = function () {
    var a = this.H;Enabler.isVisible() ? a() : Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, a);
  };f.Y = function (a) {
    this.b ? (this.h && this.b.removeEventListener("ready", this.h), this.h = this.N.bind(this, a), this.b.isDataLoaded() && this.h(), this.b.addEventListener("ready", this.h)) : a();
  };
  f.N = function (a) {
    var b = !!a;if (this.g) {
      this.c && (this.g.removeEventListener("bindingfinished", this.c), this.c = null);var c = this.b.getData();c && (b = this.a.getElementsBySelector("*"), b = b.concat(this.a.getPages()), this.g.bindData(c, b) ? this.U(a) : (this.c = this.U.bind(this, a), this.g.addEventListener("bindingfinished", this.c)), b = !1);
    }b && a();
  };
  f.U = function (a) {
    this.c && (this.g.removeEventListener("bindingfinished", this.c), this.c = null);if (this.o) {
      var b = document.getElementsByTagName("gwd-text-helper");0 < b.length && b[0].refitAll();
    }a && a();
  };f.ia = function (a) {
    this.o || (this.o = !0, document.body.style.opacity = "", u("adinitialized", this, a), this.D ? (a = this.a.getPage(this.a.findPageIndexByAttributeValue("expanded", !0)), this.goToPage(a.id)) : this.goToPage());
  };
  f.goToPage = function (a, b, c, d, e) {
    var g = this.a.getPage(this.a.currentIndex);if (a = a ? this.a.getPage(a) : this.a.getDefaultPage()) {
      var v = !!g && !!a && !this.u && !this.D && !g.hasAttribute("expanded") && a.hasAttribute("expanded");g = !!g && !!a && !this.s && !this.D && g.hasAttribute("expanded") && !a.hasAttribute("expanded");v && this.s || g && this.u || ((this.f = a.id, b && (this.l = { transition: b, duration: c, easing: d, direction: e }), v) ? this.L && !1 !== this.m ? this.m && (this.j = !0, Enabler.requestFullscreenExpand()) : Enabler.requestExpand() : g ? this.j ? Enabler.requestFullscreenCollapse() : Enabler.requestCollapse() : (this.s = this.u = !1, this.I()));
    }
  };f.aa = function () {
    u("expandstart", this);this.m ? (this.j = !0, Enabler.finishFullscreenExpand()) : Enabler.finishExpand();if (!this.f) {
      var a = this.a.getPage(this.a.findPageIndexByAttributeValue("expanded", !0));a && (this.f = a.id);
    }a = this.a.getPage(this.a.currentIndex);this.u = !!a && this.f != a.id;setTimeout(this.I.bind(this), 30);
  };
  f.Z = function () {
    u("collapsestart", this);this.j ? (Enabler.finishFullscreenCollapse(), this.j = !1) : Enabler.finishCollapse();this.f || (this.reportManualClose(), this.f = this.a.getDefaultPage().id);var a = this.a.getPage(this.a.currentIndex);this.s = !!a && this.f != a.id;setTimeout(this.I.bind(this), 30);
  };f.fa = function () {
    if (!this.f) {
      var a = window.innerHeight >= window.innerWidth ? 1 : 2;this.G != a && (this.G = a, (a = this.a.getPage(this.a.currentIndex)) && setTimeout(this.goToPage.bind(this, a.id), 0));
    }
  };
  f.$ = function (a) {
    a && Enabler.setResponsiveSize(a.width, a.height);
  };f.I = function () {
    if (this.f) {
      this.G = window.innerHeight >= window.innerWidth ? 1 : 2;var a = this.a.getOrientationSpecificPage(this.G, this.f);this.l ? this.a.goToPage(a.id, this.l.transition, this.l.duration, this.l.easing, this.l.direction) : this.a.goToPage(a.id);this.j && a.classList.add("fs");
    }this.l = this.f = void 0;
  };
  f.ea = function (a) {
    this.s = this.u = !1;if (a.target == this.a) {
      var b = a.detail;a = b.outgoingPage;b = b.incomingPage;if (a && (t(this.S, a), (a = a.querySelectorAll("video, gwd-video")) && 0 < a.length)) for (this.M = []; this.K.length;) {
        studio.video.Reporter.detach(this.K.shift());
      }this.S.observe(b);if ((a = b.querySelectorAll("video, gwd-video")) && 0 < a.length) {
        b = studio.video && studio.video.Reporter;var c = this.ha.bind(this);this.M = Array.prototype.slice.call(a);b ? c() : Enabler.loadModule(studio.module.ModuleId.VIDEO, c);
      }
    }
  };
  f.ha = function () {
    for (var a, b; this.M.length;) {
      if (b = this.M.shift(), a = x(b)) studio.video.Reporter.attach(a, "gwd-video" == b.tagName.toLowerCase() ? b.nativeElement : b, b.autoplay), this.K.push(a);
    }
  };var x = function x(a) {
    return "object" == (typeof gwd === "undefined" ? "undefined" : _typeof(gwd)) && "GwdId" in gwd ? new gwd.GwdId(a).getString() : "string" == typeof a ? a : a.id;
  },
      y = function y(a) {
    Array.prototype.slice.call(a.a.querySelectorAll("video, gwd-video, gwd-youtube, gwd-audio, audio")).forEach(function (a) {
      a.pause();
    });
  };w.prototype.attributeChangedCallback = function () {};
  document.registerElement("gwd-google-ad", { prototype: w.prototype });
}).call(undefined);

},{}],10:[function(require,module,exports){
"use strict";

(function () {
  'use strict';
  var c = function c(a) {
    return "gwd-page" == a.tagName.toLowerCase() || "gwd-page" == a.getAttribute("is");
  },
      f = function f(a) {
    if (c(a)) return a;for (; a && 9 != a.nodeType;) {
      if ((a = a.parentElement) && c(a)) return a;
    }return null;
  },
      g = function g(a, b, d) {
    var e = e || b;a.hasAttribute(b) ? (a = a.getAttribute(b), d.setAttribute(e, a)) : d.removeAttribute(e);
  };var h = ["height", "width", "alt"];var k = function k() {};goog.inherits(k, HTMLElement);
  k.prototype.createdCallback = function () {
    for (var a; a = this.firstChild;) {
      this.removeChild(a);
    }this.a = document.createElement("img");this.g = this.h.bind(this);this.b = 0;this.c = this.f = -1;Object.defineProperty(this, "nativeElement", { enumerable: !0, get: function get() {
        return this.a;
      } });Object.defineProperty(this, "assetWidth", { enumerable: !0, get: function get() {
        return this.f;
      } });Object.defineProperty(this, "assetHeight", { enumerable: !0, get: function get() {
        return this.c;
      } });Object.defineProperty(this, "naturalWidth", { enumerable: !0, get: function get() {
        return this.a.naturalWidth;
      } });
    Object.defineProperty(this, "naturalHeight", { enumerable: !0, get: function get() {
        return this.a.naturalHeight;
      } });Object.defineProperty(this, "height", { enumerable: !0, get: function get() {
        return this.a.height;
      }, set: function set(a) {
        this.a.height = a;
      } });Object.defineProperty(this, "width", { enumerable: !0, get: function get() {
        return this.a.width;
      }, set: function set(a) {
        this.a.width = a;
      } });Object.defineProperty(this, "alt", { enumerable: !0, get: function get() {
        return this.a.alt;
      }, set: function set(a) {
        this.a.alt = a;
      } });Object.defineProperty(this, "src", { enumerable: !0,
      get: function get() {
        return this.a.src;
      } });a = document.createElement("div");a.classList.add("intermediate-element");a.appendChild(this.a);this.appendChild(a);if (a = this.getAttribute("src")) this.setAttribute("source", a), this.removeAttribute("src");this.a.addEventListener("load", this.g, !1);this.a.addEventListener("error", this.g, !1);for (a = 0; a < h.length; a++) {
      g(this, h[a], this.a);
    }
  };
  k.prototype.attachedCallback = function () {
    if ("function" == typeof this.gwdLoad && "function" == typeof this.gwdIsLoaded && !this.gwdIsLoaded()) {
      var a = f(this),
          b = a && "function" == typeof a.gwdIsLoaded;(!a || b && a.gwdIsLoaded()) && this.gwdLoad();
    }
  };k.prototype.gwdIsLoaded = function () {
    return 2 == this.b || 3 == this.b;
  };k.prototype.gwdLoad = function () {
    this.b = 1;this.c = this.f = -1;var a = this.getAttribute("source") || "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";this.a.setAttribute("src", a);
  };
  k.prototype.h = function (a) {
    2 != this.b && (a && "error" == a.type ? (this.b = 3, this.c = this.f = -1, this.a.style.backgroundImage = "") : (-1 != this.f && -1 != this.c || !this.getAttribute("source") || (this.f = this.naturalWidth, this.c = this.naturalHeight), this.b = 2), l(this), m(this), a = document.createEvent("Event"), a.initEvent("ready", !0, !0), this.dispatchEvent(a));
  };
  var m = function m(a) {
    if (2 == a.b) {
      var b = a.getAttribute("source"),
          d = a.getAttribute("scaling") || "stretch";"stretch" == d ? (a.classList.remove("scaled-proportionally"), a.a.style.backgroundImage = "", a = a.a, b = b || "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", b != a.getAttribute("src") && a.setAttribute("src", b)) : (a.classList.add("scaled-proportionally"), a.a.style.backgroundImage = b ? "url(" + JSON.stringify(b) + ")" : "", a.a.style.backgroundSize = "none" != d ? d : "auto", b = a.a, "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" != b.getAttribute("src") && b.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="));
    }
  },
      l = function l(a) {
    var b = a.getAttribute("alignment") || "center";a.a.style.backgroundPosition = b;
  };k.prototype.attributeChangedCallback = function (a) {
    "source" == a ? 0 !== this.b && this.gwdLoad() : "scaling" == a ? m(this) : "alignment" == a ? l(this) : "alt" == a && g(this, a, this.a);
  };document.registerElement("gwd-image", { prototype: k.prototype });
}).call(undefined);

},{}],11:[function(require,module,exports){
"use strict";

(function () {
  'use strict';
  var c;var d = function d(a, f) {
    var b = document.createEvent("Event");b.initEvent(a, !0, !0);f.dispatchEvent(b);
  };var e = function e() {};goog.inherits(e, HTMLElement);c = e.prototype;c.createdCallback = function () {
    this.h = this.i.bind(this);this.a = [];this.g = this.b = this.f = !1;var a = parseInt(this.getAttribute("data-gwd-width"), 10) || this.clientWidth;this.j = (parseInt(this.getAttribute("data-gwd-height"), 10) || this.clientHeight) >= a;this.c = !1;
  };
  c.attachedCallback = function () {
    this.addEventListener("ready", this.h, !1);setTimeout(function () {
      this.a = Array.prototype.slice.call(this.querySelectorAll("*")).filter(function (a) {
        return "function" != typeof a.gwdLoad || "function" != typeof a.gwdIsLoaded || a.gwdIsLoaded() ? !1 : !0;
      }, this);this.g = !0;0 < this.a.length ? (this.style.visibility = "hidden", this.f = !1) : g(this);this.b = !0;d("attached", this);
    }.bind(this), 0);
  };
  c.detachedCallback = function () {
    this.removeEventListener("ready", this.h, !1);this.classList.remove("gwd-play-animation");d("detached", this);
  };c.gwdActivate = function () {
    this.classList.remove("gwd-inactive");Array.prototype.slice.call(this.querySelectorAll("*")).forEach(function (a) {
      "function" == typeof a.gwdActivate && "function" == typeof a.gwdIsActive && 0 == a.gwdIsActive() && a.gwdActivate();
    });this.c = !0;this.b ? this.b = !1 : d("attached", this);d("pageactivated", this);
  };
  c.gwdDeactivate = function () {
    this.classList.add("gwd-inactive");this.classList.remove("gwd-play-animation");var a = Array.prototype.slice.call(this.querySelectorAll("*"));a.push(this);for (var f = 0; f < a.length; f++) {
      var b = a[f];if (b.classList && (b.classList.remove("gwd-pause-animation"), b.hasAttribute("data-gwd-current-label"))) {
        var h = b.getAttribute("data-gwd-current-label");b.classList.remove(h);b.removeAttribute("data-gwd-current-label");
      }delete b.gwdGotoCounters;b != this && "function" == typeof b.gwdDeactivate && "function" == typeof b.gwdIsActive && 1 == b.gwdIsActive() && b.gwdDeactivate();
    }this.c = !1;d("pagedeactivated", this);d("detached", this);
  };c.gwdIsActive = function () {
    return this.c;
  };c.gwdIsLoaded = function () {
    return this.g && 0 == this.a.length;
  };c.gwdLoad = function () {
    if (this.gwdIsLoaded()) g(this);else for (var a = this.a.length - 1; 0 <= a; a--) {
      this.a[a].gwdLoad();
    }
  };c.i = function (a) {
    a = this.a.indexOf(a.target);0 <= a && (this.a.splice(a, 1), 0 == this.a.length && g(this));
  };
  var g = function g(a) {
    a.style.visibility = "";a.f || (d("ready", a), d("pageload", a));a.f = !0;
  };e.prototype.gwdPresent = function () {
    d("pagepresenting", this);this.classList.add("gwd-play-animation");
  };e.prototype.isPortrait = function () {
    return this.j;
  };e.prototype.attributeChangedCallback = function () {};document.registerElement("gwd-page", { prototype: e.prototype });
}).call(undefined);

},{}],12:[function(require,module,exports){
"use strict";

(function () {
  'use strict';
  var g;var l = ["-ms-", "-moz-", "-webkit-", ""],
      m = function m(a, c) {
    for (var b, d, e = 0; e < l.length; ++e) {
      b = l[e] + "transition-duration", d = "" + c, a.style.setProperty(b, d);
    }
  };function n(a, c, b, d, e, h, f) {
    this.j = a;this.f = c;this.w = b;a = d || "none";this.l = e = "none" === a ? 0 : e || 1E3;this.g = h || "linear";this.i = [];if (e) {
      h = f || "top";if (f = this.j) {
        f.classList.add("gwd-page");f.classList.add("center");f = "center";if ("push" == a) switch (h) {case "top":
            f = "top";break;case "bottom":
            f = "bottom";break;case "left":
            f = "left";break;case "right":
            f = "right";}this.i.push(f);"fade" == a && this.i.push("transparent");
      }f = this.f;e = "center";if ("none" != a && "fade" != a) switch (h) {case "top":
          e = "bottom";break;case "bottom":
          e = "top";
          break;case "left":
          e = "right";break;case "right":
          e = "left";}f.classList.add(e);f.classList.add("gwd-page");"fade" == a && f.classList.add("transparent");
    }
  }n.prototype.start = function () {
    if (this.l) {
      var a = this.j,
          c = this.f;p(c, this.J.bind(this));a && (m(a, this.l + "ms"), a.classList.add(this.g));m(c, this.l + "ms");c.classList.add(this.g);c.setAttribute("gwd-reflow", c.offsetWidth);if (a) for (var b = 0; b < this.i.length; ++b) {
        a.classList.add(this.i[b]);
      }q(c);
    } else this.w();
  };
  var r = function r(a, c, b, d) {
    b = "transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + b + "," + d + ",0,1);";return a + "." + c + "{-webkit-" + b + "-moz-" + b + "-ms-" + b + b + "}";
  },
      t = "center top bottom left right transparent".split(" "),
      q = function q(a) {
    t.forEach(function (c) {
      a.classList.remove(c);
    });
  },
      p = function p(a, c) {
    var b = function b() {
      a.removeEventListener("webkitTransitionEnd", b);a.removeEventListener("transitionend", b);c();
    };a.addEventListener("webkitTransitionEnd", b);a.addEventListener("transitionend", b);
  };
  n.prototype.J = function () {
    var a = this.j;a && (q(a), m(a, 0), a.classList.remove(this.g));m(this.f, 0);this.f.classList.remove(this.g);this.w();
  };var u = function u(a, c, b) {
    if (b) {
      var d = document.createEvent("CustomEvent");d.initCustomEvent(a, !0, !0, b);
    } else d = document.createEvent("Event"), d.initEvent(a, !0, !0);c.dispatchEvent(d);
  },
      w = function w(a, c) {
    var b = function b(d) {
      a.removeEventListener("attached", b);c(d);
    };a.addEventListener("attached", b);
  };var x = function x() {};goog.inherits(x, HTMLElement);x.prototype.createdCallback = function () {
    window.addEventListener("WebComponentsReady", this.I.bind(this), !1);this.u = this.h.bind(this, "shake");this.v = this.h.bind(this, "tilt");this.s = this.h.bind(this, "rotatetoportrait");this.o = this.h.bind(this, "rotatetolandscape");this.a = [];this.A = this.H.bind(this);this.D = this.F.bind(this);this.c = this.B = null;this.b = -1;this.m = !1;this.classList.add("gwd-pagedeck");Object.defineProperty(this, "currentIndex", { enumerable: !0, get: this.G.bind(this) });
  };
  x.prototype.I = function () {
    this.a = Array.prototype.slice.call(this.querySelectorAll("gwd-page"));this.a.forEach(function (a) {
      a.classList.add("gwd-page");
    });for (u("beforepagesdetached", this, { pages: this.a.slice() }); this.firstChild;) {
      this.removeChild(this.firstChild);
    }-1 == this.b && void 0 !== this.C && this.goToPage(this.C);
  };
  x.prototype.attachedCallback = function () {
    if (!this.B) {
      var a = this.id;var c = this.offsetWidth;var b = this.offsetHeight;a = (a && "#") + a + ".gwd-pagedeck > .gwd-page";c = r(a, "center", 0, 0) + r(a, "top", 0, b) + r(a, "bottom", 0, -b) + r(a, "left", c, 0) + r(a, "right", -c, 0);b = document.createElement("style");void 0 !== b.cssText ? b.cssText = c : (b.type = "text/css", b.innerText = c);document.head.appendChild(b);this.B = b;
    }this.addEventListener("pageload", this.A, !1);document.body.addEventListener("shake", this.u, !0);document.body.addEventListener("tilt", this.v, !0);document.body.addEventListener("rotatetoportrait", this.s, !0);document.body.addEventListener("rotatetolandscape", this.o, !0);
  };x.prototype.detachedCallback = function () {
    this.removeEventListener("pageload", this.A, !1);document.body && (document.body.removeEventListener("shake", this.u, !0), document.body.removeEventListener("tilt", this.v, !0), document.body.removeEventListener("rotatetoportrait", this.s, !0), document.body.removeEventListener("rotatetolandscape", this.o, !0));
  };
  var z = function z(a, c, b, d, e, h) {
    if (!(a.b == c || 0 > c || c > a.a.length - 1 || a.c)) {
      var f = a.a[a.b],
          k = a.a[c];a.b = c;a.c = new n(f, k, a.D, b, d, e, h);var v = k.gwdLoad && !k.gwdIsLoaded();a.m = v;w(k, function () {
        k.gwdActivate();v ? k.gwdLoad() : y(this);
      }.bind(a));a.appendChild(k);
    }
  };x.prototype.H = function (a) {
    this.m && a.target.parentNode == this && (y(this), this.m = !1);
  };var y = function y(a) {
    u("pagetransitionstart", a);a.c.start();
  };g = x.prototype;
  g.F = function () {
    if (this.c) {
      var a = this.c.j,
          c = this.c.f;this.c = null;u("pagetransitionend", this, { outgoingPage: a ? a : null, incomingPage: c });a && a.gwdDeactivate();c.gwdPresent();
    }
  };g.findPageIndexByAttributeValue = function (a, c) {
    for (var b = this.a.length, d, e = 0; e < b; e++) {
      if (d = this.a[e], "boolean" == typeof c) {
        if (d.hasAttribute(a)) return e;
      } else if (d.getAttribute(a) == c) return e;
    }return -1;
  };g.goToNextPage = function (a, c, b, d, e) {
    var h = this.b,
        f = h + 1;f >= this.a.length && (f = a ? 0 : h);z(this, f, c, b, d, e);
  };
  g.goToPreviousPage = function (a, c, b, d, e) {
    var h = this.b,
        f = this.a.length,
        k = h - 1;0 > k && (k = a ? f - 1 : h);z(this, k, c, b, d, e);
  };g.goToPage = function (a, c, b, d, e) {
    this.a.length ? (a = "number" == typeof a ? a : this.findPageIndexByAttributeValue("id", a), 0 <= a && z(this, a, c, b, d, e)) : this.C = a;
  };g.G = function () {
    return 0 <= this.b ? this.b : void 0;
  };g.getPages = function () {
    return this.a;
  };g.getPage = function (a) {
    if ("number" != typeof a) {
      if (!a) return null;a = this.findPageIndexByAttributeValue("id", a);
    }return 0 > a || a > this.a.length - 1 ? null : this.a[a];
  };
  g.getCurrentPage = function () {
    return this.getPage(this.b);
  };g.getDefaultPage = function () {
    var a = this.getAttribute("default-page");return a ? this.getPage(this.findPageIndexByAttributeValue("id", a)) : this.getPage(0);
  };g.getOrientationSpecificPage = function (a, c) {
    c = this.getPage(c);var b = c.getAttribute("alt-orientation-page");if (!b) return c;var d = c.isPortrait();a = 1 == a;b = this.getPage(b);return a == d ? c : b;
  };g.h = function (a, c) {
    if (c.target == document.body) {
      var b = this.getPage(this.b);u(a, b, c.detail);
    }
  };
  g.getElementById = function (a) {
    for (var c = this.a.length, b = 0; b < c; b++) {
      var d = this.a[b].querySelector("#" + a);if (d) return d;
    }return null;
  };g.getElementsBySelector = function (a) {
    for (var c = this.a.length, b = [], d = 0; d < c; d++) {
      var e = this.a[d].querySelectorAll(a);e && (b = b.concat(Array.prototype.slice.call(e)));
    }return b;
  };g.attributeChangedCallback = function () {};document.registerElement("gwd-pagedeck", { prototype: x.prototype });
}).call(undefined);

},{}],13:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! iScroll v5.2.0-snapshot ~ (c) 2008-2017 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
	var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};

	var utils = function () {
		var me = {};

		var _elementStyle = document.createElement('div').style;
		var _vendor = function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			    transform,
			    i = 0,
			    l = vendors.length;

			for (; i < l; i++) {
				transform = vendors[i] + 'ransform';
				if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
			}

			return false;
		}();

		function _prefixStyle(style) {
			if (_vendor === false) return false;
			if (_vendor === '') return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}

		me.getTime = Date.now || function getTime() {
			return new Date().getTime();
		};

		me.extend = function (target, obj) {
			for (var i in obj) {
				target[i] = obj[i];
			}
		};

		me.addEvent = function (el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		};

		me.removeEvent = function (el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		};

		me.prefixPointerEvent = function (pointerEvent) {
			return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent;
		};

		me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
			    speed = Math.abs(distance) / time,
			    destination,
			    duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;

			destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;

			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		};

		var _transform = _prefixStyle('transform');

		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
			hasTransition: _prefixStyle('transition') in _elementStyle
		});

		/*
  This should find all Android browsers lower than build 535.19 (both stock browser and webview)
  - galaxy S2 is ok
     - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
     - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
    - galaxy S3 is badAndroid (stock brower, webview)
      `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
    - galaxy S4 is badAndroid (stock brower, webview)
      `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
    - galaxy S5 is OK
      `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
    - galaxy S6 is OK
      `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
   */
		me.isBadAndroid = function () {
			var appVersion = window.navigator.appVersion;
			// Android browser is not a chrome browser.
			if (/Android/.test(appVersion) && !/Chrome\/\d/.test(appVersion)) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if (safariVersion && (typeof safariVersion === 'undefined' ? 'undefined' : _typeof(safariVersion)) === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19;
				} else {
					return true;
				}
			} else {
				return false;
			}
		}();

		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin'),
			touchAction: _prefixStyle('touchAction')
		});

		me.hasClass = function (e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};

		me.addClass = function (e, c) {
			if (me.hasClass(e, c)) {
				return;
			}

			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};

		me.removeClass = function (e, c) {
			if (!me.hasClass(e, c)) {
				return;
			}

			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};

		me.offset = function (el) {
			var left = -el.offsetLeft,
			    top = -el.offsetTop;

			// jshint -W084
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			// jshint +W084

			return {
				left: left,
				top: top
			};
		};

		me.preventDefaultException = function (el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}

			return false;
		};

		me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,

			mousedown: 2,
			mousemove: 2,
			mouseup: 2,

			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,

			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});

		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function fn(k) {
					return k * (2 - k);
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function fn(k) {
					return Math.sqrt(1 - --k * k);
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function fn(k) {
					var b = 4;
					return (k = k - 1) * k * ((b + 1) * k + b) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function fn(k) {
					if ((k /= 1) < 1 / 2.75) {
						return 7.5625 * k * k;
					} else if (k < 2 / 2.75) {
						return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
					} else if (k < 2.5 / 2.75) {
						return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
					} else {
						return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function fn(k) {
					var f = 0.22,
					    e = 0.4;

					if (k === 0) {
						return 0;
					}
					if (k == 1) {
						return 1;
					}

					return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
				}
			}
		});

		me.tap = function (e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev);
		};

		me.click = function (e) {
			var target = e.target,
			    ev;

			if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
				// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
				// initMouseEvent is deprecated.
				ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
				ev.initEvent('click', true, true);
				ev.view = e.view || window;
				ev.detail = 1;
				ev.screenX = target.screenX || 0;
				ev.screenY = target.screenY || 0;
				ev.clientX = target.clientX || 0;
				ev.clientY = target.clientY || 0;
				ev.ctrlKey = !!e.ctrlKey;
				ev.altKey = !!e.altKey;
				ev.shiftKey = !!e.shiftKey;
				ev.metaKey = !!e.metaKey;
				ev.button = 0;
				ev.relatedTarget = null;
				ev._constructed = true;
				target.dispatchEvent(ev);
			}
		};

		me.getTouchAction = function (eventPassthrough, addPinch) {
			var touchAction = 'none';
			if (eventPassthrough === 'vertical') {
				touchAction = 'pan-y';
			} else if (eventPassthrough === 'horizontal') {
				touchAction = 'pan-x';
			}
			if (addPinch && touchAction != 'none') {
				// add pinch-zoom support if the browser supports it, but if not (eg. Chrome <55) do nothing
				touchAction += ' pinch-zoom';
			}
			return touchAction;
		};

		me.getRect = function (el) {
			if (el instanceof SVGElement) {
				var rect = el.getBoundingClientRect();
				return {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height
				};
			} else {
				return {
					top: el.offsetTop,
					left: el.offsetLeft,
					width: el.offsetWidth,
					height: el.offsetHeight
				};
			}
		};

		return me;
	}();
	function IScroll(el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style; // cache style for better performance

		this.options = {

			resizeScrollbars: true,

			mouseWheelSpeed: 20,

			snapThreshold: 0.334,

			// INSERT POINT: OPTIONS
			disablePointer: !utils.hasPointer,
			disableTouch: utils.hasPointer || !utils.hasTouch,
			disableMouse: utils.hasPointer || utils.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,

			bounce: true,
			bounceTime: 600,
			bounceEasing: '',

			preventDefault: true,
			preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof window.onmousedown === "undefined"
		};

		for (var i in options) {
			this.options[i] = options[i];
		}

		// Normalize options
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;

		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

		// If you want eventPassthrough I have to lock one of the axes
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

		// With eventPassthrough we also need lockDirection mechanism
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

		if (this.options.tap === true) {
			this.options.tap = 'tap';
		}

		// https://github.com/cubiq/iscroll/issues/1029
		if (!this.options.useTransition && !this.options.useTransform) {
			if (!/relative|absolute/i.test(this.scrollerStyle.position)) {
				this.scrollerStyle.position = "relative";
			}
		}

		if (this.options.shrinkScrollbars == 'scale') {
			this.options.useTransition = false;
		}

		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

		if (this.options.probeType == 3) {
			this.options.useTransition = false;
		}

		// INSERT POINT: NORMALIZATION

		// Some defaults
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};

		// INSERT POINT: DEFAULTS

		this._init();
		this.refresh();

		this.scrollTo(this.options.startX, this.options.startY);
		this.enable();
	}

	IScroll.prototype = {
		version: '5.2.0-snapshot',

		_init: function _init() {
			this._initEvents();

			if (this.options.scrollbars || this.options.indicators) {
				this._initIndicators();
			}

			if (this.options.mouseWheel) {
				this._initWheel();
			}

			if (this.options.snap) {
				this._initSnap();
			}

			if (this.options.keyBindings) {
				this._initKeys();
			}

			// INSERT POINT: _init
		},

		destroy: function destroy() {
			this._initEvents(true);
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = null;
			this._execEvent('destroy');
		},

		_transitionEnd: function _transitionEnd(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return;
			}

			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				this._execEvent('scrollEnd');
			}
		},

		_start: function _start(e) {
			// React to left mouse button only
			if (utils.eventType[e.type] != 1) {
				// for button property
				// http://unixpapa.com/js/mouse.html
				var button;
				if (!e.which) {
					/* IE case */
					button = e.button < 2 ? 0 : e.button == 4 ? 1 : 2;
				} else {
					/* All others */
					button = e.button;
				}
				if (button !== 0) {
					return;
				}
			}

			if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
				return;
			}

			if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
				e.preventDefault();
			}

			var point = e.touches ? e.touches[0] : e,
			    pos;

			this.initiated = utils.eventType[e.type];
			this.moved = false;
			this.distX = 0;
			this.distY = 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;

			this.startTime = utils.getTime();

			if (this.options.useTransition && this.isInTransition) {
				this._transitionTime();
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd');
			} else if (!this.options.useTransition && this.isAnimating) {
				this.isAnimating = false;
				this._execEvent('scrollEnd');
			}

			this.startX = this.x;
			this.startY = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX = point.pageX;
			this.pointY = point.pageY;

			this._execEvent('beforeScrollStart');
		},

		_move: function _move(e) {
			if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
				return;
			}

			if (this.options.preventDefault) {
				// increases performance on Android? TODO: check!
				e.preventDefault();
			}

			var point = e.touches ? e.touches[0] : e,
			    deltaX = point.pageX - this.pointX,
			    deltaY = point.pageY - this.pointY,
			    timestamp = utils.getTime(),
			    newX,
			    newY,
			    absDistX,
			    absDistY;

			this.pointX = point.pageX;
			this.pointY = point.pageY;

			this.distX += deltaX;
			this.distY += deltaY;
			absDistX = Math.abs(this.distX);
			absDistY = Math.abs(this.distY);

			// We need to move at least 10 pixels for the scrolling to initiate
			if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
				return;
			}

			// If you are scrolling in one direction lock the other
			if (!this.directionLocked && !this.options.freeScroll) {
				if (absDistX > absDistY + this.options.directionLockThreshold) {
					this.directionLocked = 'h'; // lock horizontally
				} else if (absDistY >= absDistX + this.options.directionLockThreshold) {
					this.directionLocked = 'v'; // lock vertically
				} else {
					this.directionLocked = 'n'; // no lock
				}
			}

			if (this.directionLocked == 'h') {
				if (this.options.eventPassthrough == 'vertical') {
					e.preventDefault();
				} else if (this.options.eventPassthrough == 'horizontal') {
					this.initiated = false;
					return;
				}

				deltaY = 0;
			} else if (this.directionLocked == 'v') {
				if (this.options.eventPassthrough == 'horizontal') {
					e.preventDefault();
				} else if (this.options.eventPassthrough == 'vertical') {
					this.initiated = false;
					return;
				}

				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			// Slow down if outside of the boundaries
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

			if (!this.moved) {
				this._execEvent('scrollStart');
			}

			this.moved = true;

			this._translate(newX, newY);

			/* REPLACE START: _move */
			if (timestamp - this.startTime > 300) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;

				if (this.options.probeType == 1) {
					this._execEvent('scroll');
				}
			}

			if (this.options.probeType > 1) {
				this._execEvent('scroll');
			}
			/* REPLACE END: _move */
		},

		_end: function _end(e) {
			if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
				return;
			}

			if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
				e.preventDefault();
			}

			var point = e.changedTouches ? e.changedTouches[0] : e,
			    momentumX,
			    momentumY,
			    duration = utils.getTime() - this.startTime,
			    newX = Math.round(this.x),
			    newY = Math.round(this.y),
			    distanceX = Math.abs(newX - this.startX),
			    distanceY = Math.abs(newY - this.startY),
			    time = 0,
			    easing = '';

			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();

			// reset if we are outside of the boundaries
			if (this.resetPosition(this.options.bounceTime)) {
				return;
			}

			this.scrollTo(newX, newY); // ensures that the last position is rounded

			// we scrolled less than 10 pixels
			if (!this.moved) {
				if (this.options.tap) {
					utils.tap(e, this.options.tap);
				}

				if (this.options.click) {
					utils.click(e);
				}

				this._execEvent('scrollCancel');
				return;
			}

			if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
				this._execEvent('flick');
				return;
			}

			// start momentum animation if needed
			if (this.options.momentum && duration < 300) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1;
			}

			if (this.options.snap) {
				var snap = this._nearestSnap(newX, newY);
				this.currentPage = snap;
				time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
				newX = snap.x;
				newY = snap.y;

				this.directionX = 0;
				this.directionY = 0;
				easing = this.options.bounceEasing;
			}

			// INSERT POINT: _end

			if (newX != this.x || newY != this.y) {
				// change easing function when scroller goes out of the boundaries
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = utils.ease.quadratic;
				}

				this.scrollTo(newX, newY, time, easing);
				return;
			}

			this._execEvent('scrollEnd');
		},

		_resize: function _resize() {
			var that = this;

			clearTimeout(this.resizeTimeout);

			this.resizeTimeout = setTimeout(function () {
				that.refresh();
			}, this.options.resizePolling);
		},

		resetPosition: function resetPosition(time) {
			var x = this.x,
			    y = this.y;

			time = time || 0;

			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0;
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX;
			}

			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0;
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY;
			}

			if (x == this.x && y == this.y) {
				return false;
			}

			this.scrollTo(x, y, time, this.options.bounceEasing);

			return true;
		},

		disable: function disable() {
			this.enabled = false;
		},

		enable: function enable() {
			this.enabled = true;
		},

		refresh: function refresh() {
			utils.getRect(this.wrapper); // Force reflow

			this.wrapperWidth = this.wrapper.clientWidth;
			this.wrapperHeight = this.wrapper.clientHeight;

			var rect = utils.getRect(this.scroller);
			/* REPLACE START: refresh */

			this.scrollerWidth = rect.width;
			this.scrollerHeight = rect.height;

			this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

			/* REPLACE END: refresh */

			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;

			if (utils.hasPointer && !this.options.disablePointer) {
				// The wrapper should have `touchAction` property for using pointerEvent.
				this.wrapper.style[utils.style.touchAction] = utils.getTouchAction(this.options.eventPassthrough, true);

				// case. not support 'pinch-zoom'
				// https://github.com/cubiq/iscroll/issues/1118#issuecomment-270057583
				if (!this.wrapper.style[utils.style.touchAction]) {
					this.wrapper.style[utils.style.touchAction] = utils.getTouchAction(this.options.eventPassthrough, false);
				}
			}
			this.wrapperOffset = utils.offset(this.wrapper);

			this._execEvent('refresh');

			this.resetPosition();

			// INSERT POINT: _refresh
		},

		on: function on(type, fn) {
			if (!this._events[type]) {
				this._events[type] = [];
			}

			this._events[type].push(fn);
		},

		off: function off(type, fn) {
			if (!this._events[type]) {
				return;
			}

			var index = this._events[type].indexOf(fn);

			if (index > -1) {
				this._events[type].splice(index, 1);
			}
		},

		_execEvent: function _execEvent(type) {
			if (!this._events[type]) {
				return;
			}

			var i = 0,
			    l = this._events[type].length;

			if (!l) {
				return;
			}

			for (; i < l; i++) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1));
			}
		},

		scrollBy: function scrollBy(x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;

			this.scrollTo(x, y, time, easing);
		},

		scrollTo: function scrollTo(x, y, time, easing) {
			easing = easing || utils.ease.circular;

			this.isInTransition = this.options.useTransition && time > 0;
			var transitionType = this.options.useTransition && easing.style;
			if (!time || transitionType) {
				if (transitionType) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time);
				}
				this._translate(x, y);
			} else {
				this._animate(x, y, time, easing.fn);
			}
		},

		scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);

			if (!el) {
				return;
			}

			var pos = utils.offset(el);

			pos.left -= this.wrapperOffset.left;
			pos.top -= this.wrapperOffset.top;

			// if offsetX/Y are true we center the element to the screen
			var elRect = utils.getRect(el);
			var wrapperRect = utils.getRect(this.wrapper);
			if (offsetX === true) {
				offsetX = Math.round(elRect.width / 2 - wrapperRect.width / 2);
			}
			if (offsetY === true) {
				offsetY = Math.round(elRect.height / 2 - wrapperRect.height / 2);
			}

			pos.left -= offsetX || 0;
			pos.top -= offsetY || 0;

			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

			this.scrollTo(pos.left, pos.top, time, easing);
		},

		_transitionTime: function _transitionTime(time) {
			if (!this.options.useTransition) {
				return;
			}
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return;
			}

			this.scrollerStyle[durationProp] = time + 'ms';

			if (!time && utils.isBadAndroid) {
				this.scrollerStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function () {
					if (self.scrollerStyle[durationProp] === '0.0001ms') {
						self.scrollerStyle[durationProp] = '0s';
					}
				});
			}

			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time);
				}
			}

			// INSERT POINT: _transitionTime
		},

		_transitionTimingFunction: function _transitionTimingFunction(easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}

			// INSERT POINT: _transitionTimingFunction
		},

		_translate: function _translate(x, y) {
			if (this.options.useTransform) {

				/* REPLACE START: _translate */

				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

				/* REPLACE END: _translate */
			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px';
			}

			this.x = x;
			this.y = y;

			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition();
				}
			}

			// INSERT POINT: _translate
		},

		_initEvents: function _initEvents(remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
			    target = this.options.bindToWrapper ? this.wrapper : window;

			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);

			if (this.options.click) {
				eventType(this.wrapper, 'click', this, true);
			}

			if (!this.options.disableMouse) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
			}

			if (utils.hasPointer && !this.options.disablePointer) {
				eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
				eventType(target, utils.prefixPointerEvent('pointermove'), this);
				eventType(target, utils.prefixPointerEvent('pointercancel'), this);
				eventType(target, utils.prefixPointerEvent('pointerup'), this);
			}

			if (utils.hasTouch && !this.options.disableTouch) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}

			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this);
		},

		getComputedPosition: function getComputedPosition() {
			var matrix = window.getComputedStyle(this.scroller, null),
			    x,
			    y;

			if (this.options.useTransform) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '');
			}

			return { x: x, y: y };
		},
		_initIndicators: function _initIndicators() {
			var interactive = this.options.interactiveScrollbars,
			    customStyle = typeof this.options.scrollbars != 'string',
			    indicators = [],
			    indicator;

			var that = this;

			this.indicators = [];

			if (this.options.scrollbars) {
				// Vertical scrollbar
				if (this.options.scrollY) {
					indicator = {
						el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};

					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}

				// Horizontal scrollbar
				if (this.options.scrollX) {
					indicator = {
						el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};

					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
			}

			if (this.options.indicators) {
				// TODO: check concat compatibility
				indicators = indicators.concat(this.options.indicators);
			}

			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]));
			}

			// TODO: check if we can use array.map (wide compatibility and performance issues)
			function _indicatorsMap(fn) {
				if (that.indicators) {
					for (var i = that.indicators.length; i--;) {
						fn.call(that.indicators[i]);
					}
				}
			}

			if (this.options.fadeScrollbars) {
				this.on('scrollEnd', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});

				this.on('scrollCancel', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});

				this.on('scrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1);
					});
				});

				this.on('beforeScrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1, true);
					});
				});
			}

			this.on('refresh', function () {
				_indicatorsMap(function () {
					this.refresh();
				});
			});

			this.on('destroy', function () {
				_indicatorsMap(function () {
					this.destroy();
				});

				delete this.indicators;
			});
		},

		_initWheel: function _initWheel() {
			utils.addEvent(this.wrapper, 'wheel', this);
			utils.addEvent(this.wrapper, 'mousewheel', this);
			utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

			this.on('destroy', function () {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				utils.removeEvent(this.wrapper, 'wheel', this);
				utils.removeEvent(this.wrapper, 'mousewheel', this);
				utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
			});
		},

		_wheel: function _wheel(e) {
			if (!this.enabled) {
				return;
			}

			e.preventDefault();

			var wheelDeltaX,
			    wheelDeltaY,
			    newX,
			    newY,
			    that = this;

			if (this.wheelTimeout === undefined) {
				that._execEvent('scrollStart');
			}

			// Execute the scrollEnd event after 400ms the wheel stopped scrolling
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function () {
				if (!that.options.snap) {
					that._execEvent('scrollEnd');
				}
				that.wheelTimeout = undefined;
			}, 400);

			if ('deltaX' in e) {
				if (e.deltaMode === 1) {
					wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
					wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
				} else {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY;
				}
			} else if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
				wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
			} else if ('wheelDelta' in e) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
			} else {
				return;
			}

			wheelDeltaX *= this.options.invertWheelDirection;
			wheelDeltaY *= this.options.invertWheelDirection;

			if (!this.hasVerticalScroll) {
				wheelDeltaX = wheelDeltaY;
				wheelDeltaY = 0;
			}

			if (this.options.snap) {
				newX = this.currentPage.pageX;
				newY = this.currentPage.pageY;

				if (wheelDeltaX > 0) {
					newX--;
				} else if (wheelDeltaX < 0) {
					newX++;
				}

				if (wheelDeltaY > 0) {
					newY--;
				} else if (wheelDeltaY < 0) {
					newY++;
				}

				this.goToPage(newX, newY);

				return;
			}

			newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
			newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

			this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
			this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

			if (newX > 0) {
				newX = 0;
			} else if (newX < this.maxScrollX) {
				newX = this.maxScrollX;
			}

			if (newY > 0) {
				newY = 0;
			} else if (newY < this.maxScrollY) {
				newY = this.maxScrollY;
			}

			this.scrollTo(newX, newY, 0);

			if (this.options.probeType > 1) {
				this._execEvent('scroll');
			}

			// INSERT POINT: _wheel
		},

		_initSnap: function _initSnap() {
			this.currentPage = {};

			if (typeof this.options.snap == 'string') {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap);
			}

			this.on('refresh', function () {
				var i = 0,
				    l,
				    m = 0,
				    n,
				    cx,
				    cy,
				    x = 0,
				    y,
				    stepX = this.options.snapStepX || this.wrapperWidth,
				    stepY = this.options.snapStepY || this.wrapperHeight,
				    el,
				    rect;

				this.pages = [];

				if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
					return;
				}

				if (this.options.snap === true) {
					cx = Math.round(stepX / 2);
					cy = Math.round(stepY / 2);

					while (x > -this.scrollerWidth) {
						this.pages[i] = [];
						l = 0;
						y = 0;

						while (y > -this.scrollerHeight) {
							this.pages[i][l] = {
								x: Math.max(x, this.maxScrollX),
								y: Math.max(y, this.maxScrollY),
								width: stepX,
								height: stepY,
								cx: x - cx,
								cy: y - cy
							};

							y -= stepY;
							l++;
						}

						x -= stepX;
						i++;
					}
				} else {
					el = this.options.snap;
					l = el.length;
					n = -1;

					for (; i < l; i++) {
						rect = utils.getRect(el[i]);
						if (i === 0 || rect.left <= utils.getRect(el[i - 1]).left) {
							m = 0;
							n++;
						}

						if (!this.pages[m]) {
							this.pages[m] = [];
						}

						x = Math.max(-rect.left, this.maxScrollX);
						y = Math.max(-rect.top, this.maxScrollY);
						cx = x - Math.round(rect.width / 2);
						cy = y - Math.round(rect.height / 2);

						this.pages[m][n] = {
							x: x,
							y: y,
							width: rect.width,
							height: rect.height,
							cx: cx,
							cy: cy
						};

						if (x > this.maxScrollX) {
							m++;
						}
					}
				}

				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

				// Update snap threshold if needed
				if (this.options.snapThreshold % 1 === 0) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold;
				} else {
					this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
				}
			});

			this.on('flick', function () {
				var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);

				this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
			});
		},

		_nearestSnap: function _nearestSnap(x, y) {
			if (!this.pages.length) {
				return { x: 0, y: 0, pageX: 0, pageY: 0 };
			}

			var i = 0,
			    l = this.pages.length,
			    m = 0;

			// Check if we exceeded the snap threshold
			if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
				return this.currentPage;
			}

			if (x > 0) {
				x = 0;
			} else if (x < this.maxScrollX) {
				x = this.maxScrollX;
			}

			if (y > 0) {
				y = 0;
			} else if (y < this.maxScrollY) {
				y = this.maxScrollY;
			}

			for (; i < l; i++) {
				if (x >= this.pages[i][0].cx) {
					x = this.pages[i][0].x;
					break;
				}
			}

			l = this.pages[i].length;

			for (; m < l; m++) {
				if (y >= this.pages[0][m].cy) {
					y = this.pages[0][m].y;
					break;
				}
			}

			if (i == this.currentPage.pageX) {
				i += this.directionX;

				if (i < 0) {
					i = 0;
				} else if (i >= this.pages.length) {
					i = this.pages.length - 1;
				}

				x = this.pages[i][0].x;
			}

			if (m == this.currentPage.pageY) {
				m += this.directionY;

				if (m < 0) {
					m = 0;
				} else if (m >= this.pages[0].length) {
					m = this.pages[0].length - 1;
				}

				y = this.pages[0][m].y;
			}

			return {
				x: x,
				y: y,
				pageX: i,
				pageY: m
			};
		},

		goToPage: function goToPage(x, y, time, easing) {
			easing = easing || this.options.bounceEasing;

			if (x >= this.pages.length) {
				x = this.pages.length - 1;
			} else if (x < 0) {
				x = 0;
			}

			if (y >= this.pages[x].length) {
				y = this.pages[x].length - 1;
			} else if (y < 0) {
				y = 0;
			}

			var posX = this.pages[x][y].x,
			    posY = this.pages[x][y].y;

			time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

			this.currentPage = {
				x: posX,
				y: posY,
				pageX: x,
				pageY: y
			};

			this.scrollTo(posX, posY, time, easing);
		},

		next: function next(time, easing) {
			var x = this.currentPage.pageX,
			    y = this.currentPage.pageY;

			x++;

			if (x >= this.pages.length && this.hasVerticalScroll) {
				x = 0;
				y++;
			}

			this.goToPage(x, y, time, easing);
		},

		prev: function prev(time, easing) {
			var x = this.currentPage.pageX,
			    y = this.currentPage.pageY;

			x--;

			if (x < 0 && this.hasVerticalScroll) {
				x = 0;
				y--;
			}

			this.goToPage(x, y, time, easing);
		},

		_initKeys: function _initKeys(e) {
			// default key bindings
			var keys = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var i;

			// if you give me characters I give you keycode
			if (_typeof(this.options.keyBindings) == 'object') {
				for (i in this.options.keyBindings) {
					if (typeof this.options.keyBindings[i] == 'string') {
						this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
					}
				}
			} else {
				this.options.keyBindings = {};
			}

			for (i in keys) {
				this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
			}

			utils.addEvent(window, 'keydown', this);

			this.on('destroy', function () {
				utils.removeEvent(window, 'keydown', this);
			});
		},

		_key: function _key(e) {
			if (!this.enabled) {
				return;
			}

			var snap = this.options.snap,
			    // we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			    newY = snap ? this.currentPage.pageY : this.y,
			    now = utils.getTime(),
			    prevTime = this.keyTime || 0,
			    acceleration = 0.250,
			    pos;

			if (this.options.useTransition && this.isInTransition) {
				pos = this.getComputedPosition();

				this._translate(Math.round(pos.x), Math.round(pos.y));
				this.isInTransition = false;
			}

			this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

			switch (e.keyCode) {
				case this.options.keyBindings.pageUp:
					if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
						newX += snap ? 1 : this.wrapperWidth;
					} else {
						newY += snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.pageDown:
					if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
						newX -= snap ? 1 : this.wrapperWidth;
					} else {
						newY -= snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.end:
					newX = snap ? this.pages.length - 1 : this.maxScrollX;
					newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
					break;
				case this.options.keyBindings.home:
					newX = 0;
					newY = 0;
					break;
				case this.options.keyBindings.left:
					newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
					break;
				case this.options.keyBindings.up:
					newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
					break;
				case this.options.keyBindings.right:
					newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
					break;
				case this.options.keyBindings.down:
					newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
					break;
				default:
					return;
			}

			if (snap) {
				this.goToPage(newX, newY);
				return;
			}

			if (newX > 0) {
				newX = 0;
				this.keyAcceleration = 0;
			} else if (newX < this.maxScrollX) {
				newX = this.maxScrollX;
				this.keyAcceleration = 0;
			}

			if (newY > 0) {
				newY = 0;
				this.keyAcceleration = 0;
			} else if (newY < this.maxScrollY) {
				newY = this.maxScrollY;
				this.keyAcceleration = 0;
			}

			this.scrollTo(newX, newY, 0);

			this.keyTime = now;
		},

		_animate: function _animate(destX, destY, duration, easingFn) {
			var that = this,
			    startX = this.x,
			    startY = this.y,
			    startTime = utils.getTime(),
			    destTime = startTime + duration;

			function step() {
				var now = utils.getTime(),
				    newX,
				    newY,
				    easing;

				if (now >= destTime) {
					that.isAnimating = false;
					that._translate(destX, destY);

					if (!that.resetPosition(that.options.bounceTime)) {
						that._execEvent('scrollEnd');
					}

					return;
				}

				now = (now - startTime) / duration;
				easing = easingFn(now);
				newX = (destX - startX) * easing + startX;
				newY = (destY - startY) * easing + startY;
				that._translate(newX, newY);

				if (that.isAnimating) {
					rAF(step);
				}

				if (that.options.probeType == 3) {
					that._execEvent('scroll');
				}
			}

			this.isAnimating = true;
			step();
		},

		handleEvent: function handleEvent(e) {
			switch (e.type) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'wheel':
				case 'DOMMouseScroll':
				case 'mousewheel':
					this._wheel(e);
					break;
				case 'keydown':
					this._key(e);
					break;
				case 'click':
					if (this.enabled && !e._constructed) {
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
		}
	};
	function createDefaultScrollbar(direction, interactive, type) {
		var scrollbar = document.createElement('div'),
		    indicator = document.createElement('div');

		if (type === true) {
			scrollbar.style.cssText = 'position:absolute;z-index:9999';
			indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
		}

		indicator.className = 'iScrollIndicator';

		if (direction == 'h') {
			if (type === true) {
				scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
				indicator.style.height = '100%';
			}
			scrollbar.className = 'iScrollHorizontalScrollbar';
		} else {
			if (type === true) {
				scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
				indicator.style.width = '100%';
			}
			scrollbar.className = 'iScrollVerticalScrollbar';
		}

		scrollbar.style.cssText += ';overflow:hidden';

		if (!interactive) {
			scrollbar.style.pointerEvents = 'none';
		}

		scrollbar.appendChild(indicator);

		return scrollbar;
	}

	function Indicator(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};

		for (var i in options) {
			this.options[i] = options[i];
		}

		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if (this.options.interactive) {
			if (!this.options.disableTouch) {
				utils.addEvent(this.indicator, 'touchstart', this);
				utils.addEvent(window, 'touchend', this);
			}
			if (!this.options.disablePointer) {
				utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
			}
			if (!this.options.disableMouse) {
				utils.addEvent(this.indicator, 'mousedown', this);
				utils.addEvent(window, 'mouseup', this);
			}
		}

		if (this.options.fade) {
			this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return;
			}
			this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
			// remove 0.0001ms
			var self = this;
			if (utils.isBadAndroid) {
				rAF(function () {
					if (self.wrapperStyle[durationProp] === '0.0001ms') {
						self.wrapperStyle[durationProp] = '0s';
					}
				});
			}
			this.wrapperStyle.opacity = '0';
		}
	}

	Indicator.prototype = {
		handleEvent: function handleEvent(e) {
			switch (e.type) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
			}
		},

		destroy: function destroy() {
			if (this.options.fadeScrollbars) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;
			}
			if (this.options.interactive) {
				utils.removeEvent(this.indicator, 'touchstart', this);
				utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.removeEvent(this.indicator, 'mousedown', this);

				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);

				utils.removeEvent(window, 'touchend', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
				utils.removeEvent(window, 'mouseup', this);
			}

			if (this.options.defaultScrollbars && this.wrapper.parentNode) {
				this.wrapper.parentNode.removeChild(this.wrapper);
			}
		},

		_start: function _start(e) {
			var point = e.touches ? e.touches[0] : e;

			e.preventDefault();
			e.stopPropagation();

			this.transitionTime();

			this.initiated = true;
			this.moved = false;
			this.lastPointX = point.pageX;
			this.lastPointY = point.pageY;

			this.startTime = utils.getTime();

			if (!this.options.disableTouch) {
				utils.addEvent(window, 'touchmove', this);
			}
			if (!this.options.disablePointer) {
				utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
			}
			if (!this.options.disableMouse) {
				utils.addEvent(window, 'mousemove', this);
			}

			this.scroller._execEvent('beforeScrollStart');
		},

		_move: function _move(e) {
			var point = e.touches ? e.touches[0] : e,
			    deltaX,
			    deltaY,
			    newX,
			    newY,
			    timestamp = utils.getTime();

			if (!this.moved) {
				this.scroller._execEvent('scrollStart');
			}

			this.moved = true;

			deltaX = point.pageX - this.lastPointX;
			this.lastPointX = point.pageX;

			deltaY = point.pageY - this.lastPointY;
			this.lastPointY = point.pageY;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			this._pos(newX, newY);

			if (this.scroller.options.probeType == 1 && timestamp - this.startTime > 300) {
				this.startTime = timestamp;
				this.scroller._execEvent('scroll');
			} else if (this.scroller.options.probeType > 1) {
				this.scroller._execEvent('scroll');
			}

			// INSERT POINT: indicator._move

			e.preventDefault();
			e.stopPropagation();
		},

		_end: function _end(e) {
			if (!this.initiated) {
				return;
			}

			this.initiated = false;

			e.preventDefault();
			e.stopPropagation();

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			if (this.scroller.options.snap) {
				var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

				var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

				if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = snap;
					this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
				}
			}

			if (this.moved) {
				this.scroller._execEvent('scrollEnd');
			}
		},

		transitionTime: function transitionTime(time) {
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return;
			}

			this.indicatorStyle[durationProp] = time + 'ms';

			if (!time && utils.isBadAndroid) {
				this.indicatorStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function () {
					if (self.indicatorStyle[durationProp] === '0.0001ms') {
						self.indicatorStyle[durationProp] = '0s';
					}
				});
			}
		},

		transitionTimingFunction: function transitionTimingFunction(easing) {
			this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
		},

		refresh: function refresh() {
			this.transitionTime();

			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
				utils.addClass(this.wrapper, 'iScrollBothScrollbars');
				utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = '8px';
					} else {
						this.wrapper.style.bottom = '8px';
					}
				}
			} else {
				utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
				utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = '2px';
					} else {
						this.wrapper.style.bottom = '2px';
					}
				}
			}

			utils.getRect(this.wrapper); // force refresh

			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if (this.options.resize) {
					this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + 'px';
				} else {
					this.indicatorWidth = this.indicator.clientWidth;
				}

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				if (this.options.shrink == 'clip') {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8;
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX;
				}

				this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX;
			}

			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if (this.options.resize) {
					this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + 'px';
				} else {
					this.indicatorHeight = this.indicator.clientHeight;
				}

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				if (this.options.shrink == 'clip') {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8;
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY;
				}

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY;
			}

			this.updatePosition();
		},

		updatePosition: function updatePosition() {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			    y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if (!this.options.ignoreBoundaries) {
				if (x < this.minBoundaryX) {
					if (this.options.shrink == 'scale') {
						this.width = Math.max(this.indicatorWidth + x, 8);
						this.indicatorStyle.width = this.width + 'px';
					}
					x = this.minBoundaryX;
				} else if (x > this.maxBoundaryX) {
					if (this.options.shrink == 'scale') {
						this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
						this.indicatorStyle.width = this.width + 'px';
						x = this.maxPosX + this.indicatorWidth - this.width;
					} else {
						x = this.maxBoundaryX;
					}
				} else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
					this.width = this.indicatorWidth;
					this.indicatorStyle.width = this.width + 'px';
				}

				if (y < this.minBoundaryY) {
					if (this.options.shrink == 'scale') {
						this.height = Math.max(this.indicatorHeight + y * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
					}
					y = this.minBoundaryY;
				} else if (y > this.maxBoundaryY) {
					if (this.options.shrink == 'scale') {
						this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
						y = this.maxPosY + this.indicatorHeight - this.height;
					} else {
						y = this.maxBoundaryY;
					}
				} else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
					this.height = this.indicatorHeight;
					this.indicatorStyle.height = this.height + 'px';
				}
			}

			this.x = x;
			this.y = y;

			if (this.scroller.options.useTransform) {
				this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
			} else {
				this.indicatorStyle.left = x + 'px';
				this.indicatorStyle.top = y + 'px';
			}
		},

		_pos: function _pos(x, y) {
			if (x < 0) {
				x = 0;
			} else if (x > this.maxPosX) {
				x = this.maxPosX;
			}

			if (y < 0) {
				y = 0;
			} else if (y > this.maxPosY) {
				y = this.maxPosY;
			}

			x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
			y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

			this.scroller.scrollTo(x, y);
		},

		fade: function fade(val, hold) {
			if (hold && !this.visible) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
			    delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

			this.fadeTimeout = setTimeout(function (val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}.bind(this, val), delay);
		}
	};

	IScroll.utils = utils;

	if (typeof module != 'undefined' && module.exports) {
		module.exports = IScroll;
	} else if (typeof define == 'function' && define.amd) {
		define(function () {
			return IScroll;
		});
	} else {
		window.IScroll = IScroll;
	}
})(window, document, Math);

},{}]},{},[6,5]);
