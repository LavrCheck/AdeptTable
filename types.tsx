export type Company = {
    id: string
    name: string
    address: string
    isSelected: boolean
}

export type CompanyState = {
    companies: Company[]
}

export type RootState  = {
    company: CompanyState
}
