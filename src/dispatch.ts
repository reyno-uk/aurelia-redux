import {
    Action,
    Store
} from 'redux';
import {
    Container
} from 'aurelia-framework';


export function dispatch<S>(action: Action){

    const store = <Store<S>>Container.instance.get('AppStore')

    store.dispatch(action)

}