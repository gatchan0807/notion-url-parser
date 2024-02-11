import { describe, expect, test } from "vitest";
import { parsePath } from "../parse-path";

describe("parsePath", () => {
	describe("正常系", () => {
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
			{
				url: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890",
				expected: {
					raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890",
					rawPageId: "1234567890abcdefghijklnmopqrstuv",
					pageId: "1234567890abcdefghijklnmopqrstuv",
					workspaceId: "",
				},
			},
			{
				url: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890?query=abcxyz",
				expected: {
					raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890?query=abcxyz",
					rawPageId: "1234567890abcdefghijklnmopqrstuv",
					pageId: "1234567890abcdefghijklnmopqrstuv",
					workspaceId: "",
				},
			},
			{
				url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890",
				expected: {
					raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv#abcdefghijklnmopqrstuv1234567890",
					rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
					pageId: "1234567890abcdefghijklnmopqrstuv",
					workspaceId: "",
				},
			},
		])("$url の場合パース成功する", ({ url, expected }) => {
			expect(parsePath(url)).toStrictEqual(expected);
		});
	});

	describe("異常系（パース失敗）", () => {
		test.each([
			{
				caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
				url: "https://notion.so",
				expectedException: "Path is empty",
			},
			{
				caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
				url: "https://workspace.notion.so",
				expectedException: "Path is empty",
			},
			{
				caseTitle: "Notion以外のURL",
				url: "https://google.com",
				expectedException: "Host is not notion.so",
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
			{
				caseTitle: "View IDだけがSearch Paramsに付与されている場合",
				url: "https://notion.so/?v=1234567890abcdefghijklnmopqrstuv",
				expected: "Path is empty",
			},
			{
				caseTitle: "Peeked Page IDだけがSearch Paramsに付与されている場合",
				url: "https://notion.so/?p=1234567890abcdefghijklnmopqrstuv",
				expected: "Path is empty",
			},
			{
				caseTitle: "Peeked Mode情報だけがSearch Paramsに付与されている場合",
				url: "https://notion.so/?pm=s",
				expected: "Path is empty",
			},
		])(
			"$caseTitle( $url )の場合パース失敗する",
			({ url, expectedException }) => {
				expect(() => parsePath(url)).toThrowError(expectedException);
			}
		);
	});

	describe("異常系（フェイルセーフ）", () => {
		test.each([
			{
				caseTitle:
					"Notion URL (ID部分) が正しくない形の場合、Page IDが空文字列になる",
				url: "https://notion.so/1234567890abc",
				expected: {
					raw: "https://notion.so/1234567890abc",
					rawPageId: "1234567890abc",
					pageId: "",
					workspaceId: "",
				},
			},
			{
				caseTitle:
					"Notion URL (ID部分) が正しくない形の場合、Page IDが空文字列になる",
				url: "https://notion.so/workspace/1234567890abc",
				expected: {
					raw: "https://notion.so/workspace/1234567890abc",
					rawPageId: "1234567890abc",
					pageId: "",
					workspaceId: "workspace",
				},
			},
			{
				caseTitle:
					"Notion URL (ID部分) が正しくない形の場合、Page IDが空文字列になる",
				url: "https://notion.so/alphabet-in-page-title-1234567890abc",
				expected: {
					raw: "https://notion.so/alphabet-in-page-title-1234567890abc",
					rawPageId: "alphabet-in-page-title-1234567890abc",
					pageId: "",
					workspaceId: "",
				},
			},
		])("$caseTitle( $url )", ({ url, expected }) => {
			expect(parsePath(url)).toStrictEqual(expected);
		});
	});
});
