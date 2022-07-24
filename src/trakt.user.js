// ==UserScript==
// @name         Trakt to 30nama
// @description  Userscript helpers for trakt
// @namespace    https://github.com/ahbanavi/userscripts
// @version      0.1.0
// @author       ahbanavi
// @homepage     https://github.com/ahbanavi/userscripts
// @supportURL   https://github.com/ahbanavi/userscripts/issues
// @match        https://trakt.tv/movies/*
// @match        https://trakt.tv/shows/*
// @iconURL      https://walter.trakt.tv/hotlink-ok/public/favicon.ico
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  if (window.location.href.indexOf("/episodes/") > -1) {
    return;
  }

  console.log("> Trakt to 30nama Loaded!");

  function getImdbId(url) {
    var imdbId = url.split("/")[4];
    return imdbId;
  }

  // get href from a tag with id = 'external-link-imdb'
  var imdbHref = document.querySelector("#external-link-imdb").href;
  var imdbId = getImdbId(imdbHref);

  // get li from ul with class "external"
  var external = document.querySelector("ul.external");
  var li = external.querySelector("li");

  // add a tag to li
  var a = document.createElement("a");
  a.href = "https://30nama.com/search?q=" + imdbId;
  a.target = "_blank";
  a.innerHTML = "30nama";

  // append first before first a tag in li
  li.insertBefore(a, li.firstChild);
})();
