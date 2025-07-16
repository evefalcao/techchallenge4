import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { useAuth } from '../../core/auth/context';
import { usePosts } from '../../core/posts/usePosts';
const backgroundImage = require('@/assets/images/BG.png');

export default function Index() {
  const { posts, isLoading, error, refetch } = usePosts();
  const router = useRouter();
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">

      <Header
        titleImage={require('@/assets/images/LOGO.png')}
        showBack

      />

      <View style={styles.container}>

        {isTeacher && (
          <Button title="Criar novo post" onPress={() => router.push('/create')} />
        )}

        <FlatList
          data={posts}
          keyExtractor={(item, index) => item?._id?.toString() ?? index.toString()}
          renderItem={({ item }) => {
            // Defensively check if the item is valid before rendering
            if (!item) {
              return null;
            }
            return (
              <Link href={`/post/${item._id}`} asChild>
                <TouchableOpacity style={styles.postContainer}>
                  <Text style={styles.postTitle}>{item.titulo}</Text>
                  <Text style={styles.postContent}>{item.conteudo}</Text>
                  <Text style={styles.postContent}>Autor: {item.autor}</Text>
                </TouchableOpacity>
              </Link>
            );
          }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>No posts found.</Text>
            </View>
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});