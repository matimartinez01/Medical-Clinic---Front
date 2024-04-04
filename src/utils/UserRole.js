export function decodeJWT(token) {
    if(!token) {
        return null;
    }

    const [headerEncoded, payloadEncoded, signature] = token.split('.');
    
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));

    return { header, payload };
}

export function getRoleFromJWT(token) {
    if(!token) {
        return null;
    }
    const { payload } = decodeJWT(token);
    
    if (payload && payload.role && payload.role.authority) {
        return payload.role.authority;
    } else {
        return null;
    }
}

