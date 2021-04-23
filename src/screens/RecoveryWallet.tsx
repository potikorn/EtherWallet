import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';

const RecoveryWallet = () => {
  const navigation = useNavigation();
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    // const walletRandom = ethers.Wallet.createRandom();
    // setWallet(walletRandom);
  }, []);

  const handleRecoveryClick = () => {
    navigation.navigate('Home', {mnemonic: mnemonic.trim()});
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <>
          <Text style={styles.textButton}>Enter phrase keyword</Text>
          <View>
            {/* <Text selectable style={styles.phraseKeyword}>
                {wallet?.mnemonic}
              </Text> */}
            <TextInput
              style={styles.textInput}
              multiline={true}
              onChangeText={setMnemonic}
            />
          </View>
          <Button onPress={handleRecoveryClick} title="Go to wallet" />
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    fontSize: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textInput: {
    fontSize: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginVertical: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  phraseKeyword: {
    marginTop: 16,
    fontSize: 24,
  },
});

export default RecoveryWallet;
