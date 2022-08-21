import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import { TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import { setUser } from 'store/actions';
import { setLoginStatus } from 'utils/asyncStorage';
import { reset as navigationReset } from 'navigator/navHelper';
import { emailRegex, EMAIL_REQUIRED, INVALID_EMAIL, PASS_REQUIRED, INVALID_PASS, NO_EMAIL_FOUND, WRONG_PASSWORD, LOGIN_SUCCESS_MESSAGE } from 'utils/index';

import { KeyboardAvoidingView } from 'components';
import { EyeIcon, EyeOffIcon, PersonIcon } from 'assets/icons';


interface ScreenProps extends NativeStackScreenProps<any> {

}

const Loader = () => (
    <View style={themedStyles.loader}>
        <Spinner status={"basic"} />
    </View>
);


const Login: FC<ScreenProps> = (props) => {

    const { navigation } = props

    const dispatch = useDispatch()

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    const [loading, setLoading] = useState(false)

    const styles = useStyleSheet(themedStyles);

    const onSignUpButtonPress = (): void => {
        navigation.navigate('Register');
    };

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };

    const checkValidations = () => {
        let validationMessage = '';

        if (email.length === 0) validationMessage = EMAIL_REQUIRED;
        else if (!emailRegex.test(email)) validationMessage = INVALID_EMAIL;
        else if (password.length === 0) validationMessage = PASS_REQUIRED;
        else if (password.length < 8) validationMessage = INVALID_PASS;

        return validationMessage;
    }

    const onLogin = () => {

        /** Input Validation */
        let validationMessage = checkValidations()
        if (validationMessage) {
            SimpleToast.show(validationMessage)
            return;
        }

        setLoading(true)
        database()
            .ref('users/')
            .orderByChild("email")
            .equalTo(email)
            .once('value')
            .then(async snapshot => {
                setLoading(false)
                if (snapshot.val() == null) {
                    SimpleToast.show(NO_EMAIL_FOUND);
                    return false;
                }
                let userData: any = Object.values(snapshot.val())[0];

                if (userData?.password != password) {
                    SimpleToast.show(WRONG_PASSWORD);
                    return false;
                }

                dispatch(setUser(userData));
                await setLoginStatus(true);
                SimpleToast.show(LOGIN_SUCCESS_MESSAGE);
                navigationReset("ChatList");
            });
    }

    const renderIcon = (props: any) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            {passwordVisible ? <EyeIcon {...props} /> : <EyeOffIcon {...props} />}
        </TouchableWithoutFeedback>
    );

    return (
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
                    status='control'
                >
                    Sign in to your account
                </Text>
            </View>

            <Layout
                style={styles.formContainer}
                level='1'
            >

                <Input
                    placeholder='Email'
                    accessoryRight={<PersonIcon />}
                    value={email}
                    autoCapitalize='none'
                    keyboardType="email-address"
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

            </Layout>

            <Button
                style={styles.signInButton}
                size='giant'
                onPress={onLogin}
            >
                {loading ? <Loader /> : "SIGN IN"}
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

export default Login




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
        marginTop: 20,
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
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
