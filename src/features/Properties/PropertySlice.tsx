import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

// export const fetchProperty = createAsyncThunk(
//   'fetchProperty',
//   (payload: any, { dispatch }) => {
//     // TODO: tie into mocks or endpoint if available
//     dispatch(PropertyActions.setProperty(payload))
//   },
// )
export interface PropertyState {
  editProperty: EditProperty;
}
const initialState: PropertyState = {
  editProperty: {} as EditProperty,
};
const { actions, reducer } = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setEditProperty: (state, { payload }: { payload: EditProperty }) => {
      state.editProperty = payload;
    },
    clearEditProperty: (state) => {
      state.editProperty = {} as EditProperty;
    },
  },
});

export const PropertySelector = (): RootState['property'] =>
  useSelector((state: RootState) => state.property);
export const EditPropertySelector = (): EditProperty =>
  useSelector((state: RootState) => state.property.editProperty);

export const PropertyActions = actions;
export const PropertyReducer = reducer;

export interface EditProperty {
  key: string | null;
  url: string;
  favorite: boolean;
  address: string;
  entryDateTime: string;
  listPrice?: string;
  salePrice?: string;
}
