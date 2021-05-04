import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import api from '../../services/api';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [widgetError, setWidgetError] = useState(false);
    useEffect(() => {
        //Checking if there is an creating account process
        AsyncStorage.getItem('AccountInfo').then(AccountInfo => {
            if (AccountInfo) {
                navigation.navigate('SignUpContinue');
            }
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            //Checking if there is a logged account in asyncstorage
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ChooseProfile' }],
                });
            }
        })
    }, [])
    async function handleSubmit() {
        //sending the email and password to backend
        const response = await api.post('/isLogged', {
            email: email.trim(),
            password: password,
        });
        const id = response.data.id;
        const FamilyName = response.data.FamilyName;
        //if the backend returns true, login. else show error message
        if (response.data.isLogin == true) {
            await AsyncStorage.setItem('user', id);
            await AsyncStorage.setItem('FamilyLastName', FamilyName)
            navigation.reset({
                index: 0,
                routes: [{ name: 'ChooseProfile' }],
            });
        } else {
            setWidgetError(true);
        }
    }
    //navigating to register screen
    function handleRegister() {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleLogo}>Hora do <Text style={styles.OrangeTitle}>Serviço!</Text></Text>
            <Text style={styles.titleInput}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Exemplo: teste@hotmail.com"
                placeholderTextColor="#121515"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
            />

            <Text style={styles.titleInput}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#121515"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.Register}>Não tem uma conta ainda? <Text style={styles.Register, { textDecorationLine: 'underline' }}>Registre-se!</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
            <View style={widgetError ? styles.widgetErrorBox : styles.invisibleWidgetError}>
                <Text style={widgetError ? styles.widgetErrorText : styles.invisibleWidgetError}>{widgetError ? `Você digitou algum dado errado! ` : ``}</Text>
                <Text style={widgetError ? styles.widgetErrorTextClickable : styles.invisibleWidgetError} onPress={handleRegister}>{widgetError ? `Deseja criar uma conta?` : ``}</Text>
            </View>
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
        color: '#444',
        height: 40,
        width: '80%',
        borderRadius: 20,
        marginBottom: 0,
        color: 'white'
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
        fontSize: 20,
        color: 'white',
        margin: 2,
        fontFamily: 'Dosis-SemiBold',
        marginLeft: 60,
        alignSelf: 'flex-start'
    },
    button: {
        height: 60,
        backgroundColor: '#217EA5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 20,
        width: '80%',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    Register: {
        marginTop: 10,
        color: 'white',
        textAlign: 'right',
    },
    widgetErrorBox: {
        display: 'flex',
        marginTop: 20,
        width: '80%',
        height: 60,
        backgroundColor: '#b94a48',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 0,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    widgetErrorText: {
        color: 'white',
    },
    widgetErrorTextClickable: {
        color: 'white',
        textDecorationLine: 'underline',
    },
    invisibleWidgetError: {
        display: 'none',
    }
})