import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'; //importar alguns componentes do React
import { Card, TextInput } from 'react-native-paper';
import firebase from '../../src/services/connectionFirebase';
//renderizar o projeto
 
export default function Login({changeStatus}) {
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  function handleLogin(){
    if(type === 'login'){
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid)
      })
      .catch((err)=>{
        console.log(err);
        alert('Email e/ou senha Inválidos');
        return;
      })
 
    }else{
     // Aqui cadastramos o usuario 
     const user = firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((user)=>{
       changeStatus(user.user.uid)
     })
     .catch((err)=>{
      console.log(err);
      alert('Erro ao cadastrar usuário');
      return;
     })
    }
  }
  return (
    <View>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_book.png')}></Image>
      <Card>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            label="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            right={<TextInput.Icon icon="email-box" />}
          />
          <TextInput
            style={styles.input}
            label="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
          />
        </SafeAreaView>
      </Card>
      <TouchableOpacity
        style={[
          styles.handleLogin,
          { backgroundColor: type === 'login' ? '#8B4513' : '#8B4513' },
        ]}
        onPress={handleLogin}>
        <Text style={styles.loginText}>
          {type === 'login' ? 'Realizar Login' : 'Cadastrar Novo Usuário'}
        </Text>
      </TouchableOpacity>
 
      <TouchableOpacity
        onPress={() =>
          setType((type) => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text style={{ textAlign: 'center', fontSize: 18, color: '#000000' }}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 200,
    marginTop: 100,
    alignSelf: 'center',
  },
  input: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 25,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
  },
   handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10,
    marginTop:50
  },
  loginText: {
    color: '#FFF',
    fontSize: 17,
  },
});