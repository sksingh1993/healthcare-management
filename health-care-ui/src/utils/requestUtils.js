export const removeEmptyParams = (params) => {
    return Object.fromEntries(
        Object.entries(params).filter(([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
        )
    );
};