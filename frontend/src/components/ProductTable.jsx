import React from 'react';
import { Button, Image } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, onDelete }) => {
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        // Reload the products after successful deletion
        onDelete(productId);
        console.log('Product deleted successfully');
      } else {
        console.log('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  return (
    <div className="table-responsive m-3">
      <table className="table table-striped">

        {/* Table headers */}
        <thead>
          <tr>
            <th>S.no</th>
            <th>Photo</th>
            <th>Product name</th>
            <th>Category</th>
            <th>Product info</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              {/* Display product details */}
              <td>{index + 1}</td>
              <td> <Image src='{product.ProductImage.thumbnail}' /> </td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>
                <div>No of items: {product.quantity}</div>
                <div>Base price: {product.productPrice}</div>
                <div>Available: {product.productQuantity}</div>
              </td>
              <td>
                {/* Display action buttons */}
                <Button variant="warning" className="me-2">
                  <EditIcon />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
