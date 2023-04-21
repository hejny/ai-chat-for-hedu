import { classNames } from '../../utils/classNames';
import styles from './SelectWithFirst.module.css';

interface SelectWithFirstProps<TValue> {
    title: string;
    value: TValue;
    onChange(newValue: TValue): void;
    options: Array<{ id: TValue; title: string }>;
}

export function SelectWithFirst<TValue extends string | number>(props: SelectWithFirstProps<TValue>) {
    const { title, value, onChange, options } = props;

    const [firstOption, ...restOptions] = options;

    if (!firstOption) {
        return <></>;
    }

    return (
        <div className={styles.SelectWithFirst}>
            {title}{' '}
            <button
                onClick={() => void onChange(firstOption.id)}
                className={classNames(value === firstOption.id && styles.selected)}
            >
                {firstOption.title}
            </button>
            <select
                onChange={(event) => void onChange(parseInt(event.target.value) as any)}
                className={classNames(value !== firstOption.id && styles.selected)}
            >
                {restOptions.map((option) => (
                    <option key={option.id} selected={value === option.id} value={option.id}>
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
