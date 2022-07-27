/**
 * @jest-environment node
 */

import logger from './../dist/logger'
import {jest} from "@jest/globals";

test('working on node environment',()=>{

    const spyConsoleLog = jest.spyOn(console,'log')

    //call: 1
    console.log('window',typeof window);
    //call: 2
    console.log('global',typeof global);

    const lg  = new logger('serverSide');

    //call: 3
    console.log('current logLevel',lg.level);

    //call: 4
    lg.v('foo','bar');

    expect(console.log).toHaveBeenNthCalledWith(1,'window','undefined');
    expect(console.log).toHaveBeenNthCalledWith(2,'global','object');
    expect(console.log).toHaveBeenNthCalledWith(3,expect.anything(),6);
    expect(console.log).toHaveBeenNthCalledWith(4,expect.anything(),expect.anything(),'foo','bar');
    expect(console.log).toHaveBeenCalledTimes(4);

})

