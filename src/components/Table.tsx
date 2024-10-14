import './Table.sass'
import {Company, RootState} from "../../types.tsx";
import {Tr} from "./Tr.tsx";
import {ChooseAllSection} from "./ChooseAllSection.tsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const itemsPerPage: number = 50


export const Table = () => {

    const companies: Company[] = useSelector((state: RootState) => state.company.companies)

    const [offset, setOffset] = useState<number>(0)

    const handleScroll = () => {
        const bottom: boolean = window.innerHeight + window.pageYOffset + 200 >= document.documentElement.scrollHeight
        if (bottom) {
            setOffset(prevState => (prevState + itemsPerPage))
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    if (companies.length === 0) {
        return <></>
    }

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
            {companies.slice(0, offset + itemsPerPage).map((company: Company) => (
                <Tr key={company.id} company={company}></Tr>
            ))}
            </tbody>
        </table>
    </>
}