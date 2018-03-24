describe('Learn JS', () => {
  it('con show a problem view', () => {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });

  it('show the landing page view when there is no hash', () => {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });

  it('passes the hash view parameter to the view function', () => {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });

  describe('problem view', () => {
    it('has a title that includes the problem number', () => {
      const view = learnjs.problemView('1');
      expect(view.find('.title').text()).toEqual('problem #1');
    });

    it('shows the description', () => {
      const view = learnjs.problemView('1');
      expect(view.find('[data-name="description"]').text()).toEqual(learnjs.problems[0].description);
    });

    it('show the problem code', () => {
      const view = learnjs.problemView('1');
      expect(view.find('[data-name="code"]').text()).toEqual(learnjs.problems[0].code);      
    });
  });

  it('invokes the router when loaded', () => {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('subscribes to the hash change event', () => {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });
});