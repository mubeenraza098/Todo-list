"use client"
import { useState } from "react"


export default function home(){
 // define state 
 const [todos,setTodos]=useState([
    {movie:"mujrim",id:1},
   
 ]);
 const [inputVal,setInput]=useState("") 
const [id,setId]=useState(0)


// function
const additems=()=>{
  let obj:any=todos.find(item => item.id==id)
  if(obj){
    let newArray=todos.filter(item=> item.id !== obj.id)
    setTodos([...newArray,{movie:inputVal,id:id}])
setInput(" ")
setId(0)
return
  }

setTodos([...todos,{movie:inputVal,id:id}])
setInput(" ")
setId(0)
}

const edititem=(id:any)=>{
  let obj:any=todos.find(item =>item.id==id)
  setInput(obj.movie)
  setId(obj.id)
}
const dltitem=(id:any)=>{
  let newArray=todos.filter(item=> item.id !== id)
  setTodos([...newArray])
}

return(
 <div className="max-w-4xl mx-auto p-5"> 
 <p className="text-center text-[40px]">Movies Todo List</p>
 
 {/* input div start */}
 <div className="flex justify-between gap-4 mt-5">
    <input type="text" onChange={(e)=>setInput(e.target.value)} value={inputVal}
     className="w-[60%] ml-2 p-2  border-b focus:outline-none text-lg" placeholder="Enter movie name" />
    
    <input type="number" value={id} onChange={(e:any)=>setId(e.target.value)}
    className="w-[20%] ml-2 p-2 border-b focus:outline-none text-lg" placeholder="Enter ID" />

    <button onClick={additems} className="w-[20%] bg-blue-500 text-white p-2 rounded hover:bg-blue-400">Add Movies</button>
 </div>
 <p className="text-center text-[30px] underline mt-7">Movies List</p>
 {/* card start hein */}
 {/* ye grid ka hai  */}
 <div className="grid grid-cols-2 gap-4 mt-5">
  {/* ye cards bnae hain  */}
  {
    todos.map((item:any ,i:any)=>{
        return(
            <div className="shadow p-4 rounded" key={i}>
    <div className="flex justify-between">
        <span className="shadow rounded-full pl-2 py-0.5 w-7 h-7">{i+1}</span>
        <span onClick={()=>dltitem(item.id)} className="shadow rounded-full pl-2 py-0.5 w-7 h-7 text-red-500 cursor-pointer">X</span>
    </div>
    <div className="mt-5 text-gray-600 text-[30px]">{item.movie}</div>
    <div ><h2 className="text-right cursor-pointer" onClick={()=>edititem(item.id)}>Edit</h2>
    
    </div>
  </div>
        )
    })
  }
</div>
 
 {/* ye main div hai  */}
 </div>
 
)

}


