/* eslint-disable no-undef */
Feature('Favourite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty favorite restaurant', async ({ I }) => {
  I.seeElement('.posts');
  I.see("You don't have any favourite restaurant", '.posts');
});

Scenario('Liking one restaurant to be favourite', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.post-item');
  I.click(locate('.post-item a').first());

  I.seeElement('#detail-rest');
  const itemTitle = await I.grabTextFrom('.detail-info__title h3');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeTextEquals(itemTitle, '.post-item__title');
});

Scenario('Unliking one favorite restaurant', async ({ I }) => {
  I.see("You don't have any favourite restaurant", '#posts');

  I.amOnPage('/');

  I.seeElement('.post-item');
  I.click(locate('.post-item a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.posts');

  I.see("You don't have any favourite restaurant", '.posts');
});

Scenario('Customer review', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.post-item');
  I.click(locate('.post-item a').first());

  I.seeElement('.card-detail form');

  const textReview = 'Restaurant ini bagus sekali, saya ingin membelinya!';
  I.fillField('inputName', 'monde');
  I.fillField('inputReview', textReview);

  I.click('#submit-review');

  I.seeTextEquals(textReview, locate('.review-text').last());
});
