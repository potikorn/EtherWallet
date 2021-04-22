/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// Inject the crypto shims (BEFORE the ethers shims)
// import 'react-native-get-random-values';

// Inject the missing features with the ethers shims
// import '@ethersproject/shims';
import 'ethers/dist/shims';

// Import ethers
import {ethers, Wallet} from 'ethers';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [wallet, SetWallet] = useState<Wallet | null>(null);
  const [revealToggleWallet, setToggleRevealWallet] = useState(false);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [toggleSend, setToggleSend] = useState(false);

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  useEffect(() => {
    const walletRandom = ethers.Wallet.createRandom();
    SetWallet(walletRandom);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionContainer}>
          {wallet === null ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <TouchableHighlight
                disabled={wallet === null}
                onPress={() => setToggleRevealWallet(!revealToggleWallet)}>
                <Text style={styles.textButton}>{`${
                  revealToggleWallet ? 'Hidden' : 'Reveal'
                } phrase keyword`}</Text>
              </TouchableHighlight>
              {revealToggleWallet && (
                <View>
                  <Text>{wallet?.mnemonic}</Text>
                  {/* <Button
                    onPress={() => setToggleAddress(true)}
                    title="Get Address"
                  />
                  {toggleAddress && <Text>{wallet.address}</Text>} */}
                </View>
              )}
              <View>
                <View style={styles.buttonWrapper}>
                  <View style={{flex: 1, paddingRight: 5}}>
                    <Button
                      onPress={() => {
                        setToggleSend(!toggleSend);
                        setToggleAddress(false);
                      }}
                      title="Send"
                    />
                  </View>
                  <View style={{flex: 1, paddingLeft: 5}}>
                    <Button
                      onPress={() => {
                        setToggleAddress(!toggleAddress);
                        setToggleSend(false);
                      }}
                      title="Receive"
                    />
                  </View>
                </View>
                {toggleAddress && (
                  <Text selectable={true}>{wallet.address}</Text>
                )}
                {toggleSend && (
                  <View>
                    <TextInput
                      placeholder="To address"
                      style={styles.textInput}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Gas price"
                      style={{...styles.textInput, marginTop: 10}}
                    />
                    <View style={{marginTop: 16}}>
                      <Button
                        onPress={() => {
                          wallet.sendTransaction({
                            from: wallet.address,
                            to: 'adf', //get from text input
                          });
                        }}
                        title="Confirm send"
                      />
                    </View>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
});

export default App;
