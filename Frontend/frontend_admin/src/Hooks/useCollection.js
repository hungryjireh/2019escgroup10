import { useState, useEffect } from "react";
import { db } from "../firebase";

const useCollection = (path, orderBy, where = []) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    var collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (where.length > 0) {
      for (let i = 0; i < where.length; i++) {
        collection = collection.where(
          where[i].param,
          where[i].op,
          where[i].val
        );
      }
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
  }, [orderBy]);

  return items;
};

export default useCollection;
