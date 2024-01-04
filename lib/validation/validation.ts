import { validate as validateFunction } from "../notion-url/types";

/**
 * URLを検証します。
 *
 * @param rawUrl - 検証する対象のURL
 * @returns URLが Notion URL Parser のURLとして有効な場合はtrue、それ以外の場合はfalseを返します。
 */
export const validate: validateFunction = (rawUrl: string) => {
	// TODO: validateが失敗した原因も返すようにする
	try {
		new URL(rawUrl);
	} catch (e) {
		return false;
	}

	const url = new URL(rawUrl);
	if (!validateHost(url)) {
		return false;
	}

	if (!validatePath(url)) {
		return false;
	}

	return true;
};

/**
 * 指定されたURLのホストがNotionのものかを検証します。
 *
 * @param url - 検証する対象のURL
 * @returns ホストがパターン "notion.so" に一致する場合はtrue、それ以外の場合はfalseを返します。
 */
const validateHost = (url: URL) => {
	if (url.hostname && url.hostname.match(/notion\.so$/)) {
		return true;
	}
	return false;
};

/**
 * URLのパスにページIDに関するデータが入っている状態かを検証します。
 *
 * @param url - 検証する対象のURL
 * @returns パス部分が空ではない場合はtrue、空の場合はfalseを返します。
 */
const validatePath = (url: URL) => {
	if (url.pathname !== "/") {
		return true;
	}
	return false;
};
