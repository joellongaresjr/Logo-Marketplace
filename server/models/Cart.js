const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
    {
        products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        ],
        user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        },
    },
    {
        toJSON: {
        virtuals: true,
        },
    }
);
    
const Cart = model('Cart', cartSchema);

module.exports = Cart;