import styles from "./p.module.css"
export default function P(props) {
    return (
        <p className={styles.P}>{props.text}</p>
    )
}