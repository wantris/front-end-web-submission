import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
// import FavouriteRestaurantIdb from '../../src/scripts/data/favourite-restaurant';

const createLikeButtonPresenter = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant: {
      id: restaurant.id,
    },
  });
};

export default createLikeButtonPresenter;
