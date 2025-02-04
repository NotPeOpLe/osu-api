export declare const parseUserType: <T extends {
    u?: string | number;
}>(data?: T) => (T & {
    type: string;
}) | undefined;
