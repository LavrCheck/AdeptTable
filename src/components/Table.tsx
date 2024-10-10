import './Table.sass'
import {Company} from "../../types.tsx";
import {Tr} from "./Tr.tsx";
import ChooseAllSection from "./ChooseAllSection.tsx";

export const Table = (
    {
        visibleCompanies
    } : {
        visibleCompanies: Company[]
    }
) => {

    return <>
        <table className="Table">
            <thead>
            <tr>
                <th colSpan={3} className={'sticky'}>
                    <ChooseAllSection />
                </th>
            </tr>
            <tr>
                <th></th>
                <th>Название компании</th>
                <th>Адрес</th>
            </tr>
            </thead>
            <tbody>
            {visibleCompanies.map((x: Company) => (
                <Tr key={x.id} visibleCompany={x}></Tr>
            ))}
            </tbody>
        </table>
    </>
}