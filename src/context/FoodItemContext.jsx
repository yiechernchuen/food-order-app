/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import burger1 from './../assets/images/burger1.jpg';
import burger2 from './../assets/images/burger2.jpg';
import burger3 from './../assets/images/burger3.jpg';
import burger4 from './../assets/images/burger4.jpg';
import burger5 from './../assets/images/burger5.jpg';
import burger6 from './../assets/images/burger6.jpg';
import { useCartItemContext } from './CartItemContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const apiKey = '891773029ca3d004450f23c11e7ed015';
const burger = [
    {
        name: 'Savory Bun',
        description:
            'A blend of seasoned beef, melted Swiss cheese, crisp bacon, and a tangy garlic aioli, all stacked between a toasted brioche bun.',
        image: burger1,
        price: '20',
        itemCode: uuidv4(),
    },
    {
        name: 'Fusion Bun',
        description:
            'A flavor explosion featuring a juicy beef patty, pepper jack cheese, jalapeños, and fresh salsa, creating a spicy fiesta in every bite.',
        image: burger2,
        price: '18',
        itemCode: uuidv4(),
    },
    {
        name: 'USA Bun',
        description:
            'Timeless perfection with a succulent beef patty, cheddar cheese, and a special house sauce, capturing the classic American burger essence.',
        image: burger3,
        price: '22',
        itemCode: uuidv4(),
    },
    {
        name: 'Zest Bun',
        description:
            'Transport your taste buds to the Mediterranean with a grilled lamb patty, feta cheese, cucumber, tomato, red onion on a warm ciabatta bun.',
        image: burger4,
        price: '20',
        itemCode: uuidv4(),
    },
    {
        name: 'BBQ Bun',
        description:
            'Indulge in the rich flavors of a bourbon-glazed beef patty, smoked gouda cheese, crispy onion straws, and a smoky barbecue sauce',
        image: burger5,
        price: '25',
        itemCode: uuidv4(),
    },
    {
        name: 'Veg X Bun',
        description:
            'A satisfying vegetarian option featuring a hearty black bean patty, roasted vegetables, avocado slices, sprouts, and a cilantro-lime mayo',
        image: burger6,
        price: '18',
        itemCode: uuidv4(),
    },
];
const initialFormValue = { name: '', description: '', image: '', price: '' };

//Create context
const FoodItemContext = createContext(burger);

//Provide context
export function FoodItemContextProvider({ children }) {
    const [burgers, setBurgers] = useState(JSON.parse(localStorage.getItem('burgers')) ?? burger);
    const [formValue, setFormValue] = useState(initialFormValue);
    const { handleDeleteCartItem } = useCartItemContext();

    useEffect(() => {
        localStorage.setItem('burgers', JSON.stringify(burgers));
    }, [burgers]);

    function handleDeleteFood(itemCode) {
        const newBurgersList = burgers.filter((burger) => burger.itemCode !== itemCode);
        setBurgers(newBurgersList);
        handleDeleteCartItem(itemCode);
    }

    function handleClearForm(e) {
        e.target.form[6].value = null;
        setFormValue(initialFormValue);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        e.target[6].value = null;
        setFormValue(initialFormValue);
        const { name, description, price, image } = formValue;
        const imageUrl = await getUploadedImageUrl(image);
        setBurgers((prevBurgers) => [
            { name, description, image: imageUrl, price, itemCode: uuidv4() },
            ...prevBurgers,
        ]);
    }

    async function getUploadedImageUrl(image) {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
        const imageUrl = response.data.data.image.url;
        return imageUrl;
    }

    const value = { burgers, handleDeleteFood, formValue, handleSubmit, setFormValue, handleClearForm };
    return <FoodItemContext.Provider value={value}>{children}</FoodItemContext.Provider>;
}

//Use context
export function useFoodItemContext() {
    return useContext(FoodItemContext);
}
