import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const handleSubmit = () => {
    getData().then(token=>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('auth-token', token)
        return fetch('http://35732784f20a.ngrok.io/getPosts', {
            method: 'GET',
            headers: headers
        })
        .then(res => res.text())
        .then(data=>console.log(data))
    })

    
}

const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('authToken')
      //TODO que pasa si no hay token
      return value != null ? JSON.parse(value) : null;
    } catch(e) {
      console.log(e)
    }
}


export default function Home() {
    return(
        <View>
            <Button 

            color='#000000'
            mode='contained'
            onPress={handleSubmit}>
            GET PROTECTED DATA
            </Button>  
        </View>

    )
}