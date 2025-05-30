// ==UserScript==
// @name         Trakt to Others
// @description  Userscript helpers for trakt
// @namespace    https://github.com/ahbanavi/userscripts
// @version      0.2.2
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
  ("use strict");

  if (window.location.href.indexOf("/episodes/") > -1) {
    return;
  }

  console.log("> Trakt to Others Loaded!");

  function getImdbId(url) {
    var imdbId = url.split("/")[4];
    return imdbId;
  }

  var imdbHref = document.querySelector("#external-link-imdb").href;
  var imdbId = getImdbId(imdbHref);

  var title = document.querySelector('meta[property="og:title"]').content;

  var external = document.querySelector("ul.external");
  var li = external.querySelector("li");

  var cnama = document.createElement("a");
  cnama.href = "https://30nama.com/search?q=" + imdbId;
  cnama.target = "_blank";
  cnama.innerHTML = "30nama";

  var nyaa = document.createElement("a");
  nyaa.href = "https://nyaa.si/?f=0&c=0_0&q=" + title;
  nyaa.target = "_blank";
  nyaa.innerHTML = "nyaa";

  var subsource = document.createElement("a");
  subsource.href = "https://subsource.net/search/" + imdbId;
  subsource.target = "_blank";
  subsource.innerHTML = "subsource"

  li.insertBefore(subsource, li.firstChild);
  li.insertBefore(nyaa, li.firstChild);
  li.insertBefore(cnama, li.firstChild);
})();
