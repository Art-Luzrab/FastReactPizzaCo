import { Link } from 'react-router-dom'

function Button({ children, disabled, to, type }) {
    const base =
        'focus-b focus:bg-yellow inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 text-sm transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed '

    const styles = {
        primary: base + ' px-4 py-3 sm:px-6 md:py-4',
        small: base + '  px-4 py-2 sm:px-5 md:py-2.5 text-xs',
        secondary:
            ' focus:bg-stone-300 inline-block rounded-full border-2 border-stone-300  font-semibold uppercase tracking-wide text-sm text-stone-400 transition-colors duration-300 hover:bg-stone-300  focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed  px-4 py-2.5 sm:px-6 md:py-3.5 hover:text-stone-800',
    }

    if (to)
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        )

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
