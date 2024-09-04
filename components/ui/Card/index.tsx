import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { toCurrency } from '@/utils/to-currency.util';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import { Product } from '@/types/product';

interface Props {
  id: number;
  title: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  description: string;
  installmentPlan: string;
  isHorizontal?: boolean;
  recommendedProducts?: Product[]
}

export const Card: React.FC<Props> = ({
  id,
  description,
  price,
  discountPrice,
  discountPercentage,
  title,
  image,
  installmentPlan,
  isHorizontal = false,
  recommendedProducts
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDarkMode = useThemeColor({ light: '', dark: '' }, 'background');
  const navigation = useNavigation();

  const descriptionText = useMemo(() => {
    return isHorizontal
      ? `${description.substring(0, 30)}...`
      : isExpanded
        ? description
        : description.substring(0, 100) + (description.length > 100 ? '...' : '');
  }, [isExpanded, isHorizontal, description]);

  const handlePress = () => {
    navigation.navigate('product-details', {
      id,
      description,
      price,
      discountPrice,
      discountPercentage,
      title,
      image,
      installmentPlan,
      isHorizontal,
      recommendedProducts
    })
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isHorizontal ? styles.cardHorizontal : styles.cardVertical,
      ]}
      onPress={handlePress}
      onLongPress={() => !isHorizontal && setIsExpanded(!isExpanded)}
    >
      <Image
        source={{ uri: image }}
        style={isHorizontal ? styles.horizontalImage : styles.image}
        resizeMode="contain"
      />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>{toCurrency(discountPrice)}</Text>
          <Text style={styles.discountPercentage}>{`${discountPercentage}% OFF`}</Text>
        </View>
        <Text style={styles.description}>{descriptionText}</Text>
        {!isHorizontal && (
          <Text style={styles.installmentPlan}>{installmentPlan}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
    paddingTop: 5
  },
  cardHorizontal: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#fff', // Certifique-se de manter o fundo visível
  },
  cardVertical: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
  },
  horizontalImage: {
    width: '100%',
    height: 80, // diminui a altura para garantir melhor visibilidade
    resizeMode: 'contain', // para ajustar imagem sem cortar
  },
  body: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  discountPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
  },
  description: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  installmentPlan: {
    fontSize: 12,
    color: '#666',
  },
});
