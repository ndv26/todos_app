export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action);
        console.log('preState: ', prevState);
        console.log('Args: ', args);
        const nextState = reducer(prevState, action, args);
        console.log(nextState);
        console.groupEnd('nextState: ', nextState);
        return nextState;
    }
}