import { createContext } from 'react';

const titleContext = createContext({
    info: '55adasd',
}); // defualut value, fires only whe provider isnt userd

export default titleContext;
