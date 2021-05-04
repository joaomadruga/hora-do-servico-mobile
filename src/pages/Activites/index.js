import React, { useRef } from 'react';
import api from '../../services/api';
import { View, Text, Image, ScrollView, StyleSheet, AsyncStorage, Alert, Animated, Easing } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { vh, vw } from 'react-native-expo-viewport-units';

export default function Activites() {
  const [memberName, setMemberName] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  let memberPosition;
  let date = new Date().toLocaleDateString();
  let hour = new Date().toLocaleTimeString();

  useEffect(() => {
    //Loading database functions when server starts
    MemberName();
    loadTodos();
  }, []);

  async function MemberName() {
    //Getting the member position
    memberPosition = await AsyncStorage.getItem('Member');
    const user_id = await AsyncStorage.getItem('user');
    const response = await api.get('/account', {
      headers: { user_id },
    })
    setMemberName(response.data.infoJSON.members[memberPosition]);
  }

  async function loadTodos() {
    //Getting the todo list and adding 2 seconds more of loading screen
    const user_id = await AsyncStorage.getItem('user');
    const todoUser = "todo_user_" + memberPosition.split("member")[1];
    const response = await api.post('/dashboard', {
      "todo_user": todoUser
    }, {
      headers: { user_id },
    })
    setTodos(response.data.infoTodo);
    setTimeout(() => setisLoaded(true), 2000);
  }

  function WidgetTodo(index) {
    //Returning one widget todo from .map array function
    let Name;
    let Date;
    let Hour;
    let leftHour;
    if(todos[index.props].Date === undefined){
      Name = todos[index.props].Name;
    }
    if(todos[index.props].Date !== undefined){

      Date = todos[index.props].Date;
      Hour = todos[index.props].Hour;
      Name = todos[index.props].Name;
      leftHour = ((((Hour.split(':')[0] * 60) + (Hour.split(':')[1])) - ((hour.split(':')[0] * 60) + (hour.split(':')[1]))) / 60);
      if (Number(Date.split('/')[0]) == Number(date.split('/')[0]) && Number(Date.split('/')[1]) < Number(date.split('/')[1])) {
        DeleteActivite(index.props)
      }
      if (Number(Date.split('/')[0]) == Number(date.split('/')[0]) && Number(Date.split('/')[1]) == Number(date.split('/')[1])) {
        if (leftHour < 0) {
          DeleteActivite(index.props)
        }
      }
      if (Number(date.split('/')[0]) > Number(Date.split('/')[0])) {
        DeleteActivite(index.props)
      }
    }
    return (
      <ScaleInView>
        <View style={{ backgroundColor: '#B7351C', marginRight: 20, marginLeft: 20, marginTop: 10, marginBottom: 10, borderRadius: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 5 }}>
          <View style={{ padding: 5 }}>
            <Text style={todos[index.props].Date == undefined ? {fontSize: 30,color: 'white',fontFamily: 'Dosis-Bold'} : styles.WidgetText}>{`Atividade: ${Name}`}</Text>
            <Text style={styles.WidgetText}>{todos[index.props].Date == undefined ? 'Não tem data de conclusão' : `Data de conclusão: ${Date.split("/")[1]}/${Date.split("/")[0]}/${Date.split("/")[2]}`}</Text>
            <Text style={todos[index.props].Date == undefined ? {display: 'none'} : styles.WidgetText}>{todos[index.props].Date == undefined ? '' : `Horário para conclusão: ${Hour.split(":")[0]}h e ${Hour.split(":")[1]}min`}</Text>
          </View>
          <TouchableOpacity onPress={() => createTwoButtonAlert(index.props)} style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 100, width: vw(22), padding: 3, marginBottom: 5, marginLeft: 3 }}>
            <Text style={{ color: 'black', fontFamily: 'Dosis-Medium' }}>CONCLUIR</Text>
          </TouchableOpacity>
        </View>
      </ScaleInView>
    )
  }
  //Delete popup to confirm the activite destroy
  const createTwoButtonAlert = (index) =>
    Alert.alert(
      "Você gostaria de finalizar a atividade?",
      "",
      [
        {
          text: "CANCELAR",
          style: "cancel"
        },
        { text: "SIM", onPress: () => DeleteActivite(index) }
      ],
      { cancelable: false }
    );
  
  async function DeleteActivite(index) {
    //deleting the activite
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
    setTodos(newTodosArray);

  }
  //Animating the widget starting
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
  if (isLoaded == false) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121515', alignItems: 'center', justifyContent: 'center' }}>
        <FadeInView>
          <Text style={{ color: 'white', fontSize: 45, fontFamily: 'Dosis-Bold', marginBottom: vh(8) }}>Carregando<Text style={{ color: '#F2A54A' }}>...</Text></Text>
        </FadeInView>
      </View>
    )
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#121515' }}>
        <View style={styles.container}>
          {todos.map((widget, index) => <WidgetTodo key={index} props={index} />)}
        </View>
      </ScrollView>
    )
  }

}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  WidgetText: {
    fontSize: 14.5,
    color: 'white',
    fontFamily: 'Dosis-Bold',
  },

})