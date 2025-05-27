import '../App.css'
export default function Users({ id, name, email, DeletUsers, UserId }) {

    return (
        <>
            <div className="container w-1/5">
                <p>Id : {id}</p>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
                <div className="flex py-4">
                    <button onClick={()=>{
                        UserId(id);
                    }} className='btn u'>Update</button>
                    <button onClick={(e) => {
                        DeletUsers(e, id);
                    }} className='btn bg-red-500 hover:bg-red-950'>Delete</button>
                </div>
            </div>
        </>
    )
}
