import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Pagination from './Pagination';


function App() {
   const [data,setdata]=useState([]);
   const [currentPage,setCurrentPage]=useState(1);
   const postPerPage=20;
   const [newTitle, setNewTitle] = useState('');
   const [editId, setEditId] = useState(null); 
   const lastPostIndex=currentPage*postPerPage;
   const firtPostIndex=lastPostIndex-postPerPage;
   const currentData=data.slice(firtPostIndex,lastPostIndex);


   useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/albums/")
    .then(res => setdata(res.data))
     .catch(err => console.log(err));
    },[])
  


    function removeData(id){
       axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
      const newData=data.filter((data)=>{
        return data.id!==id;
      })
      setdata(newData);
    }

    
    const addTitle = async () => {
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/albums/", {  title: newTitle,});
        setdata([...data, response.data]);
        setNewTitle(''); 
    } catch (error) {
        console.error('Error adding : ', error);
      }
    };



    const updateTitle = async (id, newTitle) => {
      try {
        const response = await axios.put(`
        https://jsonplaceholder.typicode.com/albums/${id}`, {
          id,
          title: newTitle
        });
        const updatedPosts = data.map(user => (user.id === id ?
           response.data : user));
        setdata(updatedPosts);
        setEditId(null); 
        setNewTitle(''); 
      } catch (error) {
        console.error('Error updating : ', error);
      }
    };
  
    
    const handleEditClick = (id, currentTitle) => {
      setEditId(id);
      setNewTitle(currentTitle);
    };
   
 

  return (
    <>
    <div>
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new title"
          className="input" />
          <br/>
          <button onClick={addTitle} className="add">Add Post</button>
      </div>

      <h1>Axios Fetching</h1>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
            {
            currentData.map((user,index)=>{
            return    <tr key={index}>
            <td>{user.id}</td>
            <td>{user.title}</td>
            <td><button className='deletebtn' onClick={(event)=>removeData(user.id)}>Delete</button></td>
            <td>
                {editId === user.id ? (
                  <button onClick={() => updateTitle(user.id,
                     newTitle)} className="savebtn">Save</button>
                ) : (
                  <button onClick={() => handleEditClick(user.id, 
                    user.title)} className="editbutton">Edit</button>
                )}
            </td>
            </tr>
          })
           }
        </tbody>
      </table>

      <Pagination totalPosts={data.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage}/>

    </div>
    </>
  )
}

export default App;
