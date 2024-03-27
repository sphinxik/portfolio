const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA_FROM_LS":
      return action.payload;

    case "ADD_LIST":
      return [...state, action.payload.item];

    case "COMPLETE_LIST":
      return state.map((list) => {
        if (list.id === action.payload.itemID) {
          list.completed = !list.completed;
        }
        return list;
      });

    case "DELETE_LIST":
      return state.filter((list) => list.id !== action.payload.itemID);

    case "ADD_LIST_ITEM":
      const addedItemListIndex = state.findIndex((list) => list.id === action.payload.listID);
      if (addedItemListIndex !== -1) {
        const newData = [...state];
        newData[addedItemListIndex].tasks.push(action.payload.item);
        return newData;
      } else {
        alert("this list does not exist, please go back to home page...");
        return state;
      }

    case "COMPLETE_LIST_ITEM":
      const completedItemListIndex = state.findIndex((list) => list.id === action.payload.listID);
      if (completedItemListIndex !== -1) {
        const newData = [...state];

        newData[completedItemListIndex].tasks = newData[completedItemListIndex].tasks.map((task) => {
          if (task.id === action.payload.itemID) {
            task.completed = !task.completed;
          }
          return task;
        });

        return newData;
      } else {
        return state;
      }

    case "DELETE_LIST_ITEM":
      const deletedItemListIndex = state.findIndex((list) => list.id === action.payload.listID);
      if (deletedItemListIndex !== -1) {
        const newData = [...state];
        newData[deletedItemListIndex].tasks = newData[deletedItemListIndex].tasks.filter((task) => task.id !== action.payload.itemID);
        return newData;
      } else {
        return state;
      }

    default:
      throw new Error();
    //return state;
  }
};

export default reducer;
