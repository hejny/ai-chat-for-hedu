import styles from './SelectWithFirst.module.css';

interface SelectWithFirstProps<TValue extends string | number> {
    title: string;
    value: TValue;
    onChange(newValue: TValue): void;
    options: Record<TValue, string>;
}

export function SelectWithFirst<TValue extends string | number>(props: SelectWithFirstProps<TValue>) {
    const { title, value, onChange, options } = props;

    return (
        <div className={styles.SelectWithFirst}>
            {title} <button>Můj</button>
            <select>
                <option>Franta Opička</option>
            </select>
        </div>
    );
}
