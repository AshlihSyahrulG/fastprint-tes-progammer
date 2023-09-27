export function fetchProduct(){
    return async (dispatch) => {
        const data = await fetch("http://localhost:3000/product")
        const result = await data.json()
        dispatch({
            type: 'product/fetchSuccess',
            payload : result
        })
    }
}

export  function postDeleteProduct(id) {
    // Default options are marked with *
    return (async(dispatch) => {
      const response = await fetch('http://localhost:3000/product/' + id, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      dispatch(fetchProduct())
    })
  }

  export function postAddProduct(data) {
    // Default options are marked with *
    return (async(dispatch) => {
      const response = await fetch('http://localhost:3000/product', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      dispatch(fetchProduct())
    })
  }

  export function postEditProduct(data, id) {
    // Default options are marked with *
    return (async(dispatch) => {
      const response = await fetch('http://localhost:3000/product/' + id, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      dispatch(fetchProduct())
    })
  }