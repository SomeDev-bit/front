import Cookie from 'js-cookie';


//user
export const setUserToLocal = (user) => {
  Cookie.set('user', JSON.stringify(user));
}

export const getUserFromLocal = () => {
  const user = Cookie.get('user');
  return user ? JSON.parse(user) : null;
}


export const removeUserFromLocal = (user) => {
  Cookie.remove('user');
}


//carts
export const setCartsToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
}

export const getCartsFromLocal = () => {
  const carts = localStorage.getItem('carts');
  return carts ? JSON.parse(carts) : [];
}


export const removeCartsFromLocal = () => {
  localStorage.clear();
}