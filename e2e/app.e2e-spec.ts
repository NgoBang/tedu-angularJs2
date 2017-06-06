import { TedushopAngular2Page } from './app.po';

describe('tedushop-angular2 App', () => {
  let page: TedushopAngular2Page;

  beforeEach(() => {
    page = new TedushopAngular2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
