/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 const getNickname = user => {
   return `${user.first_name} ${user.last_name.charAt(0).toUpperCase()}`
 }

 export {
   getNickname
 }
