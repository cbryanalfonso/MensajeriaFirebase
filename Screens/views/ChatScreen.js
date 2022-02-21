import { firebase } from "@react-native-firebase/database";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Avatar, Bubble, GiftedChat, Send, SystemMessage } from "react-native-gifted-chat";
import { getCurrentUser } from "../Component/helpers";
import theme from '../assets/theme/colors'
import { IconButton } from "react-native-paper";
import { Icon } from "react-native-elements";

const ChatScreen = ({ route, navigation }) => {
    const { keyExtractor } = route.params;
    const showPeople = false
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState();
    const user = getCurrentUser()

    function handleSend(messages) {
        const text = messages[0].text;
        const tiempo = new Date().getTime();
        firebase.database()
            .ref(`chat/${channel}`)
            .push({
                _id: Math.round(Math.random() * 1000000),
                text,
                createdAt: new Date().getTime(),
                status: false,
                user: {
                    _id: user.uid,
                    email: keyExtractor.email,
                },
                userRecived: {
                    _id: keyExtractor.uid,
                    email: keyExtractor.email,
                },
            })
            .then((res) => {

            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        if (user.uid < keyExtractor.uid) {
            setChannel(user.uid + keyExtractor.uid);
        } else {
            setChannel(keyExtractor.uid + user.uid);
        }
        const messagesListener = firebase.database()
            .ref(`chat/${channel}`)
            .orderByChild('createdAt')
            .limitToLast(20)
            .on('child_added', (snapshot) => {
                //console.log('********AGREGANDO************');
                setMessages((prevState) => [...prevState, snapshot.val()]);
            });
        return () => firebase.database().ref(`chat/${channel}`).off('child_added', messagesListener);
    }, [channel]);

    function renderBubble(props) {
        return (
            // Step 3: return the component
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: theme.componentColor,
                    },
                    left: {
                        backgroundColor: theme.white,
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    }

    function renderLoading() {
        //1 Comprobar si existe el canal en caso contrario crearlo

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6646ee" />
            </View>
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon="send-circle" size={48} color={theme.componentColor} />
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon="chevron-double-down" size={36} color={theme.componentColor} />
            </View>
        );
    }
    function renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    }

    const renderAvatar = (props) => (
        <Avatar
            {...props}
            imageStyle={{
                left: { borderWidth: 3, borderColor: 'blue' },
                right: {},
            }}
        />
    );

    function mapUser(user) {
        return {
            _id: user.uid,
            name: user.email,
        };
    }
    return (
        <>
            <View style={{flexDirection: "row", alignItems: "center", }}>
                <TouchableOpacity style={styles.btnBack}
                    onPress={()=> navigation.goBack()}
                >
                    <Icon
                        type="material-community"
                        name="keyboard-backspace"
                        size={30}
                        color="#2c3e50"
                    />
                </TouchableOpacity>
                <Text style={[styles.txtTituloApp, {paddingLeft: 30}]}>Mensajeria</Text>
            </View>
            <GiftedChat
                messages={messages}
                inverted={false}
                onSend={handleSend}
                user={mapUser(user)}
                placeholder="   Escribir mensaje..."
                //sty
                showUserAvatar
                //renderAvatar={renderAvatar}
                alwaysShowSend
                scrollToBottom
                renderBubble={renderBubble}
                renderLoading={renderLoading}
                renderSend={renderSend}
                scrollToBottomComponent={scrollToBottomComponent}
                renderSystemMessage={renderSystemMessage}
            />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    systemMessageWrapper: {
        backgroundColor: '#6646ee',
        borderRadius: 4,
        padding: 5,
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    tick: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: '#fff',
    },
    tickView: {
        flexDirection: 'row',
        marginRight: 10,
    },
    txtTituloApp: { 
        color: 'green', 
        fontWeight: "bold", 
        fontSize: 30 
    },
    btnBack:{ 
        backgroundColor: "#ecf0f1", 
        margin: 20, 
        width: 40, 
        height: 40, 
        borderRadius: 50/2 , 
        justifyContent: "center", 
        alignItems: "center"
    },
});


export default ChatScreen;