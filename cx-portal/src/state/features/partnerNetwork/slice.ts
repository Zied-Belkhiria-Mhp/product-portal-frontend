import { createSlice } from '@reduxjs/toolkit'
import {
  BusinessPartner,
  BusinessPartnerResponse,
  PaginationData,
  PartnerNetworkDataGrid,
  PartnerNetworkInitialState,
} from './types'
import { RootState } from 'state/store'
import { getOneBusinessPartner, fetchBusinessPartners } from './actions'
import {
  mapSingleBusinessPartnerToDataGrid,
  mapBusinessPartnerToDataGrid,
} from 'utils/dataMapper'

const initialState: PartnerNetworkInitialState = {
  paginationData: {} as PaginationData,
  mappedPartnerList: [],
  loading: true,
  error: '',
}

const partnerNetworkSlice = createSlice({
  name: 'partnerNetwork',
  initialState,
  reducers: {
    resetPartnerNetworkState: (state) => {
      state.mappedPartnerList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBusinessPartner.pending, (state) => {
      state.paginationData = {} as PaginationData
      state.mappedPartnerList = []
      state.loading = true
    })
    builder.addCase(getOneBusinessPartner.fulfilled, (state, { payload }) => {
      const bp = payload as BusinessPartner
      const mappedList = [
        mapSingleBusinessPartnerToDataGrid(bp),
      ] as Array<PartnerNetworkDataGrid>
      state.mappedPartnerList = mappedList
      state.paginationData = {
        totalElements: mappedList.length,
        page: 1, // One business partner or null can be possible values here. Page is always default 1
      } as PaginationData

      state.loading = false
    })
    builder.addCase(getOneBusinessPartner.rejected, (state, action) => {
      state.paginationData = {} as PaginationData
      state.mappedPartnerList = []
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchBusinessPartners.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchBusinessPartners.fulfilled, (state, { payload }) => {
      const payloadList = payload as BusinessPartnerResponse
      try {
        state.mappedPartnerList = [
          ...state.mappedPartnerList,
          ...(mapBusinessPartnerToDataGrid(
            payloadList
          ) as Array<PartnerNetworkDataGrid>),
        ]
        state.loading = false
        state.paginationData = {
          totalElements: payloadList.totalElements,
          page: payloadList.page,
        }
      } catch (error: unknown) {
        return {
          ...state,
          loading: false,
          error: (error as Error).message as string,
        } as PartnerNetworkInitialState
      }
    })
    builder.addCase(fetchBusinessPartners.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const partnerNetworkSelector = (
  state: RootState
): PartnerNetworkInitialState => state.partnerNetwork

export default partnerNetworkSlice
