export const validate = (rawUrl: string) => {
	const url = new URL(rawUrl);
	if (url.hostname && url.hostname.match(/notion\.so$/)) {
		return true;
	}

	return false;
};
