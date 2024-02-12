const dummyCryptoObject = {
    subtle: {
        digest: null,
    },
};

const { subtle: node18Crypto } = (require("node:crypto").webcrypto as Crypto) ?? dummyCryptoObject;
const { subtle: browserAndNode20Crypto } = typeof crypto !== "undefined" ? crypto : dummyCryptoObject

export const digest = async (data: string) => {
    if ([browserAndNode20Crypto, node18Crypto].every((c) => { c.digest === null })) {
        console.error("This environment not supported Crypto.subtle.digest");
        throw new Error("This environment not supported Crypto.subtle.digest");
    }

    const subtle = [browserAndNode20Crypto, node18Crypto].find((c) => c.digest !== null);
    if (!subtle || subtle?.digest === null) {
        return null
    }

    const ec = new TextEncoder();
    const digestResult = await subtle.digest("SHA-256", ec.encode(data));
    const hashArray = Array.from(new Uint8Array(digestResult));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};
