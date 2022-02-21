import { firebase } from "@react-native-firebase/auth";
import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
    FlatList,
    Pressable,
    Alert,
} from 'react-native';
import { Icon, Overlay } from "react-native-elements";
export default function ModalConfiguracion({ navigation, isVisible, setVisible, data, setData }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >

            <View style={styles.centeredVieww}>

                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 7 }}>
                        <View style={{ flex: 0.8, justifyContent: "center" }}>
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold' }}>Mensajeria Options</Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 0.2, justifyContent: "space-around", alignItems: "center" }}>
                            <TouchableOpacity style={styles.btnIcono} onPress={() => {
                                setVisible(false)
                                //setData(false)
                            }}>
                                <Icon type="material-community" name="close" color={'#e74c3c'} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 15, justifyContent: 'space-around', flex: 1 }}>
                        <TouchableOpacity style={styles.btnIcono}>
                            <Icon type="material-community" name="chat-processing-outline" color={'#2ecc71'} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnIcono}>
                            <Icon type="material-community" name="account-group-outline" color={'#2ecc71'} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnIcono}>
                            <Icon type="material-community" name="history" color={'#2ecc71'} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnIcono} onPress={() =>
                            firebase.auth().signOut().then(() => {
                                console.log("Sesión Cerrada");
                                Alert.alert("God Luck!, See you soon")
                                navigation.navigate('LoginScreen')
                            })
                        }>
                            <Icon type="material-community" name="logout" color={'#e74c3c'} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5, justifyContent: 'space-around', flex: 1 }}>
                        <Text>New Chat  </Text>
                        <Text>New Group </Text>
                        <Text>Up history</Text>
                        <Text>Log Out   </Text>
                    </View>



                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredVieww: {
        alignItems: "center",
        justifyContent: 'flex-end',
        flex: 1,
        marginHorizontal: 10,
    },
    modalView: {

        justifyContent: "center",
        flex: 0.28,
        width: "100%",
        borderRadius: 26,
        marginBottom: "11%",
        backgroundColor: 'rgba(200,200,200,0.5)'
    },
    btnIcono: {
        borderRadius: 50 / 2,
        backgroundColor: "#ecf0f1",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

/*
<View style={{ flexDirection: 'row', flex: 0.5 }}>


                     
                      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}>

                          <TouchableOpacity style={styles.btnIcono}
                              onPress={() => setVisible(false)}
                          >

                             
                          </TouchableOpacity>
                      </View>

                  </View>

*/