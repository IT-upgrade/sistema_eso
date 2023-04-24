import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AltenticationPayload {
  mensage?: any;
  accessToken?: string;
}

interface AtenticationState {
  data: AltenticationPayload;
  isLogged: boolean;
}

const initialState: AtenticationState = {
  data: {},
  isLogged: false,
};
const sliceAltentication = createSlice({
  name: "altentication",
  initialState,

  reducers: {
    request_altentication: (state): AtenticationState => {
      return state;
    },
    sucess_altentication: (
      state,
      { payload }: PayloadAction<AltenticationPayload>
    ): AtenticationState => {
      return {
        data: {
          ...payload,
        },
        isLogged: true,
      };
    },
    error_altentication: (
      state,
      { payload }: PayloadAction<AltenticationPayload>
    ): AtenticationState => {
      return {
        data: {
          ...payload,
        },
        isLogged: false,
      };
    },
  },
});

export default sliceAltentication.reducer;

export const {
  request_altentication,
  sucess_altentication,
  error_altentication,
} = sliceAltentication.actions;

export const userAltentication = (state: any): AtenticationState => {
  return state.altentication;
};
