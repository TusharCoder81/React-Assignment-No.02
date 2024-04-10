import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Pagination from './Pagination';


function App() {
   const [data,setdata]=useState([]);
   const [currentPage,setCurrentPage]=useState(1);
   const [postPerPage,setPostPerPage]=useState(20);
   const [newTitle, setNewTitle] = useState('');
   const [editPostId, setEditPostId] = useState(null); 

   
   
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

    
    const addPost = async () => {
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/albums/", {
          title: newTitle,
        
         
        });
        setdata([...data, response.data]);
        setNewTitle(''); 
  
      } catch (error) {
        console.error('Error adding post: ', error);
      }
    };
    const updatePost = async (id, newTitle) => {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          title: newTitle
        });
        const updatedPosts = data.map(user => (user.id === id ? response.data : data));
        setdata(updatedPosts);
        setEditPostId(null); 
        setNewTitle(''); 
      } catch (error) {
        console.error('Error updating post: ', error);
      }
    };
  
    
    const handleEditClick = (id, currentTitle) => {
      setEditPostId(id);
      setNewTitle(currentTitle);
    };

    
    
    
 const lastPostIndex=currentPage*postPerPage;
 const firtPostIndex=lastPostIndex-postPerPage;
 const currentData=data.slice(firtPostIndex,lastPostIndex);

  return (
    <>
    <div>
      
    <div className="mb-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new post title"
          className="form-control"
        /><br/>
        <button onClick={addPost} className="btn btn-primary mt-2">Add Post</button>
      </div>
      <h1>Axios  Fetching</h1>
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
            <td><button onClick={(event)=>removeData(user.id)}>Delete</button></td>
            <td>
                {editPostId === user.id ? (
                  <button onClick={() => updatePost(user.id, newTitle)} className="btn btn-success me-2">Save</button>
                ) : (
                  <button onClick={() => handleEditClick(user.id, user.title)} className="btn btn-warning me-2">Edit</button>
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

export default App
