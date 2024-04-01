function getTokenData(token) {
    const [, payloadBase64] = token.split('.')
    const payload = JSON.parse(atob(payloadBase64))

    if (payload && payload.exp) {
      const expiracionTimestamp = payload.exp * 1000
        return new Date(expiracionTimestamp)
    }
    return null
    }

export default getTokenData