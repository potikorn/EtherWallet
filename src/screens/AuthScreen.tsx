import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() => navigation.navigate('Create')}
            title="Create Wallet"
          />
          <View style={{height: 8}} />
          <Button
            onPress={() => navigation.navigate('Recovery')}
            title="Recovery Wallet"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
  buttonWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
