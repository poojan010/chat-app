import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import database from '@react-native-firebase/database' ;
import { TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components';

import { setUser } from 'store/action';
import { setLoginStatus } from 'utils/asyncStorage';
import { reset as navigationReset } from 'navigator/navigationHelper';
import { textRegex, emailRegex, NAME_REQUIRED, INVALID_NAME, EMAIL_REQUIRED, INVALID_EMAIL, PASS_REQUIRED, INVALID_PASS, REGISTER_SUCCESS_MESSAGE, ACCOUNT_EXIST } from 'utils/index';

import { KeyboardAvoidingView, ProfileAvatar } from 'components';
import { EmailIcon, EyeIcon, EyeOffIcon, PersonIcon } from 'asset/Icons';



interface ScreenProps extends NativeStackScreenProps<any> {

}

const Loader = () => (
    <View style={themedStyles.loader}>
        <Spinner status={"basic"}/>
    </View>
);

const avatarURL = "https://www.pngitem.com/pimgs/m/78-786501_black-avatar-png-user-icon-png-transparent-png.png"



const Login : FC<ScreenProps> = (props) => {

    const { navigation } = props

    const dispatch = useDispatch()

    const [userName, setUserName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    const [loading,setLoading] = useState(false)

    const styles = useStyleSheet(themedStyles);

    const checkValidations = () => {
        let validationMessage = '';

        if(userName.length === 0) validationMessage = NAME_REQUIRED;
        else if(!textRegex.test(userName)) validationMessage = INVALID_NAME;
        else if(email.length === 0) validationMessage = EMAIL_REQUIRED;
        else if(!emailRegex.test(email)) validationMessage = INVALID_EMAIL;
        else if(password.length === 0) validationMessage = PASS_REQUIRED;
        else if(password.length < 8) validationMessage = INVALID_PASS;

        return validationMessage;
    }

    const checkIsAccountExsist = async () => {
        const snapshot = await database().ref('users/').orderByChild("email").equalTo(email).once('value');
        return snapshot.val();
    }

    const onSignUpButtonPress = async () => {

        /** Input Validation */
        let validationMessage = checkValidations()
        if(validationMessage){
            SimpleToast.show(validationMessage)
            return;
        }

        let accDetails = await checkIsAccountExsist()
        if(accDetails !== null){
            SimpleToast.show(ACCOUNT_EXIST)
            return;
        }

        const userData = {
            id : uuid.v4(),
            userName,
            email,
            password,
            profilePic : "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
        }

        setLoading(true)
        database()
            .ref('/users/'+userData.id)
            .set(userData)
            .then(async(res) => {
                if(__DEV__) console.log("Result ",res)
                await setLoginStatus(true)
                setLoading(false)
                dispatch(setUser(userData))
                SimpleToast.show(REGISTER_SUCCESS_MESSAGE)
                navigationReset("ChatList");
            })

    };

    const onSignInButtonPress = (): void => {
        navigation.navigate('Login');
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
                    keyboardType="email-address"
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
                { loading ? <Loader /> : "SIGN UP" }
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
    loader : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
