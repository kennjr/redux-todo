import { XMarkIcon, TrashIcon, CheckIcon } from '@heroicons/react/16/solid'
import ToggleItem from './toggleItem'

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// passed the 4 props we'll need for each item
const TodoItem = ({index, todo, updateCompletion, deleteTodo}) => {
    // basic styling for the action btns to the right/below the todo text
    const actionButtonClasses = "rounded-md h-8 w-8 p-1.5"

    return (
        <div className="mt-2 flex flex-col md:flex-row justify-start md:items-center md:justify-between space-y-2 md:space-y-0 py-2 border-b border-solid">
            <div className="flex flex-row items-center space-x-2">
                <span className="text-gray-600 text-base">{index}.</span>
                <p className={classNames(todo.complete ? 'line-through' : 'no-underline', "text-lg line-clamp-1")}>{todo.todoString}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <TrashIcon onClick={deleteTodo} className={`${actionButtonClasses} text-white bg-red-500`}/>
                <ToggleItem enabled={todo.complete} setEnabled={updateCompletion}/>
                {/* This is another way of updating completion state, a bit boring though */}
                {/* { todo.complete ? <XMarkIcon className={`${actionButtonClasses} text-white bg-yellow-500`}/> : <CheckIcon className={`${actionButtonClasses} text-white bg-green-500`}/>} */}
            </div>
        </div>
    )
}
export default TodoItem