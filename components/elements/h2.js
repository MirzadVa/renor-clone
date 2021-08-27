import styles from "./h2.module.css"
export default function H2(props) {
    return (
        <span className={styles.h2}>{props.text}</span>
    )
}