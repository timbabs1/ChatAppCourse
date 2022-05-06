import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert, Button } from "react-native";
import firebase, {firestore} from '../firebase/Firebase';
import MessageFieldView from "../components/MessageFieldView";
import Color from "../utils/Colors";
import Constants from "../Constants/Constants";
import Strings from "../Constants/Strings";
import DismissKeyboard from "../components/DismissKeyboard";
import MessageItem from "../components/MessageItem";

const ChatScreen = ({ route, navigation }) => {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const [isJoined, setIsJoined] = useState(false);

    const { item } = route.params;
    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {
        console.log(item)
        getUserJoinedAlreadyOrNot();
        getMessages();
    }, []);

    const getMessages = () => {
        const db = firestore
        // db.settings({ merge: true });
        let messages = [];

        db.collection("message").doc(item.groupID).collection("messages")
            .onSnapshot((snapShot) => {
                snapShot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New Message: ", change.doc.data());
                        messages.push(change.doc.data());
                    }
                    if (change.type === "modified") {
                        console.log("Modified Message: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed Message: ", change.doc.data());
                    }

                    setMessageList(messages);
                });
            })
    }

    const getUserJoinedAlreadyOrNot = () => {
        firestore.collection("members").doc(item.groupID).collection("member").where("userID", "==", userID)
            .get().then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    if (doc.data() != null) {
                        setIsJoined(true);
                    } else {
                        setIsJoined(false);
                        showAlertToJoinGroup();
                    }
                })
                } else {
                    showAlertToJoinGroup();
                }
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        })
    }

    const showAlertToJoinGroup = () => {
        Alert.alert(
            Strings.JoinChatText,
            Strings.JoinChatConfirmMessage,
            [{
                text: 'Yes', onPress: () => {
                    joinGroup();
                }
            }, {
                text: 'No', onPress: () => {

                }
            }
            ],
            { cancelable: false }
        )
    }

    function joinGroup() {
        const groupMemberRef = firestore.collection("members").doc(item.groupID).collection("member").doc(userID);
        groupMemberRef.set({
            userID: userID,
        }).then(() => {
            setIsJoined(true);
            Alert.alert(Strings.JoinMessage);
            setMessage('');
        }).catch((error) => {
            setIsJoined(false);
            Alert.alert(Strings.JoinGroupError);
            console.log(error)
        });
    }

    const sendMessagesToChat = () => {
        const messageRef = firestore.collection("message").doc(item.groupID).collection("messages").doc()
        const userEmail = firebase.auth().currentUser.email;

        messageRef.set({
            messageID: messageRef.id,
            message: message,
            senderId: userID,
            senderEmail: userEmail,
        }).then((docRef) => {
            console.log("Document written with ID: ", messageRef.id);
            setMessage('');
        }).catch((error) => {
            Alert.alert("Error", error.message);
            console.log(error)
        });
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
                                  behavior="padding" enabled keyboardVerticalOffset={100}
            >
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatList}
                        data={messageList}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                }}
                                >
                                    <MessageItem item={item} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <View style={styles.messageFieldView}>
                        <MessageFieldView
                            term={message}
                            placeHolder={Strings.typeYourMessage}
                            onTermChange={message => setMessage(message)}
                            onSubmit={sendMessagesToChat}
                            //onSubmit={sendMessagesToChat}
                        >

                        </MessageFieldView>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        marginBottom: 10,
        flex: 0.9,

    },
    messageFieldView: {
        flex: 0.1,
    },
    text: {
        fontSize: 24,
        color: '#101010',
        fontWeight: 'bold',
    },
});

export default ChatScreen;
