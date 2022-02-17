import { firebase } from "@react-native-firebase/auth";
import { firebase as db } from "@react-native-firebase/database";
import { Formik } from "formik";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Boton from "../Component/Boton";
import InputTxt from "../Component/InputTxt";

export default function SignUpScreen({ navigation }) {

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
                            photoURL: values.imageUrl
                                ? values.imageUrl
                                : 'https://e7.pngegg.com/pngimages/304/305/png-clipart-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face.png',
                        })
                        .then(() => {
                            // Update successful
                            // ...
                            navigation.navigate('LoginScreen')
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
        firebase
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
                            imageUrl: values.imageUrl,
                        })
                        .then(() => console.log('')
                        )
                        .catch(error =>{
                            console.log(error)
                        })
                        
                        //break;
                    /*  .on('value', snapshot => {
                        console.log('User data: ', snapshot.val());
                    })  */
                }
            })
    };


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
                            imageUrl: '',
                        }}
                        onSubmit={(values) => register(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={{ alignItems: "center", marginBottom: '15%' }}>
                                <View style={{ marginTop: 40 }} />

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
                                <InputTxt
                                    placeholder={"Ingrese el url de su fotografia"}
                                    // secury={false}
                                    onChangeText={handleChange('imageUrl')}
                                    onBlur={handleBlur('imageUrl')}
                                    initialValue={values.imageUrl}
                                />
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

})