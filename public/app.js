'use strict';

var learnjs = {};

learnjs.problemView = (problemNumber) => {
  const title = `problem #${problemNumber} Comming soon!`;
  return $('<div class="problem-view">').text(title);
};

learnjs.showView = (hash) => {
  var routes = {
    '#problem': learnjs.problemView
  };
  var hashPorts = hash.split('-');
  var viewFn = routes[hashPorts[0]];
  if(viewFn) {
    $('.view-container').empty().append(viewFn(hashPorts[1]));
  }
};

learnjs.appOnReady = () => {
  window.onhashchange = () => {
    learnjs.showView(window.location.hash);
  };
  learnjs.showView(window.location.hash);
}