import React, { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';

import { ProfileAvatar } from './extra/ProfileAvatar';
import { KeyboardAvoidingView } from './extra/scroll-view';
import { EmailIcon, EyeIcon, EyeOffIcon, PersonIcon, PlusIcon } from 'asset/Icons';


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
        // navigation && navigation.navigate('Register');
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

    const renderEditAvatarButton = (): React.ReactElement => (
        <Button
          style={styles.editAvatarButton}
          status='basic'
          accessoryRight={<PlusIcon/>}
        />
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerContainer}>
                <ProfileAvatar
                    // @ts-ignore
                    style={styles.profileAvatar}
                    resizeMode='contain'
                    editButton={renderEditAvatarButton}
                    source={{ uri : avatarURL}}
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
    editAvatarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
