import { createContextId, useContext, useContextProvider } from "@builder.io/qwik";
import { FeatureFlags } from "config";

export const FeatureFlagContext = createContextId<typeof FeatureFlags>(
    "io.adaliszk.www.feature_flags",
);

export type FeatureFlagType = typeof FeatureFlags;
export type PageFlagType = typeof FeatureFlags.pages;

export function useFeatureFlagContextProvider() {
    return useContextProvider(FeatureFlagContext, FeatureFlags);
}

export function useFeatureFlagContext() {
    return useContext(FeatureFlagContext);
}
