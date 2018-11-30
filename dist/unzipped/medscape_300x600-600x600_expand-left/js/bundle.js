(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        "use strict";

        module.exports = function() {
          if (document.getElementsByClassName("piLink").length) {
            var links = document.getElementsByClassName("piLink");
            for (var i = 0; i < links.length; i += 1) {
              links[i].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("Prescribing Information");
              });
            }
          }
          if (document.getElementsByClassName("seeMore").length) {
            var _links = document.getElementsByClassName("seeMore");
            for (var _i = 0; _i < _links.length; _i += 1) {
              _links[_i].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("See more");
              });
            }
          }
          if (document.getElementsByClassName("seeTheResults").length) {
            var _links2 = document.getElementsByClassName("seeTheResults");
            for (var _i2 = 0; _i2 < _links2.length; _i2 += 1) {
              _links2[_i2].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("See the results");
              });
            }
          }
          if (document.getElementsByClassName("linkToLanding").length) {
            var _links3 = document.getElementsByClassName("linkToLanding");
            for (var _i3 = 0; _i3 < _links3.length; _i3 += 1) {
              _links3[_i3].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("Link to landing page");
              });
            }
          }
        };
      },
      {}
    ],
    2: [
      function(require, module, exports) {
        "use strict";

        module.exports = function(IScroll, id) {
          this.id = id ? id : "isi";
          this.isi = document.getElementById(this.id);
          this.isiContainer = document.getElementById(this.id + "-container");
          this.isiScroll = new IScroll("#" + this.id + "-container", {
            mouseWheel: true,
            probeType: 3,
            preventDefault: false,
            interactiveScrollbars: true,
            scrollbars: "custom",
            resizeScrollbars: false
          });
          this.startTime = 0;
          this.pausedTime = 0;
          this.resumedTime = 0;
          this.duration = 3000;
          this.paused = false;
          this.scrollEnded = false;
          // console.dir(this.isiScroll);

          // Disable touchmove
          this.isi.addEventListener(
            "touchmove",
            function(event) {
              event.preventDefault();
            },
            { passive: false }
          );

          this.initialized = false;
          this.mouseOverIsi = false;

          this.init = function() {
            var _this = this;

            if (!this.initialized) {
              this.initialized = true;
              // Set event listeners
              // this.isiContainer.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
              // this.isiContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
              this.isiScroll.on("scrollEnd", function() {
                if (_this.isiScroll.y === _this.isiScroll.maxScrollY) {
                  _this.scrollEnded = true;
                  // console.log('ended');
                }
              });
              this.startScrollFromBeginning();
            }
          };

          this.handleMouseEnter = function() {
            this.mouseOverIsi = true;
            if (this.initialized) {
              this.pauseScroll();
            }
          };

          this.handleMouseLeave = function() {
            this.mouseOverIsi = false;
            if (this.initialized) {
              this.resumeScroll();
            }
          };

          this.startScrollFromBeginning = function() {
            // console.log('start');
            this.startTime = Date.now();
            if (!this.mouseOverIsi) {
              this.isiScroll.scrollTo(
                0,
                this.isiScroll.y - 50,
                this.duration,
                IScroll.utils.ease.linear
              );
            }
          };

          this.refresh = function() {
            var _this2 = this;

            setTimeout(function() {
              _this2.isiScroll.refresh();
            }, 0);
          };

          this.pauseScroll = function() {
            this.pausedTime = Date.now();
            // console.log('paused');
            // console.log('resumed time:', this.resumedTime);
            // console.log('start time:', this.startTime);
            // console.log('paused time:', this.pausedTime);
            this.paused = true;
            this.isiScroll.scrollTo(
              0,
              this.isiScroll.y,
              -1,
              IScroll.utils.ease.linear
            );
          };

          this.resumeScroll = function() {
            if (!this.paused || this.scrollEnded) {
              return;
            }
            // console.log('resumed');
            var self = this;
            self.resumedTime = Date.now();
            self.startTime =
              self.startTime + (self.resumedTime - self.pausedTime);
            if (!this.mouseOverIsi) {
              setTimeout(function() {
                if (!self.mouseOverIsi) {
                  self.paused = false;
                  self.isiScroll.scrollBy(
                    0,
                    self.isiScroll.maxScrollY - self.isiScroll.y,
                    // self.duration - (self.resumedTime - self.startTime),
                    self.duration -
                      (self.isiScroll.y / self.isiScroll.maxScrollY) *
                        self.duration,
                    IScroll.utils.ease.linear
                  );
                }
              }, 75);
            }
          };

          this.scrollToTop = function() {
            this.isiScroll.scrollTo(0, 0, -1, IScroll.utils.ease.linear);
            this.initialized = false;
            this.startScrollFromBeginning();
            this.pauseScroll();
          };
        };
      },
      {}
    ],
    3: [
      function(require, module, exports) {
        "use strict";

        var _createClass = (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var MainExpandingMedscapeJs = require("../main-expanding-medscape.js");
        var MainExpandingInsightJs = require("../main-expanding-insight");
        var exitLinks = require("../components/exit-links.js");

        var domExpandHandlerId = "collapsed-main-content";
        var domCollapseHandlerId = "collapse-handler";
        var eventListenerMouseOver = "mouseover";
        var eventListenerClick = "click";

        module.exports = (function() {
          function ExpandingBanner(
            setExpandingPixelOffsets,
            medscapeOrInsight,
            orientation
          ) {
            _classCallCheck(this, ExpandingBanner);

            this.mainExpandingJs =
              medscapeOrInsight === "medscape"
                ? new MainExpandingMedscapeJs(orientation)
                : new MainExpandingInsightJs(orientation);
            this.isExpanded = false;
            this.inTransition = false;
            this.politeLoadImg = document.getElementById("polite-load-img");
            this.studio = document
              .getElementById("main-panel")
              .classList.contains("studio");
            this.setExpandingPixelOffsets = setExpandingPixelOffsets;
            this.politeLoad = this.politeLoad.bind(this);
            this.enablerInitHandler = this.enablerInitHandler.bind(this);
          }

          _createClass(ExpandingBanner, [
            {
              key: "init",
              value: function init() {
                if (this.studio) {
                  if (Enabler.isInitialized()) {
                    this.enablerInitHandler();
                  } else {
                    Enabler.addEventListener(
                      studio.events.StudioEvent.INIT,
                      this.enablerInitHandler
                    );
                  }
                } else {
                  this.politeLoad();
                }
              }
            },
            {
              key: "politeLoad",
              value: function politeLoad() {
                this.addDomEventListeners();
                if (this.politeLoadImg) {
                  this.politeLoadImg.style.display = "none";
                }
                this.mainExpandingJs.init();
              }
            },
            {
              key: "addDomEventListeners",
              value: function addDomEventListeners() {
                var _this = this;

                var domExpandHandler = document.getElementById(
                  domExpandHandlerId
                );
                if (domExpandHandler) {
                  domExpandHandler.addEventListener(
                    eventListenerMouseOver,
                    function() {
                      if (!_this.isExpanded && !_this.inTransition) {
                        _this.inTransition = true;
                        _this.studio
                          ? Enabler.requestExpand()
                          : _this.expandStartHandler();
                      }
                    }
                  );
                }

                var domCollapseHandler = document.getElementById(
                  domCollapseHandlerId
                );
                if (domCollapseHandler) {
                  domCollapseHandler.addEventListener(
                    eventListenerClick,
                    function() {
                      if (_this.isExpanded && !_this.inTransition) {
                        _this.inTransition = true;
                        _this.studio
                          ? Enabler.requestCollapse()
                          : _this.collapseStartHandler();
                      }
                    }
                  );
                }
              }
            },
            {
              key: "enablerInitHandler",
              value: function enablerInitHandler() {
                var _this2 = this;

                this.setExpandingPixelOffsets();

                Enabler.addEventListener(
                  studio.events.StudioEvent.EXPAND_START,
                  function() {
                    return _this2.expandStartHandler();
                  }
                );
                Enabler.addEventListener(
                  studio.events.StudioEvent.EXPAND_FINISH,
                  function() {
                    return _this2.expandFinishHandler();
                  }
                );
                Enabler.addEventListener(
                  studio.events.StudioEvent.COLLAPSE_START,
                  function() {
                    return _this2.collapseStartHandler();
                  }
                );
                Enabler.addEventListener(
                  studio.events.StudioEvent.COLLAPSE_FINISH,
                  function() {
                    return _this2.collapseFinishHandler();
                  }
                );

                exitLinks();

                if (Enabler.isPageLoaded()) {
                  this.politeLoad();
                } else {
                  Enabler.addEventListener(
                    studio.events.StudioEvent.PAGE_LOADED,
                    this.politeLoad
                  );
                }
              }
            },
            {
              key: "expandStartHandler",
              value: function expandStartHandler() {
                var _this3 = this;

                this.mainExpandingJs.expandStartAnimation(function() {
                  _this3.studio
                    ? Enabler.finishExpand()
                    : _this3.expandFinishHandler();
                });
              }
            },
            {
              key: "expandFinishHandler",
              value: function expandFinishHandler() {
                this.isExpanded = true;
                this.inTransition = false;
                this.mainExpandingJs.expandFinishAnimation();
              }
            },
            {
              key: "collapseStartHandler",
              value: function collapseStartHandler() {
                var _this4 = this;

                this.mainExpandingJs.collapseStartAnimation(function() {
                  _this4.studio
                    ? Enabler.finishCollapse()
                    : _this4.collapseFinishHandler();
                });
              }
            },
            {
              key: "collapseFinishHandler",
              value: function collapseFinishHandler() {
                this.isExpanded = false;
                this.inTransition = false;
                this.mainExpandingJs.collapseFinishAnimation();
              }
            }
          ]);

          return ExpandingBanner;
        })();
      },
      {
        "../components/exit-links.js": 1,
        "../main-expanding-insight": 4,
        "../main-expanding-medscape.js": 5
      }
    ],
    4: [
      function(require, module, exports) {
        "use strict";

        var _createClass = (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Isi = require("./components/isi.js");
        var IScroll = require("./vendor/iscroll-probe.js");

        var _require = require("./util/helper-functions"),
          fadeIn = _require.fadeIn,
          fadeOut = _require.fadeOut;

        module.exports = (function() {
          function Expanding() {
            _classCallCheck(this, Expanding);

            this.isi = new Isi(IScroll);
            this.isiCollapsed = new Isi(IScroll, "isi-collapsed");
            this.expanding = false;
            this.callback = null;
            this.mainPanel = document.getElementById("main-panel");
            this.expandedPanel = document.getElementById("expanded-panel");
            this.expandedContentWrapper = document.getElementById(
              "expanded-content-wrapper"
            );
            this.collapsedPanel = document.getElementById("collapsed-panel");

            this.init = this.init.bind(this);
            this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
            this.expandStartAnimation = this.expandStartAnimation.bind(this);
            this.expandFinishAnimation = this.expandFinishAnimation.bind(this);
            this.collapseStartAnimation = this.collapseStartAnimation.bind(
              this
            );
            this.collapseFinishAnimation = this.collapseFinishAnimation.bind(
              this
            );
          }

          _createClass(Expanding, [
            {
              key: "init",
              value: function init() {
                this.textAnimations();
                this.handleClickRepeatExpandAnimation();
                this.expandedContentWrapper.addEventListener(
                  "transitionend",
                  this.handleTransitionEnd
                );
              }
            },
            {
              key: "handleTransitionEnd",
              value: function handleTransitionEnd() {
                var _this = this;

                if (this.expanding) {
                  if (this.callback) {
                    this.callback();
                  }
                } else {
                  fadeIn(this.collapsedPanel, 500, function() {
                    if (_this.callback) {
                      _this.callback();
                    }
                  });
                }
              }
            },
            {
              key: "expandStartAnimation",
              value: function expandStartAnimation(callback) {
                var _this2 = this;

                // Do stuff, then call callback after it is complete
                this.expanding = true;
                this.callback = callback;
                fadeOut(this.collapsedPanel, 500, function() {
                  _this2.expandedPanel.classList.add("expand");
                  _this2.collapsedPanel.style.display = "none";
                });

                setTimeout(function() {
                  _this2.stopCollapseAnimation();
                }, 500);

                setTimeout(function() {
                  _this2.expandAnimationLoader();
                  _this2.isiCollapsed.scrollToTop();
                  _this2.isi.refresh();
                }, 1000);
              }
            },
            {
              key: "expandFinishAnimation",
              value: function expandFinishAnimation() {
                // Do stuff when the expansion completes
              }
            },
            {
              key: "collapseStartAnimation",
              value: function collapseStartAnimation(callback) {
                var _this3 = this;

                // Do stuff, then call callback after it is complete
                this.expanding = false;
                this.callback = callback;
                this.expandedPanel.classList.remove("expand");
                this.collapsedPanel.style.display = "block";

                this.stopExpandAnimation();

                setTimeout(function() {
                  _this3.textAnimations();
                  _this3.isi.scrollToTop();
                  _this3.isiCollapsed.refresh();
                }, 1000);
              }
            },
            {
              key: "collapseFinishAnimation",
              value: function collapseFinishAnimation() {}
              // Do stuff when the collapse finishes

              /* collapse animation */
            },
            {
              key: "textAnimations",
              value: function textAnimations() {
                // PUT TEXT ANIMATIONS HERE

                var animationSpeed = 400;
                var holdAnimation = 1300;
                var that = this;
                var isStopped = false;

                function frame1() {
                  $("#collapsed-panel .video")
                    .get(0)
                    .play();
                  setTimeout(function() {
                    if (!isStopped) {
                      frame2();
                    }
                  }, 1000);
                }

                function frame2() {
                  $("#legend-1").fadeOut(animationSpeed, function() {
                    $("#legend-2")
                      .fadeIn(animationSpeed)
                      .delay(holdAnimation)
                      .fadeOut(animationSpeed, function() {
                        setTimeout(function() {
                          if (!isStopped) {
                            frame3();
                          }
                        }, holdAnimation * 2);
                      });
                  });
                }

                function frame3() {
                  $("#heading-1").fadeOut(animationSpeed, function() {
                    if (!isStopped) {
                      frame4();
                    }
                  });
                }

                function frame4() {
                  console.log("frame 4");
                  if ($(".insight_300x250-500x250_expand-left").length) {
                    $("#collapsed-panel .video").fadeOut(300, function() {
                      $("#heading-2, #legend-3").fadeIn(animationSpeed);
                      setTimeout(function() {
                        if (!isStopped) {
                          $("#heading-2, #legend-3")
                            .css("transition", "none")
                            .fadeOut(animationSpeed, function() {
                              $(".collapsed-panel .middle-content img").fadeIn(
                                animationSpeed,
                                function() {
                                  setTimeout(function() {
                                    if (!isStopped) {
                                      $(".expand-handler-wrap").fadeIn(
                                        animationSpeed,
                                        function() {
                                          //start isi scrolling at the end
                                          that.isiCollapsed.init();
                                          $("#expand-handler").addClass(
                                            "pulse"
                                          );
                                        }
                                      );
                                    }
                                  }, 100);
                                }
                              );
                            });
                        }
                      }, 3000);
                    });
                  } else if ($(".insight_160x600-300x600_expand-left").length) {
                    $("#heading-2, #legend-3").fadeIn(animationSpeed);
                    setTimeout(function() {
                      if (!isStopped) {
                        $(".expand-handler-wrap").fadeIn(
                          animationSpeed,
                          function() {
                            //start isi scrolling at the end
                            that.isiCollapsed.init();
                            $("#expand-handler").addClass("pulse");
                          }
                        );
                      }
                    }, holdAnimation);
                  } else if ($(".insight_728x90-728x270_expand-down").length) {
                    $("#heading-2, #legend-3").fadeIn(animationSpeed);
                    setTimeout(function() {
                      if (!isStopped) {
                        $(".expand-handler-wrap").fadeIn(
                          animationSpeed,
                          function() {
                            //start isi scrolling at the end
                            that.isiCollapsed.init();
                            $("#expand-handler").addClass("pulse");
                          }
                        );
                      }
                    }, holdAnimation);
                  } else if ($(".insight_300x600-560x600_expand-left").length) {
                    $("#heading-2, #legend-3").fadeIn(animationSpeed);
                    setTimeout(function() {
                      if (!isStopped) {
                        $(".expand-handler-wrap").fadeIn(
                          animationSpeed,
                          function() {
                            //start isi scrolling at the end
                            that.isiCollapsed.init();
                            $("#expand-handler").addClass("pulse");
                          }
                        );
                      }
                    }, holdAnimation);
                  } else {
                    $("#heading-2, #legend-3").fadeIn(animationSpeed);
                    setTimeout(function() {
                      if (!isStopped) {
                        $(".expand-handler-wrap").fadeIn(
                          animationSpeed,
                          function() {
                            //start isi scrolling at the end
                            that.isiCollapsed.init();
                            $("#expand-handler").addClass("pulse");
                          }
                        );
                      }
                    }, holdAnimation);
                  }
                }

                $("#collapsed-main-content .middle-content").on(
                  "mouseover",
                  function() {
                    return false;
                  }
                );

                $("#collapsed-main-content .top-content").on(
                  "mouseover",
                  function() {
                    isStopped = true;
                  }
                );

                // start animation
                frame1();
              }

              // stop animation
            },
            {
              key: "stopCollapseAnimation",
              value: function stopCollapseAnimation() {
                var animationSpeed = 400;
                setTimeout(function() {
                  $("#collapsed-panel .video").fadeIn(animationSpeed);
                  $("#collapsed-panel .video")
                    .get(0)
                    .pause();
                  $("#collapsed-panel .video").get(0).currentTime = 0;
                }, 1000);
                $("#legend-2, .expand-handler-wrap, .collapsed-panel").fadeOut(
                  animationSpeed
                );
                if ($(".insight_300x250-500x250_expand-left").length) {
                  $(".middle-content img").fadeOut(animationSpeed);
                }
                $("#heading-2, #legend-3")
                  .removeClass("visible")
                  .removeAttr("style");
                $("#expand-handler").removeClass("pulse");
                $("#heading-1, #legend-1").fadeIn(animationSpeed);
              }

              /* end collapse animation */

              /* expand animation */
            },
            {
              key: "expandAnimationLoader",
              value: function expandAnimationLoader() {
                var animationSpeed = 400;
                var video = $("#expanded-panel .video").get(0);
                var that = this;

                function screen1() {
                  video.play();
                  video.onended = function() {
                    screen2();
                  };
                }

                function screen2() {
                  $("#expanded-middle-content .takhzyro-logo").addClass(
                    "no-transform"
                  );
                  $("#expanded-panel .text-block").fadeIn(animationSpeed);
                  setTimeout(function() {
                    video.currentTime = 0;
                    $("#expanded-middle-content .btn-wrap").fadeIn(
                      animationSpeed,
                      function() {
                        //start isi scrolling at the end
                        that.isi.init();
                      }
                    );
                  }, animationSpeed);
                }

                // start animation
                screen1();
              }

              // repeat animation
            },
            {
              key: "repeatExpandAnimation",
              value: function repeatExpandAnimation() {
                var _this4 = this;

                var animationSpeed = 400;
                $("#expanded-middle-content .btn-wrap").fadeOut(
                  animationSpeed,
                  function() {
                    $("#expanded-middle-content .takhzyro-logo").removeClass(
                      "no-transform"
                    );
                  }
                );
                $("#expanded-panel .text-block").fadeOut(
                  animationSpeed,
                  function() {
                    _this4.expandAnimationLoader();
                  }
                );
              }

              // onclick repeat animation
            },
            {
              key: "handleClickRepeatExpandAnimation",
              value: function handleClickRepeatExpandAnimation() {
                var _this5 = this;

                $(document).on("click", ".replay-btn", function() {
                  _this5.repeatExpandAnimation();
                });
              }

              // stop animation
            },
            {
              key: "stopExpandAnimation",
              value: function stopExpandAnimation() {
                var animationSpeed = 400;
                $("#expanded-middle-content .btn-wrap").hide();
                $("#expanded-panel .text-block").fadeOut(animationSpeed);
                $("#expanded-middle-content .takhzyro-logo")
                  .css("transition", "none")
                  .removeClass("no-transform");
                setTimeout(function() {
                  $("#expanded-middle-content .takhzyro-logo").removeAttr(
                    "style"
                  );
                }, 1000);
                $("#expanded-panel .video")
                  .get(0)
                  .pause();
                $("#expanded-panel .video").get(0).currentTime = 0;
              }

              /* end expand animation */
            }
          ]);

          return Expanding;
        })();
      },
      {
        "./components/isi.js": 2,
        "./util/helper-functions": 8,
        "./vendor/iscroll-probe.js": 9
      }
    ],
    5: [
      function(require, module, exports) {
        "use strict";

        var _createClass = (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Isi = require("./components/isi.js");
        var IScroll = require("./vendor/iscroll-probe.js");

        var _require = require("./util/helper-functions"),
          fadeIn = _require.fadeIn,
          fadeOut = _require.fadeOut;

        module.exports = (function() {
          function Expanding() {
            _classCallCheck(this, Expanding);

            this.isi = new Isi(IScroll);
            this.expanding = false;
            this.callback = null;
            this.mainPanel = document.getElementById("main-panel");
            this.expandedPanel = document.getElementById("expanded-panel");
            this.expandedContentWrapper = document.getElementById(
              "expanded-content-wrapper"
            );
            this.collapsedPanel = document.getElementById("collapsed-panel");

            this.init = this.init.bind(this);
            this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
            this.expandStartAnimation = this.expandStartAnimation.bind(this);
            this.expandFinishAnimation = this.expandFinishAnimation.bind(this);
            this.collapseStartAnimation = this.collapseStartAnimation.bind(
              this
            );
            this.collapseFinishAnimation = this.collapseFinishAnimation.bind(
              this
            );
          }

          _createClass(Expanding, [
            {
              key: "init",
              value: function init() {
                this.expandedContentWrapper.addEventListener(
                  "transitionend",
                  this.handleTransitionEnd
                );
                this.collapseAnimationLoader();
                this.handleClickRepeatExpandAnimation();
              }
            },
            {
              key: "handleTransitionEnd",
              value: function handleTransitionEnd() {
                var _this = this;

                if (this.expanding) {
                  if (this.callback) {
                    this.callback();
                  }
                } else {
                  fadeIn(this.collapsedPanel, 500, function() {
                    if (_this.callback) {
                      _this.callback();
                    }
                  });
                }
              }
            },
            {
              key: "expandStartAnimation",
              value: function expandStartAnimation(callback) {
                var _this2 = this;

                // Do stuff, then call callback after it is complete
                this.expanding = true;
                this.callback = callback;
                fadeOut(this.collapsedPanel, 500, function() {
                  _this2.expandedPanel.classList.add("expand");
                  _this2.collapsedPanel.style.display = "none";
                });
              }
            },
            {
              key: "expandFinishAnimation",
              value: function expandFinishAnimation() {
                // Do stuff when the expansion completes
                this.expandAnimationLoader();
                this.stopCollapseAnimation();
                this.isi.refresh();
              }
            },
            {
              key: "collapseStartAnimation",
              value: function collapseStartAnimation(callback) {
                var _this3 = this;

                // Do stuff, then call callback after it is complete
                $(".expanded-middle-content").fadeTo(400, 0, function() {
                  _this3.expanding = false;
                  _this3.callback = callback;
                  _this3.expandedPanel.classList.remove("expand");
                  _this3.collapsedPanel.style.display = "block";
                });
              }
            },
            {
              key: "collapseFinishAnimation",
              value: function collapseFinishAnimation() {
                // Do stuff when the collapse finishes
                this.collapseAnimationLoader();
                this.stopExpandAnimation();
                this.isi.scrollToTop();
              }

              /* collapse animation */
            },
            {
              key: "collapseAnimationLoader",
              value: function collapseAnimationLoader() {
                var animationSpeed = 400;
                var holdAnimation = 2500;
                var animationIterationCount = 0;
                var toggleScreensIterationCount = 1;
                var j = 0;
                var i = 0;
                var isStopped = false;

                function frame1() {
                  // console.log('frame 1');
                  $("#legend").fadeIn(animationSpeed);
                  setTimeout(function() {
                    $("#text-primary").addClass("active");
                  }, 300);
                  setTimeout(function() {
                    if (!isStopped) {
                      frame2();
                    }
                  }, holdAnimation + 1000);
                }

                function frame2() {
                  // console.log('frame 2');
                  $("#expand-handler").addClass("pulse");
                  $("#legend").fadeOut(animationSpeed);
                  $("#text-primary").fadeOut(animationSpeed, function() {
                    if (!isStopped) {
                      frame3();
                    }
                  });
                }

                function frame3() {
                  // console.log('frame 3');
                  $("#text-secondary")
                    .fadeIn(animationSpeed)
                    .delay(holdAnimation)
                    .fadeOut(animationSpeed, function() {
                      if (!isStopped) {
                        frame4();
                      }
                    });
                }

                function frame4() {
                  // console.log('frame 4');
                  $("#text-primary, #legend").fadeIn(animationSpeed);
                  if (!isStopped) {
                    toggleScreens();
                  }
                }

                function frame5() {
                  $("#text-primary").removeClass("active");
                  $("#legend").fadeOut(animationSpeed);
                  $("#expand-handler").removeClass("pulse");
                }

                function frame6() {
                  if (i < animationIterationCount) {
                    j = 0;
                    i++;
                    frame5();
                    setTimeout(function() {
                      frame1();
                    }, holdAnimation);
                  }
                }

                function toggleScreens() {
                  setTimeout(function() {
                    if (j < toggleScreensIterationCount) {
                      j++;
                      if (!isStopped) {
                        frame2();
                      }
                    } else {
                      if (!isStopped) {
                        frame6();
                      }
                    }
                  }, holdAnimation + 1000);
                }

                $("#collapsed-panel").on("mouseover", function() {
                  isStopped = true;
                });

                // start animation
                frame1();
              }

              // stop animation
            },
            {
              key: "stopCollapseAnimation",
              value: function stopCollapseAnimation() {
                var animationSpeed = 400;
                $("#text-primary")
                  .removeClass("active")
                  .fadeIn(animationSpeed);
                $("#text-secondary").fadeOut(animationSpeed);
                $("#legend").fadeOut(animationSpeed);
                $("#expand-handler").removeClass("pulse");
              }

              /* end collapse animation */

              /* expand animation */
            },
            {
              key: "expandAnimationLoader",
              value: function expandAnimationLoader() {
                var animationSpeed = 400;
                var holdAnimation = 1800;
                var that = this;
                var isStopped = false;

                function screen1() {
                  $(".video")
                    .get(0)
                    .play();
                  $(".expanded-middle-content").fadeTo(animationSpeed, 1);
                  $(".screen-1")
                    .fadeIn(animationSpeed)
                    .delay(holdAnimation)
                    .fadeOut(animationSpeed, function() {
                      if (!isStopped) {
                        screen2();
                      }
                    });
                }

                function screen2() {
                  $(".screen-2")
                    .fadeIn(animationSpeed)
                    .delay(holdAnimation)
                    .fadeOut(animationSpeed, function() {
                      if (!isStopped) {
                        screen3();
                      }
                    });
                }

                function screen3() {
                  $(".screen-3")
                    .fadeIn(animationSpeed)
                    .delay(holdAnimation)
                    .fadeOut(animationSpeed, function() {
                      if (!isStopped) {
                        screen4();
                      }
                    });
                }

                function screen4() {
                  $(".screen-4")
                    .fadeIn(animationSpeed)
                    .delay(holdAnimation + 1000)
                    .fadeOut(animationSpeed, function() {
                      if (!isStopped) {
                        screen5();
                      }
                    });
                }

                function screen5() {
                  $(".screen-5")
                    .fadeIn(animationSpeed)
                    .delay(holdAnimation)
                    .fadeOut(animationSpeed, function() {
                      if (!isStopped) {
                        screen6();
                      }
                    });
                }

                function screen6() {
                  $(".screen-6").fadeIn(animationSpeed);
                  $(".video").fadeOut(animationSpeed, function() {
                    $(".video")
                      .get(0)
                      .pause();
                    $(".video").get(0).currentTime = 0;
                    if (!isStopped) {
                      screen7();
                    }
                  });
                }

                function screen7() {
                  setTimeout(function() {
                    $(".screen-6 .screen__subheading").fadeIn(
                      animationSpeed,
                      function() {
                        $(
                          ".expanded-middle-content .button, .replay-btn"
                        ).fadeIn(animationSpeed, function() {
                          that.isi.init();
                        });
                      }
                    );
                  }, holdAnimation / 2);
                }

                $(document).on("click", "#collapse-handler", function() {
                  isStopped = true;
                });

                // start animation
                screen1();
              }

              // repeat animation
            },
            {
              key: "repeatExpandAnimation",
              value: function repeatExpandAnimation() {
                var _this4 = this;

                var animationSpeed = 400;
                $(
                  ".expanded-middle-content .button, .replay-btn, .screen-6 .screen__subheading"
                ).fadeOut(animationSpeed);
                $(".screen-6").fadeOut(animationSpeed, function() {
                  $(".video").fadeIn();
                  _this4.expandAnimationLoader();
                });
              }

              // onclick repeat animation
            },
            {
              key: "handleClickRepeatExpandAnimation",
              value: function handleClickRepeatExpandAnimation() {
                var _this5 = this;

                $(document).on("click", ".replay-btn", function() {
                  _this5.repeatExpandAnimation();
                });
              }

              // stop animation
            },
            {
              key: "stopExpandAnimation",
              value: function stopExpandAnimation() {
                var animationSpeed = 400;
                $(
                  ".screen, .expanded-middle-content .button, .replay-btn, .screen-6 .screen__subheading"
                ).fadeOut(animationSpeed);
                $(".video").fadeIn(animationSpeed);
                $(".video")
                  .get(0)
                  .pause();
                $(".video").get(0).currentTime = 0;
              }

              /* end expand animation */
            }
          ]);

          return Expanding;
        })();
      },
      {
        "./components/isi.js": 2,
        "./util/helper-functions": 8,
        "./vendor/iscroll-probe.js": 9
      }
    ],
    6: [
      function(require, module, exports) {
        "use strict";

        var SetupExpanding = require("../components/setup-expanding");

        window.addEventListener("load", function() {
          var setPixelOffsets = function setPixelOffsets() {
            return Enabler.setExpandingPixelOffsets(300, 0, 600, 600);
          };
          var expandingBanner = new SetupExpanding(
            setPixelOffsets,
            "medscape",
            "vertical"
          );
          expandingBanner.init();
        });
      },
      { "../components/setup-expanding": 3 }
    ],
    7: [
      function(require, module, exports) {
        "use strict";

        window.addEventListener("load", function() {
          var body = document.getElementsByTagName("body")[0];
          var isiContainerWrapper = document.getElementById(
            "isi-container-wrapper"
          );
          var isiCollapsedContainerWrapper = document.getElementById(
            "isi-collapsed-container-wrapper"
          );
          var buttonContainer = document.createElement("div");
          var button = document.createElement("button");
          var description = document.createElement("p");

          buttonContainer.classList.add("expand-isi-button-container");
          button.classList.add("expand-isi-button");
          description.classList.add("expand-isi-button-description");

          var style = document.createTextNode(
            "\n  .expand-isi-button-container {\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    z-index: 10;\n    width: 165px;\n  }\n\n  button.expand-isi-button {\n    background-color: #ffffff;\n    text-align: center;\n    width: 100%;\n    padding: 10px 20px;\n    border: 2px solid #333333;\n    transition: all .1s;\n    color: #333333;\n    outline: none;\n  }\n\n  button.expand-isi-button:hover {\n    background-color: #333333;\n    color: #ffffff;\n  }\n\n  .expand-isi-button-description {\n    color: dimgrey;\n    font-size: 12px;\n    text-align: center;\n    margin: 5px 0;\n    font-style: italic;\n  }\n  "
          );

          var styleTag = document.createElement("style");
          styleTag.appendChild(style);
          document.getElementsByTagName("head")[0].appendChild(styleTag);

          function expandIsi() {
            button.removeEventListener("click", expandIsi);
            button.innerText = "COLLAPSE ISI";
            var offsetTop = isiContainerWrapper.getBoundingClientRect().top;
            isiContainerWrapper.style.height =
              "calc(100vh - " + offsetTop + "px)";
            if (isiCollapsedContainerWrapper !== null) {
              var offsetTopCollapsed = isiCollapsedContainerWrapper.getBoundingClientRect()
                .top;
              isiCollapsedContainerWrapper.style.height =
                "calc(100vh - " + offsetTopCollapsed + "px)";
            }
            button.addEventListener("click", collapseIsi);
          }

          function collapseIsi() {
            button.removeEventListener("click", collapseIsi);
            button.innerText = "EXPAND ISI";
            isiContainerWrapper.style.removeProperty("height");
            if (isiCollapsedContainerWrapper !== null) {
              isiCollapsedContainerWrapper.style.removeProperty("height");
            }
            button.addEventListener("click", expandIsi);
          }

          button.innerText = "EXPAND ISI";
          description.innerText =
            'This button is for development testing purposes only. It will not be included when the project is "Built".';
          button.addEventListener("click", expandIsi);
          buttonContainer.appendChild(button);
          buttonContainer.appendChild(description);
          body.appendChild(buttonContainer);
        });
      },
      {}
    ],
    8: [
      function(require, module, exports) {
        "use strict";

        module.exports = {
          fadeIn: function fadeIn(el, duration, callback) {
            el.style.opacity = 0;
            el.style.display = "block";

            var start = null;

            var step = function step(timestamp) {
              start = start ? start : timestamp;
              var progress = timestamp - start;
              el.style.opacity = Math.min(progress / duration, 1);
              if (progress <= duration) {
                window.requestAnimationFrame(step);
              } else {
                if (callback) callback();
              }
            };

            window.requestAnimationFrame(step);
          },

          fadeOut: function fadeOut(el, duration, callback) {
            el.style.opacity = 1;
            el.style.display = "block";

            var start = null;

            var step = function step(timestamp) {
              start = start ? start : timestamp;
              var progress = timestamp - start;
              el.style.opacity = Math.max(1 - progress / duration, 0);
              if (progress <= duration) {
                window.requestAnimationFrame(step);
              } else {
                el.style.display = "none";
                if (callback) callback();
              }
            };

            window.requestAnimationFrame(step);
          },

          animate: function animate(el, propObj) {
            var duration =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : 400;
            var easing =
              arguments.length > 3 && arguments[3] !== undefined
                ? arguments[3]
                : "ease-in";
            var callback = arguments[4];

            // Set optional variables regardless of order
            callback = callback
              ? callback
              : typeof easing === "function"
                ? easing
                : typeof duration === "function"
                  ? duration
                  : null;
            easing =
              typeof easing === "string"
                ? easing
                : typeof duration === "string"
                  ? duration
                  : "ease-in";
            duration = typeof duration === "number" ? duration : 400;

            var transitionArr = Object.keys(propObj).map(function(prop) {
              return (
                prop
                  .replace(/[A-Z]/g, function(g) {
                    return "-" + g[0];
                  })
                  .toLowerCase() +
                " " +
                duration / 1000 +
                "s " +
                easing
              );
            });

            var cssTransitionValue = getComputedStyle(el).getPropertyValue(
              "transition"
            );

            if (cssTransitionValue && cssTransitionValue !== "all 0s ease 0s") {
              transitionArr.push(cssTransitionValue);
            }

            var transitionString = transitionArr.join(", ");
            el.style.transition = transitionString;

            function handleTransitionEnd(e) {
              el.removeEventListener("transitionend", handleTransitionEnd);
              el.style.transition = "";
              if (callback) callback();
            }

            el.addEventListener("transitionend", handleTransitionEnd);

            Object.keys(propObj).forEach(function(prop) {
              el.style[prop] = propObj[prop];
            });
          }
        };
      },
      {}
    ],
    9: [
      function(require, module, exports) {
        "use strict";

        var _typeof =
          typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
            ? function(obj) {
                return typeof obj;
              }
            : function(obj) {
                return obj &&
                  typeof Symbol === "function" &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? "symbol"
                  : typeof obj;
              };

        /*! iScroll v5.2.0-snapshot ~ (c) 2008-2017 Matteo Spinelli ~ http://cubiq.org/license */
        (function(window, document, Math) {
          var rAF =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };

          var utils = (function() {
            var me = {};

            var _elementStyle = document.createElement("div").style;
            var _vendor = (function() {
              var vendors = ["t", "webkitT", "MozT", "msT", "OT"],
                transform,
                i = 0,
                l = vendors.length;

              for (; i < l; i++) {
                transform = vendors[i] + "ransform";
                if (transform in _elementStyle)
                  return vendors[i].substr(0, vendors[i].length - 1);
              }

              return false;
            })();

            function _prefixStyle(style) {
              if (_vendor === false) return false;
              if (_vendor === "") return style;
              return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
            }

            me.getTime =
              Date.now ||
              function getTime() {
                return new Date().getTime();
              };

            me.extend = function(target, obj) {
              for (var i in obj) {
                target[i] = obj[i];
              }
            };

            me.addEvent = function(el, type, fn, capture) {
              el.addEventListener(type, fn, !!capture);
            };

            me.removeEvent = function(el, type, fn, capture) {
              el.removeEventListener(type, fn, !!capture);
            };

            me.prefixPointerEvent = function(pointerEvent) {
              return window.MSPointerEvent
                ? "MSPointer" +
                    pointerEvent.charAt(7).toUpperCase() +
                    pointerEvent.substr(8)
                : pointerEvent;
            };

            me.momentum = function(
              current,
              start,
              time,
              lowerMargin,
              wrapperSize,
              deceleration
            ) {
              var distance = current - start,
                speed = Math.abs(distance) / time,
                destination,
                duration;

              deceleration = deceleration === undefined ? 0.0006 : deceleration;

              destination =
                current +
                ((speed * speed) / (2 * deceleration)) *
                  (distance < 0 ? -1 : 1);
              duration = speed / deceleration;

              if (destination < lowerMargin) {
                destination = wrapperSize
                  ? lowerMargin - (wrapperSize / 2.5) * (speed / 8)
                  : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed;
              } else if (destination > 0) {
                destination = wrapperSize
                  ? (wrapperSize / 2.5) * (speed / 8)
                  : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed;
              }

              return {
                destination: Math.round(destination),
                duration: duration
              };
            };

            var _transform = _prefixStyle("transform");

            me.extend(me, {
              hasTransform: _transform !== false,
              hasPerspective: _prefixStyle("perspective") in _elementStyle,
              hasTouch: "ontouchstart" in window,
              hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
              hasTransition: _prefixStyle("transition") in _elementStyle
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
            me.isBadAndroid = (function() {
              var appVersion = window.navigator.appVersion;
              // Android browser is not a chrome browser.
              if (
                /Android/.test(appVersion) &&
                !/Chrome\/\d/.test(appVersion)
              ) {
                var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
                if (
                  safariVersion &&
                  (typeof safariVersion === "undefined"
                    ? "undefined"
                    : _typeof(safariVersion)) === "object" &&
                  safariVersion.length >= 2
                ) {
                  return parseFloat(safariVersion[1]) < 535.19;
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })();

            me.extend((me.style = {}), {
              transform: _transform,
              transitionTimingFunction: _prefixStyle(
                "transitionTimingFunction"
              ),
              transitionDuration: _prefixStyle("transitionDuration"),
              transitionDelay: _prefixStyle("transitionDelay"),
              transformOrigin: _prefixStyle("transformOrigin"),
              touchAction: _prefixStyle("touchAction")
            });

            me.hasClass = function(e, c) {
              var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
              return re.test(e.className);
            };

            me.addClass = function(e, c) {
              if (me.hasClass(e, c)) {
                return;
              }

              var newclass = e.className.split(" ");
              newclass.push(c);
              e.className = newclass.join(" ");
            };

            me.removeClass = function(e, c) {
              if (!me.hasClass(e, c)) {
                return;
              }

              var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
              e.className = e.className.replace(re, " ");
            };

            me.offset = function(el) {
              var left = -el.offsetLeft,
                top = -el.offsetTop;

              // jshint -W084
              while ((el = el.offsetParent)) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
              }
              // jshint +W084

              return {
                left: left,
                top: top
              };
            };

            me.preventDefaultException = function(el, exceptions) {
              for (var i in exceptions) {
                if (exceptions[i].test(el[i])) {
                  return true;
                }
              }

              return false;
            };

            me.extend((me.eventType = {}), {
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

            me.extend((me.ease = {}), {
              linear: {
                style: "cubic-bezier(0, 0, 1, 1)",
                fn: function fn(k) {
                  return k;
                }
              },
              quadratic: {
                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fn: function fn(k) {
                  return k * (2 - k);
                }
              },
              circular: {
                style: "cubic-bezier(0.1, 0.57, 0.1, 1)", // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                fn: function fn(k) {
                  return Math.sqrt(1 - --k * k);
                }
              },
              back: {
                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                fn: function fn(k) {
                  var b = 4;
                  return (k = k - 1) * k * ((b + 1) * k + b) + 1;
                }
              },
              bounce: {
                style: "",
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
                style: "",
                fn: function fn(k) {
                  var f = 0.22,
                    e = 0.4;

                  if (k === 0) {
                    return 0;
                  }
                  if (k == 1) {
                    return 1;
                  }

                  return (
                    e *
                      Math.pow(2, -10 * k) *
                      Math.sin(((k - f / 4) * (2 * Math.PI)) / f) +
                    1
                  );
                }
              }
            });

            me.tap = function(e, eventName) {
              var ev = document.createEvent("Event");
              ev.initEvent(eventName, true, true);
              ev.pageX = e.pageX;
              ev.pageY = e.pageY;
              e.target.dispatchEvent(ev);
            };

            me.click = function(e) {
              var target = e.target,
                ev;

              if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
                // initMouseEvent is deprecated.
                ev = document.createEvent(
                  window.MouseEvent ? "MouseEvents" : "Event"
                );
                ev.initEvent("click", true, true);
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

            me.getTouchAction = function(eventPassthrough, addPinch) {
              var touchAction = "none";
              if (eventPassthrough === "vertical") {
                touchAction = "pan-y";
              } else if (eventPassthrough === "horizontal") {
                touchAction = "pan-x";
              }
              if (addPinch && touchAction != "none") {
                // add pinch-zoom support if the browser supports it, but if not (eg. Chrome <55) do nothing
                touchAction += " pinch-zoom";
              }
              return touchAction;
            };

            me.getRect = function(el) {
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
          })();
          function IScroll(el, options) {
            this.wrapper =
              typeof el == "string" ? document.querySelector(el) : el;
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
              bounceEasing: "",

              preventDefault: true,
              preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
              },

              HWCompositing: true,
              useTransition: true,
              useTransform: true,
              bindToWrapper: typeof window.onmousedown === "undefined"
            };

            for (var i in options) {
              this.options[i] = options[i];
            }

            // Normalize options
            this.translateZ =
              this.options.HWCompositing && utils.hasPerspective
                ? " translateZ(0)"
                : "";

            this.options.useTransition =
              utils.hasTransition && this.options.useTransition;
            this.options.useTransform =
              utils.hasTransform && this.options.useTransform;

            this.options.eventPassthrough =
              this.options.eventPassthrough === true
                ? "vertical"
                : this.options.eventPassthrough;
            this.options.preventDefault =
              !this.options.eventPassthrough && this.options.preventDefault;

            // If you want eventPassthrough I have to lock one of the axes
            this.options.scrollY =
              this.options.eventPassthrough == "vertical"
                ? false
                : this.options.scrollY;
            this.options.scrollX =
              this.options.eventPassthrough == "horizontal"
                ? false
                : this.options.scrollX;

            // With eventPassthrough we also need lockDirection mechanism
            this.options.freeScroll =
              this.options.freeScroll && !this.options.eventPassthrough;
            this.options.directionLockThreshold = this.options.eventPassthrough
              ? 0
              : this.options.directionLockThreshold;

            this.options.bounceEasing =
              typeof this.options.bounceEasing == "string"
                ? utils.ease[this.options.bounceEasing] || utils.ease.circular
                : this.options.bounceEasing;

            this.options.resizePolling =
              this.options.resizePolling === undefined
                ? 60
                : this.options.resizePolling;

            if (this.options.tap === true) {
              this.options.tap = "tap";
            }

            // https://github.com/cubiq/iscroll/issues/1029
            if (!this.options.useTransition && !this.options.useTransform) {
              if (!/relative|absolute/i.test(this.scrollerStyle.position)) {
                this.scrollerStyle.position = "relative";
              }
            }

            if (this.options.shrinkScrollbars == "scale") {
              this.options.useTransition = false;
            }

            this.options.invertWheelDirection = this.options
              .invertWheelDirection
              ? -1
              : 1;

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
            version: "5.2.0-snapshot",

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
              this._execEvent("destroy");
            },

            _transitionEnd: function _transitionEnd(e) {
              if (e.target != this.scroller || !this.isInTransition) {
                return;
              }

              this._transitionTime();
              if (!this.resetPosition(this.options.bounceTime)) {
                this.isInTransition = false;
                this._execEvent("scrollEnd");
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

              if (
                !this.enabled ||
                (this.initiated && utils.eventType[e.type] !== this.initiated)
              ) {
                return;
              }

              if (
                this.options.preventDefault &&
                !utils.isBadAndroid &&
                !utils.preventDefaultException(
                  e.target,
                  this.options.preventDefaultException
                )
              ) {
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
                this._execEvent("scrollEnd");
              } else if (!this.options.useTransition && this.isAnimating) {
                this.isAnimating = false;
                this._execEvent("scrollEnd");
              }

              this.startX = this.x;
              this.startY = this.y;
              this.absStartX = this.x;
              this.absStartY = this.y;
              this.pointX = point.pageX;
              this.pointY = point.pageY;

              this._execEvent("beforeScrollStart");
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
              if (
                timestamp - this.endTime > 300 &&
                absDistX < 10 &&
                absDistY < 10
              ) {
                return;
              }

              // If you are scrolling in one direction lock the other
              if (!this.directionLocked && !this.options.freeScroll) {
                if (absDistX > absDistY + this.options.directionLockThreshold) {
                  this.directionLocked = "h"; // lock horizontally
                } else if (
                  absDistY >=
                  absDistX + this.options.directionLockThreshold
                ) {
                  this.directionLocked = "v"; // lock vertically
                } else {
                  this.directionLocked = "n"; // no lock
                }
              }

              if (this.directionLocked == "h") {
                if (this.options.eventPassthrough == "vertical") {
                  e.preventDefault();
                } else if (this.options.eventPassthrough == "horizontal") {
                  this.initiated = false;
                  return;
                }

                deltaY = 0;
              } else if (this.directionLocked == "v") {
                if (this.options.eventPassthrough == "horizontal") {
                  e.preventDefault();
                } else if (this.options.eventPassthrough == "vertical") {
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
                newX = this.options.bounce
                  ? this.x + deltaX / 3
                  : newX > 0
                    ? 0
                    : this.maxScrollX;
              }
              if (newY > 0 || newY < this.maxScrollY) {
                newY = this.options.bounce
                  ? this.y + deltaY / 3
                  : newY > 0
                    ? 0
                    : this.maxScrollY;
              }

              this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
              this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

              if (!this.moved) {
                this._execEvent("scrollStart");
              }

              this.moved = true;

              this._translate(newX, newY);

              /* REPLACE START: _move */
              if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y;

                if (this.options.probeType == 1) {
                  this._execEvent("scroll");
                }
              }

              if (this.options.probeType > 1) {
                this._execEvent("scroll");
              }
              /* REPLACE END: _move */
            },

            _end: function _end(e) {
              if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return;
              }

              if (
                this.options.preventDefault &&
                !utils.preventDefaultException(
                  e.target,
                  this.options.preventDefaultException
                )
              ) {
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
                easing = "";

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

                this._execEvent("scrollCancel");
                return;
              }

              if (
                this._events.flick &&
                duration < 200 &&
                distanceX < 100 &&
                distanceY < 100
              ) {
                this._execEvent("flick");
                return;
              }

              // start momentum animation if needed
              if (this.options.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll
                  ? utils.momentum(
                      this.x,
                      this.startX,
                      duration,
                      this.maxScrollX,
                      this.options.bounce ? this.wrapperWidth : 0,
                      this.options.deceleration
                    )
                  : { destination: newX, duration: 0 };
                momentumY = this.hasVerticalScroll
                  ? utils.momentum(
                      this.y,
                      this.startY,
                      duration,
                      this.maxScrollY,
                      this.options.bounce ? this.wrapperHeight : 0,
                      this.options.deceleration
                    )
                  : { destination: newY, duration: 0 };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
              }

              if (this.options.snap) {
                var snap = this._nearestSnap(newX, newY);
                this.currentPage = snap;
                time =
                  this.options.snapSpeed ||
                  Math.max(
                    Math.max(
                      Math.min(Math.abs(newX - snap.x), 1000),
                      Math.min(Math.abs(newY - snap.y), 1000)
                    ),
                    300
                  );
                newX = snap.x;
                newY = snap.y;

                this.directionX = 0;
                this.directionY = 0;
                easing = this.options.bounceEasing;
              }

              // INSERT POINT: _end

              if (newX != this.x || newY != this.y) {
                // change easing function when scroller goes out of the boundaries
                if (
                  newX > 0 ||
                  newX < this.maxScrollX ||
                  newY > 0 ||
                  newY < this.maxScrollY
                ) {
                  easing = utils.ease.quadratic;
                }

                this.scrollTo(newX, newY, time, easing);
                return;
              }

              this._execEvent("scrollEnd");
            },

            _resize: function _resize() {
              var that = this;

              clearTimeout(this.resizeTimeout);

              this.resizeTimeout = setTimeout(function() {
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

              this.hasHorizontalScroll =
                this.options.scrollX && this.maxScrollX < 0;
              this.hasVerticalScroll =
                this.options.scrollY && this.maxScrollY < 0;

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
                this.wrapper.style[
                  utils.style.touchAction
                ] = utils.getTouchAction(this.options.eventPassthrough, true);

                // case. not support 'pinch-zoom'
                // https://github.com/cubiq/iscroll/issues/1118#issuecomment-270057583
                if (!this.wrapper.style[utils.style.touchAction]) {
                  this.wrapper.style[
                    utils.style.touchAction
                  ] = utils.getTouchAction(
                    this.options.eventPassthrough,
                    false
                  );
                }
              }
              this.wrapperOffset = utils.offset(this.wrapper);

              this._execEvent("refresh");

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

            scrollToElement: function scrollToElement(
              el,
              time,
              offsetX,
              offsetY,
              easing
            ) {
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
                offsetY = Math.round(
                  elRect.height / 2 - wrapperRect.height / 2
                );
              }

              pos.left -= offsetX || 0;
              pos.top -= offsetY || 0;

              pos.left =
                pos.left > 0
                  ? 0
                  : pos.left < this.maxScrollX
                    ? this.maxScrollX
                    : pos.left;
              pos.top =
                pos.top > 0
                  ? 0
                  : pos.top < this.maxScrollY
                    ? this.maxScrollY
                    : pos.top;

              time =
                time === undefined || time === null || time === "auto"
                  ? Math.max(
                      Math.abs(this.x - pos.left),
                      Math.abs(this.y - pos.top)
                    )
                  : time;

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

              this.scrollerStyle[durationProp] = time + "ms";

              if (!time && utils.isBadAndroid) {
                this.scrollerStyle[durationProp] = "0.0001ms";
                // remove 0.0001ms
                var self = this;
                rAF(function() {
                  if (self.scrollerStyle[durationProp] === "0.0001ms") {
                    self.scrollerStyle[durationProp] = "0s";
                  }
                });
              }

              if (this.indicators) {
                for (var i = this.indicators.length; i--; ) {
                  this.indicators[i].transitionTime(time);
                }
              }

              // INSERT POINT: _transitionTime
            },

            _transitionTimingFunction: function _transitionTimingFunction(
              easing
            ) {
              this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

              if (this.indicators) {
                for (var i = this.indicators.length; i--; ) {
                  this.indicators[i].transitionTimingFunction(easing);
                }
              }

              // INSERT POINT: _transitionTimingFunction
            },

            _translate: function _translate(x, y) {
              if (this.options.useTransform) {
                /* REPLACE START: _translate */

                this.scrollerStyle[utils.style.transform] =
                  "translate(" + x + "px," + y + "px)" + this.translateZ;

                /* REPLACE END: _translate */
              } else {
                x = Math.round(x);
                y = Math.round(y);
                this.scrollerStyle.left = x + "px";
                this.scrollerStyle.top = y + "px";
              }

              this.x = x;
              this.y = y;

              if (this.indicators) {
                for (var i = this.indicators.length; i--; ) {
                  this.indicators[i].updatePosition();
                }
              }

              // INSERT POINT: _translate
            },

            _initEvents: function _initEvents(remove) {
              var eventType = remove ? utils.removeEvent : utils.addEvent,
                target = this.options.bindToWrapper ? this.wrapper : window;

              eventType(window, "orientationchange", this);
              eventType(window, "resize", this);

              if (this.options.click) {
                eventType(this.wrapper, "click", this, true);
              }

              if (!this.options.disableMouse) {
                eventType(this.wrapper, "mousedown", this);
                eventType(target, "mousemove", this);
                eventType(target, "mousecancel", this);
                eventType(target, "mouseup", this);
              }

              if (utils.hasPointer && !this.options.disablePointer) {
                eventType(
                  this.wrapper,
                  utils.prefixPointerEvent("pointerdown"),
                  this
                );
                eventType(
                  target,
                  utils.prefixPointerEvent("pointermove"),
                  this
                );
                eventType(
                  target,
                  utils.prefixPointerEvent("pointercancel"),
                  this
                );
                eventType(target, utils.prefixPointerEvent("pointerup"), this);
              }

              if (utils.hasTouch && !this.options.disableTouch) {
                eventType(this.wrapper, "touchstart", this);
                eventType(target, "touchmove", this);
                eventType(target, "touchcancel", this);
                eventType(target, "touchend", this);
              }

              eventType(this.scroller, "transitionend", this);
              eventType(this.scroller, "webkitTransitionEnd", this);
              eventType(this.scroller, "oTransitionEnd", this);
              eventType(this.scroller, "MSTransitionEnd", this);
            },

            getComputedPosition: function getComputedPosition() {
              var matrix = window.getComputedStyle(this.scroller, null),
                x,
                y;

              if (this.options.useTransform) {
                matrix = matrix[utils.style.transform]
                  .split(")")[0]
                  .split(", ");
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
              } else {
                x = +matrix.left.replace(/[^-\d.]/g, "");
                y = +matrix.top.replace(/[^-\d.]/g, "");
              }

              return { x: x, y: y };
            },
            _initIndicators: function _initIndicators() {
              var interactive = this.options.interactiveScrollbars,
                customStyle = typeof this.options.scrollbars != "string",
                indicators = [],
                indicator;

              var that = this;

              this.indicators = [];

              if (this.options.scrollbars) {
                // Vertical scrollbar
                if (this.options.scrollY) {
                  indicator = {
                    el: createDefaultScrollbar(
                      "v",
                      interactive,
                      this.options.scrollbars
                    ),
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
                    el: createDefaultScrollbar(
                      "h",
                      interactive,
                      this.options.scrollbars
                    ),
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

              for (var i = indicators.length; i--; ) {
                this.indicators.push(new Indicator(this, indicators[i]));
              }

              // TODO: check if we can use array.map (wide compatibility and performance issues)
              function _indicatorsMap(fn) {
                if (that.indicators) {
                  for (var i = that.indicators.length; i--; ) {
                    fn.call(that.indicators[i]);
                  }
                }
              }

              if (this.options.fadeScrollbars) {
                this.on("scrollEnd", function() {
                  _indicatorsMap(function() {
                    this.fade();
                  });
                });

                this.on("scrollCancel", function() {
                  _indicatorsMap(function() {
                    this.fade();
                  });
                });

                this.on("scrollStart", function() {
                  _indicatorsMap(function() {
                    this.fade(1);
                  });
                });

                this.on("beforeScrollStart", function() {
                  _indicatorsMap(function() {
                    this.fade(1, true);
                  });
                });
              }

              this.on("refresh", function() {
                _indicatorsMap(function() {
                  this.refresh();
                });
              });

              this.on("destroy", function() {
                _indicatorsMap(function() {
                  this.destroy();
                });

                delete this.indicators;
              });
            },

            _initWheel: function _initWheel() {
              utils.addEvent(this.wrapper, "wheel", this);
              utils.addEvent(this.wrapper, "mousewheel", this);
              utils.addEvent(this.wrapper, "DOMMouseScroll", this);

              this.on("destroy", function() {
                clearTimeout(this.wheelTimeout);
                this.wheelTimeout = null;
                utils.removeEvent(this.wrapper, "wheel", this);
                utils.removeEvent(this.wrapper, "mousewheel", this);
                utils.removeEvent(this.wrapper, "DOMMouseScroll", this);
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
                that._execEvent("scrollStart");
              }

              // Execute the scrollEnd event after 400ms the wheel stopped scrolling
              clearTimeout(this.wheelTimeout);
              this.wheelTimeout = setTimeout(function() {
                if (!that.options.snap) {
                  that._execEvent("scrollEnd");
                }
                that.wheelTimeout = undefined;
              }, 400);

              if ("deltaX" in e) {
                if (e.deltaMode === 1) {
                  wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
                  wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
                } else {
                  wheelDeltaX = -e.deltaX;
                  wheelDeltaY = -e.deltaY;
                }
              } else if ("wheelDeltaX" in e) {
                wheelDeltaX =
                  (e.wheelDeltaX / 120) * this.options.mouseWheelSpeed;
                wheelDeltaY =
                  (e.wheelDeltaY / 120) * this.options.mouseWheelSpeed;
              } else if ("wheelDelta" in e) {
                wheelDeltaX = wheelDeltaY =
                  (e.wheelDelta / 120) * this.options.mouseWheelSpeed;
              } else if ("detail" in e) {
                wheelDeltaX = wheelDeltaY =
                  (-e.detail / 3) * this.options.mouseWheelSpeed;
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

              newX =
                this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
              newY =
                this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

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
                this._execEvent("scroll");
              }

              // INSERT POINT: _wheel
            },

            _initSnap: function _initSnap() {
              this.currentPage = {};

              if (typeof this.options.snap == "string") {
                this.options.snap = this.scroller.querySelectorAll(
                  this.options.snap
                );
              }

              this.on("refresh", function() {
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

                if (
                  !this.wrapperWidth ||
                  !this.wrapperHeight ||
                  !this.scrollerWidth ||
                  !this.scrollerHeight
                ) {
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

                this.goToPage(
                  this.currentPage.pageX || 0,
                  this.currentPage.pageY || 0,
                  0
                );

                // Update snap threshold if needed
                if (this.options.snapThreshold % 1 === 0) {
                  this.snapThresholdX = this.options.snapThreshold;
                  this.snapThresholdY = this.options.snapThreshold;
                } else {
                  this.snapThresholdX = Math.round(
                    this.pages[this.currentPage.pageX][this.currentPage.pageY]
                      .width * this.options.snapThreshold
                  );
                  this.snapThresholdY = Math.round(
                    this.pages[this.currentPage.pageX][this.currentPage.pageY]
                      .height * this.options.snapThreshold
                  );
                }
              });

              this.on("flick", function() {
                var time =
                  this.options.snapSpeed ||
                  Math.max(
                    Math.max(
                      Math.min(Math.abs(this.x - this.startX), 1000),
                      Math.min(Math.abs(this.y - this.startY), 1000)
                    ),
                    300
                  );

                this.goToPage(
                  this.currentPage.pageX + this.directionX,
                  this.currentPage.pageY + this.directionY,
                  time
                );
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
              if (
                Math.abs(x - this.absStartX) < this.snapThresholdX &&
                Math.abs(y - this.absStartY) < this.snapThresholdY
              ) {
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

              time =
                time === undefined
                  ? this.options.snapSpeed ||
                    Math.max(
                      Math.max(
                        Math.min(Math.abs(posX - this.x), 1000),
                        Math.min(Math.abs(posY - this.y), 1000)
                      ),
                      300
                    )
                  : time;

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
              if (_typeof(this.options.keyBindings) == "object") {
                for (i in this.options.keyBindings) {
                  if (typeof this.options.keyBindings[i] == "string") {
                    this.options.keyBindings[i] = this.options.keyBindings[i]
                      .toUpperCase()
                      .charCodeAt(0);
                  }
                }
              } else {
                this.options.keyBindings = {};
              }

              for (i in keys) {
                this.options.keyBindings[i] =
                  this.options.keyBindings[i] || keys[i];
              }

              utils.addEvent(window, "keydown", this);

              this.on("destroy", function() {
                utils.removeEvent(window, "keydown", this);
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
                acceleration = 0.25,
                pos;

              if (this.options.useTransition && this.isInTransition) {
                pos = this.getComputedPosition();

                this._translate(Math.round(pos.x), Math.round(pos.y));
                this.isInTransition = false;
              }

              this.keyAcceleration =
                now - prevTime < 200
                  ? Math.min(this.keyAcceleration + acceleration, 50)
                  : 0;

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
                  newX += snap ? -1 : (5 + this.keyAcceleration) >> 0;
                  break;
                case this.options.keyBindings.up:
                  newY += snap ? 1 : (5 + this.keyAcceleration) >> 0;
                  break;
                case this.options.keyBindings.right:
                  newX -= snap ? -1 : (5 + this.keyAcceleration) >> 0;
                  break;
                case this.options.keyBindings.down:
                  newY -= snap ? 1 : (5 + this.keyAcceleration) >> 0;
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
                    that._execEvent("scrollEnd");
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
                  that._execEvent("scroll");
                }
              }

              this.isAnimating = true;
              step();
            },

            handleEvent: function handleEvent(e) {
              switch (e.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                  this._start(e);
                  break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                  this._move(e);
                  break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                  this._end(e);
                  break;
                case "orientationchange":
                case "resize":
                  this._resize();
                  break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                  this._transitionEnd(e);
                  break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                  this._wheel(e);
                  break;
                case "keydown":
                  this._key(e);
                  break;
                case "click":
                  if (this.enabled && !e._constructed) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  break;
              }
            }
          };
          function createDefaultScrollbar(direction, interactive, type) {
            var scrollbar = document.createElement("div"),
              indicator = document.createElement("div");

            if (type === true) {
              scrollbar.style.cssText = "position:absolute;z-index:9999";
              indicator.style.cssText =
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px";
            }

            indicator.className = "iScrollIndicator";

            if (direction == "h") {
              if (type === true) {
                scrollbar.style.cssText +=
                  ";height:7px;left:2px;right:2px;bottom:0";
                indicator.style.height = "100%";
              }
              scrollbar.className = "iScrollHorizontalScrollbar";
            } else {
              if (type === true) {
                scrollbar.style.cssText +=
                  ";width:7px;bottom:2px;top:2px;right:1px";
                indicator.style.width = "100%";
              }
              scrollbar.className = "iScrollVerticalScrollbar";
            }

            scrollbar.style.cssText += ";overflow:hidden";

            if (!interactive) {
              scrollbar.style.pointerEvents = "none";
            }

            scrollbar.appendChild(indicator);

            return scrollbar;
          }

          function Indicator(scroller, options) {
            this.wrapper =
              typeof options.el == "string"
                ? document.querySelector(options.el)
                : options.el;
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
                utils.addEvent(this.indicator, "touchstart", this);
                utils.addEvent(window, "touchend", this);
              }
              if (!this.options.disablePointer) {
                utils.addEvent(
                  this.indicator,
                  utils.prefixPointerEvent("pointerdown"),
                  this
                );
                utils.addEvent(
                  window,
                  utils.prefixPointerEvent("pointerup"),
                  this
                );
              }
              if (!this.options.disableMouse) {
                utils.addEvent(this.indicator, "mousedown", this);
                utils.addEvent(window, "mouseup", this);
              }
            }

            if (this.options.fade) {
              this.wrapperStyle[
                utils.style.transform
              ] = this.scroller.translateZ;
              var durationProp = utils.style.transitionDuration;
              if (!durationProp) {
                return;
              }
              this.wrapperStyle[durationProp] = utils.isBadAndroid
                ? "0.0001ms"
                : "0ms";
              // remove 0.0001ms
              var self = this;
              if (utils.isBadAndroid) {
                rAF(function() {
                  if (self.wrapperStyle[durationProp] === "0.0001ms") {
                    self.wrapperStyle[durationProp] = "0s";
                  }
                });
              }
              this.wrapperStyle.opacity = "0";
            }
          }

          Indicator.prototype = {
            handleEvent: function handleEvent(e) {
              switch (e.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                  this._start(e);
                  break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                  this._move(e);
                  break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
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
                utils.removeEvent(this.indicator, "touchstart", this);
                utils.removeEvent(
                  this.indicator,
                  utils.prefixPointerEvent("pointerdown"),
                  this
                );
                utils.removeEvent(this.indicator, "mousedown", this);

                utils.removeEvent(window, "touchmove", this);
                utils.removeEvent(
                  window,
                  utils.prefixPointerEvent("pointermove"),
                  this
                );
                utils.removeEvent(window, "mousemove", this);

                utils.removeEvent(window, "touchend", this);
                utils.removeEvent(
                  window,
                  utils.prefixPointerEvent("pointerup"),
                  this
                );
                utils.removeEvent(window, "mouseup", this);
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
                utils.addEvent(window, "touchmove", this);
              }
              if (!this.options.disablePointer) {
                utils.addEvent(
                  window,
                  utils.prefixPointerEvent("pointermove"),
                  this
                );
              }
              if (!this.options.disableMouse) {
                utils.addEvent(window, "mousemove", this);
              }

              this.scroller._execEvent("beforeScrollStart");
            },

            _move: function _move(e) {
              var point = e.touches ? e.touches[0] : e,
                deltaX,
                deltaY,
                newX,
                newY,
                timestamp = utils.getTime();

              if (!this.moved) {
                this.scroller._execEvent("scrollStart");
              }

              this.moved = true;

              deltaX = point.pageX - this.lastPointX;
              this.lastPointX = point.pageX;

              deltaY = point.pageY - this.lastPointY;
              this.lastPointY = point.pageY;

              newX = this.x + deltaX;
              newY = this.y + deltaY;

              this._pos(newX, newY);

              if (
                this.scroller.options.probeType == 1 &&
                timestamp - this.startTime > 300
              ) {
                this.startTime = timestamp;
                this.scroller._execEvent("scroll");
              } else if (this.scroller.options.probeType > 1) {
                this.scroller._execEvent("scroll");
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

              utils.removeEvent(window, "touchmove", this);
              utils.removeEvent(
                window,
                utils.prefixPointerEvent("pointermove"),
                this
              );
              utils.removeEvent(window, "mousemove", this);

              if (this.scroller.options.snap) {
                var snap = this.scroller._nearestSnap(
                  this.scroller.x,
                  this.scroller.y
                );

                var time =
                  this.options.snapSpeed ||
                  Math.max(
                    Math.max(
                      Math.min(Math.abs(this.scroller.x - snap.x), 1000),
                      Math.min(Math.abs(this.scroller.y - snap.y), 1000)
                    ),
                    300
                  );

                if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
                  this.scroller.directionX = 0;
                  this.scroller.directionY = 0;
                  this.scroller.currentPage = snap;
                  this.scroller.scrollTo(
                    snap.x,
                    snap.y,
                    time,
                    this.scroller.options.bounceEasing
                  );
                }
              }

              if (this.moved) {
                this.scroller._execEvent("scrollEnd");
              }
            },

            transitionTime: function transitionTime(time) {
              time = time || 0;
              var durationProp = utils.style.transitionDuration;
              if (!durationProp) {
                return;
              }

              this.indicatorStyle[durationProp] = time + "ms";

              if (!time && utils.isBadAndroid) {
                this.indicatorStyle[durationProp] = "0.0001ms";
                // remove 0.0001ms
                var self = this;
                rAF(function() {
                  if (self.indicatorStyle[durationProp] === "0.0001ms") {
                    self.indicatorStyle[durationProp] = "0s";
                  }
                });
              }
            },

            transitionTimingFunction: function transitionTimingFunction(
              easing
            ) {
              this.indicatorStyle[
                utils.style.transitionTimingFunction
              ] = easing;
            },

            refresh: function refresh() {
              this.transitionTime();

              if (this.options.listenX && !this.options.listenY) {
                this.indicatorStyle.display = this.scroller.hasHorizontalScroll
                  ? "block"
                  : "none";
              } else if (this.options.listenY && !this.options.listenX) {
                this.indicatorStyle.display = this.scroller.hasVerticalScroll
                  ? "block"
                  : "none";
              } else {
                this.indicatorStyle.display =
                  this.scroller.hasHorizontalScroll ||
                  this.scroller.hasVerticalScroll
                    ? "block"
                    : "none";
              }

              if (
                this.scroller.hasHorizontalScroll &&
                this.scroller.hasVerticalScroll
              ) {
                utils.addClass(this.wrapper, "iScrollBothScrollbars");
                utils.removeClass(this.wrapper, "iScrollLoneScrollbar");

                if (
                  this.options.defaultScrollbars &&
                  this.options.customStyle
                ) {
                  if (this.options.listenX) {
                    this.wrapper.style.right = "8px";
                  } else {
                    this.wrapper.style.bottom = "8px";
                  }
                }
              } else {
                utils.removeClass(this.wrapper, "iScrollBothScrollbars");
                utils.addClass(this.wrapper, "iScrollLoneScrollbar");

                if (
                  this.options.defaultScrollbars &&
                  this.options.customStyle
                ) {
                  if (this.options.listenX) {
                    this.wrapper.style.right = "2px";
                  } else {
                    this.wrapper.style.bottom = "2px";
                  }
                }
              }

              utils.getRect(this.wrapper); // force refresh

              if (this.options.listenX) {
                this.wrapperWidth = this.wrapper.clientWidth;
                if (this.options.resize) {
                  this.indicatorWidth = Math.max(
                    Math.round(
                      (this.wrapperWidth * this.wrapperWidth) /
                        (this.scroller.scrollerWidth || this.wrapperWidth || 1)
                    ),
                    8
                  );
                  this.indicatorStyle.width = this.indicatorWidth + "px";
                } else {
                  this.indicatorWidth = this.indicator.clientWidth;
                }

                this.maxPosX = this.wrapperWidth - this.indicatorWidth;

                if (this.options.shrink == "clip") {
                  this.minBoundaryX = -this.indicatorWidth + 8;
                  this.maxBoundaryX = this.wrapperWidth - 8;
                } else {
                  this.minBoundaryX = 0;
                  this.maxBoundaryX = this.maxPosX;
                }

                this.sizeRatioX =
                  this.options.speedRatioX ||
                  (this.scroller.maxScrollX &&
                    this.maxPosX / this.scroller.maxScrollX);
              }

              if (this.options.listenY) {
                this.wrapperHeight = this.wrapper.clientHeight;
                if (this.options.resize) {
                  this.indicatorHeight = Math.max(
                    Math.round(
                      (this.wrapperHeight * this.wrapperHeight) /
                        (this.scroller.scrollerHeight ||
                          this.wrapperHeight ||
                          1)
                    ),
                    8
                  );
                  this.indicatorStyle.height = this.indicatorHeight + "px";
                } else {
                  this.indicatorHeight = this.indicator.clientHeight;
                }

                this.maxPosY = this.wrapperHeight - this.indicatorHeight;

                if (this.options.shrink == "clip") {
                  this.minBoundaryY = -this.indicatorHeight + 8;
                  this.maxBoundaryY = this.wrapperHeight - 8;
                } else {
                  this.minBoundaryY = 0;
                  this.maxBoundaryY = this.maxPosY;
                }

                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                this.sizeRatioY =
                  this.options.speedRatioY ||
                  (this.scroller.maxScrollY &&
                    this.maxPosY / this.scroller.maxScrollY);
              }

              this.updatePosition();
            },

            updatePosition: function updatePosition() {
              var x =
                  (this.options.listenX &&
                    Math.round(this.sizeRatioX * this.scroller.x)) ||
                  0,
                y =
                  (this.options.listenY &&
                    Math.round(this.sizeRatioY * this.scroller.y)) ||
                  0;

              if (!this.options.ignoreBoundaries) {
                if (x < this.minBoundaryX) {
                  if (this.options.shrink == "scale") {
                    this.width = Math.max(this.indicatorWidth + x, 8);
                    this.indicatorStyle.width = this.width + "px";
                  }
                  x = this.minBoundaryX;
                } else if (x > this.maxBoundaryX) {
                  if (this.options.shrink == "scale") {
                    this.width = Math.max(
                      this.indicatorWidth - (x - this.maxPosX),
                      8
                    );
                    this.indicatorStyle.width = this.width + "px";
                    x = this.maxPosX + this.indicatorWidth - this.width;
                  } else {
                    x = this.maxBoundaryX;
                  }
                } else if (
                  this.options.shrink == "scale" &&
                  this.width != this.indicatorWidth
                ) {
                  this.width = this.indicatorWidth;
                  this.indicatorStyle.width = this.width + "px";
                }

                if (y < this.minBoundaryY) {
                  if (this.options.shrink == "scale") {
                    this.height = Math.max(this.indicatorHeight + y * 3, 8);
                    this.indicatorStyle.height = this.height + "px";
                  }
                  y = this.minBoundaryY;
                } else if (y > this.maxBoundaryY) {
                  if (this.options.shrink == "scale") {
                    this.height = Math.max(
                      this.indicatorHeight - (y - this.maxPosY) * 3,
                      8
                    );
                    this.indicatorStyle.height = this.height + "px";
                    y = this.maxPosY + this.indicatorHeight - this.height;
                  } else {
                    y = this.maxBoundaryY;
                  }
                } else if (
                  this.options.shrink == "scale" &&
                  this.height != this.indicatorHeight
                ) {
                  this.height = this.indicatorHeight;
                  this.indicatorStyle.height = this.height + "px";
                }
              }

              this.x = x;
              this.y = y;

              if (this.scroller.options.useTransform) {
                this.indicatorStyle[utils.style.transform] =
                  "translate(" +
                  x +
                  "px," +
                  y +
                  "px)" +
                  this.scroller.translateZ;
              } else {
                this.indicatorStyle.left = x + "px";
                this.indicatorStyle.top = y + "px";
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

              x = this.options.listenX
                ? Math.round(x / this.sizeRatioX)
                : this.scroller.x;
              y = this.options.listenY
                ? Math.round(y / this.sizeRatioY)
                : this.scroller.y;

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

              val = val ? "1" : "0";

              this.wrapperStyle[utils.style.transitionDuration] = time + "ms";

              this.fadeTimeout = setTimeout(
                function(val) {
                  this.wrapperStyle.opacity = val;
                  this.visible = +val;
                }.bind(this, val),
                delay
              );
            }
          };

          IScroll.utils = utils;

          if (typeof module != "undefined" && module.exports) {
            module.exports = IScroll;
          } else if (typeof define == "function" && define.amd) {
            define(function() {
              return IScroll;
            });
          } else {
            window.IScroll = IScroll;
          }
        })(window, document, Math);
      },
      {}
    ]
  },
  {},
  [6, 7]
);
