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

    window.env = {};
    window.env.LOG_LEVEL = 2;

    const lg  = new logger('frontSide');

    //call: 3
    console.log('current logLevel',lg.level);

    /**
     * this line won't get called with lg.level = 2
     * */
    lg.v('foo','bar');

    expect(spyConsoleLog).toHaveBeenNthCalledWith(1,'window','object');
    expect(spyConsoleLog).toHaveBeenNthCalledWith(2,'global','object');
    expect(spyConsoleLog).toHaveBeenNthCalledWith(3,expect.anything(),2);
    expect(spyConsoleLog).toHaveBeenCalledTimes(3);
})

