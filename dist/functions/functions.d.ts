declare const getUsers: () => Promise<void>;
declare const getCurrentPrice: () => Promise<unknown>;
declare const getLowestBiggest: (arr2: any) => Promise<{
    smallest: any;
    biggest: any;
}>;
export { getUsers, getLowestBiggest, getCurrentPrice };
