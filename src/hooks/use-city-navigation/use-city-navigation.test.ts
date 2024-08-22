import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../index';
import { changeCity } from '../../store/slices/offers/offers';
import { Cities } from '../../const';
import { CityId } from '../../types/city';
import { Mock, vi } from 'vitest';
import { useCityNavigation } from './use-city-navigation';
import { renderHook } from '@testing-library/react';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../index', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../../store/slices/offers/offers', () => ({
  changeCity: vi.fn(),
}));

describe('useCityNavigation', () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to Paris if cityId is not provided', () => {
    (useParams as Mock).mockReturnValue({});

    renderHook(() => useCityNavigation());

    expect(mockNavigate).toHaveBeenCalledWith(`/${Cities.Paris.id}`, { replace: true });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should set isCityValid to false if cityId is invalid', () => {
    (useParams as Mock).mockReturnValue({ cityId: 'invalid-city-id' as CityId });

    const { result } = renderHook(() => useCityNavigation());

    expect(result.current.isCityValid).toBe(false);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should dispatch changeCity if cityId is valid', () => {
    (useParams as Mock).mockReturnValue({ cityId: Cities.Amsterdam.id as CityId });

    renderHook(() => useCityNavigation());

    expect(mockDispatch).toHaveBeenCalledWith(changeCity(Cities.Amsterdam));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
