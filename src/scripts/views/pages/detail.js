import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurantapi-source';
import { restaurantDetailTemplate, createLikeButtonTemplate } from '../templates/template-creators';
import { successAlert, failedAlert } from '../templates/alert-template';
import LikeButtonInitiator from '../../utils/like-button-initiator';

import SubmitReview from '../../utils/submit-review';
// import LikeButtonInitiator from '../../utils'

const Detail = {
  async render() {
    return `
        <div class="container">
          <h2 class="title-container-detail">Detail Restaurant</h2>
          <div class="spinner-container"></div>
          <section id="detail-rest"></section>
          <div id="likeButtonContainer"></div>
        </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loading = document.querySelector('.spinner-container');
    const detailContainer = document.querySelector('#detail-rest');
    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeButtonTemplate();
    loading.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

    try {
      const data = await RestaurantSource.detailRestaurant(url.id);
      const starTotal = 5;
      // eslint-disable-next-line no-mixed-operators
      const starPercentage = data.restaurant.rating / starTotal * 100;
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      detailContainer.innerHTML += restaurantDetailTemplate(data.restaurant);

      const btnSubmit = document.querySelector('#submit-review');
      const nameInput = document.querySelector('#input-name');
      const reviewInput = document.querySelector('#input-review');
      const alertReviewContainer = document.querySelector('#alert-review-container');

      document.getElementById('post_detail').style.width = starPercentageRounded;

      detailContainer.style.display = 'block';
      loading.style.display = 'none';

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: data.restaurant,
      });

      btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        if (nameInput.value === '' || reviewInput.value === '') {
          // eslint-disable-next-line no-alert

          alertReviewContainer.innerHTML = failedAlert('Input wajib diisi');
          nameInput.value = '';
          reviewInput.value = '';
        } else {
          SubmitReview(url, nameInput.value, reviewInput.value);
          alertReviewContainer.innerHTML = successAlert('Review berhasil disimpan');
          nameInput.value = '';
          reviewInput.value = '';
        }
      });
    } catch (err) {
      detailContainer.innerHTML = `Error: ${err}, swipe up to refresh!`;
    }
  },
};

export default Detail;
