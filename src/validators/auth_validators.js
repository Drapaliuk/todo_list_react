export const required = value => {
    console.log('Req', value)
    return value ? undefined : 'Required'
};
export const minLength = value => {
    console.log(value)
    return  value && value.length < 10 ? `Must be 10 characters or more` : undefined
}