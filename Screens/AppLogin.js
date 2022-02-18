import React, { useLayoutEffect, useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./credenciales/SignupScreen";
import LoginScreen from "./credenciales/LoginScreen";
import Menu from "./views/Menu";

const Stack = createNativeStackNavigator()
const MainStack = createNativeStackNavigator()

export default function AppLogin() {
    const [user, setUser] = useState();

    useLayoutEffect(() => {
        const suscriber = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(true)
            } else {
                setUser(false)
            }
        })
        return suscriber;
    }, [])

    const StackNoAuth = () => (
        <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
    const StackAuth = () => (
        <MainStack.Navigator>
            <MainStack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <MainStack.Screen name="SignupScreen" component={SignUpScreen} options={{ headerShown: false }} />
        </MainStack.Navigator>
    )

    return (
        <>
            {user ? <StackAuth/> : <StackNoAuth/>}
        </>
    )
}

/***
 * <Stack.Navigator>
        <Stack.Screen name="SignupScreen" component={SignUpScreen} options={{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Fondo" component={Fondo} options={{ headerShown: false }} />
      </Stack.Navigator>
 */