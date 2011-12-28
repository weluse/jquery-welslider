/**
 * jquery.welslider.js v0.1
 * ~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * A simple image gallery slider jQuery plugin.
 *
 * Example:
 * --------
 *
 * ::
 *
 *     <ul id="myfancygallery">
 *       <li><img src="img1.png" alt="Mountain" /></li>
 *       <li><img src="img2.png" alt="Fountain" /></li>
 *       <li><img src="img3.png" alt="Marten" /></li>
 *     </ul>
 *     <script type="text/javascript">
 *       $(function () {
 *          $("#myfancygallery").welSlider();
 *       });
 *     </script>
 *
 * Options:
 * --------
 *  - wrapperClass: CSS class name for the surrounding <div> wrapper element.
 *  - navigationClass: CSS class name for the <div> containing the navigation
 *    elements.
 *  - autoSlide: Enables automatic sliding after ``n`` ms if ``n`` is > 0.
 *  - slidingDuration: Time in miliseconds the animation between two slides
 *    takes.
 *  - showNavigation: If ``false`` no navigation will be rendered.
 *  - showControls: If ``false`` no control dots are displayed. This only works
 *    if ``showNavigation`` is enabled.
 *  - easing: The easing used for the sliding animation. Defaults to 'swing'
 *    that is built into jQuery core.
 *
 * Requirements:
 * -------------
 *
 *  - jQuery 1.4+
 *  - jQuery UI 1.8+ (core + widget)
 *
 * :copyright: 2010 - 2011, weluse (http://weluse.de/)
 * :author: Pascal Hartig <phartig@weluse.de>
 * :license: BSD, see LICENSE for more details.
 */

/*global $, window */
/*jslint
    white: true, onevar: true, undef: true, newcap: true regexp: true,
    plusplus: true, bitwise: true, strict: true, maxerr: 50, maxlen: 78,
    indent: 4
*/
(function () {
    "use strict";

    $.widget('ui.welSlider', {
        options: {
            navigationClass: 'slideshow-nav',
            wrapperClass: 'slideshow',
            autoSlide: 0,
            slidingDuration: 1000,
            showNavigation: true,
            showControls: true,
            easing: 'swing'
        },

        _create: function () {
            this._origStyle = this.element.attr('style');
            this._wrapper = this._createWrapper();

            if (this.options.showNavigation) {
                this._createNavigation();
                if (this.options.showControls) {
                    this._createControls();
                }
            }

            this.index = 0;
            this.count = this.element.find("> li").length;

            if (this.options.autoSlide > 0) {
                this.startAutoslide();
            }
        },

        destroy: function () {
            this.stopAutoslide();
            // Remove the navigation if created.
            if (this.options.showControls) {
                this._wrapper.find('.' + this.options.navigationClass)
                    .remove();
            }

            this.element.unwrap().attr('style', this._origStyle);
            // call to super
            $.Widget.prototype.destroy.call(this);
        },

        _createWrapper: function () {
            var $wrapper = $("<div />", {
                'class': this.options.wrapperClass
            });
            return this.element.wrap($wrapper).parent();
        },

        _createNavigation: function () {
            var that = this;
            this._wrapper.append(
                $("<div />", {
                    'class': this.options.navigationClass
                }).append(
                    $("<a />", {
                        'class': "previous",
                        href: "#",
                        click: function () {
                            that.previous();
                            return false;
                        }
                    })
                ).append(
                    $("<a />", {
                        'class': "next",
                        href: "#",
                        click: function () {
                            that.next();
                            return false;
                        }
                    })
                )
            );
        },

        /**
        * Creates those tiny little bulps between the navigation arrows.
        */
        _createControls: function () {
            var that = this,
                $nav = this._wrapper.find("." + this.options.navigationClass),
                $controls = $("<ul />", {
                    'class': 'controls'
                }).appendTo($nav);

            $(this.element.find("> li")).each(function (i) {
                var className = (i === 0 ? 'active' : '');

                $controls.append($("<li />", {
                    'class': className,
                    click: function () {
                        that.gotoEl(i);
                        return false;
                    }
                }));
            });
        },

        _selectDot: function (index) {
            this._wrapper.find(".controls").
                find(".active").removeClass("active").end().
                find("li").eq(index).addClass("active");
        },

        startAutoslide: function () {
            var that = this;

            this.element.data(
                'autoslideInterval',
                window.setInterval(function () {
                    that.next();
                }, this.options.autoSlide)
            );
        },

        stopAutoslide: function () {
            window.clearInterval(this.element.data('autoslideInterval'));
        },

        resetAutoslide: function () {
            this.stopAutoslide();
            this.startAutoslide();
        },

        previous: function () {
            if (this.index > 0) {
                this.gotoEl(this.index - 1);
            } else {
                this.gotoEl(this.count - 1);
            }
        },

        next: function () {
            if (this.index < this.count - 1) {
                this.gotoEl(this.index + 1);
            } else {
                this.gotoEl(0);
            }
        },

        gotoEl: function (index) {
            var marginLeft;
            // Prevent the user from being "slided away" right
            // after their click.
            this.resetAutoslide();

            this.index = index;
            marginLeft = index * this.element.find("li").eq(0).innerWidth();

            this.element.animate({
                'margin-left': -1 * marginLeft
            }, {
                queue: false,
                easing: this.options.easing
            }, this.options.slidingDuration);

            this._selectDot(index);
        }
    });
}());
