import { usePosts } from '../../core/posts/usePosts';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Index() {
  const { posts, isLoading, error, refetch } = usePosts();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Try Again" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item?._id?.toString() ?? index.toString()}
        renderItem={({ item }) => {
          // Defensively check if the item is valid before rendering
          if (!item) {
            return null;
          }
          return (
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{item.titulo}</Text>
              <Text style={styles.postContent}>{item.conteudo}</Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No posts found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});