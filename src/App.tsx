/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import TodoPage from './pages/todoPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index path='/' element={<TodoPage></TodoPage>}></Route>
      </Route>
    )
  )
  

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App
