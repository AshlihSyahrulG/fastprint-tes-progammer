export function counterReducerProduct(state = {product:[]}, action){
    switch (action.type) {
        case 'product/fetchSuccess':
            return {product: action.payload}
        default:
            return state
    }
}