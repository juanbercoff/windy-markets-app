import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { TextInput, Text, Button, Portal, Dialog, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('authToken', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }


export default function Login({navigation}) {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const loginHandler = (data) => {
        //TODO input validation
        return fetch('http://35732784f20a.ngrok.io/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: "test@test.com", password: "testest"})
    
        })
        .then(res => {
            if(res.status == 200) {
                //return res.headers.map['auth-token']
                storeToken(res.headers.map['auth-token'])
                console.log('token stored ' + res.headers.map['auth-token'])
                navigation.navigate('Home')
            } else {
                return showDialog()
            }
            
        })
        
        
    }


    return(
        <SafeAreaView style={styles.container}>
            <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
            />
            <View 
            style={styles.inputContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Formik
                    initialValues={{email: '', password:''}}
                    onSubmit={values=> {
                        loginHandler(values)
                    }}
                >
                    {props=> (
                        <View>
                            <TextInput
                            style={styles.inputs}
                            placeholder='Your email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            mode='outlined'
                            />
                            <TextInput
                            style={styles.inputs}
                            placeholder='Your password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                            mode='outlined'
                            />
                            <Button 
                            style={styles.submitButton}
                            color='#000000'
                            mode='contained'
                            onPress={props.handleSubmit}>
                                SIGN IN
                            </Button>          
                                         
                        </View>
                    )}
                </Formik>
                
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Paragraph>Wrong username or password</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Ok</Button>
                    </Dialog.Actions>                    
                </Dialog>
            </Portal>
            <View style={styles.signUpTextContainer}>
            <Text>Don't have an account?</Text> 
            <Text 
            style={styles.signUpText}
            onPress={()=> navigation.navigate('RegisterScreen')}
            > Sign Up</Text>
            </View>
            

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: 150
    },
    logo: {
        height: 120,
        width: 120
    },
    inputContainer: {
        marginTop:100,
        flex:1
    },
    inputs: {
        width: screenWidth * 0.7
    },
    welcomeText: {
        alignSelf:'center',
        fontSize: 25
    },
    submitButton: {
        marginTop: 50,
        borderRadius:10,
    },
    signUpTextContainer: {
        marginTop: 100,
        flex:1,
        flexDirection:'row'
    },
    signUpText: {
        fontWeight: 'bold',
        color: '#01BC6B'
    }
})
