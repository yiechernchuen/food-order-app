import { Typography, Button } from '@mui/material';
import girlEatingBurger from './../assets/images/girl-eating-burger.jpg';
import MealsItem from '../components/MealsItem';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { useCartItemContext } from './../context/CartItemContext';

function Home() {
    const {
        cartItems,
        handleAddCartItem,
        handleIncreaseCartItemUnit,
        handleDecreaseCartItemUnit,
        handleClearCart,
        handleAddOrderItem,
    } = useCartItemContext();
    return (
        <>
            <div className='hero'>
                <Cart
                    cartItems={cartItems}
                    handleIncreaseCartItemUnit={handleIncreaseCartItemUnit}
                    handleDecreaseCartItemUnit={handleDecreaseCartItemUnit}
                    handleClearCart={handleClearCart}
                    handleAddOrderItem={handleAddOrderItem}
                />
                <Typography
                    className='hero-header'
                    variant='h1'
                    sx={{ letterSpacing: '1rem', textAlign: 'center', paddingLeft: '1rem' }}>
                    DASHBUN
                </Typography>
                <Typography className='hero-header2' variant='h4'>
                    Dash, Order, Delight!
                </Typography>
                <Button component='a' variant='contained' href='#food-container'>
                    Discover
                </Button>
            </div>

            <div className='intro-container'>
                <Typography variant='h4' className='intro-header'>
                    DELICIOUS FOOD FOR PEOPLE
                </Typography>
                <Typography variant='h6' className='intro-details'>
                    Welcome to DashBun, where burger cravings meet instant gratification! Dive into a world of savory
                    delights with our mouthwatering selection of burgers, crafted just the way you love them. From the
                    sizzle on the grill to the first bite of perfection, experience a symphony of flavors with every
                    order.
                </Typography>
                <div className='img-container'>
                    <img src={girlEatingBurger} alt='girl eating burger' className='intro-img' />
                </div>
            </div>

            <MealsItem page='HOME' handleAddCartItem={handleAddCartItem} />

            <Footer toPage='ADMIN' link='admin' />
        </>
    );
}

export default Home;
