import { mergeTests, mergeExpects } from "@playwright/test";
import { test as authTest, expect as authExpect } from "./auth.fixture";
import { test as randomTest, expect as randomExpect } from "./random.fixture";
import { test as basketTest, expect as basketExpect } from "./basket.fixture";

export const test = mergeTests(authTest, randomTest, basketTest);

export const expect = mergeExpects(authExpect, randomExpect, basketExpect);
