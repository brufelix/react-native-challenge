import React from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { getProductQuery, queryKeys } from '@/common/queries';
import { toCurrency } from '@/utils/to-currency.util';

// Definição do tipo para representar um produto
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function HomeScreen() {
  // Obtendo listagens de produtos
  const productsQuery = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [queryKeys.list],
    queryFn: getProductQuery,
  });

  // Preparando dados com preços e informações ajustadas
  const items = (productsQuery.data || []).map(product => {
    const finalPrice = product.price - (product.price * 0.1);

    return {
      ...product,
      discountPrice: finalPrice,
      discountPercentage: 10,
      installmentPlan: `12 x ${toCurrency((finalPrice / 12).toFixed(2))} sem juros`,
    };
  });

  if (productsQuery.isFetching || productsQuery.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Promoções</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <Card {...item} isHorizontal recommendedProducts={items.filter(p => p.id !== item.id)} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      <Text style={styles.sectionTitle}>Todos os Produtos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <Card {...item} recommendedProducts={items.filter(p => p.id !== item.id)} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.verticalListContainer}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
    marginVertical: 8,
  },
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 30,
  },
  verticalListContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});