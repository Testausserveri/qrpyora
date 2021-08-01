export default function Center(props) {
    return (
        <div className={props.wider ? 'widerCenter' : 'center'}>
            {props.children}
        </div>
    )
}