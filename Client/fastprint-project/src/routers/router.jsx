import {createBrowserRouter} from "react-router-dom";
import ProductPage from "../pages/productPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductPage/>,
    },
  ]);

  export default router 