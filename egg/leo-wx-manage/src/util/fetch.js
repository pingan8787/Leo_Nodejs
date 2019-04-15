export const util_fetch = {
    /**
     * 
     * @param {String} type 
     * @param {Object} data
     */
    headers(type='GET', data={}){
        return {
            method: type,
            body: JSON.stringify(data),
            headers: {
                "Content-Type":"application/json"
            }
        }
    }
}