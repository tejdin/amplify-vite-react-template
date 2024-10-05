import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [tables, setTables] = useState<Array<Schema["Tables"]["type"]>>([]);
  const [userReservations, setUserReservations] = useState<Array<Schema["userReservation"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    client.models.Tables.observeQuery().subscribe({
      next: (data) => setTables([...data.items]),
    });
    client.models.userReservation.observeQuery().subscribe({
      next: (data) => setUserReservations([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <h1>Tables</h1>
      <ul>
        {tables.map((table) => (
          <li key={table.id}>{table.size}</li>
        ))}
      </ul>
      <h1>User Reservations</h1>
      <ul>
        {userReservations.map((userReservation) => (
          <li key={userReservation.id}>{userReservation.startTime}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
