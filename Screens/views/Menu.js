import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

export default function HomeScreen() {
    const tamanio = 30
    return (
        <SafeAreaView style={{ backgroundColor: '#ecf0f1', flex: 1 }}>
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
                        <TouchableOpacity style={styles.btnHeaders}>
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
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'green', fontWeight: "bold", fontSize: 16 }}>Flatlist</Text>
                    </View>
                    <View style={{ flex: 1 }}>

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
                        <TouchableOpacity style={[styles.btnHeaders,{backgroundColor: '#ecf0f1'}]}>
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
        width: 50,
        height: 50,
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
    txtNotificacion: { fontSize: 15, color: '#bdc3c7', fontStyle: 'italic', fontWeight:'normal' },
    txtTituloApp:{ color: 'green', fontWeight: "bold", fontSize: 30 },

})