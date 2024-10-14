import {Company} from "../../types.tsx";
import {Checkbox} from "./Checkbox.tsx";
import {useState} from "react";
import './Tr.sass'
import {useDispatch} from "react-redux";
import {actions} from "../../store.tsx";

export const Tr = (
    {
        company
    }: {
        company: Company
    }
) => {

    const [companyName, setCompanyName] = useState<string>(company.name)
    const [address, setAddress] = useState<string>(company.address)

    const dispatch = useDispatch()

    return <>
        <tr className={`Tr ${company.isSelected ? 'selected' : ''}`}>
            <td style={{width: '4em'}}>
                <Checkbox
                    id={company.id}
                    checked={company.isSelected}
                    onChange={() => dispatch(actions.toggleSelectCompany(company.id))}
                />
            </td>
            <td>
                <textarea
                    className={'text-area'}
                    value={companyName}
                    onChange={(e) => {
                        if (e.target.value.length <= 35) {
                            setCompanyName(e.target.value)
                        }
                    }}
                    onBlur={() => {
                        if (companyName === '') {
                            setCompanyName(company.name)
                            return
                        }
                        dispatch(actions.updateCompanyName({id: company.id, newName: companyName}))
                    }}
                />
            </td>
            <td>
                <textarea
                    className={'text-area'}
                    value={address}
                    onChange={(e) => {
                        if (e.target.value.length <= 35) {
                            setAddress(e.target.value)
                        }
                    }}
                    onBlur={() => {
                        if (address === '') {
                            setAddress(company.address)
                            return
                        }
                        dispatch(actions.updateCompanyAddress({id: company.id, newAddress: address}))
                    }}
                />
            </td>
        </tr>
    </>
}