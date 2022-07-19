// ==UserScript==
// @name         30nama Custom DL list order
// @description  Userscript helpers for 30nama
// @namespace    https://github.com/ahbanavi/userscripts
// @version      0.1.2
// @author       Yedoost
// @homepage     https://github.com/ahbanavi/userscripts
// @supportURL   https://github.com/ahbanavi/userscripts/issues
// @match        https://30nama.com/*
// @iconURL      https://30nama.com/favicon.ico
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var pushState = history.pushState;
    var replaceState = history.replaceState;

    history.pushState = function() {
        pushState.apply(history, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
    };

    history.replaceState = function() {
        replaceState.apply(history, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('popstate', function() {
        window.dispatchEvent(new Event('locationchange'))
    });


    window.addEventListener('locationchange', function(){
        urlChanged();
    })

    function urlChanged(){
        var url = window.location.href

        // call dlorder function if url contains ?section=download
        if(url.indexOf('?section=download') > -1){
            setTimeout(dlorder, 500);
        }
    };

    urlChanged();

    function dlorder(){
        console.log('30nama Custom DL Order Loaded!');
        // wait untill all divs with skeleton-bar class are disappeared
        function w8forSkeletonBarRemoved() {
            var targetNodes = document.querySelectorAll('div.skeleton-bar');
            if (targetNodes.length > 0) {
                setTimeout(w8forSkeletonBarRemoved, 100);
            } else {
                actionFunction();
            }
        }

        w8forSkeletonBarRemoved();

        function actionFunction(){
            // query all div with class="download-section-main"
            var downloadSectionMain = document.querySelectorAll('section.download-section-main');

            // reverse the order of items in main download section
            for (var i = 0; i < downloadSectionMain.length; i++) {
                var downloadSectionMainItem = downloadSectionMain[i];
                downloadSectionMainItem.parentNode.insertBefore(downloadSectionMainItem, downloadSectionMainItem.parentNode.firstChild);
            }

            // query div class="long-info-bar-wrapper" ul li p with value PSA
            var all_blocks = document.querySelectorAll('div.long-info-bar-wrapper ul li p');
            // reverse the list
            all_blocks = Array.prototype.slice.call(all_blocks).reverse();

            var psa_count = 0;
            for (i = 0; i < all_blocks.length; i++) {
                if (all_blocks[i].innerHTML.indexOf('PSA') > -1) {
                    psa_count++;
                    // move this block to the top of the page
                    var psa_block = all_blocks[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    var page_block = psa_block.parentNode.parentNode;
                    page_block.insertBefore(psa_block, page_block.firstChild);
                }
            }
        }
    }
})();
