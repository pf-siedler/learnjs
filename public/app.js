'use strict';

var learnjs = {};

learnjs.problems = [
  {
    description: "What is truth?",
    code: "function problem() { return __; }"
  },
  {
    description: "Simple Math",
    code: "function problem() { return 42 === 6 * __; }"
  }
];

learnjs.applyObject = (obj, elem) => {
  for (let key in obj) {
    elem.find('[data-name="'+key+'"]').text(obj[key]);
  }
}

learnjs.problemView = (data) => {
  const problemNumber = parseInt(data, 10);
  const view = $('.template .problem-view').clone();
  view.find('.title').text(`problem #${problemNumber}`);
  learnjs.applyObject(learnjs.problems[problemNumber - 1], view);
  return view;
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