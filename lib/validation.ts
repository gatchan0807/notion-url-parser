export const validate = (rawUrl: string) => {
	try {
		new URL(rawUrl);
	} catch (e) {
		return false;
	}

    const url = new URL(rawUrl);
	if (url.hostname && url.hostname.match(/notion\.so$/)) {
		return true;
	}

	return false;
};
