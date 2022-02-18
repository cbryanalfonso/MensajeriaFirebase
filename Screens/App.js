import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fondo from "./Component/Fondo";
import { StatusBar } from "react-native";
import Menu from "./views/Menu";
import Providers from "./navegacion";
import LoginScreen from "./credenciales/LoginScreen";
import SignUpScreen from "./credenciales/SignupScreen";
import AppLogin from "./AppLogin";


const TRANSITIONS = ['fade', 'slide', 'none'];
const Stack = createNativeStackNavigator()
export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);
  const changeStatusBarVisibility = () => setHidden(!hidden);



  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };
  useEffect(() => {

  })
  return (
    <NavigationContainer>
      <StatusBar animated={true}
        backgroundColor='#ecf0f1'
        barStyle="dark-content"
        showHideTransition={statusBarTransition}
        hidden={false}
      />
      <AppLogin/>
    </NavigationContainer>
  );
}


/*
<NavigationContainer>
            <StatusBar animated={true}
                backgroundColor='#ecf0f1'
                barStyle="dark-content"
                showHideTransition={statusBarTransition}
                hidden={false}
            />
            <Stack.Navigator>
                <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
                <Stack.Screen name="Fondo" component={Fondo} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

*/