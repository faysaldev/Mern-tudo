import { useState } from "react"

function Todo({text,_id,DeleteHandler,editeHandler,update,setUpdate}) {
    const [updateInput,setUpdateInput]=useState(text);

    return (
        <div>
           {update?(<><input type="text" value={updateInput} onChange={(e)=> setUpdateInput(e.target.value)} /> <button onClick={()=>editeHandler(_id)}>Update</button></>):(<> <h3>{text}</h3>
            <div className="buttons">
                <button onClick={()=>setUpdate(true)}>Edite</button>
                <button onClick={()=>DeleteHandler(_id)}>Delete</button>
            </div></>)}
        </div>
    )
}

export default Todo
