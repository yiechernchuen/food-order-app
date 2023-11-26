import { TextField, Button, Typography } from '@mui/material';
import MealsItem from '../components/MealsItem';
import Footer from '../components/Footer';
import { useFoodItemContext } from './../context/FoodItemContext';
import OrderedList from '../components/OrderedList';

function Admin() {
    const { formValue, handleSubmit, setFormValue, handleClearForm } = useFoodItemContext();
    return (
        <>
            <div className='admin-container'>
                <div>
                    <form
                        className='form'
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                        <Typography gutterBottom variant='h4'>
                            Add Food
                        </Typography>
                        <TextField
                            id='food-name'
                            label='Name'
                            variant='outlined'
                            required
                            value={formValue.name}
                            onChange={(e) => {
                                setFormValue((prevFormValue) => ({ ...prevFormValue, name: e.target.value }));
                            }}
                        />
                        <TextField
                            id='food-description'
                            label='Description'
                            variant='outlined'
                            value={formValue.description}
                            required
                            onChange={(e) => {
                                setFormValue((prevFormValue) => ({ ...prevFormValue, description: e.target.value }));
                            }}
                        />
                        <TextField
                            id='food-price'
                            label='Price'
                            variant='outlined'
                            value={formValue.price}
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                            type='number'
                            onChange={(e) => {
                                setFormValue((prevFormValue) => ({ ...prevFormValue, price: e.target.value }));
                            }}
                        />
                        <TextField
                            name='upload-photo'
                            type='file'
                            inputProps={{ accept: 'image/png, image/jpeg' }}
                            required
                            onChange={(e) => {
                                setFormValue((prevFormValue) => ({ ...prevFormValue, image: e.target.files[0] }));
                            }}
                            sx={{ marginBottom: '0.5rem' }}
                        />
                        <div>
                            <Button size='large' variant='contained' type='submit'>
                                ADD
                            </Button>
                            <Button
                                onClick={(e) => {
                                    handleClearForm(e);
                                }}
                                size='large'
                                type='button'>
                                CLEAR
                            </Button>
                        </div>
                    </form>
                    <OrderedList />
                </div>

                <MealsItem page='ADMIN' />
            </div>
            <Footer toPage='HOME' link='/' />
        </>
    );
}

export default Admin;
