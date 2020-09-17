
export const updateObject = <T>(object: T, changes: any): T => {
    return {
        ...object,
        ...changes
    }
}