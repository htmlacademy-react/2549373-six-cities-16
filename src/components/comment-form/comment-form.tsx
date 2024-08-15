import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import Rating from '../rating/rating';
import Textarea from '../textarea/textarea';
import { Comment } from '../../types/reviews.ts';
import { useParams } from 'react-router-dom';
import { addCommentAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';

function CommentForm(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false); // Переменная для отслеживания успешной отправки формы
  const isSubmitDisabled = rating === null || review.length < 50 || review.length > 300;

  const resetForm = () => {
    setRating(null);
    setReview('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id || !rating) {
      return;
    }

    setIsFormSubmitted(true); // Блокируем форму на время отправки

    const newComment: Comment = {
      comment: review,
      rating,
    };

    dispatch(addCommentAction({ id, dataComment: newComment }))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(() => {
        toast.error('Что-то пошло не так',{ position: 'top-center' });
      })
      .finally(() => {
        setIsFormSubmitted(false);
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating rating={rating} onChange={setRating} isDisabled={isFormSubmitted}/>
      <Textarea
        value={review}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setReview(event.target.value)}
        placeholder="Tell how was your stay, what you like and what can be improved"
        isDisabled={isFormSubmitted}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with
          at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isFormSubmitted}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
