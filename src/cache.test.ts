import test from "ava";
import Cache from './cache.js';

let nbCalls = 0;

test('empty cache, one data retrieval', async (t)=>{
    nbCalls = 0;
    let cache = new Cache<string>(async () => {
        nbCalls++;
        return 'abc'; 
    });
    t.is(await cache.getData(), 'abc');
    t.is(await cache.getData(), 'abc');
    t.is(nbCalls,1);
});

test('expired cache, two data retrievals', async (t)=>{
    let clock = Date.now();
    let nbCalls = 0;
    let fakeClock = () => { return clock;};

    let cache = new Cache<string>(async () => {
        nbCalls++;
        return 'abc'; 
    }, fakeClock);

    cache.duration = 100;

    t.is(await cache.getData(), 'abc');
    clock += 50;
    t.is(await cache.getData(), 'abc');
    clock += 50;
    t.is(await cache.getData(), 'abc');
    clock += 50;
    t.is(await cache.getData(), 'abc');
    t.is(nbCalls,2);
});