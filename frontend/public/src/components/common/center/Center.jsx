export default function Center(props) {
    return (
        <div className={props.wider ? 'widerCenter' : 'center'} style={props.style}>
            {props.children}
        </div>
    )
}