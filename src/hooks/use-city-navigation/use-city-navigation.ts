import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../index';
import { CityId } from '../../types/city';
import { Cities } from '../../const';
import { changeCity } from '../../store/slices/offers/offers';

export function useCityNavigation() {
  const dispatch = useAppDispatch();
  const { cityId } = useParams<{ cityId?: CityId }>();
  const navigate = useNavigate();
  const [isCityValid, setIsCityValid] = useState<boolean>(true);

  useEffect(() => {
    if (!cityId) {
      navigate(`/${Cities.Paris.id}`, { replace: true });
      return;
    }

    const selectedCity = Object.values(Cities).find((city) => city.id === cityId);

    if (!selectedCity) {
      setIsCityValid(false);
      return;
    }

    setIsCityValid(true);
    dispatch(changeCity(selectedCity));
  }, [cityId, dispatch, navigate]);

  return { isCityValid };
}
