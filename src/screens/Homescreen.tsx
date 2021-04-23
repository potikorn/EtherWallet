/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

// Import ethers
import {ethers, Wallet} from 'ethers';
import {RouteProp, useRoute} from '@react-navigation/core';

type ParamList = {
  Create: {
    mnemonic: string;
  };
};

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState('0.00');
  // const [revealToggleWallet, setToggleRevealWallet] = useState(false);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [toggleSend, setToggleSend] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<ParamList, 'Create'>>();

  const provider = useMemo(() => {
    return new ethers.providers.InfuraProvider(
      'rinkeby',
      '0281668706ef497bb4b6462de92a2128',
    );
  }, []);

  const etherScanProvider = useMemo(() => {
    return new ethers.providers.EtherscanProvider(
      'rinkeby',
      'J919TQKH6E39IKH3UQSZUGRDJV1RI4QKV9',
    );
  }, []);

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  useEffect(() => {
    const walletRandom = ethers.Wallet.fromMnemonic(route.params.mnemonic);
    const walletConnectProvider = new ethers.Wallet(
      walletRandom.privateKey,
      provider,
    );
    etherScanProvider
      .getHistory(walletConnectProvider.address)
      .then(history => {
        console.log('history::', history);
      })
      .catch(e => console.log('error::get history:', e));
    console.log('wallet', walletConnectProvider);
    provider
      .getTransactionCount(walletConnectProvider.address)
      .then(transactionCount => {
        console.log('Total Transactions Ever Sent: ' + transactionCount);
      });
    // provider.getBlockNumber().then(_blockNumber => {
    //   console.log('Current block number: ' + _blockNumber);
    //   provider.getBlock(_blockNumber).then(_hash => {
    //     console.log('_hash', _hash);
    //     provider.getTransaction(_hash.parentHash).then(transaction => {
    //       console.log('transaction::', transaction);
    //     });
    //   });
    //   return _blockNumber;
    // });

    provider.getGasPrice().then(gasPrice => {
      // gasPrice is a BigNumber; convert it to a decimal string
      const gasPriceString = gasPrice.toString();

      console.log('Current gas price: ' + gasPriceString);
    });

    provider.getBalance(walletConnectProvider.address).then(_balance => {
      // console.log('balance', _balance);
      setWallet(walletConnectProvider);
      const formatBalance = ethers.utils.formatEther(_balance);
      setBalance(formatBalance);
    });
  }, [etherScanProvider, provider, route.params.mnemonic]);

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
              {/* <TouchableHighlight
                disabled={wallet === null}
                onPress={() => setToggleRevealWallet(!revealToggleWallet)}>
                <Text style={styles.textButton}>{`${
                  revealToggleWallet ? 'Hidden' : 'Reveal'
                } phrase keyword`}</Text>
              </TouchableHighlight>
              {revealToggleWallet && (
                <View>
                  <Text>{wallet?.mnemonic}</Text>
                </View>
              )} */}
              <Text>Balance:</Text>
              <Text style={styles.balanceText}>{`${balance} ETH`}</Text>
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
                      onChangeText={setToAddress}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Value"
                      style={{...styles.textInput, marginTop: 10}}
                      onChangeText={setAmount}
                    />
                    {/* <TextInput
                      keyboardType="numeric"
                      placeholder="Gas price"
                      style={{...styles.textInput, marginTop: 10}}
                    /> */}
                    <View style={{marginTop: 16}}>
                      <Button
                        disabled={loading}
                        onPress={() => {
                          setLoading(true);
                          let sendPromise = wallet.sendTransaction({
                            // from: wallet.address,
                            to: toAddress, //get from text input
                            value: ethers.utils.parseEther(amount),
                          });
                          sendPromise.then(tx => {
                            console.log('tx', tx);
                            setLoading(false);
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
  balanceText: {
    fontSize: 24,
  },
});

export default HomeScreen;
