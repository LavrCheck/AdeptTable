import './Checkbox.sass'

export const Checkbox = (
    {
        id,
        checked,
        onChange
    }: {
        id: string,
        checked: boolean,
        onChange: () => void,
    }
) => {


    return <div className={'Checkbox'}>
        <div className={'checkbox-container'}>
            <input
                type="checkbox"
                className="custom-checkbox"
                id={id}
                checked={checked}
                onChange={() => onChange()}
            />
            <label htmlFor={id}></label>
        </div>
    </div>
}

