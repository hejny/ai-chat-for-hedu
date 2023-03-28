import styles from './Sample.module.css';

interface SampleProps {}

export function Sample(props: SampleProps) {
    const {} = props;
    return <div className={styles.Sample}></div>;
}
