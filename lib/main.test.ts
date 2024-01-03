import { expect, describe, it } from "vitest";

import SampleFunction from "./main";

describe("SampleFunction", () => {
	it("should return true", () => {
		expect(SampleFunction()).toBe(true);
	});
});
