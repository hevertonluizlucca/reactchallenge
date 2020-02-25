import React, { Component } from 'react'
import {
    ScrollView,
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import commonStyles from '../commonStyles'

const initialState = { 
    nomeEstudante: '', 
    dateNasc: new Date(), 
    serie: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    nomeMae: '',
    cpfMae: '',
    datePag: new Date(),    
    showDatePicker: false }

export default class AddStudent extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newStudent = {
            nomeEstudante: this.state.nomeEstudante,
            dateNasc: this.state.dateNasc,
            serie: this.state.serie,
            cep: this.state.cep,
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            estado: this.state.estado,
            nomeMae: this.state.nomeMae,
            cpfMae: this.state.cpfMae,
            datePag: this.state.datePag
        }

        this.props.onSave && this.props.onSave(newStudent)
        this.setState({ ...initialState })
    }

    getDatePickerNasc = () => {
        let datePicker = <DateTimePicker value={this.state.dateNasc}
            onChange={(_, dateNasc) => this.setState({ dateNasc, showDatePicker: false })}
            mode='date' />
        
        const dateString = moment(this.state.dateNasc).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        
        return datePicker
    }

    getDatePickerPag = () => {
        let datePicker = <DateTimePicker value={this.state.datePag}
            onChange={(_, datePag) => this.setState({ datePag, showDatePicker: false })}
            mode='date' />
        
        const dateString = moment(this.state.datePag).format('D')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        
        return datePicker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <ScrollView>
                    <TouchableWithoutFeedback
                        onPress={this.props.onCancel}>
                        <View style={styles.background}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.header}>Novo estudante</Text>
                        <TextInput style={styles.input} 
                            placeholder="Informe o nome do estudante"
                            onChangeText={nomeEstudante => this.setState({ nomeEstudante })}
                            value={this.state.nomeEstudante} />
                        {this.getDatePickerNasc()}
                        <TextInput style={styles.input} 
                            placeholder="Série de ingresso"
                            onChangeText={serie => this.setState({ serie })}
                            value={this.state.serie} />
                        <Text style={styles.header}>Endereço</Text> 
                        <TextInput style={styles.input} 
                            placeholder="CEP"
                            onChangeText={cep => this.setState({ cep })}
                            value={this.state.cep} />
                        <TextInput style={styles.input} 
                            placeholder="Logradouro"
                            onChangeText={logradouro => this.setState({ logradouro })}
                            value={this.state.logradouro} />
                        <TextInput style={styles.input} 
                            placeholder="Número"
                            onChangeText={numero => this.setState({ numero })}
                            value={this.state.numero} />
                        <TextInput style={styles.input} 
                            placeholder="Complemento"
                            onChangeText={complemento => this.setState({ complemento })}
                            value={this.state.complemento} />
                        <TextInput style={styles.input} 
                            placeholder="Bairro"
                            onChangeText={bairro => this.setState({ bairro })}
                            value={this.state.bairro} />
                        <TextInput style={styles.input} 
                            placeholder="Cidade"
                            onChangeText={cidade => this.setState({ cidade })}
                            value={this.state.cidade} />
                        <TextInput style={styles.input} 
                            placeholder="Estado"
                            onChangeText={estado => this.setState({ estado })}
                            value={this.state.estado} />                        
                        <Text style={styles.header}>Dados da mãe</Text> 
                        <TextInput style={styles.input} 
                            placeholder="Nome da mãe"
                            onChangeText={nomeMae => this.setState({ nomeMae })}
                            value={this.state.nomeMae} />
                        <TextInput style={styles.input} 
                            placeholder="CPF"
                            onChangeText={cpfMae => this.setState({ cpfMae })}
                            value={this.state.cpfMae} />
                        {this.getDatePickerNasc()}    
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={this.props.onCancel}>
                        <View style={styles.background}></View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})