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
import List from '../screens/list';

 

const Separator = () => {
  return <View style={styles.separator} />;
};

 

export default function Products() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  //declarar chave-primária 
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [products, setProducts] = useState([]);

 

  useEffect(() => {

 

    async function search() {

 

      await firebase.database().ref('products').on('value', (snapshot) => {
        setProducts([]);

 

        snapshot.forEach((chilItem) => {
          let data = {
            //de acordo com a chave de cada item busca os valores
            //cadastrados na relação e atribui nos dados
            key: chilItem.key,
            name: chilItem.val().name,
            brand: chilItem.val().brand,
            price: chilItem.val().price,
            amount: chilItem.val().amount,
          };
          setProducts(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false);
      })
    }
    search();
  }, []);

 

  //métodos para inserir ou alterar produtos
  async function insertUpdate() {
    //editar dados
    if (name !== '' & brand !== '' & price !== '' & amount !== ''
      & key !== '') {
      firebase.database().ref('products').child(key).update({
        name: name, brand: brand, price: price, amount: amount
      })
      Keyboard.dismiss();
      alert('Produto Editado!');
      clearData();
      setKey('');
      return;
    }
    //cadastrar dados
    let produto = await firebase.database().ref('products');
    let chave = produto.push().key; //comando para salvar é o push

 

    produto.child(chave).set({
      name: name,
      brand: brand,
      price: price,
      amount: amount
    });
    Keyboard.dismiss();
    alert('Produto Cadastrado!');
    clearData();
  }

 

  function clearData() {
    setName('');
    setBrand('');
    setPrice('');
    setAmount('');
  }

 

  //função para excluir um item  
  function handleDelete(key) {

 

    firebase.database().ref('products').child(key).remove()
      .then(() => {
        //todos os itens que forem diferentes daquele que foi deletado 
        //serão atribuidos no array 
        const findProducts = products.filter(item => item.key !== key)
        setProducts(findProducts)
      })
  }

 

  //função para editar  
  function handleEdit(data) {
    setKey(data.key),
    setName(data.name),
    setBrand(data.brand),
    setPrice(data.price),
    setAmount(data.amount)
  }

 

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título do Livro"
        left={<TextInput.Icon icon="book-open" />}
        maxLength={40}
        style={styles.input}
        onChangeText={(texto) => setName(texto)}
        value={name}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Marca"
        left={<TextInput.Icon icon="alpha-b-circle" />}
        style={styles.input}
        onChangeText={(texto) => setBrand(texto)}
        value={brand}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Preço"
        left={<TextInput.Icon icon="cash" />}
        style={styles.input}
        onChangeText={(texto) => setPrice(texto)}
        value={price}
        ref={inputRef}
      />
      <Separator />
      <TextInput
        placeholder="Qtdade."
        left={<TextInput.Icon icon="palette" />}
        style={styles.input}
        onChangeText={(texto) => setAmount(texto)}
        value={amount}
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
        <Text style={styles.listar}>Listagem de Produtos</Text>
      </View>
      {loading ?
        (
          <ActivityIndicator color="#121212" size={45} />
        ) :
        (
          <FlatList
            keyExtractor={item => item.key}
            data={products}
            renderItem={({ item }) => (
              <List data={item} deleteItem={handleDelete}
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