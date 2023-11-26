import { Typography, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import { useFoodItemContext } from './../context/FoodItemContext';

function MealsItem({ page, handleAddCartItem }) {
    const { burgers, handleDeleteFood } = useFoodItemContext();
    return (
        <>
            <div className='food-container' id='food-container'>
                <Typography gutterBottom variant='h4' sx={{ letterSpacing: '2px', fontWeight: 'bold' }}>
                    BURGERS
                </Typography>
                <div className='food-cards-container'>
                    {burgers.map((burgerDetails) => (
                        <FoodCard
                            key={burgerDetails.itemCode}
                            foodDetails={burgerDetails}
                            page={page}
                            handleAddCartItem={handleAddCartItem}
                            handleDeleteFood={handleDeleteFood}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

function FoodCard({ foodDetails, page, handleAddCartItem, handleDeleteFood }) {
    const { name, description, price, image, itemCode } = foodDetails;
    return (
        <Card sx={{ borderRadius: '0.5rem', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component='img' height='220' image={image} alt='burger' />
            <div className='card-content'>
                <CardContent className='food-card-content' sx={{ paddingBottom: '5px' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    <Typography variant='body3' sx={{ display: 'block' }}>
                        {description}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>RM {price}</Typography>
                </CardContent>
                <CardActions sx={{ marginTop: 'auto' }}>
                    {page === 'ADMIN' ? (
                        <Button
                            size='large'
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => {
                                handleDeleteFood(itemCode);
                            }}>
                            Delete
                        </Button>
                    ) : (
                        <Button
                            size='large'
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => {
                                handleAddCartItem(name, price, itemCode);
                            }}>
                            Add to Cart
                        </Button>
                    )}
                </CardActions>
            </div>
        </Card>
    );
}

export default MealsItem;
