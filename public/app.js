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
};

learnjs.flashElement = (elem, content) => {
  elem.fadeOut('fast', () => {
    elem.html(content);
    elem.fadeIn();
  });
};

learnjs.template = (name) => $('.template .' + name).clone();

learnjs.triggerEvent = (name, args) => {
  $('.view-container>*').trigger(name, args);
}

learnjs.buildCorrectFlash = (problemNum) => {
  const correctFlash = learnjs.template('correct-flash');
  var link = correctFlash.find('a');
  if(problemNum < learnjs.problems.length) {
    link.attr('href', '#problem-' + (problemNum + 1));
  } else {
    link.attr('href', '');
    link.text('You are Finished!');
  }
  return correctFlash;
};

learnjs.landinfView = () =>
  learnjs.template('landing-view');

learnjs.problemView = (data) => {
  const problemNumber = parseInt(data, 10);
  const view = learnjs.template('problem-view');
  const problemData = learnjs.problems[problemNumber - 1];
  const resultFlash = view.find('.result');

  const checkAnswer = () => {
    const answer = view.find('.answer').val();
    const test = problemData.code.replace('__', answer) + '; problem();';
    return eval(test);
  };

  const checkAnswerClick = () => {
    if(checkAnswer()) {
      const correctFlash = learnjs.buildCorrectFlash(problemNumber);
      learnjs.flashElement(resultFlash, correctFlash);
    } else {
      learnjs.flashElement(resultFlash, 'Incorrect!');
    }
    return false;
  };

  if(problemNumber < learnjs.problems.length) {
    const buttonItem = learnjs.template('skip-btn');
    buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
    $('.nav-list').append(buttonItem);
    view.bind('removingView', () => {
      buttonItem.remove();
    });
  }

  view.find('.check-btn').click(checkAnswerClick);
  view.find('.title').text(`problem #${problemNumber}`);
  learnjs.applyObject(problemData, view);
  return view;
};

learnjs.showView = (hash) => {
  var routes = {
    '#problem': learnjs.problemView,
    '#': learnjs.landinfView,
    '': learnjs.landinfView
  };
  var hashPorts = hash.split('-');
  var viewFn = routes[hashPorts[0]];
  if(viewFn) {
    learnjs.triggerEvent('removingView', []);
    $('.view-container').empty().append(viewFn(hashPorts[1]));
  }
};

learnjs.appOnReady = () => {
  window.onhashchange = () => {
    learnjs.showView(window.location.hash);
  };
  learnjs.showView(window.location.hash);
}