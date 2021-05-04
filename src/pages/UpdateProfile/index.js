import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { View, Text, Image, ScrollView, StyleSheet, AsyncStorage, Alert, Animated, Easing, Button } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { vh, vw } from 'react-native-expo-viewport-units';
import { Ionicons } from '@expo/vector-icons';
export default function UpdateProfile({ navigation }) {
    //Local images paths
    const Images = [
        require(`../../assets/profiles_images/png/peep-1.png`),
        require(`../../assets/profiles_images/png/peep-2.png`),
        require(`../../assets/profiles_images/png/peep-3.png`),
        require(`../../assets/profiles_images/png/peep-4.png`),
        require(`../../assets/profiles_images/png/peep-5.png`),
        require(`../../assets/profiles_images/png/peep-6.png`),
        require(`../../assets/profiles_images/png/peep-7.png`),
        require(`../../assets/profiles_images/png/peep-8.png`),
        require(`../../assets/profiles_images/png/peep-9.png`),
        require(`../../assets/profiles_images/png/peep-10.png`),
        require(`../../assets/profiles_images/png/peep-11.png`),
        require(`../../assets/profiles_images/png/peep-12.png`),
        require(`../../assets/profiles_images/png/peep-13.png`),
        require(`../../assets/profiles_images/png/peep-14.png`),
        require(`../../assets/profiles_images/png/peep-15.png`),
        require(`../../assets/profiles_images/png/peep-16.png`),
        require(`../../assets/profiles_images/png/peep-17.png`),
        require(`../../assets/profiles_images/png/peep-18.png`),
        require(`../../assets/profiles_images/png/peep-19.png`),
        require(`../../assets/profiles_images/png/peep-20.png`),
        require(`../../assets/profiles_images/png/peep-21.png`),
        require(`../../assets/profiles_images/png/peep-22.png`),
        require(`../../assets/profiles_images/png/peep-23.png`),
        require(`../../assets/profiles_images/png/peep-24.png`),
        require(`../../assets/profiles_images/png/peep-25.png`),
        require(`../../assets/profiles_images/png/peep-26.png`),
        require(`../../assets/profiles_images/png/peep-27.png`),
        require(`../../assets/profiles_images/png/peep-28.png`),
        require(`../../assets/profiles_images/png/peep-29.png`),
        require(`../../assets/profiles_images/png/peep-30.png`),
        require(`../../assets/profiles_images/png/peep-32.png`),
        require(`../../assets/profiles_images/png/peep-33.png`),
        require(`../../assets/profiles_images/png/peep-34.png`),
        require(`../../assets/profiles_images/png/peep-35.png`),
        require(`../../assets/profiles_images/png/peep-36.png`),
        require(`../../assets/profiles_images/png/peep-37.png`),
        require(`../../assets/profiles_images/png/peep-38.png`),
        require(`../../assets/profiles_images/png/peep-39.png`),
        require(`../../assets/profiles_images/png/peep-40.png`),
        require(`../../assets/profiles_images/png/peep-41.png`),
        require(`../../assets/profiles_images/png/peep-42.png`),
        require(`../../assets/profiles_images/png/peep-43.png`),
        require(`../../assets/profiles_images/png/peep-44.png`),
        require(`../../assets/profiles_images/png/peep-45.png`),
        require(`../../assets/profiles_images/png/peep-46.png`),
        require(`../../assets/profiles_images/png/peep-47.png`),
        require(`../../assets/profiles_images/png/peep-48.png`),
        require(`../../assets/profiles_images/png/peep-49.png`),
        require(`../../assets/profiles_images/png/peep-50.png`),
        require(`../../assets/profiles_images/png/peep-51.png`),
        require(`../../assets/profiles_images/png/peep-52.png`),
        require(`../../assets/profiles_images/png/peep-53.png`),
        require(`../../assets/profiles_images/png/peep-54.png`),
        require(`../../assets/profiles_images/png/peep-55.png`),
        require(`../../assets/profiles_images/png/peep-56.png`),
        require(`../../assets/profiles_images/png/peep-57.png`),
        require(`../../assets/profiles_images/png/peep-58.png`),
        require(`../../assets/profiles_images/png/peep-59.png`),
        require(`../../assets/profiles_images/png/peep-60.png`),
        require(`../../assets/profiles_images/png/peep-61.png`),
        require(`../../assets/profiles_images/png/peep-62.png`),
        require(`../../assets/profiles_images/png/peep-63.png`),
        require(`../../assets/profiles_images/png/peep-64.png`),
        require(`../../assets/profiles_images/png/peep-65.png`),
        require(`../../assets/profiles_images/png/peep-66.png`),
        require(`../../assets/profiles_images/png/peep-67.png`),
        require(`../../assets/profiles_images/png/peep-68.png`),
        require(`../../assets/profiles_images/png/peep-69.png`),
        require(`../../assets/profiles_images/png/peep-70.png`),
        require(`../../assets/profiles_images/png/peep-71.png`),
        require(`../../assets/profiles_images/png/peep-72.png`),
        require(`../../assets/profiles_images/png/peep-73.png`),
        require(`../../assets/profiles_images/png/peep-74.png`),
        require(`../../assets/profiles_images/png/peep-75.png`),
        require(`../../assets/profiles_images/png/peep-76.png`),
        require(`../../assets/profiles_images/png/peep-77.png`),
        require(`../../assets/profiles_images/png/peep-78.png`),
        require(`../../assets/profiles_images/png/peep-79.png`),
        require(`../../assets/profiles_images/png/peep-80.png`),
        require(`../../assets/profiles_images/png/peep-81.png`),
        require(`../../assets/profiles_images/png/peep-82.png`),
        require(`../../assets/profiles_images/png/peep-83.png`),
        require(`../../assets/profiles_images/png/peep-84.png`),
        require(`../../assets/profiles_images/png/peep-85.png`),
        require(`../../assets/profiles_images/png/peep-86.png`),
        require(`../../assets/profiles_images/png/peep-87.png`),
        require(`../../assets/profiles_images/png/peep-88.png`),
        require(`../../assets/profiles_images/png/peep-89.png`),
        require(`../../assets/profiles_images/png/peep-90.png`),
        require(`../../assets/profiles_images/png/peep-91.png`),
        require(`../../assets/profiles_images/png/peep-92.png`),
        require(`../../assets/profiles_images/png/peep-93.png`),
        require(`../../assets/profiles_images/png/peep-94.png`),
        require(`../../assets/profiles_images/png/peep-95.png`),
        require(`../../assets/profiles_images/png/peep-96.png`),
        require(`../../assets/profiles_images/png/peep-97.png`),
        require(`../../assets/profiles_images/png/peep-98.png`),
        require(`../../assets/profiles_images/png/peep-99.png`),
        require(`../../assets/profiles_images/png/peep-100.png`),
    ]
    const ImagesNumber = Math.round((12 * vh(100)) / 692);
    const HorizontalImagesNumber = Math.round((3 * vw(100)) / 360);
    const [ArrayInitialImages, setArrayInitialImages] = useState(Images.slice(0, ImagesNumber))
    const [ActualImage, setActualImage] = useState();
    const [ActualName, setActualName] = useState();
    const [SelectedImage, setSelectedImage] = useState();
    const [username, setUsername] = useState();
    useEffect(() => {
        //Loading members from db
        loadMembers();
    }, []);
    useEffect(() => {
        //Updating Header Navigation when image load
        NavigationOptions();
    }, [ActualImage]);
    function NavigationOptions() {
        //function to change the headertitle
        navigation.setOptions({ headerTitle: () => <Header /> });
    }
    function Header() {
        //HeaderTitle config
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View></View>
                <Text style={{ color: 'white', marginRight: 15, fontFamily: 'Dosis-Bold', fontSize: 25 }}>{ActualName}</Text>
                <View style={{ backgroundColor: '#FF7338', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: vw(13), height: vh(7), marginRight: 5 }}>
                    <Image style={{ width: vw(8), height: vh(8) }} source={Images[ActualImage]} />
                </View>
            </View>
        )
    }
    async function loadMembers() {
        //Loading members from db
        const ActualMember = await AsyncStorage.getItem('Member');

        const user_id = await AsyncStorage.getItem('user');
        const response = await api.get('/account', {
            headers: { user_id },
        })
        const ImageValues = Object.values(response.data.infoJSON.profileImages);
        const NameValue = Object.values(response.data.infoJSON.members);

        await setActualName(NameValue[ActualMember.split("member")[1]]);
        await setActualImage(ImageValues[ActualMember.split("member")[1]]);


    }
    async function ImageChoosed(index) {
        //Selecting an image and changing the state to actual image
        await setSelectedImage(index);
    }
    function ChooseImages(props) {
        //Image widget config
        return (
            <TouchableOpacity onPress={() => ImageChoosed(props.index)} style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'white', borderRadius: 10, marginVertical: 5, marginHorizontal: 5, width: vw(30), height: vh(15) }}>
                {SelectedImage === props.index ? <Ionicons name="checkmark-circle" size={32} color={"green"} style={{ position: 'absolute', right: 0, top: 0, zIndex: 999 }} /> : <View style={{ display: 'none' }} />}
                <Image source={Images[props.index]} style={{ width: vw(30), height: vh(15) }} />
            </TouchableOpacity>
        )
    }
    function LoadingMore() {
        //Loading more images function
        const newArray = ArrayInitialImages.concat(Images.slice(ArrayInitialImages.length, ArrayInitialImages.length + 3));
        setArrayInitialImages(newArray);
    }
    async function UpdateProfileSubmit() {
        //When submit, updating the actual image and navigating to ChooseProfile page
        const _id = await AsyncStorage.getItem('user');
        const ActualMember = await AsyncStorage.getItem('Member');
        const header = {
            'Content-Type': 'application/json',
            '_id': _id,
            'todo_user': ActualMember.split("member")[1],
        }
        const response = await api.post('/UpdateProfile', {
            'Username': username === undefined ? ActualName : username.trim(),
            'profile_image_user': SelectedImage === undefined ? ActualImage : SelectedImage
        }, {
            headers: header
        });
        await AsyncStorage.removeItem('Member');

        navigation.navigate('ChooseProfile', { UpdatePage: true });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>Qual o seu novo nome?</Text>
            <TextInput
                onChangeText={text => setUsername(text)}
                style={styles.input}
                placeholder="SEU NOVO NOME"
            />
            <Text style={styles.titleInput}>Escolha sua imagem de perfil</Text>
            <FlatList
                numColumns={HorizontalImagesNumber}
                data={ArrayInitialImages}
                renderItem={ChooseImages}
                onEndReached={LoadingMore}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => index} />
            <TouchableOpacity onPress={UpdateProfileSubmit} style={{ marginTop: 5, marginBottom: 10, width: vw(30), height: vh(5), borderRadius: 20, backgroundColor: '#FF7338', justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: 'white', fontFamily: 'Dosis-Bold' }}>ATUALIZAR</Text>
            </TouchableOpacity>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#121515',
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#FF7338',
        color: 'white',
        height: 40,
        width: '80%',
        borderRadius: 20,
        marginBottom: 0,
        fontFamily: 'Roboto-Regular',
        borderColor: '#FF7338'
    },
    titleInput: {
        color: 'white',
        margin: 2,
        fontSize: 28,
        fontFamily: 'Dosis-SemiBold'
    },
})