import React from "react";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import '../styles/components/Payment.css';

const Payment = () => {
  const navigate = useNavigate()
  const { state, addNewOrder } = React.useContext(AppContext);
  const { cart, buyer } = state

  const paypalOptions = {
    clientId: 'AXZgXR0QxpRZbstCOcnTjbuysrLkWt_X9SQWsTMe9ZsPBPJiRoP8DM-udicmW1QgZdzQyczDOvP201op',
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if(data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        products: cart,
        payment: data,
      }
      addNewOrder(newOrder);
      navigate('/checkout/success')
    }
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price
    const sum = cart.reduce(reducer, 0);
    return sum;
  }
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
          ))}
        <div className="Payment-button">
          <PayPalButton 
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={data => handlePaymentSuccess(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  );
};

export { Payment };
