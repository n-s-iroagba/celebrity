import React from 'react';import { Card, Button, Form, Table } from 'react-bootstrap';

type CartItem = {
  id: number;
  name: string;
  category: 'Tour' | 'Donation' | 'Membership' | 'Souvenir';
  price: number;
  selected: boolean;
};


const items: CartItem[] = [
    {
      id: 1,
      name: "City Tour - New York",
      category: "Tour",
      price: 99.99,
      selected: false,
    },
    {
      id: 2,
      name: "Save the Rainforests Donation",
      category: "Donation",
      price: 20.00,
      selected: true,
    },
    {
      id: 3,
      name: "Annual Membership - Premium",
      category: "Membership",
      price: 150.00,
      selected: false,
    },
    {
      id: 4,
      name: "Eco-Friendly Water Bottle",
      category: "Souvenir",
      price: 29.99,
      selected: true,
    },
    {
      id: 5,
      name: "Hollywood VIP Tour",
      category: "Tour",
      price: 199.99,
      selected: false,
    },
    {
      id: 6,
      name: "Support Education Donation",
      category: "Donation",
      price: 50.00,
      selected: false,
    },
    {
      id: 7,
      name: "Lifetime Membership - VIP Access",
      category: "Membership",
      price: 500.00,
      selected: true,
    },
    {
      id: 8,
      name: "Celebrity Signed Poster",
      category: "Souvenir",
      price: 75.00,
      selected: false,
    },
  ];
  
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(items);

  const handleSelectItem = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleProceed = () => {
    const selectedItems = cartItems.filter(item => item.selected);
 console.log(selectedItems);
  };

  return (
    <Card className="w-[800px] bg-white rounded-lg shadow p-6">
      <Card.Body>
        <Card.Title className="text-3xl font-title text-primary-950 mb-6">
          Cart
        </Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button
            className="bg-primary-500 hover:bg-primary-600 text-primary-50 px-4 py-2 rounded-md"
            onClick={handleProceed}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cart;