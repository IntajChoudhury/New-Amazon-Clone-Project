import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // going to "users" collection, finding user with signed in user id, finding it's
    // all orders and arranging in desc order by timestamp
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      // .onSnapshot((snapshot) => ...): The onSnapshot method is used to listen for real-time
      // updates to the specified collection. It takes a callback function that will be called
      // whenever there are changes to the data in the collection.
      // snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })): Inside the callback
      // function, snapshot represents the current state of the collection. snapshot.docs is an
      // array of the documents in the collection. The map function is used to transform each
      // document into an object with id and data properties. doc.id represents the unique
      // identifier of the document, and doc.data() contains the actual data stored in the document.
    } else {
      // No user signIn so no orders
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

// function Orders() {
//   return (
//     <div className="orders">
//       <h1> Your Orders </h1>
//     </div>
//   );
// }

export default Orders;
