import React, {InputHTMLAttributes} from 'react'; //importa TODOS os atributos que um input pode receber

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
}

const Input:React.FC<InputProps> = ({label, name, ...rest}) => {// desestruturação para pegar propriedade por propriedade
                                                                // ..rest são todas as demais propriedades do input
    return(
        <div className="input-block">
            <label htmlFor={name} >{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;