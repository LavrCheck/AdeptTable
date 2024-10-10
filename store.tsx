import {createSlice, configureStore, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {Company, CompanyState, RootState} from './types';
import {companies} from "./companies";

const initialState: CompanyState = {
    companies: companies,
    visibleCompanies: companies.slice(0, 50),
    currentPage: 1,
    itemsPerPage: 50
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompany(state, action: PayloadAction<Company>) {
            state.companies.unshift(action.payload);
            state.visibleCompanies.unshift(action.payload);
        },
        loadMoreCompanies(state) {
            const start = state.currentPage * state.itemsPerPage
            if (start >= state.companies.length) {
                return
            }
            const newVisibleCompanies = state.companies.slice(start, start + state.itemsPerPage)
            state.visibleCompanies.push(...newVisibleCompanies)
            state.currentPage += 1
        },
        removeCompanies(state, action: PayloadAction<string[]>) {
            state.companies = state.companies.filter(company => !action.payload.includes(company.id))
            state.visibleCompanies = state.visibleCompanies.filter(company => !action.payload.includes(company.id))
        },
        toggleSelectCompany(state, action: PayloadAction<string>) {
            const company = state.companies.find(c => c.id === action.payload)
            if (company) {
                company.isSelected = !company.isSelected
            }

            const visibleCompany = state.visibleCompanies.find(c => c.id === action.payload);
            if (visibleCompany) {
                visibleCompany.isSelected = !visibleCompany.isSelected
            }
        },
        toggleSelectAll(state, action: PayloadAction<boolean>) {
            state.companies.forEach(company => {
                company.isSelected = action.payload
            })
            state.visibleCompanies.forEach(company => {
                company.isSelected = action.payload
            })
        },
        updateCompanyName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const company = state.companies.find(c => c.id === action.payload.id)
            if (company) {
                company.name = action.payload.newName
            }
            const visibleCompany = state.visibleCompanies.find(c => c.id === action.payload.id)
            if (visibleCompany) {
                visibleCompany.name = action.payload.newName
            }
        },
        updateCompanyAddress(state, action: PayloadAction<{ id: string; newAddress: string }>) {
            const company = state.companies.find(c => c.id === action.payload.id)
            if (company) {
                company.address = action.payload.newAddress
            }

            const visibleCompany = state.visibleCompanies.find(c => c.id === action.payload.id)
            if (visibleCompany) {
                visibleCompany.address = action.payload.newAddress
            }
        },
    },
})

const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
    const result = next(action)
    const state = store.getState()
    localStorage.setItem('companyState', JSON.stringify({
        company: {
            companies: state.company.companies,
            visibleCompanies: state.company.companies.slice(0, 50),
            currentPage: 1,
            itemsPerPage: 50
        }

    }))
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


