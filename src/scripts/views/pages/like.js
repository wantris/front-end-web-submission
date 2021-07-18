import FavouriteRestaurantIdb from '../../data/favourite-restaurant';
import { createRestauransTemplate } from '../templates/template-creators';
import truncate from '../../utils/word-limiter';

const Like = {
  async render() {
    return `
          <!-- Main content -->
          <div class="spinner-container"></div>
          <div class="latest">
              <!-- List Posts -->
              <div class="posts" id="posts">

              </div>
              <!-- end list posts -->
          </div>
          <!-- End main content -->
        `;
  },

  async afterRender() {
    const loading = document.querySelector('.spinner-container');
    const restaurants = await FavouriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#posts');
    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = `
      You don't have any favourite restaurant
      `;
    }
    loading.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    try {
      restaurants.forEach((restaurant, index) => {
        const description = truncate(restaurant.description, 100, '...');
        restaurantsContainer.innerHTML += createRestauransTemplate(restaurant, index, description);
      });

      restaurants.forEach((restaurant, index) => {
        const starTotal = 5;
        // eslint-disable-next-line no-mixed-operators
        const starPercentage = restaurant.rating / starTotal * 100;
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
        document.getElementById(`post_${index}`).style.width = starPercentageRounded;
      });

      restaurantsContainer.style.display = 'grid';
      loading.style.display = 'none';
    } catch (err) {
      restaurantsContainer.innerHTML = `Error: ${err}, swipe up to refresh!`;
    }
  },
};

export default Like;
