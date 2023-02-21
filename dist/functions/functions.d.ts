declare const getUsers: () => Promise<void>;
declare const getLowestBiggest: (arr: any) => Promise<{
    smallest: any;
    biggest: any;
}>;
export { getUsers, getLowestBiggest };
