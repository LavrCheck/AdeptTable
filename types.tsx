export type Company = {
    id: string
    name: string
    address: string
    isSelected: boolean
}

export type CompanyState = {
    companies: Company[]
    visibleCompanies: Company[]
    currentPage: number
    itemsPerPage: number
}

export type RootState  = {
    company: CompanyState
}