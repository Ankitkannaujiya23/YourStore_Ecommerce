export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};


export const getQuantityDropdownList = (num) => {
    const list = [];
    for (let i = 1; i <= num; i++) {
        list.push(i);
    }

    return list;
}
