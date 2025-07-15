import { createStore } from 'easy-peasy'
import { rootModel } from './models/rootModel'

export const store = createStore(rootModel)
