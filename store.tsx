import {createSlice, configureStore, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {Company, CompanyState, RootState} from './types';
import {companies} from "./companies";

const initialState: CompanyState = {
    companies: companies,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompany(state, action: PayloadAction<Company>) {
            state.companies.unshift(action.payload);
        },
        removeCompanies(state) {
            state.companies = state.companies.filter(company => !company.isSelected)
        },
        toggleSelectCompany(state, action: PayloadAction<string>) {
            const company = state.companies.find(c => c.id === action.payload)
            if (company) {
                company.isSelected = !company.isSelected
            }
        },
        toggleSelectAll(state, action: PayloadAction<boolean>) {
            state.companies.forEach(company => {
                company.isSelected = action.payload
            })
        },
        updateCompanyName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const company = state.companies.find(c => c.id === action.payload.id)
            if (company) {
                company.name = action.payload.newName
            }
        },
        updateCompanyAddress(state, action: PayloadAction<{ id: string; newAddress: string }>) {
            const company = state.companies.find(c => c.id === action.payload.id)
            if (company) {
                company.address = action.payload.newAddress
            }
        },
    },
})

const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
    const result = next(action)
    const state = store.getState()
    localStorage.setItem('companyState', JSON.stringify(state))
    return result
};

const {reducer} = companySlice

const persistedStateString = localStorage.getItem('companyState')
const persistedState: RootState | undefined = persistedStateString ? JSON.parse(persistedStateString) : undefined


const store = configureStore({
    reducer: {
        company: reducer,
    },
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware)
})

export type AppDispatch = typeof store.dispatch

export const actions = companySlice.actions
export default store


