import React, {useState} from 'react';
import Login from './src/screens/login';
import Menu from './src/screens/menutabs';

export default function App(){

  const[user, setUser]=useState(null);

  if(!user){
    return<Login changeStatus={(user)=> setUser(user)}/>
  }
  return <Menu/>
}