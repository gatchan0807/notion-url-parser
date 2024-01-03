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
		{
			url: "https://google.com",
			expected: false,
		},
	])("$url の場合 $expected になる", ({ url, expected }) => {
		expect(validate(url)).toBe(expected);
	});
});
