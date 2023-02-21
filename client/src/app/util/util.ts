export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function eraseCookie(key: string) {
    document.cookie = key + '=; Max-Age=0';
}

export function currencyFormat(amount: number) {
    return "$" + (amount / 100).toFixed(2);
}