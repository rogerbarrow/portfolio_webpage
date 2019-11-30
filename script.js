'use strict';

var data = [
  {
    url: 'https://competent-kepler-e6bf93.netlify.com/',
    gitHubUrl: 'https://github.com/rogerbarrow/love_atx',
    img: 'img/loveatx.png',
    title: 'LoveAtx',
    desc:
      ' landing page with javascript functionality to add, remove, change items in cart, also uses Locate storage to store items.'
  },
  {
    url: 'https://quirky-minsky-7f563d.netlify.com/',
    gitHubUrl: 'https://github.com/rogerbarrow/Service_Workers',
    img: 'img/yoga.png',
    title: 'Giesel Yoga',
    desc:
      'I built this website thinking about Yoga, it uses CSS for Animation and Jquery for Smooth Scroll. I integrated Service Workers for cache and is available offline also.'
  },
  {
    url: 'https://keen-lumiere-76b399.netlify.com/',
    gitHubUrl: 'https://github.com/rogerbarrow/hotel_website/',
    img: 'img/VisPas.png',
    title: 'VisPas',
    desc: 'Created a Hotel Landing page, using HTML and CSS.'
  },
  {
    url: 'https://eloquent-rosalind-55e888.netlify.com/',
    gitHubUrl: 'https://github.com/rogerbarrow/textspeak/',
    img: 'img/textspeak.png',
    title: 'TextSpeak',
    desc: 'Fun little application using the Web Speech API .'
  }
];

var flexGrid = document.querySelector('.flex-grid');

data.forEach(function(el) {
  return (flexGrid.innerHTML +=
    '<article class="card">\n<div class="card__thumbnail">\n  <a href=' +
    el.url +
    ' target="_blank">\n    <img src=' +
    el.img +
    ' alt=' +
    el.title +
    ' class="card__img">\n  </a>\n</div>\n<div class="card__description">\n  <h3 class="card__heading">\n    <a href=' +
    el.url +
    ' target="_blank" class="card__link">' +
    el.title +
    '</a>\n  </h3>\n  <p class="card__text">' +
    el.desc +
    '</p>\n  <a href=' +
    el.gitHubUrl +
    ' target="_blank" class="card__github">\n    GitHub\n    <i class="fab fa-github"></i>\n  </a>\n</div>\n</article>');
});

// Browser support
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) {
    return self.pageYOffset;
  }
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) {
    return document.body.scrollTop;
  }

  return 0;
}

// Determine the position of the destination element
function elmYPosition(eID) {
  var elm = document.querySelector(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

// Function to do the scrolling
function smoothScroll(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

// Triggering scroll function
document.querySelector('.user-nav').addEventListener('click', function(event) {
  var target = event.target;
  var anchorID = target.getAttribute('href');

  if (target.nodeName === 'I' || target.nodeName === 'SPAN') {
    anchorID = target.parentElement.getAttribute('href');
  }

  smoothScroll(anchorID);
});

document
  .querySelector('.footer-nav')
  .addEventListener('click', function(event) {
    var target = event.target;
    var anchorID = target.getAttribute('href');
    smoothScroll(anchorID);
  });

document.querySelector('#cta').addEventListener('click', function() {
  smoothScroll('#portfolio');
});

// Submit form
document.querySelector('.form__submit').addEventListener('click', function() {
  var formInputs = document.querySelectorAll('.form__input');

  for (var i = 0; i < formInputs.length; i++) {
    if (formInputs[i].value === '' && formInputs[i].hasAttribute('required')) {
      return false;
    }
  }
  document.querySelector('.expand').classList.add('show-expand');
});

document.querySelector('.close-btn').addEventListener('click', function() {
  document.querySelector('.expand').classList.remove('show-expand');
});
