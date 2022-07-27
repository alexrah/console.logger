/**
 * @jest-environment node
 */

import logger from './../dist/logger'

test('working on node environment',()=>{

    const lg  = new logger('serverSide');
    lg.v('foo','bar');
})

