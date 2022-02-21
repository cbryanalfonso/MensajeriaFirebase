import React from "react";
import { Input } from "react-native-elements";
import { Icon } from "react-native-elements";

const InputSeach = ({placeholder, value, onChangeText, addStyle}) =>{
    return(
        <Input
            value={value}
            placeholder={placeholder}
            rightIcon={<Icon type="material-community" name="magnify" size={20} color={'black'}/>}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => onChangeText(value)}
            style={addStyle ? addStyle : null}
        />
    )
}

export default InputSeach;