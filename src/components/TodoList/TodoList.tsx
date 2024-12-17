import { TodoPlate } from '../TodoPlate/TodoPlate';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <TodoPlate todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
