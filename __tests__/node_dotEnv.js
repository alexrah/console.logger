/**
 * @jest-environment node
 */

import logger from './../dist/logger'
import 'dotenv/config';
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

    /**
     * this line won't get called with lg.level = 2
     * set in .env file
     * */
    lg.v('foo','bar');

    expect(console.log).toHaveBeenNthCalledWith(1,'window','undefined');
    expect(console.log).toHaveBeenNthCalledWith(2,'global','object');
    expect(console.log).toHaveBeenNthCalledWith(3,expect.anything(),2);
    expect(console.log).toHaveBeenCalledTimes(3);
})

