/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'
import logger from './../dist/mjs/logger'

test('working on DOM environment',()=>{

    const spyConsoleLog = jest.spyOn(console,'log')

    //call: 1
    console.log('window',typeof window);

    //call: 2
    console.log('global',typeof global);

    const lg  = new logger('frontSide');

    //call: 3
    console.log('current logLevel',lg.level);

    //call: 4
    lg.v('foo','bar');

    expect(spyConsoleLog).toHaveBeenNthCalledWith(1,'window','object');
    expect(spyConsoleLog).toHaveBeenNthCalledWith(2,'global','object');
    expect(spyConsoleLog).toHaveBeenNthCalledWith(3,expect.anything(),6);
    expect(spyConsoleLog).toHaveBeenNthCalledWith(4,expect.anything(),expect.anything(),'foo','bar');
    expect(spyConsoleLog).toHaveBeenCalledTimes(4);
})

