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
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

//add product
export function addNewProduct(product) {
    return async (dispatch) => {
        dispatch(addProduct());
        try {
            await axiosClient.post('/products', product);

            dispatch(addProductSuccess(product));

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product added',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            dispatch(addProductError());
            Swal.fire({
                icon: 'error',
                title: 'There was an error',
                text: 'Try again please',
            });
        }
    };
}

const addProduct = () => ({
    type: ADD_PRODUCT,
});

const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
});

const addProductError = () => ({
    type: ADD_PRODUCT_ERROR,
});

//get products
export function getAllProducts() {
    return async (dispatch) => {
        dispatch(getProducts());
        try {
            const response = await axiosClient.get('/products');
            //console.log(response.data)
            dispatch(getProductsSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(getProductsError());
        }
    };
}
const getProducts = () => ({
    type: DOWNLOAD_PRODUCTS,
});
const getProductsSuccess = (products) => ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products,
});
const getProductsError = () => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
});

//delete product
export function DeleteProduct(id) {
    return async (dispatch) => {
        dispatch(getProductDelete(id));
        console.log(id);

        try {
            await axiosClient.delete(`products/${id}`);
            dispatch(deleteProductSuccess(id));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product deleted',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            dispatch(deleteProductError());
        }
    };
}

const getProductDelete = (id) => ({
    type: GET_DELETE_PRODUCT,
    payload: id,
});
const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS,
});
const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
});

//edit product
export function getEditProduct(product) {
    return (dispatch) => {
        dispatch(getProductEdit(product));
    };
}



export function editProduct(product) {
    return async (dispatch) => {

        try {
            await axiosClient.put(`products/${product.id}`, product)
            dispatch(editProductSuccess(product))
        } catch (error) {
            console.log(error)
            dispatch(editProductError())
        }
    };
}

const getProductEdit = (product) => ({
    type: GET_EDIT_PRODUCT,
    payload: product,
});

const editProductSuccess = (product) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
});
const editProductError = () => ({
    type: EDIT_PRODUCT_ERROR,
});
