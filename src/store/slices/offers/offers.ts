import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullOffer, Offers, OfferType } from '../../../types/offers';
import { Cities, RequestStatus, SortOptionValue } from '../../../const';
import { SortOptionValueType } from '../../../types/sort';
import { CityLink } from '../../../types/city';
import { setFailed, setLoading } from '../../utils/utils';
import { Nullable } from '../../../types/globals';
import { fetchOffersAction } from '../../async-thunk/offers/offers';
import { toggleFavoriteStatusAction } from '../../async-thunk/favorites/favorites';

export type OffersInitialState = {
  cityName: CityLink;
  offers: Offers;
  sortOption: SortOptionValueType;
  requestStatus: RequestStatus;
  currentOffer: Nullable<OfferType | FullOffer>;
};

const initialState: OffersInitialState = {
  cityName: { id: Cities.Paris.id, name: Cities.Paris.name },
  offers: [],
  sortOption: SortOptionValue.Popular,
  requestStatus: RequestStatus.Idle,
  currentOffer: null,
};

const handleFetchOffersFulfilled = (state: OffersInitialState, action: PayloadAction<Offers>) => {
  state.requestStatus = RequestStatus.Success;
  state.offers = action.payload;
};

const handleToggleFavoriteFulfilled = (state: OffersInitialState, action: PayloadAction<OfferType>) => {
  const updatedOffer = action.payload;
  const existingOffer = state.offers.find((offer) => offer.id === updatedOffer.id);

  if (existingOffer) {
    existingOffer.isFavorite = updatedOffer.isFavorite;
  }
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityLink>) => {
      state.cityName = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOptionValue>) => {
      state.sortOption = action.payload;
    },
    setCurrentOffer: (state, action: PayloadAction<Nullable<OfferType | FullOffer>>) => { // Новый редюсер для изменения текущего предложения
      state.currentOffer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, setLoading)
      .addCase(fetchOffersAction.fulfilled, handleFetchOffersFulfilled)
      .addCase(fetchOffersAction.rejected, setFailed)
      .addCase(toggleFavoriteStatusAction.fulfilled, handleToggleFavoriteFulfilled);
  },
});

export const {
  changeCity,
  setSortOption,
  setCurrentOffer
} = offersSlice.actions;

export default offersSlice;
