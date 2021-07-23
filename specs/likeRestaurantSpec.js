/* eslint-disable no-undef */
import FavouriteRestaurantIdb from '../src/scripts/data/favourite-restaurant';
import createLikeButtonPresenter from './helpers/createLikeButtonPresenter';

const addFavouriteContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Like or Adding Restaurant to favourite', () => {
  beforeEach(() => {
    addFavouriteContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createLikeButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await createLikeButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await createLikeButtonPresenter({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavouriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });
    FavouriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not like restaurant again when its already liked', async () => {
    await createLikeButtonPresenter({ id: 1 });

    await FavouriteRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }]);

    FavouriteRestaurantIdb.deleteRestaurant(1);
  });

  xit('should not like restaurant when it has no id', async () => {
    await createLikeButtonPresenter({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
