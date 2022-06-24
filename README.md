## DISCLAIMER: not ready for production releases

### logger - A simple console.log wrapper

#### Intallation
``
npm i @alexrah/logger
``

#### Features
* custom prefix when creating instance ``const lg = new logger('custom prefix')``
* random coloured output
* stack trace with ``const lg = new logger(); lg.s('traced output'')``

#### TODO
* global setLevel with dotenv
* now works only with window.console, add support to node console
* testing: add jest deps and write tests