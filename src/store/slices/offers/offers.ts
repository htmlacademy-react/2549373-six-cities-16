import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from '../../../types/offers.ts';
import { Cities, RequestStatus, SortOptionValue } from '../../../const.ts';
import { SortOptionValueType } from '../../../types/sort.ts';
import { fetchOffersAction } from '../../api-actions.ts';
import { CityLink } from '../../../types/city.ts';

type InitialState = {
  cityName: CityLink;
  offers: Offers;
  sortOption: SortOptionValueType;
  requestStatus: RequestStatus;
};

const initialState: InitialState = {
  cityName: { id: Cities.Paris.id, name: Cities.Paris.name },
  offers: [],
  sortOption: SortOptionValue.Popular,
  requestStatus: RequestStatus.Idle,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.requestStatus = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});

export const {
  changeCity,
  setSortOption,
} = offersSlice.actions;

export default offersSlice;
