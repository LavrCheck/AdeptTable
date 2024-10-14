import './ChooseAllSection.sass'
import {Checkbox} from "./Checkbox.tsx";
import {v4 as uuidv4} from 'uuid'
import {Button} from "./Button.tsx";
import {RootState} from "../../types.tsx";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store.tsx";
import {createSelector} from "@reduxjs/toolkit";


export const ChooseAllSection = () => {

    const dispatch = useDispatch()

    const selectIsAllSelected = createSelector(
        (state: RootState) => state.company.companies,
        companies => companies.every(c => c.isSelected)
    )

    const selectSelectedCount = createSelector(
        (state: RootState) => state.company.companies,
        companies => companies.filter(c => c.isSelected).length
    )

    const isAllSelected = useSelector(selectIsAllSelected)
    const selectedCount = useSelector(selectSelectedCount)

    return <>
        <div className={'ChooseAllSection'}>
            <div className={'check-container'}>
                <span>Выбрать все</span>
                <Checkbox
                    id={uuidv4()}
                    checked={isAllSelected}
                    onChange={() => {
                        dispatch(actions.toggleSelectAll(!isAllSelected))
                    }}
                />
            </div>
            <div>
                <Button
                    label={'Удалить'}
                    count={selectedCount}
                    onClick={() => {
                        dispatch(actions.removeCompanies())
                    }}
                />
            </div>
        </div>
    </>
}
