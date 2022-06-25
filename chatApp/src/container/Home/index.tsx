import React, { FC } from 'react';
import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


interface ScreenProps extends NativeStackScreenProps<any> {

}

const HomeScreen : FC<ScreenProps> = (props) => (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category='h5' appearance={"hint"} >HOME</Text>
        <Button onPress={() => props.navigation.navigate("ChatRoom")}>
            Go To Chat
        </Button>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Button onPress={() => props.navigation.navigate("Register")}>
            Go To Register
        </Button>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Button onPress={() => props.navigation.navigate("Login")}>
            Go To Login
        </Button>
    </Layout>
);

export default HomeScreen