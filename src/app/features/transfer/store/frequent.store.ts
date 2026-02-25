import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { FrequentOperation } from '../interfaces/transfer.model'

type FrequentState = {
    frequentOperationSelected: FrequentOperation | null
}
const initialState: FrequentState = {
    frequentOperationSelected: null
}

export const FrequentOperationStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store)=>({
        seletecFrequent: (frequent: FrequentOperation) => {
            patchState(store, { frequentOperationSelected: frequent })
        },
        clean: ()  =>{
            patchState(store, { frequentOperationSelected: null })
        }
    }))
)
