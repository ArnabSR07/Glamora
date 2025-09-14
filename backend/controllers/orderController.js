// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variables
const currency = 'inr';
const deliveryCharge = 10;

//gateway initialization
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing orders using COD

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    console.log(req.body);
    const findUser= await orderModel.findOne({userId});
    if(findUser){
      let updatedOrder = await orderModel.findOneAndUpdate(
        {userId},
        { $push: { items: { $each: items } }, amount, address, date: Date.now(), paymentMethod: "COD", payment: false },
        { new: true }
      );
      return res.json({ success: true, message: "Order Placed Successfully!", updatedOrder });
    }
    else{
      const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    const response = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully!", response });
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing orders using stripe

const placeOrderStripe = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers;

     const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    
    const newOrder = new orderModel(orderData);
    const response = await newOrder.save();

    const line_items = items.map((item) => ({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name,
        },
        unit_amount:item.price * 100,
      },
      quantity:item.quantity,
    }))

    line_items.push({

       price_data:{
        currency:currency,
        product_data:{
          name:'Delivery Charges',
        },
        unit_amount:deliveryCharge * 100,
      },
      quantity:1,

    })

    const session = await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:'payment',
    })

    res.json({ success: true, session_url:session.url });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Verify Stripe

const verifyStripe = async(req,res) =>{

  const {orderId,success,userId} = req.body;

  try {

    if(success === 'true'){
       await orderModel.findByIdAndUpdate(orderId,{payment:true});
       await userModel.findByIdAndUpdate(userId,{cartData:{}});
       res.json({success:true});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false});
    }
    
  } catch (error) {
    
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

// All Orders for Admin
const allOrders = async (req, res) => {
  try {

    let orders = await orderModel.find({});
    res.json({ success: true, orders });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.findOne({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from admin Panel
const updateStatus = async (req, res) => {
  try {

    const { orderId, status } = req.body;
    let updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status }
    );
    res.json({ success: true, message: "Status Updated Successfully"});
    
  } catch (error) {
    console.log(error); 
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
