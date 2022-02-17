import { firebase } from "@react-native-firebase/auth";
import { firebase as db } from "@react-native-firebase/database";
import { Formik } from "formik";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Boton from "../Component/Boton";
import InputTxt from "../Component/InputTxt";


export default function LoginScreen({ navigation }) {
    const signIn = (values) => {
        if (values.email && values.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(userCredential => {
                    console.log("Inicio de sesión exitoso ...");
                    navigation.navigate('Menu')
                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

            /**
             * 
             *  firebase
                .database()
                    .ref('/Usuarios')
                    .on('value', snapshot => {
                        console.log('User data: ', snapshot.val());
                    })
             */
        } else {
            alert('Please complete ...')
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#ecf0f1', flex: 1 }}>
            <View style={styles.header}>
                <Text style={{ color: 'green', fontSize: 30, fontWeight: "bold" }}>Mensajeria</Text>
            </View>
            <View style={styles.subContainer}>

                <ScrollView style={{ flex: 0.7, paddingTop: 40 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.txtTitulo}>Sign In</Text>
                        <Text style={styles.txtCrearUser}>New User ? {"  "}
                            <Text style={{ color: "#27ae60" }} onPress={() => navigation.navigate('SignupScreen')}>Create an account</Text>
                        </Text>
                    </View>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={values => signIn(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={{ alignItems: "center" }}>
                                <View style={{ marginTop: 40 }} />
                                <InputTxt
                                    placeholder={"Ingrese su correo electronico"}
                                    // secury={false}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    initialValue={values.email}
                                />
                                <InputTxt
                                    placeholder={"Ingrese su contraseña"}
                                    secury={true}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    initialValue={values.password}
                                />

                                <Text style={{ color: "#27ae60", alignSelf: "flex-end", marginRight: 20, marginBottom: 20 }} onPress={() => console.log("Si funciona")}>Forgot password</Text>
                                <Boton txtBtn={"Sign In"} onPress={handleSubmit} />
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

/*
 <View style={{marginTop: 40}}/>
                        <InputTxt placeholder={"Ingrese su correo electronico"} seguridad={false}/>
                        <InputTxt placeholder={"Ingrese su contraseña"} seguridad={true}/>
                        <Text style={{ color: "#27ae60", alignSelf: "flex-end",marginRight: 20 }} onPress={() => console.log("Si funciona")}>Forgot password</Text>
                        <Boton txtBtn={"Sign In"} onPress={()=> console.log('Veamos que pasa amigos')}/>



*/