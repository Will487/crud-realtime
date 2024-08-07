import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import firebase from '../services/connectionFirebase';
import listar from '../screens/listar';
import Listar from '../screens/listar';

 

const Separator = () => {
  return <View style={styles.separator} />;
};

 

export default function Pessoas() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  //declarar chave-primária 
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [pessoas, setPessoas] = useState([]);

 

  useEffect(() => {

 

    async function search() {

 

      await firebase.database().ref('pessoas').on('value', (snapshot) => {
        setPessoas([]);

 

        snapshot.forEach((chilItem) => {
          let data = {
            //de acordo com a chave de cada item busca os valores
            //cadastrados na relação e atribui nos dados
            key: chilItem.key,
            name: chilItem.val().name,
            number: chilItem.val().number,
            cpf: chilItem.val().cpf,
            address: chilItem.val().address,
          };
          setPessoas(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    search();
  }, []);

 

  //métodos para inserir ou alterar Pessoas
  async function insertUpdate() {
    //editar dados
    if (name !== '' & number !== '' & cpf !== '' & address !== '' & key !== '') {
      firebase.database().ref('pessoas').child(key).update({
        name: name, number: number, cpf: cpf, address: address
      })
      Keyboard.dismiss();
      alert('Pessoa Editada!');
      clearData();
      setKey('');
      return;
    }
    //cadastrar dados
    let pessoa = await firebase.database().ref('pessoas');
    let chave = pessoa.push().key; //comando para salvar é o push

 

    pessoa.child(chave).set({
      name: name,
      number: number,
      cpf: cpf,
      address: address
    });
    Keyboard.dismiss();
    alert('Pessoa Cadastrada!');
    clearData();
  }

 

  function clearData() {
    setName('');
    setNumber('');
    setCpf('');
    setAmount('');
  }

 

  //função para excluir um item  
  function handleDelete(key) {

 

    firebase.database().ref('pessoas').child(key).remove()
      .then(() => {
        //todos os itens que forem diferentes daquele que foi deletado 
        //serão atribuidos no array 
        const findPessoas = pessoas.filter(item => item.key !== key)
        setPessoas(findPessoas)
      })
  }

 

  //função para editar  
  function handleEdit(data) {
    setKey(data.key),
    setName(data.name),
    setNumber(data.number),
    setCpf(data.cpf),
    setAddress(data.address)
  }

 

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        left={<TextInput.Icon icon="account" />}
        maxLength={40}
        style={styles.input}
        onChangeText={(texto) => setName(texto)}
        value={name}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Numero"
        left={<TextInput.Icon icon="cellphone" />}
        style={styles.input}
        onChangeText={(texto) => setNumber(texto)}
        value={number}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="CPF"
        left={<TextInput.Icon icon="card-account-details-star" />}
        style={styles.input}
        onChangeText={(texto) => setCpf(texto)}
        value={cpf}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Endereco."
        left={<TextInput.Icon icon="map-marker" />}
        style={styles.input}
        onChangeText={(texto) => setAddress(texto)}
        value={address}
        ref={inputRef}
      />
      <Separator />

 

      <TouchableOpacity
        onPress={insertUpdate}
        style={styles.button}
        activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>Cadastrar</Text>
      </TouchableOpacity>

 

      <View>
        <Text style={styles.listar}>Listagem de Pessoas</Text>
      </View>
      {loading ?
        (
          <ActivityIndicator color="#121212" size={45} />
        ) :
        (
          <FlatList
            keyExtractor={item => item.key}
            data={pessoas}
            renderItem={({ item }) => (
              <Listar data={item} deleteItem={handleDelete}
                editItem={handleEdit} />
            )}
          />
        )
      }
    </View>
  );
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
    fontSize: 13,
    borderRadius: 8,
  },
  separator: {
    marginVertical: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3ea6f2',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 100,
    fontSize: 20,
  },
});