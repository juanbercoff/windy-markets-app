import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { TextInput, Text, Button, Divider } from 'react-native-paper';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    // Acepta .con el validator, en el backend no acepta. Revisar    
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Password should be longer than 6 characters')
        .max(50, 'Too Long!')
        .required('Required'),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

const screenWidth = Dimensions.get('window').width;

export default function Register() {


    const loginHandler = (data) => {
        console.log('sending data' + data.firstName);
        return fetch('http://35732784f20a.ngrok.io/api/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password})
    
        })
        .then(res => res.text())
        .then(data=>console.log(data))
        
    }


    return(
        <SafeAreaView style={styles.container}>
            <View 
            style={styles.inputContainer}>
                <Text style={styles.welcomeText}>Create a new account</Text>
                <Formik
                    validationSchema={SignupSchema}
                    initialValues={{firstName: '', lastName: '', email: '', password:'', passwordConfirmation:''}}
                    onSubmit={values=> {
                        loginHandler(values)
                    }}
                >
                    {({ handleChange, errors, touched, handleSubmit, values })=> (
                        <View>
                            <TextInput
                            style={styles.inputs}
                            placeholder='First name'
                            onChangeText={handleChange('firstName')}
                            value={values.firstName}
                            mode='outlined'
                            />
                            {errors.firstName && touched.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
                            <TextInput
                            style={styles.inputs}
                            placeholder='Last name'
                            onChangeText={handleChange('lastName')}
                            value={values.lastName}
                            mode='outlined'
                            />
                            {errors.lastName && touched.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
                            <TextInput
                            style={styles.inputs}
                            placeholder='Email'
                            onChangeText={handleChange('email')}
                            value={values.email}
                            mode='outlined'
                            />
                            {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            <TextInput
                            style={styles.inputs}
                            placeholder='Password'
                            onChangeText={handleChange('password')}
                            value={values.password}
                            mode='outlined'
                            />
                            {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            <TextInput
                            style={styles.inputs}
                            placeholder='Re-Enter password'
                            onChangeText={handleChange('passwordConfirmation')}
                            value={values.passwordConfirmation}
                            mode='outlined'
                            />
                            {errors.passwordConfirmation && touched.passwordConfirmation ? <Text style={styles.errorText}>{errors.passwordConfirmation}</Text> : null}
                            <Button 
                            style={styles.submitButton}
                            color='#000000'
                            mode='contained'
                            onPress={handleSubmit}>
                                REGISTER
                            </Button>          
                                         
                        </View>
                    )}
                </Formik>
                
            </View>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center'
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
    signUpText: {
        marginBottom: 130
    },
    errorText: {
        color: 'red',
        fontSize: 12
    }
})
