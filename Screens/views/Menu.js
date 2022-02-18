import { firebase } from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import ImageCropPicker from "react-native-image-crop-picker";
import { getCurrentUser } from "../Component/helpers";
import ModalConfiguracion from "../Component/ModalConfiguracion";


export default function HomeScreen({navigation}) {
    const tamanio = 30
    const [photoURL, setPhotoUrl] = useState('')
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        console.log("Usuario actual ->",getCurrentUser().uid);
        console.log("Photo ->", photoURL);
        setPhotoUrl(getCurrentUser().photoURL)
    },[])

    function OpenGallery() {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            console.log(image.path);
            //console.log(firebase.auth().currentUser.uid);
            //setPhotoUrl(image.path)
        })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#ecf0f1', flex: 1 }}>
            <ModalConfiguracion isVisible={showModal} setVisible={setShowModal} navigation={navigation} />
            <View style={{ flex: 0.23, }}>
                <View style={{ flex: 1, flexDirection: "row", }}>
                    <View style={styles.header}>
                        <Text style={styles.txtTituloApp}>Mensajeria</Text>
                    </View>
                    <View style={[styles.header, { flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={styles.btnHeaders}>
                            <Icon
                                type="material-community"
                                name="moon-waning-crescent"
                                size={tamanio}
                                color='#2c3e50'
                                style={{ transform: [{ rotateZ: '-25deg' }] }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnHeaders}>
                            <Icon
                                type="material-community"
                                name="magnify"
                                size={tamanio}
                                color='#2c3e50'

                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnHeaders}
                        onPress={()=> setShowModal(true)}
                        >
                            <Icon
                                type="material-community"
                                name="dots-horizontal"
                                size={tamanio}
                                color='#2c3e50'

                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", }}>
                    <View style={{ flex: 0.5, alignItems: "center" }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            size="large"
                            containerStyle={styles.btnFoto}
                            onPress={() => OpenGallery()}
                            source={
                                photoURL ?
                                    { uri: photoURL } :
                                    require("../assets/avatar-default.jpg")
                            }
                        />
                    </View>
                    <View style={{ flex: 1.5 }}>

                    </View>
                </View>
            </View>
            <View style={styles.bodyMensajes}>
                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtMensajes}>Mensajes</Text>
                        <Text style={[styles.txtMensajes, styles.txtNotificacion]}>Notificacion</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 30 }}>
                        <TouchableOpacity style={[styles.btnHeaders, { backgroundColor: '#ecf0f1' }]}>
                            <Icon
                                type="material-community"
                                name="archive-outline"
                                size={25}
                                color='#2c3e50'

                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: { flex: 1, justifyContent: "center", paddingLeft: 15 },
    btnHeaders: {
        backgroundColor: '#bdc3c7',
        width: 45,
        height: 45,
        borderRadius: 50 / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    bodyMensajes: {
        marginTop: 10,
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    txtMensajes: { color: 'black', fontSize: 30, marginLeft: 20, fontWeight: 'bold' },
    txtNotificacion: { fontSize: 15, color: '#bdc3c7', fontStyle: 'italic', fontWeight: 'normal' },
    txtTituloApp: { color: 'green', fontWeight: "bold", fontSize: 30 },
    btnFoto: {
        //backgroundColor: "#dfe6e9",
        width: 60,
        height: 60,
        borderRadius: 40,
        marginBottom: 10,
    },
})