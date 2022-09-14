// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Bot for Bing
// @author       Vadim Kulikov
// @match        https://www.bing.com/*
// @match        https://www.ozon.ru/*
// @match        https://dominospizza.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let sites = {
  "ozon.ru": ["Купить товары в интернете", "Интернет магазин", "Купить товар из дома"],
  "dominospizza.ru": ["Купить пиццу Москва", "Пицца с доставкой", "Пицца быстро"],
};
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let links = document.links;
let btnBing = document.getElementById("search_icon");
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];


if (btnBing !== null) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site")
} else {
  site = location.hostname;
};

if (btnBing !== null) {
  let i = 0;

  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      setTimeout(() => {
        btnBing.click();
      }, getRandom(3000, 5000))
    }
  }, 500);

} else if (location.hostname == site) {
  console.log("Мы на целевом сайте!");

  setInterval(() => {
    let index = getRandom(0, links.length);
    if (getRandom(0, 101) > 60) {
      location.href = "https://www.bing.com/";
    } else if (links[index].href.indexOf(site) !== -1) {
      links[index].click();
    };

  }, getRandom(4000, 5000));

} else {
  let nextPage = true;

  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes(site)) {
      console.log("Нашел строку " + links[i]);
      let link = links[i];
      link.removeAttribute("target");
      nextPage = false;
      setTimeout(()=>{
        link.click();
      }, getRandom(2000, 4500))
      break;
    }
  };

  if (document.querySelector(".sb_pagS_bp").innerText == "4") {
    nextPage = false;
    location.href = "https://www.bing.com/";
  };

  if (nextPage) {
    setTimeout(() => {
      let btnNextPage = document.querySelector(".sb_pagN");
      btnNextPage.click();
    }, getRandom(3000, 5000))
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
