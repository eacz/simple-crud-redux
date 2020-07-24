import React, { Fragment, useEffect } from 'react';
import Product from './Product';
import { getAllProducts } from '../actions/productsActions';

import { useSelector, useDispatch } from 'react-redux';

const Products = () => {
    const dispatch = useDispatch();
    const getProducts = () => dispatch(getAllProducts());

    const products = useSelector((state) => state.products.products);
    const error = useSelector((state)=> state.products.error)
    const loading = useSelector((state)=> state.products.loading)

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <h2 className="text-center my-5"> Products list </h2>
            {error ? <p className="text-weight-bold alert alert-danger text-center mt-4">There was an error, please refresh</p> :null}
            {loading ? <p className="text-center">Loading...</p> :null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0
                        ? 'There is no products.'
                        : products.map((product) => (
                              <Product key={product.id}  product={product}/>
                          ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Products;
