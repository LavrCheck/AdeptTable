import './AddNewSection.sass'
import {Button} from "./Button.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid'
import {actions} from "../../store.tsx";


export const AddNewSection = () => {

    const [companyName, setCompanyName] = useState<string>('')
    const [address, setAddress] = useState<string>('')

    const dispatch = useDispatch();

    return <>
        <div className={'AddNewSection'}>
            <div className={'inputs-container'}>
                <input
                    value={companyName}
                    onChange={(e) => {
                        if (e.target.value.length <= 35) {
                            setCompanyName(e.target.value)
                        }
                    }}
                    placeholder={'Название'}

                />
                <input
                    value={address}
                    onChange={(e) => {
                        if (e.target.value.length <= 35) {
                            setAddress(e.target.value)
                        }
                    }}
                    placeholder={'Адрес'}
                />
            </div>
            <Button
                label={'Добавить'}
                disabled={!companyName || !address}
                onClick={() => {
                    dispatch(actions.addCompany({
                        id: uuidv4(),
                        name: companyName,
                        address: address,
                        isSelected: false
                    }))
                    setCompanyName('')
                    setAddress('')
                }}
            />
        </div>
    </>
}