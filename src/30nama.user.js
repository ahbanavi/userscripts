// ==UserScript==
// @name         30nama Tools
// @description  Userscript helpers for 30nama
// @namespace    https://github.com/ahbanavi/userscripts
// @version      0.3.0
// @author       ahbanavi
// @homepage     https://github.com/ahbanavi/userscripts
// @supportURL   https://github.com/ahbanavi/userscripts/issues
// @match        https://30nama.com/*
// @iconURL      https://30nama.com/favicon.ico
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var pushState = history.pushState;
  var replaceState = history.replaceState;

  history.pushState = function () {
    pushState.apply(history, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  history.replaceState = function () {
    replaceState.apply(history, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  window.addEventListener("popstate", function () {
    window.dispatchEvent(new Event("locationchange"));
  });

  window.addEventListener("locationchange", function () {
    urlChanged();
  });

  function urlChanged() {
    var url = window.location.href;

    // call dlorder function if url contains ?section=download
    if (url.indexOf("?section=download") > -1) {
      setTimeout(dlorder, 500);
    }

    // call addTrakt if url contains /movie/ or /series/ or /anime/
    if (url.indexOf("/movie/") > -1 || url.indexOf("/series/") > -1 || url.indexOf("/anime/") > -1) {
      setTimeout(loadDL, 500);
      setTimeout(addTrakt, 500);
    }
  }

  urlChanged();

  function dlorder() {
    console.log("> 30nama Tools: Custom DL Order Loaded!");
    // wait untill all divs with skeleton-bar class are disappeared
    function w8forSkeletonBarRemoved() {
      var targetNodes = document.querySelectorAll("div.skeleton-bar");
      if (targetNodes.length > 0) {
        setTimeout(w8forSkeletonBarRemoved, 100);
      } else {
        actionFunction();
      }
    }

    w8forSkeletonBarRemoved();

    function actionFunction() {
      // query all div with class="download-section-main"
      var downloadSectionMain = document.querySelectorAll("section.download-section-main");

      // reverse the order of items in main download section
      for (var i = 0; i < downloadSectionMain.length; i++) {
        var downloadSectionMainItem = downloadSectionMain[i];
        downloadSectionMainItem.parentNode.insertBefore(
          downloadSectionMainItem,
          downloadSectionMainItem.parentNode.firstChild
        );
      }

      // query div class="long-info-bar-wrapper" ul li p with value PSA
      var all_blocks = document.querySelectorAll("div.long-info-bar-wrapper ul li p");
      // reverse the list
      all_blocks = Array.prototype.slice.call(all_blocks).reverse();

      for (i = 0; i < all_blocks.length; i++) {
        if (all_blocks[i].innerHTML.indexOf("PSA") > -1) {
          // move this block to the top of the page
          var psa_block = all_blocks[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          var page_block = psa_block.parentNode.parentNode;

          page_block.insertBefore(psa_block, page_block.firstChild);
        }
      }
    }
  }

  // function to extract imdb id from url
  function getImdbId(url) {
    var imdbId = url.split("/")[4];
    return imdbId;
  }

  function addTrakt() {
    // if we already have trakt button, don't add it again
    if (document.querySelector("#trakt-button")) {
      return;
    }
    console.log("> 30nama Tools: Trakt Button Loaded!");

    // get imdb id
    var imdb_icon = document.querySelector("a img[alt='imdb-icon']");
    var imdb_href = imdb_icon.parentNode.parentNode.href;
    var imdb_id = getImdbId(imdb_href);

    // get ul with class='ratings figcaption-child'
    var ratings = document.querySelector("ul.ratings.figcaption-child");
    // add trakt ui to the end of the list
    var trakt_ui = document.createElement("li");

    // prettier-ignore
    trakt_ui.innerHTML = '<section id="trakt-button" class="ratings big" data-v-5c885ed8="" data-v-029448d2="" style="margin-top: 4px;"><a href="https://trakt.tv/search/imdb/' + imdb_id + '" target="_blank" data-v-5c885ed8=""><div class="counts" data-v-5c885ed8=""><p class="bd-sm" data-v-5c885ed8=""></p><!----></div> <div class="img-wrapper" data-v-5c885ed8=""><img src="https://walter.trakt.tv/hotlink-ok/public/favicon.ico" alt="trakt-icon" data-v-5c885ed8=""></div></a></section>';
    ratings.appendChild(trakt_ui);
  }

  function loadDL() {
    // get a tag with id="download"
    var download = document.getElementById("download");

    if (download.used) {
      return;
    }

    download.click();

    // add a parameter to dlbt to prevent calling dlbt again
    download.used = true;
  }
})();
