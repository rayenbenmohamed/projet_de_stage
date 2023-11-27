

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {


    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
  
    // Billing address form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
  
    // Payment form state
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [ccName, setCcName] = useState('');
    const [ccNumber, setCcNumber] = useState('');
    const [ccExpiration, setCcExpiration] = useState('');
    const [ccCvv, setCcCvv] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      // Retrieve user ID from local storage
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
  
      // Fetch user details from your API using the user ID
      if (storedUserId) {
        fetch(`http://localhost:3001/users/${storedUserId}`)
          .then((response) => response.json())
          .then((userData) => setUser(userData))
          .catch((error) => console.error('Error fetching user:', error));
      }
    }, []);
  
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    const renderCartItem = (item) => (
      <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
        <div>
          <h6 className="my-0">{item.title}</h6>
        </div>
        <span className="text-muted">{item.price * item.quantity}dt</span>
      </li>
    );
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const order = {
          userId,
          items: cartItems,
          total,
          billingAddress: {
            firstName,
            lastName,
            username,
            email,
            address,
            address2,
            country,
            state,
          },
          payment: {
            method: paymentMethod,
            ccName,
            ccNumber,
            ccExpiration,
            ccCvv,
          },
        };
    
        try {
          // Make a POST request to your JSON server
          const response = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
          });
    
          if (response.ok) {
            setCartItems([]);
            // Use navigate instead of history.push
            navigate('/success');
          } else {
            console.error('Failed to store order');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return(
    <>
    <div className="container my-5">
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map(renderCartItem)}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total ()</span>
              <strong>{total}dt</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <button type="submit" className="btn btn-secondary">
                Get it
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
          <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="name" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="last" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required/>
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input type="text" className="form-control" id="username" placeholder="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                                        <div className="invalid-feedback">
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address htmlFor shipping updates.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="7170 Dahmani"  value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Rue Farhat Hached" value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    required />
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className="form-select" id="country" value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required>
                                        <option value="">Choose...</option>
                                        <option>TUNISIA</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-select" id="state" value={state}
                    onChange={(e) => setState(e.target.value)}
                    required>
                                        <option value="">Choose...</option>
                                        <option>Tunis</option>
                                        <option>Sfax</option>
                                        <option>EL Kef</option>
                                        <option>Bizert</option>
                                        <option>Manouba</option>
                                        <option>Ariena</option>
                                        <option>Ben Arous</option>
                                        <option>Mednine</option>
                                        <option>Gabes</option>
                                        <option>Tozeur</option>
                                        
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="same-address" />
                                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Save this information For next time</label>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="my-3">
                                <div className="form-check">
                                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked="" required="" />
                                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" htmlFor="debit">check</label>
                                </div>
                                <div className="form-check">
                                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" htmlFor="paypal">cash</label>
                                </div>
                            </div>

                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name"value={ccName}
                    onChange={(e) => setCcName(e.target.value)}
                    required />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" value={ccNumber}
                    onChange={(e) => setCcNumber(e.target.value)}
                    required />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration"value={ccExpiration}
                    onChange={(e) => setCcExpiration(e.target.value)}
                    required />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv"value={ccCvv}
                    onChange={(e) => setCcCvv(e.target.value)}
                    required />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default Checkout;
