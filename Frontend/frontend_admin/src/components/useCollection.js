import { useState, useEffect } from "react";
import { db } from "../firebase";

const useCollection = (path, orderBy) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    var collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    return collection.onSnapshot(snapshot => {
      const items = [];
      snapshot.forEach(item => {
        items.push({
          ...item.data(),
          id: item.id
        });
      });

      setItems(items);
    });
  }, []);

  return items;
};

export default useCollection;
