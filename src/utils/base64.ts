
/**
 * 加密:(对象加密成字符串)
 * @param {Object || String} param 跳转参数可以为对象或路径字符串
 * @returns
 */
const encodeBase64 = (param: any) =>{
    const encryptStr: string = btoa(encodeURIComponent(JSON.stringify(param)) || '')
    // console.log('加密成', encryptStr)
    return encryptStr
}

/**
 * 解密：(字符串->对象)
 * @param {String} str 跳转参数为base64字符串
 * @returns
 */
const decodeBase64 = (str: string) => {
    //注意顺序，加密是JSON.stringify -> encodeUrl -> btoa, 解密就是atob -> decodeUrl -> JSON.parse
    const decryptQuery = str ? JSON.parse(decodeURIComponent(atob(str))) : {}
    // console.log('解密成', decryptQuery)
    return decryptQuery
}

export function useBase64() {
    return {
        encodeBase64,
        decodeBase64
    }
}
