export const SITE_TITLE = "Ádám Liszkai's Corner";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const FEATURE_FLAGS: Record<string, boolean> = {
    /**
     * Website Features
     */
    siteThemeSwitcher: false,
    siteSocialLinks: true,

    /**
     * Blog
     * The main content of sharing interesting developments and opinions about the world
     */
    blog: false,

    /**
     * Biography
     * Short description on what person I am and what did I achieve so far.
     */
    biography: false,
    biographyOnFirstVisit: true,

    /**
     * Projects
     * An Open-source portfolio of actively maintained projects
     */
    projects: true,
    projectDetails: false,
};

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

export const FeatureFlags: Array<{ flag: FeatureFlag; enabled: boolean }> =
    Object.entries(FEATURE_FLAGS).map(([flag, enabled]) => ({
        flag: flag as FeatureFlag,
        enabled,
    }));
