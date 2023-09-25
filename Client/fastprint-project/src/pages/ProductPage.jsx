import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../store/actions/action"


function ProductPage(){
    const dispatch = useDispatch()
    const product = useSelector((state) => {
        return state.counterReducerProduct.product
    })
    console.log(product);
    useEffect(() => {
        dispatch(fetchProduct())
      },[])
    return (
        <>
            <button className="btn btn-warning">Add New Product</button>
                <p></p>
                <div className="stats shadow">
                <div className="stat">
                <h1 style={{fontFamily:'cursive', fontSize:'50px'}}> Product </h1>
                </div>
                </div>
                <div className="overflow-x-auto">
            <table className="table w-full">
            {/* head */}
            <thead>
            <tr>
                <th>No</th>
                <th>Name Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            {product?.map((el,id)=>{
                return (
                <tr key={el.id}>
                <th >{id+1}</th>
                <td>{el.name_product}</td>
                <td>{el.Category.name_category}</td>
                <td>{el.Status.name_status}</td>
                <td>Rp.{el.price}</td>
                <td>
                <button className="btn btn-primary">Edit</button>
                <button onClick={() => {handleDelete(el.id)}} className="btn btn-accent">Delete</button>
                </td>
                </tr>
                 )
            })} 
            </tbody>
        </table>
        </div>
        </>
    )
}

export default ProductPage