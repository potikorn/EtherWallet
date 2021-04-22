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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
          <TouchableHighlight
            disabled={wallet === null}
            onPress={() => setToggleRevealWallet(true)}>
            <Text style={styles.textButton}>Reveal phrase keyword</Text>
          </TouchableHighlight>
          {revealToggleWallet && <Text>{wallet?.mnemonic}</Text>}
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
});

export default App;
