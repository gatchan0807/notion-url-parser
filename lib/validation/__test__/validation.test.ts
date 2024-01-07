import { describe, test, expect } from "vitest";
import { validate } from "../validation";

describe("validate", () => {
	describe("正常系", () => {
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
		])("$url の場合 $expected になる", ({ url, expected }) => {
			expect(validate(url)).toBe(expected);
		});
	});

	describe("異常系", () => {
		test.each([
			{
				caseTitle: "パスがルートのNotionのURL（サブドメイン無し）",
				url: "https://notion.so",
				expected: false,
			},
			{
				caseTitle: "パスがルートのNotionのURL（サブドメイン有り）",
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
				caseTitle: "Notion Page IDだけ",
				url: "1234567890abcdefghijklnmopqrstuv",
				expected: false,
			},
		])(
			"$caseTitle( $url ) の場合 $expected になる",
			({ url, expected }) => {
				expect(validate(url)).toBe(expected);
			}
		);
	});
});
