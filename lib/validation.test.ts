import { describe, test, expect } from "vitest";
import { validate } from "./validation";

describe("validate", () => {
	test.each([
		{
			url: "https://notion.so",
			expected: true,
		},
		{
			url: "https://workspace.notion.so",
			expected: true,
		},
	])("[正常系] $url の場合 $expected になる", ({ url, expected }) => {
		expect(validate(url)).toBe(expected);
	});

	test.each([
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
