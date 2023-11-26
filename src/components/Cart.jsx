import { Typography, Button } from '@mui/material';
import { createPortal } from 'react-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';

function Cart({
    cartItems,
    handleIncreaseCartItemUnit,
    handleDecreaseCartItemUnit,
    handleClearCart,
    handleAddOrderItem,
}) {
    const [showCart, setShowCart] = useState(false);
    let totalCartItems = 0;
    let totalCartPrice = 0;

    cartItems.forEach((item) => {
        totalCartItems += item.units;
        totalCartPrice = totalCartPrice + item.price * item.units;
    });

    function handleCloseCart() {
        setShowCart(false);
    }

    return (
        <>
            <Button
                variant='contained'
                className='cart-button'
                sx={{ position: 'fixed', right: '3rem', top: '2rem' }}
                startIcon={<ShoppingCartIcon sx={{ color: 'white' }} />}
                onClick={() => {
                    setShowCart(true);
                }}>
                Your Cart ({totalCartItems})
            </Button>
            {showCart &&
                createPortal(
                    <div className='cart-container'>
                        <div className='cart-card'>
                            {cartItems.length >= 1 && (
                                <>
                                    {cartItems.map((item) => (
                                        <div key={item.itemCode} className='cart-food'>
                                            <Typography
                                                sx={{
                                                    marginRight: 'auto',
                                                }}>
                                                {item.name}
                                            </Typography>
                                            <Typography>RM {item.price}</Typography>
                                            <div className='cart-food-buttons'>
                                                <Button
                                                    size='small'
                                                    sx={{ minWidth: '32px' }}
                                                    onClick={() => {
                                                        handleDecreaseCartItemUnit(item.itemCode);
                                                    }}>
                                                    &minus;
                                                </Button>
                                                <Typography sx={{ fontWeight: 'bold' }}>{item.units}</Typography>
                                                <Button
                                                    sx={{ minWidth: '32px' }}
                                                    size='small'
                                                    onClick={() => {
                                                        handleIncreaseCartItemUnit(item.itemCode);
                                                    }}>
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='cart-total-price'>
                                        <Typography sx={{ marginRight: 'auto', fontWeight: 'bold' }}>
                                            Total Amount
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold', minWidth: '137px', textAlign: 'center' }}>
                                            RM {totalCartPrice}
                                        </Typography>
                                    </div>
                                    <div className='cart-buttons'>
                                        <Button variant='outlined' onClick={handleCloseCart}>
                                            Close
                                        </Button>
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                handleAddOrderItem();
                                                handleClearCart();
                                                handleCloseCart();
                                            }}
                                            color='success'>
                                            Order
                                        </Button>
                                    </div>
                                </>
                            )}

                            {cartItems.length < 1 && (
                                <div className='empty-cart'>
                                    <Typography variant='h6' sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                                        Please add burgers to cart
                                    </Typography>
                                    <Button size='large' variant='contained' onClick={handleCloseCart}>
                                        Close
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export default Cart;
