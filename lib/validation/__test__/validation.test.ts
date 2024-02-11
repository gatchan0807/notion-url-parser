import { describe, test, expect } from "vitest";
import { validate } from "../validation";

describe("validate", () => {
	describe("正常系", () => {
		test.each([
			{
				url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
				expected: { result: true, reason: null },
			},
			{
				url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
				expected: { result: true, reason: null },
			},
			{
				url: "https://workspace.notion.so/1234567890abcdefghijklnmopqrstuv",
				expected: { result: true, reason: null },
			},
			{
				url: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890",
				expected: { result: true, reason: null },
			},
			{
				url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?query=abcxyz",
				expected: { result: true, reason: null },
			},
			{
				url: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890?query=abcxyz",
				expected: { result: true, reason: null },
			},
		])("$url の場合 $expected になる", ({ url, expected }) => {
			expect(validate(url)).toStrictEqual(expected);
		});
	});

	describe("異常系", () => {
		test.each([
			{
				caseTitle: "パスがルートのNotionのURL（サブドメイン無し）",
				url: "https://notion.so",
				expected: { result: false, reason: new Error("Path is empty") },
			},
			{
				caseTitle: "パスがルートのNotionのURL（サブドメイン有り）",
				url: "https://workspace.notion.so",
				expected: { result: false, reason: new Error("Path is empty") },
			},
			{
				caseTitle: "Notion以外のURL",
				url: "https://google.com",
				expected: { result: false, reason: new Error("Host is not notion.so") },
			},
			{
				caseTitle: "URLとして成立しない文字列",
				url: "https://",
				expected: { result: false, reason: new TypeError("Invalid URL") },
			},
			{
				caseTitle: "Notion Page IDだけ",
				url: "1234567890abcdefghijklnmopqrstuv",
				expected: { result: false, reason: new TypeError("Invalid URL") },
			},
			{
				caseTitle: "View IDだけがSearch Paramsに付与されている場合",
				url: "https://notion.so/?v=1234567890abcdefghijklnmopqrstuv",
				expected: { result: false, reason: new Error("Path is empty") },
			},
			{
				caseTitle: "Peeked Page IDだけがSearch Paramsに付与されている場合",
				url: "https://notion.so/?p=1234567890abcdefghijklnmopqrstuv",
				expected: { result: false, reason: new Error("Path is empty") },
			},
			{
				caseTitle: "Peeked Mode情報だけがSearch Paramsに付与されている場合",
				url: "https://notion.so/?pm=s",
				expected: { result: false, reason: new Error("Path is empty") },
			},
		])("$caseTitle( $url ) の場合 $expected.reason になる", ({ url, expected }) => {
			expect(validate(url)).toStrictEqual(expected);
		});
	});
});
