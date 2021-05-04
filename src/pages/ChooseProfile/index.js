import React, { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import { Text, View, KeyboardAvoidingView, StyleSheet, ScrollView, AsyncStorage, Image, Button, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { vh, vw } from 'react-native-expo-viewport-units';
export default function ChooseProfile({ navigation, route, Navigator }) {
  useEffect(() => {
     //Checking if there is a member name in asyncstorage
    AsyncStorage.getItem('Member').then(Member => {
      if (Member) {
        navigation.navigate('Home');
      }
    })
  }, []);
  let index = -1;
  const [profileList, setProfileList] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [familyName, setFamilyName] = useState('name');
  useEffect(() => {
    //loading members when the route params change (if someone change the profile pic, will reload and change)
    loadMembers();
  }, [route.params]);
  async function loadMembers() {
    //getting the members in db
    const user_id = await AsyncStorage.getItem('user');
    setFamilyName(await AsyncStorage.getItem('FamilyLastName'));
    const response = await api.get('/account', {
      headers: { user_id },
    })
    //saving the profile list and profile image position
    setProfileList(Object.values(response.data.infoJSON.members));
    setProfileImage(Object.values(response.data.infoJSON.profileImages));
  }
  async function OnChoose() {
    //saving the member in AsyncStorage and pushing to homescreen
    await AsyncStorage.setItem("Member", "member" + this.className);
    navigation.push('Home');
  }
  async function UpdateProfileInfo() {
    //saving the member in AsyncStorage and pushing to UpdateProfile page
    await AsyncStorage.setItem("Member", "member" + this.className);
    navigation.push('UpdateProfile');
  }
  function ProfileList() {
    index++;
    //all the profile pictures paths
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
    //Return of the map function
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }} className={index}>
        <View className={index} style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={OnChoose} className={index} >
            <Image style={styles.image} source={Images[profileImage[index]]} />
          </TouchableOpacity>
          <Ionicons className={index} onPress={UpdateProfileInfo} style={{ position: 'absolute', top: 20, right: 0, zIndex: 999 }} name="ellipsis-vertical-sharp" color={"black"} size={40} />
        </View>
        <Text onPress={OnChoose} className={index} style={styles.usernameText}>{profileList[index][0].toUpperCase() + profileList[index].substr(1)}</Text>
      </View>
    )
  }
  return (
    <ScrollView style={{ backgroundColor: '#121515' }}>

      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.titleLogo}>Hora do <Text style={styles.OrangeTitle}>Serviço!</Text></Text>
        <Text style={styles.title}>Quem é você da família {familyName[0].toUpperCase() + familyName.substr(1)}?</Text>


        {profileList.map((member, index) => <ProfileList key={index} member={member} />)}


      </KeyboardAvoidingView>
    </ScrollView>
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
    marginTop: 30,
    fontFamily: 'Dosis-Bold'
  },
  OrangeTitle: {
    color: '#F2A54A'
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 30,
    fontFamily: 'Dosis-Bold',
    maxWidth: vw(80),
    textAlign: 'center'
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  usernameText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  }
})