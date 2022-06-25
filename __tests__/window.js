/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'
import logger from './../dist/logger'

test('working on DOM environment',()=>{

    const spyConsoleLog = jest.spyOn(console,'log')
    console.log(typeof window);
    const lg  = new logger('frontSide');
    lg.v('foo','bar');

    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenNthCalledWith(2,expect.anything(),expect.anything(),'foo','bar');
})

