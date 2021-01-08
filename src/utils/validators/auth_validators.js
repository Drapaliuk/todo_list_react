export const required = value => {
    return value ? undefined : {name: 'Required', message: 'This field is required!'}
};
export const minLength = value => {
    return
    // return  value && value.length < 10 ? {name: 'Too short', message: 'Must be 10 characters or more'} : undefined
}