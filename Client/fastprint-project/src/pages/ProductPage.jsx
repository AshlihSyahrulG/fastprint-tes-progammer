import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, postDeleteProduct } from "../store/actions/action";
import AddProduct from "../components/AddProduct";
import { CustomTable } from "../components/tables";
import {
  FaAdjust,
  FaArrowLeft,
  FaBackspace,
  FaEdit,
  FaPlus,
  FaPlusCircle,
  FaProductHunt,
  FaSave,
} from "react-icons/fa";
const TABLE_HEADER = [
  {
    id: "name_product",
    title: "Product Name",
    filter_type: "text",
    minSize: 120,
  },
  {
    id: "price",
    title: "Price",
    filter_type: "INT",
    minSize: 120,
  },
  {
    id: "Category.name_category",
    title: "Category",
    filter_type: "text",
    minSize: 120,
  },
  {
    id: "createdAt",
    title: "Pubslished At",
    filter_type: "date",
    minSize: 120,
  },
];
function ProductPage() {
  const dispatch = useDispatch();
  const [filterView, setFilterView] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const product = useSelector((state) => {
    return state.counterReducerProduct.product;
  });
  const [value, setValue] = useState(null);
  const handleDelete = (id) => {
    dispatch(postDeleteProduct(id));
  };
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  return (
    <>
      <div className="flex justify-between h-[80px] bg-primary-500 fixed w-screen top-0 left-0 z-[1000]">
        <div className="flex justify-center flex-col ml-6">
          <h1 className="text-white text-center text-4xl font-semibold">
            List Product
          </h1>
        </div>
        <div className="flex justify-center flex-col mr-10 text-white">
          <FaProductHunt className="text-4xl" />
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <h1 className="text-4xl font-bold">
          Product List With React Tanstack Table
        </h1>
      </div>
      {modalAdd && <AddProduct setModal={setModalAdd} value={null} />}
      {value !== null && (
        <>
          {modalEdit && <AddProduct setModal={setModalEdit} value={value} />}
          {modalValidation && (
            <div className="bg-black/30 z-[1000000] w-screen h-screen fixed top-0 left-0">
              <div className="fixed top-[30%] left-[35%] w-[30%] bg-white border border-slate-300 rounded-xl">
                <div className="flex justify-center mt-10">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/000/450/587/original/delete-vector-icon.jpg"
                    alt="delete"
                    className="w-[200px] h-[200px]"
                  />
                </div>
                <div className="flex justify-center mt-4">
                    <h1 className="text-xl text-center font-medium">Are You sure you want to delete this item</h1>
                </div>
                <div className="flex justify-center gap-8 mb-6 mt-2">
                  <button
                    type="button"
                    onClick={() => setModalValidation(false)}
                    className="flex font-semibold justify-center text-center bg-success-400 hover:bg-success-500 p-2 px-4 rounded-xl text-white"
                  >
                    Cancel <FaSave className="relative top-1 left-1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(value.id);
                      setModalValidation(false);
                    }}
                    className="flex font-semibold justify-center text-center bg-red-500 hover:bg-red-600 p-2 px-4 rounded-xl text-white"
                  >
                    Delete <FaBackspace className="relative top-1 left-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div className="flex justify-between my-2">
        <button
          type="button"
          onClick={() => setModalAdd(true)}
          className="flex font-semibold justify-center text-center bg-success-400 hover:bg-success-500 p-2 px-4 rounded-xl text-white"
        >
          Add Product <FaPlusCircle className="relative top-1 left-1" />
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            disabled={value === null ? true : false}
            onClick={() => setModalEdit(true)}
            className="flex font-semibold justify-center text-center bg-warning-500 hover:bg-warning-600 p-2 px-4 rounded-xl text-white"
          >
            Edit Product <FaEdit className="relative top-1 left-1" />
          </button>
          <button
            type="button"
            onClick={() => setModalValidation(true)}
            disabled={value === null ? true : false}
            className="flex font-semibold justify-center text-center bg-primary-400 hover:bg-primary-500 p-2 px-4 rounded-xl text-white"
          >
            Delete <FaBackspace className="relative top-1 left-1" />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col mt-4">
        <CustomTable
          data={product}
          tableHeaders={TABLE_HEADER}
          tableMeta={{
            currentPage: 1,
            totalPage: 10,
            totalRecords: 100,
          }}
          filterView={filterView}
          setValue={setValue}
        />
                  
      </div>
    </>
  );
}

export default ProductPage;
