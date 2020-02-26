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

    onlyNumber = (  numberVal ) => {
        return numberVal.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
    };

    render() {

        const validations = []
        validations.push(this.state.nomeEstudante && this.state.nomeEstudante.trim.length <=100)
        validations.push(this.state.dateNasc && this.state.dateNasc < new Date())
        validations.push(this.state.serie && this.state.serie >= 1 && this.state.serie <= 9)
       // cep valido validations.push(this.state.cep && this.state.cep.length == 8)
        validations.push(this.state.logradouro && this.state.logradouro.length <=120)
       // apenas numeros validations.push(this.state.numero && )
        validations.push(this.state.complemento && this.state.complemento.length <=50)
        validations.push(this.state.bairro && this.state.bairro.length <=100)
        validations.push(this.state.cidade)    
        validations.push(this.state.estado)
        validations.push(this.state.nomeMae && this.state.nomeMae.trim.length <=100)
        //  cpf valido validations.push(this.state.cpfMae && this.state.cpf.length <=100)
        // data de pagamento valida validations.push(this.state.datePag)



        const validForm = validations.reduce((t, a) => t && a)    
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
                            maxLength={100}
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
                            textContentType="postalCode"
                            onChangeText={cep => this.setState({ cep })}
                            value={this.state.cep} />
                        <TextInput style={styles.input} 
                            placeholder="Logradouro"
                            maxLength={120}
                            onChangeText={logradouro => this.setState({ logradouro })}
                            value={this.state.logradouro} />
                        <TextInput style={styles.input} 
                            placeholder="Número"
                            keyboardType="numeric"
                            onChangeText={numero => {
                                this.setState({numero: this.onlyNumber(numero)});
                                value = this.state.numero
                            } }/>
                        <TextInput style={styles.input} 
                            placeholder="Complemento"
                            maxLength={50}
                            onChangeText={complemento => this.setState({ complemento })}
                            value={this.state.complemento} />
                        <TextInput style={styles.input} 
                            placeholder="Bairro"
                            maxLength={100}
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
                            maxLength={100}
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
                            <TouchableOpacity onPress={this.save}
                                disabled = {!validForm}>
                                <Text style={[styles.button, validForm ? {} : {backgroundColor:'#AAA'}]}>Salvar</Text>
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
        color:'white',
        width: 120,
        height: 20,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})