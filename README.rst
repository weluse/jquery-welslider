========================
jquery.welslider.js v0.1
========================

A simple image gallery slider jQuery plugin.

Example
=======

::

    <ul id="myfancygallery">
      <li><img src="img1.png" alt="Mountain" /></li>
      <li><img src="img2.png" alt="Fountain" /></li>
      <li><img src="img3.png" alt="Marten" /></li>
    </ul>
    <script type="text/javascript">
      $(function () {
         $("#myfancygallery").welSlider();
      });
    </script>


Options
=======

 - wrapperClass: CSS class name for the surrounding <div> wrapper element.
 - navigationClass: CSS class name for the <div> containing the navigation
   elements.
 - autoSlide: Enables automatic sliding after ``n`` ms if ``n`` is > 0.
 - slidingDuration: Time in miliseconds the animation between two slides
   takes.
 - showNavigation: If ``false`` no navigation will be rendered.
 - showControls: If ``false`` no control dots are displayed. This only works
   if ``showNavigation`` is enabled.
 - easing: The easing used for the sliding animation. Defaults to 'swing'
   that is built into jQuery core.


Requirements
============

 - jQuery 1.4+
 - jQuery UI 1.8+ (core + widget)


FAQ
===

Why yet another one?
--------------------

Because most of the existing plugins just suck. Take simpleslide_ for example.
The website really rocks, but the code utilizes global state is not a jQuery
plugin at all. No offense, my code is far from being perfect and it looked
exactly like this when I started, but I don't want to use code like this in
projects I work on.

.. _simpleslide: http://simplesli.de/

Why the jQuery UI dependency?
-----------------------------

I just really like the Widget API it provides. If you don't like another
dependency I'm sorry but you'll have to search on.

I want feature X!
-----------------

Probably not going to happen. Have a look at galleryview_. The code it clean and
it provides lots of cool features.

.. _galleryview: http://spaceforaname.com/galleryview/
