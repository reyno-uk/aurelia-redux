import {
    applyMiddleware,
    compose,
    createStore,
    Middleware,
    ReducersMapObject,
    Store
} from 'redux';
import {
    Container
} from 'aurelia-framework';

export default function configureStore<S>(
    reducers: ReducersMapObject,
    middleware?: Middleware[]
): Store<S> {

    const create = middleware && middleware.length !== 0
        ? compose.apply(this, middleware.map(x => applyMiddleware(x)))(createStore)
        : createStore
        ;

    const store = create(reducers);

    // add the store to aurelia's DI
    Container.instance.registerSingleton('AppStore', store);

    return store;

}
