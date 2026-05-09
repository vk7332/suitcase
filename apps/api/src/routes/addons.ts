app.post('/addons/buy', verifyUser, async (req, res) => {
    const { addonType } = req.body;

    const order = await razorpay.orders.create({
        amount: 49900,
        currency: 'INR'
    });

    res.json(order);
});