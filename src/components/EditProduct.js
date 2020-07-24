import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../actions/productsActions';
import {useHistory} from 'react-router-dom'

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
    });
    const { name, price } = product;

    const productEdit = useSelector((state) => state.products.productEdit);
    useEffect(() => {
        setProduct(productEdit);
    }, [productEdit]);

    //functions
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const dispatch = useDispatch();
    const history = useHistory()
    const SubmitEdit = (e) => {
        e.preventDefault();

        dispatch(editProduct(product));

        history.push('/')
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit product
                        </h2>
                        <form onSubmit={SubmitEdit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Product's name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Product's price"
                                    name="price"
                                    value={price}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Save changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
