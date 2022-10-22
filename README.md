# Spartan
JavaScript module and CSS to create menu navigation based on #hash links

See a simple working demo at: https://davescodemusings.github.io/spartan/

# What is it?
Spartan lets you create a single page web app with left-side accordian menu navigation. All routing is done with #hash names. You can click a menu selection or link ending in a #hash and the Spartan JavaScript will take care of running the correct script or loading HTML content. You can also enter a URL with a #hash directly into the address bar and Spartan will update the menu to indicate which choice is currently active.

# Why should I care?
There's plenty of libraries and frameworks to choose from for front-end web development. I wanted something simple built using vanilla HTML5, JavaScript and CSS. I wanted to get a decent looking site without a lot of parameter tweaking. That's how Spartan got started.

Spartan is also very small (around 8K in size.) Recently, I've been running it on an ESP8266 microcontroller (80MHz CPU with about 40K of usable RAM and 4M of flash) just to prove it can be done.

If any of this sounds interesting, maybe give Spartan a try.

# How do I use it?
Take a look at the HTML source of the demo to see how the spartan.js module and spartan.css stylesheet can be included in the HTML alongside your own content and JavaScript functions.

To keep Spartan simple, there is no table of function routes. The hash name determines the function name or the HTML file name. For example, if the hash is #home, a function named home() will be run. If there's no function with that name, Spartan attempts to load home.html. If that does nto exist, an error message is shown.

See the demo page for concrete examples.

# What browsers are supported?
Since Spartan uses vanilla HTML5, JavaScript, and CSS, any modern standards-compliant browser should work. However, as a development team of one, I don't test anything beyond Firefox and Microsoft Edge.
