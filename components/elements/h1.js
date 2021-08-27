import styles from "./h1.module.css"
export default function H1(props) {
    return (
        <span className={styles.H1}>{props.text}</span>
    )
}