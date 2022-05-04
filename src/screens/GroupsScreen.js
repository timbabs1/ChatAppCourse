import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import ButtonWithBackground from "../components/ButtonWithBackground";
import Images from "../Constants/Images";
import GroupItem from "../components/GroupsItems";
import firebase, { firestore } from "../firebase/Firebase";

const GroupScreen = ({ navigation }) => {
    const [groups, setGroups] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonWithBackground
                    onPress={() => navigation.navigate('AddGroupScreen')}
                    image={Images.add}
                />
            ),
            headerLeft: () => (

                    <ButtonWithBackground onPress={() => {
                    }}
                        image={Images.logout}
                   />
            )
        });
    }, [navigation]);

    useEffect(() => {
        getChats()
    }, []);

    const getChats = () => {
        const db = firestore
        let groupArray = [];

        db.collection("groups")
            .onSnapshot((snapShot) => {
                snapShot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New Group: ", change.doc.data());
                        groupArray.push(change.doc.data());
                    }
                    if (change.type === "modified") {
                        console.log("Modified Group: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed Group: ", change.doc.data());
                    }
                    setGroups(groupArray);
                })
            })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={groups}
                renderItem={({ item}) => {
                    return (
                        // <Text>Hi there</Text>
                        <TouchableOpacity onPress={() =>{
                            navigation.navigate('ChatScreen')
                        }}>
                            <GroupItem item={item}></GroupItem>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => 'key' + index}

            >

            </FlatList>
            <Text>Group Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#101010',
        fontWeight: 'bold',
    },
});

export default GroupScreen;
