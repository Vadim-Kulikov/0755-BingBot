// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Vadim Kulikov
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let btnBing = document.getElementsByClassName("search")[0];
let keyword = ["купить машину"];
let links = document.links;

if (btnBing !== undefined) {
  document.getElementsByName("q")[0].value = keyword;
  btnBing .click();
} else {

for (let i=0; i < links.length; i++) {
    if (links[i].href.indexOf("https://auto.ru") !== -1) {
        let link = links[i];
        link.click();
        break;
    }
  }
}
