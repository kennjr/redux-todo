/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { CompleteActions, FilterOptions, Todo, addTodo, clearSearch, completeAllTodos, filterTodos, removeTodo, searchTodos, updateTodoCompletionState } from '../features/todo/todoSlice';
import { PlusIcon, MagnifyingGlassIcon, XMarkIcon, TrashIcon, CheckIcon } from '@heroicons/react/16/solid'
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../components/todoItem';

const TodoPage = () => {
    const [newTodo, setNewTodo] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { todos, loading, filter } = useSelector((state) => state.todo);

    const dispatch = useDispatch();

    const addNewTodo = () => {
        if(newTodo.trim() !== ""){
            dispatch(addTodo({todoString: newTodo.trim()}));
            setNewTodo("");
        }
    }

    const updateTodosFilter = (filter: number) => {
        switch (filter) {
            case 1:
                // filter for completed tasks
                dispatch(filterTodos({predicate: FilterOptions.COMPLETED}))
                break;
            case 2:
                // filter for incompleted tasks
                dispatch(filterTodos({predicate: FilterOptions.INCOMPLETE}))
                break;
            default:
                dispatch(filterTodos({predicate: FilterOptions.DEFAULT}))
                break;
        }
    }

    const executeSearchQuery = () => {
        if(searchQuery.trim() !== ""){
            dispatch(searchTodos({query: searchQuery.trim().toLowerCase()}))
        }
    }

    const markAllTasksComplete = () => {
        dispatch(completeAllTodos())
    }

    const updateSearchQuery = (query: string) => {
        if(query.trim() == ""){
            dispatch(clearSearch())
        }
        setSearchQuery(query)
    }

    const updateTaskCompletion = (todo: Todo) => {
        const action = CompleteActions.TOGGLE;
        dispatch(updateTodoCompletionState({id: todo.id, updateAction: action}))
    }

    const deleteTask = (todo: Todo) => {
        dispatch(removeTodo({id: todo.id}))
    }

    return (
        <main className='flex flex-col max-w-4xl min-h-screen md:min-h-fit mx-auto sm:mt-8 p-4 md:px-4 md:pt-4 md:pb-12 bg-gray-100 rounded-sm'>
            <div className="flex flex-row justify-center items-center space-x-4 mt-3 mb-6">
                <h2 className='text-2xl font-bold uppercase text-center'>Redux TODO</h2>

                {(todos.length > 0 && loading) && <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 animate-spin text-gray-300 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>}
            </div>

            {/* input field and btn for new todo */}
            <section className='flex items-center mb-4 space-x-4'>
                <input type="text" name='todo' id='addTodo' value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder='What are you planning?' className='flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500' />
                <PlusIcon onClick={() => addNewTodo()} className='h-8 w-8 p-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none'/>
            </section>

            {/* search and filtering section */}
            <section className='flex flex-col md:flex-row justify-start md:justify-between items-center space-y-4 md:space-y-0'>
                <div className='flex flex-row items-center space-x-4 justify-between md:justify-start'>
                    <div>
                        <select
                            onChange={(event) => {updateTodosFilter(parseInt(event.target.value))}}
                            id="tasksFilter"
                            name="tasksFilter"
                            className="mt-1 block w-full rounded-md bg-white border-gray-300 py-3 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            defaultValue="0">
                            <option value={0}>Default</option>
                            <option value={1}>Completed</option>
                            <option value={2}>Incomplete</option>
                        </select>
                    </div>
                    <button onClick={() => markAllTasksComplete()} className='rounded-md bg-green-700 hover:bg-green-600 focus:outline-none px-4 py-1 text-white'>Mark All Complete</button>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <input type="text" name='search' id='searchTasks' value={searchQuery} onChange={(event) => updateSearchQuery(event.target.value)} placeholder='Search...' className='flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500' />
                    <MagnifyingGlassIcon onClick={() => executeSearchQuery()} className='h-8 w-8 p-1.5 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none'/>
                </div>
            </section>

            {/* the tasks section */}
            <section className='px-4 pt-4'>
                { todos.length > 0 && <div>
                    { todos.map((todo, index) => {
                        return <TodoItem key={index} index={index+1} 
                        todo={todo} 
                        updateCompletion={() => updateTaskCompletion(todo)} 
                        deleteTodo={() => deleteTask(todo)}/>
                    }) }
                </div> }
                { todos.length <= 0 && <div className='mt-12 text-center'>
                    {/* show the appropriate msg based on the current filter */}
                    { filter == FilterOptions.DEFAULT ? 
                    <span className='subpixel-antialiased italic text-lg text-gray-500 text-center'>Start planning your day. <br /> Add your first task though the input field at the top.</span> : 
                    <span className='subpixel-antialiased italic text-lg text-gray-500 text-center'>No todos with the selected filter</span> }
                </div> }
            </section>
        </main>
    )
}
export default TodoPage