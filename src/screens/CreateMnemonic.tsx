import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// Import ethers
import {ethers, Wallet} from 'ethers';
import {useNavigation} from '@react-navigation/core';

const CreateMnemonic = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const walletRandom = ethers.Wallet.createRandom();
    setWallet(walletRandom);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        {wallet === null ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles.textButton}>Phrase keyword</Text>
            <View>
              <Text selectable style={styles.phraseKeyword}>
                {wallet?.mnemonic}
              </Text>
            </View>
            <Text style={{marginVertical: 16}}>
              Please keep this secret keyword to safest place and get back to
              your wallet anytime.
            </Text>
            <Button
              onPress={() =>
                navigation.navigate('Home', {mnemonic: wallet.mnemonic})
              }
              title="Go to wallet"
            />
          </>
        )}
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
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  phraseKeyword: {
    marginTop: 16,
    fontSize: 24,
  },
});

export default CreateMnemonic;
