import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Personas({ navigation, item }) {
    const [photoURL, setPhotoUrl] = useState('')
    useEffect(() => {
        //console.log("Estamos dentro del flatlis");
        console.log(item);
        setPhotoUrl(item.imageUrl)
    }, [])
    return (
        <TouchableOpacity style={{ flex: 1, alignItems: "center", marginHorizontal: 30 }}
            onPress={()=> navigation.navigate('Chat',{keyExtractor : item})}
        >
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image
                        resizeMode="contain"
                        style={styles.tinyLogo}
                        source={
                            photoURL ?
                                { uri: photoURL } :
                                require("../assets/avatar-default.jpg")
                        }
                    />
                </View>
                <View style={styles.info}>
                    <Text style={[styles.txtColor, {alignSelf: "center", marginBottom: 6}]}>User data...</Text>
                    <Text style={styles.txtColor}>Name: {'  '} {item.name}</Text>
                    <Text style={styles.txtColor}>Email: {'  '} {item.email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        paddingHorizontal: 5,
        marginVertical: 5,
        //borderRadius: 30,
        width: "100%",
        flexDirection: "row",
        
    },
    img: {
        flex: 0.5,
        backgroundColor: "#2c3e50",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
    },
    info: {
        flex: 0.5,
        backgroundColor: "#2c3e50",
        padding: 5,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        //marginVertical:
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    txtColor:{
        color: 'white',
        marginVertical: 10
    }
})