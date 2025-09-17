import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos, moveTodo, removeTodo } from '~/services/todo';

export function useGetTodos() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    select: (response) => response.data,
  });

  return {
    todos: data,
  };
}

export function useMoveTodo() {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isIdle } = useMutation({
    mutationFn: moveTodo,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return {
    move: mutate,
    isSuccess,
    isLoading: !isIdle,
  };
}
export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isIdle } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return {
    create: mutate,
    isSuccess,
    isLoading: !isIdle,
  };
}

export function useRemoveTodo() {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isIdle } = useMutation({
    mutationKey: ['removeTodo'],
    mutationFn: removeTodo,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return {
    remove: mutate,
    isSuccess,
    isLoading: !isIdle,
  };
}
