import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../credenciales/SignupScreen";

const Stack = createNativeStackNavigator()

export const AuthStack = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </Stack.Navigator>
    );
}