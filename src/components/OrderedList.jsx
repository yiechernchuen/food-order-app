import { useCartItemContext } from '../context/CartItemContext';
import { Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function OrderedList() {
    const { orderedItems, handleDeleteOrderList } = useCartItemContext();
    return (
        <div className='order-list-container'>
            <Typography gutterBottom variant='h4' sx={{ marginBottom: '1rem' }}>
                Dashboard
            </Typography>
            {orderedItems.length >= 1 ? (
                orderedItems.map((orderBatch, index) => (
                    <div key={orderBatch[0]} className='order-batch-container'>
                        <div className='order-batch-heading'>
                            <Typography color='primary' variant='h6' sx={{ marginRight: 'auto', fontWeight: 'bold' }}>
                                Order ({index + 1})
                            </Typography>
                            <IconButton
                                color='primary'
                                aria-label='delete'
                                sx={{ minWidth: '32px' }}
                                size='small'
                                onClick={() => {
                                    handleDeleteOrderList(orderBatch[0]);
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <Order orderBatch={orderBatch} />
                    </div>
                ))
            ) : (
                <Typography
                    gutterBottom
                    variant='body2'
                    sx={{ marginBottom: '1rem', fontStyle: 'italic', paddingLeft: '3px' }}>
                    No orders yet
                </Typography>
            )}
            {}
        </div>
    );
}

function Order({ orderBatch }) {
    return orderBatch.map((item, index) =>
        index === 0 ? null : (
            <div key={item.itemCode} className='order-list-item'>
                <Typography
                    sx={{
                        marginRight: 'auto',
                    }}>
                    {item.name}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', width: '34px', textAlign: 'center' }}>{item.units}</Typography>
            </div>
        )
    );
}

export default OrderedList;
