import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import api from '../../services/api';

export default function SignUpContinue({ navigation }) {
    const [Membro0, setMembro0] = useState('');
    const [Membro1, setMembro1] = useState('');
    const [Membro2, setMembro2] = useState('');
    const [Membro3, setMembro3] = useState('');
    useEffect(() => {
        //Checking if there is a logged account in asyncstorage
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ChooseProfile' }],
                });
            }
        })
    }, []);
    async function handleSubmit() {
        //Posting AccountInfo in database
        const AccountInfo = await AsyncStorage.getItem("AccountInfo");
        const response = await api.post('/account', {
            "user": JSON.parse(AccountInfo).username,
            "email": JSON.parse(AccountInfo).email,
            "password": JSON.parse(AccountInfo).password,
            "member0": Membro0.trim(),
            "member1": Membro1.trim(),
            "member2": Membro2.trim(),
            "member3": Membro3.trim()
        })
        const { _id } = response.data;
        //Setting id, FamilyName in storage
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('FamilyLastName', JSON.parse(AccountInfo).username);
        await AsyncStorage.removeItem("AccountInfo");

        //Creating Activites for the account
        const responseActivites = await api.post('/activites', {}, {
            headers: { _id },
        })

        //Sending to ChooseProfile page
        navigation.reset({
            index: 0,
            routes: [{ name: 'ChooseProfile' }],
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleLogo}>Hora do <Text style={styles.OrangeTitle}>Serviço!</Text></Text>
            <Text style={styles.titleInput}>Membro 1</Text>
            <TextInput
                style={[styles.input, styles.yellowInput]}
                placeholder="Nome de um membro da família"
                placeholderTextColor="#121515"
                autoCapitalize="none"
                onChangeText={text => setMembro0(text)}
            />
            <Text style={styles.titleInput}>Membro 2</Text>
            <TextInput
                style={[styles.input, styles.greenInput]}
                placeholder="Nome de um membro da família"
                placeholderTextColor="#121515"
                autoCapitalize="none"
                onChangeText={text => setMembro1(text)}
            />
            <Text style={styles.titleInput}>Membro 3</Text>
            <TextInput
                style={[styles.input, styles.redInput]}
                placeholder="Nome de um membro da família"
                placeholderTextColor="#121515"
                autoCapitalize="none"
                onChangeText={text => setMembro2(text)}
            />
            <Text style={styles.titleInput}>Membro 4</Text>
            <TextInput
                style={[styles.input, styles.blueInput]}
                placeholder="Nome de um membro da família"
                placeholderTextColor="#121515"
                autoCapitalize="none"
                onChangeText={text => setMembro3(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121515',
    },
    titleLogo: {
        color: 'white',
        fontSize: 38,
        marginBottom: 30,
        fontFamily: 'Dosis-Bold'
    },
    OrangeTitle: {
        color: '#F2A54A'
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#217EA5',
        color: '#F2F2F2',
        height: 40,
        width: '80%',
        borderRadius: 20,
        marginBottom: 0,
        fontFamily: 'Roboto-Regular'
    },
    yellowInput: {
        backgroundColor: '#F2A54A',
    },
    greenInput: {
        backgroundColor: '#146354',
    },
    redInput: {
        backgroundColor: '#B7351C',
    },
    blueInput: {
        backgroundColor: '#1D3EB4',
    },
    titleInput: {
        color: 'white',
        margin: 2,
        fontFamily: 'Dosis-Regular',
        fontSize: 20,
    },
    button: {
        height: 60,
        backgroundColor: '#217EA5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 30,
        width: '80%',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Dosis-Bold'
    }
})