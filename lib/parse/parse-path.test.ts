import { describe, expect, test } from "vitest";
import { parsePath } from "./parse-path";

describe("parsePath", () => {
	test.each([
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
			expected: {
				raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
				rawPageId: "1234567890abcdefghijklnmopqrstuv",
				workspaceId: "",
			},
		},
		{
			url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
			expected: {
				raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
				rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
				workspaceId: "",
			},
		},
        {
            url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
            expected: {
                raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                rawPageId: "1234567890abcdefghijklnmopqrstuv",
                workspaceId: "workspace",
            },
        },
        {
            url: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
            expected: {
                raw: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                workspaceId: "workspace",
            },
        },
	])("[正常系] $url の場合パース成功する", ({ url, expected }) => {
		expect(parsePath(url)).toStrictEqual(expected);
	});
});
