import { firebase } from "@react-native-firebase/database";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { getCurrentUser } from "../Component/helpers";


const ChatScreen = ({route, navigation})=>{
    const {keyExtractor} = route.params;
    const showPeople = false
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState();
    const user = getCurrentUser()

    function handleSendMessage(messages){
        const text = messages[0].text;
        const tiempo = new Date().getTime();
        firebase.database()
        .ref(`chat/${channel}`)
        .push({
            _id: Math.round(Math.random() * 1000000),
            text,
            createdAt: new Date().getTime(),
            status: false,
            user:{
                _id: user.uid,
                email: keyExtractor.email,
            },
            userRecived: {
                _id: keyExtractor.uid,
                email: keyExtractor.email,
              },
        })
        .then((res) =>{

        })
        .catch((e) => console.log(e));
    }

    useEffect(() => {
        if (user.uid < keyExtractor.uid) {
          setChannel(user.uid + keyExtractor.uid);
        } else {
          setChannel(keyExtractor.uid + user.uid);
        }
        const messagesListener = database()
          .ref(`chat/${channel}`)
          .orderByChild('createdAt')
          .limitToLast(20)
          .on('child_added', (snapshot) => {
              //console.log('********AGREGANDO************');
              setMessages((prevState) => [...prevState, snapshot.val()]);
          });
      return () => database().ref(`chat/${channel}`).off('child_added', messagesListener);
    }, [channel]);


    return(
        <View>
            <Text>Lo que se tiene</Text>
            <TouchableOpacity style={{width: "100%", height: 200, backgroundColor: 'red'}} 
            onPress={()=> navigation.navigate('Menu',{showSearch: showPeople})}><Text>sadasdasd</Text></TouchableOpacity>
        </View>
    )

}

export default ChatScreen