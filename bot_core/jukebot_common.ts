export const docName = "data_";
export function ValidUser(userName: string) {
    return userName.startsWith("@");
}