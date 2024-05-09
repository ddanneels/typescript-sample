import test from "ava";
import greeter from './person.js';

const damien = { firstName: 'Damien', lastName: 'Danneels' };

test('greet local', (t) => {
    t.is(greeter( damien ), 'Hello, Damien Danneels');
});
