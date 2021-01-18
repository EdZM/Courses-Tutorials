import React, {TextareaHTMLAttributes} from 'react'; //importa TODOS os atributos que um Textarea pode receber

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    label: string;
}

const Textarea:React.FC<TextareaProps> = ({label, name, ...rest}) => {// desestruturação para pegar propriedade por propriedade
                                                                // ..rest são todas as demais propriedades do Textarea
    return(
        <div className="textarea-block">
            <label htmlFor={name} >{label}</label>
            <textarea id={name} {...rest} />
        </div>
    );
}

export default Textarea;