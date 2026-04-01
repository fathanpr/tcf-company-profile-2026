import { usePage } from "@inertiajs/react";

/**
 * Translation helper for React components
 * Generate by Antigravity
 */
export const useTranslation = () => {
    const { translations = {} } = usePage().props;
    console.log("useTranslation translations:", translations);

    const __ = (key, replace = {}) => {
        let translation = translations[key] || key;

        Object.keys(replace).forEach((r) => {
            const regex = new RegExp(`:${r}`, "g");
            translation = translation.replace(regex, replace[r]);
        });

        return translation;
    };

    return { __ };
};

/**
 * URL helper to prepend locale
 * Generate by Antigravity
 */
export const useLocalic = () => {
    const { locale } = usePage().props;

    const lRoute = (name, params = {}, absolute = true) => {
        const nonLocalizedRoutes = [
            "dashboard",
            "profile.edit",
            "profile.update",
            "profile.destroy",
        ];

        if (name.startsWith("admin.") || nonLocalizedRoutes.includes(name)) {
            return route(name, params, absolute);
        }

        return route(name, { locale, ...params }, absolute);
    };

    return { lRoute, locale };
};
