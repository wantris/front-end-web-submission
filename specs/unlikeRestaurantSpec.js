/* eslint-disable no-undef */
import FavouriteRestaurantIdb from '../src/scripts/data/favourite-restaurant';
import createLikeButtonPresenter from './helpers/createLikeButtonPresenter';

const addFavouriteContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unlike or remove restaurant from favourite', () => {
  beforeEach(async () => {
    addFavouriteContainer();
    await FavouriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavouriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await createLikeButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display unlike widget when the restaurant has been liked', async () => {
    await createLikeButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove recently unliked restaurant from the list', async () => {
    await createLikeButtonPresenter({ id: 1 });

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await createLikeButtonPresenter({ id: 1 });

    await FavouriteRestaurantIdb.deleteRestaurant(1);
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
