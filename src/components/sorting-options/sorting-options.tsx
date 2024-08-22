import { JSX, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortOption } from '../../types/sort';
import { SORT_OPTIONS, SortOptionValue } from '../../const';
import { setSortOption } from '../../store/slices/offers/offers';
import { getSortOption } from '../../store/selectors/offers/offers';

function SortingOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector(getSortOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortTypeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SortOption) => {
    dispatch(setSortOption(option.value));
    setIsOpen(false);
  };

  const selectedOptionTitle = SORT_OPTIONS.find((option: SortOption) => option.value === selectedOption)?.title || SortOptionValue.Popular;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortTypeClick} data-testid='sorting-type'>
        {selectedOptionTitle}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames(['places__options places__options--custom', { 'places__options--opened': isOpen }])}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option.id}
            className={classNames(['places__option', { 'places__option--active': selectedOption === option.value }])}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
            data-testid={option.value}
          >
            {option.title}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
