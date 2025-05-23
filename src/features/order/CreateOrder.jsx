import { useState } from 'react'
import {
    Form,
    redirect,
    useActionData,
    useNavigate,
    useNavigation,
} from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

const fakeCart = [
    {
        pizzaId: 12,
        name: 'Mediterranean',
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: 'Vegetale',
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: 'Spinach and Mushroom',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
]

function CreateOrder() {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    const formErrors = useActionData()

    // const [withPriority, setWithPriority] = useState(false);
    const cart = fakeCart

    return (
        <div>
            <h2>Ready to order? Let's go!</h2>

            {/* <Form method="POST" action="/order/new"> */}
            <Form method="POST">
                <div>
                    <label>First Name</label>
                    <input
                        className="input"
                        type="text"
                        name="customer"
                        required
                    />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input
                            className="input"
                            type="tel"
                            name="phone"
                            required
                        />
                    </div>
                    {formErrors?.phone && <p>{formErrors.phone}</p>}
                </div>

                <div>
                    <label>Address</label>
                    <div>
                        <input
                            className="input"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div>
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">
                        Want to give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <button
                        disabled={isSubmitting}
                        className="focus-b focus:bg-yellow inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Placing order...' : 'Order now'}
                    </button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on',
    }

    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone =
            'Please give us your correct phone number. We might need it to contact you.'

    if (Object.keys(errors).length > 0) return errors

    // const newOrder = await createOrder(order)

    // // If everything is okay, create new order and redirect
    // return redirect(`/order/${newOrder.id}`)
    return null
}

export default CreateOrder
