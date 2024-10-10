import './Button.sass'

export const Button = (
    {
        label,
        disabled,
        count,
        onClick
    }: {
        label: string
        disabled?: boolean
        count?: number
        onClick: () => void
    }
) => {

    return <>
        <button
            className={'Button'}
            onClick={() => onClick()}
            disabled={count === 0 ? true : disabled}
        >
            {label} {count ? count : null}
        </button>
    </>
}