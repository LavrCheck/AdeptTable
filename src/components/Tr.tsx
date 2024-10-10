import {Company} from "../../types.tsx";
import {Checkbox} from "./Checkbox.tsx";
import {useState} from "react";
import './Tr.sass'
import {useDispatch} from "react-redux";
import {actions} from "../../store.tsx";

export const Tr = (
    {
        visibleCompany
    }: {
        visibleCompany: Company
    }
) => {

    const [companyName, setCompanyName] = useState<string>(visibleCompany.name)
    const [address, setAddress] = useState<string>(visibleCompany.address)

    const dispatch = useDispatch()

    return <>
        <tr className={`Tr ${visibleCompany.isSelected ? 'selected' : ''}`}>
            <td style={{width: '4em'}}>
                <Checkbox
                    id={visibleCompany.id}
                    checked={visibleCompany.isSelected}
                    onChange={() => dispatch(actions.toggleSelectCompany(visibleCompany.id))}
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
                            setCompanyName(visibleCompany.name)
                            return
                        }
                        dispatch(actions.updateCompanyName({id: visibleCompany.id, newName: companyName}))
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
                            setAddress(visibleCompany.address)
                            return
                        }
                        dispatch(actions.updateCompanyAddress({id: visibleCompany.id, newAddress: address}))
                    }}
                />
            </td>
        </tr>
    </>
}