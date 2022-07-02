import React, { FC } from 'react';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database' ;
import { TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';

import { setLoginStatus } from 'utils/asyncStorage';

import { KeyboardAvoidingView, ProfileAvatar } from 'components';
import { EmailIcon, EyeIcon, EyeOffIcon, PersonIcon } from 'asset/Icons';


interface ScreenProps extends NativeStackScreenProps<any> {

}


const avatarURL = "https://www.pngitem.com/pimgs/m/78-786501_black-avatar-png-user-icon-png-transparent-png.png"

const Login : FC<ScreenProps> = (props) => {

    const { navigation } = props

    const [userName, setUserName] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    const styles = useStyleSheet(themedStyles);

    const onSignUpButtonPress = (): void => {
        const userData = {
            id : uuid.v4(),
            userName,
            email,
            password,
            image : "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
        }

        database()
            .ref('/users/'+userData.id)
            .set(userData)
            .then(async() => {
                await setLoginStatus(true)
                console.log("Registered successfully.")
                navigation.navigate("ChatList");
            })

    };

    const onSignInButtonPress = (): void => {
        navigation && navigation.navigate('Login');
    };

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };

    const renderIcon = (props:any) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            {passwordVisible ? <EyeIcon {...props} /> : <EyeOffIcon {...props} />}
        </TouchableWithoutFeedback>
    );

    const onPressEditAvatar = () => {

    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerContainer}>
                <ProfileAvatar
                    // @ts-ignore
                    style={styles.profileAvatar}
                    resizeMode='contain'
                    source={{ uri : avatarURL}}
                    onPressEditAvatar={onPressEditAvatar}
                />
            </View>

            <Layout
                style={styles.formContainer}
                level='1'
            >
                <Input
                    autoCapitalize='none'
                    placeholder='User Name'
                    accessoryRight={<PersonIcon/>}
                    value={userName}
                    onChangeText={setUserName}
                />
                <Input
                    style={styles.emailInput}
                    autoCapitalize='none'
                    placeholder='Email'
                    accessoryRight={<EmailIcon/>}
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    style={styles.passwordInput}
                    autoCapitalize='none'
                    secureTextEntry={!passwordVisible}
                    placeholder='Password'
                    accessoryRight={renderIcon}
                    value={password}
                    onChangeText={setPassword}
                />
            </Layout>

            <Button
                style={styles.signUpButton}
                size='giant'
                onPress={onSignUpButtonPress}
            >
                SIGN UP
            </Button>

            <Button
                style={styles.signInButton}
                appearance='ghost'
                status='basic'
                onPress={onSignInButtonPress}
            >
                Already have an account? Sign In
            </Button>

        </KeyboardAvoidingView>
    );
};

export default Login

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: 'color-primary-default',
    },
    profileAvatar: {
        width: 116,
        height: 116,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop : 8,
        backgroundColor: 'background-basic-color-1',
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    emailInput: {
        marginTop: 16,
    },
    passwordInput: {
        marginTop: 16,
    },
    termsCheckBox: {
        marginTop: 24,
    },
    termsCheckBoxText: {
        color: 'text-hint-color',
    },
    signUpButton: {
        marginHorizontal: 16,
    },
    signInButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
});
