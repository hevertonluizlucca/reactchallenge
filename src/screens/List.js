import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import AsyncStorage from "@react-native-community/async-storage"
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/header.jpg'
import Student from '../components/Student'
import AddStudent from './AddStudent'

const initialState = {
    showAddStudent: false,
    students: []
}

export default class List extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('studentsState')
        const state = JSON.parse(stateString) || initialState
        this.setState(state, this.saveStudents)
    }

    saveStudents = () => {
        AsyncStorage.setItem('studentsState', JSON.stringify(this.state))
    }

    addStudent = newStudent => {
        if(!newStudent.nomeEstudante || !newStudent.nomeEstudante.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return 
        }

        const students = [...this.state.students]
        students.push({
            id: Math.random(),
            nomeEstudante: newStudent.nomeEstudante,
            dateNasc: newStudent.dateNasc
        })

        this.setState({ students, showAddStudent: false }, this.saveStudents)
    }

    deleteStudent = id => {
        const students = this.state.students.filter(student => student.id !== id)
        this.setState({ students }, this.saveStudents)
    }

    editStudent = id => {
        
    }

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')
        return (
            <View style={styles.container}>
                <AddStudent isVisible={this.state.showAddStudent}
                    onCancel={() => this.setState({ showAddStudent: false })}
                    onSave={this.addStudent} />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Estudantes Cadastrados</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.studentList}>
                    <FlatList data={this.state.students}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Student {...item} onDelete={this.deleteStudent} onEdit={this.editStudent} />} />
                </View>
                <TouchableOpacity style={styles.addButton} 
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddStudent: true })}>
                    <Icon name="plus" size={20}
                        color={commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    studentList: {
        flex: 10
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        flexDirection: 'row',
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 70,
        marginBottom: 20,
        justifyContent: 'flex-end'
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});