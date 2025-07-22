import HeaderPosts from '@/components/HeaderPosts';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { useAuth } from '../../core/auth/context';
import { searchPosts } from '../../core/posts/api';
import { usePosts } from '../../core/posts/usePosts';

const backgroundImage = require('@/assets/images/BG.png');

export default function Index() {
  const { posts, isLoading, error, refetch } = usePosts();
  const router = useRouter();
  const { user, token } = useAuth();
  const isTeacher = user?.role === 'teacher';

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length === 0) {
      setFilteredPosts(posts);
      return;
    }
    try {
      const result = await searchPosts(text, token || '');
      setFilteredPosts(result);
    } catch {
      // erro ao buscar posts — silenciosamente ignorado
    }
  };

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
      <HeaderPosts
        titleImage={require('@/assets/images/LOGO.png')}
      />
      {isTeacher && (
        <RoundedButton title="Criar novo post" onPress={() => router.push('/create')} />
      )}
      <View style={styles.container}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            borderRadius: 8,
            padding: 10,
            marginBottom: 16,
            marginTop: 10,
            fontFamily: 'Inter-Regular',
            fontSize: 16,
            color: '#333',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          }}
          placeholder="Buscar posts..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
          data={filteredPosts}
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
                  <Text style={styles.postContent} numberOfLines={3}>{item.conteudo}</Text>
                  <Text style={styles.postContent}>Autor: {item.autor}</Text>
                  <Text style={styles.saibaMais}>Clique para saber mais</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    minHeight: 100,
    overflow: 'hidden',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#30437D',
    fontFamily: 'Inter-Bold',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  saibaMais: {
    marginTop: 15,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
  },
});