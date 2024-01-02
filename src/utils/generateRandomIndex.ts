import { assoc } from "./assoc";

// nanoid
export const generateRandomString = () => {
   return Math.random().toString(36).substring(2, 15);
}

export const assignId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);

export const assignKey = <O extends object>(obj: O) => {
   type ObjectKey = keyof O;
   const key = 'key' as ObjectKey;
   if (! obj[key]) {
      return assoc('key', generateRandomString())(obj);
   }
   return obj
}

// generation is MEANT TO BE called every time the function is called
// BUT this doesn't work if: export const assignId = assoc('id', generateRandomString());
export const generateId = <O extends object>(obj: O) => assignId(obj);