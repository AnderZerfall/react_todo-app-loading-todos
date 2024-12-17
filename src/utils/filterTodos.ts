import { StatusFilter } from '../types/StatusFilter';
import { Todo } from '../types/Todo';

export const filterTodos = (status: StatusFilter, todos: Todo[]) => {
  return todos.filter(todo => {
    if (status === StatusFilter.Completed) {
      return todo.completed;
    }

    if (status === StatusFilter.Active) {
      return !todo.completed;
    }

    return true;
  });
};
