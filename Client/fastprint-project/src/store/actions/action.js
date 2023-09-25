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