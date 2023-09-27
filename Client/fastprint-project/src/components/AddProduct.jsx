import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postAddProduct, postEditProduct } from "../store/actions/action";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function AddProduct({ setModal, value }) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [form, setForm] = useState({
    name_product: "",
    price: "",
    category_id: "1",
    status_id: "1",
  });
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setForm({
        name_product: value?.name_product,
        price: value?.price,
        category_id: value?.Category?.id,
        status_id: "1", 
      });
    }
  }, [value]);
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const product = useSelector((state) => {
    return state.counterReducerProduct.product;
  });
  const handleAddProduct = (event) => {
    event.preventDefault()
    if (form.name_product === "" || form.name_product === undefined) {
        setIsError(true)
        setErrorMessage("Name Product Cannot be Empty!!")
        return
    } else if (form.price === "" || form.price === undefined) {
        setIsError(true)
        setErrorMessage("Price Cannot be Empty!!")
        return
    } 
    if (value === null) {
        dispatch(postAddProduct(form));
        setModal(false)
    } else  {
        dispatch(postEditProduct(form, value.id))
        setModal(false)
    }
  };
  return (
    <div className="bg-black/30 z-[1000000] w-screen h-screen fixed top-0 left-0">
      <div className="fixed top-[30%] left-[25%] w-[50%] bg-slate-300 rounded-xl">
        <div className="modal-box">
          <h3 className="font-bold text-2xl my-5">Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="mb-6">
              <label className=" text-xl font-semibold">Name Product</label>
              <div className="flex justify-center">
                <input
                  onChange={handleChange}
                  value={form.name_product}
                  name="name_product"
                  type="text"
                  id="name"
                  className="bg-gray-50 border-2 focus:outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-[50%] p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              {isError && errorMessage.includes("Product") && <p className="text-red-600 font-semibold">{errorMessage}</p>}
            </div>
            <div className="mb-6">
              <label className=" text-xl font-semibold">Price</label>
              <div className="flex justify-center">
                <input
                  onChange={handleChange}
                  value={form.price}
                  name="price"
                  type="number"
                  id="price"
                  className="bg-gray-50 border-2 focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  w-[50%] p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              {isError && errorMessage.includes("Price") && <p className="text-red-600 font-semibold">{errorMessage}</p>}
            </div>
            <div className="mb-6 flex justify-center">
              <div>
                <label className="mb-3 text-xl font-semibold">
                  Categories :{" "}
                </label>
                <select
                  name="category_id"
                  onChange={handleChange}
                  value={form.category_id}
                  className="select select-info w-full bg-white p-2 px-4"
                >
                  {product.map((el) => {
                    return (
                      <option key={el.id} value={el.category_id}>
                        {el.Category.name_category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-8 mb-6">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="flex font-semibold justify-center text-center bg-red-500 hover:bg-red-600 p-2 px-4 rounded-xl text-white"
              >
                Cancel <FaArrowLeft className="relative top-1 left-1" />
              </button>
              <button
                type="submit"
                className="flex font-semibold justify-center text-center bg-success-400 hover:bg-success-500 p-2 px-4 rounded-xl text-white"
              >
                Submit <FaSave className="relative top-1 left-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
