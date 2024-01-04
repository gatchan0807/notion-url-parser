import { describe, expect, test } from "vitest";
import { parsePath } from "./parse-path";

describe("parsePath", () => {
	test.each([
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
			expected: {
				raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
				rawPageId: "1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
				workspaceId: "",
			},
		},
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?query=abcxyz",
			expected: {
				raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv?query=abcxyz",
				rawPageId: "1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
				workspaceId: "",
			},
		},
		{
			url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
			expected: {
				raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
				rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
				workspaceId: "",
			},
		},
		{
			url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?query=abcxyz",
			expected: {
				raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?query=abcxyz",
				rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
				workspaceId: "",
			},
		},
        {
            url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
            expected: {
                raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                rawPageId: "1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
                workspaceId: "workspace",
            },
        },
        {
            url: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
            expected: {
                raw: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
                workspaceId: "workspace",
            },
        },
        {
            url: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?query=abcxyz",
            expected: {
                raw: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?query=abcxyz",
                rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                pageId: "1234567890abcdefghijklnmopqrstuv",
                workspaceId: "workspace",
            },
        },
	])("[正常系] $url の場合パース成功する", ({ url, expected }) => {
		expect(parsePath(url)).toStrictEqual(expected);
	});

    test.each([
        {
            caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
            url: "https://notion.so",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
            url: "https://workspace.notion.so",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "Notion以外のURL",
            url: "https://google.com",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "URLとして成立しない文字列",
            url: "https://",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "Notion Page IDだけの場合",
            url: "1234567890abcdefghijklnmopqrstuv",
            expectedException: "Invalid URL",
        },
    ])("[異常系] $caseTitle( $url )の場合パース失敗する", ({ url, expectedException }) => {
        expect(() => parsePath(url)).toThrowError(expectedException);
    });
});
