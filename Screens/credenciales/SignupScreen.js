import { firebase } from "@react-native-firebase/auth";
import { firebase as db } from "@react-native-firebase/database";
import { firebase as st } from "@react-native-firebase/storage";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import Boton from "../Component/Boton";
import InputTxt from "../Component/InputTxt";
import ImageCropPicker from "react-native-image-crop-picker";
import { Avatar, Icon } from "react-native-elements";
import { fileToBlob } from '../Component/helpers'
import { TouchableOpacity } from "react-native";
export default function SignUpScreen({ navigation }) {
    const [photoURL, setPhotoUrl] = useState('')
    const [usuario, setUsuario] = useState('')


    const uploadImage = async (usuarios, correo, nombre, contra) => {
        console.log("Si estoy funcionando amigo mio....", usuarios);
        console.log("La foto ", photoURL);
        const pathToFile = photoURL;
        // uploads file
        const reference = st.storage().ref('avatars').child(usuarios);
        await reference.putFile(pathToFile);

        const url = await st.storage().ref(`avatars/${usuarios}`).getDownloadURL()
        console.log(url);
        setPhotoUrl(url)
        ///

        db
            .database()
            .ref(`/Usuarios/${usuarios}`)
            .set({
                name: nombre,
                email: correo,
                password: contra,
                imageUrl: url,
                uid: usuarios,
                state: true,
            })
            .then(() => {
               // navigation.navigate('LoginScreen')
                console.log("Lo que se sube a base de datos->", url)
            }
            )
            .catch(error => {
                console.log(error)
            })
        
            firebase
            .auth()
            .onAuthStateChanged(function (user){
                user
                .updateProfile({
                    displayName: nombre,
                    photoURL: url,
                })
            })
            
            
            


    }

    const register = (values) => {
        if (values.email && values.password) {
            firebase.auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                    // setLoader(false);
                    // console.log('done');
                    var user = userCredential.user;
                    user
                        .updateProfile({
                            displayName: values.name,
                            /*photoURL : photoURL ? photoURL
                            :
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png'
                            /*photoURL: values.imageUrl
                                ? values.imageUrl
                                : 'https://e7.pngegg.com/pngimages/304/305/png-clipart-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face.png',
                       */
                        })
                        .then(() => {
                            // Update successful
                            // ...
                            //navigation.navigate('LoginScreen')
                            setUsuario(user.uid)
                            uploadImage(user.uid, values.email, values.name, values.password)
                        })
                        .catch((error) => {
                            // An error occurred
                            // ...
                        });

                })
                .catch(error => {
                    // setLoader(false);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    alert(errorMessage)
                });
        } else {
            alert('Please complete the data');
        }
        // uploadImage(user, )
        //const uploadImage = async () => {

        // }
        // firebase
        //.auth()
        // .onAuthStateChanged(function (user) {

        //   if (user) {
        //     const pathTo = photoURL
        //     console.log(pathTo);
        //   try{
        //      st.storage().ref('avatars').child(user.uid).putFile(pathTo)
        //   }catch(error){console.log("el error es ->",error);}
        /*  const referencia = 'avatars'
         const usuario = user.uid
         const pathToFile = st.storage().ref(referencia).child(usuario)
         const blob = fileToBlob(photoURL)
        // await 
        pathToFile.put(blob)
         try {
             const url = st.storage().ref(`${referencia}/${usuario}`).getDownloadURL
             result.statusResponse = true
             result.url = url
             console.log(url);
         } catch (error) {
             console.log(error);
        } */
        //await reference.putFile(pathToFile)
        //  }
        //console.log();
        //  })

        /* firebase
            .auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    ///console.log(user.uid);
                    db
                        .database()
                        .ref(`/Usuarios/${user.uid}`)
                        .set({
                            name: values.name,
                            email: values.email,
                            password: values.password,
                            imageUrl: photoURL,
                        })
                        .then(() => {
                            navigation.navigate('LoginScreen')
                            console.log("Lo que se sube a base de datos->",photoURL)}
                        )
                        .catch(error => {
                            console.log(error)
                        })

                    //break;
                   
                }
            }) */
    };

    function OpenGallery() {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            console.log(image.path);
            //console.log(firebase.auth().currentUser.uid);
            setPhotoUrl(image.path)
        })
            .catch(error => {
                console.log(error);
            })
    }

    //const uploadImage = async (image, path, name) => {

    //}


    return (
        <SafeAreaView style={{ backgroundColor: '#ecf0f1', flex: 1 }}>
            <View style={styles.header}>
                <Text style={{ color: 'green', fontSize: 30, fontWeight: "bold" }}>Mensajeria</Text>
            </View>
            <View style={styles.subContainer}>

                <ScrollView style={{ flex: 0.7, paddingTop: 40, }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.txtTitulo}>Sign Up</Text>
                        <Text style={styles.txtCrearUser}>Already an user ? {"  "}
                            <Text style={{ color: "#27ae60" }} onPress={() => navigation.navigate('LoginScreen')}>Sign In</Text>
                        </Text>
                    </View>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            //imageUrl: '',
                        }}
                        onSubmit={(values) => register(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={{ alignItems: "center", marginBottom: '15%' }}>
                                <View style={{ marginTop: 40 }} />
                                <View style={{ marginBottom: 20, justifyContent: "space-between", alignItems: "center" }}>
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
                                    <Text>Seleccione fotografia</Text>
                                </View>
                                <InputTxt
                                    placeholder={"Ingrese su nombre"}
                                    // secury={false}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    initialValue={values.name}
                                />
                                <InputTxt
                                    placeholder={"Ingrese su correo electronico"}
                                    // secury={false}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    initialValue={values.email}
                                />
                                {/*  <InputTxt
                                    placeholder={"Ingrese el url de su fotografia"}
                                    // secury={false}
                                    onChangeText={handleChange('imageUrl')}
                                    onBlur={handleBlur('imageUrl')}
                                    initialValue={values.imageUrl}
                                /> */}

                                <InputTxt
                                    placeholder={"Ingrese su contraseña"}
                                    secury={true}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    initialValue={values.password}
                                />

                                <Boton txtBtn={"Sign Up"} onPress={handleSubmit} />

                            </View>
                        )}
                    </Formik>


                </ScrollView>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    subContainer: { margin: 10, backgroundColor: 'white', borderRadius: 30, borderWidth: 1, flex: 0.8, borderColor: 'white', },
    txtTitulo: { color: '#2c3e50', fontWeight: '600', fontSize: 40 },
    txtCrearUser: { color: '#2c3e50', fontSize: 17, paddingTop: 20 },
    header: { flex: 0.15, justifyContent: "center", alignItems: "center" },
    btnFoto: {
        //backgroundColor: "#dfe6e9",
        width: 100,
        height: 100,
        borderRadius: 40,
        marginBottom: 10,
    },

})

/****
 * <TouchableOpacity style={{backgroundColor: 'red', width: '100%', height: '10%'}} onPress={async () => {
                                    const pathToFile = photoURL;
                                    // uploads file
                                    const reference = st.storage().ref('avatars').child('sad');
                                    await reference.putFile(pathToFile);
                                }}>

                    </TouchableOpacity>
 */