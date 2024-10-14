import './ChooseAllSection.sass'
import {Checkbox} from "./Checkbox.tsx";
import {v4 as uuidv4} from 'uuid'
import {Button} from "./Button.tsx";
import {RootState} from "../../types.tsx";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store.tsx";


export const ChooseAllSection = () => {

    const dispatch = useDispatch()

    const selected: any = useSelector((state: RootState) => ({
        isAll: state.company.companies.every(c => c.isSelected),
        count: state.company.companies.filter(x => x.isSelected).length
    }))

    return <>
        <div className={'ChooseAllSection'}>
            <div className={'check-container'}>
                <span>Выбрать все</span>
                <Checkbox
                    id={uuidv4()}
                    checked={selected.isAll}
                    onChange={() => {
                        dispatch(actions.toggleSelectAll(!selected.isAll))
                    }}
                />
            </div>
            <div>
                <Button
                    label={'Удалить'}
                    count={selected.count}
                    onClick={() => {
                        dispatch(actions.removeCompanies())
                    }}
                />
            </div>
        </div>
    </>
}
