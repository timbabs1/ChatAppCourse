import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Alert } from "react-native";
import CustomTextField from '../components/CustomTextField';
import Button from "../components/Button";
import Strings from "../Constants/Strings";
import Utility from "../utils/Utility";
import firebase, {firestore} from "../firebase/Firebase";

const AddGroupScreen = ({navigation}) => {
    const [groupName, setGroupName] = useState('')
    const [fieldError, setFieldError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateField = () => {
        const isValidField = Utility.isValidField(groupName);
        isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty);
        return isValidField;
    }
    const createGroupToFireBase = () => {
        setIsLoading(true)
        const groupsRef = firestore.collection("groups").doc()
        const userID = firebase.auth().currentUser.uid;

        groupsRef.set({
            groupID: groupsRef.id,
            groupName: groupName,
            userID: userID
        }).then((docRef) => {
            console.log("Document written with ID: ", groupsRef.id);
            setIsLoading(false);
            addMembersOfChatToFirebase(groupsRef.id, userID);
            // navigation.navigate('GroupList');
        }).catch((error) => {
            setIsLoading(false);
            console.error("Error adding document: ", error);
        })
    }

    useEffect(() => {
        console.log('groupName', groupName);
    }, [groupName])

    const performCreateGroup = () => {
        const isValidField = validateField();
        if (isValidField) {
            createGroupToFireBase();
        }
    }

    const addMembersOfChatToFirebase = (groupId, userID) => {
        const membersRef = firestore.collection("members").doc(groupId).collection("member").doc()
        membersRef.set({
            userID: userID
        }).then((docRef) => {
            navigation.goBack()
        }).catch((error) => {
            setIsLoading(false);
            console.error("Error adding document: ", error);
        })
    }

    return (
        <View style={styles.container}>
            <CustomTextField
                placeholder={Strings.EnterYourGroupName}
                term={groupName}
                onTermChange={newGroupName => setGroupName(newGroupName)}
                onValidateTextField = {validateField}
                error={fieldError}
            />
            <Button title={Strings.CreateGroup} onPress={performCreateGroup} isLoading={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddGroupScreen;
