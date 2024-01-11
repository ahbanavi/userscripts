// ==UserScript==
// @name         fxtwitter share
// @description  Userscript helpers for fxtwitter
// @namespace    https://github.com/ahbanavi/userscripts
// @version      0.1.1
// @author       ahbanavi
// @homepage     https://github.com/ahbanavi/userscripts
// @supportURL   https://github.com/ahbanavi/userscripts/issues
// @match        https://twitter.com/*
// @iconURL      https://abs.twimg.com/favicons/twitter.3.ico
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  ("use strict");

  // Create a new button element
  const shareButton = document.createElement("button");
  shareButton.textContent = "Share";
  shareButton.style.position = "fixed";
  shareButton.style.top = "10px";
  shareButton.style.right = "10px";
  shareButton.style.zIndex = "1000";

  shareButton.addEventListener("click", () => {
    const url = window.location.href;
    // change url to fxtwitter.com
    const fxtwitterUrl = url.replace("twitter.com", "fixupx.com");
    navigator.clipboard.writeText(fxtwitterUrl);
    shareButton.textContent = "Copied!";
    setTimeout(() => {
      shareButton.textContent = "Share";
    }, 2000);
  });

  // add listener for right click
  shareButton.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    const url = window.location.href;
    const fxtwitterUrl = url.replace("twitter.com", "i.fixupx.com");
    navigator.clipboard.writeText(fxtwitterUrl);
    shareButton.textContent = "Copied!";
    setTimeout(() => {
      shareButton.textContent = "Share";
    }, 2000);
  });

  document.body.appendChild(shareButton);
})();
