export default function FlexCenter(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center'}}>
            {props.children}
        </div>
    )
}