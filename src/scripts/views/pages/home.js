import RestaurantApiSource from '../../data/restaurantapi-source';
import { createRestauransTemplate } from '../templates/template-creators';
import truncate from '../../utils/word-limiter';

const Home = {
  async render() {
    return `
        <section class="content">
            <!-- headline title -->
                <article class="headline">
                    <h1>List Restaurant</h1>
                </article>
            <!-- end headline title -->
        </section>

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
    loading.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    const restaurants = await RestaurantApiSource.listRestaurants();
    const restaurantsContainer = document.querySelector('#posts');

    try {
      restaurants.restaurants.forEach((restaurant, index) => {
        const description = truncate(restaurant.description, 100, '...');
        restaurantsContainer.innerHTML += createRestauransTemplate(restaurant, index,
          description);
      });

      restaurantsContainer.style.display = 'grid';
      loading.style.display = 'none';

      restaurants.restaurants.forEach((restaurant, index) => {
        const starTotal = 5;
        // eslint-disable-next-line no-mixed-operators
        const starPercentage = restaurant.rating / starTotal * 100;
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
        document.getElementById(`post_${index}`).style.width = starPercentageRounded;
      });
    } catch (err) {
      restaurantsContainer.innerHTML = `Error: ${err}, swipe up to refresh!`;
    }
  },
};

export default Home;
