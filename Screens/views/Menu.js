import { firebase } from "@react-native-firebase/storage";
import { firebase as db } from "@react-native-firebase/database";
import { firebase as aut } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, StatusBar, FlatList, ScrollView, Alert } from "react-native";
import { Avatar, Icon, Input } from "react-native-elements";
import ImageCropPicker from "react-native-image-crop-picker";
import { getCurrentUser } from "../Component/helpers";
import ModalConfiguracion from "../Component/ModalConfiguracion";
import InputSeach from "../Component/InputSeach";
import Personas from "../componentesVistas/Personas";
import { Divider } from "react-native-paper";
import { themes } from '../assets/theme/colors'

/***
 * 
 * CORREGIR ERROR DE BUSQUEDA DE USUARIO ...
 */

export default function HomeScreen({ navigation }) {
    const user = getCurrentUser()
    const tamanio = 30
    const [photoURL, setPhotoUrl] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showSearchPeople, setShowSearchPeople] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    const [dataSetSearch, setDataSetSearch] = useState([])
    const [dataSetSearchPrueba, setDataSetSearchPrueba] = useState([])
    const [showCardFilter, setShowCardFilter] = useState(false)
    const [arrayOnline, setArrayOnline] = useState([]);
    const [objOnline, setObjonline] = useState({});
    const keyExtractor = (item, index) => index.toString();

    useEffect(() => {
        // console.log("Usuario actual ->", getCurrentUser().uid);
        // console.log("Photo ->", photoURL);
        //setPhotoUrl(getCurrentUser().photoURL)
        //aut.auth().currentUser.photoURL ? setPhotoUrl(aut.auth().currentUser.photoURL) : console.log("no")
        getCurrentUser().photoURL ? setPhotoUrl(getCurrentUser().photoURL) : console.log("Si hay foto uwu", getCurrentUser().photoURL)
        // const onChildOnlineAdded = firebase.database()
        //.ref()
        const onChildOnlineAdded = db.database()
            .ref(`Usuarios`)
            .orderByChild('state')
            .limitToLast(50)
            .on('child_added', (snap) => {
                if (snap.val().state === true) {
                    if (user.uid !== snap.key) {
                        //delete objOnline[key];
                        setObjonline((prevState) => {
                            const key = snap.key;
                            const val = snap.val();

                            return { ...prevState, [key]: val };
                        });
                    }
                }
            });

        const onChildOnlineChanged = db.database()
            .ref(`Usuarios`)
            .on('child_changed', (snap) => {
                //console.log(snap.val());
                if (snap.val().state === true) {
                    if (user.uid !== snap.key) {
                        setObjonline((prevState) => {
                            const key = snap.key;
                            const val = snap.val();

                            return { ...prevState, [key]: val };
                        });
                    }
                } else {
                    setObjonline((prevState) => {
                        const key = snap.key;
                        delete prevState[key];
                        return { ...prevState };
                    });
                }
            });
        return () => {
            db.database().ref('usuarios').off('child_added', onChildOnlineAdded);
            db.database().ref('usuarios').off('child_changed', onChildOnlineChanged);
        }
    }, [])

    useEffect(() => {
        const newArray = Object.values(objOnline);
        setArrayOnline(newArray);
        console.log("Online: ", newArray)
    }, [objOnline]);


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
    function renderizadoBusqueda() {
        return dataSetSearch.map(function (news, i) {
            return (
                <View key={i} style={{ margin: 20, marginVertical: 10, }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.8,
                            //borderWidth: 1, 
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingVertical: 25,
                            paddingLeft: 30
                        }}
                        onPress={() => {
                            console.log("Estamos dentro")
                            // setURL(`https://www.metaweather.com/api/location/${news.woeid}`)
                            //setFiltrosCategorias(false)
                            //setShowCardFilter(false)
                        }}
                    >
                        <Text style={{ fontSize: 15 }}>{news.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }
    let cadenacorr = [];
    const handleOnChangeText = text => {
        // console.log("Estamos dentro");
        if (text === '') {
            setDataSetSearch([])
        } else {

            var longi = []
            var query = db.database().ref("Usuarios").orderByChild("name").equalTo(text);
            query.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        const childData = childSnapshot.val();
                        //console.log("->",childData);
                        setDataSetSearch([...dataSetSearch, childData])
                        //cadenacorr = childData
                        //console.log((childData));
                        //etShowCardFilter()s
                        //longi.push(childData)
                        // console.log("->>>>",[...dataSetSearch, childData].length);
                        setShowCardFilter([...dataSetSearch, childData].length > 0)
                    });
                });
            //console.log("Esto es lo que se obtiene ->",dataSetSearch.length);
            //console.log(longi.length);
            // setDataSetSearch(dataset)

        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#ecf0f1', flex: 1 }}>
            <ModalConfiguracion isVisible={showModal} setVisible={setShowModal} navigation={navigation} data={showCardFilter} setData={setShowCardFilter} />
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
                        <TouchableOpacity style={styles.btnHeaders}
                            onPress={() => {
                                //setShowSearchPeople(true)
                                navigation.navigate('Busqueda')
                                /**
                                 * Lo que sirve
                                 */
                                /*  var query = firebase.database().ref("Usuarios").orderByChild("name").equalTo("Alfonso");
                                 query.once("value")
                                     .then(function (snapshot) {
                                         snapshot.forEach(function (childSnapshot) {
                                             // key will be "ada" the first time and "alan" the second time
                                             var key = childSnapshot.key;
                                             // childData will be the actual contents of the child
                                             var childData = childSnapshot.val();
                                             console.log(childData);
                                         });
                                     }); */

                                // const cons = db.database().ref('Usuarios').orderByChild("name").equalTo("Joselyn Cano")
                                /*.on('value', snapshot => {
                                    console.log('User data: ', snapshot.numChildren());
                                  });*/
                                //console.log(cons);
                            }}
                        >
                            <Icon
                                type="material-community"
                                name="magnify"
                                size={tamanio}
                                color='#2c3e50'

                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnHeaders}
                            onPress={() => setShowModal(true)}
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
                        <TouchableOpacity style={[styles.btnHeaders, { backgroundColor: '#ecf0f1' }]}
                            onPress={() => {

                                try {
                                    aut.auth().signOut().then(() => {
                                        db.database().ref('Usuarios/' + getCurrentUser().uid)
                                            .update({ state: false })
                                        console.log("Sesión Cerrada");
                                        Alert.alert("God Luck!, See you soon")
                                        setPhotoUrl('')
                                        navigation.navigate('LoginScreen')
                                        
                                    })
                                } catch (error) {
                                    console.log(error);
                                }

                            }}
                        >
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
            <View style={{ flex: 0.85, backgroundColor: 'white', paddingHorizontal: 20, }}>
                <FlatList
                    data={arrayOnline}
                    keyExtractor={keyExtractor}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                //console.log(item)
                                navigation.navigate('Chat', { keyExtractor: item })
                            }>
                            <View style={styles.notificaciones}>
                                <Avatar
                                    size="xlarge"
                                    rounded
                                    size="large"
                                    containerStyle={styles.btnFoto}
                                    //onPress={() => OpenGallery()}
                                    source={
                                        item.imageUrl ?
                                            { uri: item.imageUrl } :
                                            require("../assets/avatar-default.jpg")
                                    }
                                />
                                <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
                                    <Text style={styles.nombre}>{item.name}</Text>
                                    <Text style={styles.lastMessage}>{item.email}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )}
                />

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
        flex: 0.15,
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
    centeredVieww: {
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        //marginHorizontal: 10,
        //marginTop: 20,
        backgroundColor: 'white'
        //backgroundColor: 'rgba(200,200,200,0.5)'
    },
    modalView: {
        //justifyContent: "flex-start",
        alignItems: "flex-start",
        flex: 1,
        width: "100%",
        borderRadius: 26,
        //marginBottom: "11%",
        //backgroundColor: 'red'


    },
    btnIcono: {
        borderRadius: 50 / 2,
        backgroundColor: "#ecf0f1",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSearch: { flex: 0.1, width: '90%', backgroundColor: 'white', borderRadius: 20, alignSelf: "center" },
    notificaciones: { flexDirection: "row", padding: 20 },
    nombre: {
        flexDirection: 'column',
        flex: 8,
        paddingLeft: 10,
        paddingTop: 5,
        color: "#AA3939",
    },
    lastMessage: {
        paddingLeft: 10,
        color: 'black',
    },
})
/***
 * 
 *  <Modal
                animationType="fade"
                transparent={true}
                visible={showSearchPeople}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <StatusBar animated={true}
                    backgroundColor='white'
                    barStyle="dark-content"
                    hidden={true}
                />
                <SafeAreaView style={styles.centeredVieww}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', flex: 0.2, marginTop: 7 }}>
                            <View style={{ flex: 0.8, justifyContent: "center" }}>
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold' }}>Search People</Text>
                            </View>
                            <View style={{ flexDirection: "row", flex: 0.2, justifyContent: "space-around", alignItems: "center" }}>
                                <TouchableOpacity style={styles.btnIcono} onPress={() => {setShowSearchPeople(false)
                                    setShowCardFilter(false)
                                    setDataSetSearch([])
                                }}>
                                    <Icon type="material-community" name="close" color={'#e74c3c'} size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: "100%" }} >
                            <Input
                                placeholder="Search location"
                                placeholderTextColor='#2ecc71'
                                //style={{ color: '#ecf0f1', }}
                                onChangeText={textSearch => handleOnChangeText(textSearch)}
                                inputContainerStyle={{ borderBottomWidth: 0, borderRadius: 20, justifyContent: "center", marginTop: 20, paddingHorizontal: 20, backgroundColor: '#ecf0f1', }}
                                leftIcon={<Icon
                                    type="material-community"
                                    name="magnify"
                                    size={30}
                                    color='#2ecc71'
                                />}
                            />
                           
                            </View>

                            <View style={{ flex: 0.7, width: "100%" }} >
                                {showCardFilter ? (
                                    <View style={{flex: 1, }}>
                                        <FlatList
                                            data={dataSetSearch}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item, index }) => (
                                                <Personas
                                                    navigation={navigation}
                                                    item={item}
                                                //select={item.select}
                                                //onPress={() => this.changeSelect(index, item.select)}
                                                />)
                                            }
                                        /> 
    
                                     
                                    </View>
                                ) : (
                                    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                                        <TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }}
                                            onPress={() => console.log(dataSetSearch)}
                                        ><Text>dsadkjasdkjas</Text></TouchableOpacity>
                                    </View>
                                )}
                            </View>
    
    
                        </View>
                    </SafeAreaView>
    
                </Modal>
 */