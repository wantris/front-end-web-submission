import RestaurantApiSource from '../data/restaurantapi-source';

const SubmitReview = (url, name, reviewText) => {
  const dataInput = {
    id: url.id,
    name,
    review: reviewText,
  };

  RestaurantApiSource.submitReviewRestaurant(dataInput);

  const reviewContainer = document.querySelector('.review-container');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString('id-ID', options);
  const newReview = `
            <div class="card-detail card-review card-review-list" >
            <div class="form-group review-list_head">
                <label><i class="fa fa-user mr-10" aria-hidden="true"></i>
                ${name}</label>
                <label class="review-date">
                ${date}<i class="fa fa-calendar ml-10" aria-hidden="true"></i></label>
            </div>
            <div class="form-group">
                <label>${reviewText}</label>
            </div>
          </div>
        `;
  reviewContainer.innerHTML += newReview;
};

export default SubmitReview;
