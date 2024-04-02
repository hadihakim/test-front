import React from "react";

import ItemRow from "./item";

import './table.css'

const ProdTable = props => {
    if (props.products.length === 0) {
        return (
            <div className="text-center">
                <p>No Products Found</p>
            </div>
        );
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Merchant Email</th>
                    <th scope="col">Store</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.products.map(product => (
                    <ItemRow
                        key={product._id}
                        id={product._id}
                        image={product.image}
                        fullName={product.fullName}
                        store={product.store}
                        merchantEmail={product.merchantEmail}
                        showToast={props.showToast}
                        fetchProducts={props.fetchProducts}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ProdTable;