import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario')
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = { title, body, author};
        console.log(blog);
        setIsPending(true);
        fetch('http://localhost:8000/blogs',{
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(blog),
        }).then(()=> {
            console.log('New blog added');
            setIsPending(false);
            history.push('/');
        })
    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    value={title}
                    type="text"
                    required
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    value={body}
                    required
                    onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Blog author: </label>
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="nik">nikhil</option>
                </select>
               { !isPending && <button> Add blog</button>}
               { isPending && <button disabled> Adding blog...</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>

        </div>
      );
}
 
export default Create;