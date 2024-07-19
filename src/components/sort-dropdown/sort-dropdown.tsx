import {JSX, useState} from 'react';
import classNames from 'classnames';

type SortOption = {
  id: number;
  title: string;
  value: string;
}

function SortDropdown(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<SortOption>({id: 1, title: 'Popular', value: 'popular'});

  const options: SortOption[] = [
    {id: 1, title: 'Popular', value: 'popular'},
    {id: 2, title: 'Price: low to high', value: 'priceLowToHigh'},
    {id: 3, title: 'Price: high to low', value: 'priceHighToLow'},
    {id: 4, title: 'Top rated first', value: 'topRated'},
  ];

  const handleSortTypeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortTypeClick}>
        {selectedOption.title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames(['places__options places__options--custom', {'places__options--opened': isOpen}])}>
        {options.map((option) => (
          <li
            key={option.id}
            className={classNames(['places__option', {'places__option--active': selectedOption.id === option.id}])}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option.title}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortDropdown;
