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

#### Requirements
* create a .env file in the root directory
* add constant ``LOG_LEVEL`` with a value between 1 and 6

###### LOG_LEVEL
```
ASSERT = 1;
ERROR = 2;
WARN = 3;
INFO = 4;
DEBUG = 5;
VERBOSE = 6
```

#### TODO
* global setLevel with dotenv
* now works only with window.console, add support to node console
* testing: add jest deps and write tests