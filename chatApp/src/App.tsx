import React, { FC } from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';


import Routers from './navigator';


export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaProvider>
                <Routers />
            </SafeAreaProvider>
        </ApplicationProvider>
    </>
);

