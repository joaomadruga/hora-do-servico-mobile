import React, { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import { Text, View, TextInput, StyleSheet, Picker, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddActivites(props) {
    const [MembersArray, setMembersArray] = useState();
    const [members, setMembers] = useState([]);
    const [ActivityName, setActivityName] = useState('');
    const [ActivityTime, setActivityTime] = useState('');
    const [ActivityPerson, setActivityPerson] = useState();
    const DayDate = new Date();
    const [date, setDate] = useState(DayDate);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isDate, setisDate] = useState(false);
    const [isTime, setisTime] = useState(false);

    //Creating the time picker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (mode == 'time' && event.type != "dismissed") {
            setisTime(true);
        }
        if (mode == 'date' && event.type != "dismissed") {
            setisDate(true);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };

    const showTimepicker = () => {
        showMode('time');
    };
    let memberPosition;

    
    useEffect(() => {
        //Loading members
        MemberName();
    }, []);

    async function MemberName() {
        //Getting members
        memberPosition = await AsyncStorage.getItem('Member');
        const user_id = await AsyncStorage.getItem('user');
        const response = await api.get('/account', {
            headers: { user_id },
        })
        setMembersArray(JSON.stringify(Object.values(response.data.infoJSON.members)));
        delete response.data.infoJSON.members[memberPosition];
        setMembers(Object.values(response.data.infoJSON.members));
    }
    async function AddNewActivites() {
        //Adding activites
        const Hora = date.toLocaleTimeString();
        const Dia = date.toLocaleDateString();;
        const Seconds = date.getTime();
        const Activity = { Name: ActivityName.trim(), Date: Dia, Hour: Hora, Seconds: Seconds };
        if (isDate == true && isTime == true && Activity.Name != "") {
            var index;
            for (var i = 0; i < JSON.parse(MembersArray).length; i++) {
                if (ActivityPerson == JSON.parse(MembersArray)[i]) {
                    index = i;
                }
            }
            const _id = await AsyncStorage.getItem('user');
            const TodoUser = "todo_user_" + index;
            const header = {
                'Content-Type': 'application/json',
                '_id': _id,
            }
            const response = await api.post('/FamilyInfoAdd', {
                data: {
                    TodoUser: TodoUser,
                    TodoList: Activity
                }
            }, {
                headers: header
            });
            props.props();
        } else if(isDate == false && isTime == false && Activity.Name != ""){
            var index;
            for (var i = 0; i < JSON.parse(MembersArray).length; i++) {
                if (ActivityPerson == JSON.parse(MembersArray)[i]) {
                    index = i;
                }
            }
            const ActivityWithoutTime = {Name: ActivityName.trim()};
            const _id = await AsyncStorage.getItem('user');
            const TodoUser = "todo_user_" + index;
            const header = {
                'Content-Type': 'application/json',
                '_id': _id,
            }
            const response = await api.post('/FamilyInfoAdd', {
                data: {
                    TodoUser: TodoUser,
                    TodoList: ActivityWithoutTime
                }
            }, {
                headers: header
            });
            props.props();
        } else {
            Alert.alert("", "Você esqueceu de preencher algo!");
        }

    }
    return (

        <ScrollView keyboardShouldPersistTaps='always'>
            <View style={styles.container}>
                <View style={styles.Widget}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.titleInput}>Qual a atividade?</Text>
                        <TextInput
                            onChangeText={text => setActivityName(text)}
                            style={styles.input}
                            placeholder="Exemplo: lavar os pratos"
                            placeholderTextColor="#e7e7e7"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.titleInput} >Prazo para conclusão:</Text>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: vw(90) }}>
                            <TouchableOpacity
                                style={{ width: vw(40), height: vh(5), backgroundColor: '#FF7338', borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 0.1 }}
                                onPress={showDatepicker}
                            >
                                <Text style={{ color: 'white', fontFamily: 'Dosis-SemiBold', fontSize: 18 }}>{isDate ? `${String(date).split(" ")[2]}/${String(date).split(" ")[1]}/${String(date).split(" ")[3]}` : `Data do mês`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: vw(40), height: vh(5), backgroundColor: '#FF7338', borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 0.1 }}
                                onPress={showTimepicker}
                            >
                                <Text style={{ color: 'white', fontFamily: 'Dosis-SemiBold', fontSize: 17 }}>{isTime ? `${String(date).split(" ")[4].split(":")[0]}h e ${String(date).split(" ")[4].split(":")[1]} minutos` : `Horário`}</Text>
                            </TouchableOpacity>
                        </View>
                        {show == true && (
                            <DateTimePicker
                                minimumDate={new Date(2000 + Number(DayDate.toLocaleDateString().split('/')[2]), DayDate.toLocaleDateString().split('/')[0] - 1, DayDate.toLocaleDateString().split('/')[1])}
                                maximumDate={new Date(2000 + Number(DayDate.toLocaleDateString().split('/')[2]), Number(DayDate.toLocaleDateString().split('/')[0]), DayDate.toLocaleDateString().split('/')[1])}
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                        <Text style={styles.titleInput}>Pra quem é essa atividade?</Text>
                    </View>
                    <Picker
                        selectedValue={ActivityPerson}
                        style={{ height: 50, width: vw(80), color: 'white', alignSelf: 'center', justifyContent: 'center' }}
                        onValueChange={(itemValue, itemIndex) => setActivityPerson(itemValue)}

                    >
                        {members.map((member, index) => <Picker.Item label={member} key={index} member={member} value={member} />)}
                    </Picker>

                    <TouchableOpacity style={styles.buttonAddActivites} onPress={AddNewActivites}>
                        <Text style={{ color: 'white', fontFamily: 'Dosis-SemiBold', fontSize: 15 }} >Adicionar atividades</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#217EA5',
        borderRadius: 10,
    },
    Widget: {
        backgroundColor: '#217EA5',
        borderRadius: 20,
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
    buttonAddActivites: {
        backgroundColor: '#FF7338',
        borderRadius: 100,
        height: 36,
        width: vw(55),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.1,
        alignSelf: 'center',
        marginBottom: 10
    }
})