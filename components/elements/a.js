import styles from "./a.module.css"
export default function A(props) {
    return (
        <span className={styles.A} href={props.link}>{props.text}</span>
    )
}