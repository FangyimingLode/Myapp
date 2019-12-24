import React, {useState} from 'react';
import Input from 'react-native'; 
export const FormInput = props => {
    const { icon, refInput, style, ...otherProps } = props;
    return (
        <Input 
            ref={refInput}
            letftIcon={
                <Icon name={icon} type={'simple-line-icon'} color="#7384B4" size={18} />
            }
            
        />
    )
}