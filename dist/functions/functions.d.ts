declare const getUsers: () => Promise<void>;
declare const getLowestBiggest: (arr2: any) => Promise<{
    smallest: any;
    biggest: any;
}>;
export { getUsers, getLowestBiggest };
