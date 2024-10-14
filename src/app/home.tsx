import { Text, View, FlatList } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets,} from 'react-native-safe-area-context';

import Header from '@/components/Header'
import Button from '@/components/Button';
import TodoListItem from '@/components/TodoItem';

import { colors } from '@/styles/tokens';
import { Todo, useBoundStore } from '@/storage/todo';

function Home() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const { todos, checkTodo } = useBoundStore();

  const [progress, complete] = todos.reduce<[Todo[], Todo[]]>((prev, curr) => {
    if(curr.checked) {
      prev[1] = [...prev[1], curr];
    } else {
      prev[0] = [...prev[0], curr];
    }

    return prev;
  }, [[], []]);

  return (
    <>
      <View
        className="p-5 gap-10 justify-center items-center bg-secundary pb-28 mb-2"
        style={{ paddingTop: insets.top + 20 }}
      >
        <Header.Root>
          <Header.Icon onPress={router.back}>
            <Feather name="chevron-left" size={30} color={colors.primary} />
          </Header.Icon>

          <Header.Text>Bem vindo Usuário Fulano</Header.Text>
        </Header.Root>

        <Text className="text-white text-3xl">Minha lista de tarefas</Text>
      </View>

      <View className="bg-primary mx-5 rounded-xl px-5 py-4 gap-4 flex-1 overflow-hidden">
        <Text className="text-white text-lg font-bold">A Fazer</Text>

        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={progress}
          ListEmptyComponent={() => (
            <Text className='text-white'>Você não tem nenhuma tarefa em progresso</Text>
          )}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <TodoListItem onChange={checkTodo} {...item} />}
        />

        <Text className="text-white text-lg font-bold">Completas</Text>

        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={complete}
          ListEmptyComponent={() => (
            <Text className='text-white'>Você não completou nenhuma tarefa</Text>
          )}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <TodoListItem onChange={checkTodo} {...item} />}
        />
      </View>

      <View className="mx-5 mt-5">
        <Button onPress={() => router.navigate('/create-todo')}>Adicionar</Button>
      </View>
    </>
  )
}

export default Home;
