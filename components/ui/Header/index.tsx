import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {navigation.canGoBack() && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      )}
      <Image
        source={require('@/assets/images/frontend-challege-img.png')}
        style={styles.headerImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,           // Espaçamento superior maior para descer o header
    height: 60,              // Altura do header
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
  },
  headerImage: {
    height: 40,
    width: 200,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 15,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
