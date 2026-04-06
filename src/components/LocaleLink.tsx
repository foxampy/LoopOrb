"use client";

import { Link } from "next-intl/navigation";
import { ComponentProps } from "react";

/**
 * Locale-aware Link component.
 * Wraps next-intl's Link to automatically handle locale routing.
 * Use this instead of next/link for all internal navigation.
 */
export default function LocaleLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} />;
}
