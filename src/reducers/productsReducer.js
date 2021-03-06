import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    GET_DELETE_PRODUCT,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR,
    EDIT_PRODUCT_SUCCESS,
    GET_EDIT_PRODUCT,
} from './../types';

const initialState = {
    products: [],
    error: null,
    loading: false,
    productDelete: null,
    productEdit: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DOWNLOAD_PRODUCTS:
        case ADD_PRODUCT:
            return { ...state, loading: true };

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: [...state.products, action.payload],
            };
        case DELETE_PRODUCT_ERROR:
        case DOWNLOAD_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return { ...state, loading: false, error: true, productEdit:null };
        case DOWNLOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload,
            };
        case GET_DELETE_PRODUCT:
            return { ...state, productDelete: action.payload };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== state.productDelete
                ),
                productDelete: null,
            };
        case GET_EDIT_PRODUCT:
            return { ...state, productEdit: action.payload };
        case EDIT_PRODUCT_SUCCESS:
            return {...state, productEdit:null, products: [state.products.map(product => product.id === action.payload.id ? product = action.payload : product)]}
        default:
            return state;
    }
}
