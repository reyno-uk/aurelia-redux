import {
    Store,
    ReducersMapObject,
    Middleware,
    Action
} from 'redux';

declare module 'aurelia-redux' {

    export function configureStore<S>(reducers: ReducersMapObject, middleware?: Middleware[]): Store<S>;
    export function connect<S>(mapStateToProps: (state: S) => any)
    export function dispatch<S extends Action>(action: S): S;

}