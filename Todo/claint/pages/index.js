import {useEffect, useState} from 'react'
import Todo from '../components/Todo';
import Pusher from 'pusher-js'
import axios from 'axios'

function index() {

  const [input,setInput]=useState('');
      const [update,setUpdate]=useState(false);

  const [alltodos,setAlltodos]=useState([])

  const clickHandler=(e)=>{
    e.preventDefault()
      // fetch('http://localhost:7000/todo/post', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body:{"text":input},
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //    setAlltodos([...alltodos,data]);
      //   });

      //   setInput('')
  }



  const editeHandler=(id,data)=>{
    alert(id)
      axios.patch(`http://localhost:7000/todo/update/${id}`,data)
    .then(response => {
      response && setAlltodos(deleteItems) 
      })
      .catch(error => {
          console.log(error);
      })

      setUpdate(false);
  }

  const DeleteHandler=(id)=>{
    const deleteItems = alltodos.filter(item => item._id !== id);
    
    axios.delete(`http://localhost:7000/todo/delete/${id}`)
    .then(response => {
      response && setAlltodos(deleteItems) 
      })
      .catch(error => {
          console.log(error);
      })
  }


  useEffect(()=>{
    fetch('http://localhost:7000/all').then((response)=> response.json()).then((data)=>setAlltodos(data)).catch((error)=> console.log(error));
  },[]);


  useEffect(()=>{
        const pusher = new Pusher('5f231fdf5bd1effe2383', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      //const todoData = JSON.stringify(data);
      setAlltodos([...alltodos,data]);
    });
  },[alltodos]);
  
  return (
    <div>
        <main>
            <form>
                <input type="text" placeholder="Type a Todo" value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button type="submit" onClick={clickHandler}>Add</button>
            </form>

            <div className="alltodo">
                {alltodos?.map(({text,_id})=>(
                  <Todo DeleteHandler={DeleteHandler} setUpdate={setUpdate} update={update} editeHandler={editeHandler} text={text} _id={_id} key={_id} />
                ))}
            </div>
        </main>
    </div>
  )
}

export default index
