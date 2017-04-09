import {
    Container
} from 'aurelia-framework';

export function connect(mapStateToProps) {

    const AppStore = Container.instance.get('AppStore');

    const defaultMap = state => state;
    const mapFunction = mapStateToProps || defaultMap;

    return target => {

        // create or overide the attach/detached methods to implement
        // the store subscription
        const attached = target.prototype.attached;
        const detached = target.prototype.detached;

        let unsubscribe: any;

        target.prototype.attached = function (...args) {

            // subscribe to store updates
            unsubscribe = AppStore.subscribe(() => {

                // get the state
                const state = mapFunction(AppStore.getState());

                // update the props if changed
                if (this.props !== state)
                    this.props = state;

            });

            // call the original attached
            if (typeof attached === 'function') {
                attached.call(this, ...args);
            }


        };

        target.prototype.detached = function (...args) {

            // unsubscribe from the store
            unsubscribe();

            // call the original detached
            if (typeof detached === 'function') {
                detached.call(this, ...args);
            }

        }

        return target;

    }

}