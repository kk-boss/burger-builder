export default interface authStateType {
    token: string|null,
    userId: string|null,
    error: any,
    loading: boolean;
}