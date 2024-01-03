export const validate = (rawUrl: string) => {
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

const validateHost = (url: URL) => {
	if (url.hostname && url.hostname.match(/notion\.so$/)) {
		return true;
	}
	return false;
}

const validatePath = (url: URL) => {
	if (url.pathname !== "/") {
		return true;
	}
	return false;
}
