import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import Personas from "../componentesVistas/Personas";
import { firebase as db } from "@react-native-firebase/database";
import { getCurrentUser } from "../Component/helpers";

export default function Busqueda({ navigation }) {
    const tamanio = 30
    const [photoURL, setPhotoUrl] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showSearchPeople, setShowSearchPeople] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    const [dataSetSearch, setDataSetSearch] = useState([])
    const [dataSetSearchPrueba, setDataSetSearchPrueba] = useState([])
    const [showCardFilter, setShowCardFilter] = useState(false)
    useEffect(() => {
        // console.log("Usuario actual ->", getCurrentUser().uid);
        // console.log("Photo ->", photoURL);
        setPhotoUrl(getCurrentUser().photoURL)
        //console.log(showSearch);
        //showSearch ? setShowSearchPeople(false) : console.log("No unid")
        //window.location.reload(false);
    }, [])

    const handleOnChangeText = text => {
        // console.log("Estamos dentro");
        if (text === '') {
            setDataSetSearch([])
        } else {
            /*  var query = db.database().ref("Usuarios").orderByKey();
             query.once("value")
               .then(function(snapshot) {
                 snapshot.forEach(function(childSnapshot) {
                   // key will be "ada" the first time and "alan" the second time
                   var key = childSnapshot.key;
                   // childData will be the actual contents of the child
                   var childData = childSnapshot.val();
                   console.log(childData);
               });
             }); */

            //var query = db.database().ref("Usuarios").orderByChild("name").equalTo(text);
            //   orderByChild("name").equalTo(text);
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
        <View style={{flex: 1}}>
            <StatusBar animated={true}
                backgroundColor='white'
                barStyle="dark-content"
            //hidden={true}
            />
            <SafeAreaView style={styles.centeredVieww}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', flex: 0.2, marginTop: 7, }}>
                        <View style={{ flex: 0.8, justifyContent: "center" }}>
                            <Text style={styles.txtTexto}>Search People</Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 0.2, justifyContent: "space-around", alignItems: "center" }}>
                            <TouchableOpacity style={styles.btnIcono} onPress={() => {
                                /* setShowSearchPeople(false)
                                setShowCardFilter(false)
                                setDataSetSearch([]) */
                                navigation.goBack();
                            }}>
                                <Icon type="material-community" name="close" color={'#e74c3c'} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "100%",  }} >
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

                    <View style={{ flex: 0.7,  width: "100%" }} >
                        {showCardFilter ? (
                            <View style={{ flex: 1, }}>
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
                            <View style={{ flex: 1,  justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    type="material-community"
                                    name="magnify"
                                    size={100}
                                    color= '#27ae60'
                                />
                                <Text style={[styles.txtTexto, {marginTop: 20}]}>Search People</Text>
                                <Text style={[styles.txtTexto, {marginTop: 20, fontWeight: 'normal', fontSize: 15}]}>Type the correct name of the person</Text>
                               {/*  <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', height: 400, width: "100%" }}
                                    onPress={() => console.log(dataSetSearch)}
                                ><Text>dsadkjasdkjas</Text></TouchableOpacity> */}
                            </View>
                        )}
                    </View>


                </View>
            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    
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
    txtTexto:{ alignSelf: "center", fontSize: 18, fontWeight: 'bold', color: '#27ae60' }
})