export const newAddedItemList = (list, item) => {
    const newItem = item;
    newItem.id = list[list.length - 1].id + 1;
    return [...list, item];
}

export const newTruncItemList = (list, id) => {
    return list.filter(item => item.id != id);
}