import { Card } from '@/components/ui/Card';
import { useRoute, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

// Representação do produto
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  installmentPlan: string;
}

// Definição do tipo dos parâmetros que a tela espera receber
interface ProductDetailsRouteParams {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  installmentPlan: string;
  recommendedProducts: Product[]
}

type ProductDetailsRouteProp = RouteProp<{ ProductDetails: ProductDetailsRouteParams }, 'ProductDetails'>;

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const route = useRoute<ProductDetailsRouteProp>();
  const { id, title, description, price, discountPrice, discountPercentage, image, installmentPlan, recommendedProducts } = route.params;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 16 }}>
      <Text style={styles.description}>{description}</Text>
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={styles.price}>{`Total: ${discountPrice.toFixed(2)}`}</Text>
      <Text style={styles.installment}>{installmentPlan}</Text>
      <Text style={styles.deliveryInfo}>Chegará grátis entre 12 e 18/jan</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buttonText}>Comprar Agora</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

      <Text style={styles.recommendedText}>Quem viu este produto também comprou</Text>
      <FlatList
        horizontal
        data={recommendedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card {...item} isHorizontal />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendationList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  installment: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  deliveryInfo: {
    color: 'green',
    fontSize: 14,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  buyNowButton: {
    backgroundColor: '#007bff',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#ffc107',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  recommendedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recommendationList: {
    paddingBottom: 16,
  },
  recommendationCard: {
    width: 120,
    marginRight: 16,
  },
  recommendationImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  recommendationTitle: {
    fontSize: 14,
    marginVertical: 4,
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});


