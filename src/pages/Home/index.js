import React, { useEffect, useState, useRef } from 'react';
import { Text, View, AsyncStorage, TouchableOpacity, StyleSheet, Button, Image, SafeAreaView, ScrollView, Animated, Easing } from 'react-native';
import api from '../../services/api';
import Logo from '../../assets/Logo.svg';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import AddActivites from '../AddActivites/index';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
//import { Permissions, Notifications } from 'expo';
export default function Home({ navigation }) {
  const [memberName, setMemberName] = useState('');
  const [todos, setTodos] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ActualImage, setActualImage] = useState();
  const [isTimeWidget, setIsTimeWidget] = useState(true);
  let leftMinutes;
  let leftDays;
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = Math.round(((((date.getTime() / 1000) / 60) / 60) / 24));
  let memberPosition;
  const modalizeRef = useRef(null);
  const modalizeRefImage = useRef(null);
  let token;
  //Images paths
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
  useEffect(() => {
    registerForPushNotification();
  }, [])
  async function registerForPushNotification() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;

    // Check for existing permissions
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;
    //If no existing permission, ask user for permission
    if (status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    //If no permission, exit the function
    if (finalStatus != 'granted') {
      alert('Fail to get the push token')
      return;
    }

    //Get push notification token
    token = (await Notifications.getExpoPushTokenAsync()).data;


    //Add token to database
    const _id = await AsyncStorage.getItem('user');
    const member = memberPosition;
    const response = await api.post('/UpdateNotificationToken', {
      member,
      "NotificationToken": token
    }, {
      headers: { _id },
    })
    return token;
  }

  useEffect(() => {
    //Loading database info
    MemberName();
    loadTodos();
  }, []);
  useEffect(() => {
    //Changing the header when image is loaded
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
        <Logo style={{ alignSelf: 'center', justifyContent: 'center', marginRight: 20 }} />
        <TouchableOpacity onPress={onClickImage} style={{ backgroundColor: '#FF7338', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: vw(13), height: vh(7), marginRight: 5 }}>
          <Image style={{ width: vw(8), height: vh(8), marginTop: 10 }} source={Images[ActualImage]} />
        </TouchableOpacity>
      </View>
    )
  }

  //Using modalize lib
  const onClickImage = () => {
    modalizeRefImage.current?.open();
  }
  const onCloseImage = () => {
    modalizeRefImage.current?.close();
  }
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };


  async function MemberName() {
    //Getting the membername from db
    memberPosition = await AsyncStorage.getItem('Member');
    const user_id = await AsyncStorage.getItem('user');
    const response = await api.get('/account', {
      headers: { user_id },
    })
    const ImageValues = Object.values(response.data.infoJSON.profileImages);
    //Setting the membername and actualimage(number) in states
    setMemberName(response.data.infoJSON.members[memberPosition]);
    setActualImage(ImageValues[memberPosition.split("member")[1]]);
  }
  async function LogOutAll() {
    //LogOut function
    await AsyncStorage.removeItem('Member');
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  async function loadTodos() {
    //Loading todos from db
    const user_id = await AsyncStorage.getItem('user');
    const todoUser = "todo_user_" + memberPosition.split("member")[1];
    const response = await api.post('/dashboard', {
      "todo_user": todoUser
    }, {
      headers: { user_id },
    })
    //Setting todos state
    setTodos(response.data.infoTodo);
    if (response.data.infoTodo.length >= 4) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    //awaiting load everything and show the home
    setTimeout(function () { setIsLoaded(true); }, 1000);
  }
  function Time(index) {
    if (date.getTime() > todos[index.props].Seconds) {
      //If activity has already passed, delete
      DeleteActivite(index.props);
    }
    //transforming activity time and actual time to minutes and subtracting
    leftMinutes = Math.round((Number((todos[index.props].Hour.split(":")[0] * 60))) + Number((todos[index.props].Hour.split(":")[1])) - ((hours * 60) + (minutes)));
    //transforming milliseconds to day, rounding and subtracting
    leftDays = ((Math.round(((((todos[index.props].Seconds / 1000) / 60) / 60) / 24)) - day));
  }
  function WidgetTodo(index) {
    if (index.props > 3) {
      //only rendering 4 widgets
      return <View></View>
    } else {
      //Rendering the first 4 widgets
      if(todos[index.props].Date == undefined){
      }else{
        Time(index);
      }
      const Name = todos[index.props].Name;
      return (
        <ScaleInView>
          <View style={{ overflow: 'hidden', backgroundColor: '#B7351C', width: vw(42), height: vh(20), margin: 7, borderRadius: 16, marginBottom: 10, justifyContent: 'space-between' }}>
            <View style={todos[index.props].Date == undefined ? '' : { borderRadius: 100, width: vw(25), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', margin: 5 }}>
              <Text
                style={todos[index.props].Date == undefined ? {display: 'none'} : { fontFamily: 'Dosis-Regular', fontSize: vw(3), margin: 3 }}
              >
                Falta(m)
                {leftDays > 0 ? ` ${leftDays} dia(s), ` : ''}
                {leftMinutes > 0 && leftMinutes < 60 ? ` ${leftMinutes} minuto(s), ` : ''}
                {leftMinutes > 0 && leftMinutes > 60 ? ` ${Math.round(leftMinutes / 60)} hora(s). ` : ''}
              </Text>
            </View>
            <Image style={{ position: 'absolute', left: -40, bottom: -50, width: vw(30), height: vh(30), zIndex: -999 }} source={Images[ActualImage]} />
            <Text style={todos[index.props].Date == undefined ? { fontSize: 20, width: vw(28), color: 'white', fontFamily: 'Dosis-Bold', alignSelf: 'flex-end', marginRight: 10, textAlign: 'center' } : { fontSize: 14, color: 'white', fontFamily: 'Dosis-Bold', alignSelf: 'flex-end', marginRight: 10, maxWidth: 70, textAlign: 'center' }}>{`Tarefa: ${Name}`}</Text>
            <TouchableOpacity onPress={() => DeleteActivite(index.props)}
              style={{ alignSelf: 'flex-end', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 100, width: vw(22), padding: 3, marginBottom: 10, marginRight: 2 }}>
              <Text style={{ color: 'black', fontFamily: 'Dosis-Medium' }}>CONCLUIR</Text>
            </TouchableOpacity>
          </View>
        </ScaleInView>
      )
    }
  }
  async function DeleteActivite(index) {
    //Getting the member, the todo and deleting
    memberPosition = await AsyncStorage.getItem('Member');
    const _id = await AsyncStorage.getItem('user');
    const TodoUser = "todo_user_" + memberPosition.split("member")[1];
    const header = {
      'Content-Type': 'application/json',
      '_id': _id,
    }
    const response = await api.post('/FamilyInfoDestroy', {
      data: {
        TodoUser: TodoUser,
        TodoListPosition: index
      }
    }, {
      headers: header
    });
    let newTodosArray = todos.filter(function (event) {
      return event != todos[index];
    })
    //Updating the todos without the deleted
    setTodos(newTodosArray);
  }

  //Animating scale
  const ScaleInView = (props) => {
    const scaleAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    if (isLoaded == true) {
      useEffect(() => {
        Animated.spring(
          scaleAnim,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear
          },
        ).start();
      }, [])
    }


    return (
      <Animated.View                 // Special animatable View
        style={[
          styles.square,
          {
            transform: [
              {
                scale: scaleAnim
              }
            ]
          }
        ]}
      >
        {props.children}
      </Animated.View>
    );
  }

  function Todos() {
    return (
      <View style={{ width: vw(92), flexWrap: 'wrap', flexDirection: 'row', marginBottom: 0 }}>


        {todos.map((widget, index) => <WidgetTodo key={index} props={index} />)}



      </View>
    )
  }
  //Fade animation
  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
      Animated.loop(
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }
        )).start();
    }, [fadeAnim])

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

  //Waiting load to show
  if (isLoaded == false) {
    //Loading screen
    return (
      <View style={{ flex: 1, backgroundColor: '#121515', alignItems: 'center', justifyContent: 'center' }}>
        <FadeInView>
          <Text style={{ color: 'white', fontSize: 45, fontFamily: 'Dosis-Bold', marginBottom: vh(8) }}>Carregando<Text style={{ color: '#F2A54A' }}>...</Text></Text>
        </FadeInView>
      </View>
    )
  } else {
    //Homescreen
    return (

      <ScrollView style={{ backgroundColor: '#121515' }}>


        <View style={styles.container}>
          <Portal>
            <Modalize ref={modalizeRefImage} adjustToContentHeight={true} modalStyle={{ backgroundColor: '#217EA5' }}>
              <Text style={{ fontFamily: 'Dosis-Bold', fontSize: 50, alignSelf: 'center', color: 'white', margin: 10 }}>Configurações</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => { onCloseImage(); navigation.navigate('UpdateProfile'); }} style={{
                  backgroundColor: '#FF7338',
                  borderRadius: 100,
                  height: vh(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'black',
                  borderWidth: 0.1,
                  marginBottom: 20
                }}>
                  <Text style={{ fontFamily: 'Dosis-Regular', fontSize: 20, color: 'white', margin: 20 }}>Configurar perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LogOutAll} style={{
                  backgroundColor: '#FF7338',
                  borderRadius: 100,
                  height: vh(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'black',
                  borderWidth: 0.1,
                  marginBottom: 20
                }}>
                  <Text style={{ fontFamily: 'Dosis-Regular', fontSize: 20, color: 'white', margin: 20 }}>Sair da conta</Text>
                </TouchableOpacity>
              </View>
            </Modalize>
            <Modalize ref={modalizeRef} adjustToContentHeight={true} modalStyle={{ backgroundColor: '#217EA5' }}>

              <AddActivites props={onClose} />

            </Modalize>

          </Portal>
          <ScaleInView>
            <View style={styles.mainWidget}>
              <Image style={styles.img} source={Images[ActualImage]} />
              <View style={styles.divTitle}>
                <Text style={styles.TitleMainWidget}>Olá, {`${memberName[0].toUpperCase() + memberName.substr(1)}`}!</Text>
                <Text style={styles.SubtitleMainWidget}>Adicione atividades para sua casa!</Text>
                <TouchableOpacity onPress={onOpen} style={styles.buttonAddActivites}>
                  <Text style={{ color: 'white', fontFamily: 'Dosis-SemiBold', fontSize: 15 }} >Adicionar atividades</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScaleInView>
          <View style={{ alignSelf: 'flex-start', margin: 20, marginTop: 30, marginBottom: 0 }}>
            <Text style={styles.titleAfazeres}>Lista de afazeres</Text>
            <Todos />

            <TouchableOpacity onPress={() => navigation.navigate('Activites')} style={showMore ? { backgroundColor: '#217EA5', width: vw(30), height: vh(5), borderRadius: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginRight: 15, marginBottom: 10, display: 'flex' } : { display: 'none' }}>
              <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Dosis-SemiBold', display: 'flex' }}>Ver todos</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121515',

  },
  LogOutText: {
    alignSelf: 'flex-start',
    marginLeft: 60,
    marginBottom: 3
  },
  mainWidget: {
    width: vw(85),
    height: vh(25),
    borderRadius: 16,
    backgroundColor: '#217EA5',
    overflow: 'hidden',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxHeight: vh(30)
  },
  TitleMainWidget: {
    maxWidth: vw(60),
    color: 'white',
    fontSize: 22,
    fontFamily: 'Dosis-Bold',
    marginTop: 20,
    minHeight: '19%',
    maxHeight: '100%',
    textAlign: 'center',
  },
  img: {
    alignSelf: 'flex-start',
    maxWidth: vw(35),
    maxHeight: vh(40),
    marginLeft: -vw(5),
    marginTop: -vh(3),
  },
  divTitle: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  SubtitleMainWidget: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Dosis-Medium',
    maxHeight: '30%',
  },
  buttonAddActivites: {
    backgroundColor: '#FF7338',
    borderRadius: 100,
    width: vw(45),
    marginBottom: 5,
    maxWidth: 170,
    maxHeight: '24%',
    paddingHorizontal: '1%',
    paddingVertical: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
    borderWidth: 0.1,
  },
  titleLogo: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    marginRight: 'auto',
    marginLeft: 20,
    marginBottom: 0
  },
  OrangeTitle: {
    color: '#F2A54A'
  },
  titleAfazeres: {
    color: 'white',
    fontSize: 33,
    marginLeft: 10,
    fontFamily: 'UbuntuCondensed-Regular'
  }
})