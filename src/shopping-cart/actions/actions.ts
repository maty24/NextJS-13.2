// 'use client'
/*
esto es lo que devuelve la cookie del carrito que el id es el id del producto y el valor es la cantidad
cookie: cart
{
  'uui-123-1': 4,
  'uui-123-2': 1,
  'uui-123-3': 2,
}
*/
import { getCookie, hasCookie, setCookie } from "cookies-next";

//esta funcion devuelve un objeto con los productos que hay en el carrito
export const getCookieCart = ():{ [id: string]:number } => {


  //el hasCookie comprueba si existe la cookie
  if ( hasCookie('cart') ) {
    const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}' );
    return cookieCart;
  }

  return {};
}

export const addProductToCart = ( id: string ) => {

  //obtenemos la cookie del carrito
  const cookieCart = getCookieCart();

  //si el producto ya existe en el carrito, le sumamos 1
  if ( cookieCart[id] ) {
    cookieCart[id] = cookieCart[id] + 1;
    //si no existe, lo creamos
  } else {
  
    cookieCart[id] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
}


export const removeProductFromCart = ( id:string ) =>{
  const cookieCart = getCookieCart();
  //si el producto no existe en el carrito, no hacemos nada pero si existe lo borramos
  delete cookieCart[id];
  setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = ( id: string ) => {
  
  const cookieCart = getCookieCart();
  if ( !cookieCart[id] ) return;

  const itemsInCart = cookieCart[id] - 1;

  if ( itemsInCart <= 0 ) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie('cart', JSON.stringify(cookieCart));
}

