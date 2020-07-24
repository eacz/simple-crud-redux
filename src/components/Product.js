import React from 'react';
import {useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { DeleteProduct, getEditProduct } from '../actions/productsActions';
import Swal from 'sweetalert2';

const Product = ({ product }) => {
    const { id, name, price } = product;

    const history = useHistory()
    const redirectEdit = product => {
        dispatch(getEditProduct(product))
        history.push(`/products/edit/${product.id}`)
    }

    const dispatch = useDispatch();
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You can't get back the product deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                dispatch(DeleteProduct(id));
            }
        });

        
    };

    return (
        <tr>
            <td>{name}</td>
            <td>
                <span className="font-weight-bold">${price}</span>
            </td>
            <td className="actions">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={()=>redirectEdit(product)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default Product;
