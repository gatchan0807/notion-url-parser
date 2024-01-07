import { describe, test, expect } from "vitest";
import { validate } from "../validation";

describe("validate", () => {
	test.each([
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
			expected: true,
		},
		{
			url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
			expected: true,
		},
		{
			url: "https://workspace.notion.so/1234567890abcdefghijklnmopqrstuv",
			expected: true,
		},
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890",
			expected: true,
		},
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?query=abcxyz",
			expected: true,
		},
		{
			url: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890?query=abcxyz",
			expected: true,
		},
	])("[正常系] $url の場合 $expected になる", ({ url, expected }) => {
		expect(validate(url)).toBe(expected);
	});

	test.each([
		{
			caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
			url: "https://notion.so",
			expected: false,
		},
		{
			caseTitle: "パスがルートのNotionのURL（サブドメイン有り）の場合",
			url: "https://workspace.notion.so",
			expected: false,
		},
		{
			caseTitle: "Notion以外のURL",
			url: "https://google.com",
			expected: false,
		},
		{
			caseTitle: "URLとして成立しない文字列",
			url: "https://",
			expected: false,
		},
		{
			caseTitle: "Notion Page IDだけの場合",
			url: "1234567890abcdefghijklnmopqrstuv",
			expected: false,
		},
	])(
		"[異常系] $caseTitle( $url ) の場合 $expected になる",
		({ url, expected }) => {
			expect(validate(url)).toBe(expected);
		}
	);
});
