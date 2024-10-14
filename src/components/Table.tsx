import './Table.sass'
import {Company, RootState, VisibleCompanies} from "../../types.tsx";
import {Tr} from "./Tr.tsx";
import {ChooseAllSection} from "./ChooseAllSection.tsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const Table = () => {

    const companies: Company[] = useSelector((state: RootState) => state.company.companies)

    const [visibleCompanies, setVisibleCompanies] = useState<VisibleCompanies>({
        currentPage: 1,
        visibleCompanies: companies.slice(0, 50)
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    useEffect(() => {
        const itemsPerPage: number = 50
        setVisibleCompanies((prevState) => ({
            currentPage: prevState.currentPage,
            visibleCompanies: companies.slice(0, prevState.currentPage * itemsPerPage)
        }))
    }, [companies]);

    const handleScroll = () => {
        const bottom: boolean = window.innerHeight + window.pageYOffset + 200 >= document.documentElement.scrollHeight
        const itemsPerPage: number = 50
        if (bottom) {
            setVisibleCompanies(prevState => ({
                currentPage: prevState.currentPage + 1,
                visibleCompanies: companies.slice(0, prevState.currentPage * itemsPerPage)
            }))
        }
    }

    if (companies.length === 0) {return <></>}

    return <>
        <table className="Table">
            <thead>
            <tr>
                <th colSpan={3} className={'sticky'}>
                    <ChooseAllSection/>
                </th>
            </tr>
            <tr>
                <th></th>
                <th>Название компании</th>
                <th>Адрес</th>
            </tr>
            </thead>
            <tbody>
            {visibleCompanies.visibleCompanies.map((company: Company) => (
                <Tr key={company.id} company={company}></Tr>
            ))}
            </tbody>
        </table>
    </>
}