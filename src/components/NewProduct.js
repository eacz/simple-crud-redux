import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlertAction, hideAlertAction } from '../actions/alertActions';
import { addNewProduct } from './../actions/productsActions';

const NewProduct = ({ history }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const dispatch = useDispatch();
    const addProduct = (product) => dispatch(addNewProduct(product));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || price <= 0) {
            const alert = {
                message: 'All fields are required.',
                classes:
                    'alert alert-danger text-center text-uppercase p2 mt-3 font-weight-bold',
            };
            dispatch(showAlertAction(alert));
            return;
        }

        dispatch(hideAlertAction());

        addProduct({ name, price });

        if (!error) {
            history.push('/');
        }
    };

    const alert = useSelector((state) => state.alert.alert);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add new product
                        </h2>

                        {alert ? (
                            <p className={alert.classes}>{alert.message}</p>
                        ) : null}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Product's name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Product's price"
                                    name="price"
                                    onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Add
                            </button>
                        </form>

                        {loading ? <p>Loading...</p> : null}
                        {error ? (
                            <p className="alert alert-danger p2 mt-4 text-center">
                                There was an error
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
