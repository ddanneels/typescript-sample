import greeter from './person.js';
import Cache from './cache.js';

let nb = 0;

let user = { firstName: "Local", lastName: "User" };

let cache = new Cache( async ()=>{
    nb++;
    return user;
});

console.log(greeter(await cache.getData()));
