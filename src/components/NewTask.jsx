import { useState } from "react"
export default function Newtask({onAdd}) {
    const [enteredTask, setEnterTask] = useState('')
    function handleChange(event) {
        setEnterTask(event.target.value)
    }
    function handleClick(){
        if (enteredTask.trim() ===''){
            return
        }
        onAdd(enteredTask)
        setEnterTask('')
    }
    return <div className="flex items-center gap-4">
        <input onChange={handleChange} value={enteredTask} className="w-64 px-2 py-1 rounded-sm bg-stone-200" type='text' />
        <button onClick={handleClick}  className="text-stone-700 hover:text-stone-900 "> Add Task</button>
    </div>
}