import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "./AuthProvider";
import { IconButton, Menu, Modal } from "react-native-paper";
import HomeScreen from "../views/Menu";

const ChatAppStack = createNativeStackNavigator()
const ModalStack = createNativeStackNavigator()

function ChatApp() {
    const { logout } = useContext(AuthContext)
    return (
        <ChatAppStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6646ee',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 22,
                },
                headerTitleAlign: {
                    alignItems: 'center',
                },
            }}>
                <ChatAppStack.Screen name="HomeScreen" component={HomeScreen}/>


        </ChatAppStack.Navigator>
    );
}

export default function HomeStack() {
    return (
     <ModalStack.Navigator>
         {/* <ModalStack.Screen name="chatApp" component={ChatApp}/> */}
         <ModalStack.Screen name="HomeScreen" component={HomeScreen}/>
     </ModalStack.Navigator>
    );
}