import { Form, FormControlProps } from "react-bootstrap"
import { Bind } from "brn-useinput"

interface Props {
    labelContent: string,
    bind: Bind<any>,
    args?: FormControlProps
}

function FormField({ labelContent, bind, args }: Props) {

    const controlProps = {
        ...args,
        ...bind
    }

    return (
        <Form.Group>
            <Form.Label>{labelContent}</Form.Label>
            <Form.Control {...controlProps }/>
        </Form.Group>
    )
}

export default FormField