import React, { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import { KeyboardAvoidingView } from './extra/scroll-view'
import { EyeIcon, EyeOffIcon, PersonIcon } from 'asset/Icons';


interface ScreenProps extends NativeStackScreenProps<any> {

}

const Register : FC<ScreenProps> = (props) => {

    const { navigation } = props

    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  
    const styles = useStyleSheet(themedStyles);
  
    const onSignUpButtonPress = (): void => {
      navigation && navigation.navigate('Register');
    };
  
    const onPasswordIconPress = (): void => {
      setPasswordVisible(!passwordVisible);
    };

    const renderIcon = (props:any) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            {passwordVisible ? <EyeIcon {...props} /> : <EyeOffIcon {...props} />}
        </TouchableWithoutFeedback>
    );

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text
                    category='h1'
                    status='control'
                >
                    Hello
                </Text>
                <Text
                    style={styles.signInLabel}
                    category='s1'
                    status='control'>
                    Sign in to your account
                </Text>
            </View>
    
            <Layout
                style={styles.formContainer}
                level='1'
            >
    
                <Input
                    placeholder='Email'
                    accessoryRight={<PersonIcon/>}
                    value={email}
                    onChangeText={setEmail}
                />

                <Input
                    style={styles.passwordInput}
                    placeholder='Password'
                    accessoryRight={renderIcon}
                    
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}
                />

                {/* <View style={styles.forgotPasswordContainer}>
                    <Button
                        style={styles.forgotPasswordButton}
                        appearance='ghost'
                        status='basic'
                        onPress={onForgotPasswordButtonPress}
                    >
                        Forgot your password?
                    </Button>
                </View> */}

            </Layout>

            <Button
                style={styles.signInButton}
                size='giant'
            >
                SIGN IN
            </Button>

            <Button
                style={styles.signUpButton}
                appearance='ghost'
                status='basic'
                onPress={onSignUpButtonPress}
            >
                Don't have an account? Create
            </Button>
        </KeyboardAvoidingView>
    )
}

export default Register




const themedStyles = StyleService.create({
    mainContainer: {
        backgroundColor: 'background-basic-color-1',
        flex: 1
    },
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: 'color-primary-default',
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
});
