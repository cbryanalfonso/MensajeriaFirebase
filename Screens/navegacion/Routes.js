import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
/*import { AuthStack } from './AuthStack'
import { HomeStack } from './HomeStack'
import { AuthContext } from './AuthProvider';*/

import {HomeStack} from './HomeStack'
import { AuthContext } from './AuthProvider';
import HomeScreen from '../views/Menu';


export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        //setLoading(false);
      }
    
      useEffect(() => {
       // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
       //const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
       // return subscriber; // unsubscribe on unmount
      }, []);
    
     /*  if (loading) {
        return <Loading />;
      } */
      return(
          <NavigationContainer>
            <HomeStack/>
          </NavigationContainer>
      )
    
}