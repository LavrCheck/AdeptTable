import './ChooseAllSection.sass'
import {Checkbox} from "./Checkbox.tsx";
import {v4 as uuidv4} from 'uuid'
import {Button} from "./Button.tsx";
import {Company, RootState} from "../../types.tsx";
import {connect, useDispatch} from "react-redux";
import {actions} from "../../store.tsx";

const mapStateToProps = (state: RootState) => ({
    companies: state.company.companies,
    visibleCompanies: state.company.visibleCompanies,
});


const ChooseAllSection = (
    {
        companies,
        visibleCompanies
    }: {
        companies: Company []
        visibleCompanies: Company []
    }
) => {

    const dispatch = useDispatch()

    return <>
        <div className={'ChooseAllSection'}>
            <div className={'check-container'}>
                <span>Выбрать все</span>
                <Checkbox
                    id={uuidv4()}
                    checked={visibleCompanies.every(c => c.isSelected)}
                    onChange={() => {
                        dispatch(actions.toggleSelectAll(
                            !visibleCompanies.every(c => c.isSelected)
                        ))
                    }}
                />
            </div>
            <div>
                <Button
                    label={'Удалить'}
                    count={companies.filter(x => x.isSelected).length}
                    onClick={() => {
                        dispatch(actions.removeCompanies(
                            companies.filter(x => x.isSelected).map(x => x.id)
                        ))
                    }}
                />
            </div>
        </div>
    </>
}

export default connect(mapStateToProps)(ChooseAllSection)