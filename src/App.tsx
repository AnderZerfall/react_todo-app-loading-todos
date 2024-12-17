/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoCreate } from './components/TodoCreate/TodoCreate';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { getTodos } from './api/todos';
import { StatusFilter } from './types/StatusFilter';
import { filterTodos } from './utils/filterTodos';
import classNames from 'classnames';
import { ErrorType } from './types/ErrorType';
import React from 'react';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState(StatusFilter.All);
  const [errorType, setErrorType] = useState(ErrorType.NO_ERROR);

  useEffect(() => {
    const getTodosFromServer = async () => {
      // I decided to try async this time. That's just for my own practice.
      try {
        const todos = await getTodos(); // Also, it's supposed to be a bit more efficient.

        setTodoList(todos);
      } catch {
        // eslint-disable-next-line no-console
        console.warn('Impossible to download the todos');
        setErrorType(ErrorType.LOAD_TODOS);

        const timer = setTimeout(() => {
          setErrorType(ErrorType.NO_ERROR);
          clearTimeout(timer);
        }, 3000);
      }
    };

    getTodosFromServer();
  }, []);

  const filteredTodos = filterTodos(statusFilter, todoList);
  const countActiveTodos = todoList.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todoList.length > countActiveTodos;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoCreate />

        {todoList.length > 0 && (
          <>
            <TodoList todoList={filteredTodos} />
            <TodoFooter
              setStatusFilter={setStatusFilter}
              statusFilter={statusFilter}
              countActiveTodos={countActiveTodos}
              hasCompletedTodos={hasCompletedTodos}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorType === ErrorType.NO_ERROR },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorType(ErrorType.NO_ERROR)}
        />
        {errorType}
      </div>
    </div>
  );
};
