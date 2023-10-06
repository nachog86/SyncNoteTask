import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({ todos: [] });

const doc = getYjsDoc(store);
 new WebrtcProvider("todo-list-room", doc);


export default store;


