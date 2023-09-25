export function counterReducerCategory(state = {category:[] }, action) {
    switch (action.type) {
      case 'category/fetchSuccess':
        return {category: action.payload}
      default:
        return state
    }
}