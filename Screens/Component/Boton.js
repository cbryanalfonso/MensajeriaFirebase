import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Boton({txtBtn, onPress }){
    return(
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            <Text style={styles.txt}>{txtBtn}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:"#27ae60",
        width: "80%",
        //marginTop: 40,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
       // paddingBottom: 50,
    },
    txt:{
        color: "#ecf0f1",
        fontWeight: "bold",
        fontSize: 20
    }
})