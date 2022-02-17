import React, { useState } from "react";
import { Input, Icon } from "react-native-elements";

export default function InputTxt(props) {
    const [secury, setSecury] = useState(props.secury ? true : false);
    //console.log(secury);
    return (
        <Input
            placeholder={`${props.placeholder}`}
            inputContainerStyle={{ borderBottomWidth: 0, backgroundColor: '#ecf0f1', borderRadius: 20, paddingVertical: 7, paddingLeft: 20 }}
            underlineColorAndroid='transparent'
            autoCapitalize="none"
            placeholderTextColor='#bdc3c7'
            style={{ color: '#7f8c8d' }}
            secureTextEntry={secury}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.initialValue}
        />
    );
}