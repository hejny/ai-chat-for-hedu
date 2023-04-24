import { classNames } from '../../utils/classNames';
import styles from './SelectWithFirst.module.css';

interface SelectWithFirstProps<TValue> {
    title: string;
    value: TValue;
    onChange(newValue: TValue): void;
    numberOfButtons?: number;
    options: Array<{ id: TValue; title: string }>;
}

export function SelectWithFirst<TValue extends string | number>(props: SelectWithFirstProps<TValue>) {
    const { title, value, onChange, numberOfButtons = 1 } = props;

    const options = [...props.options];
    const firstOptions = options.slice(0, numberOfButtons);
    const restOptions = options.slice(numberOfButtons);

    return (
        <div className={styles.SelectWithFirst}>
            <span className={styles.title}>{title}</span>

            {firstOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => void onChange(option.id)}
                    className={classNames(value === option.id && styles.selected)}
                >
                    {option.title}
                </button>
            ))}

            {restOptions.length !== 0 && (
                <select
                    onChange={(event) => void onChange(parseInt(event.target.value) as any)}
                    className={classNames(!firstOptions.some(({ id }) => id === value) && styles.selected)}
                >
                    {restOptions.map((option) => (
                        <option key={option.id} selected={value === option.id} value={option.id}>
                            {option.title}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
