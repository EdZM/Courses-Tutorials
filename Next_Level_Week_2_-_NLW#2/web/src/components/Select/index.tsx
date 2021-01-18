import React, {SelectHTMLAttributes} from 'react'; //importa TODOS os atributos que um Select pode receber

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    name: string;
    label: string;
    options: Array<{
        value: string,
        label: string,
    }>
}

const Select:React.FC<SelectProps> = ({label, name, options, ...rest}) => {// desestruturação para pegar propriedade por propriedade
                                                                // ..rest são todas as demais propriedades do Select
    return(
        <div className="select-block">
            <label htmlFor={name} >{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option> 
                
                {options.map(option => { 
                    return <option key={option.value} value={option.value} label={option.label}></option>

                }) /* map percorre o array e retorna alguma coisa dele. O primeiro item iterado precisa ter uma key unica  */}
                
            </select>
        </div>
    );
}

export default Select;